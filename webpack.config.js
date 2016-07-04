var path = require('path');
module.exports = {
  entry: './src/ccNetVizMultiLevel.js',
  output: {
    filename: './dist/ccNetViz.js',
  },
  loaders: [
    {
//      test: /\.js?$/,
      test: path.join(__dirname, 'es6'),
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015']
      }
    }
  ]
};