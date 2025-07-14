<?php
add_action('init','dsa_content_register_bylaws');
/**
 * Custom post type
 *
 * @package dsa_content
 */

/**
 * Registers the `bylaws` post type.
 */
function dsa_content_register_bylaws() {
	register_post_type(
		'bylaws',
		array(
			'labels'                => array(
				'name'                  => __( 'Bylaws', 'dsa-content' ),
				'singular_name'         => __( 'Bylaws', 'dsa-content' ),
				'all_items'             => __( 'All Bylaws', 'dsa-content' ),
				'archives'              => __( 'Bylaws Archives', 'dsa-content' ),
				'attributes'            => __( 'Bylaws Attributes', 'dsa-content' ),
				'insert_into_item'      => __( 'Insert into Bylaws', 'dsa-content' ),
				'uploaded_to_this_item' => __( 'Uploaded to this Bylaws', 'dsa-content' ),
				'featured_image'        => _x( 'Featured Image', 'bylaws', 'dsa-content' ),
				'set_featured_image'    => _x( 'Set featured image', 'bylaws', 'dsa-content' ),
				'remove_featured_image' => _x( 'Remove featured image', 'bylaws', 'dsa-content' ),
				'use_featured_image'    => _x( 'Use as featured image', 'bylaws', 'dsa-content' ),
				'filter_items_list'     => __( 'Filter Bylaws list', 'dsa-content' ),
				'items_list_navigation' => __( 'Bylaws list navigation', 'dsa-content' ),
				'items_list'            => __( 'Bylaws list', 'dsa-content' ),
				'new_item'              => __( 'New Bylaws', 'dsa-content' ),
				'add_new'               => __( 'Add New', 'dsa-content' ),
				'add_new_item'          => __( 'Add New Bylaws', 'dsa-content' ),
				'edit_item'             => __( 'Edit Bylaws', 'dsa-content' ),
				'view_item'             => __( 'View Bylaws', 'dsa-content' ),
				'view_items'            => __( 'View Bylaws', 'dsa-content' ),
				'search_items'          => __( 'Search Bylaws', 'dsa-content' ),
				'not_found'             => __( 'No Bylaws found', 'dsa-content' ),
				'not_found_in_trash'    => __( 'No Bylaws found in trash', 'dsa-content' ),
				'parent_item_colon'     => __( 'Parent Bylaws:', 'dsa-content' ),
				'menu_name'             => __( 'Bylaws', 'dsa-content' ),
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
        'graphql_single_name' => 'Bylaw',
        'graphql_plural_name' => 'Bylaws',
        // ─────────────────────────────────────────────────────────
			'menu_position'         => null,
			'menu_icon'             => 'dashicons-admin-post',
			'show_in_rest'          => true,
			'rest_base'             => 'bylaws',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		)
	);
}

add_action( 'init', 'dsa_content_register_bylaws' );

/**
 * Sets the post updated messages for the `bylaws` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `bylaws` post type.
 */
function dsa_content_bylaws_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['bylaws'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Bylaws updated. <a target="_blank" href="%s">View Bylaws</a>', 'dsa-content' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'dsa-content' ),
		3  => __( 'Custom field deleted.', 'dsa-content' ),
		4  => __( 'Bylaws updated.', 'dsa-content' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Bylaws restored to revision from %s', 'dsa-content' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Bylaws published. <a href="%s">View Bylaws</a>', 'dsa-content' ), esc_url( $permalink ) ),
		7  => __( 'Bylaws saved.', 'dsa-content' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Bylaws submitted. <a target="_blank" href="%s">Preview Bylaws</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Bylaws scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Bylaws</a>', 'dsa-content' ), date_i18n( __( 'M j, Y @ G:i', 'dsa-content' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Bylaws draft updated. <a target="_blank" href="%s">Preview Bylaws</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}

add_filter( 'post_updated_messages', 'dsa_content_bylaws_updated_messages' );

/**
 * Sets the bulk post updated messages for the `bylaws` post type.
 *
 * @param  array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
 *                              keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
 * @param  int[] $bulk_counts   Array of item counts for each message, used to build internationalized strings.
 * @return array Bulk messages for the `bylaws` post type.
 */
function dsa_content_bylaws_bulk_updated_messages( $bulk_messages, $bulk_counts ) {
	global $post;

	$bulk_messages['bylaws'] = array(
		/* translators: %s: Number of Bylaws. */
		'updated'   => _n( '%s Bylaws updated.', '%s Bylaws updated.', $bulk_counts['updated'], 'dsa-content' ),
		'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Bylaws not updated, somebody is editing it.', 'dsa-content' ) :
						/* translators: %s: Number of Bylaws. */
						_n( '%s Bylaws not updated, somebody is editing it.', '%s Bylaws not updated, somebody is editing them.', $bulk_counts['locked'], 'dsa-content' ),
		/* translators: %s: Number of Bylaws. */
		'deleted'   => _n( '%s Bylaws permanently deleted.', '%s Bylaws permanently deleted.', $bulk_counts['deleted'], 'dsa-content' ),
		/* translators: %s: Number of Bylaws. */
		'trashed'   => _n( '%s Bylaws moved to the Trash.', '%s Bylaws moved to the Trash.', $bulk_counts['trashed'], 'dsa-content' ),
		/* translators: %s: Number of Bylaws. */
		'untrashed' => _n( '%s Bylaws restored from the Trash.', '%s Bylaws restored from the Trash.', $bulk_counts['untrashed'], 'dsa-content' ),
	);

	return $bulk_messages;
}

add_filter( 'bulk_post_updated_messages', 'dsa_content_bylaws_bulk_updated_messages', 10, 2 );
