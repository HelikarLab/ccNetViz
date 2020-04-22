import ccNetViz_gl from '../gl';
import ccNetViz_primitive from '../primitive';
import ccNetViz_layout from '../layout/index';
import { partitionByStyle } from '../primitiveTools';
import ccNetViz_spatialSearch from '../spatialSearch/spatialSearch';
import { normalize, stopWatch } from './util';

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
        edgeStyle,
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

    init();

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
          edgeStyle,
          getLabelSize,
          getLabelHideSize
        );
      }
      return spatialSearch;
    };

    let options_;
    stopWatch('Calculating layout', () => {
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
    });

    layout && ccNetViz_layout.normalize(nodes, undefined, options_);

    if (!gl) return;

    let tryInitPrimitives = () => {
      var isDirty = false;

      const sceneConf = {
        gl,
        styles: options.styles,
        textures,
        drawEntities,
      };

      scene.elements.forEach(el => {
        isDirty = isDirty || el.set(sceneConf);
      });

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

  const updateSingleSourceEl = (key, n, i) => {
    scene.elements.forEach(el => {
      el.updateEl(key, n, i);
    });
  };

  this.updateNode = (n, i) => {
    this.nodes[i] = n;

    if (spatialSearch) spatialSearch.update(context, 'nodes', i, n);

    if (!gl) return;

    /**** TODO: UPDATE NODES FILLER *****/
    updateSingleSourceEl('nodes', n, i);
  };

  this.updateEdge = (e, i) => {
    let t = edgeTypes[i];
    let pos = edgePoses[i];

    t.d[pos] = this.edges[i] = e;

    if (spatialSearch) spatialSearch.update(context, t.k, pos, e);

    if (!gl) return;

    /**** TODO: UPDATE NODES FILLER *****/
    updateSingleSourceEl('edges', e, pos);
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

  const pluginConf = {
    gl,
    view,
    nodeStyle,
    getNodeSize,
    edgeStyle,
    getEdgesCnt,
    getSize,
    texts,
    context,
    backgroundColor,
    getLabelSize,
    getLabelHideSize,
    extensions,
  };

  ///NOTE: for performance the nodes should be the first
  scene.add('edges', new ccNetViz.Shaders.edge(pluginConf));
  scene.add('nodes', new ccNetViz.Shaders.node(pluginConf));
  scene.add('labels', new ccNetViz.Shaders.label(pluginConf));

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
