// here 2 functions - webgl renderer & svg renderer

const { default: ccNetViz } = require('./ccNetViz');
import ccNetViz_gl from './gl';
import { partitionByStyle } from './primitiveTools';
import ccNetViz_layout from './layout/index';

// check if the element is webgl

// var graph = new ccNetViz(el, conf);
// graph.set(data.nodes, data.edges, 'force').then(() => {
// 	graph.draw();
// });

// // svg
// const drawEntities = layers.main.getDE(); // redefine this function

// let svgr = new svg_renderer();
// svgr.draw(drawEntities, el, conf.styles); // call to the external svg index file
var lastUniqId = 0;

function checkUniqId(el) {
  if (el.__uniqid !== undefined) {
    el.uniqid = el.__uniqid;
    delete el.__uniqid;
  } else if (el.uniqid === undefined) {
    el.uniqid = ++lastUniqId;
  }
}
function getContext(canvas) {
  let attributes = { depth: false, antialias: false };
  let gl =
    canvas.getContext('webgl', attributes) ||
    canvas.getContext('experimental-webgl', attributes);

  return gl;
}

var renderer = function(canvas) {
  let init = (nodes, edges) => {
    let lines = [],
      curves = [],
      circles = [];

    //tanslate indexes into node objects
    for (let i = 0; i < edges.length; i++) {
      let e = edges[i];
      if (typeof e.source == 'number') e.source = nodes[e.source];

      if (typeof e.target == 'number') e.target = nodes[e.target];
    }

    let getIndex = e => {
      return e.uniqid || -e.index || -e.nidx;
    };

    // NOTE: here init
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].index = i;
    }

    for (let i = 0, j = nodes.length + 10; i < edges.length; i++, j++) {
      edges[i].nidx = j;
    }

    let edgeTypes = [];
    let edgePoses = new Uint32Array(edges.length);
    const dummysd = { k: '_', kArrow: '_', d: [] };
    const circlesd = { k: 'circles', kArrow: 'circleArrows', d: circles };
    const linesd = { k: 'lines', kArrow: 'lineArrows', d: lines };
    const curvesd = { k: 'curves', kArrow: 'curveArrows', d: curves };

    let gl = getContext(canvas);
    let extensions = gl
      ? ccNetViz_gl.initExtensions(gl, 'OES_standard_derivatives')
      : {};
    // let scene = (this.scene = createScene.call(this));

    if (extensions.OES_standard_derivatives) {
      let map = {};
      for (let i = 0; i < edges.length; i++) {
        let e = edges[i];

        const si = getIndex(e.source);
        const ti = getIndex(e.target);

        (map[si] || (map[si] = {}))[ti] = true;
      }

      //enable the "curve" feature
      const is_bidirectional_overlap = false;

      for (let i = 0; i < edges.length; i++) {
        let target,
          e = edges[i];

        const si = getIndex(e.source);
        const ti = getIndex(e.target);

        let t = dummysd;
        if (si === ti) {
          e.t = 2; //circle
          target = circles;
          t = circlesd;
        } else {
          let m = map[ti];
          if (m && m[si] && !is_bidirectional_overlap) {
            e.t = 1; //curve
            target = curves;
            t = curvesd;
          } else {
            e.t = 0; //line
            target = lines;
            t = linesd;
          }
        }
        edgeTypes.push(t);
        edgePoses[i] = t.d.length;
        target.push(e);
      }
    } else {
      for (let i = 0; i < edges.length; i++) {
        let e = edges[i];

        const si = getIndex(e.source);
        const ti = getIndex(e.target);

        let t = dummysd;
        if (si !== ti) {
          t = linesd;
          e.t = 0;
          lines.push(e);
        }
        edgeTypes.push(t);
        edgePoses[i] = t.d.length;
      }
    }
  };

  this.log = function() {
    const nodes = [
      { label: '1' },
      { label: '2' },
      { label: '3' },
      { label: '4' },
      { label: '5' },
      { label: '6' },
      { label: '7' },
      { label: '8' },
      { label: '9' },
      { label: '10' },
    ];
    const edges = [
      { source: 0, target: 5 },
      { source: 0, target: 6 },
      { source: 1, target: 6 },
      { source: 1, target: 0 },
      { source: 1, target: 5 },
      { source: 2, target: 5 },
      { source: 2, target: 3 },
      { source: 3, target: 7 },
      { source: 3, target: 1 },
      { source: 4, target: 7 },
      { source: 5, target: 1 },
      { source: 5, target: 2 },
      { source: 6, target: 1 },
      { source: 7, target: 6 },
      { source: 7, target: 8 },
      { source: 7, target: 2 },
      { source: 8, target: 4 },
      { source: 8, target: 9 },
      { source: 9, target: 0 },
    ];
    const layout_options = {};
    const layout = 'force';
    // nodes.forEach(checkUniqId);
    // edges.forEach(checkUniqId);

    // init(nodes, edges);

    // let nodesParts = partitionByStyle(nodes);
    // let circlesParts = partitionByStyle(circles);
    // let linesParts = partitionByStyle(lines);
    // let curvesParts = partitionByStyle(curves);

    console.log(nodes);
    console.log(edges);

    let options_;
    if (typeof layout === 'string') {
      options_ = new ccNetViz_layout[layout](
        nodes,
        edges,
        layout_options
      ).apply();
    } else if (typeof layout === 'function') {
      options_ = new layout(nodes, edges, layout_options).apply();
    } else if (typeof layout === 'number') {
      throw new Error(
        'The layout can only be a string or a function or a class'
      );
    }

    console.log(nodes, edges);
  };
};

export { renderer };
