<?php

defined( 'ABSPATH' ) || exit;

/**
 * Fired during plugin deactivation.
 */
class GC_Deactivator {
  /**   
   *
   * @since    1.0.0
   */
  public static function deactivate() {
    global $wpdb, $wp_version;
                    
    include_once dirname( __FILE__ ) . '/class-gc-activator.php';      
    GC_Activator::drop_tables();
    GC_Activator::drop_options();  
    // Clear any cached data that has been removed
    wp_cache_flush();    
  }
}