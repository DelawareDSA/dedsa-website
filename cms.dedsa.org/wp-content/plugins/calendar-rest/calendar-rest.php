<?php
putenv('GOOGLE_APPLICATION_CREDENTIALS=/etc/keys/dedsa-sa-key.json');
/*
 * Plugin Name: Calendar REST API
 * Description: Exposes calendar events via a custom REST endpoint.
 * Version:     1.1
 * Author:      DEDSA
 */

// 1) Ensure Composer autoload (Google Client)
require_once __DIR__ . '/vendor/autoload.php';

// 2) Set Google credentials via environment variable (don't commit JSON in Git)

// 3) Calendar ID from env (or fallback)
$googleCalendarId = getenv('GOOGLE_CALENDAR_ID') ?: 'f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d@group.calendar.google.com';

// 4) Register REST route on init
add_action('rest_api_init', function () use ($googleCalendarId) {
    register_rest_route('calendar/v1', '/events', [
        'methods'             => 'GET',
        'callback'            => 'dedsa_get_calendar_events',
        'permission_callback' => '__return_true',
    ]);
});

/**
 * Fetch events from Google Calendar.
 */
function fetch_google_events(int $month, int $year): array {
    try {
        $client = new Google_Client();
        $client->useApplicationDefaultCredentials();
        $client->addScope(Google_Service_Calendar::CALENDAR_READONLY);

        $service    = new Google_Service_Calendar($client);
        $calendarId = getenv('GOOGLE_CALENDAR_ID');

        $start = new DateTimeImmutable(sprintf('%04d-%02d-01T00:00:00Z', $year, $month));
        $end   = $start->modify('first day of next month');

        $optParams = [
            'timeMin'      => $start->format(DateTime::RFC3339),
            'timeMax'      => $end->format(DateTime::RFC3339),
            'singleEvents' => true,
            'orderBy'      => 'startTime',
        ];

        $events = $service->events->listEvents($calendarId, $optParams);
        $out    = [];

        foreach ($events->getItems() as $e) {
            $startObj = $e->getStart();
            $date     = $startObj->getDate() ?: $startObj->getDateTime();
            $out[] = [
                'id'    => $e->getId(),
                'title' => $e->getSummary(),
                'date'  => $date,
                'link'  => $e->getHtmlLink(),
            ];
        }

        return $out;
    } catch (Exception $ex) {
        return [];
    }
}

/**
 * Callback for the /calendar/v1/events endpoint.
 */
function dedsa_get_calendar_events(WP_REST_Request $request) {
    // Parse month/year (default to current)
    $month = intval( $request->get_param('month') ) ?: intval(date('n'));
    $year  = intval( $request->get_param('year') )  ?: intval(date('Y'));

    // 1) Query WP events (custom post type 'events' with 'event_date' meta)
    $start_date = sprintf('%04d-%02d-01', $year, $month);
    $end_date   = date('Y-m-t', strtotime($start_date));

    $query = new WP_Query([
        'post_type'      => 'events',
        'posts_per_page' => -1,
        'meta_query'     => [[
            'key'     => 'event_date',
            'value'   => [ $start_date, $end_date ],
            'compare' => 'BETWEEN',
            'type'    => 'DATE',
        ]],
    ]);

    $wp_events = array_map(function($post) {
        return [
            'id'    => $post->ID,
            'title' => get_the_title($post),
            'date'  => get_post_meta($post->ID, 'event_date', true),
        ];
    }, $query->posts);

    // 2) Fetch Google events
    $google_events = fetch_google_events($month, $year);

    // 3) Return combined payload
    return rest_ensure_response([
        'wp'     => $wp_events,
        'google' => $google_events,
    ]);
}
