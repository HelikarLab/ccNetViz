/**
 * This script is not used anymore in favour of uglify-js webpack plugin 
 * To use this script add "&& node build.js" in the package.json node-scripts
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
    console.log(' --- Closure compiler executed successfully');  
}


setTimeout(function () {
  console.log(' --- appending module.exports into dist/ccNetViz.js (import fix)');
  var fs = require('fs');
  var filedata = [
    fs.readFileSync(__dirname + '/dist/ccNetViz.js').toString(),
    'if(typeof module !== "undefined")',
    'module.exports = ccNetViz;'
  ];

  //append to file export
  fs.writeFileSync(__dirname + '/dist/ccNetViz.js', filedata.join('\n'));

  console.log(' --- Executing closure compiler');
  runClosueCompiler();
}, 5 * 100);