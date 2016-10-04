var Webpack = require("webpack");

var flags = {};
process.argv.forEach(function (val, index, array) {
  flags[val] = true;
});


var ClosureCompiler = require('google-closure-compiler').compiler;

function runClosueCompiler(){
    if(!flags.compiled)
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



var path = require('path');

// returns a Compiler instance
var webpackinst = Webpack({
  entry: './src/ccNetVizMultiLevel.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'ccNetViz.js',
  },
  module:{
  loaders: [
    {
//      test: /\.js?$/g,
      exclude: /(node_modules|bower_components)/,
      query: {
        presets: ['es2015']
//      compact: false
      },
      loader: 'babel-loader' // 'babel-loader' is also a legal name to reference
    }
  ]
  }
});


console.log('Packing ccNetViz library with webpack');
webpackinst.run(function(err, stats) {
    if(err){
        console.error(" --- ERROR in packing");
        console.error(err);
        return;
    }

    console.log(' --- Successfully packed into dist/ccNetViz.js');

    runClosueCompiler();
});





/*
// or
webpackinst.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
    // ...
});
*/