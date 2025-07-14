<?php
add_action('init','dsa_content_register_leadership');
/**
 * Custom post type
 *
 * @package dsa_content
 */

/**
 * Registers the `leadership` post type.
 */
function dsa_content_register_leadership() {
	register_post_type(
		'leadership',
		array(
			'labels'                => array(
				'name'                  => __( 'Leaderships', 'dsa-content' ),
				'singular_name'         => __( 'Leadership', 'dsa-content' ),
				'all_items'             => __( 'All Leaderships', 'dsa-content' ),
				'archives'              => __( 'Leadership Archives', 'dsa-content' ),
				'attributes'            => __( 'Leadership Attributes', 'dsa-content' ),
				'insert_into_item'      => __( 'Insert into Leadership', 'dsa-content' ),
				'uploaded_to_this_item' => __( 'Uploaded to this Leadership', 'dsa-content' ),
				'featured_image'        => _x( 'Featured Image', 'leadership', 'dsa-content' ),
				'set_featured_image'    => _x( 'Set featured image', 'leadership', 'dsa-content' ),
				'remove_featured_image' => _x( 'Remove featured image', 'leadership', 'dsa-content' ),
				'use_featured_image'    => _x( 'Use as featured image', 'leadership', 'dsa-content' ),
				'filter_items_list'     => __( 'Filter Leaderships list', 'dsa-content' ),
				'items_list_navigation' => __( 'Leaderships list navigation', 'dsa-content' ),
				'items_list'            => __( 'Leaderships list', 'dsa-content' ),
				'new_item'              => __( 'New Leadership', 'dsa-content' ),
				'add_new'               => __( 'Add New', 'dsa-content' ),
				'add_new_item'          => __( 'Add New Leadership', 'dsa-content' ),
				'edit_item'             => __( 'Edit Leadership', 'dsa-content' ),
				'view_item'             => __( 'View Leadership', 'dsa-content' ),
				'view_items'            => __( 'View Leaderships', 'dsa-content' ),
				'search_items'          => __( 'Search Leaderships', 'dsa-content' ),
				'not_found'             => __( 'No Leaderships found', 'dsa-content' ),
				'not_found_in_trash'    => __( 'No Leaderships found in trash', 'dsa-content' ),
				'parent_item_colon'     => __( 'Parent Leadership:', 'dsa-content' ),
				'menu_name'             => __( 'Leaderships', 'dsa-content' ),
			),
			'public'                => true,
			'hierarchical'          => false,
			'show_ui'               => true,
			'show_in_nav_menus'     => true,
			'supports'              => array( 'title', 'editor' ),
			'has_archive'           => true,
			'rewrite'               => true,
			'query_var'             => true,
        // ── GraphQL Expose ───────────────────────────────────────
        'show_in_graphql'     => true,
        'graphql_single_name' => 'Leadership',
        'graphql_plural_name' => 'Leaderships',
        // ─────────────────────────────────────────────────────────
			'menu_position'         => null,
			'menu_icon'             => 'dashicons-admin-post',
			'show_in_rest'          => true,
			'rest_base'             => 'leadership',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		)
	);
}

add_action( 'init', 'dsa_content_register_leadership' );

/**
 * Sets the post updated messages for the `leadership` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `leadership` post type.
 */
function dsa_content_leadership_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['leadership'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Leadership updated. <a target="_blank" href="%s">View Leadership</a>', 'dsa-content' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'dsa-content' ),
		3  => __( 'Custom field deleted.', 'dsa-content' ),
		4  => __( 'Leadership updated.', 'dsa-content' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Leadership restored to revision from %s', 'dsa-content' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Leadership published. <a href="%s">View Leadership</a>', 'dsa-content' ), esc_url( $permalink ) ),
		7  => __( 'Leadership saved.', 'dsa-content' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Leadership submitted. <a target="_blank" href="%s">Preview Leadership</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Leadership scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Leadership</a>', 'dsa-content' ), date_i18n( __( 'M j, Y @ G:i', 'dsa-content' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Leadership draft updated. <a target="_blank" href="%s">Preview Leadership</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}

add_filter( 'post_updated_messages', 'dsa_content_leadership_updated_messages' );

/**
 * Sets the bulk post updated messages for the `leadership` post type.
 *
 * @param  array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
 *                              keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
 * @param  int[] $bulk_counts   Array of item counts for each message, used to build internationalized strings.
 * @return array Bulk messages for the `leadership` post type.
 */
function dsa_content_leadership_bulk_updated_messages( $bulk_messages, $bulk_counts ) {
	global $post;

	$bulk_messages['leadership'] = array(
		/* translators: %s: Number of Leaderships. */
		'updated'   => _n( '%s Leadership updated.', '%s Leaderships updated.', $bulk_counts['updated'], 'dsa-content' ),
		'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Leadership not updated, somebody is editing it.', 'dsa-content' ) :
						/* translators: %s: Number of Leaderships. */
						_n( '%s Leadership not updated, somebody is editing it.', '%s Leaderships not updated, somebody is editing them.', $bulk_counts['locked'], 'dsa-content' ),
		/* translators: %s: Number of Leaderships. */
		'deleted'   => _n( '%s Leadership permanently deleted.', '%s Leaderships permanently deleted.', $bulk_counts['deleted'], 'dsa-content' ),
		/* translators: %s: Number of Leaderships. */
		'trashed'   => _n( '%s Leadership moved to the Trash.', '%s Leaderships moved to the Trash.', $bulk_counts['trashed'], 'dsa-content' ),
		/* translators: %s: Number of Leaderships. */
		'untrashed' => _n( '%s Leadership restored from the Trash.', '%s Leaderships restored from the Trash.', $bulk_counts['untrashed'], 'dsa-content' ),
	);

	return $bulk_messages;
}

add_filter( 'bulk_post_updated_messages', 'dsa_content_leadership_bulk_updated_messages', 10, 2 );
