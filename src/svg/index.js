import { generateLines } from './plugins/edges/line';
import { generateCurves } from './plugins/edges/curve';
import { generateCircles } from './plugins/edges/circle';
import { generateNodes } from './plugins/nodes/index';
import { generateLabels } from './plugins/labels/index';

var svgRenderer = function() {
  this.draw = function(drawEntities, svg, styles) {
    console.log(drawEntities);
    let generateLin = new generateLines();
    generateLin.set(drawEntities, svg, styles);

    let generateCur = new generateCurves();
    generateCur.set(drawEntities, svg, styles);

    let generateCir = new generateCircles();
    generateCir.set(drawEntities, svg, styles);

    let generateNod = new generateNodes();
    generateNod.set(drawEntities, svg, styles);

    let generateLab = new generateLabels();
    generateLab.set(drawEntities, svg, styles);
  };
};

export { svgRenderer };
