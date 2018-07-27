var Webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: './src/ccNetVizMultiLevel.js',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'ccNetViz.js',
    },


    /**
     *   | devtool value  | build   | rebuild | production  | quality
     *   | 'source-map'   | slow    | slow    | yes         | original source
     */
    devtool: 'source-map',

    module: {
        rules: [
            // Loader 1
            {
                // Target Files
                test: /\.js?$/g,

                // Excluded folders
                exclude: /(node_modules|bower_components)/,

                // The Loader
                loader: 'babel-loader',

                // Loader Configurations
                query: {
                    presets: ['es2015']
                },
            }
        ]
    },
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
};