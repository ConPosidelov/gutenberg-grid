const { registerBlockType } = wp.blocks;
const { __, setLocaleData } = wp.i18n;
const {
    RichText,
    MediaUpload,
} = wp.editor;
const { Button } = wp.components;

setLocaleData( window.gcLocale.localeData, 'gc' );

registerBlockType( 'gc/custom4-block', {
    title: __( 'Custom: Recipe Card', 'gc' ),
    icon: 'index-card',
    category: 'layout',
    attributes: {
        title: {
            type: 'array',
            source: 'children',
            selector: 'h2',
        },
        mediaID: {
            type: 'number',
        },
        mediaURL: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'src',
        },
        ingredients: {
            type: 'array',
            source: 'children',
            selector: '.ingredients',
        },
        instructions: {
            type: 'array',
            source: 'children',
            selector: '.steps',
        },
    },
    edit: ( props ) => {
        const {
            className,
            attributes: {
                title,
                mediaID,
                mediaURL,
                ingredients,
                instructions,
            },
            setAttributes,
        } = props;
        const onChangeTitle = ( value ) => {
            setAttributes( { title: value } );
        };

        const onSelectImage = ( media ) => {
            setAttributes( {
                mediaURL: media.url,
                mediaID: media.id,
            } );
        };
        const onChangeIngredients = ( value ) => {
            setAttributes( { ingredients: value } );
        };

        const onChangeInstructions = ( value ) => {
            setAttributes( { instructions: value } );
        };

        return (
            <div className={ className }>
                <RichText
                    tagName="h2"
                    placeholder={ __( 'Write Recipe title…', 'gc' ) }
                    value={ title }
                    onChange={ onChangeTitle }
                />
                <div className="recipe-image">
                    <MediaUpload
                        onSelect={ onSelectImage }
                        type="image"
                        value={ mediaID }
                        render={ ( { open } ) => (
                            <Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
                                { ! mediaID ? __( 'Upload Image', 'gc' ) : <img src={ mediaURL } alt={ __( 'Upload Recipe Image', 'gc' ) } /> }
                            </Button>
                        ) }
                    />
                </div>
                <h3>{ __( 'Ingredients', 'gc' ) }</h3>
                <RichText
                    tagName="ul"
                    multiline="li"
                    placeholder={ __( 'Write a list of ingredients…', 'gc' ) }
                    value={ ingredients }
                    onChange={ onChangeIngredients }
                    className="ingredients"
                />
                <h3>{ __( 'Instructions', 'gc' ) }</h3>
                <RichText
                    tagName="div"
                    multiline="p"
                    className="steps"
                    placeholder={ __( 'Write the instructions…', 'gc' ) }
                    value={ instructions }
                    onChange={ onChangeInstructions }
                />
            </div>
        );
    },
    save: ( props ) => {
        const {
            className,
            attributes: {
                title,
                mediaURL,
                ingredients,
                instructions,
            },
        } = props;
        return (
            <div className={ className }>
                <RichText.Content tagName="h2" value={ title } />

                {
                    mediaURL && (
                        <img className="recipe-image" src={ mediaURL } alt={ __( 'Recipe Image', 'gc' ) } />
                    )
                }

                <RichText.Content tagName="h2" className="ingredients" value={ ingredients } />

                <RichText.Content tagName="div" className="steps" value={ instructions } />
            </div>
        );
    },
} );