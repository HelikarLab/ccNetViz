/**
 *  Collecting Terminal Arguments
 */

var flags = {};

process.argv.forEach(function (val, index, array) {
  flags[val] = true;
});

/**
 *  Google Closuer Compiler Scrpit
 */
var ClosureCompiler = require('google-closure-compiler').compiler;

function runClosueCompiler(){
    if(!flags.compile)
      return;

    console.log('Compiling ccNetViz library with Google closure compiler');

    var fs = require('fs');

    var closureCompiler = new ClosureCompiler({
      js: 'dist/ccNetViz.js',
      compilation_level: 'ADVANCED'
    });
    
    var compilerProcess = closureCompiler.run(function(exitCode, stdOut, stdErr) {
      //compilation complete 
      if(exitCode === 0){
        console.log(' --- complilation successfully completed');
        fs.writeFileSync('dist/ccNetViz.min.js', stdOut);
        console.log(' --- created compiled file in dist/ccNetViz.min.js');
      }else{
        console.log(' --- complilation exited with code '+exitCode);
        console.log(stdOut);
        console.error(stdErr);
      }
    });
}

/**
 * Webpack Build Scrpit
 */
var Webpack = require("webpack");
var path = require('path');

// returns a Compiler instance
var webpackinst = Webpack({
  
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

  module:{
    rules: [
      // Loader 1
      {
        // Target Files
        // test: /\.js?$/g,
        
        // Excluded folders
        exclude: /(node_modules|bower_components)/,
        
        // The Loader
        loader: 'babel',

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
});


console.log('Packing ccNetViz library with webpack');
webpackinst.run(function(err, stats) {
    if(err){
        console.error(" --- ERROR in packing");
        console.error(err);
        return;
    }


    setTimeout(function(){
      console.log(' --- appending module.exports into dist/ccNetViz.js (import fix)');
      var fs = require('fs');
      var filedata = [
        fs.readFileSync(__dirname+'/dist/ccNetViz.js').toString(),
        'if(typeof module !== "undefined")',
        'module.exports = ccNetViz;'
      ];

      //append to file export
      fs.writeFileSync(__dirname+'/dist/ccNetViz.js', filedata.join('\n'));

      console.log(' --- Successfully packed into dist/ccNetViz.js');

      console.log(' --- Executing closure compiler');
      runClosueCompiler();
    },5*100);
});