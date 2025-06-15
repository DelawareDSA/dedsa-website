<?php

add_filter('xmlrpc_enabled', '__return_false');


define('FORCE_SSL_ADMIN', true);


define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', true);


define('HEADLESS_MODE', true);


define('WP_ENVIRONMENT_TYPE', defined('WP_ENV') ? WP_ENV : 'production');


if (defined('WP_CLI') && WP_CLI) {
    @ini_set('memory_limit', '512M');
}


define('WP_CONTENT_DIR', dirname(__FILE__) . '/wp-content');
define('WP_CONTENT_URL', 'https://' . $_SERVER['HTTP_HOST'] . '/wp-content');


define('WP_HTTP_BLOCK_EXTERNAL', true);
define('WP_ACCESSIBLE_HOSTS', 'api.wordpress.org,*.github.com');


define('AUTOMATIC_UPDATER_DISABLED', false);
define('WP_AUTO_UPDATE_CORE', 'minor');


define('DISABLE_WP_CRON', true);


define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);


add_action('graphql_response_headers', function() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        $allowed_origins = [
            'http://localhost:3000',
            'https://delawardsa.org'
        ];
        
        if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        }
    }
    
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
}, 10, 1);


add_action('send_headers', function() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
});
