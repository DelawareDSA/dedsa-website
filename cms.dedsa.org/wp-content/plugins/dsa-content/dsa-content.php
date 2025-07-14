<?php
/**
 * Plugin Name:     Dsa Content
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     Registers all DSA custom post types and exposes them to WPGraphQL.
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     dsa-content
 * Domain Path:     /languages
 * Version:         0.1.3
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Autoload all post-type registration files:
foreach ( glob( __DIR__ . '/post-types/*.php' ) as $file ) {
    require_once $file;
}
