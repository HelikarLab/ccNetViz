import ccNetViz_gl from './gl';
import { partitionByStyle } from './primitiveTools';
import ccNetViz_layout from './layout/index';

var lastUniqId = 0;

export default class {
  static checkUniqId(el) {
    if (el.__uniqid !== undefined) {
      el.uniqid = el.__uniqid;
      delete el.__uniqid;
    } else if (el.uniqid === undefined) {
      el.uniqid = ++lastUniqId;
    }
  }
  static getContext(canvas) {
    let attributes = { depth: false, antialias: false };
    let gl =
      canvas.getContext('webgl', attributes) ||
      canvas.getContext('experimental-webgl', attributes);

    return gl;
  }

  static initCoordinates(nodes, edges, gl) {
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

    let extensions = {};
    // the if condition is to enable curve feature on svg elements
    if (gl == 'svg_context') {
      extensions.svg = true;
    } else {
      extensions = gl
        ? ccNetViz_gl.initExtensions(gl, 'OES_standard_derivatives')
        : {};
    }
    // let scene = (this.scene = createScene.call(this));

    if (extensions.OES_standard_derivatives || extensions.svg) {
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

    let nodesParts = partitionByStyle(nodes);
    let circlesParts = partitionByStyle(circles);
    let linesParts = partitionByStyle(lines);
    let curvesParts = partitionByStyle(curves);

    const drawEntities = {
      nodes,
      nodesParts,
      circles,
      circlesParts,
      lines,
      linesParts,
      curves,
      curvesParts,
    };

    return drawEntities;
  }

  static getDrawEntites(nodes, edges, layout, layout_options = {}, gl) {
    const drawEntities = this.initCoordinates(nodes, edges, gl);

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

    layout && ccNetViz_layout.normalize(nodes, undefined, options_);

    return drawEntities;
  }
}
