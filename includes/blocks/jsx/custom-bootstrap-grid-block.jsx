/**
 * External dependencies
 */
import { times } from 'lodash';
import classnames from 'classnames';
//import memoize from 'memize';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { 
  Panel, 
  PanelBody,
  PanelRow, 
  Dashicon,
  IconButton,
  Button, 
  CheckboxControl, 
  G, 
  SVG, 
  Path 
} = wp.components;
const { Component, Fragment } = wp.element;
const { createBlock, registerBlockType } = wp.blocks;
const {
  InspectorControls,
  InnerBlocks,
} = wp.editor;

/**
 * Internal dependencies
 */
import RangeControl from './lib/components/RangeControl/index.jsx';
import { blockName as cellsName } from './bootstrap-grid-block/custom-bootstrap-grid-col1-block.jsx';
import { blockName as rowsName } from './bootstrap-grid-block/custom-bootstrap-grid-row-block.jsx';
import './../scss/custom-bootstrap-grid-block.scss';


const ALLOWED_BLOCKS = [ rowsName, cellsName ];


//console.log('ALLOWED_BLOCKS', ALLOWED_BLOCKS);

const blockName = 'gc-custom/bootstrap-grid-block';


const blockAttributes = {
  state: {
    type: 'string'
  },
};

const initialState = {
  bootstrapVer: 4,
  layout: 'container',
  rows: [
    [
      {
        cellClass: 'col-md-4',
        prefix: 'col-md',
        width: 4
      },
      {
        cellClass: 'col-md-8',
        prefix: 'col-md',
        width: 8
      },
    ]
  ]
};

const parseState = (src, initialState) => {
  if(!src) return initialState;
  return JSON.parse(src)
};

// we will have only two args  - if hardcore key 'state' 
const stringifyState = (state, setFn) => {
  setFn({ state: JSON.stringify(state) })
};

const getColumnClass = ({ prefix, width }) => `${prefix}-${width}`;


const edit = class BootstrapGrid extends Component {
  
  nodeRef = null
  state = {
    currentState: {
      bootstrapVer: '',
      layout: '',
      rows: []
    },
    isVisibleGridTemplate: true,
    isVisibleDeckControls: true,
    
  }
  

  setColumnsWidth = (val, { rowIndex, cellIndex }) => {
    //this.setState({colWidth})
    const {currentState} = this.state;
    currentState.rows[rowIndex][cellIndex].width = val;
    //console.log('setColumnsWidth=', currentState);
    this.setState({
      currentState
    })
  }

  toggelDeckControls = () => {
    const {isVisibleDeckControls} = this.state;
    this.setState({isVisibleDeckControls: !isVisibleDeckControls});
  }

  toggelGridTemplate = () => {
    const {isVisibleGridTemplate} = this.state;
    this.setState({isVisibleGridTemplate: !isVisibleGridTemplate});
  }

  getTemplate = () => {
    const { currentState: {rows} } = this.state;
    //console.log('getTemplate-rows =', rows);
    if(!rows.length) return [];
    const gridContent = rows.map(row => {
      if(!row.length) return [];
      const cells = row.map( cell => {
        const cellClass = getColumnClass(cell);
        //console.log('getTemplate-cellClass1=', cellClass);
          return [
            cellsName, {
              cellClass
            }
          ]
      });
      return [
        rowsName, {}, cells
      ]
    });
    console.log('getTemplate-gridContent=', gridContent);
    return gridContent
  }

  renderRowConrols = () => {
    const { currentState: {rows} } = this.state;
    if(!rows.length) return [];
    const rowConrols = rows.map((row, rowIndex) => {
      if(!row.length) return '';
      const cellConrols = row.map(({width}, cellIndex) => {
          return (
            <div key={`row-${rowIndex}-cell-${cellIndex}`}  className={'ps-editor-panel_row'}>
              <RangeControl
                label={(
                  <div className={'ps-editor-panel_row-label'}>
                    <span>{`Col-${cellIndex + 1}`}</span>
                    <span><Dashicon icon="trash" /></span>
                  </div>
                )}
                value={width}
                onChange={ val => this.setColumnsWidth(val, { rowIndex, cellIndex })}
                scale={{scaleMin: 1, scaleMax: 6}} 
                trackFill={true} 
                min={ 1 }
                max={ 6 }
              />
            </div>

          )

      });
      return (
        <div key={`row-${rowIndex}`} style={{width: '100%'}}>

        <PanelBody
          className="editor-panel_row-control"
          title={`Row - ${rowIndex + 1}`}
          initialOpen={ true }
        >
          {cellConrols}
          <div 
            title={'Add column'}
            className={'ps-editor-panel_add-column'}
            onClick={() => null}
          > 
            <Button isDefault>
              Add column
            </Button>                 
          </div>
        </PanelBody>

        </div>

      )
    });

    return rowConrols  
  }

  dryState = (key, obj) => {
    const {currentState} = this.state;
    
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

  bindRef = ( node ) =>{
    if ( ! node ) return;
    this.nodeRef = node;
  }

  gridList1 = () => {
    console.log(' gridList1');
   
    return <InnerBlocks
          template={ 
            [
              [
                'gc-custom/bootstrap-grid-row-block', 
                {ddd: 'ffff1' }, 
                [
                  
                ] 
              ]
            ]

           }
          templateLock="all"
          allowedBlocks={ ALLOWED_BLOCKS }
        />
  }

   gridList2 = () => {
    console.log(' gridList2');
   
    return <InnerBlocks
          template={ 
            [
              [
                'gc-custom/bootstrap-grid-row-block', 
                {ddd: 'ffff2' }, 
                [
                  
                ] 
              ]
            ]

           }
          templateLock="all"
          allowedBlocks={ ALLOWED_BLOCKS }
        />
  }


  gridList = () => {
    console.log('gridList');
    return(
      <InnerBlocks
        template={ this.getTemplate() }
        templateLock="all"
        allowedBlocks={ ALLOWED_BLOCKS }
      />
    )
  }




  render() {

    const {
      isSelected,
      className,
    } = this.props;

    
    const {
      currentState,
      currentState: {
        bootstrapVer,
        layout,
        rows
      },
      isVisibleGridTemplate,
      isVisibleDeckControls,
      bbbClick 
    } = this.state;

    let rowsNumber = rows.length;
        
    let grid;

    console.log('render -this.state', this.state);

    if(rowsNumber) {
      grid = (
        <div className={`my_layout ${layout}`}>{
          isVisibleGridTemplate ?  this.gridList1()
          :
          this.gridList2()

        }</div>
      );
    }
         


    return (
      <Fragment>
        { rowsNumber && (
          <div className={className} ref={this.bindRef}>
            {grid}

            <div 
              className={ classnames('grid-template', { visible: isVisibleGridTemplate }) }
            >

              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
              <div className={'grid-template_col'}></div>
            </div>

            <div 
              className={ classnames('deck-controls', { visible: isVisibleDeckControls }) }
            >
              <div 
                className={ classnames('deck-control_guides') }
              >

                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
                <div className={'grid-template_col'}></div>
              </div>  

            </div>


            <InspectorControls>
                
              <PanelBody
                className="editor-panel__grid-template-set"
                title={__('All settings')}
                initialOpen={ false }
              >
                <PanelRow>
                  <CheckboxControl
                    label="Show grid template"
                    checked={ isVisibleGridTemplate }
                    onChange={ () => this.toggelGridTemplate() }
                  />
                </PanelRow>
                <PanelRow>    
                  <CheckboxControl
                    label="Show deck controls"
                    checked={ isVisibleDeckControls }
                    onChange={ () => this.toggelDeckControls() }
                  />
                </PanelRow>

              </PanelBody>

              {this.renderRowConrols()}
                     
            </InspectorControls>
          </div>
        )}
      </Fragment>
    );
  }

};





const settings = {
  title: __( 'BootstrapGrid' ),

  icon: <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path fill="none" d="M0 0h24v24H0V0z" /><G><Path d="M21 4H3L2 5v14l1 1h18l1-1V5l-1-1zM8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z" /></G></SVG>,

  category: 'layout',

  attributes: blockAttributes,

  description: __( '' ),

  supports: {
    align: [ 'wide', 'full' ],
    html: false,
  },

 
  edit,

  save( { attributes } ) {
    
    const { layout } = parseState(attributes.state, initialState);

    return (
      <div className={ layout }>
        <InnerBlocks.Content />
      </div>
    );
  },
};



registerBlockType( blockName, settings );
