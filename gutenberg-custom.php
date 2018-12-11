<?php

/**
 * Plugin Name: Gutenberg Custom 
 * Description: Write description here.
 * Version: 1.0.0
 * Author: Alex Posidelov 
 * Text Domain: gc
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'GC_VERSION', '1.0.0' );

function activate_gc() {
  require_once plugin_dir_path( __FILE__ ) . 'includes/class-gc-activator.php';
  GC_Activator::activate();
}

function deactivate_gc() {
  require_once plugin_dir_path( __FILE__ ) . 'includes/class-gc-deactivator.php';
  GC_Deactivator::deactivate();
}
register_activation_hook( __FILE__, 'activate_gc' );
register_deactivation_hook( __FILE__, 'deactivate_gc' );

if ( ! function_exists( 'gc_woocommerce_plugin_notice' ) ) {
  function gc_woocommerce_plugin_notice() {
  ?>
  <div class="notice notice-warning">
    <p><?php echo __( '<strong>Gutenberg Custom</strong> requires <strong>WooCommerce</strong> to be activated', 'gc' ); ?></p>
  </div>
  <?php
  }
}

// check if woocommerce plugin has been activated
if ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
  if ( ! function_exists( 'WC' ) ) {
    add_action( 'admin_notices', 'gc_woocommerce_plugin_notice' );
  }
  return;
}

require plugin_dir_path( __FILE__ ) . 'includes/class-gc.php';

function run_gc() {
  $plugin = new GC();
  $plugin->run();
}
run_gc();

