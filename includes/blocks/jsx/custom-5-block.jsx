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
} = wp.components;
const {
    RichText,
    BlockControls,    
    InspectorControls,
    AlignmentToolbar,
    PanelColorSettings,    
} = wp.editor;

registerBlockType( 'gc/custom5', {
    title: 'Custom 5 (RichText + Alignment)',

    icon: 'universal-access-alt',
 

    category: 'layout',

    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
        alignment: {
            type: 'string',
        },
        fontSize: {
            type: 'number',
            default: 17,
        },
        fontFamily: {
            type: 'string',
            default: 'Arial',
        },
        fontWeight: {
            type: 'string',
            default: 'normal',
        },
        textColor: {
            type: 'string',
            default: '#f00',
        },
        backgroundColor: {
            type: 'string',
        },
        hasUppercase: {
            type: 'boolean',
        },
    },

    edit( { attributes, className, setAttributes } ) {
        let { 
            content, 
            alignment, 
            fontFamily, 
            fontWeight,
            fontSize,             
            textColor, 
            backgroundColor, 
            hasUppercase 
        } = attributes;        
        function onChangeContent( newContent ) {
            setAttributes( { content: newContent } );
        }

        function onChangeAlignment( newAlignment ) {
            setAttributes( { alignment: newAlignment } );
        }

        function onChangeFontFamily( value ) {
            setAttributes( { fontFamily: value } );
        }

        function onChangeFontWeight( value ) {
            setAttributes( { fontWeight: value } );
        }

        function onChangeFontSize( newFontSize ) {
            setAttributes( { fontSize: newFontSize } );
        }

        function onChangeTextColor( newTextColor ) {            
            setAttributes( { textColor: newTextColor.hex } );
        }

        function onChangeBackgroundColor( newBackgroundColor ) {            
            setAttributes( { backgroundColor: newBackgroundColor } );
        }

        function onChangeUppercase( value ) {
            console.log('uppe', value);
            setAttributes( { hasUppercase: value } );
        }

        function onTabSelect( value ) {
            console.log('tabSel', value);            
        }        

        let style = { 
            textAlign: alignment, 
            fontFamily, 
            fontWeight, 
            fontSize: fontSize + 'px', 
            color: textColor, 
            backgroundColor: backgroundColor 
        };
        if ( hasUppercase ) {
            style['textTransform'] = 'uppercase';
        }

        return (
            <Fragment>
        {/*  */}
            
                <BlockControls>
                    <AlignmentToolbar
                        value={ alignment }
                        onChange={ onChangeAlignment }
                    />
                </BlockControls>
 
                <InspectorControls>
                    <TabPanel className="my-tab-panel"
                        activeClass="active-tab"
                        onSelect={ onTabSelect }
                        tabs={ [
                            {
                                name: 'text_tab',
                                title: 'Text',
                                className: 'tab-ua-gutenberg',
                            },
                            {
                                name: 'color_tab',
                                title: 'Color',
                                className: 'tab-ua-gutenberg',
                            },
                        ] }>
                        {
                            ( tab ) => {
                                switch ( tab.name ) {
                                    case 'text_tab':
                                    return (
                                        <PanelBody title={ 'Text Settings' } key="text_settings">
                                            <TextControl 
                                                label="Content1"
                                                onChange={ onChangeContent }
                                                value={ content }
                                            />
                                            <SelectControl
                                                label="Font Family"
                                                value={ fontFamily }
                                                options={ [
                                                    { label: 'Verdana', value: 'Verdana' },
                                                    { label: 'Arial', value: 'Arial' },                            
                                                    { label: 'Comic Sans MS', value: 'Comic Sans MS' },                            
                                                ] }
                                                onChange={ onChangeFontFamily }
                                            />
                                            <RadioControl
                                                label="Font Weight"
                                                selected={ fontWeight }
                                                options={ [
                                                    { label: 'Normal', value: 'normal' },                            
                                                    { label: 'Bold', value: 'bold' },                            
                                                ] }
                                                onChange={ onChangeFontWeight }
                                            />
                                            <RangeControl
                                                label="Font Size"
                                                value={ fontSize }
                                                onChange={ onChangeFontSize }
                                                min={ 10 }
                                                max={ 40 }
                                            />
                                            
                                            <ToggleControl label="Uppercase" 
                                                           checked={ hasUppercase }
                                                           onChange={ onChangeUppercase } />
                                        </PanelBody>
                                    );
                                        
                                    case 'color_tab':
                                    return (
                                        <PanelBody title={ 'Color Settings' } key="color_settings">
                                            <h3>Text Color</h3>
                                            <ColorPicker                            
                                                color={ textColor }
                                                onChangeComplete={ onChangeTextColor }
                                                disableAlpha
                                            />
                                            <PanelColorSettings
                                                title={ 'Background Color' }
                                                initialOpen={ true }
                                                colorSettings={ [ {
                                                    value: backgroundColor,
                                                    onChange: onChangeBackgroundColor,
                                                    label: 'Background Color',
                                                } ] }
                                            />
                                        </PanelBody>
                                    );                                        
                                }
                            }
                        }
                    </TabPanel>                    
                </InspectorControls> 

                <RichText
                    key="editable"
                    tagName="p"
                    className={ className }
                    style={ style }
                    onChange={ onChangeContent }
                    value={ content }
                />
            </Fragment>
        );
    },

    save( { attributes, className } ) {
        const { content, alignment, fontFamily, fontWeight, fontSize, textColor, backgroundColor, hasUppercase } = attributes;
        let style = { 
            textAlign: alignment,
            fontFamily, 
            fontWeight, 
            fontSize: fontSize + 'px', 
            color: textColor, 
            backgroundColor 
        };
        if ( hasUppercase ) {
            style['textTransform'] = 'uppercase';
        }
        return (
            <RichText.Content
                tagName="p"
                style={ style }
                className={ className }
                value={ content }
            />
        );
    },
} );