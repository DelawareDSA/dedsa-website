<?php
add_action('init','dsa_content_register_committees');
/**
 * Custom post type
 *
 * @package dsa_content
 */

/**
 * Registers the `committees` post type.
 */
function dsa_content_register_committees() {
	register_post_type(
		'committees',
		array(
			'labels'                => array(
				'name'                  => __( 'Committees', 'dsa-content' ),
				'singular_name'         => __( 'Committees', 'dsa-content' ),
				'all_items'             => __( 'All Committees', 'dsa-content' ),
				'archives'              => __( 'Committees Archives', 'dsa-content' ),
				'attributes'            => __( 'Committees Attributes', 'dsa-content' ),
				'insert_into_item'      => __( 'Insert into Committees', 'dsa-content' ),
				'uploaded_to_this_item' => __( 'Uploaded to this Committees', 'dsa-content' ),
				'featured_image'        => _x( 'Featured Image', 'committees', 'dsa-content' ),
				'set_featured_image'    => _x( 'Set featured image', 'committees', 'dsa-content' ),
				'remove_featured_image' => _x( 'Remove featured image', 'committees', 'dsa-content' ),
				'use_featured_image'    => _x( 'Use as featured image', 'committees', 'dsa-content' ),
				'filter_items_list'     => __( 'Filter Committees list', 'dsa-content' ),
				'items_list_navigation' => __( 'Committees list navigation', 'dsa-content' ),
				'items_list'            => __( 'Committees list', 'dsa-content' ),
				'new_item'              => __( 'New Committees', 'dsa-content' ),
				'add_new'               => __( 'Add New', 'dsa-content' ),
				'add_new_item'          => __( 'Add New Committees', 'dsa-content' ),
				'edit_item'             => __( 'Edit Committees', 'dsa-content' ),
				'view_item'             => __( 'View Committees', 'dsa-content' ),
				'view_items'            => __( 'View Committees', 'dsa-content' ),
				'search_items'          => __( 'Search Committees', 'dsa-content' ),
				'not_found'             => __( 'No Committees found', 'dsa-content' ),
				'not_found_in_trash'    => __( 'No Committees found in trash', 'dsa-content' ),
				'parent_item_colon'     => __( 'Parent Committees:', 'dsa-content' ),
				'menu_name'             => __( 'Committees', 'dsa-content' ),
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
        'graphql_single_name' => 'Committee',
        'graphql_plural_name' => 'Committees',
        // ─────────────────────────────────────────────────────────
			'menu_position'         => null,
			'menu_icon'             => 'dashicons-admin-post',
			'show_in_rest'          => true,
			'rest_base'             => 'committees',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		)
	);
}

add_action( 'init', 'dsa_content_register_committees' );

/**
 * Sets the post updated messages for the `committees` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `committees` post type.
 */
function dsa_content_committees_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['committees'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Committees updated. <a target="_blank" href="%s">View Committees</a>', 'dsa-content' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'dsa-content' ),
		3  => __( 'Custom field deleted.', 'dsa-content' ),
		4  => __( 'Committees updated.', 'dsa-content' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Committees restored to revision from %s', 'dsa-content' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Committees published. <a href="%s">View Committees</a>', 'dsa-content' ), esc_url( $permalink ) ),
		7  => __( 'Committees saved.', 'dsa-content' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Committees submitted. <a target="_blank" href="%s">Preview Committees</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Committees scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Committees</a>', 'dsa-content' ), date_i18n( __( 'M j, Y @ G:i', 'dsa-content' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Committees draft updated. <a target="_blank" href="%s">Preview Committees</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}

add_filter( 'post_updated_messages', 'dsa_content_committees_updated_messages' );

/**
 * Sets the bulk post updated messages for the `committees` post type.
 *
 * @param  array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
 *                              keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
 * @param  int[] $bulk_counts   Array of item counts for each message, used to build internationalized strings.
 * @return array Bulk messages for the `committees` post type.
 */
function dsa_content_committees_bulk_updated_messages( $bulk_messages, $bulk_counts ) {
	global $post;

	$bulk_messages['committees'] = array(
		/* translators: %s: Number of Committees. */
		'updated'   => _n( '%s Committees updated.', '%s Committees updated.', $bulk_counts['updated'], 'dsa-content' ),
		'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Committees not updated, somebody is editing it.', 'dsa-content' ) :
						/* translators: %s: Number of Committees. */
						_n( '%s Committees not updated, somebody is editing it.', '%s Committees not updated, somebody is editing them.', $bulk_counts['locked'], 'dsa-content' ),
		/* translators: %s: Number of Committees. */
		'deleted'   => _n( '%s Committees permanently deleted.', '%s Committees permanently deleted.', $bulk_counts['deleted'], 'dsa-content' ),
		/* translators: %s: Number of Committees. */
		'trashed'   => _n( '%s Committees moved to the Trash.', '%s Committees moved to the Trash.', $bulk_counts['trashed'], 'dsa-content' ),
		/* translators: %s: Number of Committees. */
		'untrashed' => _n( '%s Committees restored from the Trash.', '%s Committees restored from the Trash.', $bulk_counts['untrashed'], 'dsa-content' ),
	);

	return $bulk_messages;
}

add_filter( 'bulk_post_updated_messages', 'dsa_content_committees_bulk_updated_messages', 10, 2 );
