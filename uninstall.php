<?php
/**
 * Uninstall Login Designer.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Load the Login Designer file.
require_once 'login-designer.php';

// Pull the Login Designer page from options.
$page = Login_Designer()->get_login_designer_page();
$page = $page->ID;

wp_trash_post( $page );

// Remove all plugin settings.
delete_option( 'login_designer' );
delete_option( 'login_designer_settings' );
delete_option( 'login_designer_license' );

// Clear any cached data that has been removed.
wp_cache_flush();
