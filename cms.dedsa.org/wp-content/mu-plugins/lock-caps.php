<?php
/**
 * Remove elevated caps from Editors+.
 */
add_action( 'init', function() {
  // Prevent Editors from changing options.
  if ( $role = get_role('editor') ) {
    $role->remove_cap('manage_options');
  }
  // Prevent Authors from uploading files (optional).
  if ( $role = get_role('author') ) {
    $role->remove_cap('upload_files');
  }
} );
