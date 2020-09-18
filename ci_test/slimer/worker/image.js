const temp = require('../temp/images');
const port = temp.port || '8125';

(async function() {
  console.log(port);
  for (let i = 0; i < temp.files.length; i++) {
    const p = temp.files[i];
    await open(p.replace('.html', ''), i + 1 === temp.files.length);
  }
})();

function open(p, s) {
  const page = require('webpage').create();

  page
    .open(`http://127.0.0.1:${String(port)}/ci_test/scenarios/${p}.html`)
    .then(() => {
      page.viewportSize = {
        width: 250,
        height: 250,
      };

      setTimeout(() => {
        page.render(`ci_test/frames/${p}.png`);

        if (s === true) {
          slimer.exit();
          page.close();
        }
      }, 3000);
    });
  return new Promise(resolve => setTimeout(resolve, 4000));
}
