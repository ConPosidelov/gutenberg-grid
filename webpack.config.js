/**
* Config with SCSS
*/

var ExtractText = require('extract-text-webpack-plugin');

var extractBlockSCSS = new ExtractText({
  filename: './../css/[name].css'
});

var plugins = [ extractBlockSCSS ];

var scssConfig = {
  use: [
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'compressed'
      }
    }
  ]
};

module.exports = {
  context: __dirname,
  entry: {
    'custom-bootstrap-grid-block': './includes/blocks/jsx/custom-bootstrap-grid-block.jsx',
    'custom-bootstrap-grid-row-block': './includes/blocks/jsx/bootstrap-grid-block/custom-bootstrap-grid-row-block.jsx',
    'custom-bootstrap-grid-col1-block': './includes/blocks/jsx/bootstrap-grid-block/custom-bootstrap-grid-col1-block.jsx',

  },
  output: {
    path: __dirname + '/includes/blocks/js/',
    filename: '[name].js',
    libraryTarget: 'window',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractBlockSCSS.extract(scssConfig)
      }
    ]
  },
  plugins: plugins
};