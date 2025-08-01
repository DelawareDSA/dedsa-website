<?php
function dsa_content_events_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['events'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Events updated. <a target="_blank" href="%s">View Events</a>', 'dsa-content' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'dsa-content' ),
		3  => __( 'Custom field deleted.', 'dsa-content' ),
		4  => __( 'Events updated.', 'dsa-content' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Events restored to revision from %s', 'dsa-content' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Events published. <a href="%s">View Events</a>', 'dsa-content' ), esc_url( $permalink ) ),
		7  => __( 'Events saved.', 'dsa-content' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Events submitted. <a target="_blank" href="%s">Preview Events</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Events scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Events</a>', 'dsa-content' ), date_i18n( __( 'M j, Y @ G:i', 'dsa-content' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Events draft updated. <a target="_blank" href="%s">Preview Events</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}

add_filter( 'post_updated_messages', 'dsa_content_events_updated_messages' );

/**
 * Sets the bulk post updated messages for the `events` post type.
 *
 * @param  array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
 *                              keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
 * @param  int[] $bulk_counts   Array of item counts for each message, used to build internationalized strings.
 * @return array Bulk messages for the `events` post type.
 */
function dsa_content_events_bulk_updated_messages( $bulk_messages, $bulk_counts ) {
	global $post;

	$bulk_messages['events'] = array(
		/* translators: %s: Number of Events. */
		'updated'   => _n( '%s Events updated.', '%s Events updated.', $bulk_counts['updated'], 'dsa-content' ),
		'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Events not updated, somebody is editing it.', 'dsa-content' ) :
						/* translators: %s: Number of Events. */
						_n( '%s Events not updated, somebody is editing it.', '%s Events not updated, somebody is editing them.', $bulk_counts['locked'], 'dsa-content' ),
		/* translators: %s: Number of Events. */
		'deleted'   => _n( '%s Events permanently deleted.', '%s Events permanently deleted.', $bulk_counts['deleted'], 'dsa-content' ),
		/* translators: %s: Number of Events. */
		'trashed'   => _n( '%s Events moved to the Trash.', '%s Events moved to the Trash.', $bulk_counts['trashed'], 'dsa-content' ),
		/* translators: %s: Number of Events. */
		'untrashed' => _n( '%s Events restored from the Trash.', '%s Events restored from the Trash.', $bulk_counts['untrashed'], 'dsa-content' ),
	);

	return $bulk_messages;
}

add_filter( 'bulk_post_updated_messages', 'dsa_content_events_bulk_updated_messages', 10, 2 );



if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'init', 'dsa_content_register_events' );
function dsa_content_register_events() {
    register_post_type(
        'events',
        [
            'labels'            => [
                'name'                  => __( 'Events', 'dsa-content' ),
                'singular_name'         => __( 'Event', 'dsa-content' ),
                'all_items'             => __( 'All Events', 'dsa-content' ),
                'archives'              => __( 'Event Archives', 'dsa-content' ),
                'attributes'            => __( 'Event Attributes', 'dsa-content' ),
                'insert_into_item'      => __( 'Insert into Event', 'dsa-content' ),
                'uploaded_to_this_item' => __( 'Uploaded to this Event', 'dsa-content' ),
                'featured_image'        => _x( 'Featured Image', 'events', 'dsa-content' ),
                'set_featured_image'    => _x( 'Set featured image', 'events', 'dsa-content' ),
                'remove_featured_image' => _x( 'Remove featured image', 'events', 'dsa-content' ),
                'use_featured_image'    => _x( 'Use as featured image', 'events', 'dsa-content' ),
                'filter_items_list'     => __( 'Filter Events list', 'dsa-content' ),
                'items_list_navigation' => __( 'Events list navigation', 'dsa-content' ),
                'items_list'            => __( 'Events list', 'dsa-content' ),
                'new_item'              => __( 'New Event', 'dsa-content' ),
                'add_new'               => __( 'Add New', 'dsa-content' ),
                'add_new_item'          => __( 'Add New Event', 'dsa-content' ),
                'edit_item'             => __( 'Edit Event', 'dsa-content' ),
                'view_item'             => __( 'View Event', 'dsa-content' ),
                'view_items'            => __( 'View Events', 'dsa-content' ),
                'search_items'          => __( 'Search Events', 'dsa-content' ),
                'not_found'             => __( 'No events found', 'dsa-content' ),
                'not_found_in_trash'    => __( 'No events found in trash', 'dsa-content' ),
                'menu_name'             => __( 'Events', 'dsa-content' ),
            ],
            'public'            => true,
            'hierarchical'      => false,
            'show_ui'           => true,
            'show_in_nav_menus' => true,
            'supports'          => [ 'title', 'editor' ],
            'has_archive'       => true,
            'rewrite'           => true,
            'query_var'         => true,

            // ── GraphQL Expose ───────────────────────────────────────
            'show_in_graphql'     => true,
            'graphql_single_name' => 'Event',
            'graphql_plural_name' => 'Events',
            // ─────────────────────────────────────────────────────────
        ]
    );
}
