const { registerBlockType } = wp.blocks;
const { withSelect } = wp.data;

registerBlockType( 'gc/custom3-block', {
    title: 'Custom (Dynamic)',

    icon: 'megaphone',

    category: 'layout',    

    edit: withSelect( ( select ) => {
        return {
            posts: select( 'core' ).getEntityRecords( 'postType', 'post' )
        };
    } )( ( { posts, className } ) => {

        if ( ! posts ) {
            return "Loading...";
        }

        if ( posts && posts.length === 0 ) {
            return "No posts";
        }

        let post = posts[ 0 ];

        return <a className={ className } href={ post.link }>
            { post.title.rendered }
        </a>;
    } ),

    save() {        
        // Rendering in PHP
        return null;
    },
} );