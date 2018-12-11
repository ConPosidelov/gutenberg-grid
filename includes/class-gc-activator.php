<?php

defined( 'ABSPATH' ) || exit;

/*
 * This class defines all code necessary to run during the plugin's activation.
 */
class GC_Activator {
  /**     
   *
   * @since    1.0.0
   */
  public static function activate() {
    self::create_options();
    self::create_tables();
  }

  /**
   * Get schema
   * @return array
   */
  private static function get_schema() {
    global $wpdb;

    $collate = '';
    if ( $wpdb->has_cap( 'collation' ) ) {
      $collate = $wpdb->get_charset_collate();
    }

    $tables = "
    ";

    return $tables;
  }

  /**
   * Get core tables
   * @return array
   */
  public static function get_tables() {
    global $wpdb;

    $tables = array(
    );
    return $tables;
  }


  /**
   * Drop GC tables.
   *
   * @return void
   */
  public static function drop_tables() {
    global $wpdb;

    $tables = self::get_tables();

    foreach ( $tables as $table ) {
      $wpdb->query( "DROP TABLE IF EXISTS {$table}" );
    }
  }

  /**
   * Create tables   
   */
  public static function create_tables() {
    global $wpdb;

    $wpdb->hide_errors();

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';

    dbDelta( self::get_schema() );
  }

  /**
   * Default options.
   *
   * Sets up the default options used on the settings page.
   */
  public static function create_options() {    
    add_option( 'gc_option_1', __( 'Select options', 'gc' ), '', 'yes' );         
  }

  /**
   * Drop options   
   */
  public static function drop_options() {
    delete_option( 'gc_option_1' );    
  }
}