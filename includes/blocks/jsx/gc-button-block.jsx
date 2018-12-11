import { 
    SortableContainer,
    SortableElement,
    SortableHandle, 
    arrayMove 
} from 'react-sortable-hoc';
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const {
    PanelBody,
    RangeControl,
    ColorPicker,
    ToggleControl,
    SelectControl,
    RadioControl,
    TextControl,
    TabPanel,
    Dashicon,
    IconButton,
} = wp.components;
const {
    RichText,
    BlockControls,    
    InspectorControls,
    AlignmentToolbar,
    PanelColorSettings,
    URLInput,    
} = wp.editor;

registerBlockType( 'gc/button-block', {
    title: 'GC Button',

    icon: 'universal-access-alt',

    category: 'layout',

    attributes: {
        buttons: {
            type: 'array',
            source: 'query',
            selector: 'a',
            query: {
                text: {
                    type: 'string',
                    source: 'text',
                    default: '',
                },
                url: {
                    type: 'string',
                    source: 'attribute',
                    attribute: 'href',
                    default: '#',
                }
            },
            default: [ { text: 'Inital text', url: '' } ]
        }
    },

    edit( { attributes, className, setAttributes, isSelected } ) {        
        let { buttons } = attributes;

        const SortableItem = SortableElement( ( { value, itemId } ) =>             
            <li>
                { isSelected && <DragHandler /> }
                <RichText
                    key="editable"
                    tagName="a"                    
                    onChange={ onChangeText.bind( null, itemId ) }
                    value={ value.text }
                />
                { isSelected && <form className="block-library-button__inline-link">
                <Dashicon icon="admin-links" />
                <URLInput 
                    label="Url"                    
                    value={ value.url }
                    onChange={ onChangeUrl.bind( null, itemId ) }
                />
                <IconButton 
                    icon="trash" 
                    label={ 'Delete' }
                    onClick={ deleteButton.bind( null, itemId ) } />
                </form> }
            </li>            
        );

        const SortableList = SortableContainer( ( { items } ) => 
            <ul>
                { items.map( ( value, index ) =>                                 
                    <SortableItem key={`item-${index}`} index={index} itemId={index} value={value} />              
                ) }
            </ul>
        );                

        const DragHandler = SortableHandle(() => <i className="dashicons dashicons-move" />);

        function onChangeText( index, value ) {            
            let { buttons } = attributes;                        
            buttons = buttons.map( ( button, i ) => i === index ? 
                { ...button, text: value } : button 
            );            
            setAttributes( { buttons } );
        }

        function onChangeUrl( index, value ) {            
            let { buttons } = attributes;             
            buttons = buttons.map( ( button, i ) => i === index ? 
                { ...button, url: value } : button 
            ); 
            console.log('ch-url', buttons);           
            setAttributes( { buttons } );
        }

        function addNewButton() {
            let { buttons } = attributes;                    
            buttons = [
                ...buttons,
                { text: 'Some text', url: '' }
            ];            
            setAttributes( { buttons } );
        }    

        function deleteButton( index ) {            
            let { buttons } = attributes;
            buttons = buttons.filter( ( button, key ) => index !== key );
            setAttributes( { buttons } );
        }

        function onButtonsSort( { oldIndex, newIndex } ) {
            let { buttons } = attributes;            
            buttons = arrayMove( buttons, oldIndex, newIndex );            
            setAttributes( { buttons } );
        }

        return (
            <Fragment> 
                <ul>
                { buttons && buttons.map( ( button, index ) =>
                <li>                    
                    <RichText
                        key="editable"
                        tagName="a"                    
                        onChange={ onChangeText.bind( null, index ) }
                        value={ button.text }
                    />
                    { isSelected && <form className="block-library-button__inline-link">
                    <Dashicon icon="admin-links" />
                    <URLInput 
                        label="Url"                    
                        value={ button.url }
                        onChange={ onChangeUrl.bind( null, index ) }
                    />
                    <IconButton 
                        icon="trash" 
                        label={ 'Delete' }
                        onClick={ deleteButton.bind( null, index ) } />
                    </form> }
                </li>
                ) }
                </ul>                
                { isSelected && <IconButton icon="plus" label={ 'Add new' } onClick={ addNewButton } /> }
            </Fragment>
        );
    },

    save( { attributes, className } ) {
        // { //buttons && <SortableList items={ buttons } useDragHandle={true} onSortEnd={ onButtonsSort } /> }
        const { buttons } = attributes;                     
        return (
            <div class="gc-buttons">
                { buttons.map( button =>
                <a href={ button.url }>{ button.text}</a>
                ) }
            </div> 
        );
    }
});