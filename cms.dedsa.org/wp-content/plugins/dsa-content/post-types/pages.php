<?php
add_action('init','dsa_content_register_pages');
/**
 * Custom post type
 *
 * @package dsa_content
 */

/**
 * Registers the `pages` post type.
 */
function dsa_content_register_pages() {
	register_post_type(
		'pages',
		array(
			'labels'                => array(
				'name'                  => __( 'Pages', 'dsa-content' ),
				'singular_name'         => __( 'Pages', 'dsa-content' ),
				'all_items'             => __( 'All Pages', 'dsa-content' ),
				'archives'              => __( 'Pages Archives', 'dsa-content' ),
				'attributes'            => __( 'Pages Attributes', 'dsa-content' ),
				'insert_into_item'      => __( 'Insert into Pages', 'dsa-content' ),
				'uploaded_to_this_item' => __( 'Uploaded to this Pages', 'dsa-content' ),
				'featured_image'        => _x( 'Featured Image', 'pages', 'dsa-content' ),
				'set_featured_image'    => _x( 'Set featured image', 'pages', 'dsa-content' ),
				'remove_featured_image' => _x( 'Remove featured image', 'pages', 'dsa-content' ),
				'use_featured_image'    => _x( 'Use as featured image', 'pages', 'dsa-content' ),
				'filter_items_list'     => __( 'Filter Pages list', 'dsa-content' ),
				'items_list_navigation' => __( 'Pages list navigation', 'dsa-content' ),
				'items_list'            => __( 'Pages list', 'dsa-content' ),
				'new_item'              => __( 'New Pages', 'dsa-content' ),
				'add_new'               => __( 'Add New', 'dsa-content' ),
				'add_new_item'          => __( 'Add New Pages', 'dsa-content' ),
				'edit_item'             => __( 'Edit Pages', 'dsa-content' ),
				'view_item'             => __( 'View Pages', 'dsa-content' ),
				'view_items'            => __( 'View Pages', 'dsa-content' ),
				'search_items'          => __( 'Search Pages', 'dsa-content' ),
				'not_found'             => __( 'No Pages found', 'dsa-content' ),
				'not_found_in_trash'    => __( 'No Pages found in trash', 'dsa-content' ),
				'parent_item_colon'     => __( 'Parent Pages:', 'dsa-content' ),
				'menu_name'             => __( 'Pages', 'dsa-content' ),
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
        'graphql_single_name' => 'Page',
        'graphql_plural_name' => 'Pages',
        // ─────────────────────────────────────────────────────────
			'menu_position'         => null,
			'menu_icon'             => 'dashicons-admin-post',
			'show_in_rest'          => true,
			'rest_base'             => 'pages',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		)
	);
}

add_action( 'init', 'dsa_content_register_pages' );

/**
 * Sets the post updated messages for the `pages` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `pages` post type.
 */
function dsa_content_pages_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['pages'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Pages updated. <a target="_blank" href="%s">View Pages</a>', 'dsa-content' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'dsa-content' ),
		3  => __( 'Custom field deleted.', 'dsa-content' ),
		4  => __( 'Pages updated.', 'dsa-content' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Pages restored to revision from %s', 'dsa-content' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Pages published. <a href="%s">View Pages</a>', 'dsa-content' ), esc_url( $permalink ) ),
		7  => __( 'Pages saved.', 'dsa-content' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Pages submitted. <a target="_blank" href="%s">Preview Pages</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Pages scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Pages</a>', 'dsa-content' ), date_i18n( __( 'M j, Y @ G:i', 'dsa-content' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Pages draft updated. <a target="_blank" href="%s">Preview Pages</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}

add_filter( 'post_updated_messages', 'dsa_content_pages_updated_messages' );

/**
 * Sets the bulk post updated messages for the `pages` post type.
 *
 * @param  array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
 *                              keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
 * @param  int[] $bulk_counts   Array of item counts for each message, used to build internationalized strings.
 * @return array Bulk messages for the `pages` post type.
 */
function dsa_content_pages_bulk_updated_messages( $bulk_messages, $bulk_counts ) {
	global $post;

	$bulk_messages['pages'] = array(
		/* translators: %s: Number of Pages. */
		'updated'   => _n( '%s Pages updated.', '%s Pages updated.', $bulk_counts['updated'], 'dsa-content' ),
		'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Pages not updated, somebody is editing it.', 'dsa-content' ) :
						/* translators: %s: Number of Pages. */
						_n( '%s Pages not updated, somebody is editing it.', '%s Pages not updated, somebody is editing them.', $bulk_counts['locked'], 'dsa-content' ),
		/* translators: %s: Number of Pages. */
		'deleted'   => _n( '%s Pages permanently deleted.', '%s Pages permanently deleted.', $bulk_counts['deleted'], 'dsa-content' ),
		/* translators: %s: Number of Pages. */
		'trashed'   => _n( '%s Pages moved to the Trash.', '%s Pages moved to the Trash.', $bulk_counts['trashed'], 'dsa-content' ),
		/* translators: %s: Number of Pages. */
		'untrashed' => _n( '%s Pages restored from the Trash.', '%s Pages restored from the Trash.', $bulk_counts['untrashed'], 'dsa-content' ),
	);

	return $bulk_messages;
}

add_filter( 'bulk_post_updated_messages', 'dsa_content_pages_bulk_updated_messages', 10, 2 );
