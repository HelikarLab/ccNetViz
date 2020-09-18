import ccNetViz_gl from '../gl';
import ccNetViz_primitive from '../primitive';
import ccNetViz_layout from '../layout/index';
import { partitionByStyle } from '../primitiveTools';
import ccNetViz_spatialSearch from '../spatialSearch/spatialSearch';
import { normalize } from './util';
import globalUtilities from '../globalUtilities';

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

    //tanslate indexes into node objects
    for (let i = 0; i < edges.length; i++) {
      let e = edges[i];
      if (typeof e.source == 'number') e.source = nodes[e.source];

      if (typeof e.target == 'number') e.target = nodes[e.target];
    }

    const drawEntities = globalUtilities.getDrawEntites(
      nodes,
      edges,
      layout,
      layout_options,
      gl
    );

    let lines = drawEntities.lines,
      curves = drawEntities.curves,
      circles = drawEntities.circles,
      nodesParts = drawEntities.nodesParts,
      circlesParts = drawEntities.circlesParts,
      linesParts = drawEntities.linesParts,
      curvesParts = drawEntities.curvesParts;

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
