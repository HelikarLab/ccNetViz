import { generateLines } from './plugins/edges/line';
import { generateCurves } from './plugins/edges/curve';
import { generateCircles } from './plugins/edges/circle';
import { generateNodes } from './plugins/nodes/node';
import { generateLabels } from './plugins/labels/label';

var svgRenderer = function() {
  this.draw = async function(drawEntities, svg, styles) {
    console.log(drawEntities);

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
    await generateNod.set(drawEntities, svg, styles);

    let generateLab = new generateLabels();
    await generateLab.set(drawEntities, svg, styles);
  };
};

export { svgRenderer };
