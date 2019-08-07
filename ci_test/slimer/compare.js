const fs = require('fs');
const path = require('path');
const readline = require('readline');

const images = path.join(__dirname, '../images');
const source = path.join(__dirname, '../../lib/ccNetViz.js');
const target = path.join(__dirname, '../lib/ccNetViz.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const encoding = { encoding: 'utf-8' };

let fileList = {};
let isFailed = false;

fs.readdir(images, (err, files) => {
  files.map(item => {
    if (item.indexOf('.png') >= 0) {
      fileList[item.replace('.stable.png', '').replace('.test.png', '')] = true;
    }
  });
  let i = 0;
  for (let name in fileList) {
    let stable = path.join(__dirname, `../images/${name}.stable.png`);
    let test = path.join(__dirname, `../images/${name}.test.png`);
    fs.readFile(stable, encoding, (err, stableData) => {
      if (!err) {
        fs.readFile(test, encoding, (err, testData) => {
          if (!err) {
            if (stableData !== testData) {
              console.log(
                '\x1b[31m',
                '[ccNetViz]',
                '\x1b[0m',
                `${name} test failed, please check out the; \n ${test} \n ${stable}`
              );
              isFailed = true;
            } else {
              console.log(
                '\x1b[32m',
                '[ccNetViz]',
                '\x1b[0m',
                `${name} test was successfully completed.`
              );
            }
            i++;
            if (Object.keys(fileList).length === i) {
              console.log(
                '\x1b[32m',
                '[ccNetViz]',
                '\x1b[0m',
                `======================================================`
              );
              result(isFailed);
            }
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  }
});

let result = isFailed => {
  if (isFailed) {
    rl.question(
      'The test was failed, accept the changes and sync the current build? [y/n]: ',
      a => {
        if (a.toLowerCase() === 'y') {
          console.log(
            '\x1b[32m',
            '[ccNetViz]',
            '\x1b[0m',
            'test/lib/ccNetViz.js updated.'
          );
          fs.copyFileSync(source, target);
        } else {
          console.log(
            '\x1b[34m',
            '[ccNetViz]',
            '\x1b[0m',
            'Test was terminated.'
          );
        }
        rl.close();
      }
    );
  } else {
    console.log(
      '\x1b[32m',
      '[ccNetViz]',
      '\x1b[0m',
      'Tests completed successfully!'
    );
    console.log(
      '\x1b[32m',
      '[ccNetViz]',
      '\x1b[0m',
      'test/lib/ccNetViz.js updated.'
    );
    fs.copyFileSync(source, target);
    rl.close();
  }
};
