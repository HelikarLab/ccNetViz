var webpage = require('webpage').create();
const port = '8125';

webpage
  .open(`http://127.0.0.1:${port}/ci_test/animations`)
  .then(function(status) {
    if (status) {
      webpage.viewportSize = {
        width: 250,
        height: 250,
      };
      let pages = eval(webpage.content.replace(/<\/?[^>]+(>|$)/g, ''));
      (async function() {
        for (let i = 0; i < pages.length; i++) {
          const path = pages[i];
          let status = false;
          if (i + 1 === pages.length) status = true;
          await pageHandler(path.replace('.html', ''), status);
        }
      })();
    } else {
      slimer.exit();
    }
  });

function pageHandler(p, e) {
  let page = require('webpage').create();
  let exit = e;
  page
    .open(`http://127.0.0.1:${port}/ci_test/animations/${p}.html`)
    .then(function(status) {
      let asyncPageHandler = (async function() {
        page.viewportSize = {
          width: 250,
          height: 250,
        };

        let path = `ci_test/images/${p}.png`;
        let path2 = `ci_test/images/animation_${p}.png`;
        await setTimeout(function() {
          page.render(path);
        }, 500);
        await setTimeout(function() {
          page.render(path2);
          if (exit) {
            slimer.exit();
          }
        }, 2000);
        console.log(
          '\x1b[34m',
          '[ccNetViz]',
          '\x1b[0m',
          `${p} graph image created.`
        );

        await setTimeout(() => {}, 3000);
      })();
    });
  return new Promise(resolve => setTimeout(resolve, 4000));
}
