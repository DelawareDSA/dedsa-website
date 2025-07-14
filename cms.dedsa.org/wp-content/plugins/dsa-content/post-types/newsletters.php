<?php
add_action('init','dsa_content_register_newsletters');
/**
 * Custom post type
 *
 * @package dsa_content
 */

/**
 * Registers the `newsletters` post type.
 */
function dsa_content_register_newsletters() {
	register_post_type(
		'newsletters',
		array(
			'labels'                => array(
				'name'                  => __( 'Newsletters', 'dsa-content' ),
				'singular_name'         => __( 'Newsletters', 'dsa-content' ),
				'all_items'             => __( 'All Newsletters', 'dsa-content' ),
				'archives'              => __( 'Newsletters Archives', 'dsa-content' ),
				'attributes'            => __( 'Newsletters Attributes', 'dsa-content' ),
				'insert_into_item'      => __( 'Insert into Newsletters', 'dsa-content' ),
				'uploaded_to_this_item' => __( 'Uploaded to this Newsletters', 'dsa-content' ),
				'featured_image'        => _x( 'Featured Image', 'newsletters', 'dsa-content' ),
				'set_featured_image'    => _x( 'Set featured image', 'newsletters', 'dsa-content' ),
				'remove_featured_image' => _x( 'Remove featured image', 'newsletters', 'dsa-content' ),
				'use_featured_image'    => _x( 'Use as featured image', 'newsletters', 'dsa-content' ),
				'filter_items_list'     => __( 'Filter Newsletters list', 'dsa-content' ),
				'items_list_navigation' => __( 'Newsletters list navigation', 'dsa-content' ),
				'items_list'            => __( 'Newsletters list', 'dsa-content' ),
				'new_item'              => __( 'New Newsletters', 'dsa-content' ),
				'add_new'               => __( 'Add New', 'dsa-content' ),
				'add_new_item'          => __( 'Add New Newsletters', 'dsa-content' ),
				'edit_item'             => __( 'Edit Newsletters', 'dsa-content' ),
				'view_item'             => __( 'View Newsletters', 'dsa-content' ),
				'view_items'            => __( 'View Newsletters', 'dsa-content' ),
				'search_items'          => __( 'Search Newsletters', 'dsa-content' ),
				'not_found'             => __( 'No Newsletters found', 'dsa-content' ),
				'not_found_in_trash'    => __( 'No Newsletters found in trash', 'dsa-content' ),
				'parent_item_colon'     => __( 'Parent Newsletters:', 'dsa-content' ),
				'menu_name'             => __( 'Newsletters', 'dsa-content' ),
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
        'graphql_single_name' => 'Newsletter',
        'graphql_plural_name' => 'Newsletters',
        // ─────────────────────────────────────────────────────────
			'menu_position'         => null,
			'menu_icon'             => 'dashicons-admin-post',
			'show_in_rest'          => true,
			'rest_base'             => 'newsletters',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		)
	);
}

add_action( 'init', 'dsa_content_register_newsletters' );

/**
 * Sets the post updated messages for the `newsletters` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `newsletters` post type.
 */
function dsa_content_newsletters_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['newsletters'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Newsletters updated. <a target="_blank" href="%s">View Newsletters</a>', 'dsa-content' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'dsa-content' ),
		3  => __( 'Custom field deleted.', 'dsa-content' ),
		4  => __( 'Newsletters updated.', 'dsa-content' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Newsletters restored to revision from %s', 'dsa-content' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Newsletters published. <a href="%s">View Newsletters</a>', 'dsa-content' ), esc_url( $permalink ) ),
		7  => __( 'Newsletters saved.', 'dsa-content' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Newsletters submitted. <a target="_blank" href="%s">Preview Newsletters</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Newsletters scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Newsletters</a>', 'dsa-content' ), date_i18n( __( 'M j, Y @ G:i', 'dsa-content' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Newsletters draft updated. <a target="_blank" href="%s">Preview Newsletters</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}

add_filter( 'post_updated_messages', 'dsa_content_newsletters_updated_messages' );

/**
 * Sets the bulk post updated messages for the `newsletters` post type.
 *
 * @param  array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
 *                              keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
 * @param  int[] $bulk_counts   Array of item counts for each message, used to build internationalized strings.
 * @return array Bulk messages for the `newsletters` post type.
 */
function dsa_content_newsletters_bulk_updated_messages( $bulk_messages, $bulk_counts ) {
	global $post;

	$bulk_messages['newsletters'] = array(
		/* translators: %s: Number of Newsletters. */
		'updated'   => _n( '%s Newsletters updated.', '%s Newsletters updated.', $bulk_counts['updated'], 'dsa-content' ),
		'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Newsletters not updated, somebody is editing it.', 'dsa-content' ) :
						/* translators: %s: Number of Newsletters. */
						_n( '%s Newsletters not updated, somebody is editing it.', '%s Newsletters not updated, somebody is editing them.', $bulk_counts['locked'], 'dsa-content' ),
		/* translators: %s: Number of Newsletters. */
		'deleted'   => _n( '%s Newsletters permanently deleted.', '%s Newsletters permanently deleted.', $bulk_counts['deleted'], 'dsa-content' ),
		/* translators: %s: Number of Newsletters. */
		'trashed'   => _n( '%s Newsletters moved to the Trash.', '%s Newsletters moved to the Trash.', $bulk_counts['trashed'], 'dsa-content' ),
		/* translators: %s: Number of Newsletters. */
		'untrashed' => _n( '%s Newsletters restored from the Trash.', '%s Newsletters restored from the Trash.', $bulk_counts['untrashed'], 'dsa-content' ),
	);

	return $bulk_messages;
}

add_filter( 'bulk_post_updated_messages', 'dsa_content_newsletters_bulk_updated_messages', 10, 2 );
