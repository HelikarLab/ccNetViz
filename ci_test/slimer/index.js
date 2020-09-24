const config = require('./config.json');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const Test = require('./test');

function Init() {
  let tests = {};

  let imageTest = (() => {
    tests.image = new Promise(resolve => {
      class ImageTest extends Test {
        // Compare to the .stable.html with .test.html screenshots
        compare() {
          const images = path.join(__dirname, this.config.SCREENSHOTS);
          const encoding = { encoding: 'utf-8' };
          const files = this.config.TEMP.TEMPLATE.files;
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });

          let keys = {};
          let cursor = 0;

          // Create a unique test list by deleting extensions.
          files.map(item => {
            if (item.indexOf('.html') >= 0) {
              keys[
                item.replace('.stable.html', '').replace('.test.html', '')
              ] = true;
            }
          });

          // Each every images .stable.png and .test.png version
          for (let name in keys) {
            let stable = path.join(
              __dirname,
              `${this.config.SCREENSHOTS}/${name}.stable.png`
            );
            let test = path.join(
              __dirname,
              `${this.config.SCREENSHOTS}/${name}.test.png`
            );

            fs.readFile(stable, encoding, (err, stableData) => {
              if (!(err !== null && err !== undefined)) {
                fs.readFile(test, encoding, (err, testData) => {
                  if (!(err !== null && err !== undefined)) {
                    // If files not the same, throw error and mark as failed
                    if (stableData !== testData) {
                      this.log(
                        `${name} test failed, please check out the; \n ${test} \n ${stable}`,
                        false
                      );
                    } else {
                      this.log(`${name} test was successfully completed.`, true);
                    }

                    cursor++;

                    if (Object.keys(keys).length === cursor) {
                      this.log('Tests completed successfully!', true);
                      resolve(0);
                    }
                  } else {
                    this.log(err, false);
                  }
                });
              } else {
                this.log(err, false);
              }
            });
          }
        }
      }
      const _TestImage = new ImageTest(config.IMAGE);
    });
  });

  (() => {
    tests.animation = new Promise(resolve => {
      class AnimationTest extends Test {
        // Compare each frame to the next frame.
        compare() {
          const images = path.join(__dirname, this.config.SCREENSHOTS);
          const encoding = { encoding: 'utf-8' };
          const files = this.config.TEMP.TEMPLATE.files;
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          const frameLimit = 5;

          let keys = {};
          let cursor = 0;

          // Create a unique test list by deleting extensions.
          files.map(item => {
            if (item.indexOf('.html') >= 0) {
              keys[item.replace('.html', '').replace(/\d/g, '')] = true;
            }
          });

          for (let name in keys) {
            let pathList = [];

            for (let i = 1; i < frameLimit + 1; i++) {
              pathList.push(
                path.join(__dirname, `../animation_frames/${i}.${name}.png`)
              );
            }

            for (let i = 1; i < frameLimit; i++) {
              fs.readFile(pathList[i], encoding, (err, p) => {
                if (!(err !== null && err !== undefined)) {
                  fs.readFile(pathList[i - 1], encoding, (err, q) => {
                    if (!(err !== null && err !== undefined)) {
                      if (p === q)
                        this.log(
                          `${i}${name} scene doesnt updated, check out the; \n ${pathList[i - 1]
                          } \n ${pathList[i]}`,
                          false
                        );

                      cursor++;
                      if (
                        Object.keys(keys).length * (frameLimit - 1) ===
                        cursor
                      ) {
                        this.log('Tests completed successfully!', true);
                        resolve(0);
                      }
                    } else {
                      this.log(err, false);
                    }
                  });
                } else {
                  this.log(err, false);
                }
              });
            }
          }
        }
      }
      const animationTest = new AnimationTest(config.ANIMATIONS);
    });
  })();

  tests.animation.then(code => {
    if (code !== 0) {
      process.exit(code);
    } else {
      tests.animation.is_completed = true;
      x();
      check_is_completed();
      tests.image.then(code => {
        if (code != 0) {
          process.exit(code);
        } else {
          tests.image.is_completed = true;
          check_is_completed();
        }
      });
    }
  });

  let check_is_completed = () => {
    let status = true;
    for (key in tests) {
      if (tests[key].hasOwnProperty('is_completed') === false) status = false;
    }

    if (status === true) process.exit(0);
  };
}

Init();
