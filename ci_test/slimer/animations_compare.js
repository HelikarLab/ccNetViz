const fs = require('fs');
const path = require('path');
const readline = require('readline');

const images = path.join(__dirname, '../animation_frames');
const frameCount = 6;
const encoding = { encoding: 'utf-8' };

let fileList = {};
let isFailed = false;

fs.readdir(images, (err, files) => {
  files.map(item => {
    if (item.indexOf('.png') >= 0) {
      fileList[item.replace('.png', '').replace(/\d/g, '')] = true;
    }
  });
  let t = 0;
  for (let name in fileList) {
    let pathList = [];
    for (let i = 0; i < frameCount; i++) {
      pathList.push(
        path.join(__dirname, `../animation_frames/${i}${name}.png`)
      );
    }
    for (let i = 1; i < frameCount; i++) {
      fs.readFile(pathList[i], encoding, (err, p) => {
        if (!err) {
          fs.readFile(pathList[i - 1], encoding, (err, q) => {
            if (!err) {
              if (p === q) {
                console.log(
                  '\x1b[31m',
                  '[ccNetViz]',
                  '\x1b[0m',
                  `${i}${name} scene doesnt updated, check out the; \n ${
                    pathList[i - 1]
                  } \n ${pathList[i]}`
                );
              } else {
                console.log(
                  '\x1b[32m',
                  '[ccNetViz]',
                  '\x1b[0m',
                  `${i}${name} test was successfully completed.`
                );
                isFailed = true;
              }
            } else {
              console.log(err);
              process.exit(1);
            }
          });
        } else {
          console.log(err);
          process.exit(1);
        }
      });
    }
  }
});

let result = isFailed => {
  if (isFailed) {
    console.log('\x1b[31m', '[ccNetViz]', '\x1b[0m', 'Tests failed!');
    process.exit(1);
  } else {
    console.log(
      '\x1b[32m',
      '[ccNetViz]',
      '\x1b[0m',
      'Tests completed successfully!'
    );
    process.exit(0);
  }
};
