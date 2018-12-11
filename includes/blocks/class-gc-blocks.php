<?php

defined( 'ABSPATH' ) || exit;

/**
 * The front-specific functionality of the plugin. 
 *
 * @since   1.0.0
 */
class GC_Front {
  /**
   * The ID of this plugin.     
   *
   * @var string $plugin_name
   */
  private $plugin_name;
  /**
   * The version of this plugin.   
   *
   * @var string $version
   */
  private $version;

  /**
   * Initialize the class and set its properties.
   *
   * @param string $plugin_name
   * @param string $version
   */
  public function __construct( $plugin_name, $version ) {
    $this->plugin_name = $plugin_name;
    $this->version = $version;
  }  

  /**
   * hook-handler: wp_enqueue_scripts
   * Register the stylesheets for the Product page
   */
  public function enqueue_styles() {        
    wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/gc-front.css', array(), $this->version, 'all' );
  }

  /**
   * hook-handler: wp_enqueue_scripts
   * Register the JavaScript files for the Product page
   */
  public function enqueue_scripts() {        
    wp_enqueue_script( $this->plugin_name . '_front', plugin_dir_url( __FILE__ ) . 'js/gc-front.js', array( 'jquery' ), $this->version, false );
  }  

  public function register_custom2_block() {

    wp_register_script(
        'gc-custom2-block',
        plugins_url( 'js/custom-2-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element' )
    );

    wp_register_style(
        'gc-custom2-block-editor',
        plugins_url( 'css/custom-2-block-editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom-2-block-editor.css' )
    );

    wp_register_style(
        'gc-custom2-block-front',
        plugins_url( 'css/custom-2-block-front.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom-2-block-front.css' )
    );

    register_block_type( 'gc/custom2-block', array(
      'editor_script' => 'gc-custom2-block',
      'editor_style'  => 'gc-custom2-block-editor',
      'style'  => 'gc-custom2-block-front',
    ) );
  }
  

  public function register_custom4_block() {

    wp_register_script(
        'gc-custom4-block',
        plugins_url( 'js/custom-4-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' )
    ); 

    wp_register_style(
        'gc-custom4-block',
        plugins_url( 'css/custom-4-block.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom-4-block.css' )
    );   

    register_block_type( 'gc/custom4-block', array(
      'script' => 'gc-custom4-block',      
      'style' => 'gc-custom4-block',      
    ) );

    /*
     * Pass already loaded translations to our JavaScript.
     *
     * This happens _before_ our JavaScript runs, afterwards it's too late.
     */
    wp_add_inline_script(
      'gc-custom4-block',
      sprintf( 
        'var gcLocale = { localeData: %s };', 
        json_encode( ! function_exists( 'wp_get_jed_locale_data' ) ? gutenberg_get_jed_locale_data( 'gc' ) : wp_get_jed_locale_data( 'gc' ) )
      ),
      'before'
    );

  }

  public function register_custom5_block() {

    wp_register_script(
        'gc-custom5-block',
        plugins_url( 'js/custom-5-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element' )
    );    

    register_block_type( 'gc/custom5-block', array(
      'editor_script' => 'gc-custom5-block',      
    ) );
  }

  public function register_gc_button_block() {

    wp_register_script(
        'gc-button-block',
        plugins_url( 'js/gc-button-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element' )
    );    

    register_block_type( 'gc/button-block', array(
      'editor_script' => 'gc-button-block',      
    ) );
  }
  public function register_custom6_block() {

    wp_register_script(
        'gc-custom6-block',
        plugins_url( 'js/custom-6-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-editor' )
    );
    
    wp_register_style(
      'gc-custom6-block',
      plugins_url( 'css/custom-6-block.css', __FILE__ ),
      array('wp-blocks'),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom-6-block.css' )
    );   

    register_block_type( 'gc/custom6-block', array(
      'editor_script' => 'gc-custom6-block',
      'style' => 'gc-custom6-block',
      )
    );
  }
  public function register_custom7_block() {

    wp_register_script(
        'gc-custom7-block',
        plugins_url( 'js/custom-7-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element' )
    );
    
    wp_register_style(
      'gc-custom7-block',
      plugins_url( 'css/custom-7-block.css', __FILE__ ),
      array('wp-blocks'),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom-7-block.css' )
    );   

    register_block_type( 'gc/custom7-block', array(
      'editor_script' => 'gc-custom7-block',
      'style' => 'gc-custom7-block',
      )
    );
  }

  public function register_custom_bootstrap_grid_block() {

    wp_register_script(
        'gc-custom/bootstrap-grid-block',
        plugins_url( 'js/custom-bootstrap-grid-block.js', __FILE__ ),
        array(  'wp-blocks', 'wp-element', 'wp-components', 'wp-editor', 'wp-i18n' )
    );
    
    wp_register_style(
      'gc-custom/bootstrap-grid-block',
      plugins_url( 'css/custom-bootstrap-grid-block.css', __FILE__ ),
      array('wp-blocks', 'wp-components'),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom-bootstrap-grid-block.css' )
    );   

    register_block_type( 'gc-custom/bootstrap-grid-block', array(
      'editor_script' => 'gc-custom/bootstrap-grid-block',
      'style' => 'gc-custom/bootstrap-grid-block',
      )
    );

    // children
/*
    // rows
    wp_register_script(
        'gc-custom/bootstrap-grid-row-block',
        plugins_url( 'js/custom-bootstrap-grid-row-block.js', __FILE__ ),
        array(  'wp-blocks', 'wp-element', 'wp-components', 'wp-editor', 'wp-i18n' )
    );
    
    wp_register_style(
      'gc-custom/bootstrap-grid-row-block',
      plugins_url( 'css/custom-bootstrap-grid-row-block.css', __FILE__ ),
      array('wp-blocks'),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom-bootstrap-grid-row-block.css' )
    );   

    register_block_type( 'gc-custom/bootstrap-grid-row-block', array(
      'editor_script' => 'gc-custom/bootstrap-grid-row-block',
      'style' => 'gc-custom/bootstrap-grid-row-block',
      )
    );

    // cells

    

    wp_register_script(
        'gc-custom/bootstrap-grid-col1-block',
        plugins_url( 'js/custom-bootstrap-grid-col1-block.js', __FILE__ ),
        array(  'wp-blocks', 'wp-element', 'wp-components', 'wp-editor', 'wp-i18n' )
    );
    
    wp_register_style(
      'gc-custom/bootstrap-grid-col1-block',
      plugins_url( 'css/custom-bootstrap-grid-col1-block.css', __FILE__ ),
      array('wp-blocks'),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/custom-bootstrap-grid-col1-block.css' )
    );   

    register_block_type( 'gc-custom/bootstrap-grid-col1-block', array(
      'editor_script' => 'gc-custom/bootstrap-grid-col1-block',
      'style' => 'gc-custom/bootstrap-grid-col1-block',
      )
    );

    */

  }




  public function register_gc_groupbutton_block() {

    wp_register_script(
        'gc-groupbutton-block',
        plugins_url( 'js/gc-groupbutton-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element' )
    );    

    register_block_type( 'gc/groupbutton-block', array(
      'editor_script' => 'gc-groupbutton-block',      
    ) );
  }

  public function render_block_latest_post( $attributes, $content ) {
    $recent_posts = wp_get_recent_posts( array(
        'numberposts' => 1,
        'post_status' => 'publish',
    ) );
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
    }
    $post = $recent_posts[ 0 ];
    $post_id = $post['ID'];
    return sprintf(
        '<a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
        esc_url( get_permalink( $post_id ) ),
        esc_html( get_the_title( $post_id ) )
    );
  }
}