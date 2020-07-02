import { generateLines } from './plugins/edges/line';
import { generateCurves } from './plugins/edges/curve';
import { generateCircles } from './plugins/edges/circle';
import { generateNodes } from './plugins/nodes/node';
import { generateLabels } from './plugins/labels/label';
import globalUtiilites from '../../src/globalUtilites';

var svg_renderer = function(svg, options) {
  let nodes = [];
  let edges = [];
  let drawEntities;

  let nodeStyle = (options.styles.node = options.styles.node || {});
  nodeStyle.minSize = nodeStyle.minSize != null ? nodeStyle.minSize : 6;
  nodeStyle.maxSize = nodeStyle.maxSize || 16;
  nodeStyle.color = nodeStyle.color || 'rgb(255, 255, 255)';

  if (nodeStyle.label) {
    let s = nodeStyle.label;
    s.color = s.color || 'rgb(120, 120, 120)';
    s.font = s.font || { type: 'Arial, Helvetica, sans-serif', size: 11 };
  }

  let edgeStyle = (options.styles.edge = options.styles.edge || { arrow: {} });
  edgeStyle.width = edgeStyle.width || 1;
  edgeStyle.color = edgeStyle.color || 'rgb(204, 204, 204)';
  edgeStyle.animateColor = edgeStyle.animateColor || 'rgb(240, 80, 120)';
  edgeStyle.animateSpeed = edgeStyle.animateSpeed || 1.0;
  edgeStyle.animateDotNum = edgeStyle.animateDotNum || 7;
  edgeStyle.animateDotInterval = edgeStyle.animateDotInterval || 0.5;
  edgeStyle.animateMaxWidth = edgeStyle.animateMaxWidth || edgeStyle.width;

  if (edgeStyle.label) {
    let s = edgeStyle.label;
    s.color = s.color || 'rgb(120, 120, 120)';
    s.font = s.font || { type: 'Arial, Helvetica, sans-serif', size: 11 };
  }

  if (edgeStyle.arrow) {
    if (typeof edgeStyle.arrow.texture !== 'undefined') {
      let s = edgeStyle.arrow;
      s.minSize = s.minSize != null ? s.minSize : 6;
      s.maxSize = s.maxSize || 12;
      s.aspect = 1;
    }
  }

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

ccNetVizAdvanced.prototype.elementRenderers.svg = svg_renderer;
