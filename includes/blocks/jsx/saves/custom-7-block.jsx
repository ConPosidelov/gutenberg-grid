/**
 * External dependencies
 */
import classnames from 'classnames';
import {
  SortableContainer, 
  SortableElement, 
  arrayMove, 
  SortableHandle
} from 'react-sortable-hoc';
/**
 * WordPress dependencies
 */

const { __, _x } = wp.i18n;
const {
  Component,
  Fragment,
} = wp.element;

const {
  Dashicon,
  IconButton,
  Button, 
  Dropdown,
  Panel, 
  PanelBody, 
  PanelRow,
  Draggable
} = wp.components;

const {
  RichText,
  InspectorControls,
  PanelColorSettings,
  InnerBlocks
} = wp.editor;

const { registerBlockType } = wp.blocks;


/**
 * Internal dependencies
 */

import './../scss/custom-7-block.scss';


const blockAttributes = {
  state: {
    type: 'string'
  },
};

const name = 'PS/bootstrap-grid';

const initialState = {
  bootstrapVer: 4,
  layout: 'container',
  rows: [
    [
      {
        cellClass: 'col-sm'
      },
      {
        cellClass: 'col-sm'
      },
    ]
  ]
};

const parseState = (src, initialState) => {
  if(!src) return initialState;
  return JSON.parse(src)
};
/*
const stringifyState = (state, target, setFn) => {
  setFn({ [target]: JSON.stringify(state) })
};
*/
// we will have only two args  - if hardcore key 'state' 
const stringifyState = (state, setFn) => {
  setFn({ state: JSON.stringify(state) })
};


/*

*/

class BootstrapGrid extends Component {
  constructor() {
    super(...arguments);
    this.nodeRef = null;
    this.bindRef = this.bindRef.bind(this);
    this.dryState = this.dryState.bind(this);
  
    this.state = {
      currentState: {
        bootstrapVer: '',
        layout: '',
        rows: []
      }
      
    }
  }
  

  dryState(key, obj) {
    const {currentState} = this.state;
    //console.log('this.state-dry =', this.state);
    if(!currentState[key]) currentState[key] = {};
    currentState[key] = { ...currentState[key], ...obj };

    stringifyState(currentState, this.props.setAttributes);
    this.setState({currentState});
  }

  componentDidMount() {
    const { state } = this.props.attributes;
    const currentState = parseState(state, initialState);
    this.setState({currentState})
  }

  bindRef( node ) {
    if ( ! node ) {
      return;
    }
    this.nodeRef = node;
  }

  render() {

    const {
      isSelected,
      className,
    } = this.props;
    const { 
      currentState: {
        bootstrapVer,
        layout,
        rows
      }
    } = this.state;

    const rowsNumber = rows.length;
        
    let gridList, grid;

    if(rowsNumber) {

      gridList = rows.map((row, index) => {
        if(!row.length) return;
        const cells = row.map(({cellClass}, i) => {
          return (
            <div key={`cell-${index}-${i}`} className={cellClass}>
              <InnerBlocks />
            </div>
          );
        });
        return (
          <div key={`row-${index}`} className={row}>
            {cells}
          </div>
        );
        
      });

      grid = (
        <div className={layout}>{gridList}</div>
      );
    }
    
    

    return (
      <Fragment>
        { rowsNumber && (
          <div className={className} ref={this.bindRef}>

            {grid}
                     
            <InspectorControls>
              
             
              
              
            </InspectorControls>
          </div>
        )}
      </Fragment>
    );
  }
};

const edit = BootstrapGrid;

/*
      registerBlockType  function  =====================================================
*/

registerBlockType( 'gc/custom7-block', {
  title: 'Bootstrap-grid',
  icon: 'editor-table',
  category: 'common',
  attributes: blockAttributes, 

  edit,


  save( { attributes } ) {
    
    const { layout, rows } = parseState(attributes.state, initialState);
    const rowsNumber = rows.length;
    let gridList, grid;
    if(rowsNumber) {
      gridList = rows.map((row, index) => {
        if(!row.length) return;
        const cells = row.map(({cellClass}, i) => {
          return (
            <div key={`cell-${index}-${i}`} className={cellClass}>
              <InnerBlocks.Content />
            </div>
          );
        });
        return (
          <div key={`row-${index}`} className={row}>
            {cells}
          </div>
        );
      });

      grid = (
        <div className={layout}>{gridList}</div>
      );
    }

    return (
      <div>
        { rowsNumber && {grid}}
      </div>
    );

  }
  
});
