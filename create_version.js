var ClosureCompiler = require('google-closure-compiler').compiler;


console.log('Compiling ccNetViz library');

var fs = require('fs');

var version = fs.readFileSync('curversion');

function copyFile(from, to){
    fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

copyFile('dist/ccNetViz.js', 'dist/builds/ccNetViz-'+version+'.js');
copyFile('dist/ccNetViz.min.js', 'dist/builds/ccNetViz-'+version+'.min.js');
