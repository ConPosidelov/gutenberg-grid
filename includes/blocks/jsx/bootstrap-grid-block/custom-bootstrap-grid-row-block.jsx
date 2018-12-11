/**
 * WordPress dependencies
 */
const { Path, SVG }  = wp.components;
const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;


/**
 * Internal dependencies
 */

import './../../scss/custom-bootstrap-grid-col1-block.scss';
import { blockName as childName } from './custom-bootstrap-grid-col1-block.jsx';


export const blockName = 'gc-custom/bootstrap-grid-row-block';

const ALLOWED_BLOCKS = [ childName ];

const settings = {
  title: __( 'Row' ),

  parent: [ 'gc-custom/bootstrap-grid-block' ],

  icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path fill="none" d="M0 0h24v24H0V0z" /><Path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z" /></SVG>,

  description: __( 'A single column within a columns block.' ),

  category: 'common',

  attributes: {
    ddd: {
      type: 'string'
    },
  },
 

  edit(props) {
    console.log('row add');
    console.log('row props', props);  
    return (
      <div className={`my_row row`}>
        <InnerBlocks templateLock={false}  />
      </div>
    );
  },

  save() {
    return( 
      <div className={"row"}>
        <InnerBlocks.Content />
      </div>);
  },
};

registerBlockType( blockName, settings );