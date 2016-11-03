var Webpack = require("webpack");

var flags = {};
process.argv.forEach(function (val, index, array) {
  flags[val] = true;
});


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



var path = require('path');

// returns a Compiler instance
var webpackinst = Webpack({
  entry: './src/ccNetVizMultiLevel.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'ccNetViz.js',
  },
//  resolve: {
//    extensions: ['', '.js', '.jsx']
//  },
  devtool: 'source-map',
  debug:true,
  module:{
  loaders: [
    {
//      test: /\.js?$/g,
      exclude: /(node_modules|bower_components)/,
      query: {
//	plugins: ['transform-es2015-modules-commonjs'],
        presets: ['es2015']
//      compact: false
      },
//      loader: 'babel-loader' // 'babel-loader' is also a legal name to reference
      loader: 'babel' // 'babel-loader' is also a legal name to reference
    }
  ]
  }
},function(err, stats) {
        if (err) { 
            console.error(" --- ERROR in webpack configuration");
            console.error(stats);
            process.exit(0);
        }
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

      runClosueCompiler();
    },5*100);
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