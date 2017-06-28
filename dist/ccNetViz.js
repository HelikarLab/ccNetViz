/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ccNetViz = __webpack_require__(1);
	
	var _ccNetViz2 = _interopRequireDefault(_ccNetViz);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska - http://alessaska.cz/
	 */
	
	var ccNetVizMultiLevel = function ccNetVizMultiLevel(canvas, options) {
	  var vizScreen = new _ccNetViz2.default(canvas, options);
	  var vizLayout;
	
	  var history = [];
	  var curlevel = {};
	
	  var onContextMenu, onClick;
	
	  //right click >> go back
	  canvas.addEventListener('contextmenu', onContextMenu = function onContextMenu(e) {
	    if (history.length > 0) {
	      var histel = history.pop();
	
	      //currently shown level
	      curlevel = histel;
	
	      vizScreen.set(curlevel.nodes, curlevel.edges);
	      vizScreen.draw();
	    }
	
	    e.preventDefault();
	  });
	
	  canvas.addEventListener('click', onClick = function onClick(e) {
	    var bb = canvas.getBoundingClientRect();
	
	    var x = e.clientX - bb.left;
	    var y = e.clientY - bb.top;
	    var radius = 5;
	
	    var lCoords = vizScreen.getLayerCoords({ radius: radius, x: x, y: y });
	    var result = vizScreen.find(lCoords.x, lCoords.y, lCoords.radius, true, false);
	    if (result.nodes.length > 0) {
	      var node = result.nodes[0].node;
	
	      var layout = node.layout || vizLayout;
	      if (node.__computedLayout) {
	        //it is not nessesary to recompute layout if it was yet computed on this subgraph
	        layout = undefined;
	      } else {
	        //we store that layout was once computed for this subgraph
	        node.__computedLayout = true;
	      }
	
	      if (node.nodes && node.edges) {
	        var insidenodes = node.nodes;
	        var insideedges = node.edges;
	
	        history.push(curlevel);
	
	        curlevel = { nodes: insidenodes, edges: insideedges };
	
	        vizScreen.set(curlevel.nodes, curlevel.edges, layout);
	        vizScreen.draw();
	      }
	    }
	  });
	
	  ////TODO: Add interactivity functios into this class
	
	  this.remove = function () {
	    canvas.removeEventListener('contextmenu', onContextMenu);
	    canvas.removeEventListener('click', onClick);
	    vizScreen.remove();
	  };
	
	  this.set = function (nodes, edges, layout) {
	    curlevel = { nodes: nodes, edges: edges };
	    history = [];
	
	    vizLayout = layout;
	    vizScreen.set.apply(vizScreen, arguments);
	  };
	
	  var exposeMethods = ['find', 'findArea', 'getLayerCoords', 'draw', 'resetView', 'setViewport', 'update', 'resetView'];
	  var self = this;
	  exposeMethods.forEach(function (method) {
	    (function (method, self) {
	      self[method] = function () {
	        return vizScreen[method].apply(vizScreen, arguments);
	      };
	    })(method, self);
	  });
	};
	
	window.ccNetVizMultiLevel = ccNetVizMultiLevel;
	
	exports.default = ccNetVizMultiLevel;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _layer = __webpack_require__(2);
	
	var _layer2 = _interopRequireDefault(_layer);
	
	var _layout = __webpack_require__(9);
	
	var _layout2 = _interopRequireDefault(_layout);
	
	var _gl = __webpack_require__(4);
	
	var _gl2 = _interopRequireDefault(_gl);
	
	var _color = __webpack_require__(3);
	
	var _color2 = _interopRequireDefault(_color);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _textures = __webpack_require__(24);
	
	var _textures2 = _interopRequireDefault(_textures);
	
	var _files = __webpack_require__(25);
	
	var _files2 = _interopRequireDefault(_files);
	
	var _texts = __webpack_require__(26);
	
	var _texts2 = _interopRequireDefault(_texts);
	
	var _lazyEvents = __webpack_require__(34);
	
	var _lazyEvents2 = _interopRequireDefault(_lazyEvents);
	
	var _interactivityBatch = __webpack_require__(35);
	
	var _interactivityBatch2 = _interopRequireDefault(_interactivityBatch);
	
	var _spatialSearch = __webpack_require__(21);
	
	var _spatialSearch2 = _interopRequireDefault(_spatialSearch);
	
	var _primitiveTools = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: 
	 *  David Tichy
	 *    Aleš Saska - http://alessaska.cz/
	 */
	
	var sCanvas = document.createElement("canvas");
	function getContext(canvas) {
	  var attributes = { depth: false, antialias: false };
	  var gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
	
	  return gl;
	}
	
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
	  var r = [];
	  r.length = a.length + b.length;
	
	  var i = 0,
	      j = 0,
	      k = 0;
	
	  while (i < a.length && j < b.length) {
	    if (cmp(a[i], b[j]) < 0) r[k++] = a[i++];else r[k++] = b[j++];
	  }
	
	  while (i < a.length) {
	    r[k++] = a[i++];
	  }while (j < b.length) {
	    r[k++] = b[j++];
	  }return r;
	}
	
	var ccNetViz = function ccNetViz(canvas, options) {
	  var _this = this;
	
	  var self = this;
	  canvas = canvas || sCanvas;
	
	  var backgroundStyle = options.styles.background = options.styles.background || {};
	  var backgroundColor = new _color2.default(backgroundStyle.color || "rgb(255, 255, 255)");
	
	  var removed = false;
	  var setted = false;
	
	  var nodeStyle = options.styles.node = options.styles.node || {};
	  nodeStyle.minSize = nodeStyle.minSize != null ? nodeStyle.minSize : 6;
	  nodeStyle.maxSize = nodeStyle.maxSize || 16;
	  nodeStyle.color = nodeStyle.color || "rgb(255, 255, 255)";
	
	  if (nodeStyle.label) {
	    var s = nodeStyle.label;
	    s.color = s.color || "rgb(120, 120, 120)";
	    s.font = s.font || { type: "Arial, Helvetica, sans-serif", size: 11 };
	  }
	
	  var edgeStyle = options.styles.edge = options.styles.edge || {};
	  edgeStyle.width = edgeStyle.width || 1;
	  edgeStyle.color = edgeStyle.color || "rgb(204, 204, 204)";
	
	  var onLoad = function onLoad() {
	    if (!options.onLoad || options.onLoad()) {
	      _this.draw(true);
	    }
	  };
	
	  if (edgeStyle.arrow) {
	    var _s = edgeStyle.arrow;
	    _s.minSize = _s.minSize != null ? _s.minSize : 6;
	    _s.maxSize = _s.maxSize || 12;
	    _s.aspect = 1;
	  }
	
	  var events = new _lazyEvents2.default();
	  var layers = {};
	  var view = void 0,
	      gl = void 0,
	      drawFunc = void 0,
	      textures = void 0,
	      files = void 0,
	      texts = void 0;
	  var context = {};
	
	  this.cntShownNodes = function () {
	    var n = 0;
	    for (var k in layers) {
	      n += layers[k].cntShownNodes();
	    }return n;
	  };
	  var getNodesCnt = options.getNodesCnt || this.cntShownNodes;
	
	  this.cntShownEdges = function () {
	    var e = 0;
	    for (var k in layers) {
	      e += layers[k].cntShownEdges();
	    }return e;
	  };
	  var getEdgesCnt = options.getEdgesCnt || this.cntShownEdges;
	
	  var onRedraw = events.debounce(function () {
	    self.draw.call(self);
	    return false;
	  }, 5);
	
	  function checkRemoved() {
	    if (removed) {
	      console.error("Cannot call any function on graph after remove()");
	      return true;
	    }
	    return false;
	  }
	
	  var nodes = void 0,
	      edges = void 0;
	
	  function insertTempLayer() {
	    if (layers.temp) return;
	    layers.temp = new _layer2.default(canvas, context, view, gl, textures, files, texts, events, options, backgroundColor, nodeStyle, edgeStyle, getSize, getNodeSize, getLabelSize, getLabelHideSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad);
	  }
	
	  var batch = undefined;
	  function getBatch() {
	    if (!batch) batch = new _interactivityBatch2.default(layers, insertTempLayer, drawFunc, nodes, edges, checkUniqId);
	    return batch;
	  };
	
	  this.set = function (n, e, layout) {
	    if (checkRemoved()) return _this;
	
	    nodes = n || [];
	    edges = e || [];
	
	    nodes.forEach(checkUniqId);
	    edges.forEach(checkUniqId);
	
	    layers.temp && layers.temp.set([], [], layout);
	    layers.main.set(nodes, edges, layout);
	
	    //reset batch
	    batch = undefined;
	    setted = true;
	    return _this;
	  };
	
	  //make all dynamic changes static
	  this.reflow = function () {
	    if (checkRemoved()) return;
	
	    getBatch().applyChanges();
	
	    //nodes and edges in dynamic chart are actual
	    var n = layers.main.getVisibleNodes();
	    if (layers.temp) n = n.concat(layers.temp.getVisibleNodes());
	
	    var e = layers.main.getVisibleEdges();
	    if (layers.temp) e = e.concat(layers.temp.getVisibleEdges());
	
	    _this.set(n, e);
	    _this.draw();
	  };
	
	  this.removeNode = function (n) {
	    if (checkRemoved()) {
	      return _this;
	    }getBatch().removeNode(n);return _this;
	  };
	  this.removeEdge = function (e) {
	    if (checkRemoved()) {
	      return _this;
	    }getBatch().removeEdge(e);return _this;
	  };
	  this.addEdge = function (e) {
	    if (checkRemoved()) {
	      return _this;
	    }getBatch().addEdge(e);return _this;
	  };
	  this.addNode = function (n) {
	    if (checkRemoved()) {
	      return _this;
	    }getBatch().addNode(n);return _this;
	  };
	  this.updateNode = function (n) {
	    if (checkRemoved()) {
	      return _this;
	    }return _this.removeNode(n).addNode(n);
	  };
	  this.updateEdge = function (e) {
	    if (checkRemoved()) {
	      return _this;
	    }return _this.removeEdge(e).addEdge(e);
	  };
	  this.applyChanges = function () {
	    if (checkRemoved()) {
	      return _this;
	    }getBatch().applyChanges();return _this;
	  };
	
	  this.addEdges = function (edges) {
	    if (checkRemoved()) return _this;
	
	    edges.forEach(function (e) {
	      _this.addEdge(e);
	    });
	
	    return _this;
	  };
	
	  this.addNodes = function (nodes) {
	    if (checkRemoved()) return _this;
	
	    nodes.forEach(function (n) {
	      _this.addNode(n);
	    });
	
	    return _this;
	  };
	
	  this.removeEdges = function (edges) {
	    if (checkRemoved()) return _this;
	
	    edges.forEach(function (e) {
	      _this.removeEdge(e);
	    });
	    return _this;
	  };
	
	  this.removeNodes = function (nodes) {
	    if (checkRemoved()) return _this;
	
	    nodes.forEach(function (n) {
	      _this.removeNode(n);
	    });
	    return _this;
	  };
	
	  this.updateNodes = function (nodes) {
	    if (checkRemoved()) return _this;
	
	    nodes.forEach(function (n) {
	      _this.updateNode(n);
	    });
	
	    return _this;
	  };
	
	  this.updateEdges = function (edges) {
	    if (checkRemoved()) return _this;
	
	    edges.forEach(function (e) {
	      _this.updateEdge(e);
	    });
	
	    return _this;
	  };
	
	  var getSize = function getSize(c, s, n, sc) {
	    var result = sc * Math.sqrt(c.width * c.height / (n + 1)) / view.size;
	    if (s) {
	      var min = s.size ? s.size : s.minSize;
	      var max = s.size ? s.size : s.maxSize;
	
	      result = max ? Math.min(max, result) : result;
	      if (result < s.hideSize) return 0;
	      result = min ? Math.max(min, result) : result;
	    }
	    return result;
	  };
	
	  var getNodeSize = function getNodeSize(c) {
	    return getSize(c, c.style, getNodesCnt(), 0.4);
	  };
	  var getLabelSize = function getLabelSize(c, s) {
	    return getSize(c, s, getNodesCnt(), 0.25);
	  };
	
	  var getLabelHideSize = function getLabelHideSize(c, s) {
	    if (s) {
	      var sc = 0.25;
	      var n = layers.main.cntShownNodes(); //lower bound
	      var t = sc * Math.sqrt(c.width * c.height / (n + 1));
	
	      var vs = void 0;
	      if (s.hideSize) {
	        vs = t / s.hideSize;
	        if (s.maxSize) vs = Math.min(vs, t / s.maxSize);
	        return vs;
	      }
	    }
	
	    return 1;
	  };
	
	  var offset = 0.5 * nodeStyle.maxSize;
	
	  this.draw = function (silent) {
	    if (silent && (removed || !setted)) return;
	    if (checkRemoved()) return;
	
	    var width = canvas.width;
	    var height = canvas.height;
	    var aspect = width / height;
	    var o = view.size === 1 ? offset : 0;
	    var ox = o / width;
	    var oy = o / height;
	
	    context.transform = _gl2.default.ortho(view.x - ox, view.x + view.size + ox, view.y - oy, view.y + view.size + oy, -1, 1);
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
	
	    for (var i = 0; i < layers.main.scene.elements.length; i++) {
	      layers.main.scene.elements[i].draw(context);
	      layers.temp && layers.temp.scene.elements[i].draw(context);
	    }
	  };
	  drawFunc = this.draw.bind(this);
	
	  this.getScreenCoords = function (conf) {
	    if (checkRemoved()) return;
	    var ret = {};
	    var rect = canvas.getBoundingClientRect();
	    if (conf.x !== undefined) ret.x = (conf.x - view.x + context.offsetX) / (view.size + 2 * context.offsetX) * canvas.width + rect.left;
	    if (conf.y !== undefined) ret.y = (1 - (conf.y - view.y + context.offsetY) / (view.size + 2 * context.offsetY)) * canvas.height + rect.top;
	    return ret;
	  };
	
	  this.getLayerCoords = function (conf) {
	    if (checkRemoved()) return;
	
	    var ret = {};
	
	    ['x', 'x1', 'x2'].forEach(function (k) {
	      if (conf[k] !== undefined) {
	        var x = conf[k];
	        x = x / canvas.width * (view.size + 2 * context.offsetX) - context.offsetX + view.x;
	        ret[k] = x;
	      }
	    });
	
	    ['y', 'y1', 'y2'].forEach(function (k) {
	      if (conf[k] !== undefined) {
	        var y = conf[k];
	        y = (1 - y / canvas.height) * (view.size + 2 * context.offsetY) - context.offsetY + view.y;
	        ret[k] = y;
	      }
	    });
	
	    if (conf.radius !== undefined) {
	      var dist = conf.radius;
	
	      var disth = dist / canvas.height;
	      var distw = dist / canvas.width;
	      dist = Math.max(disth, distw) * view.size;
	
	      ret.radius = dist;
	    }
	
	    return ret;
	  };
	
	  var findMerge = function findMerge(funcname, args) {
	    if (checkRemoved() || !gl) return;
	
	    var f1 = layers.main[funcname].apply(layers.main, args);
	
	    if (!layers.temp) return f1;
	
	    var f2 = layers.temp[funcname].apply(layers.temp, args);
	
	    var r = {};
	    for (var key in f1) {
	      r[key] = mergeArrays(f1[key], f2[key], function (e1, e2) {
	        return e1.dist2 - e2.dist2;
	      });
	    }
	
	    return r;
	  };
	
	  this.find = function () {
	    return findMerge('find', arguments);
	  };
	  this.findArea = function () {
	    return findMerge('findArea', arguments);
	  };
	
	  this.getTextPosition = function (n) {
	    if (checkRemoved() || !gl) return;
	
	    var offset = 0.5 * context.nodeSize;
	    var offsety = (2.0 * (n.y <= 0.5 ? 0 : 1) - 1.0) * offset;
	
	    var ns = (0, _primitiveTools.getPartitionStyle)(options.styles[n.style], nodeStyle, "label");
	    var textEngine = texts.getEngine(ns.font);
	    textEngine.setFont(ns.font);
	
	    var wantedSize = textEngine.isSDF ? getLabelSize(context, ns.label || {}) : textEngine.fontSize;
	    var fontScale = wantedSize / textEngine.fontSize;if (wantedSize === 0) {
	      fontScale = 0;
	    };
	
	    return { offsetY: offsety, fontScale: fontScale, chars: textEngine.get(n.label, n.x, n.y) };
	  };
	
	  var addEvts = function addEvts(el, evts) {
	    for (var k in evts || {}) {
	      evts[k] && el.addEventListener(k, evts[k]);
	    }
	  };
	
	  var removeEvts = function removeEvts(el, evts) {
	    for (var k in evts || {}) {
	      evts[k] && el.removeEventListener(k, evts[k]);
	    }
	  };
	
	  var onDownThis = onMouseDown.bind(this);
	
	  var zoomevts = void 0;
	  addEvts(canvas, zoomevts = {
	    'mousedown': onDownThis,
	    'touchstart': onDownThis,
	    'wheel': onWheel.bind(this),
	    'contextmenu': options.onContextMenu
	  });
	
	  this.remove = function () {
	    if (checkRemoved()) return;
	
	    for (var k in layers) {
	      layers[k].remove();
	    }
	
	    if (gl) {
	      gl.viewport(0, 0, context.width * 2, context.height * 2);
	      gl.clear(gl.COLOR_BUFFER_BIT);
	
	      var gl_lose = gl.getExtension('WEBGL_lose_context');
	      gl_lose && gl_lose.loseContext();
	    }
	
	    removeEvts(canvas, zoomevts);
	
	    events.disable();
	    texts && texts.remove();
	
	    removed = true;
	  };
	
	  var last_view = {};
	  function checkChangeViewport() {
	    var is_change = false;
	    if (last_view) {
	      for (var k in view) {
	        if (last_view[k] !== view[k]) is_change = true;
	      }
	    }
	    _utils2.default.extend(last_view, view);
	
	    if (is_change) {
	      options.onChangeViewport && options.onChangeViewport(view);
	    }
	  }
	
	  function onContextMenu(e) {}
	
	  function onWheel(e) {
	    var rect = canvas.getBoundingClientRect();
	    var size = Math.min(1.0, view.size * (1 + 0.001 * (e.deltaMode ? 33 : 1) * e.deltaY));
	    var delta = size - view.size;
	
	    e.preventDefault();
	
	    var oldsize = view.size;
	    var oldx = view.x;
	    var oldy = view.y;
	
	    view.size = size;
	    view.x = Math.max(0, Math.min(1 - size, view.x - delta * (e.clientX - rect.left) / canvas.width));
	    view.y = Math.max(0, Math.min(1 - size, view.y - delta * (1 - (e.clientY - rect.top) / canvas.height)));
	
	    if (options.onZoom && options.onZoom(view) === false) {
	      view.size = oldsize;
	      view.x = oldx;
	      view.y = oldy;
	      return;
	    }
	
	    checkChangeViewport();
	
	    this.draw();
	  }
	
	  var lastUpTime = 0;
	  function onMouseDown(downe) {
	    var _this2 = this;
	
	    if (downe.which !== 1) return; //catch only 1 - left mouse button
	
	    var parseTouchEvts = function parseTouchEvts(e) {
	      if (!e.touches) return e;
	
	      var x = 0,
	          y = 0;
	      for (var i = 0; i < e.touches.length; i++) {
	        x += e.touches[i].clientX;y += e.touches[i].clientY;
	      }
	      e.clientX = x / e.touches.length;
	      e.clientY = y / e.touches.length;
	
	      return e;
	    };
	
	    downe = parseTouchEvts(downe);
	
	    var width = canvas.width / view.size;
	    var height = canvas.height / view.size;
	    var sx = downe.clientX;
	    var sy = downe.clientY;
	    var dx = view.x + sx / width;
	    var dy = sy / height - view.y;
	    var od = options.onDrag;
	    var dragged = void 0,
	        custom = void 0;
	    var panning = true;
	    var zooming = false;
	    var evts = void 0;
	
	    var origdist = void 0;
	    if ((downe.touches || []).length === 2) {
	      var mx = downe.touches[0].clientX - downe.touches[1].clientX,
	          my = downe.touches[0].clientY - downe.touches[1].clientY;
	      origdist = Math.sqrt(mx * mx + my * my);
	      zooming = true;
	    }
	
	    var drag = function drag(e) {
	      e = parseTouchEvts(e);
	
	      if (e.touches && e.touches.length != 1) panning = false;
	
	      if (dragged) {
	        if (panning) {
	          if (custom) {
	            od.drag && od.drag(e);
	          } else {
	            view.x = Math.max(0, Math.min(1 - view.size, dx - e.clientX / width));
	            view.y = Math.max(0, Math.min(1 - view.size, e.clientY / height - dy));
	            checkChangeViewport();
	            _this2.draw();
	          }
	        }
	      } else {
	        var x = void 0,
	            y = void 0;
	        if (e.touches && e.touches.length > 0) {
	          x = e.touches[0].clientX;y = e.touches[0].clientY;
	        } else {
	          x = e.clientX;y = e.clientY;
	        }
	
	        var _mx = x - sx;
	        var _my = y - sy;
	
	        if (_mx * _mx + _my * _my > 8) {
	          dragged = true;
	          custom = od && od.start(downe);
	          custom && od.drag && od.drag(e);
	        }
	      }
	      e.preventDefault();
	    };
	
	    var up = function up(e) {
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
	
	    var zoom = function zoom(e) {
	      e = parseTouchEvts(e);
	
	      if (e.touches && e.touches.length == 2) {
	        var _mx2 = e.touches[0].clientX - e.touches[1].clientX,
	            _my2 = e.touches[0].clientY - e.touches[1].clientY;
	        var dist = Math.sqrt(_mx2 * _mx2 + _my2 * _my2);
	        e.deltaY = -(dist - origdist) * 5;
	        onWheelThis(e);
	        origdist = dist;
	      }
	    };
	
	    addEvts(window, evts = {
	      'mouseup': up,
	      'touchend': up,
	      'touchcancel': up,
	      'mousemove': zooming ? zoom : drag,
	      'touchmove': zooming ? zoom : drag
	    });
	  }
	
	  this.image = function () {
	    if (checkRemoved()) return;
	
	    return canvas.toDataURL();
	  };
	
	  this.resize = function () {
	    if (checkRemoved()) return;
	
	    canvas.width = canvas.offsetWidth;
	    canvas.height = canvas.offsetHeight;
	  };
	
	  this.getViewport = function () {
	    return view;
	  };
	
	  this.setViewport = function (v) {
	    if (checkRemoved()) return;
	
	    _utils2.default.extend(view, v);
	
	    checkChangeViewport();
	  };
	
	  this.resetView = function () {
	    return _this.setViewport({ size: 1, x: 0, y: 0 });
	  };
	
	  //expose these methods from layer into this class
	  ['update'].forEach(function (method) {
	    (function (method, self) {
	      self[method] = function () {
	        var args = arguments;
	        for (var k in layers) {
	          var l = layers[k];
	          l[method].apply(l, args);
	        };
	        return self;
	      };
	    })(method, self);
	  });
	
	  if (gl = getContext(canvas)) {
	    gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
	    gl.blendEquation(gl.FUNC_ADD);
	    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
	    gl.enable(gl.BLEND);
	  }
	
	  view = { size: 1, x: 0, y: 0 };
	
	  this.resize();
	
	  textures = new _textures2.default(events, onLoad);
	  files = new _files2.default(events, onLoad);
	  texts = gl && new _texts2.default(gl, files, textures);
	  layers.main = new _layer2.default(canvas, context, view, gl, textures, files, texts, events, options, backgroundColor, nodeStyle, edgeStyle, getSize, getNodeSize, getLabelSize, getLabelHideSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad);
	
	  if (!gl) console.warn("Cannot initialize WebGL context");
	};
	
	ccNetViz.isWebGLSupported = function () {
	  return !!getContext(sCanvas);
	};
	
	ccNetViz.color = _color2.default;
	ccNetViz.spatialSearch = _spatialSearch2.default;
	ccNetViz.layout = _layout2.default;
	ccNetViz.color = _color2.default;
	
	window.ccNetViz = ccNetViz;
	exports.default = ccNetViz;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (canvas, context, view, gl, textures, files, texts, events, options, backgroundColor, nodeStyle, edgeStyle, getSize, getNodeSize, getLabelSize, getLabelHideSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad) {
	    var _this = this;
	
	    getNodesCnt = getNodesCnt || function () {
	        return _this.nodes.length;
	    };
	    getEdgesCnt = getEdgesCnt || function () {
	        return _this.edges.length;
	    };
	
	    this.redraw = onRedraw || function () {};
	
	    options = options || {};
	    options.styles = options.styles || {};
	
	    var nodesFiller = function nodesFiller(style) {
	        return {
	            set: function set(v, e, iV, iI) {
	                var x = e.x;
	                var y = e.y;
	                _primitive2.default.vertices(v.position, iV, x, y, x, y, x, y, x, y);
	                _primitive2.default.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
	                if (v.color) {
	                    var c = e.color;
	                    _primitive2.default.colors(v.color, iV, c, c, c, c);
	                }
	                _primitive2.default.quad(v.indices, iV, iI);
	            } };
	    };
	    var labelsFiller = function labelsFiller(style) {
	        return function (style) {
	            var textEngine = texts.getEngine(style.font);
	
	            textEngine.setFont(style.font);
	
	            return {
	                set: function set(v, e, iV, iI) {
	                    var x = e.x;
	                    var y = e.y;
	
	                    var ret = false;
	                    var parts = textEngine.get(e.label || "", x, y, function () {
	                        ret = true;
	                    });
	                    for (var i = 0; i < parts.length; i++, iV += 4, iI += 6) {
	                        var c = parts[i];
	
	                        _primitive2.default.vertices(v.position, iV, x, y, x, y, x, y, x, y);
	                        _primitive2.default.vertices(v.relative, iV, c.dx, c.dy, c.width + c.dx, c.dy, c.width + c.dx, c.height + c.dy, c.dx, c.height + c.dy);
	                        _primitive2.default.vertices(v.textureCoord, iV, c.left, c.bottom, c.right, c.bottom, c.right, c.top, c.left, c.top);
	                        _primitive2.default.quad(v.indices, iV, iI);
	                    }
	
	                    return ret;
	                },
	                size: function size(v, e) {
	                    return textEngine.steps(e.label || "");
	                }
	            };
	        }(style);
	    };
	
	    var normalize = function normalize(a, b) {
	        var x = b.x - a.x;
	        var y = b.y - a.y;
	        var sc = 1 / Math.sqrt(x * x + y * y);
	        return { x: sc * x, y: sc * y };
	    };
	
	    var dx = Math.cos(0.9);
	    var dy = Math.sin(0.9);
	
	    var ct1 = {},
	        ct2 = {},
	        ct = {};
	    var setVerticeCurveShift = function setVerticeCurveShift(v, iV, s, t) {
	        var csx = void 0,
	            csy = void 0,
	            ctx = void 0,
	            cty = void 0,
	            cisx = void 0,
	            cisy = void 0,
	            sisy = void 0,
	            citx = void 0,
	            city = void 0;
	        _geomutils2.default.getCurveShift(t.e, ct1);
	        ctx = ct1.x;
	        cty = ct1.y;
	        citx = ct1.cx;
	        city = ct1.cy;
	
	        _geomutils2.default.getCurveShift(s.e, ct2);
	        csx = ct2.x;
	        csy = ct2.y;
	        cisx = ct2.cx;
	        cisy = ct2.cy;
	
	        v.curveShift && _primitive2.default.vertices(v.curveShift, iV, -csy, csx, -csy, csx, -cty, ctx, -cty, ctx);
	        v.circleShift && _primitive2.default.vertices(v.circleShift, iV, -cisy, cisx, -cisy, cisx, -city, citx, -city, citx);
	    };
	
	    var edgesFiller = {
	        'lines': function lines(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var s = _geomutils2.default.edgeSource(e);
	                    var t = _geomutils2.default.edgeTarget(e);
	                    var dx = s.x - t.x;
	                    var dy = s.y - t.y;
	                    var d = normalize(s, t);
	
	                    setVerticeCurveShift(v, iV, s, t);
	
	                    _primitive2.default.vertices(v.position, iV, s.x, s.y, s.x, s.y, t.x, t.y, t.x, t.y);
	                    _primitive2.default.vertices(v.lengthSoFar, iV, 0, 0, 0, 0, dx, dy, dx, dy);
	                    _primitive2.default.vertices(v.normal, iV, -d.y, d.x, d.y, -d.x, d.y, -d.x, -d.y, d.x);
	                    _primitive2.default.quad(v.indices, iV, iI);
	                } };
	        },
	        'curves': function curves(style) {
	            return {
	                numVertices: 3,
	                numIndices: 3,
	                set: function set(v, e, iV, iI) {
	                    var s = _geomutils2.default.edgeSource(e);
	                    var t = _geomutils2.default.edgeTarget(e);
	                    var dx = s.x - t.x;
	                    var dy = s.y - t.y;
	                    var d = normalize(s, t);
	
	                    setVerticeCurveShift(v, iV, s, t);
	
	                    _primitive2.default.vertices(v.position, iV, s.x, s.y, 0.5 * (t.x + s.x), 0.5 * (t.y + s.y), t.x, t.y);
	                    _primitive2.default.vertices(v.lengthSoFar, iV, 0, 0, dx / 2, dy / 2, dx, dy);
	                    _primitive2.default.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
	                    _primitive2.default.vertices(v.curve, iV, 1, 1, 0.5, 0.0, 0, 0);
	                    _primitive2.default.indices(v.indices, iV, iI, 0, 1, 2);
	                }
	            };
	        },
	        'circles': function circles(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var s = _geomutils2.default.edgeSource(e);
	                    var d = s.y < 0.5 ? 1 : -1;
	
	                    var xdiff1 = 0;
	                    var ydiff1 = 0;
	                    var xdiff2 = 1;
	                    var ydiff2 = d;
	                    var xdiff3 = 2;
	                    var ydiff3 = 1.25 * d;
	                    var xdiff4 = 3;
	                    var ydiff4 = 1.5 * d;
	
	                    setVerticeCurveShift(v, iV, s, s);
	
	                    _primitive2.default.vertices(v.position, iV, s.x, s.y, s.x, s.y, s.x, s.y, s.x, s.y);
	                    _primitive2.default.vertices(v.lengthSoFar, iV, xdiff1, ydiff1, xdiff2, ydiff2, xdiff3, ydiff3, xdiff4, ydiff4);
	                    _primitive2.default.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
	                    _primitive2.default.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
	                    _primitive2.default.quad(v.indices, iV, iI);
	                }
	            };
	        }
	    };
	
	    var _set = function _set(v, e, s, t, iV, iI, dx, dy) {
	        var tx = t.x;
	        var ty = t.y;
	
	        var offsetMul = void 0;
	        var ctx = void 0,
	            cty = void 0,
	            citx = void 0,
	            city = void 0;
	
	        _geomutils2.default.getCurveShift(t.e, ct);
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
	        v.curveShift && _primitive2.default.vertices(v.curveShift, iV, -cty, ctx, -cty, ctx, -cty, ctx, -cty, ctx);
	        v.circleShift && _primitive2.default.vertices(v.circleShift, iV, -city, citx, -city, citx, -city, citx, -city, citx);
	
	        _primitive2.default.singles(v.offsetMul, iV, offsetMul, offsetMul, offsetMul, offsetMul);
	        _primitive2.default.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
	        _primitive2.default.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
	        _primitive2.default.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
	        _primitive2.default.quad(v.indices, iV, iI);
	    };
	
	    var arrowFiller = {
	        lineArrows: function lineArrows(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var s = _geomutils2.default.edgeSource(e);
	                    var t = _geomutils2.default.edgeTarget(e);
	                    var d = normalize(s, t);
	                    _set(v, e, s, t, iV, iI, d.x, d.y);
	                } };
	        },
	        curveArrows: function curveArrows(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var s = _geomutils2.default.edgeSource(e);
	                    var t = _geomutils2.default.edgeTarget(e);
	                    return _set(v, e, s, t, iV, iI, 0.5 * (t.x - s.x), 0.5 * (t.y - s.y));
	                }
	            };
	        },
	        circleArrows: function circleArrows(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var t = _geomutils2.default.edgeTarget(e);
	                    var s = t;
	                    return _set(v, e, s, t, iV, iI, t.x < 0.5 ? dx : -dx, t.y < 0.5 ? -dy : dy);
	                }
	            };
	        }
	    };
	
	    this.getCurrentSpatialSearch = function (context) {
	        if (spatialSearch === undefined) {
	            spatialSearch = new _spatialSearch2.default(context, texts, options, [], {}, [], {}, [], {}, [], {}, normalize, nodeStyle, getLabelSize, getLabelHideSize);
	        }
	        return spatialSearch;
	    };
	
	    this.remove = function () {};
	
	    var edgeTypes = void 0;
	    var edgePoses = void 0;
	
	    var spatialSearch = undefined;
	
	    var lvl = 0;
	    //make sure everything (files and textures) are load, if not, redraw the whole graph after they became
	    var set_end = function set_end() {
	        var enableLazyRedraw = false;
	        var reset = function reset(p) {
	            if (enableLazyRedraw) _this.set(_this.nodes, _this.edges);
	        };
	        files.onLoad(reset);
	        textures.onLoad(reset);
	        enableLazyRedraw = true;
	    };
	
	    this.set = function (nodes, edges, layout) {
	        removedNodes = 0;
	        removedEdges = 0;
	
	        this.nodes = nodes = nodes || [];
	        this.edges = edges = edges ? [].concat(edges) : [];
	
	        spatialSearch = undefined;
	
	        var lines = [],
	            curves = [],
	            circles = [];
	
	        //tanslate indexes into node objects
	        for (var i = 0; i < edges.length; i++) {
	            var e = edges[i];
	            if (typeof e.source == 'number') e.source = nodes[e.source];
	
	            if (typeof e.target == 'number') e.target = nodes[e.target];
	        }
	
	        var getIndex = function getIndex(e) {
	            return e.uniqid || -e.index || -e.nidx;
	        };
	
	        var init = function init() {
	            for (var _i = 0; _i < nodes.length; _i++) {
	                nodes[_i].index = _i;
	            }
	
	            for (var _i2 = 0, j = nodes.length + 10; _i2 < edges.length; _i2++, j++) {
	                edges[_i2].nidx = j;
	            }
	
	            edgeTypes = [];
	            edgePoses = new Uint32Array(edges.length);
	            var dummysd = { k: '_', kArrow: '_', d: [] };
	            var circlesd = { k: 'circles', kArrow: 'circleArrows', d: circles };
	            var linesd = { k: 'lines', kArrow: 'lineArrows', d: lines };
	            var curvesd = { k: 'curves', kArrow: 'curveArrows', d: curves };
	
	            if (extensions.OES_standard_derivatives) {
	                var map = {};
	                for (var _i3 = 0; _i3 < edges.length; _i3++) {
	                    var _e = edges[_i3];
	
	                    var si = getIndex(_e.source);
	                    var ti = getIndex(_e.target);
	
	                    (map[si] || (map[si] = {}))[ti] = true;
	                }
	
	                for (var _i4 = 0; _i4 < edges.length; _i4++) {
	                    var target = void 0,
	                        _e2 = edges[_i4];
	
	                    var _si = getIndex(_e2.source);
	                    var _ti = getIndex(_e2.target);
	
	                    var t = dummysd;
	                    if (_si === _ti) {
	                        _e2.t = 2; //circle
	                        target = circles;
	                        t = circlesd;
	                    } else {
	                        var m = map[_ti];
	                        if (m && m[_si]) {
	                            _e2.t = 1; //curve
	                            target = curves;
	                            t = curvesd;
	                        } else {
	                            _e2.t = 0; //line
	                            target = lines;
	                            t = linesd;
	                        }
	                    }
	                    edgeTypes.push(t);
	                    edgePoses[_i4] = t.d.length;
	                    target.push(_e2);
	                }
	            } else {
	                for (var _i5 = 0; _i5 < edges.length; _i5++) {
	                    var _e3 = edges[_i5];
	
	                    var _si2 = getIndex(_e3.source);
	                    var _ti2 = getIndex(_e3.target);
	
	                    var _t = dummysd;
	                    if (_si2 !== _ti2) {
	                        _t = linesd;
	                        _e3.t = 0;
	                        lines.push(_e3);
	                    }
	                    edgeTypes.push(_t);
	                    edgePoses[_i5] = _t.d.length;
	                }
	            }
	        };
	
	        init();
	
	        var nodesParts = (0, _primitiveTools.partitionByStyle)(nodes);
	        var circlesParts = (0, _primitiveTools.partitionByStyle)(circles);
	        var linesParts = (0, _primitiveTools.partitionByStyle)(lines);
	        var curvesParts = (0, _primitiveTools.partitionByStyle)(curves);
	
	        this.getCurrentSpatialSearch = function (context) {
	            if (spatialSearch === undefined) {
	                spatialSearch = new _spatialSearch2.default(context, texts, options, nodes, nodesParts, lines, linesParts, curves, curvesParts, circles, circlesParts, normalize, nodeStyle, getLabelSize, getLabelHideSize);
	            }
	            return spatialSearch;
	        };
	
	        layout && new _layout2.default[layout](nodes, edges).apply() && _layout2.default.normalize(nodes);
	
	        if (!gl) return;
	
	        var tryInitPrimitives = function tryInitPrimitives() {
	            var isDirty = false;
	
	            var defaultAdder = function defaultAdder(section, addSection) {
	                if (typeof section.style.texture === 'string') section.style.texture = textures.get(gl, section.style.texture, addSection);else addSection();
	            };
	            var labelAdder = function labelAdder(section, addSection) {
	                var slf = (section.style.label || {}).font || {};
	                var textEngine = texts.getEngine(slf);
	                section.style.texture = textEngine.getTexture(slf, addSection);
	            };
	
	            var is = void 0;
	            is = nodes.length && !nodes[0].color;
	            isDirty = isDirty || scene.nodes.set(gl, options.styles, defaultAdder, is ? nodes : [], is ? nodesParts : {}, nodesFiller);
	            is = nodes.length && nodes[0].color;
	            isDirty = isDirty || scene.nodesColored.set(gl, options.styles, defaultAdder, is ? nodes : [], is ? nodesParts : {}, nodesFiller);
	
	            if (nodeStyle.label) {
	                texts.clear();
	                isDirty = isDirty || scene.labelsOutline.set(gl, options.styles, labelAdder, nodes, nodesParts, labelsFiller);
	                isDirty = isDirty || scene.labels.set(gl, options.styles, labelAdder, nodes, nodesParts, labelsFiller);
	                texts.bind();
	            }
	
	            isDirty = isDirty || scene.lines.set(gl, options.styles, defaultAdder, lines, linesParts, edgesFiller.lines);
	
	            if (extensions.OES_standard_derivatives) {
	                isDirty = isDirty || scene.curves.set(gl, options.styles, defaultAdder, curves, curvesParts, edgesFiller.curves);
	                isDirty = isDirty || scene.circles.set(gl, options.styles, defaultAdder, circles, circlesParts, edgesFiller.circles);
	            }
	
	            if (edgeStyle.arrow) {
	                isDirty = isDirty || scene.lineArrows.set(gl, options.styles, defaultAdder, lines, linesParts, arrowFiller.lineArrows);
	
	                if (extensions.OES_standard_derivatives) {
	                    isDirty = isDirty || scene.curveArrows.set(gl, options.styles, defaultAdder, curves, curvesParts, arrowFiller.curveArrows);
	
	                    isDirty = isDirty || scene.circleArrows.set(gl, options.styles, defaultAdder, circles, circlesParts, arrowFiller.circleArrows);
	                }
	            }
	
	            return isDirty;
	        };
	
	        while (tryInitPrimitives()) {} //loop until they are not dirty
	        set_end();
	    };
	
	    this.update = function (element, attribute, data) {
	        if (!gl) return;
	        scene[element].update(gl, attribute, data, function (style) {
	            return {
	                set: function set(v, e, iV) {
	                    return _primitive2.default.colors(v, iV, e, e, e, e);
	                }
	            };
	        });
	    };
	
	    this.find = function (x, y, dist, nodes, edges, labels) {
	        return _this.getCurrentSpatialSearch(context).find(context, x, y, dist, view.size, nodes, edges, labels);
	    };
	
	    this.findArea = function (x1, y1, x2, y2, nodes, edges, labels) {
	        return _this.getCurrentSpatialSearch(context).findArea(context, x1, y1, x2, y2, view.size, nodes, edges, labels);
	    };
	
	    this.updateNode = function (n, i) {
	        _this.nodes[i] = n;
	
	        if (spatialSearch) spatialSearch.update(context, 'nodes', i, n);
	
	        if (!gl) return;
	
	        (_this.nodes[0].color ? scene.nodesColored : scene.nodes).updateEl(gl, n, i, nodesFiller);
	        scene.labels && scene.labels.updateEl(gl, n, i, labelsFiller);
	        scene.labelsOutline && scene.labelsOutline.updateEl(gl, n, i, labelsFiller);
	    };
	
	    this.updateEdge = function (e, i) {
	        var t = edgeTypes[i];
	        var pos = edgePoses[i];
	
	        t.d[pos] = _this.edges[i] = e;
	
	        if (spatialSearch) spatialSearch.update(context, t.k, pos, e);
	
	        if (!gl) return;
	
	        scene[t.k].updateEl(gl, e, pos, edgesFiller[t.k]);
	        if (edgeStyle.arrow) scene[t.kArrow].updateEl(gl, e, pos, arrowFiller[t.kArrow]);
	    };
	
	    var removedNodes = 0;
	    var removedEdges = 0;
	
	    var freenode = { x: -1, y: -1, title: "" };
	    this.removeNodeAtPos = function (pos) {
	        if (_this.nodes[pos] === freenode) {
	            return;
	        }
	
	        removedNodes++;
	        _this.updateNode(freenode, pos);
	    };
	
	    var freeedge = { source: { x: -1, y: -1 }, target: { x: -1, y: -1 } };
	    this.removeEdgeAtPos = function (pos) {
	        if (_this.edges[pos] === freeedge) {
	            return;
	        }
	
	        removedEdges++;
	
	        _this.updateEdge(freeedge, pos);
	    };
	
	    this.getVisibleNodes = function () {
	        if (removedNodes <= 0) return _this.nodes;
	
	        var r = [];
	        _this.nodes.forEach(function (n) {
	            if (n !== freenode) r.push(n);
	        });
	        return r;
	    };
	
	    this.getVisibleEdges = function () {
	        if (removedEdges <= 0) return _this.edges;
	
	        var r = [];
	        _this.edges.forEach(function (n) {
	            if (n !== freeedge) r.push(n);
	        });
	        return r;
	    };
	
	    this.cntShownNodes = function () {
	        return _this.nodes.length - removedNodes;
	    };
	
	    this.cntShownEdges = function () {
	        return _this.edges.length - removedEdges;
	    };
	
	    var getEdgeStyleSize = function getEdgeStyleSize(c) {
	        return c.width / 120;
	        /*      let avsize = (c.width + c.height)/2;
	              let koef = (Math.min(Math.max((avsize - 150)/150, 0),1)+1)*1.3;
	              //koef 1 for 150 size and 1.4 for 300 size
	              return c.width/(130*koef);
	        */
	    };
	
	    var stylesTransl = {
	        'line': 0,
	        'dashed': 1,
	        'chain-dotted': 2,
	        'dotted': 3
	    };
	    var getEdgeType = function getEdgeType(t) {
	        if (t !== undefined) {
	            t = stylesTransl[t];
	        }
	
	        if (t === undefined || typeof t !== 'number') {
	            t = 0;
	        }
	
	        return t;
	    };
	
	    this.nodes = [];
	    this.edges = [];
	
	    var extensions = gl ? _gl2.default.initExtensions(gl, "OES_standard_derivatives") : {};
	    var scene = this.scene = createScene.call(this);
	
	    var loadCalled = false;
	    if (!gl) {
	        options.onLoad && !loadCalled && (loadCalled = true) && options.onLoad();return this;
	    };
	
	    var getLabelType = function getLabelType(f) {
	        if (texts.isSDF(f)) return 1;
	        return 0;
	    };
	
	    var fsColorTexture = ["precision mediump float;", "uniform vec4 color;", "uniform sampler2D texture;", "varying vec2 tc;", "void main(void) {", "   gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));", "}"];
	
	    var fsLabelTexture = ["precision mediump float;", "uniform lowp sampler2D texture;", "uniform mediump vec4 color;", "uniform mediump float height_font;", "uniform float type;", "uniform float buffer;", "uniform float boldness;", "float gamma = 4.0 * 1.4142 * boldness / height_font;", "varying mediump vec2 tc;", "void main() {", "  if(type > 0.5){", //SDF
	    "    float tx=texture2D(texture, tc).a;", "    float a= smoothstep(buffer - gamma, buffer + gamma, tx);", "    gl_FragColor=vec4(color.rgb, a*color.a);", "  }else{", //NORMAL FONT
	    "    gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));", "  }", "}"];
	
	    var fsVarColorTexture = ["precision mediump float;", "uniform sampler2D texture;", "varying vec2 tc;", "varying vec4 c;", "void main(void) {", "   gl_FragColor = c * texture2D(texture, vec2(tc.s, tc.t));", "}"];
	
	    var lineTypes = ["   if(type >= 2.5){", //3.0 dotted
	    "      part = fract(part*3.0);", "      if(part < 0.5) discard;", "   }else if(type >= 1.5){", //2.0 - chain dotted
	    "      if(part < 0.15) discard;", "      if(part > 0.30 && part < 0.45) discard;", "   }else if(type >= 0.5){", //1.0 - dashed
	    "      if(part < 0.5) discard;", "   }"];
	    var fsCurve = ["#extension GL_OES_standard_derivatives : enable", "#ifdef GL_ES", "precision highp float;", "#endif", "uniform float width;", "uniform vec4 color;", "uniform float type;", "uniform float lineStepSize;", "uniform float lineSize;", "varying vec2 c;", "varying vec2 v_lengthSoFar;", "void main(void) {", "   float part = abs(fract(length(v_lengthSoFar)*lineStepSize*lineSize));"].concat(lineTypes).concat(["   vec2 px = dFdx(c);", "   vec2 py = dFdy(c);", "   float fx = 2.0 * c.x * px.x - px.y;", "   float fy = 2.0 * c.y * py.x - py.y;", "   float sd = (c.x * c.x - c.y) / sqrt(fx * fx + fy * fy);", "   float alpha = 1.0 - abs(sd) / width;", "   if (alpha < 0.0) discard;", "   gl_FragColor = vec4(color.r, color.g, color.b, min(alpha, 1.0));", "}"]);
	
	    var getShiftFuncs = ["attribute vec2 curveShift;", "vec4 getShiftCurve(void) {", "   vec2 shiftN = vec2(curveShift.x, aspect2 * curveShift.y);", "   float length = length(screen * shiftN);", "   return vec4(exc * (length == 0.0 ? vec2(0, 0) : shiftN * 0.5 / length), 0, 0);", "}", "attribute vec2 circleShift;", "vec4 getShiftCircle(void) {", "   return vec4(size*circleShift,0,0);", "}"];
	
	    scene.add("lines", new _primitive2.default(gl, edgeStyle, null, ["precision mediump float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 lengthSoFar;", "uniform float exc;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform vec2 width;", "uniform mat4 transform;", "varying vec2 n;", "varying vec2 v_lengthSoFar;"].concat(getShiftFuncs).concat(["void main(void) {", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);", "   vec4 p = transform*vec4(lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x, p.y/aspect);", "   n = normal;", "}"]), ["precision mediump float;", "uniform float type;", "uniform vec4 color;", "varying vec2 n;", "varying vec2 v_lengthSoFar;", "uniform float lineSize;", "void main(void) {", "   float part = abs(fract(length(v_lengthSoFar)*lineSize*5.0));"].concat(lineTypes).concat(["   gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));", "}"]), function (c) {
	        var uniforms = c.shader.uniforms;
	        uniforms.exc && gl.uniform1f(uniforms.exc, c.curveExc);
	        gl.uniform2f(uniforms.screen, c.width, c.height);
	        var size = 2.5 * c.nodeSize;
	        uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
	        gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
	        gl.uniform1f(uniforms.aspect2, c.aspect2);
	        gl.uniform1f(uniforms.aspect, c.aspect);
	        gl.uniform2f(uniforms.width, c.style.width / c.width, c.style.width / c.height);
	        gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
	        _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
	    }));
	
	    if (extensions.OES_standard_derivatives) {
	        scene.add("curves", new _primitive2.default(gl, edgeStyle, null, ["precision highp float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 curve;", "attribute vec2 lengthSoFar;", "uniform vec2 size;", "uniform float exc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform mat4 transform;", "varying vec2 v_lengthSoFar;", "varying vec2 c;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 n = vec2(normal.x, aspect2 * normal.y);", "   float length = length(screen * n);", "   n = length == 0.0 ? vec2(0, 0) : n / length;", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(exc * n, 0, 0) + transform * vec4(position, 0, 1);", "   c = curve;", "   vec4 p = transform*vec4(lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x, p.y/aspect);", "}"]), fsCurve, function (c) {
	            var uniforms = c.shader.uniforms;
	            gl.uniform1f(uniforms.width, c.style.width);
	            gl.uniform1f(uniforms.exc, c.curveExc);
	            gl.uniform2f(uniforms.screen, c.width, c.height);
	            var size = 2.5 * c.nodeSize;
	            uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
	            gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
	            gl.uniform1f(uniforms.aspect2, c.aspect2);
	            gl.uniform1f(uniforms.aspect, c.aspect);
	            gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
	            uniforms.lineStepSize && gl.uniform1f(uniforms.lineStepSize, 5);
	            _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
	        }));
	        scene.add("circles", new _primitive2.default(gl, edgeStyle, null, ["precision highp float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 curve;", "attribute vec2 lengthSoFar;", "uniform float exc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 c;", "varying vec2 v_lengthSoFar;"].concat(getShiftFuncs).concat(["void main(void) {", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(size * normal, 0, 0) + transform * vec4(position, 0, 1);", "   c = curve;", "   vec4 p = transform*vec4(size * lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x, p.y/aspect);", "}"]), fsCurve, function (c) {
	            var uniforms = c.shader.uniforms;
	            uniforms.exc && gl.uniform1f(uniforms.exc, c.curveExc);
	            gl.uniform1f(uniforms.width, c.style.width);
	            gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
	            gl.uniform2f(uniforms.screen, c.width, c.height);
	            var size = 2.5 * c.nodeSize;
	            uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
	            gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
	            gl.uniform1f(uniforms.aspect2, c.aspect2);
	            gl.uniform1f(uniforms.aspect, c.aspect);
	            uniforms.lineStepSize && gl.uniform1f(uniforms.lineStepSize, 5 / 3);
	            _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
	        }));
	    }
	
	    if (edgeStyle.arrow) {
	        var shaderparams = { attribute: { offsetMul: 1 } };
	
	        var bind = function bind(c) {
	            var size = getSize(c, c.style, getEdgesCnt(), 0.2);
	            if (!size) return true;
	
	            var uniforms = c.shader.uniforms;
	            gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
	            gl.uniform2f(uniforms.arrowsize, size, c.style.aspect * size);
	            gl.uniform1f(uniforms.exc, c.curveExc);
	            uniforms.cexc && gl.uniform1f(uniforms.cexc, 0.5 * view.size * c.curveExc);
	            if (uniforms.size) {
	                size = 2.5 * c.nodeSize;
	                uniforms.size && gl.uniform2f(uniforms.size, size / c.width, size / c.height);
	            }
	            gl.uniform2f(uniforms.screen, c.width, c.height);
	            gl.uniform1f(uniforms.aspect2, c.aspect2);
	            _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
	        };
	
	        scene.add("lineArrows", new _primitive2.default(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float exc;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = direction / length(screen * direction);", "   vec2 v = vec2(u.y, -aspect2 * u.x);", "   v = v / length(screen * v);", "   gl_Position = getShiftCurve() + getShiftCircle()  + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));
	
	        if (extensions.OES_standard_derivatives) {
	            scene.add("curveArrows", new _primitive2.default(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform float exc;", "uniform float cexc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = normalize(vec2(direction.y, -aspect2 * direction.x));", "   u = normalize(direction - cexc * u / length(screen * u));", "   u = u / length(screen * u);", "   vec2 v = vec2(u.y, -aspect2 * u.x);", "   v = v / length(screen * v);", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));
	            scene.add("circleArrows", new _primitive2.default(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float exc;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = direction;", "   vec2 v = vec2(direction.y, -direction.x);", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4((arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u) / screen, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));
	        }
	    }
	
	    scene.add("nodes", new _primitive2.default(gl, nodeStyle, null, ["attribute vec2 position;", "attribute vec2 textureCoord;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 tc;", "void main(void) {", "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"], fsColorTexture, function (c) {
	        var size = getNodeSize(c);
	        var uniforms = c.shader.uniforms;
	        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
	        _gl2.default.uniformColor(gl, uniforms.color, c.style.color);
	    }));
	    scene.add("nodesColored", new _primitive2.default(gl, nodeStyle, null, ["attribute vec2 position;", "attribute vec2 textureCoord;", "attribute vec4 color;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 tc;", "varying vec4 c;", "void main(void) {", "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "   c = color;", "}"], fsVarColorTexture, function (c) {
	        var size = getNodeSize(c);
	        var uniforms = c.shader.uniforms;
	        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
	    }));
	
	    var vsLabelsShader = ["attribute vec2 position;", "attribute vec2 relative;", "attribute vec2 textureCoord;", "uniform float offset;", "uniform vec2 scale;", "uniform float fontScale;", "uniform mat4 transform;", "varying vec2 tc;", "void main(void) {", "   gl_Position = vec4(scale * (relative*fontScale + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"];
	    var bindLabels = function bindLabels(is_outline) {
	        return function (c) {
	            if (!getNodeSize(c)) return true;
	
	            var l = c.style.label;
	            var f = l.font;
	            var uniforms = c.shader.uniforms;
	
	            gl.uniform1f(uniforms.type, getLabelType(f));
	
	            var textEngine = texts.getEngine(f);
	            textEngine.setFont(f);
	
	            var fontScale = 1.0;
	            var sdfSize = textEngine.fontSize;
	            var wantedSize = textEngine.isSDF ? getLabelSize(context, l || {}) : sdfSize;
	            if (wantedSize === 0) {
	                fontScale = 0;
	            };
	
	            var opts = {};
	            if (wantedSize && sdfSize) {
	                fontScale *= wantedSize / sdfSize;
	            }
	
	            if (is_outline && !textEngine.isSDF) //discardAll
	                fontScale = 0;
	
	            gl.uniform1f(uniforms.buffer, is_outline ? 0.25 : 192.0 / 256.0);
	            gl.uniform1f(uniforms.boldness, (f ? f.boldness : undefined) || 1.);
	            gl.uniform1f(uniforms.fontScale, fontScale);
	            gl.uniform1f(uniforms.height_font, sdfSize);
	            gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
	            gl.uniform2f(uniforms.scale, 1 / c.width, 1 / c.height);
	
	            var color = void 0;
	            if (is_outline && f) color = new _color2.default(f.outlineColor || backgroundColor);else color = c.style.color;
	            _gl2.default.uniformColor(gl, uniforms.color, color);
	        };
	    };
	    nodeStyle.label && scene.add("labelsOutline", new _primitive2.default(gl, nodeStyle, "label", vsLabelsShader, fsLabelTexture, bindLabels(true)));
	    nodeStyle.label && scene.add("labels", new _primitive2.default(gl, nodeStyle, "label", vsLabelsShader, fsLabelTexture, bindLabels(false)));
	
	    if (options.onLoad) {
	        var styles = options.styles;
	        for (var p in styles) {
	            var s = styles[p];
	
	            s.texture && textures.get(gl, s.texture, onLoad);
	            s.arrow && s.arrow.texture && textures.get(gl, s.arrow.texture);
	        }
	    }
	
	    function createScene() {
	        return {
	            elements: [],
	            add: function add(name, e) {
	                scene[name] = e;
	                scene.elements.push(e);
	            }
	        };
	    }
	};
	
	var _color = __webpack_require__(3);
	
	var _color2 = _interopRequireDefault(_color);
	
	var _gl = __webpack_require__(4);
	
	var _gl2 = _interopRequireDefault(_gl);
	
	var _primitive = __webpack_require__(5);
	
	var _primitive2 = _interopRequireDefault(_primitive);
	
	var _layout = __webpack_require__(9);
	
	var _layout2 = _interopRequireDefault(_layout);
	
	var _geomutils = __webpack_require__(20);
	
	var _geomutils2 = _interopRequireDefault(_geomutils);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _primitiveTools = __webpack_require__(8);
	
	var _spatialSearch = __webpack_require__(21);
	
	var _spatialSearch2 = _interopRequireDefault(_spatialSearch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */
	
	var Color = function Color(color) {
	    _classCallCheck(this, Color);
	
	    this.a = 1;
	
	    if (color instanceof Color) {
	        this.r = color.r;
	        this.g = color.g;
	        this.b = color.b;
	        this.a = color.a;
	    } else if (arguments.length >= 3) {
	        this.r = arguments[0];
	        this.g = arguments[1];
	        this.b = arguments[2];
	        arguments.length > 3 && (this.a = arguments[3]);
	    } else if (/^rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)$/i.test(color)) {
	        color = /^rgba\((\d+), ?(\d+), ?(\d+), ?(\d+)\)$/i.exec(color);
	        var get = function get(v) {
	            return parseInt(v, 10) / 255;
	        };
	
	        this.r = get(color[1]);
	        this.g = get(color[2]);
	        this.b = get(color[3]);
	        this.a = get(color[4]);
	    } else if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(color)) {
	        color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(color);
	        var _get = function _get(v) {
	            return parseInt(v, 10) / 255;
	        };
	
	        this.r = _get(color[1]);
	        this.g = _get(color[2]);
	        this.b = _get(color[3]);
	    } else if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(color)) {
	        color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(color);
	        var _get2 = function _get2(v) {
	            return parseInt(v, 10) / 100;
	        };
	
	        this.r = _get2(color[1]);
	        this.g = _get2(color[2]);
	        this.b = _get2(color[3]);
	    } else if (/^\#([0-9a-f]{6})$/i.test(color)) {
	        color = parseInt(color.substring(1), 16);
	        this.r = (color >> 16 & 255) / 255;
	        this.g = (color >> 8 & 255) / 255;
	        this.b = (color & 255) / 255;
	    } else {
	        this.r = this.g = this.b = 0;
	    }
	};
	
	exports.default = Color;
	;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */
	
	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);
	    }
	
	    _createClass(_class, null, [{
	        key: "initExtensions",
	        value: function initExtensions(gl) {
	            var extensions = gl.getSupportedExtensions();
	            var result = {};
	            for (var i = 1; i < arguments.length; i++) {
	                var e = arguments[i];
	                (result[e] = extensions.indexOf(e) >= 0) && gl.getExtension(e);
	            }
	            return result;
	        }
	    }, {
	        key: "createShader",
	        value: function createShader(gl, type, source) {
	            var result = gl.createShader(type);
	            gl.shaderSource(result, source);
	            gl.compileShader(result);
	
	            if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
	                console.log(gl.getShaderInfoLog(result));
	                return null;
	            }
	            return result;
	        }
	    }, {
	        key: "createTexture",
	        value: function createTexture(gl, img, onLoad, options) {
	            var result = gl.createTexture();
	
	            var image = new Image();
	
	            var load = function load() {
	                image.onload = null;
	                gl.bindTexture(gl.TEXTURE_2D, result);
	
	                if ((options || {}).sdf) {
	                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
	                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, image);
	                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	                } else {
	                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	                }
	
	                gl.bindTexture(gl.TEXTURE_2D, null);
	                onLoad && onLoad();
	            };
	
	            image.onload = load;
	            image.src = img;
	            image.naturalWidth && image.naturalHeight && load();
	
	            result.image = image;
	            return result;
	        }
	    }, {
	        key: "uniformColor",
	        value: function uniformColor(gl, location, color) {
	            gl.uniform4f(location, color.r, color.g, color.b, color.a);
	        }
	    }, {
	        key: "ortho",
	        value: function ortho(left, right, bottom, top, near, far) {
	            var lr = 1 / (left - right),
	                bt = 1 / (bottom - top),
	                nf = 1 / (near - far);
	
	            var result = new Float32Array(16);
	            result[0] = -2 * lr;
	            result[1] = 0;
	            result[2] = 0;
	            result[3] = 0;
	            result[4] = 0;
	            result[5] = -2 * bt;
	            result[6] = 0;
	            result[7] = 0;
	            result[8] = 0;
	            result[9] = 0;
	            result[10] = 2 * nf;
	            result[11] = 0;
	            result[12] = (left + right) * lr;
	            result[13] = (top + bottom) * bt;
	            result[14] = (far + near) * nf;
	            result[15] = 1;
	            return result;
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shader = __webpack_require__(6);
	
	var _shader2 = _interopRequireDefault(_shader);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _primitiveTools = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */
	
	var primitive = function () {
	    function primitive(gl, baseStyle, styleProperty, vs, fs, bind, shaderParams) {
	        var _this = this;
	
	        _classCallCheck(this, primitive);
	
	        var shader = new _shader2.default(gl, vs.join('\n'), fs.join('\n'), shaderParams);
	        var buffers = [];
	        var sections = [];
	
	        var sectionsByStyle = {};
	
	        var e = {};
	        var iV = void 0,
	            iI = void 0,
	            iS = 0,
	            iB = 0;
	
	        var partLength = function partLength(filler, part) {
	            if (filler.size) {
	                var n = 0;
	                part.forEach(function (p) {
	                    n += filler.size(e, p);
	                });
	                return n;
	            } else {
	                return part.length;
	            }
	            return;
	        };
	
	        var init = function init(filler, n) {
	            iV = iI = 0;
	            var max = Math.floor(primitive.maxBufferSize / filler.numVertices);
	            var nV = Math.min(max, n - (iB - iS) * max);
	            var nI = nV * filler.numIndices;
	
	            if (!e.indices || e.indices.length !== nI) {
	                e.indices = new Uint16Array(nI);
	                nV *= filler.numVertices;
	                for (var a in shader.attributes) {
	                    e[a] = new Float32Array(shader.attributes[a].size * nV);
	                }
	            }
	        };
	
	        var zerofiller = {
	            set: function set(v, iV, iI, numVertices, numIndices) {
	                var indicesarr = [v.indices, iV, iI];
	                for (var i = 0; i < numIndices; i++) {
	                    indicesarr.push(0);
	                }var verticesarr = [undefined, iV, iI];
	                for (var _i = 0; _i < numVertices; _i++) {
	                    verticesarr.push(0);
	                }for (var k in v) {
	                    if (k === 'indices') {
	                        primitive.indices.apply(_this, indicesarr);
	                    } else {
	                        verticesarr[0] = v[k];
	                        primitive.vertices.apply(_this, verticesarr);
	                    }
	                }
	            }
	        };
	
	        this.set = function (gl, styles, adder, data, parts, get) {
	            var isDirty = false;
	
	            iS = 0;
	            iB = 0;
	
	            _this._iIs = new Uint32Array(data.length);
	            _this._iVs = new Uint32Array(data.length);
	            _this._iBs = new Uint8Array(data.length);
	            _this._sizes = new Uint8Array(data.length);
	
	            var store = function store(section) {
	                var b = buffers[iB];
	                if (!b) {
	                    buffers[iB] = b = {};
	                    for (var a in e) {
	                        b[a] = gl.createBuffer();
	                    }
	                }
	                for (var _a in shader.attributes) {
	                    gl.bindBuffer(gl.ARRAY_BUFFER, b[_a]);
	                    gl.bufferData(gl.ARRAY_BUFFER, e[_a], gl.STATIC_DRAW);
	                }
	                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
	                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, e.indices, gl.STATIC_DRAW);
	                b.numIndices = iI;
	                b.numVertices = iV;
	                section.buffers.push(b);
	                iB++;
	            };
	
	            sections = [];
	            for (var p in parts) {
	                var add = function add() {
	                    sections.push(this);
	                    sectionsByStyle[this.styleName] = this;
	                };
	
	                iS = iB;
	
	                var section = {
	                    style: (0, _primitiveTools.getPartitionStyle)(styles[p], baseStyle, styleProperty),
	                    buffers: [],
	                    styleName: p
	                };
	
	                var filler = get(section.style);
	                filler.numVertices = filler.numVertices || 4;
	                filler.numIndices = filler.numIndices || 6;
	
	                var part = parts[p];
	
	                var pL = partLength(filler, part);
	                init(filler, pL);
	                var max = primitive.maxBufferSize;
	                for (var i = 0; i < part.length; i++) {
	                    var s = filler.size ? filler.size(e, part[i]) : 1;
	                    var niV = iV + s * filler.numVertices;
	                    var niI = iI + s * filler.numIndices;
	
	                    if (niV >= max) {
	                        store(section);
	                        init(filler, pL);
	                        niV = iV;
	                        niI = iI;
	                    }
	
	                    if (filler.set(e, part[i], iV, iI)) isDirty = true;
	
	                    var idx = part.idx[i];
	                    _this._iIs[idx] = iI;
	                    _this._iVs[idx] = iV;
	                    _this._iBs[idx] = iB;
	                    _this._sizes[idx] = s;
	
	                    iI = niI;
	                    iV = niV;
	                }
	                store(section);
	
	                var addSection = add.bind(section);
	
	                adder ? adder(section, addSection) : addSection();
	            }
	
	            return isDirty;
	        };
	
	        var fb = void 0;
	        this.update = function (gl, attribute, data, get) {
	            var i = 0,
	                size = shader.attributes[attribute].size;
	            sections.forEach(function (section) {
	                var filler = get(section.style);
	                filler.numVertices = filler.numVertices || 4;
	
	                section.buffers.forEach(function (e) {
	                    (!fb || fb.length !== size * e.numVertices) && (fb = new Float32Array(size * e.numVertices));
	                    for (var _iV = 0; _iV < e.numVertices; _iV += (filler.size ? filler.size(e, data[i]) : 1) * filler.numVertices) {
	                        filler.set(fb, data[i++], _iV);
	                    }gl.bindBuffer(gl.ARRAY_BUFFER, e[attribute]);
	                    gl.bufferData(gl.ARRAY_BUFFER, fb, gl.DYNAMIC_DRAW);
	                });
	            });
	        };
	
	        this.updateEl = function (gl, el, pos, get) {
	            var storeToPos = function storeToPos(b, iV, iI) {
	                for (var a in shader.attributes) {
	                    gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
	                    gl.bufferSubData(gl.ARRAY_BUFFER, shader.attributes[a].size * iV * e[a].BYTES_PER_ELEMENT, e[a]);
	                }
	                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
	                gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, iI * e.indices.BYTES_PER_ELEMENT, e.indices);
	            };
	
	            var section = sectionsByStyle[el.style];
	
	            var filler = get(section.style);
	            filler.numVertices = filler.numVertices || 4;
	            filler.numIndices = filler.numIndices || 6;
	
	            iB = iS = 0;
	
	            var buffer = section.buffers[_this._iBs[pos]];
	            var s = filler.size ? filler.size(buffer, el) : 1;
	            var olds = _this._sizes[pos];
	            if (s > olds) {
	                console.error('Cannot set primitive to new value which has greater size (' + s + " > " + olds + ") - no enough empty space to fill in GL buffer");
	                return;
	            }
	
	            init(filler, olds);
	            filler.set(e, el, 0, 0);
	
	            for (; s < olds; s++) {
	                //zero fill empty spaces
	                zerofiller.set(e, s * filler.numVertices, s * filler.numIndices, filler.numVertices, filler.numIndices);
	            }
	
	            var iV = _this._iVs[pos];
	            var iI = _this._iIs[pos];
	            storeToPos(buffer, iV, iI);
	        };
	
	        this.draw = function (context) {
	            context.shader = shader;
	            shader.bind();
	
	            gl.uniformMatrix4fv(shader.uniforms.transform, false, context.transform);
	
	            sections.forEach(function (section) {
	                if (section.style.texture) {
	                    section.style.texture.update && section.style.texture.update();
	                    gl.activeTexture(gl.TEXTURE0);
	                    gl.bindTexture(gl.TEXTURE_2D, section.style.texture);
	                    gl.uniform1i(shader.uniforms.texture, 0);
	                }
	
	                context.style = section.style;
	                if (bind(context)) return;
	
	                section.buffers.forEach(function (e) {
	                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, e.indices);
	
	                    for (var a in shader.attributes) {
	                        var attribute = shader.attributes[a];
	                        gl.bindBuffer(gl.ARRAY_BUFFER, e[a]);
	                        gl.vertexAttribPointer(attribute.index, attribute.size, gl.FLOAT, false, 0, 0);
	                    }
	
	                    gl.drawElements(gl.TRIANGLES, e.numIndices, gl.UNSIGNED_SHORT, 0);
	                });
	            });
	
	            shader.unbind();
	        };
	    }
	
	    _createClass(primitive, null, [{
	        key: 'vertices',
	        value: function vertices(buffer, iV) {
	            for (var i = 2, j = 2 * iV, n = arguments.length; i < n; i++, j++) {
	                buffer[j] = arguments[i];
	            }
	        }
	    }, {
	        key: 'singles',
	        value: function singles(buffer, iV) {
	            for (var i = 2, j = 1 * iV, n = arguments.length; i < n; i++, j++) {
	                buffer[j] = arguments[i];
	            }
	        }
	    }, {
	        key: 'colors',
	        value: function colors(buffer, iV) {
	            for (var i = 2, j = 4 * iV, n = arguments.length; i < n; i++) {
	                var c = arguments[i];
	                buffer[j++] = c.r;
	                buffer[j++] = c.g;
	                buffer[j++] = c.b;
	                buffer[j++] = c.a;
	            }
	        }
	    }, {
	        key: 'indices',
	        value: function indices(buffer, iV, iI) {
	            for (var i = 3, j = iI, n = arguments.length; i < n; i++, j++) {
	                buffer[j] = iV + arguments[i];
	            }
	        }
	    }, {
	        key: 'quad',
	        value: function quad(buffer, iV, iI) {
	            primitive.indices(buffer, iV, iI, 0, 1, 2, 2, 3, 0);
	        }
	    }, {
	        key: 'maxBufferSize',
	        get: function get() {
	            return 65536;
	        }
	    }]);
	
	    return primitive;
	}();
	
	exports.default = primitive;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _gl = __webpack_require__(4);
	
	var _gl2 = _interopRequireDefault(_gl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */
	
	var defaultAttr = { color: 4 };
	
	var Shader = function () {
	  function Shader(gl, vs, fs, shaderParams) {
	    _classCallCheck(this, Shader);
	
	    this._gl = gl;
	    this._vs = vs;
	    this._fs = fs;
	
	    var program = this._program = gl.createProgram();
	
	    gl.attachShader(program, _gl2.default.createShader(gl, gl.VERTEX_SHADER, vs));
	    gl.attachShader(program, _gl2.default.createShader(gl, gl.FRAGMENT_SHADER, fs));
	    gl.linkProgram(program);
	
	    this.uniforms = {};
	    var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
	    for (var i = 0; i < n; i++) {
	      var name = gl.getActiveUniform(program, i).name;
	      this.uniforms[name] = gl.getUniformLocation(program, name);
	    }
	
	    var attrParams = (shaderParams || {}).attribute || {};
	
	    this.attributes = {};
	    n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
	    for (var _i = 0; _i < n; _i++) {
	      var _name = gl.getActiveAttrib(program, _i).name;
	      this.attributes[_name] = { index: _i, size: attrParams[_name] || Shader.attribute[_name] || 2 };
	    }
	  }
	
	  _createClass(Shader, [{
	    key: 'bind',
	    value: function bind() {
	      this._gl.useProgram(this._program);
	
	      var n = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES);
	      for (var i = 0; i < n; i++) {
	        this._gl.enableVertexAttribArray(i);
	      }
	    }
	  }, {
	    key: 'unbind',
	    value: function unbind() {
	      var n = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES);
	      for (var i = 0; i < n; i++) {
	        this._gl.disableVertexAttribArray(i);
	      }
	    }
	  }], [{
	    key: 'attribute',
	    get: function get() {
	      return defaultAttr;
	    }
	  }]);
	
	  return Shader;
	}();
	
	exports.default = Shader;
	;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: David Tichy, Aleš Saska
	 */
	
	var Utils = function () {
	  function Utils() {
	    _classCallCheck(this, Utils);
	  }
	
	  _createClass(Utils, null, [{
	    key: "extend",
	    value: function extend(from) {
	      for (var i = 1; i < arguments.length; i++) {
	        for (var k in arguments[i]) {
	          from[k] = arguments[i][k];
	        }
	      }
	      return from;
	    }
	  }, {
	    key: "isObject",
	    value: function isObject(obj) {
	      return obj === Object(obj);
	    }
	  }, {
	    key: "emptyObject",
	    value: function emptyObject(obj) {
	      if (!Utils.isObject(obj)) return false;
	
	      for (var k in obj) {
	        return false;
	      }return true;
	    }
	  }, {
	    key: "ajax",
	    value: function ajax(url, callback, type) {
	      var xmlhttp;
	      // compatible with IE7+, Firefox, Chrome, Opera, Safari
	      xmlhttp = new XMLHttpRequest();
	      if (type) xmlhttp.responseType = type;
	      xmlhttp.onreadystatechange = function (cbk) {
	        return function () {
	          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	            cbk(type == 'arraybuffer' ? xmlhttp.response : xmlhttp.responseText);
	          }
	        };
	      }(callback);
	      xmlhttp.open("GET", url, true);
	      xmlhttp.send();
	    }
	  }]);
	
	  return Utils;
	}();
	
	exports.default = Utils;
	;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getPartitionStyle = exports.partitionByStyle = undefined;
	
	var _color = __webpack_require__(3);
	
	var _color2 = _interopRequireDefault(_color);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function partitionByStyle(data) {
	    var parts = {};
	
	    var pN = {};
	    for (var i = 0; i < data.length; i++) {
	        var el = data[i];
	        var part = parts[el.style] = parts[el.style] || [];
	        if (part.idx === undefined) part.idx = [];
	        part.idx.push(i);
	
	        el.sI = pN[el.style] = pN[el.style] === undefined ? 0 : pN[el.style] + 1;
	
	        part.push(el);
	    }
	
	    return parts;
	}
	
	function getPartitionStyle(style, baseStyle, styleProperty) {
	    var result = {};
	
	    var copy = function copy(s) {
	        if (s) for (var p in s) {
	            result[p] = s[p];
	        }
	    };
	
	    copy(baseStyle);
	    copy(style);
	
	    if (styleProperty) {
	        copy(baseStyle[styleProperty]);
	        style && copy(style[styleProperty]);
	    }
	    result.color = result.color && new _color2.default(result.color);
	    return result;
	};
	
	exports.partitionByStyle = partitionByStyle;
	exports.getPartitionStyle = getPartitionStyle;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _force = __webpack_require__(10);
	
	var _force2 = _interopRequireDefault(_force);
	
	var _random = __webpack_require__(12);
	
	var _random2 = _interopRequireDefault(_random);
	
	var _circular = __webpack_require__(13);
	
	var _circular2 = _interopRequireDefault(_circular);
	
	var _tree = __webpack_require__(14);
	
	var _tree2 = _interopRequireDefault(_tree);
	
	var _treeT = __webpack_require__(15);
	
	var _treeT2 = _interopRequireDefault(_treeT);
	
	var _hierarchical = __webpack_require__(16);
	
	var _hierarchical2 = _interopRequireDefault(_hierarchical);
	
	var _hierarchical3 = __webpack_require__(17);
	
	var _hierarchical4 = _interopRequireDefault(_hierarchical3);
	
	var _spectral = __webpack_require__(18);
	
	var _spectral2 = _interopRequireDefault(_spectral);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */
	
	var _class = function () {
	  function _class() {
	    _classCallCheck(this, _class);
	  }
	
	  _createClass(_class, null, [{
	    key: 'normalize',
	    value: function normalize(nodes, dim) {
	      var minX = void 0,
	          minY = void 0,
	          n = nodes.length;
	
	      if (dim) {
	        minX = dim.minX;
	        minY = dim.minY;
	      } else {
	        var maxX = -Infinity;
	        var maxY = -Infinity;
	        minX = minY = Infinity;
	
	        for (var i = 0; i < n; i++) {
	          var o = nodes[i];
	          maxX = Math.max(maxX, o.x);
	          maxY = Math.max(maxY, o.y);
	          minX = Math.min(minX, o.x);
	          minY = Math.min(minY, o.y);
	        };
	
	        dim = {
	          maxX: maxX,
	          maxY: maxY,
	          minX: minX,
	          minY: minY
	        };
	      }
	
	      var scX = minX !== dim.maxX ? 1 / (dim.maxX - minX) : (minX -= 0.5, 1);
	      var scY = minY !== dim.maxY ? 1 / (dim.maxY - minY) : (minY -= 0.5, 1);
	
	      for (var _i = 0; _i < n; _i++) {
	        var _o = nodes[_i];
	        _o.x = scX * (_o.x - minX);
	        _o.y = scY * (_o.y - minY);
	      }
	
	      return dim;
	    }
	  }, {
	    key: 'force',
	    get: function get() {
	      return _force2.default;
	    }
	  }, {
	    key: 'random',
	    get: function get() {
	      return _random2.default;
	    }
	  }, {
	    key: 'circular',
	    get: function get() {
	      return _circular2.default;
	    }
	  }, {
	    key: 'tree',
	    get: function get() {
	      return _tree2.default;
	    }
	  }, {
	    key: 'tree2',
	    get: function get() {
	      return _treeT2.default;
	    }
	  }, {
	    key: 'hierarchical',
	    get: function get() {
	      return _hierarchical2.default;
	    }
	  }, {
	    key: 'hierarchical2',
	    get: function get() {
	      return _hierarchical4.default;
	    }
	  }, {
	    key: 'spectral',
	    get: function get() {
	      return _spectral2.default;
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (nodes, edges) {
	    var edgeDistance = 15,
	        edgeStrength = 1,
	        friction = 0.9,
	        charge = -30,
	        gravity = 0.4,
	        theta2 = .64,
	        size = [1, 1],
	        chargeDistance2 = Infinity;
	
	    var alpha = void 0,
	        distances = [],
	        strengths = [],
	        charges = [];
	
	    function accumulate(quad, alpha, charges) {
	        var cx = 0,
	            cy = 0;
	        quad.charge = 0;
	        if (!quad.leaf) {
	            var _nodes = quad.nodes;
	            var c = void 0,
	                n = _nodes.length;
	
	            for (var i = 0; i < n; i++) {
	                c = _nodes[i];
	                if (c == null) continue;
	                accumulate(c, alpha, charges);
	                quad.charge += c.charge;
	                cx += c.charge * c.cx;
	                cy += c.charge * c.cy;
	            }
	        }
	        if (quad.point) {
	            if (!quad.leaf) {
	                quad.point.x += Math.random() - 0.5;
	                quad.point.y += Math.random() - 0.5;
	            }
	            var k = alpha * charges[quad.point.index];
	            quad.charge += quad.pointCharge = k;
	            cx += k * quad.point.x;
	            cy += k * quad.point.y;
	        }
	        quad.cx = cx / quad.charge;
	        quad.cy = cy / quad.charge;
	    }
	
	    function repulse(node) {
	        return function (quad, x1, _, x2) {
	            if (quad.point !== node) {
	                var dx = quad.cx - node.x;
	                var dy = quad.cy - node.y;
	                var dw = x2 - x1;
	                var dn = dx * dx + dy * dy;
	
	                if (dw * dw / theta2 < dn) {
	                    if (dn < chargeDistance2) {
	                        var k = quad.charge / dn;
	                        node.px -= dx * k;
	                        node.py -= dy * k;
	                    }
	                    return true;
	                }
	
	                if (quad.point && dn && dn < chargeDistance2) {
	                    var _k = quad.pointCharge / dn;
	                    node.px -= dx * _k;
	                    node.py -= dy * _k;
	                }
	            }
	            return !quad.charge;
	        };
	    }
	
	    function step() {
	        if ((alpha *= .99) < .05) {
	            alpha = 0;
	            return true;
	        }
	
	        var q = void 0,
	            o = void 0,
	            s = void 0,
	            t = void 0,
	            l = void 0,
	            k = void 0,
	            x = void 0,
	            y = void 0;
	        var n = nodes.length;
	        var m = edges.length;
	
	        for (var i = 0; i < m; i++) {
	            o = edges[i];
	            s = o.source;
	            t = o.target;
	            x = t.x - s.x;
	            y = t.y - s.y;
	            if (l = x * x + y * y) {
	                l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
	                x *= l;
	                y *= l;
	                t.x -= x * (k = s.weight / (t.weight + s.weight));
	                t.y -= y * k;
	                s.x += x * (k = 1 - k);
	                s.y += y * k;
	            }
	        }
	
	        if (k = alpha * gravity) {
	            x = size[0] / 2;
	            y = size[1] / 2;
	
	            for (var _i = 0; _i < n; _i++) {
	                o = nodes[_i];
	                o.x += (x - o.x) * k;
	                o.y += (y - o.y) * k;
	            }
	        }
	
	        if (charge) {
	            accumulate(q = (0, _quadTree2.default)(nodes), alpha, charges);
	
	            for (var _i2 = 0; _i2 < n; _i2++) {
	                var _o = nodes[_i2];
	                !_o.fixed && q.visit(repulse(_o));
	            }
	        }
	
	        for (var _i3 = 0; _i3 < n; _i3++) {
	            o = nodes[_i3];
	            if (o.fixed) {
	                o.x = o.px;
	                o.y = o.py;
	            } else {
	                o.x -= (o.px - (o.px = o.x)) * friction;
	                o.y -= (o.py - (o.py = o.y)) * friction;
	            }
	        }
	    };
	
	    this.apply = function () {
	        var n = nodes.length;
	        var d = Math.sqrt(n);
	        var s = 0.3 / d;
	
	        for (var i = 0; i < n; i++) {
	            var o = nodes[i];
	            o.weight = 0;
	            o.x = o.x !== undefined ? o.x : s + i % d / d;
	            o.y = o.y !== undefined ? o.y : s + Math.floor(i / d) / d;
	            o.px = o.x;
	            o.py = o.y;
	            charges[i] = charge;
	        }
	
	        for (var _i4 = 0; _i4 < edges.length; _i4++) {
	            var _o2 = edges[_i4];
	            _o2.source.weight++;
	            _o2.target.weight++;
	            distances[_i4] = edgeDistance;
	            strengths[_i4] = edgeStrength;
	        }
	
	        alpha = 0.1;
	        while (!step()) {}
	
	        return true;
	    };
	};
	
	var _quadTree = __webpack_require__(11);
	
	var _quadTree2 = _interopRequireDefault(_quadTree);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	;
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (points) {
	    var d = void 0,
	        xs = void 0,
	        ys = void 0,
	        i = void 0,
	        n = void 0,
	        x1_ = void 0,
	        y1_ = void 0,
	        x2_ = void 0,
	        y2_ = void 0;
	
	    x2_ = y2_ = -(x1_ = y1_ = Infinity);
	    xs = [], ys = [];
	    n = points.length;
	
	    for (i = 0; i < n; ++i) {
	        d = points[i];
	        if (d.x < x1_) x1_ = d.x;
	        if (d.y < y1_) y1_ = d.y;
	        if (d.x > x2_) x2_ = d.x;
	        if (d.y > y2_) y2_ = d.y;
	        xs.push(d.x);
	        ys.push(d.y);
	    }
	
	    var dx = x2_ - x1_;
	    var dy = y2_ - y1_;
	    dx > dy ? y2_ = y1_ + dx : x2_ = x1_ + dy;
	
	    function create() {
	        return {
	            leaf: true,
	            nodes: [],
	            point: null,
	            x: null,
	            y: null
	        };
	    }
	
	    function visit(f, node, x1, y1, x2, y2) {
	        if (!f(node, x1, y1, x2, y2)) {
	            var sx = (x1 + x2) * 0.5;
	            var sy = (y1 + y2) * 0.5;
	            var children = node.nodes;
	
	            if (children[0]) visit(f, children[0], x1, y1, sx, sy);
	            if (children[1]) visit(f, children[1], sx, y1, x2, sy);
	            if (children[2]) visit(f, children[2], x1, sy, sx, y2);
	            if (children[3]) visit(f, children[3], sx, sy, x2, y2);
	        }
	    }
	
	    function insert(n, d, x, y, x1, y1, x2, y2) {
	        if (n.leaf) {
	            var nx = n.x;
	            var ny = n.y;
	
	            if (nx !== null) {
	                if (nx === x && ny === y) {
	                    insertChild(n, d, x, y, x1, y1, x2, y2);
	                } else {
	                    var nPoint = n.point;
	                    n.x = n.y = n.point = null;
	                    insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
	                    insertChild(n, d, x, y, x1, y1, x2, y2);
	                }
	            } else {
	                n.x = x, n.y = y, n.point = d;
	            }
	        } else {
	            insertChild(n, d, x, y, x1, y1, x2, y2);
	        }
	    }
	
	    function insertChild(n, d, x, y, x1, y1, x2, y2) {
	        var xm = (x1 + x2) * 0.5;
	        var ym = (y1 + y2) * 0.5;
	        var right = x >= xm;
	        var below = y >= ym;
	        var i = below << 1 | right;
	
	        n.leaf = false;
	        n = n.nodes[i] || (n.nodes[i] = create());
	
	        right ? x1 = xm : x2 = xm;
	        below ? y1 = ym : y2 = ym;
	        insert(n, d, x, y, x1, y1, x2, y2);
	    }
	
	    function findNode(root, x, y, x0, y0, x3, y3) {
	        var minDistance2 = Infinity;
	        var closestPoint = void 0;
	
	        (function find(node, x1, y1, x2, y2) {
	            if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;
	
	            if (point = node.point) {
	                var _point = void 0;
	                var _dx = x - node.x;
	                var _dy = y - node.y;
	                var distance2 = _dx * _dx + _dy * _dy;
	
	                if (distance2 < minDistance2) {
	                    var distance = Math.sqrt(minDistance2 = distance2);
	                    x0 = x - distance, y0 = y - distance;
	                    x3 = x + distance, y3 = y + distance;
	                    closestPoint = _point;
	                }
	            }
	
	            var children = node.nodes;
	            var xm = (x1 + x2) * .5;
	            var ym = (y1 + y2) * .5;
	            var right = x >= xm;
	            var below = y >= ym;
	
	            for (var _i = below << 1 | right, j = _i + 4; _i < j; ++_i) {
	                if (node = children[_i & 3]) switch (_i & 3) {
	                    case 0:
	                        find(node, x1, y1, xm, ym);break;
	                    case 1:
	                        find(node, xm, y1, x2, ym);break;
	                    case 2:
	                        find(node, x1, ym, xm, y2);break;
	                    case 3:
	                        find(node, xm, ym, x2, y2);break;
	                }
	            }
	        })(root, x0, y0, x3, y3);
	
	        return closestPoint;
	    }
	
	    var root = create();
	    root.visit = function (f) {
	        return visit(f, root, x1_, y1_, x2_, y2_);
	    };
	    root.find = function (x, y) {
	        return findNode(root, x, y, x1_, y1_, x2_, y2_);
	    };
	
	    for (i = 0; i < n; i++) {
	        insert(root, points[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
	    }--i;
	
	    xs = ys = points = d = null;
	
	    return root;
	};
	
	; /**
	   *  Copyright (c) 2016, Helikar Lab.
	   *  All rights reserved.
	   *
	   *  This source code is licensed under the GPLv3 License.
	   *  Author: David Tichy
	   */

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */
	
	var _class = function () {
	  function _class(nodes) {
	    _classCallCheck(this, _class);
	
	    this._nodes = nodes;
	  }
	
	  _createClass(_class, [{
	    key: "apply",
	    value: function apply() {
	      for (var i = 0, n = this._nodes.length; i < n; i++) {
	        var o = this._nodes[i];
	        o.x = Math.random();
	        o.y = Math.random();
	      }
	    }
	  }]);
	
	  return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2017, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Renato Fabbri
	 */
	
	function degrees(nodes, edges) {
	    // should return ordered nodes and their degrees - high to low
	    var degrees = Array(nodes.length).fill(0);
	    edges.forEach(function (e) {
	        degrees[e.source.index] += 1;
	        degrees[e.target.index] += 1;
	    }); // check to see if not getting double of the degree in undirected graphs
	    //getting the order of nodes from highest to lowest degrees
	    var ordered_nodes = degrees.map(function (el, i) {
	        return { index: i, value: el };
	    });
	    ordered_nodes.sort(function (a, b) {
	        return +(a.value < b.value) || +(a.value === b.value) - 1;
	    });
	    var ordered_degrees = ordered_nodes.map(function (el) {
	        return degrees[el.index];
	    });
	    return { nodes: ordered_nodes,
	        degrees: ordered_degrees };
	}
	
	var _class = function () {
	    // get degree of all nodes
	    // let user define at least: starting angle and radius and
	    // clock/cclock direction
	    // size of vertices
	    // more: a ratio of compactness for the more/less connected nodes
	    // a spiral ratio with a rotation ratio for having more than 2pi
	    // distribution of nodes when spiriling
	    // use some other ordering criterion than degree? Strength?
	    // defined by user and found as attribute of each node?
	    // random ordering, minimal crossing of edges?
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	        this._angle = 2 * Math.PI / nodes.length;
	        this.nd = 0;
	    }
	
	    _createClass(_class, [{
	        key: "apply",
	        value: function apply() {
	            console.log(this._nodes);
	            var nd = degrees(this._nodes, this._edges);
	            this.nd = nd;
	            console.log(nd);
	            var angle = this._angle;
	            var nodes = this._nodes;
	            nd.nodes.forEach(function (node, i) {
	                nodes[node.index].x = (1 + Math.cos(i * angle)) * .5;
	                nodes[node.index].y = (1 + Math.sin(i * angle)) * .5;
	                nodes[node.index].weight = nd.degrees[i];
	            });
	            console.log(this._nodes);
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2017, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Renato Fabbri
	 */
	
	function getDepth(obj) {
	    var depth = 0;
	    if (obj.children) {
	        obj.children.forEach(function (d) {
	            var tmpDepth = getDepth(d);
	            if (tmpDepth > depth) {
	                depth = tmpDepth;
	            }
	        });
	    }
	    return 1 + depth;
	}
	
	var _class = function () {
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	    }
	
	    _createClass(_class, [{
	        key: "drawTreeCentered",
	        value: function drawTreeCentered(root) {
	            var visited_leafs_parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	            var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
	            root.centered = true;
	            // branch order is for now stable but unpredictable, see layouts.cri
	            var visited_leafs = 0;
	            for (var i = 0; i < root.children.length; i++) {
	                var child = root.children[i];
	                if (child.centered != true) {
	                    visited_leafs += this.drawTreeCentered(child, visited_leafs + visited_leafs_parent, layer + 1);
	                }
	            }
	            if (root.children == 0) {
	                visited_leafs++;
	            }
	            // moving to parent, position node
	            root.y = this.stepy * (visited_leafs_parent + (visited_leafs - 1) / 2) + this.alphay;
	            root.x = (layer - 1) * this.stepx + this.alphax;
	            return visited_leafs;
	        }
	    }, {
	        key: "apply",
	        value: function apply() {
	            // only one root node supported for now
	            // left-right tree by default, let user choose
	            // top-down, bottom-top, right-left in subsequent versions
	            // hierarchical layouts for non-trees (cyclical graphs) should be
	            // implemented separately for now
	            var nodes = this._nodes;
	            // make hierarchy, annotate parent(s) and children in the nodes
	            nodes.forEach(function (n, i) {
	                n.parents = [];
	                n.children = [];
	                n.centered = false;
	            });
	            this._edges.forEach(function (e, i) {
	                e.source.children.push(e.target);
	                e.target.parents.push(e.source);
	            });
	            // find the root
	            for (var i = 0; i < nodes.length; i++) {
	                if (nodes[i].parents.length == 0) {
	                    var root = nodes[i];
	                    break;
	                }
	            }
	            var depth = getDepth(root);
	            // each layer of tree x = [0+alpha,1-alpha]
	            this.alphax = .05;
	            this.stepx = (1 - 2 * this.alphax) / (depth - 1);
	            // posx = alphax + stepx*(depth-1)
	
	            // find the number of leafs to distribute nodes vertically
	            var leafs = 0;
	            nodes.forEach(function (node) {
	                if (node.children.length == 0) {
	                    leafs++;
	                }
	            });
	            // each leaf y = [0+alpha,1-alpha]
	            this.alphay = .05;
	            this.stepy = (1 - 2 * this.alphay) / (leafs - 1);
	            // posy = alphay + stepy*(leafn-1)
	
	            this.drawTreeCentered(root);
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2017, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Renato Fabbri
	 */
	
	function getDepth(obj) {
	    var depth = 0;
	    if (obj.children) {
	        obj.children.forEach(function (d) {
	            var tmpDepth = getDepth(d);
	            if (tmpDepth > depth) {
	                depth = tmpDepth;
	            }
	        });
	    }
	    return 1 + depth;
	}
	
	var _class = function () {
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	    }
	
	    _createClass(_class, [{
	        key: "drawTreeTop",
	        value: function drawTreeTop(root) {
	            var visited_leafs_parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	            var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
	            // each node is in vertically on the top of the stack of its leafs
	            root.visited = true;
	            root.x = this.alphax + this.stepx * (layer - 1);
	            root.y = 1 - (this.alphay + this.stepy * visited_leafs_parent);
	            // visit children until leafs
	            var visited_leafs = 0;
	            for (var i = 0; i < root.children.length; i++) {
	                var child = root.children[i];
	                if (child.centered != true) {
	                    visited_leafs += this.drawTreeTop(child, visited_leafs + visited_leafs_parent, layer + 1);
	                }
	            }
	            if (root.children.length == 0) {
	                visited_leafs++;
	            }
	            return visited_leafs;
	        }
	    }, {
	        key: "apply",
	        value: function apply() {
	            var nodes = this._nodes;
	            // make hierarchy, annotate parent(s) and children in the nodes
	            // this layout can be run on any graph actually
	            // for which the children might be selected e.g. for their degree
	            // draw can be decided on other measures, such as closeness centrality or clustering
	            nodes.forEach(function (n, i) {
	                n.parents = [];
	                n.children = [];
	                n.centered = false;
	            });
	            this._edges.forEach(function (e, i) {
	                e.source.children.push(e.target);
	                e.target.parents.push(e.source);
	            });
	            // find the root
	            for (var i = 0; i < nodes.length; i++) {
	                if (nodes[i].parents.length == 0) {
	                    var root = nodes[i];
	                    break;
	                }
	            }
	            var depth = getDepth(root);
	            // each layer of tree x = [0+alpha,1-alpha]
	            this.alphax = .05;
	            this.stepx = (1 - 2 * this.alphax) / (depth - 1);
	            // posx = alphax + stepx*(depth-1)
	
	            // find the number of leafs to distribute nodes vertically
	            var leafs = 0;
	            nodes.forEach(function (node) {
	                if (node.children.length == 0) {
	                    leafs++;
	                }
	            });
	            // each leaf y = [0+alpha,1-alpha]
	            this.alphay = .05;
	            this.stepy = (1 - 2 * this.alphay) / (leafs - 1);
	            // posy = alphay + stepy*(leafn-1)
	
	            // give nodes their positions
	            // plot each branch in depth first,
	            // increment y position for each leaf
	            // backtracking to go from leaf to parents
	            // and decide if parent is visited (always in tree layout)
	
	            this.drawTreeTop(root);
	            console.log(this._nodes);
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2017, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Renato Fabbri
	 */
	
	function getDepth(obj) {
	    var depth = 0;
	    if (obj.children) {
	        obj.children.forEach(function (d) {
	            var tmpDepth = getDepth(d);
	            if (tmpDepth > depth) {
	                depth = tmpDepth;
	            }
	        });
	    }
	    return 1 + depth;
	}
	
	var _class = function () {
	    // this layout should handle any digraph
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	        this.alphay = 0.05; // y margin
	        this.alphax = 0.05; // x margin
	    }
	
	    _createClass(_class, [{
	        key: "makeLayers",
	        value: function makeLayers(nodes, layer) {
	            if (nodes.length > 1) {
	                var stepy = (1 - 2 * this.alphay) / (nodes.length - 1);
	                for (var i = 0; i < nodes.length; ++i) {
	                    nodes[i].visited = true;
	                    nodes[i].layer = layer; // makes x afterwards
	                    nodes[i].y = this.alphay + i * stepy;
	                }
	            } else {
	                nodes[0].visited = true;
	                nodes[0].layer = layer; // makes x afterwards
	                nodes[0].y = 0.5;
	            }
	            var next_layer = [];
	            for (var i = 0; i < nodes.length; i++) {
	                var neighbors = nodes[i].parents.concat(nodes[i].children);
	                for (var j = 0; j < neighbors.length; j++) {
	                    if (neighbors[j].visited == false && !next_layer.includes(neighbors[j])) {
	                        next_layer.push(neighbors[j]);
	                    }
	                }
	            }
	            if (next_layer.length == 0) {
	                return layer;
	            } else {
	                return this.makeLayers(next_layer, layer + 1);
	            }
	        }
	    }, {
	        key: "apply",
	        value: function apply() {
	            // left-right tree by default, let user choose
	            // top-down, bottom-top, right-left in subsequent versions
	            // hierarchical layouts for trees (acyclic graphs) are
	            // implemented separately for now
	            var nodes = this._nodes;
	            nodes.forEach(function (n, i) {
	                n.parents = [];
	                n.children = [];
	                n.visited = false;
	            });
	            this._edges.forEach(function (e, i) {
	                e.source.children.push(e.target);
	                e.target.parents.push(e.source);
	            });
	            // find the roots:
	            // nodes defined by the user as roots OR
	            // nodes with in-degree == 0 OR
	            // nodes with greatest in-degree (or degree if undirected graph)
	            var roots = [];
	            for (var i = 0; i < nodes.length; i++) {
	                if (nodes[i].isroot == true) {
	                    // has to be on the json file of the graph
	                    roots.push(nodes[i]);
	                }
	            }
	            if (roots.length == 0) {
	                for (var i = 0; i < nodes.length; i++) {
	                    if (nodes[i].parents.length == 0) {
	                        roots.push(nodes[i]);
	                    }
	                }
	            }
	            if (roots.length == 0) {
	                // calculate max out-degree
	                var max_outdegree = 0;
	                nodes.forEach(function (node) {
	                    if (node.children.length > max_outdegree) {
	                        max_outdegree = node.children.length;
	                    }
	                });
	                // choose vertices with greatest out-degree
	                nodes.forEach(function (node) {
	                    if (node.children.length == max_outdegree) {
	                        roots.push(node);
	                    }
	                });
	            }
	            // number of layers and max number of nodes in each layer
	            // has to be found by making the layout
	            // there are two approaches to finding the nodes in each layer:
	            // 1) each layer has all the neighbors of the nodes in the previous layer
	            // 2) follow links and then place non visited nodes on the layer of neighbors OR
	            // this layout implements the first of these approaches.
	            var depth = this.makeLayers(roots, 1);
	            // each layer of tree x = [0+alpha,1-alpha]
	            var stepx = (1 - 2 * this.alphax) / (depth - 1);
	            // posx = alphax + stepx*(depth-1)
	            for (var i = 0; i < this._nodes.length; ++i) {
	                this._nodes[i].x = this.alphax + stepx * (this._nodes[i].layer - 1);
	            }
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2017, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Renato Fabbri
	 */
	
	function getDepth(obj) {
	    var depth = 0;
	    if (obj.children) {
	        obj.children.forEach(function (d) {
	            var tmpDepth = getDepth(d);
	            if (tmpDepth > depth) {
	                depth = tmpDepth;
	            }
	        });
	    }
	    return 1 + depth;
	}
	
	function isOrphan(node) {
	    var orphan = true;
	    for (var i = 0; i < node.parents.length; ++i) {
	        var parent_ = node.parents[i];
	        if (parent_ != node) orphan = false;
	    }
	    for (var _i = 0; _i < node.children.length; ++_i) {
	        var child = node.parents[_i];
	        if (child != node) orphan = false;
	    }
	    return orphan;
	}
	
	var _class = function () {
	    // this layout should handle any digraph
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	        this.alphay = 0.05; // y margin
	        this.alphax = 0.05; // x margin
	        this.components = { "current_component": 0, "depth": 1 };
	        this.unvisited = nodes;
	    }
	
	    _createClass(_class, [{
	        key: "initHierarchy",
	        value: function initHierarchy() {
	            this._nodes.forEach(function (n, i) {
	                n.parents = [];
	                n.children = [];
	                n.visited = false;
	            });
	            this._edges.forEach(function (e, i) {
	                e.source.children.push(e.target);
	                e.target.parents.push(e.source);
	            });
	        }
	    }, {
	        key: "separateOrphans",
	        value: function separateOrphans() {
	            var orphans = [];
	            var nodes = [];
	            for (var i = 0; i < this._nodes.length; ++i) {
	                var node = this._nodes[i];
	                if (isOrphan(node)) orphans.push(node);else nodes.push(node);
	            }
	            return orphans;
	        }
	    }, {
	        key: "findRoots",
	        value: function findRoots(nodes) {
	            // find the roots:
	            // nodes defined by the user as roots OR
	            // nodes with in-degree == 0 OR
	            // nodes with greatest in-degree (or degree if undirected graph)
	            var roots = [];
	            for (var i = 0; i < nodes.length; i++) {
	                if (nodes[i].isroot == true) {
	                    // has to be on the json file of the graph
	                    roots.push(nodes[i]);
	                }
	            }
	            if (roots.length == 0) {
	                for (var i = 0; i < nodes.length; i++) {
	                    if (nodes[i].parents.length == 0) {
	                        roots.push(nodes[i]);
	                    }
	                }
	            }
	            if (roots.length == 0) {
	                // calculate max out-degree
	                var max_outdegree = 0;
	                nodes.forEach(function (node) {
	                    if (node.children.length > max_outdegree) {
	                        max_outdegree = node.children.length;
	                    }
	                });
	                // choose vertices with greatest out-degree
	                nodes.forEach(function (node) {
	                    if (node.children.length == max_outdegree) {
	                        roots.push(node);
	                    }
	                });
	            }
	            return roots;
	        }
	    }, {
	        key: "placeOrphans",
	        value: function placeOrphans(nodes, max_layer) {
	            var stepy = (1 - 2 * this.alphay) / (nodes.length - 1);
	            for (var i = 0; i < nodes.length; ++i) {
	                nodes[i].y = this.alphay + i * stepy;
	                nodes[i].x = max_layer + 1;
	            }
	            if (nodes.length > 0) return max_layer + 1;else return max_layer;
	        }
	    }, {
	        key: "unvisitedNodes",
	        value: function unvisitedNodes() {
	            var nodes = [];
	            var orphans = this.orphans;
	            this.unvisited.forEach(function (node) {
	                if (node.visited == false && !(node in orphans)) nodes.push(node);
	            });
	            if (nodes.length != this.unvisited) {
	                this.maybe_more = true;
	                this.unvisited = nodes;
	            } else this.maybe_more = false;
	        }
	    }, {
	        key: "placeAdditional",
	        value: function placeAdditional() {
	            // place non-visited nodes in between layers
	            var aux_layers = {};
	            var c = this.components[this.components.current_component];
	            var layers = c.layers;
	            for (var i = 0; i < this.unvisited.length; ++i) {
	                var node = this.unvisited[i];
	                var lowest_layer = this.components.depth;
	                var child_found = false;
	                for (var j = 0; j < node.children.length; ++j) {
	                    var child = node.children[j];
	                    if (child.visited == true) {
	                        child_found = true;
	                        if (child.layer <= lowest_layer) {
	                            // child has to be visited to have a layer
	                            lowest_layer = child.layer;
	                        }
	                        break;
	                    }
	                }
	                if (child_found) {
	                    node.visited = true;
	                    // node.index = lowest_layer-sep;
	                    if (!(lowest_layer - sep in layers)) layers[lowest_layer - sep] = [];
	                    layers[lowest_layer - sep].push(node);
	                } else {
	                    var lowest_layer = max_layer;
	                    var parent_found = false;
	                    for (var _j = 0; _j < node.parents.length; ++_j) {
	                        var parent_ = node.parents[_j];
	                        if (parent_.visited == true) {
	                            parent_found = true;
	                            if (parent_.layer <= lowest_layer) {
	                                // child has to be visited to have a layer
	                                lowest_layer = parent_.layer;
	                            }
	                        }
	                    }
	                    if (parent_found) {
	                        node.visited = true;
	                        node.x = lowest_layer + sep;
	                        if (!(lowest_layer + sep in layers)) layers[lowest_layer + sep] = [];
	                        layers[lowest_layer + sep].push(node);
	                    }
	                }
	            }
	        }
	    }, {
	        key: "initializeComponent",
	        value: function initializeComponent(component) {
	            this.components[component] = {};
	            this.components[component].max_nodes_layer = 0;
	            if (component > 0) this.components[component].index_offset = this.components[component - 1].vertical_nodes;else this.components[component].index_offset = 0;
	            this.components[component].current_layer = 1;
	            //this.components[component].layers = {"nodes": [], "layer_value": 1};
	            this.components[component].layers = {};
	            this.components[component].vertical_nodes = 0;
	        }
	    }, {
	        key: "layerNodes",
	        value: function layerNodes(nodes) {
	            if (!(this.components.current_component in this.components)) this.initializeComponent(this.components.current_component);
	            var c = this.components[this.components.current_component];
	            if (nodes.length > c.vertical_nodes) c.vertical_nodes = nodes.length;
	            c.layers[c.current_layer] = [];
	            for (var i = 0; i < nodes.length; ++i) {
	                nodes[i].visited = true;
	                c.layers[c.current_layer].push(nodes[i]);
	            }
	            var next_layer = [];
	            for (var _i2 = 0; _i2 < nodes.length; _i2++) {
	                var candidates = nodes[_i2].children;
	                for (var j = 0; j < candidates.length; j++) {
	                    if (candidates[j].visited == false && !next_layer.includes(candidates[j])) {
	                        next_layer.push(candidates[j]);
	                    }
	                }
	            }
	            if (next_layer.length > 0) {
	                c.current_layer++;
	                if (this.components.depth < c.current_layer) this.components.depth = c.current_layer;
	                this.layerNodes(next_layer);
	            }
	        }
	    }, {
	        key: "apply",
	        value: function apply() {
	            // left-right tree by default, let user choose
	            // top-down, bottom-top, right-left in subsequent versions
	            // hierarchical layouts for trees (acyclic graphs) are
	            // implemented separately for now
	
	            // number of layers and max number of nodes in each layer
	            // has to be found by making the layout
	            // there are two approaches to finding the nodes in each layer:
	            // 1) each layer has all the neighbors of the nodes in the previous layer
	            // 2) follow links and then place non visited nodes on the layer of neighbors OR
	            // this layout implements the second of these approaches.
	
	            this.initHierarchy();
	            this.orphans = this.separateOrphans();
	            this.unvisitedNodes();
	            while (this.unvisited.length > 0) {
	                var roots = this.findRoots(this.unvisited);
	                this.layerNodes(roots);
	                this.unvisitedNodes(); // update unvisited nodes
	                this.maybe_mode = true;
	                while (this.maybe_more) {
	                    this.placeAdditional(); // place additional nodes linked to this component
	                    this.unvisitedNodes(); // update unvisited nodes
	                }
	                this.components.current_component++;
	            }
	            this.components.vertical_nodes = 0;
	            for (var i = 0; i < this.components.current_component; i++) {
	                this.components.vertical_nodes += this.components[i].vertical_nodes;
	            }
	
	            // layerNodes should populate the dictionary this.components of components and aux variables:
	            // components[x] is a component, x is an integer
	            // components[x].vertical_nodes is the maximum number of nodes in a layer for the component
	            // components[x].layer[j] is the j-th layer on the component, j can be fractional
	            // components[x].index_offset is the number of nodes positioned in above components
	            // components.ncomponents is the number of components
	            // components.vertical_nodes is the sum of the max nodes in any layer of each component
	            // components.depth is the maximum number of layers
	
	            // each layer of tree xy = [0+alpha,1-alpha]
	            var stepx = (1 - 2 * this.alphax) / this.components.depth;
	            var stepy = (1 - 2 * this.alphay) / this.components.vertical_nodes;
	            for (var i = 0; i < this.components.current_component; i++) {
	                var component = this.components[i];
	                for (var layer_val in component.layers) {
	                    var layer = component.layers[layer_val];
	                    if (layer.length == 1) {
	                        var node = layer[0];
	                        node.x = this.alphax + stepx * layer_val;
	                        node.y = this.alphay + stepy * (component.index_offset + component.vertical_nodes / 2);
	                    } else {
	                        for (var k = 0; k < layer.length; ++k) {
	                            var node = layer[k];
	                            node.x = this.alphax + stepx * layer_val;
	                            node.y = this.alphay + stepy * (component.index_offset + k);
	                        }
	                    }
	                }
	            }
	            this.placeOrphans(this.orphans);
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _numeric = __webpack_require__(19);
	
	var _numeric2 = _interopRequireDefault(_numeric);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
	                                                                                                                                                                                                     *  Copyright (c) 2017, Helikar Lab.
	                                                                                                                                                                                                     *  All rights reserved.
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     *  This source code is licensed under the GPLv3 License.
	                                                                                                                                                                                                     *  Author: Renato Fabbri
	                                                                                                                                                                                                     */
	
	function create2dArray(rows, columns) {
	    return [].concat(_toConsumableArray(Array(rows).keys())).map(function (i) {
	        return Array(columns).fill(0);
	    });
	}
	
	var _class = function () {
	    // get degree of all nodes
	    // let user define at least: starting angle and radius and
	    // clock/cclock direction
	    // size of vertices
	    // more: a ratio of compactness for the more/less connected nodes
	    // a spiral ratio with a rotation ratio for having more than 2pi
	    // distribution of nodes when spiriling
	    // use some other ordering criterion than degree? Strength?
	    // defined by user and found as attribute of each node?
	    // random ordering, minimal crossing of edges?
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	    }
	
	    _createClass(_class, [{
	        key: 'apply',
	        value: function apply() {
	            var A = create2dArray(this._nodes.length, this._nodes.length);
	            // build the adjacency matrix
	            // build the diagonal of degrees
	            // subtract adjacency from degrees
	            // use eigenvectors with greatest values for x,y
	            // recipe from http://www.sfu.ca/personal/archives/richards/Pages/NAS.AJS-WDR.pdf
	            // and implemented in networkx/drawing/layout.py
	            this._nodes.forEach(function (node, i) {
	                nodes[node.index].x = .5;
	                nodes[node.index].y = .5;
	            });
	            console.log(this._nodes);
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var numeric = ( false)?(function numeric() {}):(exports);
	if(typeof global !== "undefined") { global.numeric = numeric; }
	
	numeric.version = "1.2.6";
	
	// 1. Utility functions
	numeric.bench = function bench (f,interval) {
	    var t1,t2,n,i;
	    if(typeof interval === "undefined") { interval = 15; }
	    n = 0.5;
	    t1 = new Date();
	    while(1) {
	        n*=2;
	        for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
	        while(i>0) { f(); i--; }
	        t2 = new Date();
	        if(t2-t1 > interval) break;
	    }
	    for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
	    while(i>0) { f(); i--; }
	    t2 = new Date();
	    return 1000*(3*n-1)/(t2-t1);
	}
	
	numeric._myIndexOf = (function _myIndexOf(w) {
	    var n = this.length,k;
	    for(k=0;k<n;++k) if(this[k]===w) return k;
	    return -1;
	});
	numeric.myIndexOf = (Array.prototype.indexOf)?Array.prototype.indexOf:numeric._myIndexOf;
	
	numeric.Function = Function;
	numeric.precision = 4;
	numeric.largeArray = 50;
	
	numeric.prettyPrint = function prettyPrint(x) {
	    function fmtnum(x) {
	        if(x === 0) { return '0'; }
	        if(isNaN(x)) { return 'NaN'; }
	        if(x<0) { return '-'+fmtnum(-x); }
	        if(isFinite(x)) {
	            var scale = Math.floor(Math.log(x) / Math.log(10));
	            var normalized = x / Math.pow(10,scale);
	            var basic = normalized.toPrecision(numeric.precision);
	            if(parseFloat(basic) === 10) { scale++; normalized = 1; basic = normalized.toPrecision(numeric.precision); }
	            return parseFloat(basic).toString()+'e'+scale.toString();
	        }
	        return 'Infinity';
	    }
	    var ret = [];
	    function foo(x) {
	        var k;
	        if(typeof x === "undefined") { ret.push(Array(numeric.precision+8).join(' ')); return false; }
	        if(typeof x === "string") { ret.push('"'+x+'"'); return false; }
	        if(typeof x === "boolean") { ret.push(x.toString()); return false; }
	        if(typeof x === "number") {
	            var a = fmtnum(x);
	            var b = x.toPrecision(numeric.precision);
	            var c = parseFloat(x.toString()).toString();
	            var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
	            for(k=1;k<d.length;k++) { if(d[k].length < a.length) a = d[k]; }
	            ret.push(Array(numeric.precision+8-a.length).join(' ')+a);
	            return false;
	        }
	        if(x === null) { ret.push("null"); return false; }
	        if(typeof x === "function") { 
	            ret.push(x.toString());
	            var flag = false;
	            for(k in x) { if(x.hasOwnProperty(k)) { 
	                if(flag) ret.push(',\n');
	                else ret.push('\n{');
	                flag = true; 
	                ret.push(k); 
	                ret.push(': \n'); 
	                foo(x[k]); 
	            } }
	            if(flag) ret.push('}\n');
	            return true;
	        }
	        if(x instanceof Array) {
	            if(x.length > numeric.largeArray) { ret.push('...Large Array...'); return true; }
	            var flag = false;
	            ret.push('[');
	            for(k=0;k<x.length;k++) { if(k>0) { ret.push(','); if(flag) ret.push('\n '); } flag = foo(x[k]); }
	            ret.push(']');
	            return true;
	        }
	        ret.push('{');
	        var flag = false;
	        for(k in x) { if(x.hasOwnProperty(k)) { if(flag) ret.push(',\n'); flag = true; ret.push(k); ret.push(': \n'); foo(x[k]); } }
	        ret.push('}');
	        return true;
	    }
	    foo(x);
	    return ret.join('');
	}
	
	numeric.parseDate = function parseDate(d) {
	    function foo(d) {
	        if(typeof d === 'string') { return Date.parse(d.replace(/-/g,'/')); }
	        if(!(d instanceof Array)) { throw new Error("parseDate: parameter must be arrays of strings"); }
	        var ret = [],k;
	        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
	        return ret;
	    }
	    return foo(d);
	}
	
	numeric.parseFloat = function parseFloat_(d) {
	    function foo(d) {
	        if(typeof d === 'string') { return parseFloat(d); }
	        if(!(d instanceof Array)) { throw new Error("parseFloat: parameter must be arrays of strings"); }
	        var ret = [],k;
	        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
	        return ret;
	    }
	    return foo(d);
	}
	
	numeric.parseCSV = function parseCSV(t) {
	    var foo = t.split('\n');
	    var j,k;
	    var ret = [];
	    var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
	    var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
	    var stripper = function(n) { return n.substr(0,n.length-1); }
	    var count = 0;
	    for(k=0;k<foo.length;k++) {
	      var bar = (foo[k]+",").match(pat),baz;
	      if(bar.length>0) {
	          ret[count] = [];
	          for(j=0;j<bar.length;j++) {
	              baz = stripper(bar[j]);
	              if(patnum.test(baz)) { ret[count][j] = parseFloat(baz); }
	              else ret[count][j] = baz;
	          }
	          count++;
	      }
	    }
	    return ret;
	}
	
	numeric.toCSV = function toCSV(A) {
	    var s = numeric.dim(A);
	    var i,j,m,n,row,ret;
	    m = s[0];
	    n = s[1];
	    ret = [];
	    for(i=0;i<m;i++) {
	        row = [];
	        for(j=0;j<m;j++) { row[j] = A[i][j].toString(); }
	        ret[i] = row.join(', ');
	    }
	    return ret.join('\n')+'\n';
	}
	
	numeric.getURL = function getURL(url) {
	    var client = new XMLHttpRequest();
	    client.open("GET",url,false);
	    client.send();
	    return client;
	}
	
	numeric.imageURL = function imageURL(img) {
	    function base64(A) {
	        var n = A.length, i,x,y,z,p,q,r,s;
	        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	        var ret = "";
	        for(i=0;i<n;i+=3) {
	            x = A[i];
	            y = A[i+1];
	            z = A[i+2];
	            p = x >> 2;
	            q = ((x & 3) << 4) + (y >> 4);
	            r = ((y & 15) << 2) + (z >> 6);
	            s = z & 63;
	            if(i+1>=n) { r = s = 64; }
	            else if(i+2>=n) { s = 64; }
	            ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
	            }
	        return ret;
	    }
	    function crc32Array (a,from,to) {
	        if(typeof from === "undefined") { from = 0; }
	        if(typeof to === "undefined") { to = a.length; }
	        var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
	                     0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 
	                     0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
	                     0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 
	                     0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 
	                     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 
	                     0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
	                     0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
	                     0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
	                     0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 
	                     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 
	                     0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 
	                     0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 
	                     0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 
	                     0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 
	                     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 
	                     0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 
	                     0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 
	                     0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 
	                     0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 
	                     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 
	                     0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 
	                     0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 
	                     0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 
	                     0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 
	                     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 
	                     0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 
	                     0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 
	                     0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 
	                     0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 
	                     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 
	                     0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
	     
	        var crc = -1, y = 0, n = a.length,i;
	
	        for (i = from; i < to; i++) {
	            y = (crc ^ a[i]) & 0xFF;
	            crc = (crc >>> 8) ^ table[y];
	        }
	     
	        return crc ^ (-1);
	    }
	
	    var h = img[0].length, w = img[0][0].length, s1, s2, next,k,length,a,b,i,j,adler32,crc32;
	    var stream = [
	                  137, 80, 78, 71, 13, 10, 26, 10,                           //  0: PNG signature
	                  0,0,0,13,                                                  //  8: IHDR Chunk length
	                  73, 72, 68, 82,                                            // 12: "IHDR" 
	                  (w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w&255,   // 16: Width
	                  (h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h&255,   // 20: Height
	                  8,                                                         // 24: bit depth
	                  2,                                                         // 25: RGB
	                  0,                                                         // 26: deflate
	                  0,                                                         // 27: no filter
	                  0,                                                         // 28: no interlace
	                  -1,-2,-3,-4,                                               // 29: CRC
	                  -5,-6,-7,-8,                                               // 33: IDAT Chunk length
	                  73, 68, 65, 84,                                            // 37: "IDAT"
	                  // RFC 1950 header starts here
	                  8,                                                         // 41: RFC1950 CMF
	                  29                                                         // 42: RFC1950 FLG
	                  ];
	    crc32 = crc32Array(stream,12,29);
	    stream[29] = (crc32>>24)&255;
	    stream[30] = (crc32>>16)&255;
	    stream[31] = (crc32>>8)&255;
	    stream[32] = (crc32)&255;
	    s1 = 1;
	    s2 = 0;
	    for(i=0;i<h;i++) {
	        if(i<h-1) { stream.push(0); }
	        else { stream.push(1); }
	        a = (3*w+1+(i===0))&255; b = ((3*w+1+(i===0))>>8)&255;
	        stream.push(a); stream.push(b);
	        stream.push((~a)&255); stream.push((~b)&255);
	        if(i===0) stream.push(0);
	        for(j=0;j<w;j++) {
	            for(k=0;k<3;k++) {
	                a = img[k][i][j];
	                if(a>255) a = 255;
	                else if(a<0) a=0;
	                else a = Math.round(a);
	                s1 = (s1 + a )%65521;
	                s2 = (s2 + s1)%65521;
	                stream.push(a);
	            }
	        }
	        stream.push(0);
	    }
	    adler32 = (s2<<16)+s1;
	    stream.push((adler32>>24)&255);
	    stream.push((adler32>>16)&255);
	    stream.push((adler32>>8)&255);
	    stream.push((adler32)&255);
	    length = stream.length - 41;
	    stream[33] = (length>>24)&255;
	    stream[34] = (length>>16)&255;
	    stream[35] = (length>>8)&255;
	    stream[36] = (length)&255;
	    crc32 = crc32Array(stream,37);
	    stream.push((crc32>>24)&255);
	    stream.push((crc32>>16)&255);
	    stream.push((crc32>>8)&255);
	    stream.push((crc32)&255);
	    stream.push(0);
	    stream.push(0);
	    stream.push(0);
	    stream.push(0);
	//    a = stream.length;
	    stream.push(73);  // I
	    stream.push(69);  // E
	    stream.push(78);  // N
	    stream.push(68);  // D
	    stream.push(174); // CRC1
	    stream.push(66);  // CRC2
	    stream.push(96);  // CRC3
	    stream.push(130); // CRC4
	    return 'data:image/png;base64,'+base64(stream);
	}
	
	// 2. Linear algebra with Arrays.
	numeric._dim = function _dim(x) {
	    var ret = [];
	    while(typeof x === "object") { ret.push(x.length); x = x[0]; }
	    return ret;
	}
	
	numeric.dim = function dim(x) {
	    var y,z;
	    if(typeof x === "object") {
	        y = x[0];
	        if(typeof y === "object") {
	            z = y[0];
	            if(typeof z === "object") {
	                return numeric._dim(x);
	            }
	            return [x.length,y.length];
	        }
	        return [x.length];
	    }
	    return [];
	}
	
	numeric.mapreduce = function mapreduce(body,init) {
	    return Function('x','accum','_s','_k',
	            'if(typeof accum === "undefined") accum = '+init+';\n'+
	            'if(typeof x === "number") { var xi = x; '+body+'; return accum; }\n'+
	            'if(typeof _s === "undefined") _s = numeric.dim(x);\n'+
	            'if(typeof _k === "undefined") _k = 0;\n'+
	            'var _n = _s[_k];\n'+
	            'var i,xi;\n'+
	            'if(_k < _s.length-1) {\n'+
	            '    for(i=_n-1;i>=0;i--) {\n'+
	            '        accum = arguments.callee(x[i],accum,_s,_k+1);\n'+
	            '    }'+
	            '    return accum;\n'+
	            '}\n'+
	            'for(i=_n-1;i>=1;i-=2) { \n'+
	            '    xi = x[i];\n'+
	            '    '+body+';\n'+
	            '    xi = x[i-1];\n'+
	            '    '+body+';\n'+
	            '}\n'+
	            'if(i === 0) {\n'+
	            '    xi = x[i];\n'+
	            '    '+body+'\n'+
	            '}\n'+
	            'return accum;'
	            );
	}
	numeric.mapreduce2 = function mapreduce2(body,setup) {
	    return Function('x',
	            'var n = x.length;\n'+
	            'var i,xi;\n'+setup+';\n'+
	            'for(i=n-1;i!==-1;--i) { \n'+
	            '    xi = x[i];\n'+
	            '    '+body+';\n'+
	            '}\n'+
	            'return accum;'
	            );
	}
	
	
	numeric.same = function same(x,y) {
	    var i,n;
	    if(!(x instanceof Array) || !(y instanceof Array)) { return false; }
	    n = x.length;
	    if(n !== y.length) { return false; }
	    for(i=0;i<n;i++) {
	        if(x[i] === y[i]) { continue; }
	        if(typeof x[i] === "object") { if(!same(x[i],y[i])) return false; }
	        else { return false; }
	    }
	    return true;
	}
	
	numeric.rep = function rep(s,v,k) {
	    if(typeof k === "undefined") { k=0; }
	    var n = s[k], ret = Array(n), i;
	    if(k === s.length-1) {
	        for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
	        if(i===-1) { ret[0] = v; }
	        return ret;
	    }
	    for(i=n-1;i>=0;i--) { ret[i] = numeric.rep(s,v,k+1); }
	    return ret;
	}
	
	
	numeric.dotMMsmall = function dotMMsmall(x,y) {
	    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
	    p = x.length; q = y.length; r = y[0].length;
	    ret = Array(p);
	    for(i=p-1;i>=0;i--) {
	        foo = Array(r);
	        bar = x[i];
	        for(k=r-1;k>=0;k--) {
	            woo = bar[q-1]*y[q-1][k];
	            for(j=q-2;j>=1;j-=2) {
	                i0 = j-1;
	                woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
	            }
	            if(j===0) { woo += bar[0]*y[0][k]; }
	            foo[k] = woo;
	        }
	        ret[i] = foo;
	    }
	    return ret;
	}
	numeric._getCol = function _getCol(A,j,x) {
	    var n = A.length, i;
	    for(i=n-1;i>0;--i) {
	        x[i] = A[i][j];
	        --i;
	        x[i] = A[i][j];
	    }
	    if(i===0) x[0] = A[0][j];
	}
	numeric.dotMMbig = function dotMMbig(x,y){
	    var gc = numeric._getCol, p = y.length, v = Array(p);
	    var m = x.length, n = y[0].length, A = new Array(m), xj;
	    var VV = numeric.dotVV;
	    var i,j,k,z;
	    --p;
	    --m;
	    for(i=m;i!==-1;--i) A[i] = Array(n);
	    --n;
	    for(i=n;i!==-1;--i) {
	        gc(y,i,v);
	        for(j=m;j!==-1;--j) {
	            z=0;
	            xj = x[j];
	            A[j][i] = VV(xj,v);
	        }
	    }
	    return A;
	}
	
	numeric.dotMV = function dotMV(x,y) {
	    var p = x.length, q = y.length,i;
	    var ret = Array(p), dotVV = numeric.dotVV;
	    for(i=p-1;i>=0;i--) { ret[i] = dotVV(x[i],y); }
	    return ret;
	}
	
	numeric.dotVM = function dotVM(x,y) {
	    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
	    p = x.length; q = y[0].length;
	    ret = Array(q);
	    for(k=q-1;k>=0;k--) {
	        woo = x[p-1]*y[p-1][k];
	        for(j=p-2;j>=1;j-=2) {
	            i0 = j-1;
	            woo += x[j]*y[j][k] + x[i0]*y[i0][k];
	        }
	        if(j===0) { woo += x[0]*y[0][k]; }
	        ret[k] = woo;
	    }
	    return ret;
	}
	
	numeric.dotVV = function dotVV(x,y) {
	    var i,n=x.length,i1,ret = x[n-1]*y[n-1];
	    for(i=n-2;i>=1;i-=2) {
	        i1 = i-1;
	        ret += x[i]*y[i] + x[i1]*y[i1];
	    }
	    if(i===0) { ret += x[0]*y[0]; }
	    return ret;
	}
	
	numeric.dot = function dot(x,y) {
	    var d = numeric.dim;
	    switch(d(x).length*1000+d(y).length) {
	    case 2002:
	        if(y.length < 10) return numeric.dotMMsmall(x,y);
	        else return numeric.dotMMbig(x,y);
	    case 2001: return numeric.dotMV(x,y);
	    case 1002: return numeric.dotVM(x,y);
	    case 1001: return numeric.dotVV(x,y);
	    case 1000: return numeric.mulVS(x,y);
	    case 1: return numeric.mulSV(x,y);
	    case 0: return x*y;
	    default: throw new Error('numeric.dot only works on vectors and matrices');
	    }
	}
	
	numeric.diag = function diag(d) {
	    var i,i1,j,n = d.length, A = Array(n), Ai;
	    for(i=n-1;i>=0;i--) {
	        Ai = Array(n);
	        i1 = i+2;
	        for(j=n-1;j>=i1;j-=2) {
	            Ai[j] = 0;
	            Ai[j-1] = 0;
	        }
	        if(j>i) { Ai[j] = 0; }
	        Ai[i] = d[i];
	        for(j=i-1;j>=1;j-=2) {
	            Ai[j] = 0;
	            Ai[j-1] = 0;
	        }
	        if(j===0) { Ai[0] = 0; }
	        A[i] = Ai;
	    }
	    return A;
	}
	numeric.getDiag = function(A) {
	    var n = Math.min(A.length,A[0].length),i,ret = Array(n);
	    for(i=n-1;i>=1;--i) {
	        ret[i] = A[i][i];
	        --i;
	        ret[i] = A[i][i];
	    }
	    if(i===0) {
	        ret[0] = A[0][0];
	    }
	    return ret;
	}
	
	numeric.identity = function identity(n) { return numeric.diag(numeric.rep([n],1)); }
	numeric.pointwise = function pointwise(params,body,setup) {
	    if(typeof setup === "undefined") { setup = ""; }
	    var fun = [];
	    var k;
	    var avec = /\[i\]$/,p,thevec = '';
	    var haveret = false;
	    for(k=0;k<params.length;k++) {
	        if(avec.test(params[k])) {
	            p = params[k].substring(0,params[k].length-3);
	            thevec = p;
	        } else { p = params[k]; }
	        if(p==='ret') haveret = true;
	        fun.push(p);
	    }
	    fun[params.length] = '_s';
	    fun[params.length+1] = '_k';
	    fun[params.length+2] = (
	            'if(typeof _s === "undefined") _s = numeric.dim('+thevec+');\n'+
	            'if(typeof _k === "undefined") _k = 0;\n'+
	            'var _n = _s[_k];\n'+
	            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
	            'if(_k < _s.length-1) {\n'+
	            '    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee('+params.join(',')+',_s,_k+1);\n'+
	            '    return ret;\n'+
	            '}\n'+
	            setup+'\n'+
	            'for(i=_n-1;i!==-1;--i) {\n'+
	            '    '+body+'\n'+
	            '}\n'+
	            'return ret;'
	            );
	    return Function.apply(null,fun);
	}
	numeric.pointwise2 = function pointwise2(params,body,setup) {
	    if(typeof setup === "undefined") { setup = ""; }
	    var fun = [];
	    var k;
	    var avec = /\[i\]$/,p,thevec = '';
	    var haveret = false;
	    for(k=0;k<params.length;k++) {
	        if(avec.test(params[k])) {
	            p = params[k].substring(0,params[k].length-3);
	            thevec = p;
	        } else { p = params[k]; }
	        if(p==='ret') haveret = true;
	        fun.push(p);
	    }
	    fun[params.length] = (
	            'var _n = '+thevec+'.length;\n'+
	            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
	            setup+'\n'+
	            'for(i=_n-1;i!==-1;--i) {\n'+
	            body+'\n'+
	            '}\n'+
	            'return ret;'
	            );
	    return Function.apply(null,fun);
	}
	numeric._biforeach = (function _biforeach(x,y,s,k,f) {
	    if(k === s.length-1) { f(x,y); return; }
	    var i,n=s[k];
	    for(i=n-1;i>=0;i--) { _biforeach(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
	});
	numeric._biforeach2 = (function _biforeach2(x,y,s,k,f) {
	    if(k === s.length-1) { return f(x,y); }
	    var i,n=s[k],ret = Array(n);
	    for(i=n-1;i>=0;--i) { ret[i] = _biforeach2(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
	    return ret;
	});
	numeric._foreach = (function _foreach(x,s,k,f) {
	    if(k === s.length-1) { f(x); return; }
	    var i,n=s[k];
	    for(i=n-1;i>=0;i--) { _foreach(x[i],s,k+1,f); }
	});
	numeric._foreach2 = (function _foreach2(x,s,k,f) {
	    if(k === s.length-1) { return f(x); }
	    var i,n=s[k], ret = Array(n);
	    for(i=n-1;i>=0;i--) { ret[i] = _foreach2(x[i],s,k+1,f); }
	    return ret;
	});
	
	/*numeric.anyV = numeric.mapreduce('if(xi) return true;','false');
	numeric.allV = numeric.mapreduce('if(!xi) return false;','true');
	numeric.any = function(x) { if(typeof x.length === "undefined") return x; return numeric.anyV(x); }
	numeric.all = function(x) { if(typeof x.length === "undefined") return x; return numeric.allV(x); }*/
	
	numeric.ops2 = {
	        add: '+',
	        sub: '-',
	        mul: '*',
	        div: '/',
	        mod: '%',
	        and: '&&',
	        or:  '||',
	        eq:  '===',
	        neq: '!==',
	        lt:  '<',
	        gt:  '>',
	        leq: '<=',
	        geq: '>=',
	        band: '&',
	        bor: '|',
	        bxor: '^',
	        lshift: '<<',
	        rshift: '>>',
	        rrshift: '>>>'
	};
	numeric.opseq = {
	        addeq: '+=',
	        subeq: '-=',
	        muleq: '*=',
	        diveq: '/=',
	        modeq: '%=',
	        lshifteq: '<<=',
	        rshifteq: '>>=',
	        rrshifteq: '>>>=',
	        bandeq: '&=',
	        boreq: '|=',
	        bxoreq: '^='
	};
	numeric.mathfuns = ['abs','acos','asin','atan','ceil','cos',
	                    'exp','floor','log','round','sin','sqrt','tan',
	                    'isNaN','isFinite'];
	numeric.mathfuns2 = ['atan2','pow','max','min'];
	numeric.ops1 = {
	        neg: '-',
	        not: '!',
	        bnot: '~',
	        clone: ''
	};
	numeric.mapreducers = {
	        any: ['if(xi) return true;','var accum = false;'],
	        all: ['if(!xi) return false;','var accum = true;'],
	        sum: ['accum += xi;','var accum = 0;'],
	        prod: ['accum *= xi;','var accum = 1;'],
	        norm2Squared: ['accum += xi*xi;','var accum = 0;'],
	        norminf: ['accum = max(accum,abs(xi));','var accum = 0, max = Math.max, abs = Math.abs;'],
	        norm1: ['accum += abs(xi)','var accum = 0, abs = Math.abs;'],
	        sup: ['accum = max(accum,xi);','var accum = -Infinity, max = Math.max;'],
	        inf: ['accum = min(accum,xi);','var accum = Infinity, min = Math.min;']
	};
	
	(function () {
	    var i,o;
	    for(i=0;i<numeric.mathfuns2.length;++i) {
	        o = numeric.mathfuns2[i];
	        numeric.ops2[o] = o;
	    }
	    for(i in numeric.ops2) {
	        if(numeric.ops2.hasOwnProperty(i)) {
	            o = numeric.ops2[i];
	            var code, codeeq, setup = '';
	            if(numeric.myIndexOf.call(numeric.mathfuns2,i)!==-1) {
	                setup = 'var '+o+' = Math.'+o+';\n';
	                code = function(r,x,y) { return r+' = '+o+'('+x+','+y+')'; };
	                codeeq = function(x,y) { return x+' = '+o+'('+x+','+y+')'; };
	            } else {
	                code = function(r,x,y) { return r+' = '+x+' '+o+' '+y; };
	                if(numeric.opseq.hasOwnProperty(i+'eq')) {
	                    codeeq = function(x,y) { return x+' '+o+'= '+y; };
	                } else {
	                    codeeq = function(x,y) { return x+' = '+x+' '+o+' '+y; };                    
	                }
	            }
	            numeric[i+'VV'] = numeric.pointwise2(['x[i]','y[i]'],code('ret[i]','x[i]','y[i]'),setup);
	            numeric[i+'SV'] = numeric.pointwise2(['x','y[i]'],code('ret[i]','x','y[i]'),setup);
	            numeric[i+'VS'] = numeric.pointwise2(['x[i]','y'],code('ret[i]','x[i]','y'),setup);
	            numeric[i] = Function(
	                    'var n = arguments.length, i, x = arguments[0], y;\n'+
	                    'var VV = numeric.'+i+'VV, VS = numeric.'+i+'VS, SV = numeric.'+i+'SV;\n'+
	                    'var dim = numeric.dim;\n'+
	                    'for(i=1;i!==n;++i) { \n'+
	                    '  y = arguments[i];\n'+
	                    '  if(typeof x === "object") {\n'+
	                    '      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n'+
	                    '      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n'+
	                    '  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n'+
	                    '  else '+codeeq('x','y')+'\n'+
	                    '}\nreturn x;\n');
	            numeric[o] = numeric[i];
	            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]','x[i]'], codeeq('ret[i]','x[i]'),setup);
	            numeric[i+'eqS'] = numeric.pointwise2(['ret[i]','x'], codeeq('ret[i]','x'),setup);
	            numeric[i+'eq'] = Function(
	                    'var n = arguments.length, i, x = arguments[0], y;\n'+
	                    'var V = numeric.'+i+'eqV, S = numeric.'+i+'eqS\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'for(i=1;i!==n;++i) { \n'+
	                    '  y = arguments[i];\n'+
	                    '  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n'+
	                    '  else numeric._biforeach(x,y,s,0,S);\n'+
	                    '}\nreturn x;\n');
	        }
	    }
	    for(i=0;i<numeric.mathfuns2.length;++i) {
	        o = numeric.mathfuns2[i];
	        delete numeric.ops2[o];
	    }
	    for(i=0;i<numeric.mathfuns.length;++i) {
	        o = numeric.mathfuns[i];
	        numeric.ops1[o] = o;
	    }
	    for(i in numeric.ops1) {
	        if(numeric.ops1.hasOwnProperty(i)) {
	            setup = '';
	            o = numeric.ops1[i];
	            if(numeric.myIndexOf.call(numeric.mathfuns,i)!==-1) {
	                if(Math.hasOwnProperty(o)) setup = 'var '+o+' = Math.'+o+';\n';
	            }
	            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]'],'ret[i] = '+o+'(ret[i]);',setup);
	            numeric[i+'eq'] = Function('x',
	                    'if(typeof x !== "object") return '+o+'x\n'+
	                    'var i;\n'+
	                    'var V = numeric.'+i+'eqV;\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'numeric._foreach(x,s,0,V);\n'+
	                    'return x;\n');
	            numeric[i+'V'] = numeric.pointwise2(['x[i]'],'ret[i] = '+o+'(x[i]);',setup);
	            numeric[i] = Function('x',
	                    'if(typeof x !== "object") return '+o+'(x)\n'+
	                    'var i;\n'+
	                    'var V = numeric.'+i+'V;\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'return numeric._foreach2(x,s,0,V);\n');
	        }
	    }
	    for(i=0;i<numeric.mathfuns.length;++i) {
	        o = numeric.mathfuns[i];
	        delete numeric.ops1[o];
	    }
	    for(i in numeric.mapreducers) {
	        if(numeric.mapreducers.hasOwnProperty(i)) {
	            o = numeric.mapreducers[i];
	            numeric[i+'V'] = numeric.mapreduce2(o[0],o[1]);
	            numeric[i] = Function('x','s','k',
	                    o[1]+
	                    'if(typeof x !== "object") {'+
	                    '    xi = x;\n'+
	                    o[0]+';\n'+
	                    '    return accum;\n'+
	                    '}'+
	                    'if(typeof s === "undefined") s = numeric.dim(x);\n'+
	                    'if(typeof k === "undefined") k = 0;\n'+
	                    'if(k === s.length-1) return numeric.'+i+'V(x);\n'+
	                    'var xi;\n'+
	                    'var n = x.length, i;\n'+
	                    'for(i=n-1;i!==-1;--i) {\n'+
	                    '   xi = arguments.callee(x[i]);\n'+
	                    o[0]+';\n'+
	                    '}\n'+
	                    'return accum;\n');
	        }
	    }
	}());
	
	numeric.truncVV = numeric.pointwise(['x[i]','y[i]'],'ret[i] = round(x[i]/y[i])*y[i];','var round = Math.round;');
	numeric.truncVS = numeric.pointwise(['x[i]','y'],'ret[i] = round(x[i]/y)*y;','var round = Math.round;');
	numeric.truncSV = numeric.pointwise(['x','y[i]'],'ret[i] = round(x/y[i])*y[i];','var round = Math.round;');
	numeric.trunc = function trunc(x,y) {
	    if(typeof x === "object") {
	        if(typeof y === "object") return numeric.truncVV(x,y);
	        return numeric.truncVS(x,y);
	    }
	    if (typeof y === "object") return numeric.truncSV(x,y);
	    return Math.round(x/y)*y;
	}
	
	numeric.inv = function inv(x) {
	    var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
	    var A = numeric.clone(x), Ai, Aj;
	    var I = numeric.identity(m), Ii, Ij;
	    var i,j,k,x;
	    for(j=0;j<n;++j) {
	        var i0 = -1;
	        var v0 = -1;
	        for(i=j;i!==m;++i) { k = abs(A[i][j]); if(k>v0) { i0 = i; v0 = k; } }
	        Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
	        Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
	        x = Aj[j];
	        for(k=j;k!==n;++k)    Aj[k] /= x; 
	        for(k=n-1;k!==-1;--k) Ij[k] /= x;
	        for(i=m-1;i!==-1;--i) {
	            if(i!==j) {
	                Ai = A[i];
	                Ii = I[i];
	                x = Ai[j];
	                for(k=j+1;k!==n;++k)  Ai[k] -= Aj[k]*x;
	                for(k=n-1;k>0;--k) { Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x; }
	                if(k===0) Ii[0] -= Ij[0]*x;
	            }
	        }
	    }
	    return I;
	}
	
	numeric.det = function det(x) {
	    var s = numeric.dim(x);
	    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: det() only works on square matrices'); }
	    var n = s[0], ret = 1,i,j,k,A = numeric.clone(x),Aj,Ai,alpha,temp,k1,k2,k3;
	    for(j=0;j<n-1;j++) {
	        k=j;
	        for(i=j+1;i<n;i++) { if(Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
	        if(k !== j) {
	            temp = A[k]; A[k] = A[j]; A[j] = temp;
	            ret *= -1;
	        }
	        Aj = A[j];
	        for(i=j+1;i<n;i++) {
	            Ai = A[i];
	            alpha = Ai[j]/Aj[j];
	            for(k=j+1;k<n-1;k+=2) {
	                k1 = k+1;
	                Ai[k] -= Aj[k]*alpha;
	                Ai[k1] -= Aj[k1]*alpha;
	            }
	            if(k!==n) { Ai[k] -= Aj[k]*alpha; }
	        }
	        if(Aj[j] === 0) { return 0; }
	        ret *= Aj[j];
	    }
	    return ret*A[j][j];
	}
	
	numeric.transpose = function transpose(x) {
	    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
	    for(j=0;j<n;j++) ret[j] = Array(m);
	    for(i=m-1;i>=1;i-=2) {
	        A1 = x[i];
	        A0 = x[i-1];
	        for(j=n-1;j>=1;--j) {
	            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
	            --j;
	            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
	        }
	        if(j===0) {
	            Bj = ret[0]; Bj[i] = A1[0]; Bj[i-1] = A0[0];
	        }
	    }
	    if(i===0) {
	        A0 = x[0];
	        for(j=n-1;j>=1;--j) {
	            ret[j][0] = A0[j];
	            --j;
	            ret[j][0] = A0[j];
	        }
	        if(j===0) { ret[0][0] = A0[0]; }
	    }
	    return ret;
	}
	numeric.negtranspose = function negtranspose(x) {
	    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
	    for(j=0;j<n;j++) ret[j] = Array(m);
	    for(i=m-1;i>=1;i-=2) {
	        A1 = x[i];
	        A0 = x[i-1];
	        for(j=n-1;j>=1;--j) {
	            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
	            --j;
	            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
	        }
	        if(j===0) {
	            Bj = ret[0]; Bj[i] = -A1[0]; Bj[i-1] = -A0[0];
	        }
	    }
	    if(i===0) {
	        A0 = x[0];
	        for(j=n-1;j>=1;--j) {
	            ret[j][0] = -A0[j];
	            --j;
	            ret[j][0] = -A0[j];
	        }
	        if(j===0) { ret[0][0] = -A0[0]; }
	    }
	    return ret;
	}
	
	numeric._random = function _random(s,k) {
	    var i,n=s[k],ret=Array(n), rnd;
	    if(k === s.length-1) {
	        rnd = Math.random;
	        for(i=n-1;i>=1;i-=2) {
	            ret[i] = rnd();
	            ret[i-1] = rnd();
	        }
	        if(i===0) { ret[0] = rnd(); }
	        return ret;
	    }
	    for(i=n-1;i>=0;i--) ret[i] = _random(s,k+1);
	    return ret;
	}
	numeric.random = function random(s) { return numeric._random(s,0); }
	
	numeric.norm2 = function norm2(x) { return Math.sqrt(numeric.norm2Squared(x)); }
	
	numeric.linspace = function linspace(a,b,n) {
	    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
	    if(n<2) { return n===1?[a]:[]; }
	    var i,ret = Array(n);
	    n--;
	    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
	    return ret;
	}
	
	numeric.getBlock = function getBlock(x,from,to) {
	    var s = numeric.dim(x);
	    function foo(x,k) {
	        var i,a = from[k], n = to[k]-a, ret = Array(n);
	        if(k === s.length-1) {
	            for(i=n;i>=0;i--) { ret[i] = x[i+a]; }
	            return ret;
	        }
	        for(i=n;i>=0;i--) { ret[i] = foo(x[i+a],k+1); }
	        return ret;
	    }
	    return foo(x,0);
	}
	
	numeric.setBlock = function setBlock(x,from,to,B) {
	    var s = numeric.dim(x);
	    function foo(x,y,k) {
	        var i,a = from[k], n = to[k]-a;
	        if(k === s.length-1) { for(i=n;i>=0;i--) { x[i+a] = y[i]; } }
	        for(i=n;i>=0;i--) { foo(x[i+a],y[i],k+1); }
	    }
	    foo(x,B,0);
	    return x;
	}
	
	numeric.getRange = function getRange(A,I,J) {
	    var m = I.length, n = J.length;
	    var i,j;
	    var B = Array(m), Bi, AI;
	    for(i=m-1;i!==-1;--i) {
	        B[i] = Array(n);
	        Bi = B[i];
	        AI = A[I[i]];
	        for(j=n-1;j!==-1;--j) Bi[j] = AI[J[j]];
	    }
	    return B;
	}
	
	numeric.blockMatrix = function blockMatrix(X) {
	    var s = numeric.dim(X);
	    if(s.length<4) return numeric.blockMatrix([X]);
	    var m=s[0],n=s[1],M,N,i,j,Xij;
	    M = 0; N = 0;
	    for(i=0;i<m;++i) M+=X[i][0].length;
	    for(j=0;j<n;++j) N+=X[0][j][0].length;
	    var Z = Array(M);
	    for(i=0;i<M;++i) Z[i] = Array(N);
	    var I=0,J,ZI,k,l,Xijk;
	    for(i=0;i<m;++i) {
	        J=N;
	        for(j=n-1;j!==-1;--j) {
	            Xij = X[i][j];
	            J -= Xij[0].length;
	            for(k=Xij.length-1;k!==-1;--k) {
	                Xijk = Xij[k];
	                ZI = Z[I+k];
	                for(l = Xijk.length-1;l!==-1;--l) ZI[J+l] = Xijk[l];
	            }
	        }
	        I += X[i][0].length;
	    }
	    return Z;
	}
	
	numeric.tensor = function tensor(x,y) {
	    if(typeof x === "number" || typeof y === "number") return numeric.mul(x,y);
	    var s1 = numeric.dim(x), s2 = numeric.dim(y);
	    if(s1.length !== 1 || s2.length !== 1) {
	        throw new Error('numeric: tensor product is only defined for vectors');
	    }
	    var m = s1[0], n = s2[0], A = Array(m), Ai, i,j,xi;
	    for(i=m-1;i>=0;i--) {
	        Ai = Array(n);
	        xi = x[i];
	        for(j=n-1;j>=3;--j) {
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	        }
	        while(j>=0) { Ai[j] = xi * y[j]; --j; }
	        A[i] = Ai;
	    }
	    return A;
	}
	
	// 3. The Tensor type T
	numeric.T = function T(x,y) { this.x = x; this.y = y; }
	numeric.t = function t(x,y) { return new numeric.T(x,y); }
	
	numeric.Tbinop = function Tbinop(rr,rc,cr,cc,setup) {
	    var io = numeric.indexOf;
	    if(typeof setup !== "string") {
	        var k;
	        setup = '';
	        for(k in numeric) {
	            if(numeric.hasOwnProperty(k) && (rr.indexOf(k)>=0 || rc.indexOf(k)>=0 || cr.indexOf(k)>=0 || cc.indexOf(k)>=0) && k.length>1) {
	                setup += 'var '+k+' = numeric.'+k+';\n';
	            }
	        }
	    }
	    return Function(['y'],
	            'var x = this;\n'+
	            'if(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n'+
	            setup+'\n'+
	            'if(x.y) {'+
	            '  if(y.y) {'+
	            '    return new numeric.T('+cc+');\n'+
	            '  }\n'+
	            '  return new numeric.T('+cr+');\n'+
	            '}\n'+
	            'if(y.y) {\n'+
	            '  return new numeric.T('+rc+');\n'+
	            '}\n'+
	            'return new numeric.T('+rr+');\n'
	    );
	}
	
	numeric.T.prototype.add = numeric.Tbinop(
	        'add(x.x,y.x)',
	        'add(x.x,y.x),y.y',
	        'add(x.x,y.x),x.y',
	        'add(x.x,y.x),add(x.y,y.y)');
	numeric.T.prototype.sub = numeric.Tbinop(
	        'sub(x.x,y.x)',
	        'sub(x.x,y.x),neg(y.y)',
	        'sub(x.x,y.x),x.y',
	        'sub(x.x,y.x),sub(x.y,y.y)');
	numeric.T.prototype.mul = numeric.Tbinop(
	        'mul(x.x,y.x)',
	        'mul(x.x,y.x),mul(x.x,y.y)',
	        'mul(x.x,y.x),mul(x.y,y.x)',
	        'sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))');
	
	numeric.T.prototype.reciprocal = function reciprocal() {
	    var mul = numeric.mul, div = numeric.div;
	    if(this.y) {
	        var d = numeric.add(mul(this.x,this.x),mul(this.y,this.y));
	        return new numeric.T(div(this.x,d),div(numeric.neg(this.y),d));
	    }
	    return new T(div(1,this.x));
	}
	numeric.T.prototype.div = function div(y) {
	    if(!(y instanceof numeric.T)) y = new numeric.T(y);
	    if(y.y) { return this.mul(y.reciprocal()); }
	    var div = numeric.div;
	    if(this.y) { return new numeric.T(div(this.x,y.x),div(this.y,y.x)); }
	    return new numeric.T(div(this.x,y.x));
	}
	numeric.T.prototype.dot = numeric.Tbinop(
	        'dot(x.x,y.x)',
	        'dot(x.x,y.x),dot(x.x,y.y)',
	        'dot(x.x,y.x),dot(x.y,y.x)',
	        'sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))'
	        );
	numeric.T.prototype.transpose = function transpose() {
	    var t = numeric.transpose, x = this.x, y = this.y;
	    if(y) { return new numeric.T(t(x),t(y)); }
	    return new numeric.T(t(x));
	}
	numeric.T.prototype.transjugate = function transjugate() {
	    var t = numeric.transpose, x = this.x, y = this.y;
	    if(y) { return new numeric.T(t(x),numeric.negtranspose(y)); }
	    return new numeric.T(t(x));
	}
	numeric.Tunop = function Tunop(r,c,s) {
	    if(typeof s !== "string") { s = ''; }
	    return Function(
	            'var x = this;\n'+
	            s+'\n'+
	            'if(x.y) {'+
	            '  '+c+';\n'+
	            '}\n'+
	            r+';\n'
	    );
	}
	
	numeric.T.prototype.exp = numeric.Tunop(
	        'return new numeric.T(ex)',
	        'return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))',
	        'var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;');
	numeric.T.prototype.conj = numeric.Tunop(
	        'return new numeric.T(x.x);',
	        'return new numeric.T(x.x,numeric.neg(x.y));');
	numeric.T.prototype.neg = numeric.Tunop(
	        'return new numeric.T(neg(x.x));',
	        'return new numeric.T(neg(x.x),neg(x.y));',
	        'var neg = numeric.neg;');
	numeric.T.prototype.sin = numeric.Tunop(
	        'return new numeric.T(numeric.sin(x.x))',
	        'return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));');
	numeric.T.prototype.cos = numeric.Tunop(
	        'return new numeric.T(numeric.cos(x.x))',
	        'return x.exp().add(x.neg().exp()).div(2);');
	numeric.T.prototype.abs = numeric.Tunop(
	        'return new numeric.T(numeric.abs(x.x));',
	        'return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));',
	        'var mul = numeric.mul;');
	numeric.T.prototype.log = numeric.Tunop(
	        'return new numeric.T(numeric.log(x.x));',
	        'var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\n'+
	        'return new numeric.T(numeric.log(r.x),theta.x);');
	numeric.T.prototype.norm2 = numeric.Tunop(
	        'return numeric.norm2(x.x);',
	        'var f = numeric.norm2Squared;\n'+
	        'return Math.sqrt(f(x.x)+f(x.y));');
	numeric.T.prototype.inv = function inv() {
	    var A = this;
	    if(typeof A.y === "undefined") { return new numeric.T(numeric.inv(A.x)); }
	    var n = A.x.length, i, j, k;
	    var Rx = numeric.identity(n),Ry = numeric.rep([n,n],0);
	    var Ax = numeric.clone(A.x), Ay = numeric.clone(A.y);
	    var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
	    var i,j,k,d,d1,ax,ay,bx,by,temp;
	    for(i=0;i<n;i++) {
	        ax = Ax[i][i]; ay = Ay[i][i];
	        d = ax*ax+ay*ay;
	        k = i;
	        for(j=i+1;j<n;j++) {
	            ax = Ax[j][i]; ay = Ay[j][i];
	            d1 = ax*ax+ay*ay;
	            if(d1 > d) { k=j; d = d1; }
	        }
	        if(k!==i) {
	            temp = Ax[i]; Ax[i] = Ax[k]; Ax[k] = temp;
	            temp = Ay[i]; Ay[i] = Ay[k]; Ay[k] = temp;
	            temp = Rx[i]; Rx[i] = Rx[k]; Rx[k] = temp;
	            temp = Ry[i]; Ry[i] = Ry[k]; Ry[k] = temp;
	        }
	        Aix = Ax[i]; Aiy = Ay[i];
	        Rix = Rx[i]; Riy = Ry[i];
	        ax = Aix[i]; ay = Aiy[i];
	        for(j=i+1;j<n;j++) {
	            bx = Aix[j]; by = Aiy[j];
	            Aix[j] = (bx*ax+by*ay)/d;
	            Aiy[j] = (by*ax-bx*ay)/d;
	        }
	        for(j=0;j<n;j++) {
	            bx = Rix[j]; by = Riy[j];
	            Rix[j] = (bx*ax+by*ay)/d;
	            Riy[j] = (by*ax-bx*ay)/d;
	        }
	        for(j=i+1;j<n;j++) {
	            Ajx = Ax[j]; Ajy = Ay[j];
	            Rjx = Rx[j]; Rjy = Ry[j];
	            ax = Ajx[i]; ay = Ajy[i];
	            for(k=i+1;k<n;k++) {
	                bx = Aix[k]; by = Aiy[k];
	                Ajx[k] -= bx*ax-by*ay;
	                Ajy[k] -= by*ax+bx*ay;
	            }
	            for(k=0;k<n;k++) {
	                bx = Rix[k]; by = Riy[k];
	                Rjx[k] -= bx*ax-by*ay;
	                Rjy[k] -= by*ax+bx*ay;
	            }
	        }
	    }
	    for(i=n-1;i>0;i--) {
	        Rix = Rx[i]; Riy = Ry[i];
	        for(j=i-1;j>=0;j--) {
	            Rjx = Rx[j]; Rjy = Ry[j];
	            ax = Ax[j][i]; ay = Ay[j][i];
	            for(k=n-1;k>=0;k--) {
	                bx = Rix[k]; by = Riy[k];
	                Rjx[k] -= ax*bx - ay*by;
	                Rjy[k] -= ax*by + ay*bx;
	            }
	        }
	    }
	    return new numeric.T(Rx,Ry);
	}
	numeric.T.prototype.get = function get(i) {
	    var x = this.x, y = this.y, k = 0, ik, n = i.length;
	    if(y) {
	        while(k<n) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        return new numeric.T(x,y);
	    }
	    while(k<n) {
	        ik = i[k];
	        x = x[ik];
	        k++;
	    }
	    return new numeric.T(x);
	}
	numeric.T.prototype.set = function set(i,v) {
	    var x = this.x, y = this.y, k = 0, ik, n = i.length, vx = v.x, vy = v.y;
	    if(n===0) {
	        if(vy) { this.y = vy; }
	        else if(y) { this.y = undefined; }
	        this.x = x;
	        return this;
	    }
	    if(vy) {
	        if(y) { /* ok */ }
	        else {
	            y = numeric.rep(numeric.dim(x),0);
	            this.y = y;
	        }
	        while(k<n-1) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        ik = i[k];
	        x[ik] = vx;
	        y[ik] = vy;
	        return this;
	    }
	    if(y) {
	        while(k<n-1) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        ik = i[k];
	        x[ik] = vx;
	        if(vx instanceof Array) y[ik] = numeric.rep(numeric.dim(vx),0);
	        else y[ik] = 0;
	        return this;
	    }
	    while(k<n-1) {
	        ik = i[k];
	        x = x[ik];
	        k++;
	    }
	    ik = i[k];
	    x[ik] = vx;
	    return this;
	}
	numeric.T.prototype.getRows = function getRows(i0,i1) {
	    var n = i1-i0+1, j;
	    var rx = Array(n), ry, x = this.x, y = this.y;
	    for(j=i0;j<=i1;j++) { rx[j-i0] = x[j]; }
	    if(y) {
	        ry = Array(n);
	        for(j=i0;j<=i1;j++) { ry[j-i0] = y[j]; }
	        return new numeric.T(rx,ry);
	    }
	    return new numeric.T(rx);
	}
	numeric.T.prototype.setRows = function setRows(i0,i1,A) {
	    var j;
	    var rx = this.x, ry = this.y, x = A.x, y = A.y;
	    for(j=i0;j<=i1;j++) { rx[j] = x[j-i0]; }
	    if(y) {
	        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
	        for(j=i0;j<=i1;j++) { ry[j] = y[j-i0]; }
	    } else if(ry) {
	        for(j=i0;j<=i1;j++) { ry[j] = numeric.rep([x[j-i0].length],0); }
	    }
	    return this;
	}
	numeric.T.prototype.getRow = function getRow(k) {
	    var x = this.x, y = this.y;
	    if(y) { return new numeric.T(x[k],y[k]); }
	    return new numeric.T(x[k]);
	}
	numeric.T.prototype.setRow = function setRow(i,v) {
	    var rx = this.x, ry = this.y, x = v.x, y = v.y;
	    rx[i] = x;
	    if(y) {
	        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
	        ry[i] = y;
	    } else if(ry) {
	        ry = numeric.rep([x.length],0);
	    }
	    return this;
	}
	
	numeric.T.prototype.getBlock = function getBlock(from,to) {
	    var x = this.x, y = this.y, b = numeric.getBlock;
	    if(y) { return new numeric.T(b(x,from,to),b(y,from,to)); }
	    return new numeric.T(b(x,from,to));
	}
	numeric.T.prototype.setBlock = function setBlock(from,to,A) {
	    if(!(A instanceof numeric.T)) A = new numeric.T(A);
	    var x = this.x, y = this.y, b = numeric.setBlock, Ax = A.x, Ay = A.y;
	    if(Ay) {
	        if(!y) { this.y = numeric.rep(numeric.dim(this),0); y = this.y; }
	        b(x,from,to,Ax);
	        b(y,from,to,Ay);
	        return this;
	    }
	    b(x,from,to,Ax);
	    if(y) b(y,from,to,numeric.rep(numeric.dim(Ax),0));
	}
	numeric.T.rep = function rep(s,v) {
	    var T = numeric.T;
	    if(!(v instanceof T)) v = new T(v);
	    var x = v.x, y = v.y, r = numeric.rep;
	    if(y) return new T(r(s,x),r(s,y));
	    return new T(r(s,x));
	}
	numeric.T.diag = function diag(d) {
	    if(!(d instanceof numeric.T)) d = new numeric.T(d);
	    var x = d.x, y = d.y, diag = numeric.diag;
	    if(y) return new numeric.T(diag(x),diag(y));
	    return new numeric.T(diag(x));
	}
	numeric.T.eig = function eig() {
	    if(this.y) { throw new Error('eig: not implemented for complex matrices.'); }
	    return numeric.eig(this.x);
	}
	numeric.T.identity = function identity(n) { return new numeric.T(numeric.identity(n)); }
	numeric.T.prototype.getDiag = function getDiag() {
	    var n = numeric;
	    var x = this.x, y = this.y;
	    if(y) { return new n.T(n.getDiag(x),n.getDiag(y)); }
	    return new n.T(n.getDiag(x));
	}
	
	// 4. Eigenvalues of real matrices
	
	numeric.house = function house(x) {
	    var v = numeric.clone(x);
	    var s = x[0] >= 0 ? 1 : -1;
	    var alpha = s*numeric.norm2(x);
	    v[0] += alpha;
	    var foo = numeric.norm2(v);
	    if(foo === 0) { /* this should not happen */ throw new Error('eig: internal error'); }
	    return numeric.div(v,foo);
	}
	
	numeric.toUpperHessenberg = function toUpperHessenberg(me) {
	    var s = numeric.dim(me);
	    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: toUpperHessenberg() only works on square matrices'); }
	    var m = s[0], i,j,k,x,v,A = numeric.clone(me),B,C,Ai,Ci,Q = numeric.identity(m),Qi;
	    for(j=0;j<m-2;j++) {
	        x = Array(m-j-1);
	        for(i=j+1;i<m;i++) { x[i-j-1] = A[i][j]; }
	        if(numeric.norm2(x)>0) {
	            v = numeric.house(x);
	            B = numeric.getBlock(A,[j+1,j],[m-1,m-1]);
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<m;i++) { Ai = A[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Ai[k] -= 2*Ci[k-j]; }
	            B = numeric.getBlock(A,[0,j+1],[m-1,m-1]);
	            C = numeric.tensor(numeric.dot(B,v),v);
	            for(i=0;i<m;i++) { Ai = A[i]; Ci = C[i]; for(k=j+1;k<m;k++) Ai[k] -= 2*Ci[k-j-1]; }
	            B = Array(m-j-1);
	            for(i=j+1;i<m;i++) B[i-j-1] = Q[i];
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<m;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        }
	    }
	    return {H:A, Q:Q};
	}
	
	numeric.epsilon = 2.220446049250313e-16;
	
	numeric.QRFrancis = function(H,maxiter) {
	    if(typeof maxiter === "undefined") { maxiter = 10000; }
	    H = numeric.clone(H);
	    var H0 = numeric.clone(H);
	    var s = numeric.dim(H),m=s[0],x,v,a,b,c,d,det,tr, Hloc, Q = numeric.identity(m), Qi, Hi, B, C, Ci,i,j,k,iter;
	    if(m<3) { return {Q:Q, B:[ [0,m-1] ]}; }
	    var epsilon = numeric.epsilon;
	    for(iter=0;iter<maxiter;iter++) {
	        for(j=0;j<m-1;j++) {
	            if(Math.abs(H[j+1][j]) < epsilon*(Math.abs(H[j][j])+Math.abs(H[j+1][j+1]))) {
	                var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[j,j]),maxiter);
	                var QH2 = numeric.QRFrancis(numeric.getBlock(H,[j+1,j+1],[m-1,m-1]),maxiter);
	                B = Array(j+1);
	                for(i=0;i<=j;i++) { B[i] = Q[i]; }
	                C = numeric.dot(QH1.Q,B);
	                for(i=0;i<=j;i++) { Q[i] = C[i]; }
	                B = Array(m-j-1);
	                for(i=j+1;i<m;i++) { B[i-j-1] = Q[i]; }
	                C = numeric.dot(QH2.Q,B);
	                for(i=j+1;i<m;i++) { Q[i] = C[i-j-1]; }
	                return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,j+1))};
	            }
	        }
	        a = H[m-2][m-2]; b = H[m-2][m-1];
	        c = H[m-1][m-2]; d = H[m-1][m-1];
	        tr = a+d;
	        det = (a*d-b*c);
	        Hloc = numeric.getBlock(H, [0,0], [2,2]);
	        if(tr*tr>=4*det) {
	            var s1,s2;
	            s1 = 0.5*(tr+Math.sqrt(tr*tr-4*det));
	            s2 = 0.5*(tr-Math.sqrt(tr*tr-4*det));
	            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
	                                           numeric.mul(Hloc,s1+s2)),
	                               numeric.diag(numeric.rep([3],s1*s2)));
	        } else {
	            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
	                                           numeric.mul(Hloc,tr)),
	                               numeric.diag(numeric.rep([3],det)));
	        }
	        x = [Hloc[0][0],Hloc[1][0],Hloc[2][0]];
	        v = numeric.house(x);
	        B = [H[0],H[1],H[2]];
	        C = numeric.tensor(v,numeric.dot(v,B));
	        for(i=0;i<3;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<m;k++) Hi[k] -= 2*Ci[k]; }
	        B = numeric.getBlock(H, [0,0],[m-1,2]);
	        C = numeric.tensor(numeric.dot(B,v),v);
	        for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<3;k++) Hi[k] -= 2*Ci[k]; }
	        B = [Q[0],Q[1],Q[2]];
	        C = numeric.tensor(v,numeric.dot(v,B));
	        for(i=0;i<3;i++) { Qi = Q[i]; Ci = C[i]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        var J;
	        for(j=0;j<m-2;j++) {
	            for(k=j;k<=j+1;k++) {
	                if(Math.abs(H[k+1][k]) < epsilon*(Math.abs(H[k][k])+Math.abs(H[k+1][k+1]))) {
	                    var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[k,k]),maxiter);
	                    var QH2 = numeric.QRFrancis(numeric.getBlock(H,[k+1,k+1],[m-1,m-1]),maxiter);
	                    B = Array(k+1);
	                    for(i=0;i<=k;i++) { B[i] = Q[i]; }
	                    C = numeric.dot(QH1.Q,B);
	                    for(i=0;i<=k;i++) { Q[i] = C[i]; }
	                    B = Array(m-k-1);
	                    for(i=k+1;i<m;i++) { B[i-k-1] = Q[i]; }
	                    C = numeric.dot(QH2.Q,B);
	                    for(i=k+1;i<m;i++) { Q[i] = C[i-k-1]; }
	                    return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,k+1))};
	                }
	            }
	            J = Math.min(m-1,j+3);
	            x = Array(J-j);
	            for(i=j+1;i<=J;i++) { x[i-j-1] = H[i][j]; }
	            v = numeric.house(x);
	            B = numeric.getBlock(H, [j+1,j],[J,m-1]);
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<=J;i++) { Hi = H[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Hi[k] -= 2*Ci[k-j]; }
	            B = numeric.getBlock(H, [0,j+1],[m-1,J]);
	            C = numeric.tensor(numeric.dot(B,v),v);
	            for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=j+1;k<=J;k++) Hi[k] -= 2*Ci[k-j-1]; }
	            B = Array(J-j);
	            for(i=j+1;i<=J;i++) B[i-j-1] = Q[i];
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<=J;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        }
	    }
	    throw new Error('numeric: eigenvalue iteration does not converge -- increase maxiter?');
	}
	
	numeric.eig = function eig(A,maxiter) {
	    var QH = numeric.toUpperHessenberg(A);
	    var QB = numeric.QRFrancis(QH.H,maxiter);
	    var T = numeric.T;
	    var n = A.length,i,k,flag = false,B = QB.B,H = numeric.dot(QB.Q,numeric.dot(QH.H,numeric.transpose(QB.Q)));
	    var Q = new T(numeric.dot(QB.Q,QH.Q)),Q0;
	    var m = B.length,j;
	    var a,b,c,d,p1,p2,disc,x,y,p,q,n1,n2;
	    var sqrt = Math.sqrt;
	    for(k=0;k<m;k++) {
	        i = B[k][0];
	        if(i === B[k][1]) {
	            // nothing
	        } else {
	            j = i+1;
	            a = H[i][i];
	            b = H[i][j];
	            c = H[j][i];
	            d = H[j][j];
	            if(b === 0 && c === 0) continue;
	            p1 = -a-d;
	            p2 = a*d-b*c;
	            disc = p1*p1-4*p2;
	            if(disc>=0) {
	                if(p1<0) x = -0.5*(p1-sqrt(disc));
	                else     x = -0.5*(p1+sqrt(disc));
	                n1 = (a-x)*(a-x)+b*b;
	                n2 = c*c+(d-x)*(d-x);
	                if(n1>n2) {
	                    n1 = sqrt(n1);
	                    p = (a-x)/n1;
	                    q = b/n1;
	                } else {
	                    n2 = sqrt(n2);
	                    p = c/n2;
	                    q = (d-x)/n2;
	                }
	                Q0 = new T([[q,-p],[p,q]]);
	                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
	            } else {
	                x = -0.5*p1;
	                y = 0.5*sqrt(-disc);
	                n1 = (a-x)*(a-x)+b*b;
	                n2 = c*c+(d-x)*(d-x);
	                if(n1>n2) {
	                    n1 = sqrt(n1+y*y);
	                    p = (a-x)/n1;
	                    q = b/n1;
	                    x = 0;
	                    y /= n1;
	                } else {
	                    n2 = sqrt(n2+y*y);
	                    p = c/n2;
	                    q = (d-x)/n2;
	                    x = y/n2;
	                    y = 0;
	                }
	                Q0 = new T([[q,-p],[p,q]],[[x,y],[y,-x]]);
	                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
	            }
	        }
	    }
	    var R = Q.dot(A).dot(Q.transjugate()), n = A.length, E = numeric.T.identity(n);
	    for(j=0;j<n;j++) {
	        if(j>0) {
	            for(k=j-1;k>=0;k--) {
	                var Rk = R.get([k,k]), Rj = R.get([j,j]);
	                if(numeric.neq(Rk.x,Rj.x) || numeric.neq(Rk.y,Rj.y)) {
	                    x = R.getRow(k).getBlock([k],[j-1]);
	                    y = E.getRow(j).getBlock([k],[j-1]);
	                    E.set([j,k],(R.get([k,j]).neg().sub(x.dot(y))).div(Rk.sub(Rj)));
	                } else {
	                    E.setRow(j,E.getRow(k));
	                    continue;
	                }
	            }
	        }
	    }
	    for(j=0;j<n;j++) {
	        x = E.getRow(j);
	        E.setRow(j,x.div(x.norm2()));
	    }
	    E = E.transpose();
	    E = Q.transjugate().dot(E);
	    return { lambda:R.getDiag(), E:E };
	};
	
	// 5. Compressed Column Storage matrices
	numeric.ccsSparse = function ccsSparse(A) {
	    var m = A.length,n,foo, i,j, counts = [];
	    for(i=m-1;i!==-1;--i) {
	        foo = A[i];
	        for(j in foo) {
	            j = parseInt(j);
	            while(j>=counts.length) counts[counts.length] = 0;
	            if(foo[j]!==0) counts[j]++;
	        }
	    }
	    var n = counts.length;
	    var Ai = Array(n+1);
	    Ai[0] = 0;
	    for(i=0;i<n;++i) Ai[i+1] = Ai[i] + counts[i];
	    var Aj = Array(Ai[n]), Av = Array(Ai[n]);
	    for(i=m-1;i!==-1;--i) {
	        foo = A[i];
	        for(j in foo) {
	            if(foo[j]!==0) {
	                counts[j]--;
	                Aj[Ai[j]+counts[j]] = i;
	                Av[Ai[j]+counts[j]] = foo[j];
	            }
	        }
	    }
	    return [Ai,Aj,Av];
	}
	numeric.ccsFull = function ccsFull(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2], s = numeric.ccsDim(A), m = s[0], n = s[1], i,j,j0,j1,k;
	    var B = numeric.rep([m,n],0);
	    for(i=0;i<n;i++) {
	        j0 = Ai[i];
	        j1 = Ai[i+1];
	        for(j=j0;j<j1;++j) { B[Aj[j]][i] = Av[j]; }
	    }
	    return B;
	}
	numeric.ccsTSolve = function ccsTSolve(A,b,x,bj,xj) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, max = Math.max,n=0;
	    if(typeof bj === "undefined") x = numeric.rep([m],0);
	    if(typeof bj === "undefined") bj = numeric.linspace(0,x.length-1);
	    if(typeof xj === "undefined") xj = [];
	    function dfs(j) {
	        var k;
	        if(x[j] !== 0) return;
	        x[j] = 1;
	        for(k=Ai[j];k<Ai[j+1];++k) dfs(Aj[k]);
	        xj[n] = j;
	        ++n;
	    }
	    var i,j,j0,j1,k,l,l0,l1,a;
	    for(i=bj.length-1;i!==-1;--i) { dfs(bj[i]); }
	    xj.length = n;
	    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
	    for(i=bj.length-1;i!==-1;--i) { j = bj[i]; x[j] = b[j]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        j0 = Ai[j];
	        j1 = max(Ai[j+1],j0);
	        for(k=j0;k!==j1;++k) { if(Aj[k] === j) { x[j] /= Av[k]; break; } }
	        a = x[j];
	        for(k=j0;k!==j1;++k) {
	            l = Aj[k];
	            if(l !== j) x[l] -= a*Av[k];
	        }
	    }
	    return x;
	}
	numeric.ccsDFS = function ccsDFS(n) {
	    this.k = Array(n);
	    this.k1 = Array(n);
	    this.j = Array(n);
	}
	numeric.ccsDFS.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv) {
	    var m = 0,foo,n=xj.length;
	    var k = this.k, k1 = this.k1, j = this.j,km,k11;
	    if(x[J]!==0) return;
	    x[J] = 1;
	    j[0] = J;
	    k[0] = km = Ai[J];
	    k1[0] = k11 = Ai[J+1];
	    while(1) {
	        if(km >= k11) {
	            xj[n] = j[m];
	            if(m===0) return;
	            ++n;
	            --m;
	            km = k[m];
	            k11 = k1[m];
	        } else {
	            foo = Pinv[Aj[km]];
	            if(x[foo] === 0) {
	                x[foo] = 1;
	                k[m] = km;
	                ++m;
	                j[m] = foo;
	                km = Ai[foo];
	                k1[m] = k11 = Ai[foo+1];
	            } else ++km;
	        }
	    }
	}
	numeric.ccsLPSolve = function ccsLPSolve(A,B,x,xj,I,Pinv,dfs) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    
	    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
	    i0 = Bi[I];
	    i1 = Bi[I+1];
	    xj.length = 0;
	    for(i=i0;i<i1;++i) { dfs.dfs(Pinv[Bj[i]],Ai,Aj,x,xj,Pinv); }
	    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
	    for(i=i0;i!==i1;++i) { j = Pinv[Bj[i]]; x[j] = Bv[i]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        j0 = Ai[j];
	        j1 = Ai[j+1];
	        for(k=j0;k<j1;++k) { if(Pinv[Aj[k]] === j) { x[j] /= Av[k]; break; } }
	        a = x[j];
	        for(k=j0;k<j1;++k) {
	            l = Pinv[Aj[k]];
	            if(l !== j) x[l] -= a*Av[k];
	        }
	    }
	    return x;
	}
	numeric.ccsLUP1 = function ccsLUP1(A,threshold) {
	    var m = A[0].length-1;
	    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
	    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
	    var x = numeric.rep([m],0), xj = numeric.rep([m],0);
	    var i,j,k,j0,j1,a,e,c,d,K;
	    var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
	    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
	    var dfs = new numeric.ccsDFS(m);
	    if(typeof threshold === "undefined") { threshold = 1; }
	    for(i=0;i<m;++i) {
	        sol(L,A,x,xj,i,Pinv,dfs);
	        a = -1;
	        e = -1;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            if(k <= i) continue;
	            c = abs(x[k]);
	            if(c > a) { e = k; a = c; }
	        }
	        if(abs(x[i])<threshold*a) {
	            j = P[i];
	            a = P[e];
	            P[i] = a; Pinv[a] = i;
	            P[e] = j; Pinv[j] = e;
	            a = x[i]; x[i] = x[e]; x[e] = a;
	        }
	        a = Li[i];
	        e = Ui[i];
	        d = x[i];
	        Lj[a] = P[i];
	        Lv[a] = 1;
	        ++a;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            c = x[k];
	            xj[j] = 0;
	            x[k] = 0;
	            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
	            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
	        }
	        Li[i+1] = a;
	        Ui[i+1] = e;
	    }
	    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
	    return {L:L, U:U, P:P, Pinv:Pinv};
	}
	numeric.ccsDFS0 = function ccsDFS0(n) {
	    this.k = Array(n);
	    this.k1 = Array(n);
	    this.j = Array(n);
	}
	numeric.ccsDFS0.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv,P) {
	    var m = 0,foo,n=xj.length;
	    var k = this.k, k1 = this.k1, j = this.j,km,k11;
	    if(x[J]!==0) return;
	    x[J] = 1;
	    j[0] = J;
	    k[0] = km = Ai[Pinv[J]];
	    k1[0] = k11 = Ai[Pinv[J]+1];
	    while(1) {
	        if(isNaN(km)) throw new Error("Ow!");
	        if(km >= k11) {
	            xj[n] = Pinv[j[m]];
	            if(m===0) return;
	            ++n;
	            --m;
	            km = k[m];
	            k11 = k1[m];
	        } else {
	            foo = Aj[km];
	            if(x[foo] === 0) {
	                x[foo] = 1;
	                k[m] = km;
	                ++m;
	                j[m] = foo;
	                foo = Pinv[foo];
	                km = Ai[foo];
	                k1[m] = k11 = Ai[foo+1];
	            } else ++km;
	        }
	    }
	}
	numeric.ccsLPSolve0 = function ccsLPSolve0(A,B,y,xj,I,Pinv,P,dfs) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    
	    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
	    i0 = Bi[I];
	    i1 = Bi[I+1];
	    xj.length = 0;
	    for(i=i0;i<i1;++i) { dfs.dfs(Bj[i],Ai,Aj,y,xj,Pinv,P); }
	    for(i=xj.length-1;i!==-1;--i) { j = xj[i]; y[P[j]] = 0; }
	    for(i=i0;i!==i1;++i) { j = Bj[i]; y[j] = Bv[i]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        l = P[j];
	        j0 = Ai[j];
	        j1 = Ai[j+1];
	        for(k=j0;k<j1;++k) { if(Aj[k] === l) { y[l] /= Av[k]; break; } }
	        a = y[l];
	        for(k=j0;k<j1;++k) y[Aj[k]] -= a*Av[k];
	        y[l] = a;
	    }
	}
	numeric.ccsLUP0 = function ccsLUP0(A,threshold) {
	    var m = A[0].length-1;
	    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
	    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
	    var y = numeric.rep([m],0), xj = numeric.rep([m],0);
	    var i,j,k,j0,j1,a,e,c,d,K;
	    var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
	    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
	    var dfs = new numeric.ccsDFS0(m);
	    if(typeof threshold === "undefined") { threshold = 1; }
	    for(i=0;i<m;++i) {
	        sol(L,A,y,xj,i,Pinv,P,dfs);
	        a = -1;
	        e = -1;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            if(k <= i) continue;
	            c = abs(y[P[k]]);
	            if(c > a) { e = k; a = c; }
	        }
	        if(abs(y[P[i]])<threshold*a) {
	            j = P[i];
	            a = P[e];
	            P[i] = a; Pinv[a] = i;
	            P[e] = j; Pinv[j] = e;
	        }
	        a = Li[i];
	        e = Ui[i];
	        d = y[P[i]];
	        Lj[a] = P[i];
	        Lv[a] = 1;
	        ++a;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            c = y[P[k]];
	            xj[j] = 0;
	            y[P[k]] = 0;
	            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
	            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
	        }
	        Li[i+1] = a;
	        Ui[i+1] = e;
	    }
	    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
	    return {L:L, U:U, P:P, Pinv:Pinv};
	}
	numeric.ccsLUP = numeric.ccsLUP0;
	
	numeric.ccsDim = function ccsDim(A) { return [numeric.sup(A[1])+1,A[0].length-1]; }
	numeric.ccsGetBlock = function ccsGetBlock(A,i,j) {
	    var s = numeric.ccsDim(A),m=s[0],n=s[1];
	    if(typeof i === "undefined") { i = numeric.linspace(0,m-1); }
	    else if(typeof i === "number") { i = [i]; }
	    if(typeof j === "undefined") { j = numeric.linspace(0,n-1); }
	    else if(typeof j === "number") { j = [j]; }
	    var p,p0,p1,P = i.length,q,Q = j.length,r,jq,ip;
	    var Bi = numeric.rep([n],0), Bj=[], Bv=[], B = [Bi,Bj,Bv];
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var x = numeric.rep([m],0),count=0,flags = numeric.rep([m],0);
	    for(q=0;q<Q;++q) {
	        jq = j[q];
	        var q0 = Ai[jq];
	        var q1 = Ai[jq+1];
	        for(p=q0;p<q1;++p) {
	            r = Aj[p];
	            flags[r] = 1;
	            x[r] = Av[p];
	        }
	        for(p=0;p<P;++p) {
	            ip = i[p];
	            if(flags[ip]) {
	                Bj[count] = p;
	                Bv[count] = x[i[p]];
	                ++count;
	            }
	        }
	        for(p=q0;p<q1;++p) {
	            r = Aj[p];
	            flags[r] = 0;
	        }
	        Bi[q+1] = count;
	    }
	    return B;
	}
	
	numeric.ccsDot = function ccsDot(A,B) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    var sA = numeric.ccsDim(A), sB = numeric.ccsDim(B);
	    var m = sA[0], n = sA[1], o = sB[1];
	    var x = numeric.rep([m],0), flags = numeric.rep([m],0), xj = Array(m);
	    var Ci = numeric.rep([o],0), Cj = [], Cv = [], C = [Ci,Cj,Cv];
	    var i,j,k,j0,j1,i0,i1,l,p,a,b;
	    for(k=0;k!==o;++k) {
	        j0 = Bi[k];
	        j1 = Bi[k+1];
	        p = 0;
	        for(j=j0;j<j1;++j) {
	            a = Bj[j];
	            b = Bv[j];
	            i0 = Ai[a];
	            i1 = Ai[a+1];
	            for(i=i0;i<i1;++i) {
	                l = Aj[i];
	                if(flags[l]===0) {
	                    xj[p] = l;
	                    flags[l] = 1;
	                    p = p+1;
	                }
	                x[l] = x[l] + Av[i]*b;
	            }
	        }
	        j0 = Ci[k];
	        j1 = j0+p;
	        Ci[k+1] = j1;
	        for(j=p-1;j!==-1;--j) {
	            b = j0+j;
	            i = xj[j];
	            Cj[b] = i;
	            Cv[b] = x[i];
	            flags[i] = 0;
	            x[i] = 0;
	        }
	        Ci[k+1] = Ci[k]+p;
	    }
	    return C;
	}
	
	numeric.ccsLUPSolve = function ccsLUPSolve(LUP,B) {
	    var L = LUP.L, U = LUP.U, P = LUP.P;
	    var Bi = B[0];
	    var flag = false;
	    if(typeof Bi !== "object") { B = [[0,B.length],numeric.linspace(0,B.length-1),B]; Bi = B[0]; flag = true; }
	    var Bj = B[1], Bv = B[2];
	    var n = L[0].length-1, m = Bi.length-1;
	    var x = numeric.rep([n],0), xj = Array(n);
	    var b = numeric.rep([n],0), bj = Array(n);
	    var Xi = numeric.rep([m+1],0), Xj = [], Xv = [];
	    var sol = numeric.ccsTSolve;
	    var i,j,j0,j1,k,J,N=0;
	    for(i=0;i<m;++i) {
	        k = 0;
	        j0 = Bi[i];
	        j1 = Bi[i+1];
	        for(j=j0;j<j1;++j) { 
	            J = LUP.Pinv[Bj[j]];
	            bj[k] = J;
	            b[J] = Bv[j];
	            ++k;
	        }
	        bj.length = k;
	        sol(L,b,x,bj,xj);
	        for(j=bj.length-1;j!==-1;--j) b[bj[j]] = 0;
	        sol(U,x,b,xj,bj);
	        if(flag) return b;
	        for(j=xj.length-1;j!==-1;--j) x[xj[j]] = 0;
	        for(j=bj.length-1;j!==-1;--j) {
	            J = bj[j];
	            Xj[N] = J;
	            Xv[N] = b[J];
	            b[J] = 0;
	            ++N;
	        }
	        Xi[i+1] = N;
	    }
	    return [Xi,Xj,Xv];
	}
	
	numeric.ccsbinop = function ccsbinop(body,setup) {
	    if(typeof setup === "undefined") setup='';
	    return Function('X','Y',
	            'var Xi = X[0], Xj = X[1], Xv = X[2];\n'+
	            'var Yi = Y[0], Yj = Y[1], Yv = Y[2];\n'+
	            'var n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\n'+
	            'var Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\n'+
	            'var x = numeric.rep([m],0),y = numeric.rep([m],0);\n'+
	            'var xk,yk,zk;\n'+
	            'var i,j,j0,j1,k,p=0;\n'+
	            setup+
	            'for(i=0;i<n;++i) {\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Xj[j];\n'+
	            '    x[k] = 1;\n'+
	            '    Zj[p] = k;\n'+
	            '    ++p;\n'+
	            '  }\n'+
	            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Yj[j];\n'+
	            '    y[k] = Yv[j];\n'+
	            '    if(x[k] === 0) {\n'+
	            '      Zj[p] = k;\n'+
	            '      ++p;\n'+
	            '    }\n'+
	            '  }\n'+
	            '  Zi[i+1] = p;\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n'+
	            '  j0 = Zi[i]; j1 = Zi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Zj[j];\n'+
	            '    xk = x[k];\n'+
	            '    yk = y[k];\n'+
	            body+'\n'+
	            '    Zv[j] = zk;\n'+
	            '  }\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n'+
	            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n'+
	            '}\n'+
	            'return [Zi,Zj,Zv];'
	            );
	};
	
	(function() {
	    var k,A,B,C;
	    for(k in numeric.ops2) {
	        if(isFinite(eval('1'+numeric.ops2[k]+'0'))) A = '[Y[0],Y[1],numeric.'+k+'(X,Y[2])]';
	        else A = 'NaN';
	        if(isFinite(eval('0'+numeric.ops2[k]+'1'))) B = '[X[0],X[1],numeric.'+k+'(X[2],Y)]';
	        else B = 'NaN';
	        if(isFinite(eval('1'+numeric.ops2[k]+'0')) && isFinite(eval('0'+numeric.ops2[k]+'1'))) C = 'numeric.ccs'+k+'MM(X,Y)';
	        else C = 'NaN';
	        numeric['ccs'+k+'MM'] = numeric.ccsbinop('zk = xk '+numeric.ops2[k]+'yk;');
	        numeric['ccs'+k] = Function('X','Y',
	                'if(typeof X === "number") return '+A+';\n'+
	                'if(typeof Y === "number") return '+B+';\n'+
	                'return '+C+';\n'
	                );
	    }
	}());
	
	numeric.ccsScatter = function ccsScatter(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var n = numeric.sup(Aj)+1,m=Ai.length;
	    var Ri = numeric.rep([n],0),Rj=Array(m), Rv = Array(m);
	    var counts = numeric.rep([n],0),i;
	    for(i=0;i<m;++i) counts[Aj[i]]++;
	    for(i=0;i<n;++i) Ri[i+1] = Ri[i] + counts[i];
	    var ptr = Ri.slice(0),k,Aii;
	    for(i=0;i<m;++i) {
	        Aii = Aj[i];
	        k = ptr[Aii];
	        Rj[k] = Ai[i];
	        Rv[k] = Av[i];
	        ptr[Aii]=ptr[Aii]+1;
	    }
	    return [Ri,Rj,Rv];
	}
	
	numeric.ccsGather = function ccsGather(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var n = Ai.length-1,m = Aj.length;
	    var Ri = Array(m), Rj = Array(m), Rv = Array(m);
	    var i,j,j0,j1,p;
	    p=0;
	    for(i=0;i<n;++i) {
	        j0 = Ai[i];
	        j1 = Ai[i+1];
	        for(j=j0;j!==j1;++j) {
	            Rj[p] = i;
	            Ri[p] = Aj[j];
	            Rv[p] = Av[j];
	            ++p;
	        }
	    }
	    return [Ri,Rj,Rv];
	}
	
	// The following sparse linear algebra routines are deprecated.
	
	numeric.sdim = function dim(A,ret,k) {
	    if(typeof ret === "undefined") { ret = []; }
	    if(typeof A !== "object") return ret;
	    if(typeof k === "undefined") { k=0; }
	    if(!(k in ret)) { ret[k] = 0; }
	    if(A.length > ret[k]) ret[k] = A.length;
	    var i;
	    for(i in A) {
	        if(A.hasOwnProperty(i)) dim(A[i],ret,k+1);
	    }
	    return ret;
	};
	
	numeric.sclone = function clone(A,k,n) {
	    if(typeof k === "undefined") { k=0; }
	    if(typeof n === "undefined") { n = numeric.sdim(A).length; }
	    var i,ret = Array(A.length);
	    if(k === n-1) {
	        for(i in A) { if(A.hasOwnProperty(i)) ret[i] = A[i]; }
	        return ret;
	    }
	    for(i in A) {
	        if(A.hasOwnProperty(i)) ret[i] = clone(A[i],k+1,n);
	    }
	    return ret;
	}
	
	numeric.sdiag = function diag(d) {
	    var n = d.length,i,ret = Array(n),i1,i2,i3;
	    for(i=n-1;i>=1;i-=2) {
	        i1 = i-1;
	        ret[i] = []; ret[i][i] = d[i];
	        ret[i1] = []; ret[i1][i1] = d[i1];
	    }
	    if(i===0) { ret[0] = []; ret[0][0] = d[i]; }
	    return ret;
	}
	
	numeric.sidentity = function identity(n) { return numeric.sdiag(numeric.rep([n],1)); }
	
	numeric.stranspose = function transpose(A) {
	    var ret = [], n = A.length, i,j,Ai;
	    for(i in A) {
	        if(!(A.hasOwnProperty(i))) continue;
	        Ai = A[i];
	        for(j in Ai) {
	            if(!(Ai.hasOwnProperty(j))) continue;
	            if(typeof ret[j] !== "object") { ret[j] = []; }
	            ret[j][i] = Ai[j];
	        }
	    }
	    return ret;
	}
	
	numeric.sLUP = function LUP(A,tol) {
	    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
	};
	
	numeric.sdotMM = function dotMM(A,B) {
	    var p = A.length, q = B.length, BT = numeric.stranspose(B), r = BT.length, Ai, BTk;
	    var i,j,k,accum;
	    var ret = Array(p),reti;
	    for(i=p-1;i>=0;i--) {
	        reti = [];
	        Ai = A[i];
	        for(k=r-1;k>=0;k--) {
	            accum = 0;
	            BTk = BT[k];
	            for(j in Ai) {
	                if(!(Ai.hasOwnProperty(j))) continue;
	                if(j in BTk) { accum += Ai[j]*BTk[j]; }
	            }
	            if(accum) reti[k] = accum;
	        }
	        ret[i] = reti;
	    }
	    return ret;
	}
	
	numeric.sdotMV = function dotMV(A,x) {
	    var p = A.length, Ai, i,j;
	    var ret = Array(p), accum;
	    for(i=p-1;i>=0;i--) {
	        Ai = A[i];
	        accum = 0;
	        for(j in Ai) {
	            if(!(Ai.hasOwnProperty(j))) continue;
	            if(x[j]) accum += Ai[j]*x[j];
	        }
	        if(accum) ret[i] = accum;
	    }
	    return ret;
	}
	
	numeric.sdotVM = function dotMV(x,A) {
	    var i,j,Ai,alpha;
	    var ret = [], accum;
	    for(i in x) {
	        if(!x.hasOwnProperty(i)) continue;
	        Ai = A[i];
	        alpha = x[i];
	        for(j in Ai) {
	            if(!Ai.hasOwnProperty(j)) continue;
	            if(!ret[j]) { ret[j] = 0; }
	            ret[j] += alpha*Ai[j];
	        }
	    }
	    return ret;
	}
	
	numeric.sdotVV = function dotVV(x,y) {
	    var i,ret=0;
	    for(i in x) { if(x[i] && y[i]) ret+= x[i]*y[i]; }
	    return ret;
	}
	
	numeric.sdot = function dot(A,B) {
	    var m = numeric.sdim(A).length, n = numeric.sdim(B).length;
	    var k = m*1000+n;
	    switch(k) {
	    case 0: return A*B;
	    case 1001: return numeric.sdotVV(A,B);
	    case 2001: return numeric.sdotMV(A,B);
	    case 1002: return numeric.sdotVM(A,B);
	    case 2002: return numeric.sdotMM(A,B);
	    default: throw new Error('numeric.sdot not implemented for tensors of order '+m+' and '+n);
	    }
	}
	
	numeric.sscatter = function scatter(V) {
	    var n = V[0].length, Vij, i, j, m = V.length, A = [], Aj;
	    for(i=n-1;i>=0;--i) {
	        if(!V[m-1][i]) continue;
	        Aj = A;
	        for(j=0;j<m-2;j++) {
	            Vij = V[j][i];
	            if(!Aj[Vij]) Aj[Vij] = [];
	            Aj = Aj[Vij];
	        }
	        Aj[V[j][i]] = V[j+1][i];
	    }
	    return A;
	}
	
	numeric.sgather = function gather(A,ret,k) {
	    if(typeof ret === "undefined") ret = [];
	    if(typeof k === "undefined") k = [];
	    var n,i,Ai;
	    n = k.length;
	    for(i in A) {
	        if(A.hasOwnProperty(i)) {
	            k[n] = parseInt(i);
	            Ai = A[i];
	            if(typeof Ai === "number") {
	                if(Ai) {
	                    if(ret.length === 0) {
	                        for(i=n+1;i>=0;--i) ret[i] = [];
	                    }
	                    for(i=n;i>=0;--i) ret[i].push(k[i]);
	                    ret[n+1].push(Ai);
	                }
	            } else gather(Ai,ret,k);
	        }
	    }
	    if(k.length>n) k.pop();
	    return ret;
	}
	
	// 6. Coordinate matrices
	numeric.cLU = function LU(A) {
	    var I = A[0], J = A[1], V = A[2];
	    var p = I.length, m=0, i,j,k,a,b,c;
	    for(i=0;i<p;i++) if(I[i]>m) m=I[i];
	    m++;
	    var L = Array(m), U = Array(m), left = numeric.rep([m],Infinity), right = numeric.rep([m],-Infinity);
	    var Ui, Uj,alpha;
	    for(k=0;k<p;k++) {
	        i = I[k];
	        j = J[k];
	        if(j<left[i]) left[i] = j;
	        if(j>right[i]) right[i] = j;
	    }
	    for(i=0;i<m-1;i++) { if(right[i] > right[i+1]) right[i+1] = right[i]; }
	    for(i=m-1;i>=1;i--) { if(left[i]<left[i-1]) left[i-1] = left[i]; }
	    var countL = 0, countU = 0;
	    for(i=0;i<m;i++) {
	        U[i] = numeric.rep([right[i]-left[i]+1],0);
	        L[i] = numeric.rep([i-left[i]],0);
	        countL += i-left[i]+1;
	        countU += right[i]-i+1;
	    }
	    for(k=0;k<p;k++) { i = I[k]; U[i][J[k]-left[i]] = V[k]; }
	    for(i=0;i<m-1;i++) {
	        a = i-left[i];
	        Ui = U[i];
	        for(j=i+1;left[j]<=i && j<m;j++) {
	            b = i-left[j];
	            c = right[i]-i;
	            Uj = U[j];
	            alpha = Uj[b]/Ui[a];
	            if(alpha) {
	                for(k=1;k<=c;k++) { Uj[k+b] -= alpha*Ui[k+a]; }
	                L[j][i-left[j]] = alpha;
	            }
	        }
	    }
	    var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
	    var p,q,foo;
	    p=0; q=0;
	    for(i=0;i<m;i++) {
	        a = left[i];
	        b = right[i];
	        foo = U[i];
	        for(j=i;j<=b;j++) {
	            if(foo[j-a]) {
	                Ui[p] = i;
	                Uj[p] = j;
	                Uv[p] = foo[j-a];
	                p++;
	            }
	        }
	        foo = L[i];
	        for(j=a;j<i;j++) {
	            if(foo[j-a]) {
	                Li[q] = i;
	                Lj[q] = j;
	                Lv[q] = foo[j-a];
	                q++;
	            }
	        }
	        Li[q] = i;
	        Lj[q] = i;
	        Lv[q] = 1;
	        q++;
	    }
	    return {U:[Ui,Uj,Uv], L:[Li,Lj,Lv]};
	};
	
	numeric.cLUsolve = function LUsolve(lu,b) {
	    var L = lu.L, U = lu.U, ret = numeric.clone(b);
	    var Li = L[0], Lj = L[1], Lv = L[2];
	    var Ui = U[0], Uj = U[1], Uv = U[2];
	    var p = Ui.length, q = Li.length;
	    var m = ret.length,i,j,k;
	    k = 0;
	    for(i=0;i<m;i++) {
	        while(Lj[k] < i) {
	            ret[i] -= Lv[k]*ret[Lj[k]];
	            k++;
	        }
	        k++;
	    }
	    k = p-1;
	    for(i=m-1;i>=0;i--) {
	        while(Uj[k] > i) {
	            ret[i] -= Uv[k]*ret[Uj[k]];
	            k--;
	        }
	        ret[i] /= Uv[k];
	        k--;
	    }
	    return ret;
	};
	
	numeric.cgrid = function grid(n,shape) {
	    if(typeof n === "number") n = [n,n];
	    var ret = numeric.rep(n,-1);
	    var i,j,count;
	    if(typeof shape !== "function") {
	        switch(shape) {
	        case 'L':
	            shape = function(i,j) { return (i>=n[0]/2 || j<n[1]/2); }
	            break;
	        default:
	            shape = function(i,j) { return true; };
	            break;
	        }
	    }
	    count=0;
	    for(i=1;i<n[0]-1;i++) for(j=1;j<n[1]-1;j++) 
	        if(shape(i,j)) {
	            ret[i][j] = count;
	            count++;
	        }
	    return ret;
	}
	
	numeric.cdelsq = function delsq(g) {
	    var dir = [[-1,0],[0,-1],[0,1],[1,0]];
	    var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
	    var Li = [], Lj = [], Lv = [];
	    for(i=1;i<m-1;i++) for(j=1;j<n-1;j++) {
	        if(g[i][j]<0) continue;
	        for(k=0;k<4;k++) {
	            p = i+dir[k][0];
	            q = j+dir[k][1];
	            if(g[p][q]<0) continue;
	            Li.push(g[i][j]);
	            Lj.push(g[p][q]);
	            Lv.push(-1);
	        }
	        Li.push(g[i][j]);
	        Lj.push(g[i][j]);
	        Lv.push(4);
	    }
	    return [Li,Lj,Lv];
	}
	
	numeric.cdotMV = function dotMV(A,x) {
	    var ret, Ai = A[0], Aj = A[1], Av = A[2],k,p=Ai.length,N;
	    N=0;
	    for(k=0;k<p;k++) { if(Ai[k]>N) N = Ai[k]; }
	    N++;
	    ret = numeric.rep([N],0);
	    for(k=0;k<p;k++) { ret[Ai[k]]+=Av[k]*x[Aj[k]]; }
	    return ret;
	}
	
	// 7. Splines
	
	numeric.Spline = function Spline(x,yl,yr,kl,kr) { this.x = x; this.yl = yl; this.yr = yr; this.kl = kl; this.kr = kr; }
	numeric.Spline.prototype._at = function _at(x1,p) {
	    var x = this.x;
	    var yl = this.yl;
	    var yr = this.yr;
	    var kl = this.kl;
	    var kr = this.kr;
	    var x1,a,b,t;
	    var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
	    a = sub(mul(kl[p],x[p+1]-x[p]),sub(yr[p+1],yl[p]));
	    b = add(mul(kr[p+1],x[p]-x[p+1]),sub(yr[p+1],yl[p]));
	    t = (x1-x[p])/(x[p+1]-x[p]);
	    var s = t*(1-t);
	    return add(add(add(mul(1-t,yl[p]),mul(t,yr[p+1])),mul(a,s*(1-t))),mul(b,s*t));
	}
	numeric.Spline.prototype.at = function at(x0) {
	    if(typeof x0 === "number") {
	        var x = this.x;
	        var n = x.length;
	        var p,q,mid,floor = Math.floor,a,b,t;
	        p = 0;
	        q = n-1;
	        while(q-p>1) {
	            mid = floor((p+q)/2);
	            if(x[mid] <= x0) p = mid;
	            else q = mid;
	        }
	        return this._at(x0,p);
	    }
	    var n = x0.length, i, ret = Array(n);
	    for(i=n-1;i!==-1;--i) ret[i] = this.at(x0[i]);
	    return ret;
	}
	numeric.Spline.prototype.diff = function diff() {
	    var x = this.x;
	    var yl = this.yl;
	    var yr = this.yr;
	    var kl = this.kl;
	    var kr = this.kr;
	    var n = yl.length;
	    var i,dx,dy;
	    var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
	    var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
	    for(i=n-1;i!==-1;--i) {
	        dx = x[i+1]-x[i];
	        dy = sub(yr[i+1],yl[i]);
	        pl[i] = div(add(mul(dy, 6),mul(kl[i],-4*dx),mul(kr[i+1],-2*dx)),dx*dx);
	        pr[i+1] = div(add(mul(dy,-6),mul(kl[i], 2*dx),mul(kr[i+1], 4*dx)),dx*dx);
	    }
	    return new numeric.Spline(x,zl,zr,pl,pr);
	}
	numeric.Spline.prototype.roots = function roots() {
	    function sqr(x) { return x*x; }
	    function heval(y0,y1,k0,k1,x) {
	        var A = k0*2-(y1-y0);
	        var B = -k1*2+(y1-y0);
	        var t = (x+1)*0.5;
	        var s = t*(1-t);
	        return (1-t)*y0+t*y1+A*s*(1-t)+B*s*t;
	    }
	    var ret = [];
	    var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
	    if(typeof yl[0] === "number") {
	        yl = [yl];
	        yr = [yr];
	        kl = [kl];
	        kr = [kr];
	    }
	    var m = yl.length,n=x.length-1,i,j,k,y,s,t;
	    var ai,bi,ci,di, ret = Array(m),ri,k0,k1,y0,y1,A,B,D,dx,cx,stops,z0,z1,zm,t0,t1,tm;
	    var sqrt = Math.sqrt;
	    for(i=0;i!==m;++i) {
	        ai = yl[i];
	        bi = yr[i];
	        ci = kl[i];
	        di = kr[i];
	        ri = [];
	        for(j=0;j!==n;j++) {
	            if(j>0 && bi[j]*ai[j]<0) ri.push(x[j]);
	            dx = (x[j+1]-x[j]);
	            cx = x[j];
	            y0 = ai[j];
	            y1 = bi[j+1];
	            k0 = ci[j]/dx;
	            k1 = di[j+1]/dx;
	            D = sqr(k0-k1+3*(y0-y1)) + 12*k1*y0;
	            A = k1+3*y0+2*k0-3*y1;
	            B = 3*(k1+k0+2*(y0-y1));
	            if(D<=0) {
	                z0 = A/B;
	                if(z0>x[j] && z0<x[j+1]) stops = [x[j],z0,x[j+1]];
	                else stops = [x[j],x[j+1]];
	            } else {
	                z0 = (A-sqrt(D))/B;
	                z1 = (A+sqrt(D))/B;
	                stops = [x[j]];
	                if(z0>x[j] && z0<x[j+1]) stops.push(z0);
	                if(z1>x[j] && z1<x[j+1]) stops.push(z1);
	                stops.push(x[j+1]);
	            }
	            t0 = stops[0];
	            z0 = this._at(t0,j);
	            for(k=0;k<stops.length-1;k++) {
	                t1 = stops[k+1];
	                z1 = this._at(t1,j);
	                if(z0 === 0) {
	                    ri.push(t0); 
	                    t0 = t1;
	                    z0 = z1;
	                    continue;
	                }
	                if(z1 === 0 || z0*z1>0) {
	                    t0 = t1;
	                    z0 = z1;
	                    continue;
	                }
	                var side = 0;
	                while(1) {
	                    tm = (z0*t1-z1*t0)/(z0-z1);
	                    if(tm <= t0 || tm >= t1) { break; }
	                    zm = this._at(tm,j);
	                    if(zm*z1>0) {
	                        t1 = tm;
	                        z1 = zm;
	                        if(side === -1) z0*=0.5;
	                        side = -1;
	                    } else if(zm*z0>0) {
	                        t0 = tm;
	                        z0 = zm;
	                        if(side === 1) z1*=0.5;
	                        side = 1;
	                    } else break;
	                }
	                ri.push(tm);
	                t0 = stops[k+1];
	                z0 = this._at(t0, j);
	            }
	            if(z1 === 0) ri.push(t1);
	        }
	        ret[i] = ri;
	    }
	    if(typeof this.yl[0] === "number") return ret[0];
	    return ret;
	}
	numeric.spline = function spline(x,y,k1,kn) {
	    var n = x.length, b = [], dx = [], dy = [];
	    var i;
	    var sub = numeric.sub,mul = numeric.mul,add = numeric.add;
	    for(i=n-2;i>=0;i--) { dx[i] = x[i+1]-x[i]; dy[i] = sub(y[i+1],y[i]); }
	    if(typeof k1 === "string" || typeof kn === "string") { 
	        k1 = kn = "periodic";
	    }
	    // Build sparse tridiagonal system
	    var T = [[],[],[]];
	    switch(typeof k1) {
	    case "undefined":
	        b[0] = mul(3/(dx[0]*dx[0]),dy[0]);
	        T[0].push(0,0);
	        T[1].push(0,1);
	        T[2].push(2/dx[0],1/dx[0]);
	        break;
	    case "string":
	        b[0] = add(mul(3/(dx[n-2]*dx[n-2]),dy[n-2]),mul(3/(dx[0]*dx[0]),dy[0]));
	        T[0].push(0,0,0);
	        T[1].push(n-2,0,1);
	        T[2].push(1/dx[n-2],2/dx[n-2]+2/dx[0],1/dx[0]);
	        break;
	    default:
	        b[0] = k1;
	        T[0].push(0);
	        T[1].push(0);
	        T[2].push(1);
	        break;
	    }
	    for(i=1;i<n-1;i++) {
	        b[i] = add(mul(3/(dx[i-1]*dx[i-1]),dy[i-1]),mul(3/(dx[i]*dx[i]),dy[i]));
	        T[0].push(i,i,i);
	        T[1].push(i-1,i,i+1);
	        T[2].push(1/dx[i-1],2/dx[i-1]+2/dx[i],1/dx[i]);
	    }
	    switch(typeof kn) {
	    case "undefined":
	        b[n-1] = mul(3/(dx[n-2]*dx[n-2]),dy[n-2]);
	        T[0].push(n-1,n-1);
	        T[1].push(n-2,n-1);
	        T[2].push(1/dx[n-2],2/dx[n-2]);
	        break;
	    case "string":
	        T[1][T[1].length-1] = 0;
	        break;
	    default:
	        b[n-1] = kn;
	        T[0].push(n-1);
	        T[1].push(n-1);
	        T[2].push(1);
	        break;
	    }
	    if(typeof b[0] !== "number") b = numeric.transpose(b);
	    else b = [b];
	    var k = Array(b.length);
	    if(typeof k1 === "string") {
	        for(i=k.length-1;i!==-1;--i) {
	            k[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T)),b[i]);
	            k[i][n-1] = k[i][0];
	        }
	    } else {
	        for(i=k.length-1;i!==-1;--i) {
	            k[i] = numeric.cLUsolve(numeric.cLU(T),b[i]);
	        }
	    }
	    if(typeof y[0] === "number") k = k[0];
	    else k = numeric.transpose(k);
	    return new numeric.Spline(x,y,y,k,k);
	}
	
	// 8. FFT
	numeric.fftpow2 = function fftpow2(x,y) {
	    var n = x.length;
	    if(n === 1) return;
	    var cos = Math.cos, sin = Math.sin, i,j;
	    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
	    j = n/2;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        xo[j] = x[i];
	        yo[j] = y[i];
	        --i;
	        xe[j] = x[i];
	        ye[j] = y[i];
	    }
	    fftpow2(xe,ye);
	    fftpow2(xo,yo);
	    j = n/2;
	    var t,k = (-6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        if(j === -1) j = n/2-1;
	        t = k*i;
	        ci = cos(t);
	        si = sin(t);
	        x[i] = xe[j] + ci*xo[j] - si*yo[j];
	        y[i] = ye[j] + ci*yo[j] + si*xo[j];
	    }
	}
	numeric._ifftpow2 = function _ifftpow2(x,y) {
	    var n = x.length;
	    if(n === 1) return;
	    var cos = Math.cos, sin = Math.sin, i,j;
	    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
	    j = n/2;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        xo[j] = x[i];
	        yo[j] = y[i];
	        --i;
	        xe[j] = x[i];
	        ye[j] = y[i];
	    }
	    _ifftpow2(xe,ye);
	    _ifftpow2(xo,yo);
	    j = n/2;
	    var t,k = (6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        if(j === -1) j = n/2-1;
	        t = k*i;
	        ci = cos(t);
	        si = sin(t);
	        x[i] = xe[j] + ci*xo[j] - si*yo[j];
	        y[i] = ye[j] + ci*yo[j] + si*xo[j];
	    }
	}
	numeric.ifftpow2 = function ifftpow2(x,y) {
	    numeric._ifftpow2(x,y);
	    numeric.diveq(x,x.length);
	    numeric.diveq(y,y.length);
	}
	numeric.convpow2 = function convpow2(ax,ay,bx,by) {
	    numeric.fftpow2(ax,ay);
	    numeric.fftpow2(bx,by);
	    var i,n = ax.length,axi,bxi,ayi,byi;
	    for(i=n-1;i!==-1;--i) {
	        axi = ax[i]; ayi = ay[i]; bxi = bx[i]; byi = by[i];
	        ax[i] = axi*bxi-ayi*byi;
	        ay[i] = axi*byi+ayi*bxi;
	    }
	    numeric.ifftpow2(ax,ay);
	}
	numeric.T.prototype.fft = function fft() {
	    var x = this.x, y = this.y;
	    var n = x.length, log = Math.log, log2 = log(2),
	        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
	    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
	    var k, c = (-3.141592653589793238462643383279502884197169399375105820/n),t;
	    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
	    for(k=0;k<n;k++) a[k] = x[k];
	    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
	    cx[0] = 1;
	    for(k=1;k<=m/2;k++) {
	        t = c*k*k;
	        cx[k] = cos(t);
	        cy[k] = sin(t);
	        cx[m-k] = cos(t);
	        cy[m-k] = sin(t)
	    }
	    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
	    X = X.mul(Y);
	    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
	    X = X.mul(Y);
	    X.x.length = n;
	    X.y.length = n;
	    return X;
	}
	numeric.T.prototype.ifft = function ifft() {
	    var x = this.x, y = this.y;
	    var n = x.length, log = Math.log, log2 = log(2),
	        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
	    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
	    var k, c = (3.141592653589793238462643383279502884197169399375105820/n),t;
	    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
	    for(k=0;k<n;k++) a[k] = x[k];
	    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
	    cx[0] = 1;
	    for(k=1;k<=m/2;k++) {
	        t = c*k*k;
	        cx[k] = cos(t);
	        cy[k] = sin(t);
	        cx[m-k] = cos(t);
	        cy[m-k] = sin(t)
	    }
	    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
	    X = X.mul(Y);
	    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
	    X = X.mul(Y);
	    X.x.length = n;
	    X.y.length = n;
	    return X.div(n);
	}
	
	//9. Unconstrained optimization
	numeric.gradient = function gradient(f,x) {
	    var n = x.length;
	    var f0 = f(x);
	    if(isNaN(f0)) throw new Error('gradient: f(x) is a NaN!');
	    var max = Math.max;
	    var i,x0 = numeric.clone(x),f1,f2, J = Array(n);
	    var div = numeric.div, sub = numeric.sub,errest,roundoff,max = Math.max,eps = 1e-3,abs = Math.abs, min = Math.min;
	    var t0,t1,t2,it=0,d1,d2,N;
	    for(i=0;i<n;i++) {
	        var h = max(1e-6*f0,1e-8);
	        while(1) {
	            ++it;
	            if(it>20) { throw new Error("Numerical gradient fails"); }
	            x0[i] = x[i]+h;
	            f1 = f(x0);
	            x0[i] = x[i]-h;
	            f2 = f(x0);
	            x0[i] = x[i];
	            if(isNaN(f1) || isNaN(f2)) { h/=16; continue; }
	            J[i] = (f1-f2)/(2*h);
	            t0 = x[i]-h;
	            t1 = x[i];
	            t2 = x[i]+h;
	            d1 = (f1-f0)/h;
	            d2 = (f0-f2)/h;
	            N = max(abs(J[i]),abs(f0),abs(f1),abs(f2),abs(t0),abs(t1),abs(t2),1e-8);
	            errest = min(max(abs(d1-J[i]),abs(d2-J[i]),abs(d1-d2))/N,h/N);
	            if(errest>eps) { h/=16; }
	            else break;
	            }
	    }
	    return J;
	}
	
	numeric.uncmin = function uncmin(f,x0,tol,gradient,maxit,callback,options) {
	    var grad = numeric.gradient;
	    if(typeof options === "undefined") { options = {}; }
	    if(typeof tol === "undefined") { tol = 1e-8; }
	    if(typeof gradient === "undefined") { gradient = function(x) { return grad(f,x); }; }
	    if(typeof maxit === "undefined") maxit = 1000;
	    x0 = numeric.clone(x0);
	    var n = x0.length;
	    var f0 = f(x0),f1,df0;
	    if(isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
	    var max = Math.max, norm2 = numeric.norm2;
	    tol = max(tol,numeric.epsilon);
	    var step,g0,g1,H1 = options.Hinv || numeric.identity(n);
	    var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
	    var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
	    var it=0,i,s,x1,y,Hy,Hs,ys,i0,t,nstep,t1,t2;
	    var msg = "";
	    g0 = gradient(x0);
	    while(it<maxit) {
	        if(typeof callback === "function") { if(callback(it,x0,f0,g0,H1)) { msg = "Callback returned true"; break; } }
	        if(!all(isfinite(g0))) { msg = "Gradient has Infinity or NaN"; break; }
	        step = neg(dot(H1,g0));
	        if(!all(isfinite(step))) { msg = "Search direction has Infinity or NaN"; break; }
	        nstep = norm2(step);
	        if(nstep < tol) { msg="Newton step smaller than tol"; break; }
	        t = 1;
	        df0 = dot(g0,step);
	        // line search
	        x1 = x0;
	        while(it < maxit) {
	            if(t*nstep < tol) { break; }
	            s = mul(step,t);
	            x1 = add(x0,s);
	            f1 = f(x1);
	            if(f1-f0 >= 0.1*t*df0 || isNaN(f1)) {
	                t *= 0.5;
	                ++it;
	                continue;
	            }
	            break;
	        }
	        if(t*nstep < tol) { msg = "Line search step size smaller than tol"; break; }
	        if(it === maxit) { msg = "maxit reached during line search"; break; }
	        g1 = gradient(x1);
	        y = sub(g1,g0);
	        ys = dot(y,s);
	        Hy = dot(H1,y);
	        H1 = sub(add(H1,
	                mul(
	                        (ys+dot(y,Hy))/(ys*ys),
	                        ten(s,s)    )),
	                div(add(ten(Hy,s),ten(s,Hy)),ys));
	        x0 = x1;
	        f0 = f1;
	        g0 = g1;
	        ++it;
	    }
	    return {solution: x0, f: f0, gradient: g0, invHessian: H1, iterations:it, message: msg};
	}
	
	// 10. Ode solver (Dormand-Prince)
	numeric.Dopri = function Dopri(x,y,f,ymid,iterations,msg,events) {
	    this.x = x;
	    this.y = y;
	    this.f = f;
	    this.ymid = ymid;
	    this.iterations = iterations;
	    this.events = events;
	    this.message = msg;
	}
	numeric.Dopri.prototype._at = function _at(xi,j) {
	    function sqr(x) { return x*x; }
	    var sol = this;
	    var xs = sol.x;
	    var ys = sol.y;
	    var k1 = sol.f;
	    var ymid = sol.ymid;
	    var n = xs.length;
	    var x0,x1,xh,y0,y1,yh,xi;
	    var floor = Math.floor,h;
	    var c = 0.5;
	    var add = numeric.add, mul = numeric.mul,sub = numeric.sub, p,q,w;
	    x0 = xs[j];
	    x1 = xs[j+1];
	    y0 = ys[j];
	    y1 = ys[j+1];
	    h  = x1-x0;
	    xh = x0+c*h;
	    yh = ymid[j];
	    p = sub(k1[j  ],mul(y0,1/(x0-xh)+2/(x0-x1)));
	    q = sub(k1[j+1],mul(y1,1/(x1-xh)+2/(x1-x0)));
	    w = [sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
	         sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
	         sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
	         (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0-x1) / (x0 - xh),
	         (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0-x1) / (x1 - xh)];
	    return add(add(add(add(mul(y0,w[0]),
	                           mul(yh,w[1])),
	                           mul(y1,w[2])),
	                           mul( p,w[3])),
	                           mul( q,w[4]));
	}
	numeric.Dopri.prototype.at = function at(x) {
	    var i,j,k,floor = Math.floor;
	    if(typeof x !== "number") {
	        var n = x.length, ret = Array(n);
	        for(i=n-1;i!==-1;--i) {
	            ret[i] = this.at(x[i]);
	        }
	        return ret;
	    }
	    var x0 = this.x;
	    i = 0; j = x0.length-1;
	    while(j-i>1) {
	        k = floor(0.5*(i+j));
	        if(x0[k] <= x) i = k;
	        else j = k;
	    }
	    return this._at(x,i);
	}
	
	numeric.dopri = function dopri(x0,x1,y0,f,tol,maxit,event) {
	    if(typeof tol === "undefined") { tol = 1e-6; }
	    if(typeof maxit === "undefined") { maxit = 1000; }
	    var xs = [x0], ys = [y0], k1 = [f(x0,y0)], k2,k3,k4,k5,k6,k7, ymid = [];
	    var A2 = 1/5;
	    var A3 = [3/40,9/40];
	    var A4 = [44/45,-56/15,32/9];
	    var A5 = [19372/6561,-25360/2187,64448/6561,-212/729];
	    var A6 = [9017/3168,-355/33,46732/5247,49/176,-5103/18656];
	    var b = [35/384,0,500/1113,125/192,-2187/6784,11/84];
	    var bm = [0.5*6025192743/30085553152,
	              0,
	              0.5*51252292925/65400821598,
	              0.5*-2691868925/45128329728,
	              0.5*187940372067/1594534317056,
	              0.5*-1776094331/19743644256,
	              0.5*11237099/235043384];
	    var c = [1/5,3/10,4/5,8/9,1,1];
	    var e = [-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,1/40];
	    var i = 0,er,j;
	    var h = (x1-x0)/10;
	    var it = 0;
	    var add = numeric.add, mul = numeric.mul, y1,erinf;
	    var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf,pow = Math.pow;
	    var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
	    var e0, e1, ev;
	    var ret = new numeric.Dopri(xs,ys,k1,ymid,-1,"");
	    if(typeof event === "function") e0 = event(x0,y0);
	    while(x0<x1 && it<maxit) {
	        ++it;
	        if(x0+h>x1) h = x1-x0;
	        k2 = f(x0+c[0]*h,                add(y0,mul(   A2*h,k1[i])));
	        k3 = f(x0+c[1]*h,            add(add(y0,mul(A3[0]*h,k1[i])),mul(A3[1]*h,k2)));
	        k4 = f(x0+c[2]*h,        add(add(add(y0,mul(A4[0]*h,k1[i])),mul(A4[1]*h,k2)),mul(A4[2]*h,k3)));
	        k5 = f(x0+c[3]*h,    add(add(add(add(y0,mul(A5[0]*h,k1[i])),mul(A5[1]*h,k2)),mul(A5[2]*h,k3)),mul(A5[3]*h,k4)));
	        k6 = f(x0+c[4]*h,add(add(add(add(add(y0,mul(A6[0]*h,k1[i])),mul(A6[1]*h,k2)),mul(A6[2]*h,k3)),mul(A6[3]*h,k4)),mul(A6[4]*h,k5)));
	        y1 = add(add(add(add(add(y0,mul(k1[i],h*b[0])),mul(k3,h*b[2])),mul(k4,h*b[3])),mul(k5,h*b[4])),mul(k6,h*b[5]));
	        k7 = f(x0+h,y1);
	        er = add(add(add(add(add(mul(k1[i],h*e[0]),mul(k3,h*e[2])),mul(k4,h*e[3])),mul(k5,h*e[4])),mul(k6,h*e[5])),mul(k7,h*e[6]));
	        if(typeof er === "number") erinf = abs(er);
	        else erinf = norminf(er);
	        if(erinf > tol) { // reject
	            h = 0.2*h*pow(tol/erinf,0.25);
	            if(x0+h === x0) {
	                ret.msg = "Step size became too small";
	                break;
	            }
	            continue;
	        }
	        ymid[i] = add(add(add(add(add(add(y0,
	                mul(k1[i],h*bm[0])),
	                mul(k3   ,h*bm[2])),
	                mul(k4   ,h*bm[3])),
	                mul(k5   ,h*bm[4])),
	                mul(k6   ,h*bm[5])),
	                mul(k7   ,h*bm[6]));
	        ++i;
	        xs[i] = x0+h;
	        ys[i] = y1;
	        k1[i] = k7;
	        if(typeof event === "function") {
	            var yi,xl = x0,xr = x0+0.5*h,xi;
	            e1 = event(xr,ymid[i-1]);
	            ev = and(lt(e0,0),lt(0,e1));
	            if(!any(ev)) { xl = xr; xr = x0+h; e0 = e1; e1 = event(xr,y1); ev = and(lt(e0,0),lt(0,e1)); }
	            if(any(ev)) {
	                var xc, yc, en,ei;
	                var side=0, sl = 1.0, sr = 1.0;
	                while(1) {
	                    if(typeof e0 === "number") xi = (sr*e1*xl-sl*e0*xr)/(sr*e1-sl*e0);
	                    else {
	                        xi = xr;
	                        for(j=e0.length-1;j!==-1;--j) {
	                            if(e0[j]<0 && e1[j]>0) xi = min(xi,(sr*e1[j]*xl-sl*e0[j]*xr)/(sr*e1[j]-sl*e0[j]));
	                        }
	                    }
	                    if(xi <= xl || xi >= xr) break;
	                    yi = ret._at(xi, i-1);
	                    ei = event(xi,yi);
	                    en = and(lt(e0,0),lt(0,ei));
	                    if(any(en)) {
	                        xr = xi;
	                        e1 = ei;
	                        ev = en;
	                        sr = 1.0;
	                        if(side === -1) sl *= 0.5;
	                        else sl = 1.0;
	                        side = -1;
	                    } else {
	                        xl = xi;
	                        e0 = ei;
	                        sl = 1.0;
	                        if(side === 1) sr *= 0.5;
	                        else sr = 1.0;
	                        side = 1;
	                    }
	                }
	                y1 = ret._at(0.5*(x0+xi),i-1);
	                ret.f[i] = f(xi,yi);
	                ret.x[i] = xi;
	                ret.y[i] = yi;
	                ret.ymid[i-1] = y1;
	                ret.events = ev;
	                ret.iterations = it;
	                return ret;
	            }
	        }
	        x0 += h;
	        y0 = y1;
	        e0 = e1;
	        h = min(0.8*h*pow(tol/erinf,0.25),4*h);
	    }
	    ret.iterations = it;
	    return ret;
	}
	
	// 11. Ax = b
	numeric.LU = function(A, fast) {
	  fast = fast || false;
	
	  var abs = Math.abs;
	  var i, j, k, absAjk, Akk, Ak, Pk, Ai;
	  var max;
	  var n = A.length, n1 = n-1;
	  var P = new Array(n);
	  if(!fast) A = numeric.clone(A);
	
	  for (k = 0; k < n; ++k) {
	    Pk = k;
	    Ak = A[k];
	    max = abs(Ak[k]);
	    for (j = k + 1; j < n; ++j) {
	      absAjk = abs(A[j][k]);
	      if (max < absAjk) {
	        max = absAjk;
	        Pk = j;
	      }
	    }
	    P[k] = Pk;
	
	    if (Pk != k) {
	      A[k] = A[Pk];
	      A[Pk] = Ak;
	      Ak = A[k];
	    }
	
	    Akk = Ak[k];
	
	    for (i = k + 1; i < n; ++i) {
	      A[i][k] /= Akk;
	    }
	
	    for (i = k + 1; i < n; ++i) {
	      Ai = A[i];
	      for (j = k + 1; j < n1; ++j) {
	        Ai[j] -= Ai[k] * Ak[j];
	        ++j;
	        Ai[j] -= Ai[k] * Ak[j];
	      }
	      if(j===n1) Ai[j] -= Ai[k] * Ak[j];
	    }
	  }
	
	  return {
	    LU: A,
	    P:  P
	  };
	}
	
	numeric.LUsolve = function LUsolve(LUP, b) {
	  var i, j;
	  var LU = LUP.LU;
	  var n   = LU.length;
	  var x = numeric.clone(b);
	  var P   = LUP.P;
	  var Pi, LUi, LUii, tmp;
	
	  for (i=n-1;i!==-1;--i) x[i] = b[i];
	  for (i = 0; i < n; ++i) {
	    Pi = P[i];
	    if (P[i] !== i) {
	      tmp = x[i];
	      x[i] = x[Pi];
	      x[Pi] = tmp;
	    }
	
	    LUi = LU[i];
	    for (j = 0; j < i; ++j) {
	      x[i] -= x[j] * LUi[j];
	    }
	  }
	
	  for (i = n - 1; i >= 0; --i) {
	    LUi = LU[i];
	    for (j = i + 1; j < n; ++j) {
	      x[i] -= x[j] * LUi[j];
	    }
	
	    x[i] /= LUi[i];
	  }
	
	  return x;
	}
	
	numeric.solve = function solve(A,b,fast) { return numeric.LUsolve(numeric.LU(A,fast), b); }
	
	// 12. Linear programming
	numeric.echelonize = function echelonize(A) {
	    var s = numeric.dim(A), m = s[0], n = s[1];
	    var I = numeric.identity(m);
	    var P = Array(m);
	    var i,j,k,l,Ai,Ii,Z,a;
	    var abs = Math.abs;
	    var diveq = numeric.diveq;
	    A = numeric.clone(A);
	    for(i=0;i<m;++i) {
	        k = 0;
	        Ai = A[i];
	        Ii = I[i];
	        for(j=1;j<n;++j) if(abs(Ai[k])<abs(Ai[j])) k=j;
	        P[i] = k;
	        diveq(Ii,Ai[k]);
	        diveq(Ai,Ai[k]);
	        for(j=0;j<m;++j) if(j!==i) {
	            Z = A[j]; a = Z[k];
	            for(l=n-1;l!==-1;--l) Z[l] -= Ai[l]*a;
	            Z = I[j];
	            for(l=m-1;l!==-1;--l) Z[l] -= Ii[l]*a;
	        }
	    }
	    return {I:I, A:A, P:P};
	}
	
	numeric.__solveLP = function __solveLP(c,A,b,tol,maxit,x,flag) {
	    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
	    var m = c.length, n = b.length,y;
	    var unbounded = false, cb,i0=0;
	    var alpha = 1.0;
	    var f0,df0,AT = numeric.transpose(A), svd = numeric.svd,transpose = numeric.transpose,leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
	    var muleq = numeric.muleq;
	    var norm = numeric.norminf, any = numeric.any,min = Math.min;
	    var all = numeric.all, gt = numeric.gt;
	    var p = Array(m), A0 = Array(n),e=numeric.rep([n],1), H;
	    var solve = numeric.solve, z = sub(b,dot(A,x)),count;
	    var dotcc = dot(c,c);
	    var g;
	    for(count=i0;count<maxit;++count) {
	        var i,j,d;
	        for(i=n-1;i!==-1;--i) A0[i] = div(A[i],z[i]);
	        var A1 = transpose(A0);
	        for(i=m-1;i!==-1;--i) p[i] = (/*x[i]+*/sum(A1[i]));
	        alpha = 0.25*abs(dotcc/dot(c,p));
	        var a1 = 100*sqrt(dotcc/dot(p,p));
	        if(!isFinite(alpha) || alpha>a1) alpha = a1;
	        g = add(c,mul(alpha,p));
	        H = dot(A1,A0);
	        for(i=m-1;i!==-1;--i) H[i][i] += 1;
	        d = solve(H,div(g,alpha),true);
	        var t0 = div(z,dot(A,d));
	        var t = 1.0;
	        for(i=n-1;i!==-1;--i) if(t0[i]<0) t = min(t,-0.999*t0[i]);
	        y = sub(x,mul(d,t));
	        z = sub(b,dot(A,y));
	        if(!all(gt(z,0))) return { solution: x, message: "", iterations: count };
	        x = y;
	        if(alpha<tol) return { solution: y, message: "", iterations: count };
	        if(flag) {
	            var s = dot(c,g), Ag = dot(A,g);
	            unbounded = true;
	            for(i=n-1;i!==-1;--i) if(s*Ag[i]<0) { unbounded = false; break; }
	        } else {
	            if(x[m-1]>=0) unbounded = false;
	            else unbounded = true;
	        }
	        if(unbounded) return { solution: y, message: "Unbounded", iterations: count };
	    }
	    return { solution: x, message: "maximum iteration count exceeded", iterations:count };
	}
	
	numeric._solveLP = function _solveLP(c,A,b,tol,maxit) {
	    var m = c.length, n = b.length,y;
	    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
	    var c0 = numeric.rep([m],0).concat([1]);
	    var J = numeric.rep([n,1],-1);
	    var A0 = numeric.blockMatrix([[A                   ,   J  ]]);
	    var b0 = b;
	    var y = numeric.rep([m],0).concat(Math.max(0,numeric.sup(numeric.neg(b)))+1);
	    var x0 = numeric.__solveLP(c0,A0,b0,tol,maxit,y,false);
	    var x = numeric.clone(x0.solution);
	    x.length = m;
	    var foo = numeric.inf(sub(b,dot(A,x)));
	    if(foo<0) { return { solution: NaN, message: "Infeasible", iterations: x0.iterations }; }
	    var ret = numeric.__solveLP(c, A, b, tol, maxit-x0.iterations, x, true);
	    ret.iterations += x0.iterations;
	    return ret;
	};
	
	numeric.solveLP = function solveLP(c,A,b,Aeq,beq,tol,maxit) {
	    if(typeof maxit === "undefined") maxit = 1000;
	    if(typeof tol === "undefined") tol = numeric.epsilon;
	    if(typeof Aeq === "undefined") return numeric._solveLP(c,A,b,tol,maxit);
	    var m = Aeq.length, n = Aeq[0].length, o = A.length;
	    var B = numeric.echelonize(Aeq);
	    var flags = numeric.rep([n],0);
	    var P = B.P;
	    var Q = [];
	    var i;
	    for(i=P.length-1;i!==-1;--i) flags[P[i]] = 1;
	    for(i=n-1;i!==-1;--i) if(flags[i]===0) Q.push(i);
	    var g = numeric.getRange;
	    var I = numeric.linspace(0,m-1), J = numeric.linspace(0,o-1);
	    var Aeq2 = g(Aeq,I,Q), A1 = g(A,J,P), A2 = g(A,J,Q), dot = numeric.dot, sub = numeric.sub;
	    var A3 = dot(A1,B.I);
	    var A4 = sub(A2,dot(A3,Aeq2)), b4 = sub(b,dot(A3,beq));
	    var c1 = Array(P.length), c2 = Array(Q.length);
	    for(i=P.length-1;i!==-1;--i) c1[i] = c[P[i]];
	    for(i=Q.length-1;i!==-1;--i) c2[i] = c[Q[i]];
	    var c4 = sub(c2,dot(c1,dot(B.I,Aeq2)));
	    var S = numeric._solveLP(c4,A4,b4,tol,maxit);
	    var x2 = S.solution;
	    if(x2!==x2) return S;
	    var x1 = dot(B.I,sub(beq,dot(Aeq2,x2)));
	    var x = Array(c.length);
	    for(i=P.length-1;i!==-1;--i) x[P[i]] = x1[i];
	    for(i=Q.length-1;i!==-1;--i) x[Q[i]] = x2[i];
	    return { solution: x, message:S.message, iterations: S.iterations };
	}
	
	numeric.MPStoLP = function MPStoLP(MPS) {
	    if(MPS instanceof String) { MPS.split('\n'); }
	    var state = 0;
	    var states = ['Initial state','NAME','ROWS','COLUMNS','RHS','BOUNDS','ENDATA'];
	    var n = MPS.length;
	    var i,j,z,N=0,rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
	    var name;
	    var c = [], A = [], b = [];
	    function err(e) { throw new Error('MPStoLP: '+e+'\nLine '+i+': '+MPS[i]+'\nCurrent state: '+states[state]+'\n'); }
	    for(i=0;i<n;++i) {
	        z = MPS[i];
	        var w0 = z.match(/\S*/g);
	        var w = [];
	        for(j=0;j<w0.length;++j) if(w0[j]!=="") w.push(w0[j]);
	        if(w.length === 0) continue;
	        for(j=0;j<states.length;++j) if(z.substr(0,states[j].length) === states[j]) break;
	        if(j<states.length) {
	            state = j;
	            if(j===1) { name = w[1]; }
	            if(j===6) return { name:name, c:c, A:numeric.transpose(A), b:b, rows:rows, vars:vars };
	            continue;
	        }
	        switch(state) {
	        case 0: case 1: err('Unexpected line');
	        case 2: 
	            switch(w[0]) {
	            case 'N': if(N===0) N = w[1]; else err('Two or more N rows'); break;
	            case 'L': rows[w[1]] = rl; sign[rl] = 1; b[rl] = 0; ++rl; break;
	            case 'G': rows[w[1]] = rl; sign[rl] = -1;b[rl] = 0; ++rl; break;
	            case 'E': rows[w[1]] = rl; sign[rl] = 0;b[rl] = 0; ++rl; break;
	            default: err('Parse error '+numeric.prettyPrint(w));
	            }
	            break;
	        case 3:
	            if(!vars.hasOwnProperty(w[0])) { vars[w[0]] = nv; c[nv] = 0; A[nv] = numeric.rep([rl],0); ++nv; }
	            var p = vars[w[0]];
	            for(j=1;j<w.length;j+=2) {
	                if(w[j] === N) { c[p] = parseFloat(w[j+1]); continue; }
	                var q = rows[w[j]];
	                A[p][q] = (sign[q]<0?-1:1)*parseFloat(w[j+1]);
	            }
	            break;
	        case 4:
	            for(j=1;j<w.length;j+=2) b[rows[w[j]]] = (sign[rows[w[j]]]<0?-1:1)*parseFloat(w[j+1]);
	            break;
	        case 5: /*FIXME*/ break;
	        case 6: err('Internal error');
	        }
	    }
	    err('Reached end of file without ENDATA');
	}
	// seedrandom.js version 2.0.
	// Author: David Bau 4/2/2011
	//
	// Defines a method Math.seedrandom() that, when called, substitutes
	// an explicitly seeded RC4-based algorithm for Math.random().  Also
	// supports automatic seeding from local or network sources of entropy.
	//
	// Usage:
	//
	//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
	//
	//   Math.seedrandom('yipee'); Sets Math.random to a function that is
	//                             initialized using the given explicit seed.
	//
	//   Math.seedrandom();        Sets Math.random to a function that is
	//                             seeded using the current time, dom state,
	//                             and other accumulated local entropy.
	//                             The generated seed string is returned.
	//
	//   Math.seedrandom('yowza', true);
	//                             Seeds using the given explicit seed mixed
	//                             together with accumulated entropy.
	//
	//   <script src="http://bit.ly/srandom-512"></script>
	//                             Seeds using physical random bits downloaded
	//                             from random.org.
	//
	//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
	//   </script>                 Seeds using urandom bits from call.jsonlib.com,
	//                             which is faster than random.org.
	//
	// Examples:
	//
	//   Math.seedrandom("hello");            // Use "hello" as the seed.
	//   document.write(Math.random());       // Always 0.5463663768140734
	//   document.write(Math.random());       // Always 0.43973793770592234
	//   var rng1 = Math.random;              // Remember the current prng.
	//
	//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
	//   document.write(Math.random());       // Pretty much unpredictable.
	//
	//   Math.random = rng1;                  // Continue "hello" prng sequence.
	//   document.write(Math.random());       // Always 0.554769432473455
	//
	//   Math.seedrandom(autoseed);           // Restart at the previous seed.
	//   document.write(Math.random());       // Repeat the 'unpredictable' value.
	//
	// Notes:
	//
	// Each time seedrandom('arg') is called, entropy from the passed seed
	// is accumulated in a pool to help generate future seeds for the
	// zero-argument form of Math.seedrandom, so entropy can be injected over
	// time by calling seedrandom with explicit data repeatedly.
	//
	// On speed - This javascript implementation of Math.random() is about
	// 3-10x slower than the built-in Math.random() because it is not native
	// code, but this is typically fast enough anyway.  Seeding is more expensive,
	// especially if you use auto-seeding.  Some details (timings on Chrome 4):
	//
	// Our Math.random()            - avg less than 0.002 milliseconds per call
	// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
	// seedrandom('explicit', true) - avg less than 2 milliseconds per call
	// seedrandom()                 - avg about 38 milliseconds per call
	//
	// LICENSE (BSD):
	//
	// Copyright 2010 David Bau, all rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions are met:
	// 
	//   1. Redistributions of source code must retain the above copyright
	//      notice, this list of conditions and the following disclaimer.
	//
	//   2. Redistributions in binary form must reproduce the above copyright
	//      notice, this list of conditions and the following disclaimer in the
	//      documentation and/or other materials provided with the distribution.
	// 
	//   3. Neither the name of this module nor the names of its contributors may
	//      be used to endorse or promote products derived from this software
	//      without specific prior written permission.
	// 
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	/**
	 * All code is in an anonymous closure to keep the global namespace clean.
	 *
	 * @param {number=} overflow 
	 * @param {number=} startdenom
	 */
	
	// Patched by Seb so that seedrandom.js does not pollute the Math object.
	// My tests suggest that doing Math.trouble = 1 makes Math lookups about 5%
	// slower.
	numeric.seedrandom = { pow:Math.pow, random:Math.random };
	
	(function (pool, math, width, chunks, significance, overflow, startdenom) {
	
	
	//
	// seedrandom()
	// This is the seedrandom function described above.
	//
	math['seedrandom'] = function seedrandom(seed, use_entropy) {
	  var key = [];
	  var arc4;
	
	  // Flatten the seed string or build one from local entropy if needed.
	  seed = mixkey(flatten(
	    use_entropy ? [seed, pool] :
	    arguments.length ? seed :
	    [new Date().getTime(), pool, window], 3), key);
	
	  // Use the seed to initialize an ARC4 generator.
	  arc4 = new ARC4(key);
	
	  // Mix the randomness into accumulated entropy.
	  mixkey(arc4.S, pool);
	
	  // Override Math.random
	
	  // This function returns a random double in [0, 1) that contains
	  // randomness in every bit of the mantissa of the IEEE 754 value.
	
	  math['random'] = function random() {  // Closure to return a random double:
	    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
	    var d = startdenom;                 //   and denominator d = 2 ^ 48.
	    var x = 0;                          //   and no 'extra last byte'.
	    while (n < significance) {          // Fill up all significant digits by
	      n = (n + x) * width;              //   shifting numerator and
	      d *= width;                       //   denominator and generating a
	      x = arc4.g(1);                    //   new least-significant-byte.
	    }
	    while (n >= overflow) {             // To avoid rounding up, before adding
	      n /= 2;                           //   last byte, shift everything
	      d /= 2;                           //   right using integer math until
	      x >>>= 1;                         //   we have exactly the desired bits.
	    }
	    return (n + x) / d;                 // Form the number within [0, 1).
	  };
	
	  // Return the seed that was used
	  return seed;
	};
	
	//
	// ARC4
	//
	// An ARC4 implementation.  The constructor takes a key in the form of
	// an array of at most (width) integers that should be 0 <= x < (width).
	//
	// The g(count) method returns a pseudorandom integer that concatenates
	// the next (count) outputs from ARC4.  Its return value is a number x
	// that is in the range 0 <= x < (width ^ count).
	//
	/** @constructor */
	function ARC4(key) {
	  var t, u, me = this, keylen = key.length;
	  var i = 0, j = me.i = me.j = me.m = 0;
	  me.S = [];
	  me.c = [];
	
	  // The empty key [] is treated as [0].
	  if (!keylen) { key = [keylen++]; }
	
	  // Set up S using the standard key scheduling algorithm.
	  while (i < width) { me.S[i] = i++; }
	  for (i = 0; i < width; i++) {
	    t = me.S[i];
	    j = lowbits(j + t + key[i % keylen]);
	    u = me.S[j];
	    me.S[i] = u;
	    me.S[j] = t;
	  }
	
	  // The "g" method returns the next (count) outputs as one number.
	  me.g = function getnext(count) {
	    var s = me.S;
	    var i = lowbits(me.i + 1); var t = s[i];
	    var j = lowbits(me.j + t); var u = s[j];
	    s[i] = u;
	    s[j] = t;
	    var r = s[lowbits(t + u)];
	    while (--count) {
	      i = lowbits(i + 1); t = s[i];
	      j = lowbits(j + t); u = s[j];
	      s[i] = u;
	      s[j] = t;
	      r = r * width + s[lowbits(t + u)];
	    }
	    me.i = i;
	    me.j = j;
	    return r;
	  };
	  // For robust unpredictability discard an initial batch of values.
	  // See http://www.rsa.com/rsalabs/node.asp?id=2009
	  me.g(width);
	}
	
	//
	// flatten()
	// Converts an object tree to nested arrays of strings.
	//
	/** @param {Object=} result 
	  * @param {string=} prop
	  * @param {string=} typ */
	function flatten(obj, depth, result, prop, typ) {
	  result = [];
	  typ = typeof(obj);
	  if (depth && typ == 'object') {
	    for (prop in obj) {
	      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
	        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
	      }
	    }
	  }
	  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
	}
	
	//
	// mixkey()
	// Mixes a string seed into a key that is an array of integers, and
	// returns a shortened string seed that is equivalent to the result key.
	//
	/** @param {number=} smear 
	  * @param {number=} j */
	function mixkey(seed, key, smear, j) {
	  seed += '';                         // Ensure the seed is a string
	  smear = 0;
	  for (j = 0; j < seed.length; j++) {
	    key[lowbits(j)] =
	      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
	  }
	  seed = '';
	  for (j in key) { seed += String.fromCharCode(key[j]); }
	  return seed;
	}
	
	//
	// lowbits()
	// A quick "n mod width" for width a power of 2.
	//
	function lowbits(n) { return n & (width - 1); }
	
	//
	// The following constants are related to IEEE 754 limits.
	//
	startdenom = math.pow(width, chunks);
	significance = math.pow(2, significance);
	overflow = significance * 2;
	
	//
	// When seedrandom.js is loaded, we immediately mix a few bits
	// from the built-in RNG into the entropy pool.  Because we do
	// not want to intefere with determinstic PRNG state later,
	// seedrandom will not call math.random on its own again after
	// initialization.
	//
	mixkey(math.random(), pool);
	
	// End anonymous scope, and pass initial values.
	}(
	  [],   // pool: entropy pool starts empty
	  numeric.seedrandom, // math: package containing random, pow, and seedrandom
	  256,  // width: each RC4 output is 0 <= x < 256
	  6,    // chunks: at least six RC4 outputs for each double
	  52    // significance: there are 52 significant digits in a double
	  ));
	/* This file is a slightly modified version of quadprog.js from Alberto Santini.
	 * It has been slightly modified by Sébastien Loisel to make sure that it handles
	 * 0-based Arrays instead of 1-based Arrays.
	 * License is in resources/LICENSE.quadprog */
	(function(exports) {
	
	function base0to1(A) {
	    if(typeof A !== "object") { return A; }
	    var ret = [], i,n=A.length;
	    for(i=0;i<n;i++) ret[i+1] = base0to1(A[i]);
	    return ret;
	}
	function base1to0(A) {
	    if(typeof A !== "object") { return A; }
	    var ret = [], i,n=A.length;
	    for(i=1;i<n;i++) ret[i-1] = base1to0(A[i]);
	    return ret;
	}
	
	function dpori(a, lda, n) {
	    var i, j, k, kp1, t;
	
	    for (k = 1; k <= n; k = k + 1) {
	        a[k][k] = 1 / a[k][k];
	        t = -a[k][k];
	        //~ dscal(k - 1, t, a[1][k], 1);
	        for (i = 1; i < k; i = i + 1) {
	            a[i][k] = t * a[i][k];
	        }
	
	        kp1 = k + 1;
	        if (n < kp1) {
	            break;
	        }
	        for (j = kp1; j <= n; j = j + 1) {
	            t = a[k][j];
	            a[k][j] = 0;
	            //~ daxpy(k, t, a[1][k], 1, a[1][j], 1);
	            for (i = 1; i <= k; i = i + 1) {
	                a[i][j] = a[i][j] + (t * a[i][k]);
	            }
	        }
	    }
	
	}
	
	function dposl(a, lda, n, b) {
	    var i, k, kb, t;
	
	    for (k = 1; k <= n; k = k + 1) {
	        //~ t = ddot(k - 1, a[1][k], 1, b[1], 1);
	        t = 0;
	        for (i = 1; i < k; i = i + 1) {
	            t = t + (a[i][k] * b[i]);
	        }
	
	        b[k] = (b[k] - t) / a[k][k];
	    }
	
	    for (kb = 1; kb <= n; kb = kb + 1) {
	        k = n + 1 - kb;
	        b[k] = b[k] / a[k][k];
	        t = -b[k];
	        //~ daxpy(k - 1, t, a[1][k], 1, b[1], 1);
	        for (i = 1; i < k; i = i + 1) {
	            b[i] = b[i] + (t * a[i][k]);
	        }
	    }
	}
	
	function dpofa(a, lda, n, info) {
	    var i, j, jm1, k, t, s;
	
	    for (j = 1; j <= n; j = j + 1) {
	        info[1] = j;
	        s = 0;
	        jm1 = j - 1;
	        if (jm1 < 1) {
	            s = a[j][j] - s;
	            if (s <= 0) {
	                break;
	            }
	            a[j][j] = Math.sqrt(s);
	        } else {
	            for (k = 1; k <= jm1; k = k + 1) {
	                //~ t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
	                t = a[k][j];
	                for (i = 1; i < k; i = i + 1) {
	                    t = t - (a[i][j] * a[i][k]);
	                }
	                t = t / a[k][k];
	                a[k][j] = t;
	                s = s + t * t;
	            }
	            s = a[j][j] - s;
	            if (s <= 0) {
	                break;
	            }
	            a[j][j] = Math.sqrt(s);
	        }
	        info[1] = 0;
	    }
	}
	
	function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat,
	    bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {
	
	    var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv,
	        temp, sum, t1, tt, gc, gs, nu,
	        t1inf, t2min,
	        vsmall, tmpa, tmpb,
	        go;
	
	    r = Math.min(n, q);
	    l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;
	
	    vsmall = 1.0e-60;
	    do {
	        vsmall = vsmall + vsmall;
	        tmpa = 1 + 0.1 * vsmall;
	        tmpb = 1 + 0.2 * vsmall;
	    } while (tmpa <= 1 || tmpb <= 1);
	
	    for (i = 1; i <= n; i = i + 1) {
	        work[i] = dvec[i];
	    }
	    for (i = n + 1; i <= l; i = i + 1) {
	        work[i] = 0;
	    }
	    for (i = 1; i <= q; i = i + 1) {
	        iact[i] = 0;
	    }
	
	    info = [];
	
	    if (ierr[1] === 0) {
	        dpofa(dmat, fddmat, n, info);
	        if (info[1] !== 0) {
	            ierr[1] = 2;
	            return;
	        }
	        dposl(dmat, fddmat, n, dvec);
	        dpori(dmat, fddmat, n);
	    } else {
	        for (j = 1; j <= n; j = j + 1) {
	            sol[j] = 0;
	            for (i = 1; i <= j; i = i + 1) {
	                sol[j] = sol[j] + dmat[i][j] * dvec[i];
	            }
	        }
	        for (j = 1; j <= n; j = j + 1) {
	            dvec[j] = 0;
	            for (i = j; i <= n; i = i + 1) {
	                dvec[j] = dvec[j] + dmat[j][i] * sol[i];
	            }
	        }
	    }
	
	    crval[1] = 0;
	    for (j = 1; j <= n; j = j + 1) {
	        sol[j] = dvec[j];
	        crval[1] = crval[1] + work[j] * sol[j];
	        work[j] = 0;
	        for (i = j + 1; i <= n; i = i + 1) {
	            dmat[i][j] = 0;
	        }
	    }
	    crval[1] = -crval[1] / 2;
	    ierr[1] = 0;
	
	    iwzv = n;
	    iwrv = iwzv + n;
	    iwuv = iwrv + r;
	    iwrm = iwuv + r + 1;
	    iwsv = iwrm + (r * (r + 1)) / 2;
	    iwnbv = iwsv + q;
	
	    for (i = 1; i <= q; i = i + 1) {
	        sum = 0;
	        for (j = 1; j <= n; j = j + 1) {
	            sum = sum + amat[j][i] * amat[j][i];
	        }
	        work[iwnbv + i] = Math.sqrt(sum);
	    }
	    nact = 0;
	    iter[1] = 0;
	    iter[2] = 0;
	
	    function fn_goto_50() {
	        iter[1] = iter[1] + 1;
	
	        l = iwsv;
	        for (i = 1; i <= q; i = i + 1) {
	            l = l + 1;
	            sum = -bvec[i];
	            for (j = 1; j <= n; j = j + 1) {
	                sum = sum + amat[j][i] * sol[j];
	            }
	            if (Math.abs(sum) < vsmall) {
	                sum = 0;
	            }
	            if (i > meq) {
	                work[l] = sum;
	            } else {
	                work[l] = -Math.abs(sum);
	                if (sum > 0) {
	                    for (j = 1; j <= n; j = j + 1) {
	                        amat[j][i] = -amat[j][i];
	                    }
	                    bvec[i] = -bvec[i];
	                }
	            }
	        }
	
	        for (i = 1; i <= nact; i = i + 1) {
	            work[iwsv + iact[i]] = 0;
	        }
	
	        nvl = 0;
	        temp = 0;
	        for (i = 1; i <= q; i = i + 1) {
	            if (work[iwsv + i] < temp * work[iwnbv + i]) {
	                nvl = i;
	                temp = work[iwsv + i] / work[iwnbv + i];
	            }
	        }
	        if (nvl === 0) {
	            return 999;
	        }
	
	        return 0;
	    }
	
	    function fn_goto_55() {
	        for (i = 1; i <= n; i = i + 1) {
	            sum = 0;
	            for (j = 1; j <= n; j = j + 1) {
	                sum = sum + dmat[j][i] * amat[j][nvl];
	            }
	            work[i] = sum;
	        }
	
	        l1 = iwzv;
	        for (i = 1; i <= n; i = i + 1) {
	            work[l1 + i] = 0;
	        }
	        for (j = nact + 1; j <= n; j = j + 1) {
	            for (i = 1; i <= n; i = i + 1) {
	                work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
	            }
	        }
	
	        t1inf = true;
	        for (i = nact; i >= 1; i = i - 1) {
	            sum = work[i];
	            l = iwrm + (i * (i + 3)) / 2;
	            l1 = l - i;
	            for (j = i + 1; j <= nact; j = j + 1) {
	                sum = sum - work[l] * work[iwrv + j];
	                l = l + j;
	            }
	            sum = sum / work[l1];
	            work[iwrv + i] = sum;
	            if (iact[i] < meq) {
	                // continue;
	                break;
	            }
	            if (sum < 0) {
	                // continue;
	                break;
	            }
	            t1inf = false;
	            it1 = i;
	        }
	
	        if (!t1inf) {
	            t1 = work[iwuv + it1] / work[iwrv + it1];
	            for (i = 1; i <= nact; i = i + 1) {
	                if (iact[i] < meq) {
	                    // continue;
	                    break;
	                }
	                if (work[iwrv + i] < 0) {
	                    // continue;
	                    break;
	                }
	                temp = work[iwuv + i] / work[iwrv + i];
	                if (temp < t1) {
	                    t1 = temp;
	                    it1 = i;
	                }
	            }
	        }
	
	        sum = 0;
	        for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
	            sum = sum + work[i] * work[i];
	        }
	        if (Math.abs(sum) <= vsmall) {
	            if (t1inf) {
	                ierr[1] = 1;
	                // GOTO 999
	                return 999;
	            } else {
	                for (i = 1; i <= nact; i = i + 1) {
	                    work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
	                }
	                work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
	                // GOTO 700
	                return 700;
	            }
	        } else {
	            sum = 0;
	            for (i = 1; i <= n; i = i + 1) {
	                sum = sum + work[iwzv + i] * amat[i][nvl];
	            }
	            tt = -work[iwsv + nvl] / sum;
	            t2min = true;
	            if (!t1inf) {
	                if (t1 < tt) {
	                    tt = t1;
	                    t2min = false;
	                }
	            }
	
	            for (i = 1; i <= n; i = i + 1) {
	                sol[i] = sol[i] + tt * work[iwzv + i];
	                if (Math.abs(sol[i]) < vsmall) {
	                    sol[i] = 0;
	                }
	            }
	
	            crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
	            for (i = 1; i <= nact; i = i + 1) {
	                work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
	            }
	            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;
	
	            if (t2min) {
	                nact = nact + 1;
	                iact[nact] = nvl;
	
	                l = iwrm + ((nact - 1) * nact) / 2 + 1;
	                for (i = 1; i <= nact - 1; i = i + 1) {
	                    work[l] = work[i];
	                    l = l + 1;
	                }
	
	                if (nact === n) {
	                    work[l] = work[n];
	                } else {
	                    for (i = n; i >= nact + 1; i = i - 1) {
	                        if (work[i] === 0) {
	                            // continue;
	                            break;
	                        }
	                        gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
	                        gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
	                        if (work[i - 1] >= 0) {
	                            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	                        } else {
	                            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	                        }
	                        gc = work[i - 1] / temp;
	                        gs = work[i] / temp;
	
	                        if (gc === 1) {
	                            // continue;
	                            break;
	                        }
	                        if (gc === 0) {
	                            work[i - 1] = gs * temp;
	                            for (j = 1; j <= n; j = j + 1) {
	                                temp = dmat[j][i - 1];
	                                dmat[j][i - 1] = dmat[j][i];
	                                dmat[j][i] = temp;
	                            }
	                        } else {
	                            work[i - 1] = temp;
	                            nu = gs / (1 + gc);
	                            for (j = 1; j <= n; j = j + 1) {
	                                temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
	                                dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
	                                dmat[j][i - 1] = temp;
	
	                            }
	                        }
	                    }
	                    work[l] = work[nact];
	                }
	            } else {
	                sum = -bvec[nvl];
	                for (j = 1; j <= n; j = j + 1) {
	                    sum = sum + sol[j] * amat[j][nvl];
	                }
	                if (nvl > meq) {
	                    work[iwsv + nvl] = sum;
	                } else {
	                    work[iwsv + nvl] = -Math.abs(sum);
	                    if (sum > 0) {
	                        for (j = 1; j <= n; j = j + 1) {
	                            amat[j][nvl] = -amat[j][nvl];
	                        }
	                        bvec[nvl] = -bvec[nvl];
	                    }
	                }
	                // GOTO 700
	                return 700;
	            }
	        }
	
	        return 0;
	    }
	
	    function fn_goto_797() {
	        l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
	        l1 = l + it1;
	        if (work[l1] === 0) {
	            // GOTO 798
	            return 798;
	        }
	        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
	        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
	        if (work[l1 - 1] >= 0) {
	            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	        } else {
	            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	        }
	        gc = work[l1 - 1] / temp;
	        gs = work[l1] / temp;
	
	        if (gc === 1) {
	            // GOTO 798
	            return 798;
	        }
	        if (gc === 0) {
	            for (i = it1 + 1; i <= nact; i = i + 1) {
	                temp = work[l1 - 1];
	                work[l1 - 1] = work[l1];
	                work[l1] = temp;
	                l1 = l1 + i;
	            }
	            for (i = 1; i <= n; i = i + 1) {
	                temp = dmat[i][it1];
	                dmat[i][it1] = dmat[i][it1 + 1];
	                dmat[i][it1 + 1] = temp;
	            }
	        } else {
	            nu = gs / (1 + gc);
	            for (i = it1 + 1; i <= nact; i = i + 1) {
	                temp = gc * work[l1 - 1] + gs * work[l1];
	                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
	                work[l1 - 1] = temp;
	                l1 = l1 + i;
	            }
	            for (i = 1; i <= n; i = i + 1) {
	                temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
	                dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
	                dmat[i][it1] = temp;
	            }
	        }
	
	        return 0;
	    }
	
	    function fn_goto_798() {
	        l1 = l - it1;
	        for (i = 1; i <= it1; i = i + 1) {
	            work[l1] = work[l];
	            l = l + 1;
	            l1 = l1 + 1;
	        }
	
	        work[iwuv + it1] = work[iwuv + it1 + 1];
	        iact[it1] = iact[it1 + 1];
	        it1 = it1 + 1;
	        if (it1 < nact) {
	            // GOTO 797
	            return 797;
	        }
	
	        return 0;
	    }
	
	    function fn_goto_799() {
	        work[iwuv + nact] = work[iwuv + nact + 1];
	        work[iwuv + nact + 1] = 0;
	        iact[nact] = 0;
	        nact = nact - 1;
	        iter[2] = iter[2] + 1;
	
	        return 0;
	    }
	
	    go = 0;
	    while (true) {
	        go = fn_goto_50();
	        if (go === 999) {
	            return;
	        }
	        while (true) {
	            go = fn_goto_55();
	            if (go === 0) {
	                break;
	            }
	            if (go === 999) {
	                return;
	            }
	            if (go === 700) {
	                if (it1 === nact) {
	                    fn_goto_799();
	                } else {
	                    while (true) {
	                        fn_goto_797();
	                        go = fn_goto_798();
	                        if (go !== 797) {
	                            break;
	                        }
	                    }
	                    fn_goto_799();
	                }
	            }
	        }
	    }
	
	}
	
	function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
	    Dmat = base0to1(Dmat);
	    dvec = base0to1(dvec);
	    Amat = base0to1(Amat);
	    var i, n, q,
	        nact, r,
	        crval = [], iact = [], sol = [], work = [], iter = [],
	        message;
	
	    meq = meq || 0;
	    factorized = factorized ? base0to1(factorized) : [undefined, 0];
	    bvec = bvec ? base0to1(bvec) : [];
	
	    // In Fortran the array index starts from 1
	    n = Dmat.length - 1;
	    q = Amat[1].length - 1;
	
	    if (!bvec) {
	        for (i = 1; i <= q; i = i + 1) {
	            bvec[i] = 0;
	        }
	    }
	    for (i = 1; i <= q; i = i + 1) {
	        iact[i] = 0;
	    }
	    nact = 0;
	    r = Math.min(n, q);
	    for (i = 1; i <= n; i = i + 1) {
	        sol[i] = 0;
	    }
	    crval[1] = 0;
	    for (i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i = i + 1) {
	        work[i] = 0;
	    }
	    for (i = 1; i <= 2; i = i + 1) {
	        iter[i] = 0;
	    }
	
	    qpgen2(Dmat, dvec, n, n, sol, crval, Amat,
	        bvec, n, q, meq, iact, nact, iter, work, factorized);
	
	    message = "";
	    if (factorized[1] === 1) {
	        message = "constraints are inconsistent, no solution!";
	    }
	    if (factorized[1] === 2) {
	        message = "matrix D in quadratic function is not positive definite!";
	    }
	
	    return {
	        solution: base1to0(sol),
	        value: base1to0(crval),
	        unconstrained_solution: base1to0(dvec),
	        iterations: base1to0(iter),
	        iact: base1to0(iact),
	        message: message
	    };
	}
	exports.solveQP = solveQP;
	}(numeric));
	/*
	Shanti Rao sent me this routine by private email. I had to modify it
	slightly to work on Arrays instead of using a Matrix object.
	It is apparently translated from http://stitchpanorama.sourceforge.net/Python/svd.py
	*/
	
	numeric.svd= function svd(A) {
	    var temp;
	//Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
		var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
		var tolerance= 1.e-64/prec;
		var itmax= 50;
		var c=0;
		var i=0;
		var j=0;
		var k=0;
		var l=0;
		
		var u= numeric.clone(A);
		var m= u.length;
		
		var n= u[0].length;
		
		if (m < n) throw "Need more rows than columns"
		
		var e = new Array(n);
		var q = new Array(n);
		for (i=0; i<n; i++) e[i] = q[i] = 0.0;
		var v = numeric.rep([n,n],0);
	//	v.zero();
		
	 	function pythag(a,b)
	 	{
			a = Math.abs(a)
			b = Math.abs(b)
			if (a > b)
				return a*Math.sqrt(1.0+(b*b/a/a))
			else if (b == 0.0) 
				return a
			return b*Math.sqrt(1.0+(a*a/b/b))
		}
	
		//Householder's reduction to bidiagonal form
	
		var f= 0.0;
		var g= 0.0;
		var h= 0.0;
		var x= 0.0;
		var y= 0.0;
		var z= 0.0;
		var s= 0.0;
		
		for (i=0; i < n; i++)
		{	
			e[i]= g;
			s= 0.0;
			l= i+1;
			for (j=i; j < m; j++) 
				s += (u[j][i]*u[j][i]);
			if (s <= tolerance)
				g= 0.0;
			else
			{	
				f= u[i][i];
				g= Math.sqrt(s);
				if (f >= 0.0) g= -g;
				h= f*g-s
				u[i][i]=f-g;
				for (j=l; j < n; j++)
				{
					s= 0.0
					for (k=i; k < m; k++) 
						s += u[k][i]*u[k][j]
					f= s/h
					for (k=i; k < m; k++) 
						u[k][j]+=f*u[k][i]
				}
			}
			q[i]= g
			s= 0.0
			for (j=l; j < n; j++) 
				s= s + u[i][j]*u[i][j]
			if (s <= tolerance)
				g= 0.0
			else
			{	
				f= u[i][i+1]
				g= Math.sqrt(s)
				if (f >= 0.0) g= -g
				h= f*g - s
				u[i][i+1] = f-g;
				for (j=l; j < n; j++) e[j]= u[i][j]/h
				for (j=l; j < m; j++)
				{	
					s=0.0
					for (k=l; k < n; k++) 
						s += (u[j][k]*u[i][k])
					for (k=l; k < n; k++) 
						u[j][k]+=s*e[k]
				}	
			}
			y= Math.abs(q[i])+Math.abs(e[i])
			if (y>x) 
				x=y
		}
		
		// accumulation of right hand gtransformations
		for (i=n-1; i != -1; i+= -1)
		{	
			if (g != 0.0)
			{
			 	h= g*u[i][i+1]
				for (j=l; j < n; j++) 
					v[j][i]=u[i][j]/h
				for (j=l; j < n; j++)
				{	
					s=0.0
					for (k=l; k < n; k++) 
						s += u[i][k]*v[k][j]
					for (k=l; k < n; k++) 
						v[k][j]+=(s*v[k][i])
				}	
			}
			for (j=l; j < n; j++)
			{
				v[i][j] = 0;
				v[j][i] = 0;
			}
			v[i][i] = 1;
			g= e[i]
			l= i
		}
		
		// accumulation of left hand transformations
		for (i=n-1; i != -1; i+= -1)
		{	
			l= i+1
			g= q[i]
			for (j=l; j < n; j++) 
				u[i][j] = 0;
			if (g != 0.0)
			{
				h= u[i][i]*g
				for (j=l; j < n; j++)
				{
					s=0.0
					for (k=l; k < m; k++) s += u[k][i]*u[k][j];
					f= s/h
					for (k=i; k < m; k++) u[k][j]+=f*u[k][i];
				}
				for (j=i; j < m; j++) u[j][i] = u[j][i]/g;
			}
			else
				for (j=i; j < m; j++) u[j][i] = 0;
			u[i][i] += 1;
		}
		
		// diagonalization of the bidiagonal form
		prec= prec*x
		for (k=n-1; k != -1; k+= -1)
		{
			for (var iteration=0; iteration < itmax; iteration++)
			{	// test f splitting
				var test_convergence = false
				for (l=k; l != -1; l+= -1)
				{	
					if (Math.abs(e[l]) <= prec)
					{	test_convergence= true
						break 
					}
					if (Math.abs(q[l-1]) <= prec)
						break 
				}
				if (!test_convergence)
				{	// cancellation of e[l] if l>0
					c= 0.0
					s= 1.0
					var l1= l-1
					for (i =l; i<k+1; i++)
					{	
						f= s*e[i]
						e[i]= c*e[i]
						if (Math.abs(f) <= prec)
							break
						g= q[i]
						h= pythag(f,g)
						q[i]= h
						c= g/h
						s= -f/h
						for (j=0; j < m; j++)
						{	
							y= u[j][l1]
							z= u[j][i]
							u[j][l1] =  y*c+(z*s)
							u[j][i] = -y*s+(z*c)
						} 
					}	
				}
				// test f convergence
				z= q[k]
				if (l== k)
				{	//convergence
					if (z<0.0)
					{	//q[k] is made non-negative
						q[k]= -z
						for (j=0; j < n; j++)
							v[j][k] = -v[j][k]
					}
					break  //break out of iteration loop and move on to next k value
				}
				if (iteration >= itmax-1)
					throw 'Error: no convergence.'
				// shift from bottom 2x2 minor
				x= q[l]
				y= q[k-1]
				g= e[k-1]
				h= e[k]
				f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
				g= pythag(f,1.0)
				if (f < 0.0)
					f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
				else
					f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
				// next QR transformation
				c= 1.0
				s= 1.0
				for (i=l+1; i< k+1; i++)
				{	
					g= e[i]
					y= q[i]
					h= s*g
					g= c*g
					z= pythag(f,h)
					e[i-1]= z
					c= f/z
					s= h/z
					f= x*c+g*s
					g= -x*s+g*c
					h= y*s
					y= y*c
					for (j=0; j < n; j++)
					{	
						x= v[j][i-1]
						z= v[j][i]
						v[j][i-1] = x*c+z*s
						v[j][i] = -x*s+z*c
					}
					z= pythag(f,h)
					q[i-1]= z
					c= f/z
					s= h/z
					f= c*g+s*y
					x= -s*g+c*y
					for (j=0; j < m; j++)
					{
						y= u[j][i-1]
						z= u[j][i]
						u[j][i-1] = y*c+z*s
						u[j][i] = -y*s+z*c
					}
				}
				e[l]= 0.0
				e[k]= f
				q[k]= x
			} 
		}
			
		//vt= transpose(v)
		//return (u,q,vt)
		for (i=0;i<q.length; i++) 
		  if (q[i] < prec) q[i] = 0
		  
		//sort eigenvalues	
		for (i=0; i< n; i++)
		{	 
		//writeln(q)
		 for (j=i-1; j >= 0; j--)
		 {
		  if (q[j] < q[i])
		  {
		//  writeln(i,'-',j)
		   c = q[j]
		   q[j] = q[i]
		   q[i] = c
		   for(k=0;k<u.length;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
		   for(k=0;k<v.length;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
	//	   u.swapCols(i,j)
	//	   v.swapCols(i,j)
		   i = j	   
		  }
		 }	
		}
		
		return {U:u,S:q,V:v}
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska - http://alessaska.cz/
	 */
	
	var _class = function () {
	  function _class() {
	    _classCallCheck(this, _class);
	  }
	
	  _createClass(_class, null, [{
	    key: "edgeSource",
	    value: function edgeSource(e) {
	      if (e.source.source) {
	        //source is edge
	        var s = this.edgeSource(e.source);
	        var t = this.edgeTarget(e.source);
	
	        return {
	          x: (s.x + t.x) / 2,
	          y: (s.y + t.y) / 2,
	          uniqid: e.uniqid,
	          index: e.index,
	          is_edge: true,
	          e: e.source
	        };
	      }
	
	      return e.source;
	    }
	  }, {
	    key: "edgeTarget",
	    value: function edgeTarget(e) {
	      if (e.target.source) {
	        //target is edge
	        var s = this.edgeSource(e.target);
	        var t = this.edgeTarget(e.target);
	
	        return {
	          x: (s.x + t.x) / 2,
	          y: (s.y + t.y) / 2,
	          uniqid: e.uniqid,
	          index: e.index,
	          is_edge: true,
	          e: e.target
	        };
	      }
	
	      return e.target;
	    }
	  }, {
	    key: "getCurveShift",
	    value: function getCurveShift(e, r) {
	      r = r || {};
	      r.x = r.y = r.cx = r.cy = 0;
	      if (!e) return r;
	      if (e.t && e.t >= 1) {
	        //curve or circle
	        if (e.t >= 2) {
	          //circle
	          var s = this.edgeSource(e);
	          var d = s.y < 0.5 ? 1 : -1;
	
	          r.cx = d * 1.25;
	          r.cy = 0;
	        } else {
	          var se = this.edgeSource(e);
	          var te = this.edgeTarget(e);
	
	          r.x = se.x - te.x;
	          r.y = se.y - te.y;
	        }
	      }
	      return r;
	    }
	  }]);
	
	  return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _rbush = __webpack_require__(22);
	
	var _rbush2 = _interopRequireDefault(_rbush);
	
	var _geomutils = __webpack_require__(20);
	
	var _geomutils2 = _interopRequireDefault(_geomutils);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _primitiveTools = __webpack_require__(8);
	
	var _geomtools = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska - http://alessaska.cz/
	 */
	
	var ct = {};
	function getEdgeShift(context, screensize, e, ct) {
	  _geomutils2.default.getCurveShift(e, ct); //get shift because of edge-to-edge functionality
	
	
	  //compute all transformations made in the vertex shader
	  var ctx = void 0,
	      cty = void 0,
	      citx = void 0,
	      city = void 0;
	
	  ctx = -ct.y;
	  cty = ct.x * context.aspect2;
	
	  var len2 = ctx * context.width * ctx * context.width + cty * context.height * cty * context.height;
	
	  if ((0, _geomtools.eq)(len2, 0)) {
	    ctx = 0;
	    cty = 0;
	  } else {
	    var len = Math.sqrt(len2);
	    ctx *= context.curveExc * 0.25 * screensize / len;
	    cty *= context.curveExc * 0.25 * screensize / len;
	  }
	
	  var sizex = 2.5 * context.nodeSize * screensize / context.width;
	  var sizey = 2.5 * context.nodeSize * screensize / context.height;
	  citx = -ct.cy * 0.5 * sizex;
	  city = ct.cx * 0.5 * sizey;
	
	  ct.x = ctx + citx;
	  ct.y = cty + city;
	}
	
	var Node = function () {
	  function Node(n) {
	    _classCallCheck(this, Node);
	
	    this.e = n;
	  }
	
	  _createClass(Node, [{
	    key: 'getBBox',
	    value: function getBBox() {
	      return [this.e.x - _geomtools.EPS, this.e.y - _geomtools.EPS, this.e.x + _geomtools.EPS, this.e.y + _geomtools.EPS];
	    }
	  }, {
	    key: 'intersectsRect',
	    value: function intersectsRect(x1, y1, x2, y2) {
	      return (0, _geomtools.pointInRect)(this.e.x, this.e.y, x1, y1, x2, y2);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context) {
	      return (0, _geomtools.distance2)(x, y, this.e.x, this.e.y);
	    }
	  }, {
	    key: 'isNode',
	    get: function get() {
	      return true;
	    }
	  }]);
	
	  return Node;
	}();
	
	var Label = function () {
	  function Label(n, textpos, style, fontSize, isSDF, getLabelSize) {
	    _classCallCheck(this, Label);
	
	    this.e = n;
	    this.pos = textpos;
	    this.style = style;
	    this.fontSize = fontSize;
	    this.isSDF = isSDF;
	    this.getLabelSize = getLabelSize;
	  }
	
	  _createClass(Label, [{
	    key: 'getTextPos',
	    value: function getTextPos(context, size) {
	      var x = this.e.x;
	      var y = this.e.y;
	
	      var x1 = void 0,
	          y1 = void 0,
	          x2 = void 0,
	          y2 = void 0;
	      x1 = x2 = x;
	      y1 = y2 = y;
	
	      var wantedSize = this.isSDF ? this.getLabelSize(context, this.style.label || {}) : this.fontSize;
	
	      var fontScale = wantedSize / this.fontSize;
	      if (wantedSize === 0) {
	        fontScale = 0;
	      };
	
	      var step = function step(edge, x) {
	        return x < edge ? 0 : 1;
	      };
	
	      var offset = 0.5 * context.nodeSize;
	      var MAX = 10.;
	      var MIN = -10.;
	      var bbox = [MAX, MAX, MIN, MIN];
	
	      this.pos.forEach(function (c) {
	        var offsety = (2.0 * step(y, 0.5) - 1.0) * offset;
	        x1 = x + size * (c.dx * fontScale) / context.width / 2;
	        y1 = y + size * (c.dy * fontScale + offsety) / context.height / 2;
	        x2 = x + size * ((c.dx + c.width) * fontScale) / context.width / 2;
	        y2 = y + size * ((c.dy + c.height) * fontScale + offsety) / context.height / 2;
	
	        bbox[0] = Math.min(x1, bbox[0]);
	        bbox[1] = Math.min(y1, bbox[1]);
	        bbox[2] = Math.max(x2, bbox[2]);
	        bbox[3] = Math.max(y2, bbox[3]);
	      });
	
	      return bbox;
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox(context) {
	      var bb = this.getTextPos(context, 1);
	      bb[0] = Math.min(bb[0], this.e.x);
	      bb[1] = Math.min(bb[1], this.e.y);
	      bb[2] = Math.max(bb[2], this.e.x);
	      bb[3] = Math.max(bb[3], this.e.y);
	      return bb;
	    }
	  }, {
	    key: 'intersectsRect',
	    value: function intersectsRect(x1, y1, x2, y2, context, size) {
	      var t = this.getTextPos(context, size);
	      return (0, _geomtools.rectIntersectsRect)(x1, y1, x2, y2, t[0], t[1], t[2], t[3]);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context, size) {
	      var t = this.getTextPos(context, size);
	
	      if ((0, _geomtools.pointInRect)(x, y, t[0], t[1], t[2], t[3])) return 0;
	
	      //minimum from distance from corners or distance from borders
	      return Math.min((0, _geomtools.distance2)(t[0], t[1]), (0, _geomtools.distance2)(t[2], t[3]), (0, _geomtools.distance2)(t[0], t[3]), (0, _geomtools.distance2)(t[2], t[1]), (0, _geomtools.pDistance2)(x, y, t[0], t[1], t[2], t[1]), (0, _geomtools.pDistance2)(x, y, t[0], t[3], t[2], t[3]), (0, _geomtools.pDistance2)(x, y, t[0], t[1], t[0], t[3]), (0, _geomtools.pDistance2)(x, y, t[2], t[1], t[2], t[3]));
	    }
	  }, {
	    key: 'isLabel',
	    get: function get() {
	      return true;
	    }
	  }]);
	
	  return Label;
	}();
	
	var Line = function () {
	  function Line(l) {
	    _classCallCheck(this, Line);
	
	    this.e = l;
	  }
	
	  _createClass(Line, [{
	    key: 'getPoints',
	    value: function getPoints(context, size) {
	      var x1 = void 0,
	          y1 = void 0,
	          x2 = void 0,
	          y2 = void 0;
	
	      var s = _geomutils2.default.edgeSource(this.e);
	      var t = _geomutils2.default.edgeTarget(this.e);
	
	      x1 = s.x;
	      y1 = s.y;
	      x2 = t.x;
	      y2 = t.y;
	
	      getEdgeShift(context, size, s.e, ct);
	      x1 += ct.x;
	      y1 += ct.y;
	      getEdgeShift(context, size, t.e, ct);
	      x2 += ct.x;
	      y2 += ct.y;
	
	      return [x1, y1, x2, y2];
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox(context, size) {
	      var p = this.getPoints(context, size);
	
	      return [Math.min(p[0], p[2]), Math.min(p[1], p[3]), Math.max(p[0], p[2]), Math.max(p[1], p[3])];
	    }
	  }, {
	    key: 'intersectsRect',
	    value: function intersectsRect(x1, y1, x2, y2, context, size) {
	      var p = this.getPoints(context, size);
	
	      return (0, _geomtools.lineIntersectsRect)(p[0], p[1], p[2], p[3], x1, y1, x2, y2);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context, size) {
	      var p = this.getPoints(context, size);
	
	      return (0, _geomtools.pDistance2)(x, y, p[0], p[1], p[2], p[3]);
	    }
	  }, {
	    key: 'isEdge',
	    get: function get() {
	      return true;
	    }
	  }]);
	
	  return Line;
	}();
	
	var Circle = function () {
	  function Circle(c) {
	    _classCallCheck(this, Circle);
	
	    this.e = c;
	  }
	
	  _createClass(Circle, [{
	    key: 'getBezierPoints',
	    value: function getBezierPoints(context, screensize) {
	      var x1 = void 0,
	          y1 = void 0,
	          s = void 0;
	      s = _geomutils2.default.edgeSource(this.e);
	      x1 = s.x;
	      y1 = s.y;
	
	      var size = 2.5 * context.nodeSize * screensize;
	      var xsize = size / context.width / 2;
	      var ysize = size / context.height / 2;
	
	      var d = s.y < 0.5 ? 1 : -1;
	
	      getEdgeShift(context, screensize, s.e, ct);
	      x1 += ct.x;
	      y1 += ct.y;
	
	      return [x1, y1, x1 + xsize * 1, y1 + ysize * d, x1, y1 + ysize * 1.25 * d, x1 - xsize * 1, y1 + ysize * d];
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox(context, size) {
	      var v = this.getBezierPoints(context, size);
	
	      return (0, _geomtools.getBBFromPoints)(v);
	    }
	  }, {
	    key: 'intersectsRect',
	    value: function intersectsRect(x1, y1, x2, y2, context, size, normalize) {
	      var v = this.getBezierPoints(context, size);
	      return (0, _geomtools.bezierIntersectsRect)(v[0], v[1], v[2], v[3], v[4], v[5], x1, y1, x2, y2) || (0, _geomtools.bezierIntersectsRect)(v[2], v[3], v[4], v[5], v[6], v[7], x1, y1, x2, y2);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context, size) {
	      var v = this.getBezierPoints(context, size);
	
	      //circle is just 2 bezier curves :)
	      var d1 = (0, _geomtools.distance2ToBezier)(x, y, v[0], v[1], v[2], v[3], v[4], v[5]);
	      var d2 = (0, _geomtools.distance2ToBezier)(x, y, v[2], v[3], v[4], v[5], v[6], v[7]);
	
	      return Math.min(d1, d2);
	    }
	  }, {
	    key: 'isEdge',
	    get: function get() {
	      return true;
	    }
	  }]);
	
	  return Circle;
	}();
	
	var Curve = function () {
	  function Curve(c) {
	    _classCallCheck(this, Curve);
	
	    this.e = c;
	  }
	
	  _createClass(Curve, [{
	    key: 'getBezierPoints',
	    value: function getBezierPoints(context, size, normalize) {
	      var x1 = void 0,
	          x2 = void 0,
	          y1 = void 0,
	          y2 = void 0;
	      var s = _geomutils2.default.edgeSource(this.e);
	      var t = _geomutils2.default.edgeTarget(this.e);
	
	      x1 = s.x;
	      y1 = s.y;
	      x2 = t.x;
	      y2 = t.y;
	
	      var d = normalize(s, t);
	
	      var n2 = d.y;
	      var n3 = context.aspect2 * -d.x;
	
	      var x = context.width * n2;
	      var y = context.height * n3;
	      var l = Math.sqrt(x * x + y * y) * 2;
	
	      n2 *= context.curveExc * size / l;
	      n3 *= context.curveExc * size / l;
	
	      getEdgeShift(context, size, s.e, ct);
	      x1 += ct.x;
	      y1 += ct.y;
	      getEdgeShift(context, size, t.e, ct);
	      x2 += ct.x;
	      y2 += ct.y;
	
	      var ret = [x1, y1, (x1 + x2) / 2 + n2, (y1 + y2) / 2 + n3, x2, y2];
	      return ret;
	    }
	  }, {
	    key: 'intersectsRect',
	    value: function intersectsRect(x1, y1, x2, y2, context, size, normalize) {
	      var v = this.getBezierPoints(context, size, normalize);
	      return (0, _geomtools.bezierIntersectsRect)(v[0], v[1], v[2], v[3], v[4], v[5], x1, y1, x2, y2);
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox(context, size, normalize) {
	      var v = this.getBezierPoints(context, size, normalize);
	      return (0, _geomtools.getBBFromPoints)(v);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context, size, normalize) {
	      var v = this.getBezierPoints(context, size, normalize);
	      return (0, _geomtools.distance2ToBezier)(x, y, v[0], v[1], v[2], v[3], v[4], v[5]);
	    }
	  }, {
	    key: 'isEdge',
	    get: function get() {
	      return true;
	    }
	  }]);
	
	  return Curve;
	}();
	
	function sortByDistances(e1, e2) {
	  return e1.dist2 - e2.dist2;
	}
	
	var tConst = { nodes: Node, lines: Line, circles: Circle, curves: Curve, labels: Label };
	
	var spatialIndex = function () {
	  function spatialIndex(c, texts, options, nodes, nodesParts, lines, linesParts, curves, curvesParts, circles, circlesParts, normalize, nodeStyle, getLabelSize, getLabelHideScreen) {
	    _classCallCheck(this, spatialIndex);
	
	    //init all elements into rbush tree with size 1 (outer bound - the worst case)
	    var size = 1;var oldsize = c.size || 1;c.size = 1.;
	
	    this.texts = texts;
	    this.normalize = normalize;
	    var t = this.types = { nodes: [], lines: [], circles: [], curves: [], labels: [] };
	    var i = 0,
	        d = [];
	
	    var addEntity = function addEntity(e, d, i) {
	      d[i] = e.getBBox(c, size, normalize);
	      d[i].push(e);
	      return e;
	    };
	
	    nodes.forEach(function (n) {
	      t.nodes.push(addEntity(new Node(n), d, i++));
	    });
	
	    lines.forEach(function (l) {
	      t.lines.push(addEntity(new Line(l), d, i++));
	    });
	
	    circles.forEach(function (c) {
	      t.circles.push(addEntity(new Circle(c), d, i++));
	    });
	
	    curves.forEach(function (c) {
	      t.curves.push(addEntity(new Curve(c), d, i++));
	    });
	
	    var sd = {};
	    var sdi = {};
	
	    //labels position could differ by style >> must partition by it
	
	    var _loop = function _loop(style) {
	      var nodes = nodesParts[style];
	
	      var ns = (0, _primitiveTools.getPartitionStyle)(options.styles[style], nodeStyle, "label");
	      var textEngine = texts.getEngine(ns.font);
	      textEngine.setFont(ns.font);
	      var fontSize = textEngine.fontSize;
	      var isSDF = textEngine.isSDF;
	
	      var sd_n = sd[style] || (sd[style] = []);
	      var sdi_n = sdi[style] || (sdi[style] = 0);
	
	      //biggest size in which the text is shown
	      c.size = getLabelHideScreen(c, ns.label || {});
	      nodes.forEach(function (n) {
	        var textpos = textEngine.get(n.label, n.x, n.y);
	        t.labels.push(addEntity(new Label(n, textpos, ns, fontSize, isSDF, getLabelSize), sd_n, sdi_n++));
	      });
	
	      sdi[style] = sdi_n;
	    };
	
	    for (var style in nodesParts) {
	      _loop(style);
	    }
	
	    this.rbushtree_s = {};
	    for (var style in sd) {
	      var rb = this.rbushtree_s[style] = (0, _rbush2.default)();
	      rb.load(sd[style]);
	    }
	
	    //tree initialization
	    this.rbushtree = (0, _rbush2.default)();
	    this.rbushtree.load(d);
	
	    //restore the size of scale (loosen outer the upper bound)
	    c.size = oldsize;
	  }
	
	  _createClass(spatialIndex, [{
	    key: '_tryAddEl',
	    value: function _tryAddEl(ret, e, dist2, nodes, edges, labels) {
	      if (nodes && e.isNode) {
	        ret.nodes.push({ node: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
	      }
	      if (edges && e.isEdge) {
	        ret.edges.push({ edge: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
	      }
	      if (labels && e.isLabel) {
	        ret.labels.push({ label: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
	      }
	    }
	  }, {
	    key: 'findArea',
	    value: function findArea(context, x1, y1, x2, y2, size, nodes, edges, labels) {
	      if (x1 > x2) {
	        var p = x1;
	        x1 = x2;
	        x2 = p;
	      }
	      if (y1 > y2) {
	        var _p = y1;
	        y1 = y2;
	        y2 = _p;
	      }
	
	      var ret = {};
	      if (edges) ret.edges = [];
	      if (nodes) ret.nodes = [];
	      if (labels) ret.labels = [];
	
	      var x = (x1 + x2) / 2;
	      var y = (y1 + y2) / 2;
	
	      var data = this.rbushtree.search([x1 - _geomtools.EPS, y1 - _geomtools.EPS, x2 + _geomtools.EPS, y2 + _geomtools.EPS]);
	      if (labels) {
	        for (var s in this.rbushtree_s) {
	          data = data.concat(this.rbushtree_s[s].search([x1 - _geomtools.EPS, y1 - _geomtools.EPS, x2 + _geomtools.EPS, y2 + _geomtools.EPS]));
	        }
	      }
	
	      for (var i = 0; i < data.length; i++) {
	        var e = data[i][4];
	        var dist2 = e.dist2(x, y, context, size, this.normalize, this.texts);
	        if (!e.intersectsRect(x1, y1, x2, y2, context, size, this.normalize, this.texts)) continue;
	
	        this._tryAddEl(ret, e, dist2, nodes, edges, labels);
	      }
	
	      for (var k in ret) {
	        ret[k].sort(sortByDistances);
	      }
	
	      return ret;
	    }
	  }, {
	    key: 'find',
	    value: function find(context, x, y, radius, size, nodes, edges, labels) {
	      var ret = {};
	      if (edges) ret.edges = [];
	      if (nodes) ret.nodes = [];
	      if (labels) ret.labels = [];
	
	      var xradius = radius;
	      var yradius = radius;
	
	      var radius2 = radius * radius;
	
	      var data = this.rbushtree.search([x - xradius, y - yradius, x + xradius, y + yradius]);
	      if (labels) {
	        for (var s in this.rbushtree_s) {
	          data = data.concat(this.rbushtree_s[s].search([x - xradius, y - yradius, x + xradius, y + yradius]));
	        }
	      }
	
	      for (var i = 0; i < data.length; i++) {
	        var e = data[i][4];
	        var dist2 = e.dist2(x, y, context, size, this.normalize, this.texts);
	        if (dist2 > radius2) continue;
	
	        this._tryAddEl(ret, e, dist2, nodes, edges, labels);
	      }
	
	      for (var k in ret) {
	        ret[k].sort(sortByDistances);
	      }
	
	      return ret;
	    }
	  }, {
	    key: 'update',
	    value: function update(context, t, i, v) {
	      //init all elements into rbush tree with size 1 (the biggest possible - the worst case)
	      var size = 1;
	
	      this.rbushtree.remove(this.types[t][i]);
	
	      var e = new tConst[t](v);
	      var arr = e.getBBox(context, size, this.normalize, this.texts);
	      arr.push(e);
	
	      this.rbushtree.insert(this.types[t][i] = arr);
	    }
	  }]);
	
	  return spatialIndex;
	}();
	
	exports.default = spatialIndex;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	 (c) 2015, Vladimir Agafonkin
	 RBush, a JavaScript library for high-performance 2D spatial indexing of points and rectangles.
	 https://github.com/mourner/rbush
	*/
	
	function rbush(maxEntries, format) {
	    if (!(this instanceof rbush)) return new rbush(maxEntries, format);
	
	    // max entries in a node is 9 by default; min node fill is 40% for best performance
	    this._maxEntries = Math.max(4, maxEntries || 9);
	    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));
	
	    if (format) {
	        this._initFormat(format);
	    }
	
	    this.clear();
	}
	
	rbush.prototype = {
	
	    all: function all() {
	        return this._all(this.data, []);
	    },
	
	    search: function search(bbox) {
	
	        var node = this.data,
	            result = [],
	            toBBox = this.toBBox;
	
	        if (!intersects(bbox, node.bbox)) return result;
	
	        var nodesToSearch = [],
	            i,
	            len,
	            child,
	            childBBox;
	
	        while (node) {
	            for (i = 0, len = node.children.length; i < len; i++) {
	
	                child = node.children[i];
	                childBBox = node.leaf ? toBBox(child) : child.bbox;
	
	                if (intersects(bbox, childBBox)) {
	                    if (node.leaf) result.push(child);else if (contains(bbox, childBBox)) this._all(child, result);else nodesToSearch.push(child);
	                }
	            }
	            node = nodesToSearch.pop();
	        }
	
	        return result;
	    },
	
	    collides: function collides(bbox) {
	
	        var node = this.data,
	            toBBox = this.toBBox;
	
	        if (!intersects(bbox, node.bbox)) return false;
	
	        var nodesToSearch = [],
	            i,
	            len,
	            child,
	            childBBox;
	
	        while (node) {
	            for (i = 0, len = node.children.length; i < len; i++) {
	
	                child = node.children[i];
	                childBBox = node.leaf ? toBBox(child) : child.bbox;
	
	                if (intersects(bbox, childBBox)) {
	                    if (node.leaf || contains(bbox, childBBox)) return true;
	                    nodesToSearch.push(child);
	                }
	            }
	            node = nodesToSearch.pop();
	        }
	
	        return false;
	    },
	
	    load: function load(data) {
	        if (!(data && data.length)) return this;
	
	        if (data.length < this._minEntries) {
	            for (var i = 0, len = data.length; i < len; i++) {
	                this.insert(data[i]);
	            }
	            return this;
	        }
	
	        // recursively build the tree with the given data from stratch using OMT algorithm
	        var node = this._build(data.slice(), 0, data.length - 1, 0);
	
	        if (!this.data.children.length) {
	            // save as is if tree is empty
	            this.data = node;
	        } else if (this.data.height === node.height) {
	            // split root if trees have the same height
	            this._splitRoot(this.data, node);
	        } else {
	            if (this.data.height < node.height) {
	                // swap trees if inserted one is bigger
	                var tmpNode = this.data;
	                this.data = node;
	                node = tmpNode;
	            }
	
	            // insert the small tree into the large tree at appropriate level
	            this._insert(node, this.data.height - node.height - 1, true);
	        }
	
	        return this;
	    },
	
	    insert: function insert(item) {
	        if (item) this._insert(item, this.data.height - 1);
	        return this;
	    },
	
	    clear: function clear() {
	        this.data = {
	            children: [],
	            height: 1,
	            bbox: empty(),
	            leaf: true
	        };
	        return this;
	    },
	
	    remove: function remove(item) {
	        if (!item) return this;
	
	        var node = this.data,
	            bbox = this.toBBox(item),
	            path = [],
	            indexes = [],
	            i,
	            parent,
	            index,
	            goingUp;
	
	        // depth-first iterative tree traversal
	        while (node || path.length) {
	
	            if (!node) {
	                // go up
	                node = path.pop();
	                parent = path[path.length - 1];
	                i = indexes.pop();
	                goingUp = true;
	            }
	
	            if (node.leaf) {
	                // check current node
	                index = node.children.indexOf(item);
	
	                if (index !== -1) {
	                    // item found, remove the item and condense tree upwards
	                    node.children.splice(index, 1);
	                    path.push(node);
	                    this._condense(path);
	                    return this;
	                }
	            }
	
	            if (!goingUp && !node.leaf && contains(node.bbox, bbox)) {
	                // go down
	                path.push(node);
	                indexes.push(i);
	                i = 0;
	                parent = node;
	                node = node.children[0];
	            } else if (parent) {
	                // go right
	                i++;
	                node = parent.children[i];
	                goingUp = false;
	            } else node = null; // nothing found
	        }
	
	        return this;
	    },
	
	    toBBox: function toBBox(item) {
	        return item;
	    },
	
	    compareMinX: function compareMinX(a, b) {
	        return a[0] - b[0];
	    },
	    compareMinY: function compareMinY(a, b) {
	        return a[1] - b[1];
	    },
	
	    toJSON: function toJSON() {
	        return this.data;
	    },
	
	    fromJSON: function fromJSON(data) {
	        this.data = data;
	        return this;
	    },
	
	    _all: function _all(node, result) {
	        var nodesToSearch = [];
	        while (node) {
	            if (node.leaf) result.push.apply(result, node.children);else nodesToSearch.push.apply(nodesToSearch, node.children);
	
	            node = nodesToSearch.pop();
	        }
	        return result;
	    },
	
	    _build: function _build(items, left, right, height) {
	
	        var N = right - left + 1,
	            M = this._maxEntries,
	            node;
	
	        if (N <= M) {
	            // reached leaf level; return leaf
	            node = {
	                children: items.slice(left, right + 1),
	                height: 1,
	                bbox: null,
	                leaf: true
	            };
	            calcBBox(node, this.toBBox);
	            return node;
	        }
	
	        if (!height) {
	            // target height of the bulk-loaded tree
	            height = Math.ceil(Math.log(N) / Math.log(M));
	
	            // target number of root entries to maximize storage utilization
	            M = Math.ceil(N / Math.pow(M, height - 1));
	        }
	
	        node = {
	            children: [],
	            height: height,
	            bbox: null,
	            leaf: false
	        };
	
	        // split the items into M mostly square tiles
	
	        var N2 = Math.ceil(N / M),
	            N1 = N2 * Math.ceil(Math.sqrt(M)),
	            i,
	            j,
	            right2,
	            right3;
	
	        multiSelect(items, left, right, N1, this.compareMinX);
	
	        for (i = left; i <= right; i += N1) {
	
	            right2 = Math.min(i + N1 - 1, right);
	
	            multiSelect(items, i, right2, N2, this.compareMinY);
	
	            for (j = i; j <= right2; j += N2) {
	
	                right3 = Math.min(j + N2 - 1, right2);
	
	                // pack each entry recursively
	                node.children.push(this._build(items, j, right3, height - 1));
	            }
	        }
	
	        calcBBox(node, this.toBBox);
	
	        return node;
	    },
	
	    _chooseSubtree: function _chooseSubtree(bbox, node, level, path) {
	
	        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;
	
	        while (true) {
	            path.push(node);
	
	            if (node.leaf || path.length - 1 === level) break;
	
	            minArea = minEnlargement = Infinity;
	
	            for (i = 0, len = node.children.length; i < len; i++) {
	                child = node.children[i];
	                area = bboxArea(child.bbox);
	                enlargement = enlargedArea(bbox, child.bbox) - area;
	
	                // choose entry with the least area enlargement
	                if (enlargement < minEnlargement) {
	                    minEnlargement = enlargement;
	                    minArea = area < minArea ? area : minArea;
	                    targetNode = child;
	                } else if (enlargement === minEnlargement) {
	                    // otherwise choose one with the smallest area
	                    if (area < minArea) {
	                        minArea = area;
	                        targetNode = child;
	                    }
	                }
	            }
	
	            node = targetNode || node.children[0];
	        }
	
	        return node;
	    },
	
	    _insert: function _insert(item, level, isNode) {
	
	        var toBBox = this.toBBox,
	            bbox = isNode ? item.bbox : toBBox(item),
	            insertPath = [];
	
	        // find the best node for accommodating the item, saving all nodes along the path too
	        var node = this._chooseSubtree(bbox, this.data, level, insertPath);
	
	        // put the item into the node
	        node.children.push(item);
	        extend(node.bbox, bbox);
	
	        // split on node overflow; propagate upwards if necessary
	        while (level >= 0) {
	            if (insertPath[level].children.length > this._maxEntries) {
	                this._split(insertPath, level);
	                level--;
	            } else break;
	        }
	
	        // adjust bboxes along the insertion path
	        this._adjustParentBBoxes(bbox, insertPath, level);
	    },
	
	    // split overflowed node into two
	    _split: function _split(insertPath, level) {
	
	        var node = insertPath[level],
	            M = node.children.length,
	            m = this._minEntries;
	
	        this._chooseSplitAxis(node, m, M);
	
	        var splitIndex = this._chooseSplitIndex(node, m, M);
	
	        var newNode = {
	            children: node.children.splice(splitIndex, node.children.length - splitIndex),
	            height: node.height,
	            bbox: null,
	            leaf: false
	        };
	
	        if (node.leaf) newNode.leaf = true;
	
	        calcBBox(node, this.toBBox);
	        calcBBox(newNode, this.toBBox);
	
	        if (level) insertPath[level - 1].children.push(newNode);else this._splitRoot(node, newNode);
	    },
	
	    _splitRoot: function _splitRoot(node, newNode) {
	        // split root node
	        this.data = {
	            children: [node, newNode],
	            height: node.height + 1,
	            bbox: null,
	            leaf: false
	        };
	        calcBBox(this.data, this.toBBox);
	    },
	
	    _chooseSplitIndex: function _chooseSplitIndex(node, m, M) {
	
	        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;
	
	        minOverlap = minArea = Infinity;
	
	        for (i = m; i <= M - m; i++) {
	            bbox1 = distBBox(node, 0, i, this.toBBox);
	            bbox2 = distBBox(node, i, M, this.toBBox);
	
	            overlap = intersectionArea(bbox1, bbox2);
	            area = bboxArea(bbox1) + bboxArea(bbox2);
	
	            // choose distribution with minimum overlap
	            if (overlap < minOverlap) {
	                minOverlap = overlap;
	                index = i;
	
	                minArea = area < minArea ? area : minArea;
	            } else if (overlap === minOverlap) {
	                // otherwise choose distribution with minimum area
	                if (area < minArea) {
	                    minArea = area;
	                    index = i;
	                }
	            }
	        }
	
	        return index;
	    },
	
	    // sorts node children by the best axis for split
	    _chooseSplitAxis: function _chooseSplitAxis(node, m, M) {
	
	        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
	            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
	            xMargin = this._allDistMargin(node, m, M, compareMinX),
	            yMargin = this._allDistMargin(node, m, M, compareMinY);
	
	        // if total distributions margin value is minimal for x, sort by minX,
	        // otherwise it's already sorted by minY
	        if (xMargin < yMargin) node.children.sort(compareMinX);
	    },
	
	    // total margin of all possible split distributions where each node is at least m full
	    _allDistMargin: function _allDistMargin(node, m, M, compare) {
	
	        node.children.sort(compare);
	
	        var toBBox = this.toBBox,
	            leftBBox = distBBox(node, 0, m, toBBox),
	            rightBBox = distBBox(node, M - m, M, toBBox),
	            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
	            i,
	            child;
	
	        for (i = m; i < M - m; i++) {
	            child = node.children[i];
	            extend(leftBBox, node.leaf ? toBBox(child) : child.bbox);
	            margin += bboxMargin(leftBBox);
	        }
	
	        for (i = M - m - 1; i >= m; i--) {
	            child = node.children[i];
	            extend(rightBBox, node.leaf ? toBBox(child) : child.bbox);
	            margin += bboxMargin(rightBBox);
	        }
	
	        return margin;
	    },
	
	    _adjustParentBBoxes: function _adjustParentBBoxes(bbox, path, level) {
	        // adjust bboxes along the given tree path
	        for (var i = level; i >= 0; i--) {
	            extend(path[i].bbox, bbox);
	        }
	    },
	
	    _condense: function _condense(path) {
	        // go through the path, removing empty nodes and updating bboxes
	        for (var i = path.length - 1, siblings; i >= 0; i--) {
	            if (path[i].children.length === 0) {
	                if (i > 0) {
	                    siblings = path[i - 1].children;
	                    siblings.splice(siblings.indexOf(path[i]), 1);
	                } else this.clear();
	            } else calcBBox(path[i], this.toBBox);
	        }
	    },
	
	    _initFormat: function _initFormat(format) {
	        // data format (minX, minY, maxX, maxY accessors)
	
	        // uses eval-type function compilation instead of just accepting a toBBox function
	        // because the algorithms are very sensitive to sorting functions performance,
	        // so they should be dead simple and without inner calls
	
	        var compareArr = ['return a', ' - b', ';'];
	
	        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
	        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));
	
	        this.toBBox = new Function('a', 'return [a' + format.join(', a') + '];');
	    }
	};
	
	// calculate node's bbox from bboxes of its children
	function calcBBox(node, toBBox) {
	    node.bbox = distBBox(node, 0, node.children.length, toBBox);
	}
	
	// min bounding rectangle of node children from k to p-1
	function distBBox(node, k, p, toBBox) {
	    var bbox = empty();
	
	    for (var i = k, child; i < p; i++) {
	        child = node.children[i];
	        extend(bbox, node.leaf ? toBBox(child) : child.bbox);
	    }
	
	    return bbox;
	}
	
	function empty() {
	    return [Infinity, Infinity, -Infinity, -Infinity];
	}
	
	function extend(a, b) {
	    a[0] = Math.min(a[0], b[0]);
	    a[1] = Math.min(a[1], b[1]);
	    a[2] = Math.max(a[2], b[2]);
	    a[3] = Math.max(a[3], b[3]);
	    return a;
	}
	
	function compareNodeMinX(a, b) {
	    return a.bbox[0] - b.bbox[0];
	}
	function compareNodeMinY(a, b) {
	    return a.bbox[1] - b.bbox[1];
	}
	
	function bboxArea(a) {
	    return (a[2] - a[0]) * (a[3] - a[1]);
	}
	function bboxMargin(a) {
	    return a[2] - a[0] + (a[3] - a[1]);
	}
	
	function enlargedArea(a, b) {
	    return (Math.max(b[2], a[2]) - Math.min(b[0], a[0])) * (Math.max(b[3], a[3]) - Math.min(b[1], a[1]));
	}
	
	function intersectionArea(a, b) {
	    var minX = Math.max(a[0], b[0]),
	        minY = Math.max(a[1], b[1]),
	        maxX = Math.min(a[2], b[2]),
	        maxY = Math.min(a[3], b[3]);
	
	    return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
	}
	
	function contains(a, b) {
	    return a[0] <= b[0] && a[1] <= b[1] && b[2] <= a[2] && b[3] <= a[3];
	}
	
	function intersects(a, b) {
	    return b[0] <= a[2] && b[1] <= a[3] && b[2] >= a[0] && b[3] >= a[1];
	}
	
	// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
	// combines selection algorithm with binary divide & conquer approach
	
	function multiSelect(arr, left, right, n, compare) {
	    var stack = [left, right],
	        mid;
	
	    while (stack.length) {
	        right = stack.pop();
	        left = stack.pop();
	
	        if (right - left <= n) continue;
	
	        mid = left + Math.ceil((right - left) / n / 2) * n;
	        select(arr, left, right, mid, compare);
	
	        stack.push(left, mid, mid, right);
	    }
	}
	
	// Floyd-Rivest selection algorithm:
	// sort an array between left and right (inclusive) so that the smallest k elements come first (unordered)
	function select(arr, left, right, k, compare) {
	    var n, i, z, s, sd, newLeft, newRight, t, j;
	
	    while (right > left) {
	        if (right - left > 600) {
	            n = right - left + 1;
	            i = k - left + 1;
	            z = Math.log(n);
	            s = 0.5 * Math.exp(2 * z / 3);
	            sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (i - n / 2 < 0 ? -1 : 1);
	            newLeft = Math.max(left, Math.floor(k - i * s / n + sd));
	            newRight = Math.min(right, Math.floor(k + (n - i) * s / n + sd));
	            select(arr, newLeft, newRight, k, compare);
	        }
	
	        t = arr[k];
	        i = left;
	        j = right;
	
	        swap(arr, left, k);
	        if (compare(arr[right], t) > 0) swap(arr, left, right);
	
	        while (i < j) {
	            swap(arr, i, j);
	            i++;
	            j--;
	            while (compare(arr[i], t) < 0) {
	                i++;
	            }while (compare(arr[j], t) > 0) {
	                j--;
	            }
	        }
	
	        if (compare(arr[left], t) === 0) swap(arr, left, j);else {
	            j++;
	            swap(arr, j, right);
	        }
	
	        if (j <= k) left = j + 1;
	        if (k <= j) right = j - 1;
	    }
	}
	
	function swap(arr, i, j) {
	    var tmp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = tmp;
	}
	
	exports.default = rbush;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.neq = exports.eq = exports.getBBFromPoints = exports.pDistance2 = exports.distance2 = exports.distance2ToBezier = exports.pointInRect = exports.rectIntersectsRect = exports.lineIntersectsRect = exports.bezierIntersectsLine = exports.bezierIntersectsRect = exports.EPS = undefined;
	
	var _rbush = __webpack_require__(22);
	
	var _rbush2 = _interopRequireDefault(_rbush);
	
	var _geomutils = __webpack_require__(20);
	
	var _geomutils2 = _interopRequireDefault(_geomutils);
	
	var _primitiveTools = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska - http://alessaska.cz/
	 */
	
	var EPS = Number.EPSILON || 1e-14;
	
	//solving cube analyticaly for bezier curves
	function cuberoot(x) {
	  var y = Math.pow(Math.abs(x), 1 / 3);
	  return x < 0 ? -y : y;
	}
	
	function solveCubic(a, b, c, d) {
	  if (Math.abs(a) < 1e-8) {
	    // Quadratic case, ax^2+bx+c=0
	    a = b;b = c;c = d;
	    if (Math.abs(a) < 1e-8) {
	      // Linear case, ax+b=0
	      a = b;b = c;
	      if (Math.abs(a) < 1e-8) // Degenerate case
	        return [];
	      return [-b / a];
	    }
	
	    var D = b * b - 4 * a * c;
	    if (Math.abs(D) < 1e-8) return [-b / (2 * a)];else if (D > 0) return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
	    return [];
	  }
	
	  // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
	  var p = (3 * a * c - b * b) / (3 * a * a);
	  var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
	  var roots = void 0;
	
	  if (Math.abs(p) < 1e-8) {
	    // p = 0 -> t^3 = -q -> t = -q^1/3
	    roots = [cuberoot(-q)];
	  } else if (Math.abs(q) < 1e-8) {
	    // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
	    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
	  } else {
	    var _D = q * q / 4 + p * p * p / 27;
	    if (Math.abs(_D) < 1e-8) {
	      // D = 0 -> two roots
	      roots = [-1.5 * q / p, 3 * q / p];
	    } else if (_D > 0) {
	      // Only one real root
	      var u = cuberoot(-q / 2 - Math.sqrt(_D));
	      roots = [u - p / (3 * u)];
	    } else {
	      // D < 0, three roots, but needs to use complex numbers/trigonometric solution
	      var _u = 2 * Math.sqrt(-p / 3);
	      var t = Math.acos(3 * q / p / _u) / 3; // D < 0 implies p < 0 and acos argument in [-1..1]
	      var k = 2 * Math.PI / 3;
	      roots = [_u * Math.cos(t), _u * Math.cos(t - k), _u * Math.cos(t - 2 * k)];
	    }
	  }
	
	  // Convert back from depressed cubic
	  for (var i = 0; i < roots.length; i++) {
	    roots[i] -= b / (3 * a);
	  }return roots;
	}
	
	//function distanceToBezier(x,y,ax,ay,bx,by,cx,cy){
	function distance2ToBezier(x, y, a, d, b, e, c, f) {
	  //based on compute derivation of: d/dt ((X - (a*(1-t)*(1-t)+2*b*t*(1-t)+c*t*t))^2 + (Y - (d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t))^2)
	
	  var A = 4 * a * a - 16 * a * b + 8 * a * c + 16 * b * b - 16 * b * c + 4 * c * c + 4 * d * d - 16 * d * e + 8 * d * f + 16 * e * e - 16 * e * f + 4 * f * f;
	  var B = -12 * a * a + 36 * a * b - 12 * a * c - 24 * b * b + 12 * b * c - 12 * d * d + 36 * d * e - 12 * d * f - 24 * e * e + 12 * e * f;
	  var C = 12 * a * a - 24 * a * b + 4 * a * c - 4 * a * x + 8 * b * b + 8 * b * x - 4 * c * x + 12 * d * d - 24 * d * e + 4 * d * f - 4 * d * y + 8 * e * e + 8 * e * y - 4 * f * y;
	  var D = -4 * a * a + 4 * a * b + 4 * a * x - 4 * b * x - 4 * d * d + 4 * d * e + 4 * d * y - 4 * e * y;
	
	  var eqresult = solveCubic(A, B, C, D);
	
	  //loop through all possible solitions to find out which point is the nearest
	  var mindist = Infinity;
	  for (var i = 0; i < eqresult.length; i++) {
	    var t = eqresult[i];
	
	    if (t < 0 || t > 1) continue;
	
	    //point at bezier curve
	    var px = a * (1 - t) * (1 - t) + 2 * b * t * (1 - t) + c * t * t;
	    var py = d * (1 - t) * (1 - t) + 2 * e * t * (1 - t) + f * t * t;
	
	    var dist = distance2(x, y, px, py);
	    if (dist < mindist) mindist = dist;
	  }
	
	  return mindist;
	}
	
	/*
	 * @param v - array of with points [x1,y1,x2,y2 .... ]
	 * @return array representing bounding box [x1,y1,x2,y2]
	 */
	function getBBFromPoints(v) {
	  var xmin = Infinity;
	  var xmax = -xmin;
	  var ymin = Infinity;
	  var ymax = -ymin;
	
	  //x of points - even indexes in array 
	  for (var i = 0; i < v.length; i += 2) {
	    var val = v[i];
	    if (val < xmin) xmin = val;
	    if (val > xmax) xmax = val;
	  }
	
	  //y of points - odd indexes in array 
	  for (var _i = 1; _i < v.length; _i += 2) {
	    var _val = v[_i];
	    if (_val < ymin) ymin = _val;
	    if (_val > ymax) ymax = _val;
	  }
	
	  return [xmin, ymin, xmax, ymax];
	}
	
	//distance from point to point
	function distance2(x1, y1, x2, y2) {
	  var dx = x1 - x2;
	  var dy = y1 - y2;
	  return dx * dx + dy * dy;
	}
	
	//distance from point to line
	function pDistance2(x, y, x1, y1, x2, y2) {
	  var A = x - x1;
	  var B = y - y1;
	  var C = x2 - x1;
	  var D = y2 - y1;
	
	  var dot = A * C + B * D;
	  var len_sq = C * C + D * D;
	  var param = -1;
	  if (len_sq != 0) //in case of 0 length line
	    param = dot / len_sq;
	
	  var xx = void 0,
	      yy = void 0;
	
	  if (param < 0) {
	    xx = x1;
	    yy = y1;
	  } else if (param > 1) {
	    xx = x2;
	    yy = y2;
	  } else {
	    xx = x1 + param * C;
	    yy = y1 + param * D;
	  }
	
	  return distance2(x, y, xx, yy);
	}
	
	function lineIntersectsLine(l1p1x, l1p1y, l1p2x, l1p2y, l2p1x, l2p1y, l2p2x, l2p2y) {
	  var q = (l1p1y - l2p1y) * (l2p2x - l2p1x) - (l1p1x - l2p1x) * (l2p2y - l2p1y);
	  var d = (l1p2x - l1p1x) * (l2p2y - l2p1y) - (l1p2y - l1p1y) * (l2p2x - l2p1x);
	
	  if (d == 0) {
	    return false;
	  }
	
	  var r = q / d;
	
	  q = (l1p1y - l2p1y) * (l1p2x - l1p1x) - (l1p1x - l2p1x) * (l1p2y - l1p1y);
	  var s = q / d;
	
	  if (r < 0 || r > 1 || s < 0 || s > 1) {
	    return false;
	  }
	
	  return true;
	}
	
	function pointInRect(px, py, x1, y1, x2, y2) {
	  return px >= x1 - EPS && px <= x2 + EPS && py >= y1 - EPS && py <= y2 + EPS;
	}
	
	function rectIntersectsRect(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r2y) {
	  return p1x <= r2x && p1y <= r2y && p2x >= r1x && p2y >= r1y;
	}
	
	function lineIntersectsRect(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r2y) {
	  if (pointInRect(p1x, p1y, r1x, r1y, r2x, r2y) || pointInRect(p2x, p2y, r1x, r1y, r2x, r2y)) return true;
	
	  return lineIntersectsLine(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r1y) || lineIntersectsLine(p1x, p1y, p2x, p2y, r2x, r1y, r2x, r2y) || lineIntersectsLine(p1x, p1y, p2x, p2y, r2x, r2y, r1x, r2y) || lineIntersectsLine(p1x, p1y, p2x, p2y, r1x, r2y, r1x, r1y);
	}
	
	function eq(a, b) {
	  return a >= b - EPS && a <= b + EPS;
	}
	
	function neq(a, b) {
	  return !eq(a, b);
	}
	
	function checkBezierTkoef(a, d, b, e, c, f, t, q, s, r, v) {
	  if (t < 0 || t > 1) return false;
	
	  if (neq(v - s, 0)) {
	    var x = (d * (1 - t) * (1 - t) + 2 * e * t * (1 - t) + f * t * t) / (v - s);
	    if (x < 0 || x > 1) return false;
	  }
	
	  return true;
	}
	
	function bezierIntersectsLine(a, d, b, e, c, f, q, s, r, v) {
	  //based on wolfram alpha: >> solve ((d*(1-x)*(1-x)+2*e*x*(1-x)+f*x*x) = s + ((-a*(x-1)*(x-1) + x*(2*b*(x-1)-c*x)+q)/(q-r))*(v - s)) for x <<
	
	  var t = void 0;
	
	  var tden = -a * s + a * v + 2 * b * s - 2 * b * v - c * s + c * v + d * q - d * r - 2 * e * q + 2 * e * r + f * q - f * r;
	  if (neq(tden, 0)) {
	    if (neq(q - r, 0)) {
	      var sq1 = 2 * a * s - 2 * a * v - 2 * b * s + 2 * b * v - 2 * d * r + 2 * e * q - 2 * e * r;
	      var sq = sq1 * sq1 - 4 * (-a * s + a * v + d * q - d * r - q * v + r * s) * (-a * s + a * v + 2 * b * s - 2 * b * v - c * s + c * v + d * q - d * r - 2 * e * q + 2 * e * r + f * q - f * r);
	      if (sq >= 0) {
	        var t1 = a * s - a * v - b * s + b * v - d * q + d * r + e * q - e * r;
	
	        t = (t1 - 0.5 * Math.sqrt(sq)) / tden;
	        if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
	
	        t = (t1 + 0.5 * Math.sqrt(sq)) / tden;
	        if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
	      }
	    }
	  }
	
	  tden = -b * s + b * v + c * s - c * v + e * q - e * r - f * q + f * r;
	  if (eq(d, 2 * e - f) && eq(a, 2 * b - c) && neq(tden, 0) && neq(q * s - q * v - r * s + r * v, 0)) {
	    t = -2 * b * s + 2 * b * v + c * s - c * v + 2 * e * q - 2 * e * r - f * q + f * r - q * v + r * s;
	    t = t / (2 * tden);
	    if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
	  }
	
	  if (eq(s, v) && eq(d, 2 * e - f) && neq(e - f, 0) && neq(q - r, 0)) {
	    t = (2 * e - f - v) / (2 * (e - f));
	    if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
	  }
	
	  var aeq = (2 * b * s - 2 * b * v - c * s + c * v + d * q - d * r - 2 * e * q + 2 * e * r + f * q - f * r) / (s - v);
	  var val = b * d * s - b * d * v - 2 * b * e * s + 2 * b * e * v + b * f * s - b * f * v - c * d * s + c * d * v + 2 * c * e * s - 2 * c * e * v - c * f * s + c * f * v - d * e * q + d * e * r + d * f * q - d * f * r + 2 * e * e * q - 2 * e * e * r - 3 * e * f * q + 3 * e * f * r + f * f * q - f * f * r;
	  if (eq(a, aeq) && neq(val, 0) && neq(q - r, 0)) {
	    t = (2 * b * s - 2 * b * v - c * s + c * v - 2 * e * q + 2 * e * r + f * q - f * r + q * v - r * s) / (2 * (b * s - b * v - c * s + c * v - e * q + e * r + f * q - f * r));
	    if (checkBezierTkoef(a, d, b, e, c, f, q, s, r, v, t)) return true;
	  }
	
	  return false;
	}
	
	function bezierIntersectsRect(a, d, b, e, c, f, r1x, r1y, r2x, r2y) {
	  if (pointInRect(a, d, r1x, r1y, r2x, r2y) || pointInRect(c, f, r1x, r1y, r2x, r2y)) return true;
	
	  var centerx = (r1x + r2x) / 2;
	  var centery = (r1y + r2y) / 2;
	
	  var diffx = r1x - r2x;
	  var diffy = r1y - r2y;
	
	  //performance optimalization based on distance
	  var diff2xy = diffx * diffx + diffy * diffy;
	  var dist2 = distance2ToBezier(centerx, centery, a, d, b, e, c, f);
	  if (dist2 * 4 > diff2xy) return false;
	  if (dist2 * 4 <= Math.min(diffx * diffx, diffy * diffy)) return true;
	
	  return bezierIntersectsLine(a, d, b, e, c, f, r1y, r2x, r1y, r1y) || bezierIntersectsLine(a, d, b, e, c, f, r2x, r1y, r2x, r2y) || bezierIntersectsLine(a, d, b, e, c, f, r2x, r2y, r1x, r2y) || bezierIntersectsLine(a, d, b, e, c, f, r1x, r2y, r1x, r1y);
	}
	
	exports.EPS = EPS;
	exports.bezierIntersectsRect = bezierIntersectsRect;
	exports.bezierIntersectsLine = bezierIntersectsLine;
	exports.lineIntersectsRect = lineIntersectsRect;
	exports.rectIntersectsRect = rectIntersectsRect;
	exports.pointInRect = pointInRect;
	exports.distance2ToBezier = distance2ToBezier;
	exports.distance2 = distance2;
	exports.pDistance2 = pDistance2;
	exports.getBBFromPoints = getBBFromPoints;
	exports.eq = eq;
	exports.neq = neq;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _gl = __webpack_require__(4);
	
	var _gl2 = _interopRequireDefault(_gl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: David Tichy, Aleš Saska
	 */
	
	var _class = function () {
	    function _class(events, onLoad) {
	        _classCallCheck(this, _class);
	
	        this._load = [events.debounce(onLoad, 5)];
	        this._textures = {};
	        this._pending = {};
	        this._n = 0;
	    }
	
	    _createClass(_class, [{
	        key: 'get',
	        value: function get(gl, img, action, options) {
	            var _this = this;
	
	            var p = this._pending[img];
	            var t = this._textures[img];
	
	            if (p) {
	                p.push(action);
	            } else if (t) {
	                action && action();
	            } else {
	                p = this._pending[img] = [action];
	                this._n++;
	                this._textures[img] = t = _gl2.default.createTexture(gl, img, function () {
	                    p.forEach(function (a) {
	                        return a && a();
	                    });
	                    delete _this._pending[img];
	                    --_this._n || _this._load.forEach(function (l) {
	                        return l();
	                    });
	                }, options);
	            }
	            return t;
	        }
	    }, {
	        key: 'onLoad',
	        value: function onLoad(action) {
	            if (this.allLoaded()) action();else this._load.push(action);
	        }
	    }, {
	        key: 'allLoaded',
	        value: function allLoaded() {
	            return _utils2.default.emptyObject(this._pending);
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _gl = __webpack_require__(4);
	
	var _gl2 = _interopRequireDefault(_gl);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: David Tichy, Aleš Saska
	 */
	
	var _class = function () {
	  function _class(events, onLoad) {
	    _classCallCheck(this, _class);
	
	    this._load = [events.debounce(onLoad || function () {}, 5)];
	    this._files = {};
	    this._pending = {};
	    this._n = 0;
	  }
	
	  _createClass(_class, [{
	    key: '_transformFile',
	    value: function _transformFile(data, dataType) {
	      if (dataType === 'json') return JSON.parse(data);
	      return data;
	    }
	  }, {
	    key: 'get',
	    value: function get(url) {
	      return this._files[url];
	    }
	
	    /*
	     * @param type {
	     *   url: 'url of file',
	     *   success: callback
	     *   dataType "text" || "json"
	     * }
	     */
	
	  }, {
	    key: 'load',
	    value: function load(url, action, dataType) {
	      var _this = this;
	
	      var p = this._pending[url];
	      var f = this._files[url];
	
	      if (p) {
	        p.push(action);
	      } else if (f) {
	        action && action();
	      } else {
	        p = this._pending[url] = [action];
	        this._n++;
	
	        _utils2.default.ajax(url, function (data) {
	          _this._files[url] = _this._transformFile(data, dataType);
	          p.forEach(function (a) {
	            return a && a(_this._files[url]);
	          });
	          delete _this._pending[url];
	          --_this._n || _this._load.forEach(function (l) {
	            return l();
	          });
	        }, dataType == 'arraybuffer' ? dataType : undefined);
	      }
	      return f;
	    }
	  }, {
	    key: 'onLoad',
	    value: function onLoad(action) {
	      if (this.allLoaded()) action();else this._load.push(action);
	    }
	  }, {
	    key: 'allLoaded',
	    value: function allLoaded() {
	      return _utils2.default.emptyObject(this._pending);
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2016, Helikar Lab.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Authors: David Tichy, Aleš Saska
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _default = __webpack_require__(27);
	
	var _default2 = _interopRequireDefault(_default);
	
	var _sdf = __webpack_require__(28);
	
	var _sdf2 = _interopRequireDefault(_sdf);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	  function _class(gl, files, textures) {
	    _classCallCheck(this, _class);
	
	    this._gl = gl;
	
	    this._modules = {
	      'default': new _default2.default(gl, files, textures),
	      'sdf': new _sdf2.default(gl, files, textures)
	    };
	  }
	
	  _createClass(_class, [{
	    key: 'clear',
	    value: function clear() {
	      for (var k in this._modules) {
	        this._modules[k].clear();
	      }
	    }
	  }, {
	    key: 'isSDF',
	    value: function isSDF(font) {
	      if (_utils2.default.isObject(font)) {
	        if (font.type === 'sdf' && font.pbf) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'getEngine',
	    value: function getEngine(font) {
	      if (this.isSDF(font)) {
	        return this._modules.sdf;
	      }
	      return this._modules.default;
	    }
	  }, {
	    key: 'bind',
	    value: function bind() {
	      for (var k in this._modules) {
	        this._modules[k].bind();
	      }
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      for (var k in this._modules) {
	        this._modules[k].remove && this._modules[k].remove();
	      }
	    }
	  }]);
	
	  return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: David Tichy, Aleš Saska
	 */
	
	var _class = function () {
	  function _class(gl, files, textures) {
	    _classCallCheck(this, _class);
	
	    this._gl = gl;
	    this._size = 1024;
	
	    this._canvas = document.createElement("canvas");
	    this._canvas.width = this._canvas.height = this._size;
	    this._canvas.style.width = this._canvas.style.height = this._size + 'px';
	    this._canvas.style.display = "none";
	    this._el = document.body.appendChild(this._canvas);
	
	    this._context = this._canvas.getContext('2d');
	    this._context.fillStyle = "white";
	    this._context.textAlign = "left";
	    this._context.textBaseline = "top";
	
	    this._rendered = this._texts = this._x = this._y = this._height = undefined;
	
	    this.texture = this._gl.createTexture();
	  }
	
	  _createClass(_class, [{
	    key: "clear",
	    value: function clear() {
	      this._rendered = {};
	      this._context.clearRect(0, 0, this._size, this._size);
	      this._height = this._x = this._y = 0;
	    }
	  }, {
	    key: "setFont",
	    value: function setFont(font) {
	      var fontstr = font ? font.size + "px " + font.type : undefined;
	
	      this._rendered[fontstr] = this._texts = this._rendered[fontstr] || {};
	      this._context.font = fontstr;
	      this._x = 0;
	      this._y += this._height;
	      this._height = font ? font.size + 1 : NaN;
	    }
	  }, {
	    key: "getTexture",
	    value: function getTexture(style, onLoad) {
	      onLoad();
	      return this.texture;
	    }
	  }, {
	    key: "_getText",
	    value: function _getText(text) {
	      var result = this._texts[text];
	      if (!result) {
	        var width = this._context.measureText(text).width;
	        if (this._x + width > this._size) {
	          this._x = 0;
	          this._y += this._height;
	        }
	        this._context.fillText(text, this._x, this._y);
	        this._texts[text] = result = {
	          width: width,
	          height: this._height,
	          left: this._x / this._size,
	          right: (this._x + width) / this._size,
	          top: this._y / this._size,
	          bottom: (this._y + this._height) / this._size
	        };
	        this._x += width;
	      }
	      return result;
	    }
	  }, {
	    key: "get",
	    value: function get(text, x, y) {
	      var c = this._getText(text);
	
	      var dx = x <= 0.5 ? 0 : -c.width;
	      var dy = y <= 0.5 ? 0 : -c.height;
	
	      return [{
	        width: c.width,
	        height: c.height,
	        left: c.left,
	        right: c.right,
	        top: c.top,
	        bottom: c.bottom,
	        dx: dx,
	        dy: dy
	      }];
	    }
	  }, {
	    key: "steps",
	    value: function steps(text) {
	      return 1;
	    }
	  }, {
	    key: "bind",
	    value: function bind() {
	      this._gl.bindTexture(this._gl.TEXTURE_2D, this.texture);
	      this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, false);
	      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
	      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
	      this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._canvas);
	      this._gl.bindTexture(this._gl.TEXTURE_2D, null);
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      this._context && this._el.parentNode.removeChild(this._el);
	    }
	  }, {
	    key: "fontSize",
	    get: function get() {
	      return this._height - 1;
	    }
	  }]);
	
	  return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _pbf = __webpack_require__(29);
	
	var _pbf2 = _interopRequireDefault(_pbf);
	
	var _atlas = __webpack_require__(31);
	
	var _atlas2 = _interopRequireDefault(_atlas);
	
	var _glyphs = __webpack_require__(33);
	
	var _glyphs2 = _interopRequireDefault(_glyphs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: Aleš Saska
	 */
	
	// A simplified representation of the glyph containing only the properties needed for shaping.
	var SimpleGlyph = function SimpleGlyph(glyph, rect, buffer) {
	  _classCallCheck(this, SimpleGlyph);
	
	  var padding = 1;
	  this.advance = glyph.advance;
	  this.left = glyph.left - buffer - padding;
	  this.top = glyph.top + buffer + padding;
	  this.rect = rect;
	};
	
	var SIZE_GROWTH_RATE = 4;
	var DEFAULT_SIZE = 512;
	// must be "DEFAULT_SIZE * SIZE_GROWTH_RATE ^ n" for some integer n
	var MAX_SIZE = 2048;
	
	var _class = function () {
	  function _class(gl, files, textures) {
	    var _this = this;
	
	    _classCallCheck(this, _class);
	
	    this.width = DEFAULT_SIZE;
	    this.height = DEFAULT_SIZE;
	
	    this.clear();
	
	    this._files = files;
	
	    this._rendered = {};
	    this._texts;
	    this._gl = gl;
	
	    this.atlas = new _atlas2.default(this._gl, function () {
	      _this._cachedGlyphs = {};
	    });
	    this._textures = {};
	    this._glyphs = {};
	    this._rects = {};
	    this._cachedGlyphs = {};
	  }
	
	  _createClass(_class, [{
	    key: 'clear',
	    value: function clear() {}
	  }, {
	    key: 'setFont',
	    value: function setFont(style) {
	      this.curFont = style.pbf;
	    }
	  }, {
	    key: 'getTexture',
	    value: function getTexture(style, onLoad) {
	      var _this2 = this,
	          _arguments = arguments;
	
	      var myOnLoad = function (onL) {
	        return function () {
	          var data = _this2._files.load(style.pbf, onLoad, 'arraybuffer');
	
	          //init first most-used ASCII chars
	          for (var i = 0; i < 128; i++) {
	            _this2._getChar(String.fromCharCode(i));
	          }
	
	          onL && onL.apply(_this2, _arguments);
	        };
	      }(onLoad);
	
	      var font = style.pbf;
	      if (!this._glyphs[font]) {
	        var data = this._files.load(style.pbf, myOnLoad, 'arraybuffer');
	        this._curglyphs = this._glyphs[font] = data && new _glyphs2.default(new _pbf2.default(data));
	      } else {
	        myOnLoad();
	      }
	
	      return this.atlas.texture;
	    }
	  }, {
	    key: '_getChar',
	    value: function _getChar(text, markDirty) {
	      var font = this.curFont;
	      var glyphID = text.charCodeAt(0);
	
	      var buffer = 3;
	      var range = Math.floor(glyphID / 256);
	
	      if (this._glyphs[font]) {
	        var g = this._glyphs[font];
	        if (g) {
	          var stack = g.stacks[range];
	          if (stack) {
	            var glyph = stack.glyphs[glyphID];
	            if (!this._rects[font]) this._rects[font] = {};
	
	            this._rects[font][text] = this.atlas.addGlyph(glyphID, this.curFont, glyph, buffer, markDirty);
	          }
	        }
	      }
	
	      var r = void 0,
	          rect = void 0;
	      if ((r = this._rects[font]) && (rect = r[text])) {
	        var cache = this._cachedGlyphs[font] || (this._cachedGlyphs[font] = {});
	        return cache[glyphID] || (cache[glyphID] = new SimpleGlyph(this._glyphs[font].stacks[range].glyphs[glyphID], rect, buffer));
	      }
	
	      return {};
	    }
	  }, {
	    key: 'get',
	    value: function get(text, x, y, markDirty) {
	      var width = 0;
	      var height = 0;
	
	      var horiBearingX = 3;
	      var horiBearingY = 2;
	
	      for (var i = 0; i < text.length; i++) {
	        var char = this._getChar(text[i], markDirty);
	        var rect = char.rect || {};
	        height = Math.max(height, rect.h - char.top);
	        width += char.advance + horiBearingX;
	        //      width               += rect.w + horiBearingX;
	      }
	
	      var dx = x <= 0.5 ? 0 : -width;
	      var dy = y <= 0.5 ? 0 : -height;
	
	      var ret = [];
	      for (var _i = 0; _i < text.length; _i++) {
	        var _char = this._getChar(text[_i], markDirty);
	        var _rect = _char.rect || {};
	
	        var horiAdvance = void 0;
	
	        dx += horiBearingX;
	
	        ret.push({
	          width: _rect.w,
	          height: _rect.h,
	          left: _rect.x / this.atlas.width,
	          right: (_rect.x + _rect.w) / this.atlas.width,
	          bottom: (_rect.y + _rect.h) / this.atlas.height,
	          top: _rect.y / this.atlas.height,
	          dx: dx,
	          dy: dy + _char.top + (height - _rect.h)
	        });
	
	        dx += _char.advance;
	        //      dx += rect.w;
	      }
	      return ret;
	    }
	  }, {
	    key: 'steps',
	    value: function steps(text) {
	      return text.length;
	    }
	  }, {
	    key: 'bind',
	    value: function bind() {
	      this.atlas.updateTexture(this._gl);
	    }
	  }, {
	    key: 'isSDF',
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: 'fontSize',
	    get: function get() {
	      return 24;
	    }
	  }]);
	
	  return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = Pbf;
	
	var ieee754 = __webpack_require__(30);
	
	function Pbf(buf) {
	    this.buf = ArrayBuffer.isView && ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf || 0);
	    this.pos = 0;
	    this.type = 0;
	    this.length = this.buf.length;
	}
	
	Pbf.Varint  = 0; // varint: int32, int64, uint32, uint64, sint32, sint64, bool, enum
	Pbf.Fixed64 = 1; // 64-bit: double, fixed64, sfixed64
	Pbf.Bytes   = 2; // length-delimited: string, bytes, embedded messages, packed repeated fields
	Pbf.Fixed32 = 5; // 32-bit: float, fixed32, sfixed32
	
	var SHIFT_LEFT_32 = (1 << 16) * (1 << 16),
	    SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
	
	Pbf.prototype = {
	
	    destroy: function() {
	        this.buf = null;
	    },
	
	    // === READING =================================================================
	
	    readFields: function(readField, result, end) {
	        end = end || this.length;
	
	        while (this.pos < end) {
	            var val = this.readVarint(),
	                tag = val >> 3,
	                startPos = this.pos;
	
	            this.type = val & 0x7;
	            readField(tag, result, this);
	
	            if (this.pos === startPos) this.skip(val);
	        }
	        return result;
	    },
	
	    readMessage: function(readField, result) {
	        return this.readFields(readField, result, this.readVarint() + this.pos);
	    },
	
	    readFixed32: function() {
	        var val = readUInt32(this.buf, this.pos);
	        this.pos += 4;
	        return val;
	    },
	
	    readSFixed32: function() {
	        var val = readInt32(this.buf, this.pos);
	        this.pos += 4;
	        return val;
	    },
	
	    // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)
	
	    readFixed64: function() {
	        var val = readUInt32(this.buf, this.pos) + readUInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
	        this.pos += 8;
	        return val;
	    },
	
	    readSFixed64: function() {
	        var val = readUInt32(this.buf, this.pos) + readInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
	        this.pos += 8;
	        return val;
	    },
	
	    readFloat: function() {
	        var val = ieee754.read(this.buf, this.pos, true, 23, 4);
	        this.pos += 4;
	        return val;
	    },
	
	    readDouble: function() {
	        var val = ieee754.read(this.buf, this.pos, true, 52, 8);
	        this.pos += 8;
	        return val;
	    },
	
	    readVarint: function(isSigned) {
	        var buf = this.buf,
	            val, b;
	
	        b = buf[this.pos++]; val  =  b & 0x7f;        if (b < 0x80) return val;
	        b = buf[this.pos++]; val |= (b & 0x7f) << 7;  if (b < 0x80) return val;
	        b = buf[this.pos++]; val |= (b & 0x7f) << 14; if (b < 0x80) return val;
	        b = buf[this.pos++]; val |= (b & 0x7f) << 21; if (b < 0x80) return val;
	        b = buf[this.pos];   val |= (b & 0x0f) << 28;
	
	        return readVarintRemainder(val, isSigned, this);
	    },
	
	    readVarint64: function() { // for compatibility with v2.0.1
	        return this.readVarint(true);
	    },
	
	    readSVarint: function() {
	        var num = this.readVarint();
	        return num % 2 === 1 ? (num + 1) / -2 : num / 2; // zigzag encoding
	    },
	
	    readBoolean: function() {
	        return Boolean(this.readVarint());
	    },
	
	    readString: function() {
	        var end = this.readVarint() + this.pos,
	            str = readUtf8(this.buf, this.pos, end);
	        this.pos = end;
	        return str;
	    },
	
	    readBytes: function() {
	        var end = this.readVarint() + this.pos,
	            buffer = this.buf.subarray(this.pos, end);
	        this.pos = end;
	        return buffer;
	    },
	
	    // verbose for performance reasons; doesn't affect gzipped size
	
	    readPackedVarint: function(arr, isSigned) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readVarint(isSigned));
	        return arr;
	    },
	    readPackedSVarint: function(arr) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readSVarint());
	        return arr;
	    },
	    readPackedBoolean: function(arr) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readBoolean());
	        return arr;
	    },
	    readPackedFloat: function(arr) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readFloat());
	        return arr;
	    },
	    readPackedDouble: function(arr) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readDouble());
	        return arr;
	    },
	    readPackedFixed32: function(arr) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readFixed32());
	        return arr;
	    },
	    readPackedSFixed32: function(arr) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readSFixed32());
	        return arr;
	    },
	    readPackedFixed64: function(arr) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readFixed64());
	        return arr;
	    },
	    readPackedSFixed64: function(arr) {
	        var end = readPackedEnd(this);
	        arr = arr || [];
	        while (this.pos < end) arr.push(this.readSFixed64());
	        return arr;
	    },
	
	    skip: function(val) {
	        var type = val & 0x7;
	        if (type === Pbf.Varint) while (this.buf[this.pos++] > 0x7f) {}
	        else if (type === Pbf.Bytes) this.pos = this.readVarint() + this.pos;
	        else if (type === Pbf.Fixed32) this.pos += 4;
	        else if (type === Pbf.Fixed64) this.pos += 8;
	        else throw new Error('Unimplemented type: ' + type);
	    },
	
	    // === WRITING =================================================================
	
	    writeTag: function(tag, type) {
	        this.writeVarint((tag << 3) | type);
	    },
	
	    realloc: function(min) {
	        var length = this.length || 16;
	
	        while (length < this.pos + min) length *= 2;
	
	        if (length !== this.length) {
	            var buf = new Uint8Array(length);
	            buf.set(this.buf);
	            this.buf = buf;
	            this.length = length;
	        }
	    },
	
	    finish: function() {
	        this.length = this.pos;
	        this.pos = 0;
	        return this.buf.subarray(0, this.length);
	    },
	
	    writeFixed32: function(val) {
	        this.realloc(4);
	        writeInt32(this.buf, val, this.pos);
	        this.pos += 4;
	    },
	
	    writeSFixed32: function(val) {
	        this.realloc(4);
	        writeInt32(this.buf, val, this.pos);
	        this.pos += 4;
	    },
	
	    writeFixed64: function(val) {
	        this.realloc(8);
	        writeInt32(this.buf, val & -1, this.pos);
	        writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
	        this.pos += 8;
	    },
	
	    writeSFixed64: function(val) {
	        this.realloc(8);
	        writeInt32(this.buf, val & -1, this.pos);
	        writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
	        this.pos += 8;
	    },
	
	    writeVarint: function(val) {
	        val = +val || 0;
	
	        if (val > 0xfffffff || val < 0) {
	            writeBigVarint(val, this);
	            return;
	        }
	
	        this.realloc(4);
	
	        this.buf[this.pos++] =           val & 0x7f  | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
	        this.buf[this.pos++] = ((val >>>= 7) & 0x7f) | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
	        this.buf[this.pos++] = ((val >>>= 7) & 0x7f) | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
	        this.buf[this.pos++] =   (val >>> 7) & 0x7f;
	    },
	
	    writeSVarint: function(val) {
	        this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
	    },
	
	    writeBoolean: function(val) {
	        this.writeVarint(Boolean(val));
	    },
	
	    writeString: function(str) {
	        str = String(str);
	        this.realloc(str.length * 4);
	
	        this.pos++; // reserve 1 byte for short string length
	
	        var startPos = this.pos;
	        // write the string directly to the buffer and see how much was written
	        this.pos = writeUtf8(this.buf, str, this.pos);
	        var len = this.pos - startPos;
	
	        if (len >= 0x80) makeRoomForExtraLength(startPos, len, this);
	
	        // finally, write the message length in the reserved place and restore the position
	        this.pos = startPos - 1;
	        this.writeVarint(len);
	        this.pos += len;
	    },
	
	    writeFloat: function(val) {
	        this.realloc(4);
	        ieee754.write(this.buf, val, this.pos, true, 23, 4);
	        this.pos += 4;
	    },
	
	    writeDouble: function(val) {
	        this.realloc(8);
	        ieee754.write(this.buf, val, this.pos, true, 52, 8);
	        this.pos += 8;
	    },
	
	    writeBytes: function(buffer) {
	        var len = buffer.length;
	        this.writeVarint(len);
	        this.realloc(len);
	        for (var i = 0; i < len; i++) this.buf[this.pos++] = buffer[i];
	    },
	
	    writeRawMessage: function(fn, obj) {
	        this.pos++; // reserve 1 byte for short message length
	
	        // write the message directly to the buffer and see how much was written
	        var startPos = this.pos;
	        fn(obj, this);
	        var len = this.pos - startPos;
	
	        if (len >= 0x80) makeRoomForExtraLength(startPos, len, this);
	
	        // finally, write the message length in the reserved place and restore the position
	        this.pos = startPos - 1;
	        this.writeVarint(len);
	        this.pos += len;
	    },
	
	    writeMessage: function(tag, fn, obj) {
	        this.writeTag(tag, Pbf.Bytes);
	        this.writeRawMessage(fn, obj);
	    },
	
	    writePackedVarint:   function(tag, arr) { this.writeMessage(tag, writePackedVarint, arr);   },
	    writePackedSVarint:  function(tag, arr) { this.writeMessage(tag, writePackedSVarint, arr);  },
	    writePackedBoolean:  function(tag, arr) { this.writeMessage(tag, writePackedBoolean, arr);  },
	    writePackedFloat:    function(tag, arr) { this.writeMessage(tag, writePackedFloat, arr);    },
	    writePackedDouble:   function(tag, arr) { this.writeMessage(tag, writePackedDouble, arr);   },
	    writePackedFixed32:  function(tag, arr) { this.writeMessage(tag, writePackedFixed32, arr);  },
	    writePackedSFixed32: function(tag, arr) { this.writeMessage(tag, writePackedSFixed32, arr); },
	    writePackedFixed64:  function(tag, arr) { this.writeMessage(tag, writePackedFixed64, arr);  },
	    writePackedSFixed64: function(tag, arr) { this.writeMessage(tag, writePackedSFixed64, arr); },
	
	    writeBytesField: function(tag, buffer) {
	        this.writeTag(tag, Pbf.Bytes);
	        this.writeBytes(buffer);
	    },
	    writeFixed32Field: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed32);
	        this.writeFixed32(val);
	    },
	    writeSFixed32Field: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed32);
	        this.writeSFixed32(val);
	    },
	    writeFixed64Field: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed64);
	        this.writeFixed64(val);
	    },
	    writeSFixed64Field: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed64);
	        this.writeSFixed64(val);
	    },
	    writeVarintField: function(tag, val) {
	        this.writeTag(tag, Pbf.Varint);
	        this.writeVarint(val);
	    },
	    writeSVarintField: function(tag, val) {
	        this.writeTag(tag, Pbf.Varint);
	        this.writeSVarint(val);
	    },
	    writeStringField: function(tag, str) {
	        this.writeTag(tag, Pbf.Bytes);
	        this.writeString(str);
	    },
	    writeFloatField: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed32);
	        this.writeFloat(val);
	    },
	    writeDoubleField: function(tag, val) {
	        this.writeTag(tag, Pbf.Fixed64);
	        this.writeDouble(val);
	    },
	    writeBooleanField: function(tag, val) {
	        this.writeVarintField(tag, Boolean(val));
	    }
	};
	
	function readVarintRemainder(l, s, p) {
	    var buf = p.buf,
	        h, b;
	
	    b = buf[p.pos++]; h  = (b & 0x70) >> 4;  if (b < 0x80) return toNum(l, h, s);
	    b = buf[p.pos++]; h |= (b & 0x7f) << 3;  if (b < 0x80) return toNum(l, h, s);
	    b = buf[p.pos++]; h |= (b & 0x7f) << 10; if (b < 0x80) return toNum(l, h, s);
	    b = buf[p.pos++]; h |= (b & 0x7f) << 17; if (b < 0x80) return toNum(l, h, s);
	    b = buf[p.pos++]; h |= (b & 0x7f) << 24; if (b < 0x80) return toNum(l, h, s);
	    b = buf[p.pos++]; h |= (b & 0x01) << 31; if (b < 0x80) return toNum(l, h, s);
	
	    throw new Error('Expected varint not more than 10 bytes');
	}
	
	function readPackedEnd(pbf) {
	    return pbf.type === Pbf.Bytes ?
	        pbf.readVarint() + pbf.pos : pbf.pos + 1;
	}
	
	function toNum(low, high, isSigned) {
	    if (isSigned) {
	        return high * 0x100000000 + (low >>> 0);
	    }
	
	    return ((high >>> 0) * 0x100000000) + (low >>> 0);
	}
	
	function writeBigVarint(val, pbf) {
	    var low, high;
	
	    if (val >= 0) {
	        low  = (val % 0x100000000) | 0;
	        high = (val / 0x100000000) | 0;
	    } else {
	        low  = ~(-val % 0x100000000);
	        high = ~(-val / 0x100000000);
	
	        if (low ^ 0xffffffff) {
	            low = (low + 1) | 0;
	        } else {
	            low = 0;
	            high = (high + 1) | 0;
	        }
	    }
	
	    if (val >= 0x10000000000000000 || val < -0x10000000000000000) {
	        throw new Error('Given varint doesn\'t fit into 10 bytes');
	    }
	
	    pbf.realloc(10);
	
	    writeBigVarintLow(low, high, pbf);
	    writeBigVarintHigh(high, pbf);
	}
	
	function writeBigVarintLow(low, high, pbf) {
	    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
	    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
	    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
	    pbf.buf[pbf.pos++] = low & 0x7f | 0x80; low >>>= 7;
	    pbf.buf[pbf.pos]   = low & 0x7f;
	}
	
	function writeBigVarintHigh(high, pbf) {
	    var lsb = (high & 0x07) << 4;
	
	    pbf.buf[pbf.pos++] |= lsb         | ((high >>>= 3) ? 0x80 : 0); if (!high) return;
	    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
	    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
	    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
	    pbf.buf[pbf.pos++]  = high & 0x7f | ((high >>>= 7) ? 0x80 : 0); if (!high) return;
	    pbf.buf[pbf.pos++]  = high & 0x7f;
	}
	
	function makeRoomForExtraLength(startPos, len, pbf) {
	    var extraLen =
	        len <= 0x3fff ? 1 :
	        len <= 0x1fffff ? 2 :
	        len <= 0xfffffff ? 3 : Math.ceil(Math.log(len) / (Math.LN2 * 7));
	
	    // if 1 byte isn't enough for encoding message length, shift the data to the right
	    pbf.realloc(extraLen);
	    for (var i = pbf.pos - 1; i >= startPos; i--) pbf.buf[i + extraLen] = pbf.buf[i];
	}
	
	function writePackedVarint(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeVarint(arr[i]);   }
	function writePackedSVarint(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeSVarint(arr[i]);  }
	function writePackedFloat(arr, pbf)    { for (var i = 0; i < arr.length; i++) pbf.writeFloat(arr[i]);    }
	function writePackedDouble(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeDouble(arr[i]);   }
	function writePackedBoolean(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeBoolean(arr[i]);  }
	function writePackedFixed32(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed32(arr[i]);  }
	function writePackedSFixed32(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed32(arr[i]); }
	function writePackedFixed64(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed64(arr[i]);  }
	function writePackedSFixed64(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed64(arr[i]); }
	
	// Buffer code below from https://github.com/feross/buffer, MIT-licensed
	
	function readUInt32(buf, pos) {
	    return ((buf[pos]) |
	        (buf[pos + 1] << 8) |
	        (buf[pos + 2] << 16)) +
	        (buf[pos + 3] * 0x1000000);
	}
	
	function writeInt32(buf, val, pos) {
	    buf[pos] = val;
	    buf[pos + 1] = (val >>> 8);
	    buf[pos + 2] = (val >>> 16);
	    buf[pos + 3] = (val >>> 24);
	}
	
	function readInt32(buf, pos) {
	    return ((buf[pos]) |
	        (buf[pos + 1] << 8) |
	        (buf[pos + 2] << 16)) +
	        (buf[pos + 3] << 24);
	}
	
	function readUtf8(buf, pos, end) {
	    var str = '';
	    var i = pos;
	
	    while (i < end) {
	        var b0 = buf[i];
	        var c = null; // codepoint
	        var bytesPerSequence =
	            b0 > 0xEF ? 4 :
	            b0 > 0xDF ? 3 :
	            b0 > 0xBF ? 2 : 1;
	
	        if (i + bytesPerSequence > end) break;
	
	        var b1, b2, b3;
	
	        if (bytesPerSequence === 1) {
	            if (b0 < 0x80) {
	                c = b0;
	            }
	        } else if (bytesPerSequence === 2) {
	            b1 = buf[i + 1];
	            if ((b1 & 0xC0) === 0x80) {
	                c = (b0 & 0x1F) << 0x6 | (b1 & 0x3F);
	                if (c <= 0x7F) {
	                    c = null;
	                }
	            }
	        } else if (bytesPerSequence === 3) {
	            b1 = buf[i + 1];
	            b2 = buf[i + 2];
	            if ((b1 & 0xC0) === 0x80 && (b2 & 0xC0) === 0x80) {
	                c = (b0 & 0xF) << 0xC | (b1 & 0x3F) << 0x6 | (b2 & 0x3F);
	                if (c <= 0x7FF || (c >= 0xD800 && c <= 0xDFFF)) {
	                    c = null;
	                }
	            }
	        } else if (bytesPerSequence === 4) {
	            b1 = buf[i + 1];
	            b2 = buf[i + 2];
	            b3 = buf[i + 3];
	            if ((b1 & 0xC0) === 0x80 && (b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
	                c = (b0 & 0xF) << 0x12 | (b1 & 0x3F) << 0xC | (b2 & 0x3F) << 0x6 | (b3 & 0x3F);
	                if (c <= 0xFFFF || c >= 0x110000) {
	                    c = null;
	                }
	            }
	        }
	
	        if (c === null) {
	            c = 0xFFFD;
	            bytesPerSequence = 1;
	
	        } else if (c > 0xFFFF) {
	            c -= 0x10000;
	            str += String.fromCharCode(c >>> 10 & 0x3FF | 0xD800);
	            c = 0xDC00 | c & 0x3FF;
	        }
	
	        str += String.fromCharCode(c);
	        i += bytesPerSequence;
	    }
	
	    return str;
	}
	
	function writeUtf8(buf, str, pos) {
	    for (var i = 0, c, lead; i < str.length; i++) {
	        c = str.charCodeAt(i); // code point
	
	        if (c > 0xD7FF && c < 0xE000) {
	            if (lead) {
	                if (c < 0xDC00) {
	                    buf[pos++] = 0xEF;
	                    buf[pos++] = 0xBF;
	                    buf[pos++] = 0xBD;
	                    lead = c;
	                    continue;
	                } else {
	                    c = lead - 0xD800 << 10 | c - 0xDC00 | 0x10000;
	                    lead = null;
	                }
	            } else {
	                if (c > 0xDBFF || (i + 1 === str.length)) {
	                    buf[pos++] = 0xEF;
	                    buf[pos++] = 0xBF;
	                    buf[pos++] = 0xBD;
	                } else {
	                    lead = c;
	                }
	                continue;
	            }
	        } else if (lead) {
	            buf[pos++] = 0xEF;
	            buf[pos++] = 0xBF;
	            buf[pos++] = 0xBD;
	            lead = null;
	        }
	
	        if (c < 0x80) {
	            buf[pos++] = c;
	        } else {
	            if (c < 0x800) {
	                buf[pos++] = c >> 0x6 | 0xC0;
	            } else {
	                if (c < 0x10000) {
	                    buf[pos++] = c >> 0xC | 0xE0;
	                } else {
	                    buf[pos++] = c >> 0x12 | 0xF0;
	                    buf[pos++] = c >> 0xC & 0x3F | 0x80;
	                }
	                buf[pos++] = c >> 0x6 & 0x3F | 0x80;
	            }
	            buf[pos++] = c & 0x3F | 0x80;
	        }
	    }
	    return pos;
	}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shelfPack = __webpack_require__(32);
	
	var _shelfPack2 = _interopRequireDefault(_shelfPack);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//import util from '../util/util';
	
	var SIZE_GROWTH_RATE = 4;
	var DEFAULT_SIZE = 1024;
	// must be "DEFAULT_SIZE * SIZE_GROWTH_RATE ^ n" for some integer n
	var MAX_SIZE = 2048;
	
	var GlyphAtlas = function () {
	    function GlyphAtlas(gl, resetCache) {
	        _classCallCheck(this, GlyphAtlas);
	
	        this.width = DEFAULT_SIZE;
	        this.height = DEFAULT_SIZE;
	
	        this._resetCache = resetCache;
	        this.bin = new _shelfPack2.default(this.width, this.height);
	        this.index = {};
	        this.ids = {};
	
	        this.gl = gl;
	        this.data = new Uint8Array(this.width * this.height);
	    }
	
	    _createClass(GlyphAtlas, [{
	        key: '_createTexture',
	        value: function _createTexture() {
	            this.dirty = false;
	            var gl = this.gl;
	            var texture = gl.createTexture();
	            gl.bindTexture(gl.TEXTURE_2D, texture);
	            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	            gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, this.width, this.height, 0, gl.ALPHA, gl.UNSIGNED_BYTE, this.data);
	            gl.bindTexture(gl.TEXTURE_2D, null);
	            return texture;
	        }
	    }, {
	        key: 'getGlyphs',
	        value: function getGlyphs() {
	            var glyphs = {};
	            var split = void 0,
	                name = void 0,
	                id = void 0;
	
	            for (var key in this.ids) {
	                split = key.split('#');
	                name = split[0];
	                id = split[1];
	
	                if (!glyphs[name]) glyphs[name] = [];
	                glyphs[name].push(id);
	            }
	
	            return glyphs;
	        }
	    }, {
	        key: 'getRects',
	        value: function getRects() {
	            var rects = {};
	            var split = void 0,
	                name = void 0,
	                id = void 0;
	
	            for (var key in this.ids) {
	                split = key.split('#');
	                name = split[0];
	                id = split[1];
	
	                if (!rects[name]) rects[name] = {};
	                rects[name][id] = this.index[key];
	            }
	
	            return rects;
	        }
	    }, {
	        key: 'addGlyph',
	        value: function addGlyph(id, name, glyph, buffer, markDirty) {
	            if (!glyph) return null;
	
	            var key = name + '#' + glyph.id;
	
	            // The glyph is already in this texture.
	            if (this.index[key]) {
	                if (this.ids[key].indexOf(id) < 0) {
	                    this.ids[key].push(id);
	                }
	                return this.index[key];
	            }
	
	            var bufferedWidth = glyph.width + buffer * 2;
	            var bufferedHeight = glyph.height + buffer * 2;
	
	            // Add a 1px border around every image.
	            var padding = 1;
	            var packWidth = bufferedWidth + 2 * padding;
	            var packHeight = bufferedHeight + 2 * padding;
	
	            // Increase to next number divisible by 4, but at least 1.
	            // This is so we can scale down the texture coordinates and pack them
	            // into fewer bytes.
	            packWidth += 4 - packWidth % 4;
	            packHeight += 4 - packHeight % 4;
	
	            var rect = this.bin.packOne(packWidth, packHeight);
	            if (!rect) {
	                this.resize();
	                rect = this.bin.packOne(packWidth, packHeight);
	                markDirty && markDirty();
	            }
	            if (!rect) {
	                return null;
	            }
	
	            this.index[key] = rect;
	            this.ids[key] = [id];
	
	            if (glyph.bitmap) {
	                var target = this.data;
	                var source = glyph.bitmap;
	                for (var y = 0; y < bufferedHeight; y++) {
	                    var y1 = this.width * (rect.y + y + padding) + rect.x + padding;
	                    var y2 = bufferedWidth * y;
	                    for (var x = 0; x < bufferedWidth; x++) {
	                        target[y1 + x] = source[y2 + x];
	                    }
	                }
	            }
	
	            this.dirty = true;
	
	            return rect;
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	            var prevWidth = this.width;
	            var prevHeight = this.height;
	
	            if (prevWidth >= MAX_SIZE || prevHeight >= MAX_SIZE) return;
	
	            if (this._texture) {
	                if (this.gl) {
	                    this.gl.deleteTexture(this._texture);
	                }
	                this._texture = null;
	            }
	
	            this.width *= SIZE_GROWTH_RATE;
	            this.height *= SIZE_GROWTH_RATE;
	            this.bin.resize(this.width, this.height);
	
	            var buf = new ArrayBuffer(this.width * this.height);
	            for (var i = 0; i < prevHeight; i++) {
	                var src = new Uint8Array(this.data.buffer, prevHeight * i, prevWidth);
	                var dst = new Uint8Array(buf, prevHeight * i * SIZE_GROWTH_RATE, prevWidth);
	                dst.set(src);
	            }
	            this.data = new Uint8Array(buf);
	            this._resetCache();
	        }
	    }, {
	        key: 'bind',
	        value: function bind(gl) {}
	    }, {
	        key: 'updateTexture',
	        value: function updateTexture() {
	            var gl = this.gl;
	            if (!this._texture) {
	                this._texture = this._createTexture();
	            }
	            if (this.dirty) {
	                gl.bindTexture(gl.TEXTURE_2D, this._texture);
	                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
	                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, gl.ALPHA, gl.UNSIGNED_BYTE, this.data);
	                gl.bindTexture(gl.TEXTURE_2D, null);
	                this.dirty = false;
	            }
	            return this._texture;
	        }
	    }, {
	        key: 'texture',
	        get: function get() {
	            return this._texture;
	        }
	    }]);
	
	    return GlyphAtlas;
	}();
	
	exports.default = GlyphAtlas;
	;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ShelfPack = factory());
	}(this, function () {
	
	/**
	 * Create a new ShelfPack bin allocator.
	 *
	 * Uses the Shelf Best Height Fit algorithm from
	 * http://clb.demon.fi/files/RectangleBinPack.pdf
	 *
	 * @class  ShelfPack
	 * @param  {number}  [w=64]  Initial width of the sprite
	 * @param  {number}  [h=64]  Initial width of the sprite
	 * @param  {Object}  [options]
	 * @param  {boolean} [options.autoResize=false]  If `true`, the sprite will automatically grow
	 * @example
	 * var sprite = new ShelfPack(64, 64, { autoResize: false });
	 */
	function ShelfPack(w, h, options) {
	    options = options || {};
	    this.w = w || 64;
	    this.h = h || 64;
	    this.autoResize = !!options.autoResize;
	    this.shelves = [];
	    this.freebins = [];
	    this.stats = {};
	    this.bins = {};
	    this.maxId = 0;
	}
	
	
	/**
	 * Batch pack multiple bins into the sprite.
	 *
	 * @param   {Object[]} bins       Array of requested bins - each object should have `width`, `height` (or `w`, `h`) properties
	 * @param   {number}   bins[].w   Requested bin width
	 * @param   {number}   bins[].h   Requested bin height
	 * @param   {Object}   [options]
	 * @param   {boolean}  [options.inPlace=false] If `true`, the supplied bin objects will be updated inplace with `x` and `y` properties
	 * @returns {Bin[]}    Array of allocated Bins - each Bin is an object with `id`, `x`, `y`, `w`, `h` properties
	 * @example
	 * var bins = [
	 *     { id: 1, w: 12, h: 12 },
	 *     { id: 2, w: 12, h: 16 },
	 *     { id: 3, w: 12, h: 24 }
	 * ];
	 * var results = sprite.pack(bins, { inPlace: false });
	 */
	ShelfPack.prototype.pack = function(bins, options) {
	    bins = [].concat(bins);
	    options = options || {};
	
	    var results = [],
	        w, h, id, allocation;
	
	    for (var i = 0; i < bins.length; i++) {
	        w  = bins[i].w || bins[i].width;
	        h  = bins[i].h || bins[i].height;
	        id = bins[i].id;
	
	        if (w && h) {
	            allocation = this.packOne(w, h, id);
	            if (!allocation) {
	                continue;
	            }
	            if (options.inPlace) {
	                bins[i].x  = allocation.x;
	                bins[i].y  = allocation.y;
	                bins[i].id = allocation.id;
	            }
	            results.push(allocation);
	        }
	    }
	
	    // Shrink the width/height of the sprite to the bare minimum.
	    // Since shelf-pack doubles first width, then height when running out of shelf space
	    // this can result in fairly large unused space both in width and height if that happens
	    // towards the end of bin packing.
	    if (this.shelves.length > 0) {
	        var w2 = 0;
	        var h2 = 0;
	
	        for (var j = 0; j < this.shelves.length; j++) {
	            var shelf = this.shelves[j];
	            h2 += shelf.h;
	            w2 = Math.max(shelf.w - shelf.free, w2);
	        }
	
	        this.resize(w2, h2);
	    }
	
	    return results;
	};
	
	
	/**
	 * Pack a single bin into the sprite.
	 *
	 * Each bin will have a unique identitifer.
	 * If no identifier is supplied in the `id` parameter, one will be created.
	 * Note: The supplied `id` is used as an object index, so numeric values are fastest!
	 *
	 * Bins are automatically refcounted (i.e. a newly packed Bin will have a refcount of 1).
	 * When a bin is no longer needed, use the `ShelfPack.unref` function to mark it
	 *   as unused.  When a Bin's refcount decrements to 0, the Bin will be marked
	 *   as free and its space may be reused by the packing code.
	 *
	 * @param    {number}         w      Width of the bin to allocate
	 * @param    {number}         h      Height of the bin to allocate
	 * @param    {number|string}  [id]   Unique identifier for this bin, (if unsupplied, assume it's a new bin and create an id)
	 * @returns  {Bin}            Bin object with `id`, `x`, `y`, `w`, `h` properties, or `null` if allocation failed
	 * @example
	 * var results = sprite.packOne(12, 16, 'a');
	 */
	ShelfPack.prototype.packOne = function(w, h, id) {
	    var best = { freebin: -1, shelf: -1, waste: Infinity },
	        y = 0,
	        bin, shelf, waste, i;
	
	    // if id was supplied, attempt a lookup..
	    if (typeof id === 'string' || typeof id === 'number') {
	        bin = this.getBin(id);
	        if (bin) {              // we packed this bin already
	            this.ref(bin);
	            return bin;
	        }
	        if (typeof id === 'number') {
	            this.maxId = Math.max(id, this.maxId);
	        }
	    } else {
	        id = ++this.maxId;
	    }
	
	    // First try to reuse a free bin..
	    for (i = 0; i < this.freebins.length; i++) {
	        bin = this.freebins[i];
	
	        // exactly the right height and width, use it..
	        if (h === bin.maxh && w === bin.maxw) {
	            return this.allocFreebin(i, w, h, id);
	        }
	        // not enough height or width, skip it..
	        if (h > bin.maxh || w > bin.maxw) {
	            continue;
	        }
	        // extra height or width, minimize wasted area..
	        if (h <= bin.maxh && w <= bin.maxw) {
	            waste = (bin.maxw * bin.maxh) - (w * h);
	            if (waste < best.waste) {
	                best.waste = waste;
	                best.freebin = i;
	            }
	        }
	    }
	
	    // Next find the best shelf..
	    for (i = 0; i < this.shelves.length; i++) {
	        shelf = this.shelves[i];
	        y += shelf.h;
	
	        // not enough width on this shelf, skip it..
	        if (w > shelf.free) {
	            continue;
	        }
	        // exactly the right height, pack it..
	        if (h === shelf.h) {
	            return this.allocShelf(i, w, h, id);
	        }
	        // not enough height, skip it..
	        if (h > shelf.h) {
	            continue;
	        }
	        // extra height, minimize wasted area..
	        if (h < shelf.h) {
	            waste = (shelf.h - h) * w;
	            if (waste < best.waste) {
	                best.freebin = -1;
	                best.waste = waste;
	                best.shelf = i;
	            }
	        }
	    }
	
	    if (best.freebin !== -1) {
	        return this.allocFreebin(best.freebin, w, h, id);
	    }
	
	    if (best.shelf !== -1) {
	        return this.allocShelf(best.shelf, w, h, id);
	    }
	
	    // No free bins or shelves.. add shelf..
	    if (h <= (this.h - y) && w <= this.w) {
	        shelf = new Shelf(y, this.w, h);
	        return this.allocShelf(this.shelves.push(shelf) - 1, w, h, id);
	    }
	
	    // No room for more shelves..
	    // If `autoResize` option is set, grow the sprite as follows:
	    //  * double whichever sprite dimension is smaller (`w1` or `h1`)
	    //  * if sprite dimensions are equal, grow width before height
	    //  * accomodate very large bin requests (big `w` or `h`)
	    if (this.autoResize) {
	        var h1, h2, w1, w2;
	
	        h1 = h2 = this.h;
	        w1 = w2 = this.w;
	
	        if (w1 <= h1 || w > w1) {   // grow width..
	            w2 = Math.max(w, w1) * 2;
	        }
	        if (h1 < w1 || h > h1) {    // grow height..
	            h2 = Math.max(h, h1) * 2;
	        }
	
	        this.resize(w2, h2);
	        return this.packOne(w, h, id);  // retry
	    }
	
	    return null;
	};
	
	
	/**
	 * Called by packOne() to allocate a bin by reusing an existing freebin
	 *
	 * @private
	 * @param    {number}         index  Index into the `this.freebins` array
	 * @param    {number}         w      Width of the bin to allocate
	 * @param    {number}         h      Height of the bin to allocate
	 * @param    {number|string}  id     Unique identifier for this bin
	 * @returns  {Bin}            Bin object with `id`, `x`, `y`, `w`, `h` properties
	 * @example
	 * var bin = sprite.allocFreebin(0, 12, 16, 'a');
	 */
	ShelfPack.prototype.allocFreebin = function (index, w, h, id) {
	    var bin = this.freebins.splice(index, 1)[0];
	    bin.id = id;
	    bin.w = w;
	    bin.h = h;
	    bin.refcount = 0;
	    this.bins[id] = bin;
	    this.ref(bin);
	    return bin;
	};
	
	
	/**
	 * Called by `packOne() to allocate bin on an existing shelf
	 *
	 * @private
	 * @param    {number}         index  Index into the `this.shelves` array
	 * @param    {number}         w      Width of the bin to allocate
	 * @param    {number}         h      Height of the bin to allocate
	 * @param    {number|string}  id     Unique identifier for this bin
	 * @returns  {Bin}            Bin object with `id`, `x`, `y`, `w`, `h` properties
	 * @example
	 * var results = sprite.allocShelf(0, 12, 16, 'a');
	 */
	ShelfPack.prototype.allocShelf = function(index, w, h, id) {
	    var shelf = this.shelves[index];
	    var bin = shelf.alloc(w, h, id);
	    this.bins[id] = bin;
	    this.ref(bin);
	    return bin;
	};
	
	
	/**
	 * Return a packed bin given its id, or undefined if the id is not found
	 *
	 * @param    {number|string}  id  Unique identifier for this bin,
	 * @returns  {Bin}            The requested bin, or undefined if not yet packed
	 * @example
	 * var b = sprite.getBin('a');
	 */
	ShelfPack.prototype.getBin = function(id) {
	    return this.bins[id];
	};
	
	
	/**
	 * Increment the ref count of a bin and update statistics.
	 *
	 * @param    {Bin}     bin  Bin instance
	 * @returns  {number}  New refcount of the bin
	 * @example
	 * var bin = sprite.getBin('a');
	 * sprite.ref(bin);
	 */
	ShelfPack.prototype.ref = function(bin) {
	    if (++bin.refcount === 1) {   // a new Bin.. record height in stats historgram..
	        var h = bin.h;
	        this.stats[h] = (this.stats[h] | 0) + 1;
	    }
	
	    return bin.refcount;
	};
	
	
	/**
	 * Decrement the ref count of a bin and update statistics.
	 * The bin will be automatically marked as free space once the refcount reaches 0.
	 *
	 * @param    {Bin}     bin  Bin instance
	 * @returns  {number}  New refcount of the bin
	 * @example
	 * var bin = sprite.getBin('a');
	 * sprite.unref(bin);
	 */
	ShelfPack.prototype.unref = function(bin) {
	    if (bin.refcount === 0) {
	        return 0;
	    }
	
	    if (--bin.refcount === 0) {
	        this.stats[bin.h]--;
	        delete this.bins[bin.id];
	        this.freebins.push(bin);
	    }
	
	    return bin.refcount;
	};
	
	
	/**
	 * Clear the sprite.  Resets everything and resets statistics.
	 *
	 * @example
	 * sprite.clear();
	 */
	ShelfPack.prototype.clear = function() {
	    this.shelves = [];
	    this.freebins = [];
	    this.stats = {};
	    this.bins = {};
	    this.maxId = 0;
	};
	
	
	/**
	 * Resize the sprite.
	 *
	 * @param   {number}  w  Requested new sprite width
	 * @param   {number}  h  Requested new sprite height
	 * @returns {boolean} `true` if resize succeeded, `false` if failed
	 * @example
	 * sprite.resize(256, 256);
	 */
	ShelfPack.prototype.resize = function(w, h) {
	    this.w = w;
	    this.h = h;
	    for (var i = 0; i < this.shelves.length; i++) {
	        this.shelves[i].resize(w);
	    }
	    return true;
	};
	
	
	/**
	 * Create a new Shelf.
	 *
	 * @private
	 * @class  Shelf
	 * @param  {number}  y   Top coordinate of the new shelf
	 * @param  {number}  w   Width of the new shelf
	 * @param  {number}  h   Height of the new shelf
	 * @example
	 * var shelf = new Shelf(64, 512, 24);
	 */
	function Shelf(y, w, h) {
	    this.x = 0;
	    this.y = y;
	    this.w = this.free = w;
	    this.h = h;
	}
	
	
	/**
	 * Allocate a single bin into the shelf.
	 *
	 * @private
	 * @param   {number}         w   Width of the bin to allocate
	 * @param   {number}         h   Height of the bin to allocate
	 * @param   {number|string}  id  Unique id of the bin to allocate
	 * @returns {Bin}            Bin object with `id`, `x`, `y`, `w`, `h` properties, or `null` if allocation failed
	 * @example
	 * shelf.alloc(12, 16, 'a');
	 */
	Shelf.prototype.alloc = function(w, h, id) {
	    if (w > this.free || h > this.h) {
	        return null;
	    }
	    var x = this.x;
	    this.x += w;
	    this.free -= w;
	    return new Bin(id, x, this.y, w, h);
	};
	
	
	/**
	 * Resize the shelf.
	 *
	 * @private
	 * @param   {number}  w  Requested new width of the shelf
	 * @returns {boolean}    true
	 * @example
	 * shelf.resize(512);
	 */
	Shelf.prototype.resize = function(w) {
	    this.free += (w - this.w);
	    this.w = w;
	    return true;
	};
	
	
	/**
	 * Create a new Bin object.
	 *
	 * @class  Bin
	 * @param  {number|string}  id  Unique id of the bin
	 * @param  {number}         x   Left coordinate of the bin
	 * @param  {number}         y   Top coordinate of the bin
	 * @param  {number}         w   Width of the bin
	 * @param  {number}         h   Height of the bin
	 * @example
	 * var bin = new Bin('a', 0, 0, 12, 16);
	 */
	function Bin(id, x, y, w, h) {
	    this.id = id;
	    this.x  = x;
	    this.y  = y;
	    this.w  = w;
	    this.h  = h;
	    this.maxw = w;
	    this.maxh = h;
	    this.refcount = 0;
	}
	
	return ShelfPack;
	
	}));

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Glyphs;
	function Glyphs(pbf, end) {
	    this.stacks = pbf.readFields(readFontstacks, [], end);
	}
	
	function readFontstacks(tag, stacks, pbf) {
	    if (tag === 1) {
	        var fontstack = pbf.readMessage(readFontstack, { glyphs: {} });
	        stacks.push(fontstack);
	    }
	}
	
	function readFontstack(tag, fontstack, pbf) {
	    if (tag === 1) fontstack.name = pbf.readString();else if (tag === 2) fontstack.range = pbf.readString();else if (tag === 3) {
	        var glyph = pbf.readMessage(readGlyph, {});
	        fontstack.glyphs[glyph.id] = glyph;
	    }
	}
	
	function readGlyph(tag, glyph, pbf) {
	    if (tag === 1) glyph.id = pbf.readVarint();else if (tag === 2) glyph.bitmap = pbf.readBytes();else if (tag === 3) glyph.width = pbf.readVarint();else if (tag === 4) glyph.height = pbf.readVarint();else if (tag === 5) glyph.left = pbf.readSVarint();else if (tag === 6) glyph.top = pbf.readSVarint();else if (tag === 7) glyph.advance = pbf.readVarint();
	}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: David Tichy, Aleš Saska
	 */
	
	var _class = function () {
	    function _class() {
	        _classCallCheck(this, _class);
	
	        this._enable = true;
	    }
	
	    _createClass(_class, [{
	        key: "debounce",
	        value: function debounce(func, wait, immediate) {
	            var _this = this,
	                _arguments = arguments;
	
	            var timeout = void 0,
	                args = void 0,
	                context = void 0,
	                timestamp = void 0,
	                result = void 0;
	
	            var later = function later() {
	                var last = Date.now - timestamp;
	
	                if (last < wait && last > 0) {
	                    timeout = setTimeout(later, wait - last);
	                } else {
	                    timeout = null;
	                    if (!immediate) {
	                        if (_this._enable) {
	                            result = func.apply(context, args);
	                        }
	                        if (!timeout) context = args = null;
	                    }
	                }
	            };
	
	            return function () {
	                context = _this;
	                args = _arguments;
	                timestamp = Date.now;
	                var callNow = immediate && !timeout;
	                if (!timeout) timeout = setTimeout(later, wait);
	                if (callNow) {
	                    if (_this._enable) {
	                        result = func.apply(context, args);
	                    }
	                    context = args = null;
	                }
	
	                return result;
	            };
	        }
	    }, {
	        key: "disable",
	        value: function disable() {
	            this._enable = false;
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _geomutils = __webpack_require__(20);
	
	var _geomutils2 = _interopRequireDefault(_geomutils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska
	 */
	
	function pushUnique(arr, e) {
	  if (arr.indexOf(e) >= 0) return;
	  arr.push(e);
	}
	
	var _class = function () {
	  function _class(layers, insertTempLayer, draw, nodes, edges, checkUniqId) {
	    var _this = this;
	
	    _classCallCheck(this, _class);
	
	    this._layers = layers;
	    this._insertTempLayer = insertTempLayer;
	
	    this._draw = draw;
	    this._nodes = nodes;
	    this._edges = edges;
	    this._checkUniqId = checkUniqId;
	
	    this._toAddEdges = [];
	    this._toAddNodes = [];
	    this._toRemoveEdges = [];
	    this._toRemoveNodes = [];
	
	    //create support structures
	    this._nPos = {};
	    this._ePos = {};
	    this._eDirs = {};
	
	    nodes.forEach(function (n, i) {
	      _this._nPos[n.uniqid] = i;
	      _this._eDirs[n.uniqid] = {};
	    });
	
	    edges.forEach(function (e, i) {
	      var s = _geomutils2.default.edgeSource(e);
	      var t = _geomutils2.default.edgeTarget(e);
	
	      var si = s.uniqid || s.__uniqid;
	      var ti = t.uniqid || t.__uniqid;
	      (_this._eDirs[si] || (_this._eDirs[si] = {}))[ti] = e;
	      _this._ePos[e.uniqid] = i;
	    });
	
	    this._actualTempNodes = [];
	    this._actualTempEdges = [];
	  }
	
	  _createClass(_class, [{
	    key: "_doRemoveNodes",
	    value: function _doRemoveNodes(nodes) {
	      var _this2 = this;
	
	      nodes.forEach(function (n) {
	        if (n.uniqid === undefined) return;
	
	        if (_this2._nPos[n.uniqid] !== undefined) {
	          //in the normal graph
	          var pos = _this2._nPos[n.uniqid];
	          _this2._layers.main.removeNodeAtPos(pos);
	          delete _this2._nPos[n.uniqid];
	        } else {
	          //try to remove from temp graph
	
	          for (var i = 0; i < _this2._actualTempNodes.length; i++) {
	            if (_this2._actualTempNodes[i] === n) {
	              _this2._actualTempNodes.splice(i, 1);
	              break;
	            }
	          }
	        }
	
	        n.__uniqid = n.uniqid;
	        delete n.uniqid;
	      });
	    }
	  }, {
	    key: "_doRemoveEdges",
	    value: function _doRemoveEdges(edges) {
	      var _this3 = this;
	
	      edges.forEach(function (e) {
	        if (e.uniqid === undefined) return;
	
	        var s = _geomutils2.default.edgeSource(e);
	        var t = _geomutils2.default.edgeTarget(e);
	
	        delete (_this3._eDirs[s.uniqid || s.__uniqid] || {})[t.uniqid || t.__uniqid];
	
	        if (_this3._ePos[e.uniqid] !== undefined) {
	          //in the normal graph
	          var pos = _this3._ePos[e.uniqid];
	          _this3._layers.main.removeEdgeAtPos(pos);
	          delete _this3._ePos[e.uniqid];
	        } else {
	          //try to remove from temp graph
	
	          for (var i = 0; i < _this3._actualTempEdges.length; i++) {
	            if (_this3._actualTempEdges[i] === e) {
	              _this3._actualTempEdges.splice(i, 1);
	              break;
	            }
	          }
	        }
	
	        e.__uniqid = e.uniqid;
	        delete e.uniqid;
	      });
	    }
	  }, {
	    key: "_doAddEdges",
	    value: function _doAddEdges() {
	      var _this4 = this;
	
	      this._toAddEdges.forEach(function (e) {
	        //already added in main graph
	        if (_this4._ePos[e.uniqid] !== undefined) {
	          _this4._doRemoveEdges([e]);
	        }
	
	        if (e.uniqid !== undefined) {
	          console.error(e);
	          console.error("This edge has been already added, if you want to add same edge twice, create new object with same properties");
	          return;
	        }
	        _this4._checkUniqId(e);
	
	        //add this node into temporary chart
	
	        //TODO: Not so efficient >> causes quadratic complexity of adding edges into temporary graph
	        pushUnique(_this4._actualTempEdges, e);
	      });
	    }
	  }, {
	    key: "_doAddNodes",
	    value: function _doAddNodes(nodes) {
	      var _this5 = this;
	
	      this._toAddNodes.forEach(function (n) {
	        if (_this5._nPos[n.uniqid] !== undefined) {
	          _this5._doRemoveNodes([n]);
	        }
	
	        //already added
	        if (n.uniqid !== undefined) {
	          console.error(n);
	          console.error("This node has been already added, if you want to add same node twice, create new object with same properties");
	          return;
	        }
	        _this5._checkUniqId(n);
	
	        _this5._eDirs[n.uniqid] = {};
	
	        //TODO: Not so efficient >> causes quadratic complexity of adding nodes into temporary graph
	        pushUnique(_this5._actualTempNodes, n);
	      });
	    }
	  }, {
	    key: "addEdge",
	    value: function addEdge(e) {
	      var s = _geomutils2.default.edgeSource(e);
	      var t = _geomutils2.default.edgeTarget(e);
	
	      var tid = t.uniqid || t.__uniqid;
	      var sid = s.uniqid || s.__uniqid;
	
	      if ((this._eDirs[sid] || {})[tid]) {
	        //this edge was already added >> remove it
	        this._doRemoveEdges([e]);
	      }
	
	      if ((this._eDirs[tid] || {})[sid]) {
	        //must remove line and add two curves
	
	        this._toAddEdges.push(this._eDirs[tid][sid]);
	        this._doRemoveEdges([this._eDirs[tid][sid]]);
	
	        this._toAddEdges.push(this._eDirs[sid][tid] = e);
	
	        return this;
	      }
	
	      this._toAddEdges.push(e);
	      return this;
	    }
	  }, {
	    key: "addNode",
	    value: function addNode(n) {
	      this._toAddNodes.push(n);
	      return this;
	    }
	  }, {
	    key: "removeNode",
	    value: function removeNode(n) {
	      this._toRemoveNodes.push(n);
	      return this;
	    }
	  }, {
	    key: "removeEdge",
	    value: function removeEdge(e) {
	      this._toRemoveEdges.push(e);
	      return this;
	    }
	  }, {
	    key: "applyChanges",
	    value: function applyChanges() {
	
	      //nothing to do
	      if (this._toRemoveEdges.length === 0 && this._toRemoveNodes.length === 0 && this._toAddEdges.length === 0 && this._toAddNodes.length === 0) return this;
	
	      this._actualTempNodes = this._layers.temp ? this._layers.temp.nodes : [];
	      this._actualTempEdges = this._layers.temp ? this._layers.temp.edges : [];
	
	      this._doRemoveEdges(this._toRemoveEdges);
	      this._doRemoveNodes(this._toRemoveNodes);
	      this._doAddNodes();
	      this._doAddEdges();
	
	      this._toAddEdges = [];
	      this._toAddNodes = [];
	      this._toRemoveEdges = [];
	      this._toRemoveNodes = [];
	
	      this._insertTempLayer();
	      this._layers.temp.set(this._actualTempNodes, this._actualTempEdges);
	
	      this._draw();
	
	      return this;
	    }
	  }]);
	
	  return _class;
	}();
	
	exports.default = _class;
	;

/***/ })
/******/ ]);
//# sourceMappingURL=ccNetViz.js.map
if(typeof module !== "undefined")
module.exports = ccNetViz;