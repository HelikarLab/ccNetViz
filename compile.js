var ClosureCompiler = require('google-closure-compiler').compiler;


console.log('Compiling ccNetViz library');

var fs = require('fs');

var closureCompiler = new ClosureCompiler({
  js: 'dist/ccNetViz.js',
  compilation_level: 'ADVANCED'
});
 
var compilerProcess = closureCompiler.run(function(exitCode, stdOut, stdErr) {
  //compilation complete 
  if(exitCode == 0){
    console.log('complilation successfully completed');
    fs.writeFileSync('dist/ccNetViz.min.js', stdOut);
    console.log('created compiled file in dist/ccNetViz.min.js');
  }else{
    console.log('complilation exited with code '+exitCode);
    console.log(stdOut);
    console.error(stdErr);
  }
});