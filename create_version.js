var fs = require('fs');

var version = fs.readFileSync('curversion');


console.log('Creating ccNetViz library v: '+version);

function copyFile(from, to){
    fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

copyFile('dist/ccNetViz.js', 'dist/builds/ccNetViz-'+version+'.js');
copyFile('dist/ccNetViz.min.js', 'dist/builds/ccNetViz-'+version+'.min.js');
