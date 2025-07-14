<?php
add_action('init','dsa_content_register_settings');
/**
 * Custom post type
 *
 * @package dsa_content
 */

/**
 * Registers the `settings` post type.
 */
function dsa_content_register_settings() {
	register_post_type(
		'settings',
		array(
			'labels'                => array(
				'name'                  => __( 'Settings', 'dsa-content' ),
				'singular_name'         => __( 'Settings', 'dsa-content' ),
				'all_items'             => __( 'All Settings', 'dsa-content' ),
				'archives'              => __( 'Settings Archives', 'dsa-content' ),
				'attributes'            => __( 'Settings Attributes', 'dsa-content' ),
				'insert_into_item'      => __( 'Insert into Settings', 'dsa-content' ),
				'uploaded_to_this_item' => __( 'Uploaded to this Settings', 'dsa-content' ),
				'featured_image'        => _x( 'Featured Image', 'settings', 'dsa-content' ),
				'set_featured_image'    => _x( 'Set featured image', 'settings', 'dsa-content' ),
				'remove_featured_image' => _x( 'Remove featured image', 'settings', 'dsa-content' ),
				'use_featured_image'    => _x( 'Use as featured image', 'settings', 'dsa-content' ),
				'filter_items_list'     => __( 'Filter Settings list', 'dsa-content' ),
				'items_list_navigation' => __( 'Settings list navigation', 'dsa-content' ),
				'items_list'            => __( 'Settings list', 'dsa-content' ),
				'new_item'              => __( 'New Settings', 'dsa-content' ),
				'add_new'               => __( 'Add New', 'dsa-content' ),
				'add_new_item'          => __( 'Add New Settings', 'dsa-content' ),
				'edit_item'             => __( 'Edit Settings', 'dsa-content' ),
				'view_item'             => __( 'View Settings', 'dsa-content' ),
				'view_items'            => __( 'View Settings', 'dsa-content' ),
				'search_items'          => __( 'Search Settings', 'dsa-content' ),
				'not_found'             => __( 'No Settings found', 'dsa-content' ),
				'not_found_in_trash'    => __( 'No Settings found in trash', 'dsa-content' ),
				'parent_item_colon'     => __( 'Parent Settings:', 'dsa-content' ),
				'menu_name'             => __( 'Settings', 'dsa-content' ),
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
        'graphql_single_name' => 'Setting',
        'graphql_plural_name' => 'Settings',
        // ─────────────────────────────────────────────────────────
			'menu_position'         => null,
			'menu_icon'             => 'dashicons-admin-post',
			'show_in_rest'          => true,
			'rest_base'             => 'settings',
			'rest_controller_class' => 'WP_REST_Posts_Controller',
		)
	);
}

add_action( 'init', 'dsa_content_register_settings' );

/**
 * Sets the post updated messages for the `settings` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `settings` post type.
 */
function dsa_content_settings_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['settings'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Settings updated. <a target="_blank" href="%s">View Settings</a>', 'dsa-content' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'dsa-content' ),
		3  => __( 'Custom field deleted.', 'dsa-content' ),
		4  => __( 'Settings updated.', 'dsa-content' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Settings restored to revision from %s', 'dsa-content' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false, // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Settings published. <a href="%s">View Settings</a>', 'dsa-content' ), esc_url( $permalink ) ),
		7  => __( 'Settings saved.', 'dsa-content' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Settings submitted. <a target="_blank" href="%s">Preview Settings</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Settings scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Settings</a>', 'dsa-content' ), date_i18n( __( 'M j, Y @ G:i', 'dsa-content' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Settings draft updated. <a target="_blank" href="%s">Preview Settings</a>', 'dsa-content' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}

add_filter( 'post_updated_messages', 'dsa_content_settings_updated_messages' );

/**
 * Sets the bulk post updated messages for the `settings` post type.
 *
 * @param  array $bulk_messages Arrays of messages, each keyed by the corresponding post type. Messages are
 *                              keyed with 'updated', 'locked', 'deleted', 'trashed', and 'untrashed'.
 * @param  int[] $bulk_counts   Array of item counts for each message, used to build internationalized strings.
 * @return array Bulk messages for the `settings` post type.
 */
function dsa_content_settings_bulk_updated_messages( $bulk_messages, $bulk_counts ) {
	global $post;

	$bulk_messages['settings'] = array(
		/* translators: %s: Number of Settings. */
		'updated'   => _n( '%s Settings updated.', '%s Settings updated.', $bulk_counts['updated'], 'dsa-content' ),
		'locked'    => ( 1 === $bulk_counts['locked'] ) ? __( '1 Settings not updated, somebody is editing it.', 'dsa-content' ) :
						/* translators: %s: Number of Settings. */
						_n( '%s Settings not updated, somebody is editing it.', '%s Settings not updated, somebody is editing them.', $bulk_counts['locked'], 'dsa-content' ),
		/* translators: %s: Number of Settings. */
		'deleted'   => _n( '%s Settings permanently deleted.', '%s Settings permanently deleted.', $bulk_counts['deleted'], 'dsa-content' ),
		/* translators: %s: Number of Settings. */
		'trashed'   => _n( '%s Settings moved to the Trash.', '%s Settings moved to the Trash.', $bulk_counts['trashed'], 'dsa-content' ),
		/* translators: %s: Number of Settings. */
		'untrashed' => _n( '%s Settings restored from the Trash.', '%s Settings restored from the Trash.', $bulk_counts['untrashed'], 'dsa-content' ),
	);

	return $bulk_messages;
}

add_filter( 'bulk_post_updated_messages', 'dsa_content_settings_bulk_updated_messages', 10, 2 );
