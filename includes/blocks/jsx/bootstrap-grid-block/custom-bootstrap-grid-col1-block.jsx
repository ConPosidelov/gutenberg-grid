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



export const blockName = 'gc-custom/bootstrap-grid-col1-block';

const settings = {
  title: __( 'Col1' ),

  parent: [ 'gc-custom/bootstrap-grid-block'],

  icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path fill="none" d="M0 0h24v24H0V0z" /><Path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z" /></SVG>,

  description: __( 'A single column within a columns block.' ),

  category: 'common',
  attributes: {
    cellClass: {
      type: 'string'
    },
  },

  supports: {
    inserter: false,
    reusable: false,
    html: false,
  },

  edit(props) {
    console.log('props=', props);
    const {cellClass} = props.attributes;
    console.log('attributes cellClass=', cellClass);
    
    return (
      <div className={`my_column ${cellClass}`}>
        <InnerBlocks templateLock={false} />
      </div>
    );
  },

  save({attributes: {cellClass}}) {
    return( 
      <div className={ cellClass }>
        <InnerBlocks.Content />
      </div>);
  },
};

registerBlockType( blockName, settings );

