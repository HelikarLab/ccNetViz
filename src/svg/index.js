import { generateLines } from './plugins/edges/line';
import { generateCurves } from './plugins/edges/curve';
import { generateCircles } from './plugins/edges/circle';
import { generateNodes } from './plugins/nodes/node';
import { generateLabels } from './plugins/labels/label';
import baseUtils from './plugins/utils/index';
import globalUtiilites from '../globalUtiilites';

var svg_renderer = function() {
  this.draw = async function(
    nodes,
    edges,
    layout,
    layout_options,
    gl,
    svg,
    styles
  ) {
    svg.setAttribute(
      'style',
      'background-color:' + styles.background.color || rgb(255, 255, 255)
    );
    // hash map to store arrow head defintions
    // so as to reduce its new generation
    let arrowHeadHashMap = {};

    const drawEntities = globalUtiilites.getDrawEntites(
      nodes,
      edges,
      layout,
      layout_options,
      gl
    );
    console.log(drawEntities);

    let generateLin = new generateLines();
    await generateLin.set(drawEntities, svg, styles, arrowHeadHashMap);

    let generateCur = new generateCurves();
    await generateCur.set(drawEntities, svg, styles, arrowHeadHashMap);

    let generateCir = new generateCircles();
    await generateCir.set(drawEntities, svg, styles, arrowHeadHashMap);

    let generateNod = new generateNodes();
    generateNod.set(drawEntities, svg, styles);

    const minNodeSize =
      (styles &&
        styles.node &&
        styles.node.label &&
        styles.node.label.hideSize) ||
      16;
    const drawnNodeSize = baseUtils.getSize(
      svg,
      styles.node,
      baseUtils.getNodesCnt(drawEntities),
      0.4
    );
    // if (
    //   drawnNodeSize >= minNodeSize &&
    //   baseUtils.getEdgesCnt(drawEntities) < 100
    // )
    {
      let generateLab = new generateLabels();
      await generateLab.set(drawEntities, svg, styles);
    }
  };
};

export { svg_renderer };
