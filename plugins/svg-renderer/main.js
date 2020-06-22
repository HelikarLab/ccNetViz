import { generateLines } from './plugins/edges/line';
import { generateCurves } from './plugins/edges/curve';
import { generateCircles } from './plugins/edges/circle';
import { generateNodes } from './plugins/nodes/node';
import { generateLabels } from './plugins/labels/label';

let Integration = (de, el, o) => {
  let drawEntities = de;
  let element = el;
  let options = o;

  // Generating styles
  let svg = new SVGRenderer();
  svg.draw(drawEntities, element, options);
};

class SVGRenderer {
  async draw(drawEntities, svg, styles) {
    svg.setAttribute(
      'style',
      'background-color:' + styles.background.color || rgb(255, 255, 255)
    );
    // hash map to store arrow head defintions
    // so as to reduce its new generation
    let arrowHeadHashMap = {};

    let generateLin = new generateLines();
    await generateLin.set(drawEntities, svg, styles, arrowHeadHashMap);

    let generateCur = new generateCurves();
    await generateCur.set(drawEntities, svg, styles, arrowHeadHashMap);

    let generateCir = new generateCircles();
    await generateCir.set(drawEntities, svg, styles, arrowHeadHashMap);

    let generateNod = new generateNodes();
    generateNod.set(drawEntities, svg, styles);

    let generateLab = new generateLabels();
    await generateLab.set(drawEntities, svg, styles);
  }
}

if (typeof ccNetViz === 'undefined') {
  console.warn('ccNetViz example plugin could not be implemented.');
} else {
  if (typeof ccNetViz.plugin === 'undefined') ccNetViz.plugin = {};
  ccNetViz.plugin.svg_renderer = { Integration };
}

export default { Integration };
