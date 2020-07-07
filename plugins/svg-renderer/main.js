import { generateLines } from './plugins/edges/line';
import { generateCurves } from './plugins/edges/curve';
import { generateCircles } from './plugins/edges/circle';
import { generateNodes } from './plugins/nodes/node';
import { generateLabels } from './plugins/labels/label';
import globalUtilities from '../../src/globalUtilities';
import baseUtils from './plugins/utils/index';
import {
  getBezierPointsLine,
  getBezierPointsCurve,
  getBezierPointsCircle,
} from '../../src/spatialSearch/spatialSearch';
import { normalize } from '../../src/layer/util';

var svg_renderer = function(svg, options) {
  const svgHeight = baseUtils.getSVGDimensions(svg).height;
  const svgWidth = baseUtils.getSVGDimensions(svg).width;
  let nodes = [];
  let edges = [];
  let drawEntities = {};
  let context = {};
  context.height = parseInt(svgHeight) / 2;
  context.width = parseInt(svgWidth) / 2;
  context.aspect = 1;
  context.aspect2 = 1;

  this.set = async (n, e, layout, layout_options = {}) => {
    nodes = n || [];
    edges = e || [];

    nodes.forEach(globalUtilities.checkUniqId);
    edges.forEach(globalUtilities.checkUniqId);

    drawEntities = globalUtilities.getDrawEntites(
      nodes,
      edges,
      layout,
      layout_options,
      'svg_context'
    );

    this.updateStyles();
    return this;
  };

  this.updateStyles = () => {
    let nodeStyle = (options.styles.node = options.styles.node || {});
    nodeStyle.minSize = nodeStyle.minSize != null ? nodeStyle.minSize : 6;
    nodeStyle.maxSize = nodeStyle.maxSize || 16;
    nodeStyle.color = nodeStyle.color || 'rgb(255, 255, 255)';

    if (nodeStyle.label) {
      let s = nodeStyle.label;
      s.color = s.color || 'rgb(120, 120, 120)';
      s.font = s.font || { type: 'Arial, Helvetica, sans-serif', size: 11 };
    }

    let edgeStyle = (options.styles.edge = options.styles.edge || {
      arrow: {},
    });
    edgeStyle.width = edgeStyle.width || 1;
    edgeStyle.color = edgeStyle.color || 'rgb(204, 04, 204)';
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

    let nodeSize = baseUtils.getSize(
      svg,
      options.styles.node,
      baseUtils.getNodesCnt(drawEntities),
      0.4
    );
    nodeStyle.size = nodeSize;
    context.nodeSize = nodeSize;

    const curveExc = baseUtils.getSize(
      svg,
      undefined,
      baseUtils.getEdgesCnt(drawEntities),
      0.5
    );
    context.curveExc = curveExc;

    let lines = drawEntities.lines;
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const ret = getBezierPointsLine(line, context, 1);
      const x1 = ret[0];
      const y1 = ret[1];
      const x2 = ret[2];
      const y2 = ret[3];
      line.position = { x1, y1, x2, y2 };
    }

    let curves = drawEntities.curves;
    for (let i = 0; i < curves.length; i++) {
      let curve = curves[i];
      const ret = getBezierPointsCurve(curve, context, normalize, 1);
      const x1 = ret[0];
      const y1 = ret[1];
      const cx = ret[2];
      const cy = ret[3];
      const x2 = ret[4];
      const y2 = ret[5];
      curve.curveExc = curveExc;
      curve.position = { x1, y1, cx, cy, x2, y2 };
    }

    let circles = drawEntities.circles;
    for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];
      const ret = getBezierPointsCircle(circle, context, 1);
      const x1 = ret[0];
      const y1 = ret[1];
      const cx1 = ret[2];
      const cy1 = ret[3];
      const x2 = ret[4];
      const y2 = ret[5];
      const cx2 = ret[6];
      const cy2 = ret[7];
      circle.curveExc = curveExc;
      circle.position = { x1, y1, cx1, cy1, x2, y2, cx2, cy2 };
    }
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
