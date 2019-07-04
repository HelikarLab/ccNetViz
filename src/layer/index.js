import ccNetViz_color from '../color';
import ccNetViz_gl from '../gl';
import ccNetViz_primitive from '../primitive';
import ccNetViz_layout from '../layout/layout';
import ccNetViz_geomutils from '../geomutils';
import ccNetViz_utils from '../utils';
import { partitionByStyle } from '../primitiveTools';
import ccNetViz_spatialSearch from '../spatialSearch/spatialSearch';
import { elementShaders } from '../shaders';
import { Line, Curve, Circle, edgesFiller } from './shapes/edge';
import { Node, NodeColored } from './shapes/node';
import { LineArrow, CurveArrow, CircleArrow } from './shapes/edgeArrow';
import { Label, LabelOutline } from './shapes/labels';
import { normalize } from './util';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors:
 * 	David Tichy
 * 	Aleš Saska - http://alessaska.cz/
 */

export default function(
  canvas,
  context,
  view,
  gl,
  textures,
  files,
  texts,
  events,
  options,
  backgroundColor,
  nodeStyle,
  edgeStyle,
  getSize,
  getNodeSize,
  getLabelSize,
  getLabelHideSize,
  getNodesCnt,
  getEdgesCnt,
  onRedraw,
  onLoad
) {
  getNodesCnt =
    getNodesCnt ||
    (() => {
      return this.nodes.length;
    });
  getEdgesCnt =
    getEdgesCnt ||
    (() => {
      return this.edges.length;
    });

  this.redraw = onRedraw || (() => {});

  options = options || {};
  options.styles = options.styles || {};

  // set animation flag
  this.hasEdgeAnimation =
    !!edgeStyle.animateType && edgeStyle.animateType !== 'none';

  let nodesFiller = style => ({
    set: (v, e, iV, iI) => {
      let x = e.x;
      let y = e.y;
      ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
      ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
      if (v.color) {
        let c = e.color;
        ccNetViz_primitive.colors(v.color, iV, c, c, c, c);
      }
      ccNetViz_primitive.quad(v.indices, iV, iI);
    },
  });
  let labelsFiller = style => {
    return (function(style) {
      let textEngine = texts.getEngine(style.font);

      textEngine.setFont(style.font);

      return {
        set: (v, e, iV, iI) => {
          var x = e.x;
          var y = e.y;

          var ret = false;
          var parts = textEngine.get(e.label || '', x, y, () => {
            ret = true;
          });
          for (var i = 0; i < parts.length; i++, iV += 4, iI += 6) {
            let c = parts[i];

            ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
            ccNetViz_primitive.vertices(
              v.relative,
              iV,
              c.dx,
              c.dy,
              c.width + c.dx,
              c.dy,
              c.width + c.dx,
              c.height + c.dy,
              c.dx,
              c.height + c.dy
            );
            ccNetViz_primitive.vertices(
              v.textureCoord,
              iV,
              c.left,
              c.bottom,
              c.right,
              c.bottom,
              c.right,
              c.top,
              c.left,
              c.top
            );
            ccNetViz_primitive.quad(v.indices, iV, iI);
          }

          return ret;
        },
        size: (v, e) => {
          return textEngine.steps(e.label || '');
        },
      };
    })(style);
  };

  /*
  let normalize = (a, b) => {
    let x = b.x - a.x;
    let y = b.y - a.y;
    let sc = 1 / Math.sqrt(x * x + y * y);
    return { x: sc * x, y: sc * y };
  };
  */

  let dx = Math.cos(0.9);
  let dy = Math.sin(0.9);

  let ct = {};

  let set = (v, e, s, t, iV, iI, dx, dy) => {
    let tx = t.x;
    let ty = t.y;

    let offsetMul;
    let ctx, cty, citx, city;

    ccNetViz_geomutils.getCurveShift(t.e, ct);
    ctx = ct.x;
    cty = ct.y;
    citx = ct.cx;
    city = ct.cy;

    if (t.is_edge) {
      //if target is edge, disable node offset for arrow
      //normal of that edge
      offsetMul = 0;
    } else {
      offsetMul = 1;
    }
    v.curveShift &&
      ccNetViz_primitive.vertices(
        v.curveShift,
        iV,
        -cty,
        ctx,
        -cty,
        ctx,
        -cty,
        ctx,
        -cty,
        ctx
      );
    v.circleShift &&
      ccNetViz_primitive.vertices(
        v.circleShift,
        iV,
        -city,
        citx,
        -city,
        citx,
        -city,
        citx,
        -city,
        citx
      );

    ccNetViz_primitive.singles(
      v.offsetMul,
      iV,
      offsetMul,
      offsetMul,
      offsetMul,
      offsetMul
    );
    ccNetViz_primitive.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
    ccNetViz_primitive.vertices(
      v.direction,
      iV,
      dx,
      dy,
      dx,
      dy,
      dx,
      dy,
      dx,
      dy
    );
    ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
    ccNetViz_primitive.quad(v.indices, iV, iI);
  };

  let arrowFiller = {
    lineArrows: style => ({
      set: (v, e, iV, iI) => {
        let s = ccNetViz_geomutils.edgeSource(e);
        let t = ccNetViz_geomutils.edgeTarget(e);
        let d = normalize(s, t);
        set(v, e, s, t, iV, iI, d.x, d.y);
      },
    }),
    curveArrows: style => ({
      set: (v, e, iV, iI) => {
        let s = ccNetViz_geomutils.edgeSource(e);
        let t = ccNetViz_geomutils.edgeTarget(e);
        return set(v, e, s, t, iV, iI, 0.5 * (t.x - s.x), 0.5 * (t.y - s.y));
      },
    }),
    circleArrows: style => ({
      set: (v, e, iV, iI) => {
        let t = ccNetViz_geomutils.edgeTarget(e);
        let s = t;
        return set(
          v,
          e,
          s,
          t,
          iV,
          iI,
          t.x < 0.5 ? dx : -dx,
          t.y < 0.5 ? -dy : dy
        );
      },
    }),
  };

  this.getCurrentSpatialSearch = context => {
    if (spatialSearch === undefined) {
      spatialSearch = new ccNetViz_spatialSearch(
        context,
        texts,
        options,
        [],
        {},
        [],
        {},
        [],
        {},
        [],
        {},
        normalize,
        nodeStyle,
        getLabelSize,
        getLabelHideSize
      );
    }
    return spatialSearch;
  };

  this.remove = () => {};

  let edgeTypes;
  let edgePoses;

  let spatialSearch = undefined;

  //make sure everything (files and textures) are load, if not, redraw the whole graph after they became
  let set_end = () => {
    let enableLazyRedraw = false;
    let reset = p => {
      if (enableLazyRedraw) this.set(this.nodes, this.edges);
    };
    files.onLoad(reset);
    textures.onLoad(reset);
    enableLazyRedraw = true;
  };

  this.set = function(nodes, edges, layout, layout_options) {
    removedNodes = 0;
    removedEdges = 0;

    this.nodes = nodes = nodes || [];
    this.edges = edges = edges ? [].concat(edges) : [];

    spatialSearch = undefined;

    let lines = [],
      curves = [],
      circles = [];

    //tanslate indexes into node objects
    for (let i = 0; i < edges.length; i++) {
      let e = edges[i];
      if (typeof e.source == 'number') e.source = nodes[e.source];

      if (typeof e.target == 'number') e.target = nodes[e.target];
    }

    let init = () => {
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

      edgeTypes = [];
      edgePoses = new Uint32Array(edges.length);
      const dummysd = { k: '_', kArrow: '_', d: [] };
      const circlesd = { k: 'circles', kArrow: 'circleArrows', d: circles };
      const linesd = { k: 'lines', kArrow: 'lineArrows', d: lines };
      const curvesd = { k: 'curves', kArrow: 'curveArrows', d: curves };

      if (extensions.OES_standard_derivatives) {
        let map = {};
        for (let i = 0; i < edges.length; i++) {
          let e = edges[i];

          const si = getIndex(e.source);
          const ti = getIndex(e.target);

          (map[si] || (map[si] = {}))[ti] = true;
        }

        //enable the "curve" feature
        const is_bidirectional_overlap = options.bidirectional === 'overlap';

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
            if (m && m[si] && is_bidirectional_overlap) {
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

    init();

    let nodesParts = partitionByStyle(nodes);
    let circlesParts = partitionByStyle(circles);
    let linesParts = partitionByStyle(lines);
    let curvesParts = partitionByStyle(curves);

    this.getCurrentSpatialSearch = context => {
      if (spatialSearch === undefined) {
        spatialSearch = new ccNetViz_spatialSearch(
          context,
          texts,
          options,
          nodes,
          nodesParts,
          lines,
          linesParts,
          curves,
          curvesParts,
          circles,
          circlesParts,
          normalize,
          nodeStyle,
          getLabelSize,
          getLabelHideSize
        );
      }
      return spatialSearch;
    };

    layout &&
      new ccNetViz_layout[layout](nodes, edges, layout_options).apply() &&
      ccNetViz_layout.normalize(nodes);

    if (!gl) return;

    let tryInitPrimitives = () => {
      var isDirty = false;

      let defaultAdder = (section, addSection) => {
        if (typeof section.style.texture === 'string')
          section.style.texture = textures.get(
            gl,
            section.style.texture,
            addSection
          );
        else addSection();
      };
      let labelAdder = (section, addSection) => {
        var slf = (section.style.label || {}).font || {};
        let textEngine = texts.getEngine(slf);
        section.style.texture = textEngine.getTexture(slf, addSection);
      };

      let is;
      is = nodes.length && !nodes[0].color;
      isDirty =
        isDirty ||
        scene.nodes.set(
          gl,
          options.styles,
          defaultAdder,
          is ? nodes : [],
          is ? nodesParts : {},
          nodesFiller
        );
      is = nodes.length && nodes[0].color;
      isDirty =
        isDirty ||
        scene.nodesColored.set(
          gl,
          options.styles,
          defaultAdder,
          is ? nodes : [],
          is ? nodesParts : {},
          nodesFiller
        );
      if (nodeStyle.label) {
        texts.clear();
        isDirty =
          isDirty ||
          scene.labelsOutline.set(
            gl,
            options.styles,
            labelAdder,
            nodes,
            nodesParts,
            labelsFiller
          );
        isDirty =
          isDirty ||
          scene.labels.set(
            gl,
            options.styles,
            labelAdder,
            nodes,
            nodesParts,
            labelsFiller
          );
        texts.bind();
      }

      isDirty =
        isDirty ||
        scene.lines.set(
          gl,
          options.styles,
          defaultAdder,
          lines,
          linesParts,
          edgesFiller.lines
        );

      if (extensions.OES_standard_derivatives) {
        isDirty =
          isDirty ||
          scene.curves.set(
            gl,
            options.styles,
            defaultAdder,
            curves,
            curvesParts,
            edgesFiller.curves
          );
        isDirty =
          isDirty ||
          scene.circles.set(
            gl,
            options.styles,
            defaultAdder,
            circles,
            circlesParts,
            edgesFiller.circles
          );
      }

      if (edgeStyle.arrow) {
        isDirty =
          isDirty ||
          scene.lineArrows.set(
            gl,
            options.styles,
            defaultAdder,
            lines,
            linesParts,
            arrowFiller.lineArrows
          );

        if (extensions.OES_standard_derivatives) {
          isDirty =
            isDirty ||
            scene.curveArrows.set(
              gl,
              options.styles,
              defaultAdder,
              curves,
              curvesParts,
              arrowFiller.curveArrows
            );

          isDirty =
            isDirty ||
            scene.circleArrows.set(
              gl,
              options.styles,
              defaultAdder,
              circles,
              circlesParts,
              arrowFiller.circleArrows
            );
        }
      }

      return isDirty;
    };

    while (tryInitPrimitives()); //loop until they are not dirty
    set_end();
  };

  this.update = function(element, attribute, data) {
    if (!gl) return;
    scene[element].update(gl, attribute, data, function(style) {
      return {
        set: function(v, e, iV) {
          return ccNetViz_primitive.colors(v, iV, e, e, e, e);
        },
      };
    });
  };

  this.find = (x, y, dist, nodes, edges, labels) => {
    return this.getCurrentSpatialSearch(context).find(
      context,
      x,
      y,
      dist,
      view.size,
      nodes,
      edges,
      labels
    );
  };

  this.findArea = (x1, y1, x2, y2, nodes, edges, labels) => {
    return this.getCurrentSpatialSearch(context).findArea(
      context,
      x1,
      y1,
      x2,
      y2,
      view.size,
      nodes,
      edges,
      labels
    );
  };

  this.updateNode = (n, i) => {
    this.nodes[i] = n;

    if (spatialSearch) spatialSearch.update(context, 'nodes', i, n);

    if (!gl) return;

    (this.nodes[0].color ? scene.nodesColored : scene.nodes).updateEl(
      gl,
      n,
      i,
      nodesFiller
    );
    scene.labels && scene.labels.updateEl(gl, n, i, labelsFiller);
    scene.labelsOutline && scene.labelsOutline.updateEl(gl, n, i, labelsFiller);
  };

  this.updateEdge = (e, i) => {
    let t = edgeTypes[i];
    let pos = edgePoses[i];

    t.d[pos] = this.edges[i] = e;

    if (spatialSearch) spatialSearch.update(context, t.k, pos, e);

    if (!gl) return;

    scene[t.k].updateEl(gl, e, pos, edgesFiller[t.k]);
    if (edgeStyle.arrow)
      scene[t.kArrow].updateEl(gl, e, pos, arrowFiller[t.kArrow]);
  };

  let removedNodes = 0;
  let removedEdges = 0;

  const freenode = { x: -1, y: -1, title: '' };
  this.removeNodeAtPos = pos => {
    if (this.nodes[pos] === freenode) {
      return;
    }

    removedNodes++;
    this.updateNode(freenode, pos);
  };

  const freeedge = { source: { x: -1, y: -1 }, target: { x: -1, y: -1 } };
  this.removeEdgeAtPos = pos => {
    if (this.edges[pos] === freeedge) {
      return;
    }

    removedEdges++;

    this.updateEdge(freeedge, pos);
  };

  this.getVisibleNodes = () => {
    if (removedNodes <= 0) return this.nodes;

    let r = [];
    this.nodes.forEach(n => {
      if (n !== freenode) r.push(n);
    });
    return r;
  };

  this.getVisibleEdges = () => {
    if (removedEdges <= 0) return this.edges;

    let r = [];
    this.edges.forEach(n => {
      if (n !== freeedge) r.push(n);
    });
    return r;
  };

  this.cntShownNodes = () => {
    return this.nodes.length - removedNodes;
  };

  this.cntShownEdges = () => {
    return this.edges.length - removedEdges;
  };

  this.nodes = [];
  this.edges = [];

  let extensions = gl
    ? ccNetViz_gl.initExtensions(gl, 'OES_standard_derivatives')
    : {};
  let scene = (this.scene = createScene.call(this));

  if (!gl) {
    let loadCalled = false;
    options.onLoad && !loadCalled && (loadCalled = true) && options.onLoad();
    return this;
  }

  // NOTE: split to different file and use getPrimitive to get webgl element
  const lineEdge = new Line(gl, edgeStyle, this.hasEdgeAnimation);
  scene.add('lines', lineEdge.getPrimitive());

  if (extensions.OES_standard_derivatives) {
    const curveEdge = new Curve(gl, edgeStyle);
    scene.add('curves', curveEdge.getPrimitive());

    const circleEdge = new Circle(gl, edgeStyle);
    scene.add('circles', circleEdge.getPrimitive());
  }

  if (edgeStyle.arrow) {
    const lineArrow = new LineArrow(gl, view, edgeStyle, getSize, getEdgesCnt);
    scene.add('lineArrows', lineArrow.getPrimitive());

    if (extensions.OES_standard_derivatives) {
      const curveArrow = new CurveArrow(
        gl,
        view,
        edgeStyle,
        getSize,
        getEdgesCnt
      );
      scene.add('curveArrows', curveArrow.getPrimitive());
      const circleArrow = new CircleArrow(
        gl,
        view,
        edgeStyle,
        getSize,
        getEdgesCnt
      );
      scene.add('circleArrows', circleArrow.getPrimitive());
    }
  }

  // TODO: getNodeSize??
  const node = new Node(gl, nodeStyle, getNodeSize);
  scene.add('nodes', node.getPrimitive());
  const nodeColored = new NodeColored(gl, nodeStyle, getNodeSize);
  scene.add('nodesColored', nodeColored.getPrimitive());

  const labelOutline = new LabelOutline(
    gl,
    nodeStyle,
    getNodeSize,
    getLabelSize,
    texts,
    backgroundColor
  );
  nodeStyle.label && scene.add('labelsOutline', labelOutline.getPrimitive());
  const label = new Label(gl, nodeStyle, getNodeSize, getLabelSize, texts);
  nodeStyle.label && scene.add('labels', label.getPrimitive(), backgroundColor);

  if (options.onLoad) {
    let styles = options.styles;
    for (let p in styles) {
      let s = styles[p];

      s.texture && textures.get(gl, s.texture, onLoad);
      s.arrow && s.arrow.texture && textures.get(gl, s.arrow.texture);
    }
  }

  function createScene() {
    return {
      elements: [],
      add: (name, e) => {
        scene[name] = e;
        scene.elements.push(e);
      },
    };
  }
}
