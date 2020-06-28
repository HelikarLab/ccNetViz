import { generateLines } from './plugins/edges/line';
import { generateCurves } from './plugins/edges/curve';
import { generateCircles } from './plugins/edges/circle';
import { generateNodes } from './plugins/nodes/node';
import { generateLabels } from './plugins/labels/label';
import globalUtiilites from '../globalUtiilites';

var svg_renderer = function(svg, options) {
  let nodes = [];
  let edges = [];
  let drawEntities;

  this.set = async (n, e, layout, layout_options = {}) => {
    nodes = n || [];
    edges = e || [];

    nodes.forEach(globalUtiilites.checkUniqId);
    edges.forEach(globalUtiilites.checkUniqId);
    drawEntities = globalUtiilites.getDrawEntites(
      nodes,
      edges,
      layout,
      layout_options,
      'svg_context'
    );

    return this;
  };

  this.draw = async () => {
    svg.setAttribute(
      'style',
      'background-color:' + options.styles.background.color ||
        rgb(255, 255, 255)
    );

    // hash map to store arrow head defintions
    // so as to reduce its new generation
    let arrowHeadHashMap = {};

    let generateLin = new generateLines();
    await generateLin.set(drawEntities, svg, options.styles, arrowHeadHashMap);

    let generateCur = new generateCurves();
    await generateCur.set(drawEntities, svg, options.styles, arrowHeadHashMap);

    let generateCir = new generateCircles();
    await generateCir.set(drawEntities, svg, options.styles, arrowHeadHashMap);

    let generateNod = new generateNodes();
    generateNod.set(drawEntities, svg, options.styles);

    let generateLab = new generateLabels();
    await generateLab.set(drawEntities, svg, options.styles);
  };
};

export { svg_renderer };
