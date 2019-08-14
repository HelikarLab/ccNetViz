var webpage = require('webpage').create();
const port = '8125';

webpage
  .open(`http://127.0.0.1:${port}/ci_test/examples`)
  .then(function(status) {
    if (status) {
      console.log(
        '\x1b[34m',
        '[ccNetViz]',
        '\x1b[0m',
        'Test started with the :::8125 port.'
      );
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
    .open(`http://127.0.0.1:${port}/ci_test/examples/${p}.html`)
    .then(function() {
      page.viewportSize = {
        width: 250,
        height: 250,
      };

      setTimeout(function() {
        let path = `ci_test/images/${p}.png`;
        page.render(path);
        console.log(
          '\x1b[34m',
          '[ccNetViz]',
          '\x1b[0m',
          `${p} graph image created.`
        );
        if (exit) {
          slimer.exit();
        }
      }, 3000);
    });
  return new Promise(resolve => setTimeout(resolve, 4000));
}
