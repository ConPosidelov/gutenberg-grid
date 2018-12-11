<?php

defined( 'ABSPATH' ) || exit;

/**
 * Define the internationalization functionality
 */
class GC_i18n {
    /**
     * Load the plugin text domain for translation.     
     */
    public function load_plugin_textdomain() {
        load_plugin_textdomain(
            'gc',
            false,
            dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
        );
    }
}