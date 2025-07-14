<?php
/*
 * Plugin Name: Calendar REST API
putenv("GOOGLE_APPLICATION_CREDENTIALS=" . __DIR__ . "/credentials.json");
 * Description: Exposes calendar events via a custom REST endpoint.
 * Version:     1.0
 * Author:      DEDSA
 */
require_once __DIR__ . '/vendor/autoload.php';

putenv('GOOGLE_APPLICATION_CREDENTIALS=' . __DIR__ . '/credentials.json');
putenv('GOOGLE_CALENDAR_ID=f17d4d4d1756675b31bf0c7cc145c8e2b0fd967d93c55e23c40a0fe15fe4fd8d@group.calendar.google.com');

add_action('rest_api_init', function () {
  register_rest_route('calendar/v1', '/events', [
    'methods'             => 'GET',
    'callback'            => 'dedsa_get_calendar_events',
    'permission_callback' => '__return_true',
  ]);
});

function fetch_google_events( int $month, int $year ): array {
  $client = new Google_Client();
  $client->useApplicationDefaultCredentials();
  $client->addScope(Google_Service_Calendar::CALENDAR_READONLY);

  $service    = new Google_Service_Calendar($client);
  $calendarId = getenv('GOOGLE_CALENDAR_ID');

  $start = new DateTime("{$year}-{$month}-01T00:00:00Z");
  $end   = (clone $start)->modify('first day of next month');

  $optParams = [
    'timeMin'      => $start->format(DateTime::RFC3339),
    'timeMax'      => $end->format(DateTime::RFC3339),
    'singleEvents' => true,
    'orderBy'      => 'startTime',
  ];

  $events = $service->events->listEvents($calendarId, $optParams);
  $out    = [];
  foreach ($events->getItems() as $e) {
    $out[] = [
      'id'    => $e->getId(),
      'title' => $e->getSummary(),
      'date'  => $e->getStart()->date ?: $e->getStart()->dateTime,
      'link'  => $e->getHtmlLink(),
    ];
  }
  return $out;
}


function dedsa_get_calendar_events(\WP_REST_Request $request) {
  $month = intval( $request->get_param('month') );
  $year  = intval( $request->get_param('year') );

  $start_date = sprintf('%04d-%02d-01', $year, $month);
  $end_date   = date('Y-m-t', strtotime($start_date));

  $query = new WP_Query([
    'post_type'      => 'events',       // adjust to your CPT slug
    'posts_per_page' => -1,
    'meta_query'     => [[
      'key'     => 'event_date',
      'value'   => [ $start_date, $end_date ],
      'compare' => 'BETWEEN',
      'type'    => 'DATE',
    ]],
  ]);

  $events = array_map(function($post) {
    return [
      'id'    => $post->ID,
      'title' => get_the_title($post),
      'date'  => get_post_meta($post->ID, 'event_date', true),
    ];
  }, $query->posts);

  $wp_events     = $events;
  $google_events = fetch_google_events($month, $year);

  return rest_ensure_response([
    'wp'     => $wp_events,
    'google' => $google_events,
  ]);
}
