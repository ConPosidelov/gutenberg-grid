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
const { compose } = wp.compose;
console.log('wp=', wp);

const {
  Dashicon,
  IconButton,
  withFallbackStyles,
  G, 
  Path, 
  SVG,
  Button, 
  Dropdown,
  Panel, 
  PanelBody, 
  PanelRow,
  Draggable
} = wp.components;

console.log('Dashicon=', Dashicon);

const {
  RichText,
  getColorClassName,
  URLInput,
  ContrastChecker,
  InspectorControls,
  withColors,
  PanelColorSettings,
} = wp.editor;

const { registerBlockType } = wp.blocks;


/**
 * Internal dependencies
 */

import './../scss/custom-bootstrap-grid-block.scss';


const blockAttributes = {
  state: {
    type: 'string'
  },
};

const name = 'core/button';

const initialState = [
  {
    text: 'Button1',
    backgroundColor: '#FFE4C4',
    color: '#1C1C1C',
    url: '#'
  },
  {
    text: 'Button2',
    backgroundColor: '#FFE4C4',
    color: '#1C1C1C',
    url: '#'
  }
];

const parseState = (src, initialState) => {
  if(!src) return initialState;
  return JSON.parse(src)
};

const stringifyState = (state, target, setFn) => {
  setFn({ [target]: JSON.stringify(state) })
};
/* we will have only two args  - if hardcore key 'state' 
const setState = (state, setFn) => {
  setFn({ state: JSON.stringify(state) })
};
*/

const DragHandle = SortableHandle(() =>
  <span 
    className={'my-block-button__sortable-handle'}
  >
  ::
  </span>
);

const SortableItem = SortableElement((props) => {
  const {
    button, 
    i, 
    selectButton, 
    dryState, 
    removeButton,
    selected
  } = props;

  const { text, backgroundColor, color } = button;

  let border = 'none';
  let display = 'none';
  if(selected === i) {
    border = '1px solid red';
    display = 'block'
  } 
  return (
    <div 
      key={i} 
      className={'my-block-button__item'} 
      onClick={() => selectButton(i) } 
      style={{border}}
    >
      <DragHandle />
      <RichText
        placeholder={__('Add text…')}
        value={text}
        onChange={(value) => dryState( i, { text: value } )}
        formattingControls={[ 'bold', 'italic', 'strikethrough' ]}
        className={'my-block-button__link'}
        style={{
          backgroundColor,
          color,
          width: 'auto'
        }}
        keepPlaceholderOnFocus
      />
      <div
        title={'Remove button'} 
        className={'my-block-button__remove-item'} 
        onClick={() =>removeButton()}
        style={{display}}
      >
        x
      </div>
    </div>  
  );
});
      
const SortableList = SortableContainer(({ items, selectButton, dryState, removeButton, selected }) => {
        
  return (
    <div className="my-block-button__list" >
      {
        items.map((value, index) => {
          return  <SortableItem 
                    key={`item-${index}`} 
                    index={index} 
                    i={index}
                    button={value} 
                    selectButton={selectButton} 
                    dryState={dryState} 
                    removeButton={removeButton}
                    selected={selected}
                  />
        })
      }
    </div>
  );
}); 

/*
ButtonEdit
*/

class ButtonEdit extends Component {
  constructor() {
    super(...arguments);
    this.nodeRef = null;
    this.bindRef = this.bindRef.bind(this);
    this.dryState = this.dryState.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    this.changeTextColor = this.changeTextColor.bind(this);
    this.selectButton = this.selectButton.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.addButton = this.addButton.bind(this);
    this.removeButton = this.removeButton.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);

    this.state = {
      currentState: [],
      selectedButton: 0
    }
  }

  onSortEnd ({oldIndex, newIndex}) {
    this.setState({
      currentState: arrayMove(this.state.currentState, oldIndex, newIndex),
    });
    this.dryState(0, {});
  };

  addButton() {
    const {currentState} = this.state;
    const button = {
      text: 'New button',
      backgroundColor: '#FFE4C4',
      color: '#1C1C1C',
      url: '#'
    };
    currentState.push(button);
    this.setState({currentState});
    this.dryState(0, {});
  }

  removeButton() {
    const { currentState, selectedButton } = this.state;
    currentState.splice(selectedButton, 1);
    setTimeout(() => {
      this.setState({currentState, selectedButton: 0});
      this.dryState(0, {});
    }, 300);
  }

  getUrl() {
    let { currentState, selectedButton } = this.state;
    if(!currentState[selectedButton])selectedButton = 0; 
    return currentState[selectedButton].url
  }

  setUrl(url) {
    const {selectedButton} = this.state;
    this.dryState( selectedButton, {url})
  }

  selectButton(key) {
    console.log('selectButton =', key);
    this.setState({ selectedButton: key });
  }

  changeBackgroundColor(backgroundColor) {
    const {selectedButton} = this.state;
    this.dryState( selectedButton, {backgroundColor})
  }
  changeTextColor(color) {
    const {selectedButton} = this.state;
    this.dryState( selectedButton, {color})
  }

  dryState(key, obj) {
    const {currentState} = this.state;
    //console.log('this.state-dry =', this.state);
    if(!currentState[key]) currentState[key] = {};
    currentState[key] = { ...currentState[key], ...obj };

    stringifyState(currentState, 'state', this.props.setAttributes);
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
    const { currentState, selectedButton } = this.state;
        
    let buttonList;

    if(currentState.length) {
      buttonList = (
        <SortableList 
          items={currentState} 
          onSortEnd={this.onSortEnd} 
          useDragHandle={true} 
          selectButton={this.selectButton} 
          dryState={this.dryState} 
          removeButton={this.removeButton} 
          selected={selectedButton}
        />
      );
    }
    
    

    return (
      <Fragment>
        { currentState.length && (
          <div className={className} ref={this.bindRef}>
            {buttonList}
            <div
              title={'Add button'} 
              className="my-block-button__add-item"
              onClick={() => this.addButton()}
            >
              Add button
            </div>
            
            <InspectorControls>
              <Panel className="editor-panel-link-settings" header="">
                <PanelBody
                  className="panel-link-settings__body"
                  title={__('Link settings')}
                  initialOpen={ true }
                >
                  <PanelRow>
                    { isSelected && (
                      <form
                        className="block-my-button__inline-link"
                        onSubmit={ ( event ) => event.preventDefault() }>
                        <Dashicon icon="admin-links" />
                        <URLInput
                          value={this.getUrl()}
                          onChange={(url) => this.setUrl(url)}
                        />
                        <IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
                      </form>
                    ) }
                  </PanelRow>
                </PanelBody>
              </Panel>
              
              <PanelColorSettings
                title={ __( 'Color Settings' ) }
                colorSettings={ [
                  {
                    onChange: (color) => this.changeBackgroundColor(color),
                    label: __( 'Background Color' ),
                  },
                  {
                    onChange: (color) => this.changeTextColor(color),
                    label: __( 'Text Color' ),
                  },
                ] }
              >
              </PanelColorSettings>
            </InspectorControls>
          </div>
        )}
      </Fragment>
    );
  }
};

const edit = withColors('backgroundColor', {textColor: 'color'})(ButtonEdit);

/*
      registerBlockType  function  =====================================================
*/

registerBlockType( 'gc/custom6-block', {
  title: 'My buttons list',
  icon: 'heart',
  category: 'common',
  attributes: blockAttributes, 

  supports: {
    align: true,
    alignWide: false,
  },

  edit,


  save( { attributes } ) {
    
    const buttons = parseState(attributes.state, initialState);
    const list = buttons.map((button, key) => {
      const { text, backgroundColor, color, url } = button;
      return (
        <div 
          key={key} 
          className={'my-block-button__item'} 
        >
          <RichText.Content
            value={text}
            tagName="a" 
            href={url}
            className={'my-block-button__link'}
            style={{
              backgroundColor,
              color,
            }}
          />
        </div>  
      )  
    });

    return (
      <div>
        {list}
      </div>
    );

  }
  
});
