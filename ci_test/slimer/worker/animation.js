const temp = require('../temp/animations');
const port = temp.port || '3000';

(async function() {
  for (let i = 0; i < temp.files.length; i++) {
    const p = temp.files[i];
    await open(p.replace('.html', ''), i + 1 === temp.files.length);
  }
})();

function open(p, s) {
  const page = require('webpage').create();
  let frame = 0;

  page
    .open(
      `http://127.0.0.1:${String(port)}/ci_test/animation_scenarios/${p}.html`
    )
    .then(() => {
      page.viewportSize = {
        width: 250,
        height: 250,
      };

      let captureFrame = setInterval(() => {
        if (s === true && frame === 5) {
          clearInterval(captureFrame);
          slimer.exit();
        } else if (frame === 5) {
          page.close();
          clearInterval(captureFrame);
        } else {
          frame++;
          page.render(`ci_test/animation_frames/${frame}.${p}.png`);
        }
      }, 500);
    });

  return new Promise(resolve => setTimeout(resolve, 4000));
}
