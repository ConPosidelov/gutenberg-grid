<?php

defined( 'ABSPATH' ) || exit;

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.

 */
class GC {
    /**
     * The loader that's responsible for maintaining and registering all hooks that power the plugin.     
     */
    protected $loader;
    /**
     * The unique identifier of this plugin.     
     */
    protected $GC;
    /**
     * The current version of the plugin.     
     */
    protected $version;
    /**
     * Define the core functionality of the plugin.     
     */
    public function __construct() {
        if ( defined( 'GC_VERSION' ) ) {
            $this->version = GC_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->GC = 'gc';        
        $this->load_dependencies();        
        $this->set_locale();     
        $this->define_blocks_hooks();
    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - GC_Loader. Orchestrates the hooks of the plugin.
     * - GC_i18n. Defines internationalization functionality.
     * - GC_Charge_Calculations. Defines all hooks related to the charge calculations.
     * - GC_Admin. Defines all hooks for the admin area.
     * - GC_Front. Defines all hooks for the public side of the site.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.     
     */
    private function load_dependencies() {



        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/gc-functions.php';
        
                
        
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-gc-loader.php';        
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-gc-i18n.php';
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/blocks/class-gc-blocks.php';        

        $this->loader = new GC_Loader();        
        
    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the GC_i18n class in order to set the domain and to register the hook
     * with WordPress.            
     */
    private function set_locale() {
        $plugin_i18n = new GC_i18n();
        $this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
    } 
    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.     
     */
    private function define_blocks_hooks() {
        $plugin_blocks = new GC_Front( $this->get_GC(), $this->get_version() );
        //$this->loader->add_action( 'wp_enqueue_scripts', $plugin_blocks, 'enqueue_styles' );
        //$this->loader->add_action( 'wp_enqueue_scripts', $plugin_blocks, 'enqueue_scripts' ); 
        //$this->loader->add_action( 'init', $plugin_blocks, 'register_custom1_block' );
        //$this->loader->add_action( 'init', $plugin_blocks, 'register_custom2_block' );
        //$this->loader->add_action( 'init', $plugin_blocks, 'register_custom3_block' );
       // $this->loader->add_action( 'init', $plugin_blocks, 'register_custom4_block' );
       // $this->loader->add_action( 'init', $plugin_blocks, 'register_custom5_block' );
       // $this->loader->add_action( 'init', $plugin_blocks, 'register_custom6_block' );
       // $this->loader->add_action( 'init', $plugin_blocks, 'register_custom7_block' );
       $this->loader->add_action( 'init', $plugin_blocks, 'register_custom_bootstrap_grid_block' );
       // $this->loader->add_action( 'init', $plugin_blocks, 'register_gc_button_block' );
       // $this->loader->add_action( 'init', $plugin_blocks, 'register_gc_groupbutton_block' );
    }
    /**
     * Run the loader to execute all of the hooks with WordPress.     
     */
    public function run() {
        $this->loader->run();
    }
    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.     
     */
    public function get_GC() {
        return $this->GC;
    }
    /**
     * The reference to the class that orchestrates the hooks with the plugin.     
     */
    public function get_loader() {
        return $this->loader;
    }
    /**
     * Retrieve the version number of the plugin.     
     */
    public function get_version() {
        return $this->version;
    }
}