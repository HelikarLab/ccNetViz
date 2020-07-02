import ccNetViz_layer from './layer/index';
import ccNetViz_layout from './layout/index';
import ccNetViz_gl from './gl';
import ccNetViz_color from './color';
import ccNetViz_utils from './utils';
import ccNetViz_textures from './dataSources/textures';
import ccNetViz_files from './dataSources/files';
import ccNetViz_texts from './texts/texts';
import ccNetViz_lazyEvents from './lazyEvents';
import ccNetViz_interactivityBatch from './interactivityBatch';
import ccNetViz_spatialSearch from './spatialSearch/spatialSearch';
import { getPartitionStyle } from './primitiveTools';

import BasePlugin from './layer/plugins/basePlugin';
import EdgePlugin from './layer/plugins/edge';
import LabelPlugin from './layer/plugins/label';
import NodePlugin from './layer/plugins/node';

import ccNetViz_primitive from './primitive';
import ccNetViz_geomutils from './geomutils';
import { normalize } from './layer/util';
import { BaseShape } from './layer/plugins/baseShape';
import globalUtiilites from './globalUtilites';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors:
 *  David Tichy
 *    Aleš Saska - http://alessaska.cz/
 */

let sCanvas = document.createElement('canvas');
// function getContext(canvas) {
//   let attributes = { depth: false, antialias: false };
//   let gl =
//     canvas.getContext('webgl', attributes) ||
//     canvas.getContext('experimental-webgl', attributes);

//   return gl;
// }

var lastUniqId = 0;

function checkUniqId(el) {
  if (el.__uniqid !== undefined) {
    el.uniqid = el.__uniqid;
    delete el.__uniqid;
  } else if (el.uniqid === undefined) {
    el.uniqid = ++lastUniqId;
  }
}

function mergeArrays(a, b, cmp) {
  let r = [];
  r.length = a.length + b.length;

  let i = 0,
    j = 0,
    k = 0;

  while (i < a.length && j < b.length) {
    if (cmp(a[i], b[j]) < 0) r[k++] = a[i++];
    else r[k++] = b[j++];
  }

  while (i < a.length) r[k++] = a[i++];

  while (j < b.length) r[k++] = b[j++];

  return r;
}

var ccNetViz = function(canvas, options) {
  let self = this;
  canvas = canvas || sCanvas;
  let backgroundStyle = (options.styles.background =
    options.styles.background || {});
  let backgroundColor = new ccNetViz_color(
    backgroundStyle.color || 'rgb(255, 255, 255)'
  );

  let removed = false;
  let setted = false;

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

  let onLoad = () => {
    if (!options.onLoad || options.onLoad()) {
      this.draw(true);
    }
  };

  if (edgeStyle.arrow) {
    if (typeof edgeStyle.arrow.texture !== 'undefined') {
      let s = edgeStyle.arrow;
      s.minSize = s.minSize != null ? s.minSize : 6;
      s.maxSize = s.maxSize || 12;
      s.aspect = 1;
    }
  }

  let events = new ccNetViz_lazyEvents();
  let layers = {};
  let view, gl, drawFunc, textures, files, texts;
  let context = {};

  this.cntShownNodes = () => {
    let n = 0;
    for (var k in layers) n += layers[k].cntShownNodes();
    return n;
  };
  let getNodesCnt = options.getNodesCnt || this.cntShownNodes;

  this.cntShownEdges = () => {
    let e = 0;
    for (var k in layers) e += layers[k].cntShownEdges();
    return e;
  };
  let getEdgesCnt = options.getEdgesCnt || this.cntShownEdges;

  let onRedraw = events.debounce(() => {
    self.draw.call(self);
    return false;
  }, 5);

  function checkRemoved() {
    if (removed) {
      console.error('Cannot call any function on graph after remove()');
      return true;
    }
    return false;
  }

  let nodes, edges;

  function insertTempLayer() {
    if (layers.temp) return;
    layers.temp = new ccNetViz_layer(
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
    );
  }

  let batch = undefined;
  function getBatch() {
    if (!batch)
      batch = new ccNetViz_interactivityBatch(
        layers,
        insertTempLayer,
        drawFunc,
        nodes,
        edges,
        checkUniqId
      );
    return batch;
  }

  this.set = async (n, e, layout, layout_options = {}) => {
    if (checkRemoved()) return this;

    nodes = n || [];
    edges = e || [];

    nodes.forEach(checkUniqId);
    edges.forEach(checkUniqId);

    let promises = [];
    if (typeof ccNetViz.plugin !== 'undefined') {
      if (typeof ccNetViz.plugin.node !== 'undefined')
        promises = ccNetViz.plugin.node.Integration(options, self).shapes;
      if (typeof ccNetViz.plugin.arrow !== 'undefined')
        promises = promises.concat(
          ccNetViz.plugin.arrow.Integration(options, self).shapes
        );
      if (typeof ccNetViz.plugin.multilevel !== 'undefined') {
        if (typeof options.onChangeViewport !== 'undefined') {
          let temp = options.onChangeViewport;
          options.onChangeViewport = function(viewport) {
            temp(viewport);
            ccNetViz.plugin.multilevel(viewport, self, canvas);
          };
        } else {
          options.onChangeViewport = function(viewport) {
            ccNetViz.plugin.multilevel(viewport, self, canvas);
          };
        }
      }
      //   if (typeof ccNetViz.plugin.svg_renderer !== 'undefined')
      //     promises = ccNetViz.plugin.svg_renderer.Integration(drawEntities,svg,styles);
    }

    await Promise.all(promises.map(item => item.config)).then(c => {
      c.map((item, index) => {
        if (item.plugin === 'arrow') {
          options.styles[promises[index].name].arrow = item;
        } else {
          options.styles[promises[index].name] = item;
        }
      });
      layers.temp && layers.temp.set([], [], layout, layout_options);
      layers.main.set(nodes, edges, layout, layout_options);
    });

    //reset batch
    batch = undefined;
    setted = true;
    return this;
  };

  //make all dynamic changes static
  this.reflow = async () => {
    if (checkRemoved()) return;

    await getBatch().applyChanges();

    //nodes and edges in dynamic chart are actual
    let n = layers.main.getVisibleNodes();
    if (layers.temp) n = n.concat(layers.temp.getVisibleNodes());

    let e = layers.main.getVisibleEdges();
    if (layers.temp) e = e.concat(layers.temp.getVisibleEdges());

    await this.set(n, e);
    this.draw();
  };

  this.animateTexture = () => {
    if (checkRemoved()) return;

    let n = layers.main.getVisibleNodes();
    let e = layers.main.getVisibleEdges();

    this.set(n, e);
    this.draw();
  };

  this.removeNode = n => {
    if (checkRemoved()) {
      return this;
    }
    getBatch().removeNode(n);
    return this;
  };
  this.removeEdge = e => {
    if (checkRemoved()) {
      return this;
    }
    getBatch().removeEdge(e);
    return this;
  };
  this.addEdge = e => {
    if (checkRemoved()) {
      return this;
    }
    getBatch().addEdge(e);
    return this;
  };
  this.addNode = n => {
    if (checkRemoved()) {
      return this;
    }
    getBatch().addNode(n);
    return this;
  };
  this.updateNode = n => {
    if (checkRemoved()) {
      return this;
    }
    return this.removeNode(n).addNode(n);
  };
  this.updateEdge = e => {
    if (checkRemoved()) {
      return this;
    }
    return this.removeEdge(e).addEdge(e);
  };
  this.applyChanges = async () => {
    if (checkRemoved()) {
      return this;
    }
    await getBatch().applyChanges();
    return this;
  };

  this.addEdges = edges => {
    if (checkRemoved()) return this;

    edges.forEach(e => {
      this.addEdge(e);
    });

    return this;
  };

  this.addNodes = nodes => {
    if (checkRemoved()) return this;

    nodes.forEach(n => {
      this.addNode(n);
    });

    return this;
  };

  this.removeEdges = edges => {
    if (checkRemoved()) return this;

    edges.forEach(e => {
      this.removeEdge(e);
    });
    return this;
  };

  this.removeNodes = nodes => {
    if (checkRemoved()) return this;

    nodes.forEach(n => {
      this.removeNode(n);
    });
    return this;
  };

  this.updateNodes = nodes => {
    if (checkRemoved()) return this;

    nodes.forEach(n => {
      this.updateNode(n);
    });

    return this;
  };

  this.updateEdges = edges => {
    if (checkRemoved()) return this;

    edges.forEach(e => {
      this.updateEdge(e);
    });

    return this;
  };

  let getSize = (c, s, n, sc) => {
    let result = (sc * Math.sqrt((c.width * c.height) / (n + 1))) / view.size;
    if (s) {
      let min = s.size ? s.size : s.minSize;
      let max = s.size ? s.size : s.maxSize;

      result = max ? Math.min(max, result) : result;
      if (result < s.hideSize) return 0;
      result = min ? Math.max(min, result) : result;
    }
    return result;
  };

  let getNodeSize = c => getSize(c, c.style, getNodesCnt(), 0.4);
  let getLabelSize = (c, s) => getSize(c, s.font, getNodesCnt(), 0.25);

  let getLabelHideSize = (c, s) => {
    if (s) {
      const sc = 0.25;
      let n = layers.main.cntShownNodes(); //lower bound
      let t = sc * Math.sqrt((c.width * c.height) / (n + 1));

      let vs;
      if (s.hideSize) {
        vs = t / s.hideSize;
        if (s.maxSize) vs = Math.min(vs, t / s.maxSize);
        return vs;
      }
    }

    return 1;
  };

  let offset = 0.5 * nodeStyle.maxSize;

  //   this.drawSVG = (nodes, edges, layout, svg, options) => {
  //     let layout_options = {};

  //     // layers.temp && layers.temp.set([], [], layout, layout_options);
  //     // layers.main.set(nodes, edges, layout, layout_options);

  //     const gl = globalUtiilites.getContext(canvas);
  //     let svgr = new svg_renderer();
  //     svgr.draw(nodes, edges, layout, layout_options, gl, svg, options.styles);
  //   };

  this.draw = silent => {
    if (silent && (removed || !setted)) return;
    if (checkRemoved()) return;

    let width = canvas.width;
    let height = canvas.height;
    let aspect = width / height;
    let o = view.size === 1 ? offset : 0;
    let ox = o / width;
    let oy = o / height;

    context.transform = ccNetViz_gl.ortho(
      view.x - ox,
      view.x + view.size + ox,
      view.y - oy,
      view.y + view.size + oy,
      -1,
      1
    );
    context.offsetX = ox;
    context.offsetY = oy;
    context.width = 0.5 * width;
    context.height = 0.5 * height;
    context.aspect2 = aspect * aspect;
    context.aspect = aspect;
    context.count = getNodesCnt();

    //bad hack because we use different size for curveExc and for nodeSize :(
    if (context.style) delete context.style;
    context.curveExc = getSize(context, undefined, getEdgesCnt(), 0.5);
    context.style = nodeStyle;
    context.nodeSize = getNodeSize(context);

    gl && gl.viewport(0, 0, width, height);

    gl && gl.clear(gl.COLOR_BUFFER_BIT);

    context.startTime = Date.now();
    let drawNums = 0;

    const drawOnce = () => {
      for (let i = 0; i < layers.main.scene.elements.length; i++) {
        layers.main.scene.elements[i].draw(context);
        layers.temp && layers.temp.scene.elements[i].draw(context);
      }
    };

    const drawLoop = () => {
      context.renderTime = (Date.now() - context.startTime) / 1000.0;
      drawOnce();
      drawNums++;
      this.fps = drawNums / context.renderTime; // TODO: number overflow
      requestAnimationFrame(drawLoop);
    };

    if (edgeStyle.animateType && edgeStyle.animateType !== 'none') {
      drawLoop();
    } else {
      drawOnce();
    }
  };
  drawFunc = this.draw.bind(this);

  this.getScreenCoords = function(conf) {
    if (checkRemoved()) return;
    let ret = {};
    let rect = canvas.getBoundingClientRect();
    if (conf.x !== undefined)
      ret.x =
        ((conf.x - view.x + context.offsetX) /
          (view.size + 2 * context.offsetX)) *
          canvas.width +
        rect.left;
    if (conf.y !== undefined)
      ret.y =
        (1 -
          (conf.y - view.y + context.offsetY) /
            (view.size + 2 * context.offsetY)) *
          canvas.height +
        rect.top;
    return ret;
  };

  this.getLayerCoords = function(conf) {
    if (checkRemoved()) return;

    let ret = {};

    ['x', 'x1', 'x2'].forEach(k => {
      if (conf[k] !== undefined) {
        let x = conf[k];
        x =
          (x / canvas.width) * (view.size + 2 * context.offsetX) -
          context.offsetX +
          view.x;
        ret[k] = x;
      }
    });

    ['y', 'y1', 'y2'].forEach(k => {
      if (conf[k] !== undefined) {
        let y = conf[k];
        y =
          (1 - y / canvas.height) * (view.size + 2 * context.offsetY) -
          context.offsetY +
          view.y;
        ret[k] = y;
      }
    });

    if (conf.radius !== undefined) {
      let dist = conf.radius;

      let disth = dist / canvas.height;
      let distw = dist / canvas.width;
      dist = Math.max(disth, distw) * view.size;

      ret.radius = dist;
    }

    return ret;
  };

  let findMerge = function(funcname, args) {
    if (checkRemoved() || !gl) return;

    let f1 = layers.main[funcname].apply(layers.main, args);

    if (!layers.temp) return f1;

    let f2 = layers.temp[funcname].apply(layers.temp, args);

    let r = {};
    for (let key in f1) {
      r[key] = mergeArrays(f1[key], f2[key], (e1, e2) => {
        return e1.dist2 - e2.dist2;
      });
    }

    return r;
  };

  this.find = function() {
    return findMerge('find', arguments);
  };
  this.findArea = function() {
    return findMerge('findArea', arguments);
  };

  this.getTextPosition = n => {
    if (checkRemoved() || !gl) return;

    const offset = 0.5 * context.nodeSize;
    const offsety = (2.0 * (n.y <= 0.5 ? 0 : 1) - 1.0) * offset;

    let ns = getPartitionStyle(options.styles[n.style], nodeStyle, 'label');
    let textEngine = texts.getEngine(ns.font);
    textEngine.setFont(ns.font);

    let wantedSize = textEngine.isSDF
      ? getLabelSize(context, ns.label || {})
      : textEngine.fontSize;
    let fontScale = wantedSize / textEngine.fontSize;
    if (wantedSize === 0) {
      fontScale = 0;
    }

    return {
      offsetY: offsety,
      fontScale: fontScale,
      chars: textEngine.get(n.label, n.x, n.y),
    };
  };

  let addEvts = (el, evts) => {
    for (var k in evts || {}) {
      evts[k] &&
        el.addEventListener(k, evts[k], { passive: options.passiveEvts });
    }
  };

  let removeEvts = (el, evts) => {
    for (var k in evts || {}) {
      evts[k] && el.removeEventListener(k, evts[k]);
    }
  };

  let onDownThis = onMouseDown.bind(this);

  const onWheelThis = onWheel.bind(this);

  let zoomevts;
  addEvts(
    canvas,
    (zoomevts = {
      mousedown: onDownThis,
      touchstart: onDownThis,
      wheel: onWheelThis,
      contextmenu: options.onContextMenu,
    })
  );

  this.remove = () => {
    if (checkRemoved()) return;

    for (var k in layers) {
      layers[k].remove();
    }

    if (gl) {
      gl.viewport(0, 0, context.width * 2, context.height * 2);
      gl.clear(gl.COLOR_BUFFER_BIT);

      let gl_lose = gl.getExtension('WEBGL_lose_context');
      gl_lose && gl_lose.loseContext();
    }

    removeEvts(canvas, zoomevts);

    events.disable();
    texts && texts.remove();

    removed = true;
  };

  let last_view = {};
  function checkChangeViewport() {
    let is_change = false;
    if (last_view) {
      for (let k in view) {
        if (last_view[k] !== view[k]) is_change = true;
      }
    }
    ccNetViz_utils.extend(last_view, view);

    if (is_change) {
      options.onChangeViewport && options.onChangeViewport(view);
    }
  }

  function onContextMenu(e) {}

  function onWheel(e) {
    let rect = canvas.getBoundingClientRect();

    if (!options.passiveEvts) {
      e.preventDefault();
    }

    let oldsize, oldx, oldy;

    // Mouse coordinates
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const radius = 10;

    // if no timer found i.e. we are not in continuous phase
    // we are calculating the focus variables again
    if (!onWheel.continuosZoom) {
      onWheel.startView = { size: view.size, x: view.x, y: view.y };

      const lCoords = this.getLayerCoords({
        x1: mouseX - radius,
        y1: mouseY - radius,
        x2: mouseX + radius,
        y2: mouseY - radius,
      });
      const searchNodes = this.findArea(
        lCoords.x1,
        lCoords.y1,
        lCoords.x2,
        lCoords.y2,
        true
      );
      // if node found beneath mouse_ptr, zooming_focus is the center of that node
      if (searchNodes.nodes.length) {
        let node = searchNodes.nodes[0];
        let focus = this.getScreenCoords({
          x: node.node.x,
          y: node.node.y,
        });
        onWheel.focusX = focus.x;
        onWheel.focusY = focus.y;
      }
      // else, it is the window co-ords of the mouse_ptr
      else {
        onWheel.focusX = mouseX;
        onWheel.focusY = mouseY;
      }
      onWheel.oldX = view.x;
      onWheel.oldY = view.y;
      onWheel.oldSize = view.size;

      if (onWheel.continuosZoom) clearTimeout(onWheel.continuosZoom);

      oldx = view.x;
      oldy = view.y;
    }
    onWheel.continuosZoom = setTimeout(() => {
      onWheel.continuosZoom = undefined;
    }, 200);

    let size = Math.min(
      1.0,
      view.size * (1 + 0.001 * (e.deltaMode ? 33 : 1) * e.deltaY)
    );
    let delta = size - onWheel.oldSize;

    view.size = size;
    view.x = Math.max(
      0,
      Math.min(1 - size, onWheel.oldX - (delta * onWheel.focusX) / canvas.width)
    );
    view.y = Math.max(
      0,
      Math.min(
        1 - size,
        onWheel.oldY - delta * (1 - onWheel.focusY / canvas.height)
      )
    );

    if (options.onZoom && options.onZoom(view) === false) {
      view.size = oldsize;
      view.x = oldx;
      view.y = oldy;
      return;
    }

    checkChangeViewport();

    this.draw();
  }

  let lastUpTime = 0;
  function onMouseDown(downe) {
    if (downe.which !== 1) return; //catch only 1 - left mouse button

    let parseTouchEvts = e => {
      if (!e.touches) return e;

      let x = 0,
        y = 0;
      for (let i = 0; i < e.touches.length; i++) {
        x += e.touches[i].clientX;
        y += e.touches[i].clientY;
      }
      e.clientX = x / e.touches.length;
      e.clientY = y / e.touches.length;

      return e;
    };

    downe = parseTouchEvts(downe);

    let width = canvas.width / view.size;
    let height = canvas.height / view.size;
    let sx = downe.clientX;
    let sy = downe.clientY;
    let dx = view.x + sx / width;
    let dy = sy / height - view.y;
    let od = options.onDrag;
    let dragged, custom;
    let panning = true;
    let zooming = false;
    let evts;

    let origdist;
    if ((downe.touches || []).length === 2) {
      let mx = downe.touches[0].clientX - downe.touches[1].clientX,
        my = downe.touches[0].clientY - downe.touches[1].clientY;
      origdist = Math.sqrt(mx * mx + my * my);
      zooming = true;
    }

    let drag = e => {
      e = parseTouchEvts(e);

      if (e.touches && e.touches.length != 1) panning = false;

      if (dragged) {
        if (panning) {
          if (custom) {
            od.drag && od.drag(e);
          } else {
            view.x = Math.max(
              0,
              Math.min(1 - view.size, dx - e.clientX / width)
            );
            view.y = Math.max(
              0,
              Math.min(1 - view.size, e.clientY / height - dy)
            );
            checkChangeViewport();
            this.draw();
          }
        }
      } else {
        let x, y;
        if (e.touches && e.touches.length > 0) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else {
          x = e.clientX;
          y = e.clientY;
        }

        let mx = x - sx;
        let my = y - sy;

        if (mx * mx + my * my > 8) {
          dragged = true;
          custom = od && od.start(downe);
          custom && od.drag && od.drag(e);
        }
      }
      if (!options.passiveEvts) {
        e.preventDefault();
      }
    };

    let up = e => {
      e = parseTouchEvts(e);

      custom && od.stop && od.stop(e);

      if (!dragged) {
        options.onClick && options.onClick(e);

        if (new Date().getTime() - lastUpTime < 250) {
          options.onDblClick && options.onDblClick(e);
          lastUpTime = 0;
        } else {
          lastUpTime = new Date().getTime();
        }
      }

      removeEvts(window, evts);
    };

    let zoom = e => {
      e = parseTouchEvts(e);

      if (e.touches && e.touches.length == 2) {
        let mx = e.touches[0].clientX - e.touches[1].clientX,
          my = e.touches[0].clientY - e.touches[1].clientY;
        let dist = Math.sqrt(mx * mx + my * my);
        e.deltaY = -(dist - origdist) * 5;
        onWheelThis(e);
        origdist = dist;
      }
    };

    addEvts(
      window,
      (evts = {
        mouseup: up,
        touchend: up,
        touchcancel: up,
        mousemove: zooming ? zoom : drag,
        touchmove: zooming ? zoom : drag,
      })
    );
  }

  this.image = function() {
    if (checkRemoved()) return;

    return canvas.toDataURL();
  };

  this.resize = function() {
    if (checkRemoved()) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  this.getViewport = function() {
    return view;
  };

  this.setViewport = function(v) {
    if (checkRemoved()) return;

    ccNetViz_utils.extend(view, v);

    checkChangeViewport();
  };

  this.resetView = () => this.setViewport({ size: 1, x: 0, y: 0 });

  //expose these methods from layer into this class
  ['update'].forEach(function(method) {
    (function(method, self) {
      self[method] = function() {
        let args = arguments;
        for (let k in layers) {
          let l = layers[k];
          l[method].apply(l, args);
        }
        return self;
      };
    })(method, self);
  });

  if ((gl = globalUtiilites.getContext(canvas))) {
    gl.clearColor(
      backgroundColor.r,
      backgroundColor.g,
      backgroundColor.b,
      backgroundColor.a
    );
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);
  }

  view = { size: 1, x: 0, y: 0 };

  this.resize();

  textures = new ccNetViz_textures(events, onLoad);
  files = new ccNetViz_files(events, onLoad);
  texts = gl && new ccNetViz_texts(gl, files, textures);
  layers.main = new ccNetViz_layer(
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
  );

  if (!gl) console.warn('Cannot initialize WebGL context');
};

ccNetViz.isWebGLSupported = () => !!globalUtiilites.getContext(sCanvas);

ccNetViz.color = ccNetViz_color;
ccNetViz.spatialSearch = ccNetViz_spatialSearch;
ccNetViz.layout = ccNetViz_layout;
ccNetViz.color = ccNetViz_color;

ccNetViz.Shaders = {
  node: NodePlugin,
  edge: EdgePlugin,
  label: LabelPlugin,
};

ccNetViz.BasePlugin = BasePlugin;
ccNetViz.BaseShape = BaseShape;
ccNetViz.tools = {
  gl: ccNetViz_gl,
  primitive: ccNetViz_primitive,
  geomutils: ccNetViz_geomutils,
  normalize: normalize,
};

window.ccNetViz = ccNetViz;
export default ccNetViz;
