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
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
	
	var _textures = __webpack_require__(32);
	
	var _textures2 = _interopRequireDefault(_textures);
	
	var _files = __webpack_require__(33);
	
	var _files2 = _interopRequireDefault(_files);
	
	var _texts = __webpack_require__(34);
	
	var _texts2 = _interopRequireDefault(_texts);
	
	var _lazyEvents = __webpack_require__(42);
	
	var _lazyEvents2 = _interopRequireDefault(_lazyEvents);
	
	var _interactivityBatch = __webpack_require__(43);
	
	var _interactivityBatch2 = _interopRequireDefault(_interactivityBatch);
	
	var _spatialSearch = __webpack_require__(29);
	
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
	    var layout_options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	    if (checkRemoved()) return _this;
	
	    nodes = n || [];
	    edges = e || [];
	
	    nodes.forEach(checkUniqId);
	    edges.forEach(checkUniqId);
	
	    layers.temp && layers.temp.set([], [], layout, layout_options);
	    layers.main.set(nodes, edges, layout, layout_options);
	
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
	      evts[k] && el.addEventListener(k, evts[k], { passive: true });
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
	
	    this.set = function (nodes, edges, layout, layout_options) {
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
	
	        layout && new _layout2.default[layout](nodes, edges, layout_options).apply() && _layout2.default.normalize(nodes);
	
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
	
	var _geomutils = __webpack_require__(28);
	
	var _geomutils2 = _interopRequireDefault(_geomutils);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _primitiveTools = __webpack_require__(8);
	
	var _spatialSearch = __webpack_require__(29);
	
	var _spatialSearch2 = _interopRequireDefault(_spatialSearch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 7 */
/***/ function(module, exports) {

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
	      xmlhttp.onreadystatechange = function (cbk) {
	        return function () {
	          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	            cbk(type == 'arraybuffer' ? xmlhttp.response : xmlhttp.responseText);
	          }
	        };
	      }(callback);
	      if (type) xmlhttp.responseType = type;
	      xmlhttp.open("GET", url, true);
	      xmlhttp.send();
	    }
	  }]);
	
	  return Utils;
	}();
	
	exports.default = Utils;
	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

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
	
	var _tree = __webpack_require__(15);
	
	var _tree2 = _interopRequireDefault(_tree);
	
	var _treeT = __webpack_require__(16);
	
	var _treeT2 = _interopRequireDefault(_treeT);
	
	var _hierarchical = __webpack_require__(17);
	
	var _hierarchical2 = _interopRequireDefault(_hierarchical);
	
	var _hierarchical3 = __webpack_require__(18);
	
	var _hierarchical4 = _interopRequireDefault(_hierarchical3);
	
	var _spectral = __webpack_require__(19);
	
	var _spectral2 = _interopRequireDefault(_spectral);
	
	var _spectral3 = __webpack_require__(24);
	
	var _spectral4 = _interopRequireDefault(_spectral3);
	
	var _hive = __webpack_require__(25);
	
	var _hive2 = _interopRequireDefault(_hive);
	
	var _grid = __webpack_require__(26);
	
	var _grid2 = _interopRequireDefault(_grid);
	
	var _versinus = __webpack_require__(27);
	
	var _versinus2 = _interopRequireDefault(_versinus);
	
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
	  }, {
	    key: 'spectral2',
	    get: function get() {
	      return _spectral4.default;
	    }
	  }, {
	    key: 'hive',
	    get: function get() {
	      return _hive2.default;
	    }
	  }, {
	    key: 'grid',
	    get: function get() {
	      return _grid2.default;
	    }
	  }, {
	    key: 'versinus',
	    get: function get() {
	      return _versinus2.default;
	    }
	  }]);

	  return _class;
	}();

	exports.default = _class;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 11 */
/***/ function(module, exports) {

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

/***/ },
/* 12 */
/***/ function(module, exports) {

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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2017, Helikar Lab.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Author: Renato Fabbri
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _utils = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	    function _class(nodes, edges, layout_options) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	        this._angle_step = 2 * Math.PI / nodes.length;
	        if (layout_options.starting_angle == null) this._starting_angle = 0;else this._starting_angle = layout_options.starting_angle;
	    }
	
	    _createClass(_class, [{
	        key: 'apply',
	        value: function apply() {
	            var nd = (0, _utils.degrees)(this._nodes, this._edges);
	            for (var i = 0; i < this._nodes.length; ++i) {
	                this._nodes[nd.nodes[i].index].x = 0.05 + (1 + Math.cos(this._starting_angle + i * this._angle_step)) * .45;
	                this._nodes[nd.nodes[i].index].y = 0.05 + (1 + Math.sin(this._starting_angle + i * this._angle_step)) * .45;
	                this._nodes[nd.nodes[i].index].weight = nd.degrees[i];
	            }
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.create2dArray = create2dArray;
	exports.degrees = degrees;
	exports.getDepth = getDepth;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
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
	
	function getDepth(obj) {
	    var depth = 0;
	    if (obj.children) {
	        obj.children.forEach(function (d) {
	            if (d.depth_visited == true) {
	                throw new Error("This layout is only for trees acyclic graphs");
	            }
	            d.depth_visited = true;
	            var tmpDepth = getDepth(d);
	            if (tmpDepth > depth) {
	                depth = tmpDepth;
	            }
	        });
	    }
	    return 1 + depth;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2017, Helikar Lab.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Author: Renato Fabbri
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _utils = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	    }
	
	    _createClass(_class, [{
	        key: 'drawTreeCentered',
	        value: function drawTreeCentered(root) {
	            var visited_leafs_parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	            var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
	            root.centered = true;
	            root.depth_visited = false; // so that getDepth does not raise error if another tree layout is called subsequently
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
	        key: 'apply',
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
	            var depth = (0, _utils.getDepth)(root);
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2017, Helikar Lab.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Author: Renato Fabbri
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _utils = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	    }
	
	    _createClass(_class, [{
	        key: 'drawTreeTop',
	        value: function drawTreeTop(root) {
	            var visited_leafs_parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	            var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
	            // each node is in vertically on the top of the stack of its leafs
	            root.visited = true;
	            root.depth_visited = false; // so that getDepth does not raise error if another tree layout is called subsequently
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
	        key: 'apply',
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
	            var depth = (0, _utils.getDepth)(root);
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
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ },
/* 17 */
/***/ function(module, exports) {

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
	            for (var _i = 0; _i < nodes.length; _i++) {
	                var neighbors = nodes[_i].parents.concat(nodes[_i].children);
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
	                for (var _i2 = 0; _i2 < nodes.length; _i2++) {
	                    if (nodes[_i2].parents.length == 0) {
	                        roots.push(nodes[_i2]);
	                    }
	                }
	            }
	            if (roots.length == 0) {
	                (function () {
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
	                })();
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
	            for (var _i3 = 0; _i3 < this._nodes.length; ++_i3) {
	                this._nodes[_i3].x = this.alphax + stepx * (this._nodes[_i3].layer - 1);
	            }
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ },
/* 18 */
/***/ function(module, exports) {

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
	
	function isOrphan(node) {
	    var orphan = true;
	    for (var i = 0; i < node.parents.length; ++i) {
	        var parent_ = node.parents[i];
	        if (parent_ != node) orphan = false;
	    }
	    for (var _i = 0; _i < node.children.length; ++_i) {
	        var child = node.children[_i];
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
	                for (var _i2 = 0; _i2 < nodes.length; _i2++) {
	                    if (nodes[_i2].parents.length == 0) {
	                        roots.push(nodes[_i2]);
	                    }
	                }
	            }
	            if (roots.length == 0) {
	                (function () {
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
	                })();
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
	                    var _lowest_layer = max_layer;
	                    var parent_found = false;
	                    for (var _j = 0; _j < node.parents.length; ++_j) {
	                        var parent_ = node.parents[_j];
	                        if (parent_.visited == true) {
	                            parent_found = true;
	                            if (parent_.layer <= _lowest_layer) {
	                                // child has to be visited to have a layer
	                                _lowest_layer = parent_.layer;
	                            }
	                        }
	                    }
	                    if (parent_found) {
	                        node.visited = true;
	                        node.x = _lowest_layer + sep;
	                        if (!(_lowest_layer + sep in layers)) layers[_lowest_layer + sep] = [];
	                        layers[_lowest_layer + sep].push(node);
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
	            for (var _i3 = 0; _i3 < nodes.length; _i3++) {
	                var candidates = nodes[_i3].children;
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
	            for (var _i4 = 0; _i4 < this.components.current_component; _i4++) {
	                var component = this.components[_i4];
	                for (var layer_val in component.layers) {
	                    var layer = component.layers[layer_val];
	                    if (layer.length == 1) {
	                        var node = layer[0];
	                        node.x = this.alphax + stepx * layer_val;
	                        node.y = this.alphay + stepy * (component.index_offset + component.vertical_nodes / 2);
	                    } else {
	                        for (var k = 0; k < layer.length; ++k) {
	                            var _node = layer[k];
	                            _node.x = this.alphax + stepx * layer_val;
	                            _node.y = this.alphay + stepy * (component.index_offset + k);
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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2017, Helikar Lab.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Author: Renato Fabbri
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _mlMatrix = __webpack_require__(20);
	
	var _utils = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function twoSmallest(arr) {
	    var min = Math.min.apply(null, arr),
	        // get the max of the array
	    mini = arr.indexOf(min);
	    arr[mini] = Infinity; // replace max in the array with -infinity
	    var second_min = Math.min.apply(null, arr),
	        // get the new max 
	    second_mini = arr.indexOf(second_min);
	    arr[second_mini] = Infinity; // replace max in the array with -infinity
	    var third_min = Math.min.apply(null, arr),
	        // get the new max 
	    third_mini = arr.indexOf(third_min);
	    return [second_mini, third_mini];
	}
	
	function normalize(x, y) {
	    var maxx = Math.max.apply(null, x.map(Math.abs)),
	        maxy = Math.max.apply(null, y.map(Math.abs));
	    var minx = Math.min.apply(null, x),
	        miny = Math.min.apply(null, y);
	    for (var i = 0; i < x.length; ++i) {
	        x[i] = 0.1 + (x[i] - minx) / ((maxx - minx) * 1.25);
	        y[i] = 0.1 + (y[i] - miny) / ((maxy - miny) * 1.25);
	    }
	    return [x, y];
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
	            var A = (0, _utils.create2dArray)(this._nodes.length, this._nodes.length);
	            // build the adjacency matrix
	            for (var i = 0; i < this._edges.length; ++i) {
	                var ii = this._edges[i].source.index;
	                var j = this._edges[i].target.index;
	                A[ii][j] = -1; // not considering edge weight for now (the example json files don't have weight)
	                A[j][ii] = -1; // not considering edge weight for now (the example json files don't have weight)
	            }
	            // build the diagonal of degrees
	            // NOT subtract adjacency from degrees but:
	            // substitute diagonal by degrees
	            for (var _i = 0; _i < this._nodes.length; ++_i) {
	                A[_i][_i] = -A[_i].reduce(function (a, b) {
	                    return a + b;
	                }, 0);
	            }
	            var foo = new _mlMatrix.EigenvalueDecomposition(A);
	            var iii = twoSmallest(foo.realEigenvalues);
	            var foo_ = foo.eigenvectorMatrix.transpose();
	            var x = foo_[iii[0]];
	            var y = foo_[iii[1]];
	            var xy = normalize(x, y);
	            // var fooo = new Matrix.EigenvalueDecomposition(A);
	            // var fooo = new Matrix.EigenvalueDecomposition(A);
	            // recipe from http://www.sfu.ca/personal/archives/richards/Pages/NAS.AJS-WDR.pdf
	            // and implemented in networkx/drawing/layout.py
	            this._nodes.forEach(function (node, i) {
	                node.x = xy[0][i];
	                node.y = xy[1][i];
	            });
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
	
	var rescale = _interopDefault(__webpack_require__(21));
	
	if (!Symbol.species) {
	    Symbol.species = Symbol.for('@@species');
	}
	
	/**
	 * @class LuDecomposition
	 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	 * @param {Matrix} matrix
	 */
	class LuDecomposition$$1 {
	    constructor(matrix) {
	        matrix = WrapperMatrix2D.checkMatrix(matrix);
	
	        var lu = matrix.clone();
	        var rows = lu.rows;
	        var columns = lu.columns;
	        var pivotVector = new Array(rows);
	        var pivotSign = 1;
	        var i, j, k, p, s, t, v;
	        var LUcolj, kmax;
	
	        for (i = 0; i < rows; i++) {
	            pivotVector[i] = i;
	        }
	
	        LUcolj = new Array(rows);
	
	        for (j = 0; j < columns; j++) {
	
	            for (i = 0; i < rows; i++) {
	                LUcolj[i] = lu.get(i, j);
	            }
	
	            for (i = 0; i < rows; i++) {
	                kmax = Math.min(i, j);
	                s = 0;
	                for (k = 0; k < kmax; k++) {
	                    s += lu.get(i, k) * LUcolj[k];
	                }
	                LUcolj[i] -= s;
	                lu.set(i, j, LUcolj[i]);
	            }
	
	            p = j;
	            for (i = j + 1; i < rows; i++) {
	                if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                    p = i;
	                }
	            }
	
	            if (p !== j) {
	                for (k = 0; k < columns; k++) {
	                    t = lu.get(p, k);
	                    lu.set(p, k, lu.get(j, k));
	                    lu.set(j, k, t);
	                }
	
	                v = pivotVector[p];
	                pivotVector[p] = pivotVector[j];
	                pivotVector[j] = v;
	
	                pivotSign = -pivotSign;
	            }
	
	            if (j < rows && lu.get(j, j) !== 0) {
	                for (i = j + 1; i < rows; i++) {
	                    lu.set(i, j, lu.get(i, j) / lu.get(j, j));
	                }
	            }
	        }
	
	        this.LU = lu;
	        this.pivotVector = pivotVector;
	        this.pivotSign = pivotSign;
	    }
	
	    /**
	     *
	     * @return {boolean}
	     */
	    isSingular() {
	        var data = this.LU;
	        var col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    }
	
	    /**
	     *
	     * @param {Matrix} value
	     * @return {Matrix}
	     */
	    solve(value) {
	        value = Matrix.checkMatrix(value);
	
	        var lu = this.LU;
	        var rows = lu.rows;
	
	        if (rows !== value.rows) {
	            throw new Error('Invalid matrix dimensions');
	        }
	        if (this.isSingular()) {
	            throw new Error('LU matrix is singular');
	        }
	
	        var count = value.columns;
	        var X = value.subMatrixRow(this.pivotVector, 0, count - 1);
	        var columns = lu.columns;
	        var i, j, k;
	
	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	
	    /**
	     *
	     * @return {number}
	     */
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare()) {
	            throw new Error('Matrix must be square');
	        }
	        var determinant = this.pivotSign;
	        var col = data.columns;
	        for (var j = 0; j < col; j++) {
	            determinant *= data[j][j];
	        }
	        return determinant;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get lowerTriangularMatrix() {
	        var data = this.LU;
	        var rows = data.rows;
	        var columns = data.columns;
	        var X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get upperTriangularMatrix() {
	        var data = this.LU;
	        var rows = data.rows;
	        var columns = data.columns;
	        var X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    }
	
	    /**
	     *
	     * @return {Array<number>}
	     */
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    }
	}
	
	function hypotenuse(a, b) {
	    var r = 0;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	}
	
	function getFilled2DArray(rows, columns, value) {
	    var array = new Array(rows);
	    for (var i = 0; i < rows; i++) {
	        array[i] = new Array(columns);
	        for (var j = 0; j < columns; j++) {
	            array[i][j] = value;
	        }
	    }
	    return array;
	}
	
	/**
	 * @class SingularValueDecomposition
	 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	 * @param {Matrix} value
	 * @param {object} [options]
	 * @param {boolean} [options.computeLeftSingularVectors=true]
	 * @param {boolean} [options.computeRightSingularVectors=true]
	 * @param {boolean} [options.autoTranspose=false]
	 */
	class SingularValueDecomposition$$1 {
	    constructor(value, options = {}) {
	        value = WrapperMatrix2D.checkMatrix(value);
	
	        var m = value.rows;
	        var n = value.columns;
	        var nu = Math.min(m, n);
	
	        const {
	            computeLeftSingularVectors = true,
	            computeRightSingularVectors = true,
	            autoTranspose = false
	        } = options;
	
	        var wantu = Boolean(computeLeftSingularVectors);
	        var wantv = Boolean(computeRightSingularVectors);
	
	        var swapped = false;
	        var a;
	        if (m < n) {
	            if (!autoTranspose) {
	                a = value.clone();
	                // eslint-disable-next-line no-console
	                console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	            } else {
	                a = value.transpose();
	                m = a.rows;
	                n = a.columns;
	                swapped = true;
	                var aux = wantu;
	                wantu = wantv;
	                wantv = aux;
	            }
	        } else {
	            a = value.clone();
	        }
	
	        var s = new Array(Math.min(m + 1, n));
	        var U = getFilled2DArray(m, nu, 0);
	        var V = getFilled2DArray(n, n, 0);
	        var e = new Array(n);
	        var work = new Array(m);
	
	        var nct = Math.min(m - 1, n);
	        var nrt = Math.max(0, Math.min(n - 2, m));
	
	        var i, j, k, p, t, ks, f, cs, sn, max, kase,
	            scale, sp, spm1, epm1, sk, ek, b, c, shift, g;
	
	        for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	            if (k < nct) {
	                s[k] = 0;
	                for (i = k; i < m; i++) {
	                    s[k] = hypotenuse(s[k], a[i][k]);
	                }
	                if (s[k] !== 0) {
	                    if (a[k][k] < 0) {
	                        s[k] = -s[k];
	                    }
	                    for (i = k; i < m; i++) {
	                        a[i][k] /= s[k];
	                    }
	                    a[k][k] += 1;
	                }
	                s[k] = -s[k];
	            }
	
	            for (j = k + 1; j < n; j++) {
	                if ((k < nct) && (s[k] !== 0)) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += a[i][k] * a[i][j];
	                    }
	                    t = -t / a[k][k];
	                    for (i = k; i < m; i++) {
	                        a[i][j] += t * a[i][k];
	                    }
	                }
	                e[j] = a[k][j];
	            }
	
	            if (wantu && (k < nct)) {
	                for (i = k; i < m; i++) {
	                    U[i][k] = a[i][k];
	                }
	            }
	
	            if (k < nrt) {
	                e[k] = 0;
	                for (i = k + 1; i < n; i++) {
	                    e[k] = hypotenuse(e[k], e[i]);
	                }
	                if (e[k] !== 0) {
	                    if (e[k + 1] < 0) {
	                        e[k] = 0 - e[k];
	                    }
	                    for (i = k + 1; i < n; i++) {
	                        e[i] /= e[k];
	                    }
	                    e[k + 1] += 1;
	                }
	                e[k] = -e[k];
	                if ((k + 1 < m) && (e[k] !== 0)) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] = 0;
	                    }
	                    for (j = k + 1; j < n; j++) {
	                        for (i = k + 1; i < m; i++) {
	                            work[i] += e[j] * a[i][j];
	                        }
	                    }
	                    for (j = k + 1; j < n; j++) {
	                        t = -e[j] / e[k + 1];
	                        for (i = k + 1; i < m; i++) {
	                            a[i][j] += t * work[i];
	                        }
	                    }
	                }
	                if (wantv) {
	                    for (i = k + 1; i < n; i++) {
	                        V[i][k] = e[i];
	                    }
	                }
	            }
	        }
	
	        p = Math.min(n, m + 1);
	        if (nct < n) {
	            s[nct] = a[nct][nct];
	        }
	        if (m < p) {
	            s[p - 1] = 0;
	        }
	        if (nrt + 1 < p) {
	            e[nrt] = a[nrt][p - 1];
	        }
	        e[p - 1] = 0;
	
	        if (wantu) {
	            for (j = nct; j < nu; j++) {
	                for (i = 0; i < m; i++) {
	                    U[i][j] = 0;
	                }
	                U[j][j] = 1;
	            }
	            for (k = nct - 1; k >= 0; k--) {
	                if (s[k] !== 0) {
	                    for (j = k + 1; j < nu; j++) {
	                        t = 0;
	                        for (i = k; i < m; i++) {
	                            t += U[i][k] * U[i][j];
	                        }
	                        t = -t / U[k][k];
	                        for (i = k; i < m; i++) {
	                            U[i][j] += t * U[i][k];
	                        }
	                    }
	                    for (i = k; i < m; i++) {
	                        U[i][k] = -U[i][k];
	                    }
	                    U[k][k] = 1 + U[k][k];
	                    for (i = 0; i < k - 1; i++) {
	                        U[i][k] = 0;
	                    }
	                } else {
	                    for (i = 0; i < m; i++) {
	                        U[i][k] = 0;
	                    }
	                    U[k][k] = 1;
	                }
	            }
	        }
	
	        if (wantv) {
	            for (k = n - 1; k >= 0; k--) {
	                if ((k < nrt) && (e[k] !== 0)) {
	                    for (j = k + 1; j < n; j++) {
	                        t = 0;
	                        for (i = k + 1; i < n; i++) {
	                            t += V[i][k] * V[i][j];
	                        }
	                        t = -t / V[k + 1][k];
	                        for (i = k + 1; i < n; i++) {
	                            V[i][j] += t * V[i][k];
	                        }
	                    }
	                }
	                for (i = 0; i < n; i++) {
	                    V[i][k] = 0;
	                }
	                V[k][k] = 1;
	            }
	        }
	
	        var pp = p - 1;
	        var iter = 0;
	        var eps = Number.EPSILON;
	        while (p > 0) {
	            for (k = p - 2; k >= -1; k--) {
	                if (k === -1) {
	                    break;
	                }
	                if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                    e[k] = 0;
	                    break;
	                }
	            }
	            if (k === p - 2) {
	                kase = 4;
	            } else {
	                for (ks = p - 1; ks >= k; ks--) {
	                    if (ks === k) {
	                        break;
	                    }
	                    t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                    if (Math.abs(s[ks]) <= eps * t) {
	                        s[ks] = 0;
	                        break;
	                    }
	                }
	                if (ks === k) {
	                    kase = 3;
	                } else if (ks === p - 1) {
	                    kase = 1;
	                } else {
	                    kase = 2;
	                    k = ks;
	                }
	            }
	
	            k++;
	
	            switch (kase) {
	                case 1: {
	                    f = e[p - 2];
	                    e[p - 2] = 0;
	                    for (j = p - 2; j >= k; j--) {
	                        t = hypotenuse(s[j], f);
	                        cs = s[j] / t;
	                        sn = f / t;
	                        s[j] = t;
	                        if (j !== k) {
	                            f = -sn * e[j - 1];
	                            e[j - 1] = cs * e[j - 1];
	                        }
	                        if (wantv) {
	                            for (i = 0; i < n; i++) {
	                                t = cs * V[i][j] + sn * V[i][p - 1];
	                                V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                                V[i][j] = t;
	                            }
	                        }
	                    }
	                    break;
	                }
	                case 2 : {
	                    f = e[k - 1];
	                    e[k - 1] = 0;
	                    for (j = k; j < p; j++) {
	                        t = hypotenuse(s[j], f);
	                        cs = s[j] / t;
	                        sn = f / t;
	                        s[j] = t;
	                        f = -sn * e[j];
	                        e[j] = cs * e[j];
	                        if (wantu) {
	                            for (i = 0; i < m; i++) {
	                                t = cs * U[i][j] + sn * U[i][k - 1];
	                                U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                                U[i][j] = t;
	                            }
	                        }
	                    }
	                    break;
	                }
	                case 3 : {
	                    scale = Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2]), Math.abs(e[p - 2]), Math.abs(s[k]), Math.abs(e[k]));
	                    sp = s[p - 1] / scale;
	                    spm1 = s[p - 2] / scale;
	                    epm1 = e[p - 2] / scale;
	                    sk = s[k] / scale;
	                    ek = e[k] / scale;
	                    b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                    c = (sp * epm1) * (sp * epm1);
	                    shift = 0;
	                    if ((b !== 0) || (c !== 0)) {
	                        shift = Math.sqrt(b * b + c);
	                        if (b < 0) {
	                            shift = -shift;
	                        }
	                        shift = c / (b + shift);
	                    }
	                    f = (sk + sp) * (sk - sp) + shift;
	                    g = sk * ek;
	                    for (j = k; j < p - 1; j++) {
	                        t = hypotenuse(f, g);
	                        cs = f / t;
	                        sn = g / t;
	                        if (j !== k) {
	                            e[j - 1] = t;
	                        }
	                        f = cs * s[j] + sn * e[j];
	                        e[j] = cs * e[j] - sn * s[j];
	                        g = sn * s[j + 1];
	                        s[j + 1] = cs * s[j + 1];
	                        if (wantv) {
	                            for (i = 0; i < n; i++) {
	                                t = cs * V[i][j] + sn * V[i][j + 1];
	                                V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                                V[i][j] = t;
	                            }
	                        }
	                        t = hypotenuse(f, g);
	                        cs = f / t;
	                        sn = g / t;
	                        s[j] = t;
	                        f = cs * e[j] + sn * s[j + 1];
	                        s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                        g = sn * e[j + 1];
	                        e[j + 1] = cs * e[j + 1];
	                        if (wantu && (j < m - 1)) {
	                            for (i = 0; i < m; i++) {
	                                t = cs * U[i][j] + sn * U[i][j + 1];
	                                U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                                U[i][j] = t;
	                            }
	                        }
	                    }
	                    e[p - 2] = f;
	                    iter = iter + 1;
	                    break;
	                }
	                case 4: {
	                    if (s[k] <= 0) {
	                        s[k] = (s[k] < 0 ? -s[k] : 0);
	                        if (wantv) {
	                            for (i = 0; i <= pp; i++) {
	                                V[i][k] = -V[i][k];
	                            }
	                        }
	                    }
	                    while (k < pp) {
	                        if (s[k] >= s[k + 1]) {
	                            break;
	                        }
	                        t = s[k];
	                        s[k] = s[k + 1];
	                        s[k + 1] = t;
	                        if (wantv && (k < n - 1)) {
	                            for (i = 0; i < n; i++) {
	                                t = V[i][k + 1];
	                                V[i][k + 1] = V[i][k];
	                                V[i][k] = t;
	                            }
	                        }
	                        if (wantu && (k < m - 1)) {
	                            for (i = 0; i < m; i++) {
	                                t = U[i][k + 1];
	                                U[i][k + 1] = U[i][k];
	                                U[i][k] = t;
	                            }
	                        }
	                        k++;
	                    }
	                    iter = 0;
	                    p--;
	                    break;
	                }
	                // no default
	            }
	        }
	
	        if (swapped) {
	            var tmp = V;
	            V = U;
	            U = tmp;
	        }
	
	        this.m = m;
	        this.n = n;
	        this.s = s;
	        this.U = U;
	        this.V = V;
	    }
	
	    /**
	     * Solve a problem of least square (Ax=b) by using the SVD. Useful when A is singular. When A is not singular, it would be better to use qr.solve(value).
	     * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :
	     * var svd = SingularValueDecomposition(A);
	     * var x = svd.solve(b);
	     * @param {Matrix} value - Matrix 1D which is the vector b (in the equation Ax = b)
	     * @return {Matrix} - The vector x
	     */
	    solve(value) {
	
	        var Y = value;
	        var e = this.threshold;
	        var scols = this.s.length;
	        var Ls = Matrix.zeros(scols, scols);
	        var i;
	
	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }
	
	        var U = this.U;
	        var V = this.rightSingularVectors;
	
	        var VL = V.mmul(Ls);
	        var vrows = V.rows;
	        var urows = U.length;
	        var VLU = Matrix.zeros(vrows, urows);
	        var j, k, sum;
	
	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }
	
	        return VLU.mmul(Y);
	    }
	
	    /**
	     *
	     * @param {Array<number>} value
	     * @return {Matrix}
	     */
	    solveForDiagonal(value) {
	        return this.solve(Matrix.diag(value));
	    }
	
	    /**
	     * Get the inverse of the matrix. We compute the inverse of a matrix using SVD when this matrix is singular or ill-conditioned. Example :
	     * var svd = SingularValueDecomposition(A);
	     * var inverseA = svd.inverse();
	     * @return {Matrix} - The approximation of the inverse of the matrix
	     */
	    inverse() {
	        var V = this.V;
	        var e = this.threshold;
	        var vrows = V.length;
	        var vcols = V[0].length;
	        var X = new Matrix(vrows, this.s.length);
	        var i, j;
	
	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	
	        var U = this.U;
	
	        var urows = U.length;
	        var ucols = U[0].length;
	        var Y = new Matrix(vrows, urows);
	        var k, sum;
	
	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }
	
	        return Y;
	    }
	
	    /**
	     *
	     * @return {number}
	     */
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    }
	
	    /**
	     *
	     * @return {number}
	     */
	    get norm2() {
	        return this.s[0];
	    }
	
	    /**
	     *
	     * @return {number}
	     */
	    get rank() {
	        var tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
	        var r = 0;
	        var s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    }
	
	    /**
	     *
	     * @return {Array<number>}
	     */
	    get diagonal() {
	        return this.s;
	    }
	
	    /**
	     *
	     * @return {number}
	     */
	    get threshold() {
	        return (Number.EPSILON / 2) * Math.max(this.m, this.n) * this.s[0];
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get leftSingularVectors() {
	        if (!Matrix.isMatrix(this.U)) {
	            this.U = new Matrix(this.U);
	        }
	        return this.U;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get rightSingularVectors() {
	        if (!Matrix.isMatrix(this.V)) {
	            this.V = new Matrix(this.V);
	        }
	        return this.V;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    }
	}
	
	/**
	 * @private
	 * Check that a row index is not out of bounds
	 * @param {Matrix} matrix
	 * @param {number} index
	 * @param {boolean} [outer]
	 */
	function checkRowIndex(matrix, index, outer) {
	    var max = outer ? matrix.rows : matrix.rows - 1;
	    if (index < 0 || index > max) {
	        throw new RangeError('Row index out of range');
	    }
	}
	
	/**
	 * @private
	 * Check that a column index is not out of bounds
	 * @param {Matrix} matrix
	 * @param {number} index
	 * @param {boolean} [outer]
	 */
	function checkColumnIndex(matrix, index, outer) {
	    var max = outer ? matrix.columns : matrix.columns - 1;
	    if (index < 0 || index > max) {
	        throw new RangeError('Column index out of range');
	    }
	}
	
	/**
	 * @private
	 * Check that the provided vector is an array with the right length
	 * @param {Matrix} matrix
	 * @param {Array|Matrix} vector
	 * @return {Array}
	 * @throws {RangeError}
	 */
	function checkRowVector(matrix, vector) {
	    if (vector.to1DArray) {
	        vector = vector.to1DArray();
	    }
	    if (vector.length !== matrix.columns) {
	        throw new RangeError('vector size must be the same as the number of columns');
	    }
	    return vector;
	}
	
	/**
	 * @private
	 * Check that the provided vector is an array with the right length
	 * @param {Matrix} matrix
	 * @param {Array|Matrix} vector
	 * @return {Array}
	 * @throws {RangeError}
	 */
	function checkColumnVector(matrix, vector) {
	    if (vector.to1DArray) {
	        vector = vector.to1DArray();
	    }
	    if (vector.length !== matrix.rows) {
	        throw new RangeError('vector size must be the same as the number of rows');
	    }
	    return vector;
	}
	
	function checkIndices(matrix, rowIndices, columnIndices) {
	    return {
	        row: checkRowIndices(matrix, rowIndices),
	        column: checkColumnIndices(matrix, columnIndices)
	    };
	}
	
	function checkRowIndices(matrix, rowIndices) {
	    if (typeof rowIndices !== 'object') {
	        throw new TypeError('unexpected type for row indices');
	    }
	
	    var rowOut = rowIndices.some(r => {
	        return r < 0 || r >= matrix.rows;
	
	    });
	
	    if (rowOut) {
	        throw new RangeError('row indices are out of range');
	    }
	
	    if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);
	
	    return rowIndices;
	}
	
	function checkColumnIndices(matrix, columnIndices) {
	    if (typeof columnIndices !== 'object') {
	        throw new TypeError('unexpected type for column indices');
	    }
	
	    var columnOut = columnIndices.some(c => {
	        return c < 0 || c >= matrix.columns;
	    });
	
	    if (columnOut) {
	        throw new RangeError('column indices are out of range');
	    }
	    if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);
	
	    return columnIndices;
	}
	
	function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
	    if (arguments.length !== 5) throw new TypeError('Invalid argument type');
	    var notAllNumbers = Array.from(arguments).slice(1).some(function (arg) {
	        return typeof arg !== 'number';
	    });
	    if (notAllNumbers) throw new TypeError('Invalid argument type');
	    if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix.rows || endRow < 0 || endRow >= matrix.rows || startColumn < 0 || startColumn >= matrix.columns || endColumn < 0 || endColumn >= matrix.columns) {
	        throw new RangeError('Submatrix indices are out of range');
	    }
	}
	
	
	
	function sumByRow(matrix) {
	    var sum = Matrix.zeros(matrix.rows, 1);
	    for (var i = 0; i < matrix.rows; ++i) {
	        for (var j = 0; j < matrix.columns; ++j) {
	            sum.set(i, 0, sum.get(i, 0) + matrix.get(i, j));
	        }
	    }
	    return sum;
	}
	
	function sumByColumn(matrix) {
	    var sum = Matrix.zeros(1, matrix.columns);
	    for (var i = 0; i < matrix.rows; ++i) {
	        for (var j = 0; j < matrix.columns; ++j) {
	            sum.set(0, j, sum.get(0, j) + matrix.get(i, j));
	        }
	    }
	    return sum;
	}
	
	function sumAll(matrix) {
	    var v = 0;
	    for (var i = 0; i < matrix.rows; i++) {
	        for (var j = 0; j < matrix.columns; j++) {
	            v += matrix.get(i, j);
	        }
	    }
	    return v;
	}
	
	class BaseView extends AbstractMatrix() {
	    constructor(matrix, rows, columns) {
	        super();
	        this.matrix = matrix;
	        this.rows = rows;
	        this.columns = columns;
	    }
	
	    static get [Symbol.species]() {
	        return Matrix;
	    }
	}
	
	class MatrixTransposeView extends BaseView {
	    constructor(matrix) {
	        super(matrix, matrix.columns, matrix.rows);
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(columnIndex, rowIndex, value);
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.matrix.get(columnIndex, rowIndex);
	    }
	}
	
	class MatrixRowView extends BaseView {
	    constructor(matrix, row) {
	        super(matrix, 1, matrix.columns);
	        this.row = row;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(this.row, columnIndex, value);
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.matrix.get(this.row, columnIndex);
	    }
	}
	
	class MatrixSubView extends BaseView {
	    constructor(matrix, startRow, endRow, startColumn, endColumn) {
	        checkRange(matrix, startRow, endRow, startColumn, endColumn);
	        super(matrix, endRow - startRow + 1, endColumn - startColumn + 1);
	        this.startRow = startRow;
	        this.startColumn = startColumn;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(this.startRow + rowIndex, this.startColumn + columnIndex, value);
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.matrix.get(this.startRow + rowIndex, this.startColumn + columnIndex);
	    }
	}
	
	class MatrixSelectionView extends BaseView {
	    constructor(matrix, rowIndices, columnIndices) {
	        var indices = checkIndices(matrix, rowIndices, columnIndices);
	        super(matrix, indices.row.length, indices.column.length);
	        this.rowIndices = indices.row;
	        this.columnIndices = indices.column;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(this.rowIndices[rowIndex], this.columnIndices[columnIndex], value);
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.matrix.get(this.rowIndices[rowIndex], this.columnIndices[columnIndex]);
	    }
	}
	
	class MatrixRowSelectionView extends BaseView {
	    constructor(matrix, rowIndices) {
	        rowIndices = checkRowIndices(matrix, rowIndices);
	        super(matrix, rowIndices.length, matrix.columns);
	        this.rowIndices = rowIndices;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(this.rowIndices[rowIndex], columnIndex, value);
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.matrix.get(this.rowIndices[rowIndex], columnIndex);
	    }
	}
	
	class MatrixColumnSelectionView extends BaseView {
	    constructor(matrix, columnIndices) {
	        columnIndices = checkColumnIndices(matrix, columnIndices);
	        super(matrix, matrix.rows, columnIndices.length);
	        this.columnIndices = columnIndices;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(rowIndex, this.columnIndices[columnIndex], value);
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.matrix.get(rowIndex, this.columnIndices[columnIndex]);
	    }
	}
	
	class MatrixColumnView extends BaseView {
	    constructor(matrix, column) {
	        super(matrix, matrix.rows, 1);
	        this.column = column;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(rowIndex, this.column, value);
	        return this;
	    }
	
	    get(rowIndex) {
	        return this.matrix.get(rowIndex, this.column);
	    }
	}
	
	class MatrixFlipRowView extends BaseView {
	    constructor(matrix) {
	        super(matrix, matrix.rows, matrix.columns);
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(this.rows - rowIndex - 1, columnIndex, value);
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.matrix.get(this.rows - rowIndex - 1, columnIndex);
	    }
	}
	
	class MatrixFlipColumnView extends BaseView {
	    constructor(matrix) {
	        super(matrix, matrix.rows, matrix.columns);
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.matrix.set(rowIndex, this.columns - columnIndex - 1, value);
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.matrix.get(rowIndex, this.columns - columnIndex - 1);
	    }
	}
	
	function AbstractMatrix(superCtor) {
	    if (superCtor === undefined) superCtor = Object;
	
	    /**
	     * Real matrix
	     * @class Matrix
	     * @param {number|Array|Matrix} nRows - Number of rows of the new matrix,
	     * 2D array containing the data or Matrix instance to clone
	     * @param {number} [nColumns] - Number of columns of the new matrix
	     */
	    class Matrix extends superCtor {
	        static get [Symbol.species]() {
	            return this;
	        }
	
	        /**
	         * Constructs a Matrix with the chosen dimensions from a 1D array
	         * @param {number} newRows - Number of rows
	         * @param {number} newColumns - Number of columns
	         * @param {Array} newData - A 1D array containing data for the matrix
	         * @return {Matrix} - The new matrix
	         */
	        static from1DArray(newRows, newColumns, newData) {
	            var length = newRows * newColumns;
	            if (length !== newData.length) {
	                throw new RangeError('Data length does not match given dimensions');
	            }
	            var newMatrix = new this(newRows, newColumns);
	            for (var row = 0; row < newRows; row++) {
	                for (var column = 0; column < newColumns; column++) {
	                    newMatrix.set(row, column, newData[row * newColumns + column]);
	                }
	            }
	            return newMatrix;
	        }
	
	        /**
	         * Creates a row vector, a matrix with only one row.
	         * @param {Array} newData - A 1D array containing data for the vector
	         * @return {Matrix} - The new matrix
	         */
	        static rowVector(newData) {
	            var vector = new this(1, newData.length);
	            for (var i = 0; i < newData.length; i++) {
	                vector.set(0, i, newData[i]);
	            }
	            return vector;
	        }
	
	        /**
	         * Creates a column vector, a matrix with only one column.
	         * @param {Array} newData - A 1D array containing data for the vector
	         * @return {Matrix} - The new matrix
	         */
	        static columnVector(newData) {
	            var vector = new this(newData.length, 1);
	            for (var i = 0; i < newData.length; i++) {
	                vector.set(i, 0, newData[i]);
	            }
	            return vector;
	        }
	
	        /**
	         * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	         * @param {number} rows - Number of rows
	         * @param {number} columns - Number of columns
	         * @return {Matrix} - The new matrix
	         */
	        static empty(rows, columns) {
	            return new this(rows, columns);
	        }
	
	        /**
	         * Creates a matrix with the given dimensions. Values will be set to zero.
	         * @param {number} rows - Number of rows
	         * @param {number} columns - Number of columns
	         * @return {Matrix} - The new matrix
	         */
	        static zeros(rows, columns) {
	            return this.empty(rows, columns).fill(0);
	        }
	
	        /**
	         * Creates a matrix with the given dimensions. Values will be set to one.
	         * @param {number} rows - Number of rows
	         * @param {number} columns - Number of columns
	         * @return {Matrix} - The new matrix
	         */
	        static ones(rows, columns) {
	            return this.empty(rows, columns).fill(1);
	        }
	
	        /**
	         * Creates a matrix with the given dimensions. Values will be randomly set.
	         * @param {number} rows - Number of rows
	         * @param {number} columns - Number of columns
	         * @param {function} [rng=Math.random] - Random number generator
	         * @return {Matrix} The new matrix
	         */
	        static rand(rows, columns, rng) {
	            if (rng === undefined) rng = Math.random;
	            var matrix = this.empty(rows, columns);
	            for (var i = 0; i < rows; i++) {
	                for (var j = 0; j < columns; j++) {
	                    matrix.set(i, j, rng());
	                }
	            }
	            return matrix;
	        }
	
	        /**
	         * Creates a matrix with the given dimensions. Values will be random integers.
	         * @param {number} rows - Number of rows
	         * @param {number} columns - Number of columns
	         * @param {number} [maxValue=1000] - Maximum value
	         * @param {function} [rng=Math.random] - Random number generator
	         * @return {Matrix} The new matrix
	         */
	        static randInt(rows, columns, maxValue, rng) {
	            if (maxValue === undefined) maxValue = 1000;
	            if (rng === undefined) rng = Math.random;
	            var matrix = this.empty(rows, columns);
	            for (var i = 0; i < rows; i++) {
	                for (var j = 0; j < columns; j++) {
	                    var value = Math.floor(rng() * maxValue);
	                    matrix.set(i, j, value);
	                }
	            }
	            return matrix;
	        }
	
	        /**
	         * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and others will be 0.
	         * @param {number} rows - Number of rows
	         * @param {number} [columns=rows] - Number of columns
	         * @param {number} [value=1] - Value to fill the diagonal with
	         * @return {Matrix} - The new identity matrix
	         */
	        static eye(rows, columns, value) {
	            if (columns === undefined) columns = rows;
	            if (value === undefined) value = 1;
	            var min = Math.min(rows, columns);
	            var matrix = this.zeros(rows, columns);
	            for (var i = 0; i < min; i++) {
	                matrix.set(i, i, value);
	            }
	            return matrix;
	        }
	
	        /**
	         * Creates a diagonal matrix based on the given array.
	         * @param {Array} data - Array containing the data for the diagonal
	         * @param {number} [rows] - Number of rows (Default: data.length)
	         * @param {number} [columns] - Number of columns (Default: rows)
	         * @return {Matrix} - The new diagonal matrix
	         */
	        static diag(data, rows, columns) {
	            var l = data.length;
	            if (rows === undefined) rows = l;
	            if (columns === undefined) columns = rows;
	            var min = Math.min(l, rows, columns);
	            var matrix = this.zeros(rows, columns);
	            for (var i = 0; i < min; i++) {
	                matrix.set(i, i, data[i]);
	            }
	            return matrix;
	        }
	
	        /**
	         * Returns a matrix whose elements are the minimum between matrix1 and matrix2
	         * @param {Matrix} matrix1
	         * @param {Matrix} matrix2
	         * @return {Matrix}
	         */
	        static min(matrix1, matrix2) {
	            matrix1 = this.checkMatrix(matrix1);
	            matrix2 = this.checkMatrix(matrix2);
	            var rows = matrix1.rows;
	            var columns = matrix1.columns;
	            var result = new this(rows, columns);
	            for (var i = 0; i < rows; i++) {
	                for (var j = 0; j < columns; j++) {
	                    result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
	                }
	            }
	            return result;
	        }
	
	        /**
	         * Returns a matrix whose elements are the maximum between matrix1 and matrix2
	         * @param {Matrix} matrix1
	         * @param {Matrix} matrix2
	         * @return {Matrix}
	         */
	        static max(matrix1, matrix2) {
	            matrix1 = this.checkMatrix(matrix1);
	            matrix2 = this.checkMatrix(matrix2);
	            var rows = matrix1.rows;
	            var columns = matrix1.columns;
	            var result = new this(rows, columns);
	            for (var i = 0; i < rows; i++) {
	                for (var j = 0; j < columns; j++) {
	                    result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
	                }
	            }
	            return result;
	        }
	
	        /**
	         * Check that the provided value is a Matrix and tries to instantiate one if not
	         * @param {*} value - The value to check
	         * @return {Matrix}
	         */
	        static checkMatrix(value) {
	            return Matrix.isMatrix(value) ? value : new this(value);
	        }
	
	        /**
	         * Returns true if the argument is a Matrix, false otherwise
	         * @param {*} value - The value to check
	         * @return {boolean}
	         */
	        static isMatrix(value) {
	            return (value != null) && (value.klass === 'Matrix');
	        }
	
	        /**
	         * @prop {number} size - The number of elements in the matrix.
	         */
	        get size() {
	            return this.rows * this.columns;
	        }
	
	        /**
	         * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	         * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	         * @return {Matrix} this
	         */
	        apply(callback) {
	            if (typeof callback !== 'function') {
	                throw new TypeError('callback must be a function');
	            }
	            var ii = this.rows;
	            var jj = this.columns;
	            for (var i = 0; i < ii; i++) {
	                for (var j = 0; j < jj; j++) {
	                    callback.call(this, i, j);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Returns a new 1D array filled row by row with the matrix values
	         * @return {Array}
	         */
	        to1DArray() {
	            var array = new Array(this.size);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    array[i * this.columns + j] = this.get(i, j);
	                }
	            }
	            return array;
	        }
	
	        /**
	         * Returns a 2D array containing a copy of the data
	         * @return {Array}
	         */
	        to2DArray() {
	            var copy = new Array(this.rows);
	            for (var i = 0; i < this.rows; i++) {
	                copy[i] = new Array(this.columns);
	                for (var j = 0; j < this.columns; j++) {
	                    copy[i][j] = this.get(i, j);
	                }
	            }
	            return copy;
	        }
	
	        /**
	         * @return {boolean} true if the matrix has one row
	         */
	        isRowVector() {
	            return this.rows === 1;
	        }
	
	        /**
	         * @return {boolean} true if the matrix has one column
	         */
	        isColumnVector() {
	            return this.columns === 1;
	        }
	
	        /**
	         * @return {boolean} true if the matrix has one row or one column
	         */
	        isVector() {
	            return (this.rows === 1) || (this.columns === 1);
	        }
	
	        /**
	         * @return {boolean} true if the matrix has the same number of rows and columns
	         */
	        isSquare() {
	            return this.rows === this.columns;
	        }
	
	        /**
	         * @return {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	         */
	        isSymmetric() {
	            if (this.isSquare()) {
	                for (var i = 0; i < this.rows; i++) {
	                    for (var j = 0; j <= i; j++) {
	                        if (this.get(i, j) !== this.get(j, i)) {
	                            return false;
	                        }
	                    }
	                }
	                return true;
	            }
	            return false;
	        }
	
	        /**
	         * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	         * @abstract
	         * @param {number} rowIndex - Index of the row
	         * @param {number} columnIndex - Index of the column
	         * @param {number} value - The new value for the element
	         * @return {Matrix} this
	         */
	        set(rowIndex, columnIndex, value) { // eslint-disable-line no-unused-vars
	            throw new Error('set method is unimplemented');
	        }
	
	        /**
	         * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	         * @abstract
	         * @param {number} rowIndex - Index of the row
	         * @param {number} columnIndex - Index of the column
	         * @return {number}
	         */
	        get(rowIndex, columnIndex) { // eslint-disable-line no-unused-vars
	            throw new Error('get method is unimplemented');
	        }
	
	        /**
	         * Creates a new matrix that is a repetition of the current matrix. New matrix has rowRep times the number of
	         * rows of the matrix, and colRep times the number of columns of the matrix
	         * @param {number} rowRep - Number of times the rows should be repeated
	         * @param {number} colRep - Number of times the columns should be re
	         * @return {Matrix}
	         * @example
	         * var matrix = new Matrix([[1,2]]);
	         * matrix.repeat(2); // [[1,2],[1,2]]
	         */
	        repeat(rowRep, colRep) {
	            rowRep = rowRep || 1;
	            colRep = colRep || 1;
	            var matrix = new this.constructor[Symbol.species](this.rows * rowRep, this.columns * colRep);
	            for (var i = 0; i < rowRep; i++) {
	                for (var j = 0; j < colRep; j++) {
	                    matrix.setSubMatrix(this, this.rows * i, this.columns * j);
	                }
	            }
	            return matrix;
	        }
	
	        /**
	         * Fills the matrix with a given value. All elements will be set to this value.
	         * @param {number} value - New value
	         * @return {Matrix} this
	         */
	        fill(value) {
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, value);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Negates the matrix. All elements will be multiplied by (-1)
	         * @return {Matrix} this
	         */
	        neg() {
	            return this.mulS(-1);
	        }
	
	        /**
	         * Returns a new array from the given row index
	         * @param {number} index - Row index
	         * @return {Array}
	         */
	        getRow(index) {
	            checkRowIndex(this, index);
	            var row = new Array(this.columns);
	            for (var i = 0; i < this.columns; i++) {
	                row[i] = this.get(index, i);
	            }
	            return row;
	        }
	
	        /**
	         * Returns a new row vector from the given row index
	         * @param {number} index - Row index
	         * @return {Matrix}
	         */
	        getRowVector(index) {
	            return this.constructor.rowVector(this.getRow(index));
	        }
	
	        /**
	         * Sets a row at the given index
	         * @param {number} index - Row index
	         * @param {Array|Matrix} array - Array or vector
	         * @return {Matrix} this
	         */
	        setRow(index, array) {
	            checkRowIndex(this, index);
	            array = checkRowVector(this, array);
	            for (var i = 0; i < this.columns; i++) {
	                this.set(index, i, array[i]);
	            }
	            return this;
	        }
	
	        /**
	         * Swaps two rows
	         * @param {number} row1 - First row index
	         * @param {number} row2 - Second row index
	         * @return {Matrix} this
	         */
	        swapRows(row1, row2) {
	            checkRowIndex(this, row1);
	            checkRowIndex(this, row2);
	            for (var i = 0; i < this.columns; i++) {
	                var temp = this.get(row1, i);
	                this.set(row1, i, this.get(row2, i));
	                this.set(row2, i, temp);
	            }
	            return this;
	        }
	
	        /**
	         * Returns a new array from the given column index
	         * @param {number} index - Column index
	         * @return {Array}
	         */
	        getColumn(index) {
	            checkColumnIndex(this, index);
	            var column = new Array(this.rows);
	            for (var i = 0; i < this.rows; i++) {
	                column[i] = this.get(i, index);
	            }
	            return column;
	        }
	
	        /**
	         * Returns a new column vector from the given column index
	         * @param {number} index - Column index
	         * @return {Matrix}
	         */
	        getColumnVector(index) {
	            return this.constructor.columnVector(this.getColumn(index));
	        }
	
	        /**
	         * Sets a column at the given index
	         * @param {number} index - Column index
	         * @param {Array|Matrix} array - Array or vector
	         * @return {Matrix} this
	         */
	        setColumn(index, array) {
	            checkColumnIndex(this, index);
	            array = checkColumnVector(this, array);
	            for (var i = 0; i < this.rows; i++) {
	                this.set(i, index, array[i]);
	            }
	            return this;
	        }
	
	        /**
	         * Swaps two columns
	         * @param {number} column1 - First column index
	         * @param {number} column2 - Second column index
	         * @return {Matrix} this
	         */
	        swapColumns(column1, column2) {
	            checkColumnIndex(this, column1);
	            checkColumnIndex(this, column2);
	            for (var i = 0; i < this.rows; i++) {
	                var temp = this.get(i, column1);
	                this.set(i, column1, this.get(i, column2));
	                this.set(i, column2, temp);
	            }
	            return this;
	        }
	
	        /**
	         * Adds the values of a vector to each row
	         * @param {Array|Matrix} vector - Array or vector
	         * @return {Matrix} this
	         */
	        addRowVector(vector) {
	            vector = checkRowVector(this, vector);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, this.get(i, j) + vector[j]);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Subtracts the values of a vector from each row
	         * @param {Array|Matrix} vector - Array or vector
	         * @return {Matrix} this
	         */
	        subRowVector(vector) {
	            vector = checkRowVector(this, vector);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, this.get(i, j) - vector[j]);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Multiplies the values of a vector with each row
	         * @param {Array|Matrix} vector - Array or vector
	         * @return {Matrix} this
	         */
	        mulRowVector(vector) {
	            vector = checkRowVector(this, vector);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, this.get(i, j) * vector[j]);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Divides the values of each row by those of a vector
	         * @param {Array|Matrix} vector - Array or vector
	         * @return {Matrix} this
	         */
	        divRowVector(vector) {
	            vector = checkRowVector(this, vector);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, this.get(i, j) / vector[j]);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Adds the values of a vector to each column
	         * @param {Array|Matrix} vector - Array or vector
	         * @return {Matrix} this
	         */
	        addColumnVector(vector) {
	            vector = checkColumnVector(this, vector);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, this.get(i, j) + vector[i]);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Subtracts the values of a vector from each column
	         * @param {Array|Matrix} vector - Array or vector
	         * @return {Matrix} this
	         */
	        subColumnVector(vector) {
	            vector = checkColumnVector(this, vector);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, this.get(i, j) - vector[i]);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Multiplies the values of a vector with each column
	         * @param {Array|Matrix} vector - Array or vector
	         * @return {Matrix} this
	         */
	        mulColumnVector(vector) {
	            vector = checkColumnVector(this, vector);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, this.get(i, j) * vector[i]);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Divides the values of each column by those of a vector
	         * @param {Array|Matrix} vector - Array or vector
	         * @return {Matrix} this
	         */
	        divColumnVector(vector) {
	            vector = checkColumnVector(this, vector);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    this.set(i, j, this.get(i, j) / vector[i]);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Multiplies the values of a row with a scalar
	         * @param {number} index - Row index
	         * @param {number} value
	         * @return {Matrix} this
	         */
	        mulRow(index, value) {
	            checkRowIndex(this, index);
	            for (var i = 0; i < this.columns; i++) {
	                this.set(index, i, this.get(index, i) * value);
	            }
	            return this;
	        }
	
	        /**
	         * Multiplies the values of a column with a scalar
	         * @param {number} index - Column index
	         * @param {number} value
	         * @return {Matrix} this
	         */
	        mulColumn(index, value) {
	            checkColumnIndex(this, index);
	            for (var i = 0; i < this.rows; i++) {
	                this.set(i, index, this.get(i, index) * value);
	            }
	            return this;
	        }
	
	        /**
	         * Returns the maximum value of the matrix
	         * @return {number}
	         */
	        max() {
	            var v = this.get(0, 0);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    if (this.get(i, j) > v) {
	                        v = this.get(i, j);
	                    }
	                }
	            }
	            return v;
	        }
	
	        /**
	         * Returns the index of the maximum value
	         * @return {Array}
	         */
	        maxIndex() {
	            var v = this.get(0, 0);
	            var idx = [0, 0];
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    if (this.get(i, j) > v) {
	                        v = this.get(i, j);
	                        idx[0] = i;
	                        idx[1] = j;
	                    }
	                }
	            }
	            return idx;
	        }
	
	        /**
	         * Returns the minimum value of the matrix
	         * @return {number}
	         */
	        min() {
	            var v = this.get(0, 0);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    if (this.get(i, j) < v) {
	                        v = this.get(i, j);
	                    }
	                }
	            }
	            return v;
	        }
	
	        /**
	         * Returns the index of the minimum value
	         * @return {Array}
	         */
	        minIndex() {
	            var v = this.get(0, 0);
	            var idx = [0, 0];
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    if (this.get(i, j) < v) {
	                        v = this.get(i, j);
	                        idx[0] = i;
	                        idx[1] = j;
	                    }
	                }
	            }
	            return idx;
	        }
	
	        /**
	         * Returns the maximum value of one row
	         * @param {number} row - Row index
	         * @return {number}
	         */
	        maxRow(row) {
	            checkRowIndex(this, row);
	            var v = this.get(row, 0);
	            for (var i = 1; i < this.columns; i++) {
	                if (this.get(row, i) > v) {
	                    v = this.get(row, i);
	                }
	            }
	            return v;
	        }
	
	        /**
	         * Returns the index of the maximum value of one row
	         * @param {number} row - Row index
	         * @return {Array}
	         */
	        maxRowIndex(row) {
	            checkRowIndex(this, row);
	            var v = this.get(row, 0);
	            var idx = [row, 0];
	            for (var i = 1; i < this.columns; i++) {
	                if (this.get(row, i) > v) {
	                    v = this.get(row, i);
	                    idx[1] = i;
	                }
	            }
	            return idx;
	        }
	
	        /**
	         * Returns the minimum value of one row
	         * @param {number} row - Row index
	         * @return {number}
	         */
	        minRow(row) {
	            checkRowIndex(this, row);
	            var v = this.get(row, 0);
	            for (var i = 1; i < this.columns; i++) {
	                if (this.get(row, i) < v) {
	                    v = this.get(row, i);
	                }
	            }
	            return v;
	        }
	
	        /**
	         * Returns the index of the maximum value of one row
	         * @param {number} row - Row index
	         * @return {Array}
	         */
	        minRowIndex(row) {
	            checkRowIndex(this, row);
	            var v = this.get(row, 0);
	            var idx = [row, 0];
	            for (var i = 1; i < this.columns; i++) {
	                if (this.get(row, i) < v) {
	                    v = this.get(row, i);
	                    idx[1] = i;
	                }
	            }
	            return idx;
	        }
	
	        /**
	         * Returns the maximum value of one column
	         * @param {number} column - Column index
	         * @return {number}
	         */
	        maxColumn(column) {
	            checkColumnIndex(this, column);
	            var v = this.get(0, column);
	            for (var i = 1; i < this.rows; i++) {
	                if (this.get(i, column) > v) {
	                    v = this.get(i, column);
	                }
	            }
	            return v;
	        }
	
	        /**
	         * Returns the index of the maximum value of one column
	         * @param {number} column - Column index
	         * @return {Array}
	         */
	        maxColumnIndex(column) {
	            checkColumnIndex(this, column);
	            var v = this.get(0, column);
	            var idx = [0, column];
	            for (var i = 1; i < this.rows; i++) {
	                if (this.get(i, column) > v) {
	                    v = this.get(i, column);
	                    idx[0] = i;
	                }
	            }
	            return idx;
	        }
	
	        /**
	         * Returns the minimum value of one column
	         * @param {number} column - Column index
	         * @return {number}
	         */
	        minColumn(column) {
	            checkColumnIndex(this, column);
	            var v = this.get(0, column);
	            for (var i = 1; i < this.rows; i++) {
	                if (this.get(i, column) < v) {
	                    v = this.get(i, column);
	                }
	            }
	            return v;
	        }
	
	        /**
	         * Returns the index of the minimum value of one column
	         * @param {number} column - Column index
	         * @return {Array}
	         */
	        minColumnIndex(column) {
	            checkColumnIndex(this, column);
	            var v = this.get(0, column);
	            var idx = [0, column];
	            for (var i = 1; i < this.rows; i++) {
	                if (this.get(i, column) < v) {
	                    v = this.get(i, column);
	                    idx[0] = i;
	                }
	            }
	            return idx;
	        }
	
	        /**
	         * Returns an array containing the diagonal values of the matrix
	         * @return {Array}
	         */
	        diag() {
	            var min = Math.min(this.rows, this.columns);
	            var diag = new Array(min);
	            for (var i = 0; i < min; i++) {
	                diag[i] = this.get(i, i);
	            }
	            return diag;
	        }
	
	        /**
	         * Returns the sum by the argument given, if no argument given,
	         * it returns the sum of all elements of the matrix.
	         * @param {string} by - sum by 'row' or 'column'.
	         * @return {Matrix|number}
	         */
	        sum(by) {
	            switch (by) {
	                case 'row':
	                    return sumByRow(this);
	                case 'column':
	                    return sumByColumn(this);
	                default:
	                    return sumAll(this);
	            }
	        }
	
	        /**
	         * Returns the mean of all elements of the matrix
	         * @return {number}
	         */
	        mean() {
	            return this.sum() / this.size;
	        }
	
	        /**
	         * Returns the product of all elements of the matrix
	         * @return {number}
	         */
	        prod() {
	            var prod = 1;
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    prod *= this.get(i, j);
	                }
	            }
	            return prod;
	        }
	
	        /**
	         * Returns the norm of a matrix.
	         * @param {string} type - "frobenius" (default) or "max" return resp. the Frobenius norm and the max norm.
	         * @return {number}
	         */
	        norm(type = 'frobenius') {
	            var result = 0;
	            if (type === 'max') {
	                return this.max();
	            } else if (type === 'frobenius') {
	                for (var i = 0; i < this.rows; i++) {
	                    for (var j = 0; j < this.columns; j++) {
	                        result = result + this.get(i, j) * this.get(i, j);
	                    }
	                }
	                return Math.sqrt(result);
	            } else {
	                throw new RangeError(`unknown norm type: ${type}`);
	            }
	        }
	
	        /**
	         * Computes the cumulative sum of the matrix elements (in place, row by row)
	         * @return {Matrix} this
	         */
	        cumulativeSum() {
	            var sum = 0;
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    sum += this.get(i, j);
	                    this.set(i, j, sum);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Computes the dot (scalar) product between the matrix and another
	         * @param {Matrix} vector2 vector
	         * @return {number}
	         */
	        dot(vector2) {
	            if (Matrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
	            var vector1 = this.to1DArray();
	            if (vector1.length !== vector2.length) {
	                throw new RangeError('vectors do not have the same size');
	            }
	            var dot = 0;
	            for (var i = 0; i < vector1.length; i++) {
	                dot += vector1[i] * vector2[i];
	            }
	            return dot;
	        }
	
	        /**
	         * Returns the matrix product between this and other
	         * @param {Matrix} other
	         * @return {Matrix}
	         */
	        mmul(other) {
	            other = this.constructor.checkMatrix(other);
	            if (this.columns !== other.rows) {
	                // eslint-disable-next-line no-console
	                console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');
	            }
	
	            var m = this.rows;
	            var n = this.columns;
	            var p = other.columns;
	
	            var result = new this.constructor[Symbol.species](m, p);
	
	            var Bcolj = new Array(n);
	            for (var j = 0; j < p; j++) {
	                for (var k = 0; k < n; k++) {
	                    Bcolj[k] = other.get(k, j);
	                }
	
	                for (var i = 0; i < m; i++) {
	                    var s = 0;
	                    for (k = 0; k < n; k++) {
	                        s += this.get(i, k) * Bcolj[k];
	                    }
	
	                    result.set(i, j, s);
	                }
	            }
	            return result;
	        }
	
	        strassen2x2(other) {
	            var result = new this.constructor[Symbol.species](2, 2);
	            const a11 = this.get(0, 0);
	            const b11 = other.get(0, 0);
	            const a12 = this.get(0, 1);
	            const b12 = other.get(0, 1);
	            const a21 = this.get(1, 0);
	            const b21 = other.get(1, 0);
	            const a22 = this.get(1, 1);
	            const b22 = other.get(1, 1);
	
	            // Compute intermediate values.
	            const m1 = (a11 + a22) * (b11 + b22);
	            const m2 = (a21 + a22) * b11;
	            const m3 = a11 * (b12 - b22);
	            const m4 = a22 * (b21 - b11);
	            const m5 = (a11 + a12) * b22;
	            const m6 = (a21 - a11) * (b11 + b12);
	            const m7 = (a12 - a22) * (b21 + b22);
	
	            // Combine intermediate values into the output.
	            const c00 = m1 + m4 - m5 + m7;
	            const c01 = m3 + m5;
	            const c10 = m2 + m4;
	            const c11 = m1 - m2 + m3 + m6;
	
	            result.set(0, 0, c00);
	            result.set(0, 1, c01);
	            result.set(1, 0, c10);
	            result.set(1, 1, c11);
	            return result;
	        }
	
	        strassen3x3(other) {
	            var result = new this.constructor[Symbol.species](3, 3);
	
	            const a00 = this.get(0, 0);
	            const a01 = this.get(0, 1);
	            const a02 = this.get(0, 2);
	            const a10 = this.get(1, 0);
	            const a11 = this.get(1, 1);
	            const a12 = this.get(1, 2);
	            const a20 = this.get(2, 0);
	            const a21 = this.get(2, 1);
	            const a22 = this.get(2, 2);
	
	            const b00 = other.get(0, 0);
	            const b01 = other.get(0, 1);
	            const b02 = other.get(0, 2);
	            const b10 = other.get(1, 0);
	            const b11 = other.get(1, 1);
	            const b12 = other.get(1, 2);
	            const b20 = other.get(2, 0);
	            const b21 = other.get(2, 1);
	            const b22 = other.get(2, 2);
	
	            const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
	            const m2 = (a00 - a10) * (-b01 + b11);
	            const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
	            const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
	            const m5 = (a10 + a11) * (-b00 + b01);
	            const m6 = a00 * b00;
	            const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
	            const m8 = (-a00 + a20) * (b02 - b12);
	            const m9 = (a20 + a21) * (-b00 + b02);
	            const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
	            const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
	            const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
	            const m13 = (a02 - a22) * (b11 - b21);
	            const m14 = a02 * b20;
	            const m15 = (a21 + a22) * (-b20 + b21);
	            const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
	            const m17 = (a02 - a12) * (b12 - b22);
	            const m18 = (a11 + a12) * (-b20 + b22);
	            const m19 = a01 * b10;
	            const m20 = a12 * b21;
	            const m21 = a10 * b02;
	            const m22 = a20 * b01;
	            const m23 = a22 * b22;
	
	            const c00 = m6 + m14 + m19;
	            const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
	            const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
	            const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
	            const c11 = m2 + m4 + m5 + m6 + m20;
	            const c12 = m14 + m16 + m17 + m18 + m21;
	            const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
	            const c21 = m12 + m13 + m14 + m15 + m22;
	            const c22 = m6 + m7 + m8 + m9 + m23;
	
	            result.set(0, 0, c00);
	            result.set(0, 1, c01);
	            result.set(0, 2, c02);
	            result.set(1, 0, c10);
	            result.set(1, 1, c11);
	            result.set(1, 2, c12);
	            result.set(2, 0, c20);
	            result.set(2, 1, c21);
	            result.set(2, 2, c22);
	            return result;
	        }
	
	        /**
	         * Returns the matrix product between x and y. More efficient than mmul(other) only when we multiply squared matrix and when the size of the matrix is > 1000.
	         * @param {Matrix} y
	         * @return {Matrix}
	         */
	        mmulStrassen(y) {
	            var x = this.clone();
	            var r1 = x.rows;
	            var c1 = x.columns;
	            var r2 = y.rows;
	            var c2 = y.columns;
	            if (c1 !== r2) {
	                // eslint-disable-next-line no-console
	                console.warn(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`);
	            }
	
	            // Put a matrix into the top left of a matrix of zeros.
	            // `rows` and `cols` are the dimensions of the output matrix.
	            function embed(mat, rows, cols) {
	                var r = mat.rows;
	                var c = mat.columns;
	                if ((r === rows) && (c === cols)) {
	                    return mat;
	                } else {
	                    var resultat = Matrix.zeros(rows, cols);
	                    resultat = resultat.setSubMatrix(mat, 0, 0);
	                    return resultat;
	                }
	            }
	
	
	            // Make sure both matrices are the same size.
	            // This is exclusively for simplicity:
	            // this algorithm can be implemented with matrices of different sizes.
	
	            var r = Math.max(r1, r2);
	            var c = Math.max(c1, c2);
	            x = embed(x, r, c);
	            y = embed(y, r, c);
	
	            // Our recursive multiplication function.
	            function blockMult(a, b, rows, cols) {
	                // For small matrices, resort to naive multiplication.
	                if (rows <= 512 || cols <= 512) {
	                    return a.mmul(b); // a is equivalent to this
	                }
	
	                // Apply dynamic padding.
	                if ((rows % 2 === 1) && (cols % 2 === 1)) {
	                    a = embed(a, rows + 1, cols + 1);
	                    b = embed(b, rows + 1, cols + 1);
	                } else if (rows % 2 === 1) {
	                    a = embed(a, rows + 1, cols);
	                    b = embed(b, rows + 1, cols);
	                } else if (cols % 2 === 1) {
	                    a = embed(a, rows, cols + 1);
	                    b = embed(b, rows, cols + 1);
	                }
	
	                var halfRows = parseInt(a.rows / 2);
	                var halfCols = parseInt(a.columns / 2);
	                // Subdivide input matrices.
	                var a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
	                var b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
	
	                var a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
	                var b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
	
	                var a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
	                var b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
	
	                var a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
	                var b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1);
	
	                // Compute intermediate values.
	                var m1 = blockMult(Matrix.add(a11, a22), Matrix.add(b11, b22), halfRows, halfCols);
	                var m2 = blockMult(Matrix.add(a21, a22), b11, halfRows, halfCols);
	                var m3 = blockMult(a11, Matrix.sub(b12, b22), halfRows, halfCols);
	                var m4 = blockMult(a22, Matrix.sub(b21, b11), halfRows, halfCols);
	                var m5 = blockMult(Matrix.add(a11, a12), b22, halfRows, halfCols);
	                var m6 = blockMult(Matrix.sub(a21, a11), Matrix.add(b11, b12), halfRows, halfCols);
	                var m7 = blockMult(Matrix.sub(a12, a22), Matrix.add(b21, b22), halfRows, halfCols);
	
	                // Combine intermediate values into the output.
	                var c11 = Matrix.add(m1, m4);
	                c11.sub(m5);
	                c11.add(m7);
	                var c12 = Matrix.add(m3, m5);
	                var c21 = Matrix.add(m2, m4);
	                var c22 = Matrix.sub(m1, m2);
	                c22.add(m3);
	                c22.add(m6);
	
	                //Crop output to the desired size (undo dynamic padding).
	                var resultat = Matrix.zeros(2 * c11.rows, 2 * c11.columns);
	                resultat = resultat.setSubMatrix(c11, 0, 0);
	                resultat = resultat.setSubMatrix(c12, c11.rows, 0);
	                resultat = resultat.setSubMatrix(c21, 0, c11.columns);
	                resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
	                return resultat.subMatrix(0, rows - 1, 0, cols - 1);
	            }
	            return blockMult(x, y, r, c);
	        }
	
	        /**
	         * Returns a row-by-row scaled matrix
	         * @param {number} [min=0] - Minimum scaled value
	         * @param {number} [max=1] - Maximum scaled value
	         * @return {Matrix} - The scaled matrix
	         */
	        scaleRows(min, max) {
	            min = min === undefined ? 0 : min;
	            max = max === undefined ? 1 : max;
	            if (min >= max) {
	                throw new RangeError('min should be strictly smaller than max');
	            }
	            var newMatrix = this.constructor.empty(this.rows, this.columns);
	            for (var i = 0; i < this.rows; i++) {
	                var scaled = rescale(this.getRow(i), {min, max});
	                newMatrix.setRow(i, scaled);
	            }
	            return newMatrix;
	        }
	
	        /**
	         * Returns a new column-by-column scaled matrix
	         * @param {number} [min=0] - Minimum scaled value
	         * @param {number} [max=1] - Maximum scaled value
	         * @return {Matrix} - The new scaled matrix
	         * @example
	         * var matrix = new Matrix([[1,2],[-1,0]]);
	         * var scaledMatrix = matrix.scaleColumns(); // [[1,1],[0,0]]
	         */
	        scaleColumns(min, max) {
	            min = min === undefined ? 0 : min;
	            max = max === undefined ? 1 : max;
	            if (min >= max) {
	                throw new RangeError('min should be strictly smaller than max');
	            }
	            var newMatrix = this.constructor.empty(this.rows, this.columns);
	            for (var i = 0; i < this.columns; i++) {
	                var scaled = rescale(this.getColumn(i), {
	                    min: min,
	                    max: max
	                });
	                newMatrix.setColumn(i, scaled);
	            }
	            return newMatrix;
	        }
	
	
	        /**
	         * Returns the Kronecker product (also known as tensor product) between this and other
	         * See https://en.wikipedia.org/wiki/Kronecker_product
	         * @param {Matrix} other
	         * @return {Matrix}
	         */
	        kroneckerProduct(other) {
	            other = this.constructor.checkMatrix(other);
	
	            var m = this.rows;
	            var n = this.columns;
	            var p = other.rows;
	            var q = other.columns;
	
	            var result = new this.constructor[Symbol.species](m * p, n * q);
	            for (var i = 0; i < m; i++) {
	                for (var j = 0; j < n; j++) {
	                    for (var k = 0; k < p; k++) {
	                        for (var l = 0; l < q; l++) {
	                            result[p * i + k][q * j + l] = this.get(i, j) * other.get(k, l);
	                        }
	                    }
	                }
	            }
	            return result;
	        }
	
	        /**
	         * Transposes the matrix and returns a new one containing the result
	         * @return {Matrix}
	         */
	        transpose() {
	            var result = new this.constructor[Symbol.species](this.columns, this.rows);
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j < this.columns; j++) {
	                    result.set(j, i, this.get(i, j));
	                }
	            }
	            return result;
	        }
	
	        /**
	         * Sorts the rows (in place)
	         * @param {function} compareFunction - usual Array.prototype.sort comparison function
	         * @return {Matrix} this
	         */
	        sortRows(compareFunction) {
	            if (compareFunction === undefined) compareFunction = compareNumbers;
	            for (var i = 0; i < this.rows; i++) {
	                this.setRow(i, this.getRow(i).sort(compareFunction));
	            }
	            return this;
	        }
	
	        /**
	         * Sorts the columns (in place)
	         * @param {function} compareFunction - usual Array.prototype.sort comparison function
	         * @return {Matrix} this
	         */
	        sortColumns(compareFunction) {
	            if (compareFunction === undefined) compareFunction = compareNumbers;
	            for (var i = 0; i < this.columns; i++) {
	                this.setColumn(i, this.getColumn(i).sort(compareFunction));
	            }
	            return this;
	        }
	
	        /**
	         * Returns a subset of the matrix
	         * @param {number} startRow - First row index
	         * @param {number} endRow - Last row index
	         * @param {number} startColumn - First column index
	         * @param {number} endColumn - Last column index
	         * @return {Matrix}
	         */
	        subMatrix(startRow, endRow, startColumn, endColumn) {
	            checkRange(this, startRow, endRow, startColumn, endColumn);
	            var newMatrix = new this.constructor[Symbol.species](endRow - startRow + 1, endColumn - startColumn + 1);
	            for (var i = startRow; i <= endRow; i++) {
	                for (var j = startColumn; j <= endColumn; j++) {
	                    newMatrix[i - startRow][j - startColumn] = this.get(i, j);
	                }
	            }
	            return newMatrix;
	        }
	
	        /**
	         * Returns a subset of the matrix based on an array of row indices
	         * @param {Array} indices - Array containing the row indices
	         * @param {number} [startColumn = 0] - First column index
	         * @param {number} [endColumn = this.columns-1] - Last column index
	         * @return {Matrix}
	         */
	        subMatrixRow(indices, startColumn, endColumn) {
	            if (startColumn === undefined) startColumn = 0;
	            if (endColumn === undefined) endColumn = this.columns - 1;
	            if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns)) {
	                throw new RangeError('Argument out of range');
	            }
	
	            var newMatrix = new this.constructor[Symbol.species](indices.length, endColumn - startColumn + 1);
	            for (var i = 0; i < indices.length; i++) {
	                for (var j = startColumn; j <= endColumn; j++) {
	                    if (indices[i] < 0 || indices[i] >= this.rows) {
	                        throw new RangeError('Row index out of range: ' + indices[i]);
	                    }
	                    newMatrix.set(i, j - startColumn, this.get(indices[i], j));
	                }
	            }
	            return newMatrix;
	        }
	
	        /**
	         * Returns a subset of the matrix based on an array of column indices
	         * @param {Array} indices - Array containing the column indices
	         * @param {number} [startRow = 0] - First row index
	         * @param {number} [endRow = this.rows-1] - Last row index
	         * @return {Matrix}
	         */
	        subMatrixColumn(indices, startRow, endRow) {
	            if (startRow === undefined) startRow = 0;
	            if (endRow === undefined) endRow = this.rows - 1;
	            if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows)) {
	                throw new RangeError('Argument out of range');
	            }
	
	            var newMatrix = new this.constructor[Symbol.species](endRow - startRow + 1, indices.length);
	            for (var i = 0; i < indices.length; i++) {
	                for (var j = startRow; j <= endRow; j++) {
	                    if (indices[i] < 0 || indices[i] >= this.columns) {
	                        throw new RangeError('Column index out of range: ' + indices[i]);
	                    }
	                    newMatrix.set(j - startRow, i, this.get(j, indices[i]));
	                }
	            }
	            return newMatrix;
	        }
	
	        /**
	         * Set a part of the matrix to the given sub-matrix
	         * @param {Matrix|Array< Array >} matrix - The source matrix from which to extract values.
	         * @param {number} startRow - The index of the first row to set
	         * @param {number} startColumn - The index of the first column to set
	         * @return {Matrix}
	         */
	        setSubMatrix(matrix, startRow, startColumn) {
	            matrix = this.constructor.checkMatrix(matrix);
	            var endRow = startRow + matrix.rows - 1;
	            var endColumn = startColumn + matrix.columns - 1;
	            checkRange(this, startRow, endRow, startColumn, endColumn);
	            for (var i = 0; i < matrix.rows; i++) {
	                for (var j = 0; j < matrix.columns; j++) {
	                    this[startRow + i][startColumn + j] = matrix.get(i, j);
	                }
	            }
	            return this;
	        }
	
	        /**
	         * Return a new matrix based on a selection of rows and columns
	         * @param {Array<number>} rowIndices - The row indices to select. Order matters and an index can be more than once.
	         * @param {Array<number>} columnIndices - The column indices to select. Order matters and an index can be use more than once.
	         * @return {Matrix} The new matrix
	         */
	        selection(rowIndices, columnIndices) {
	            var indices = checkIndices(this, rowIndices, columnIndices);
	            var newMatrix = new this.constructor[Symbol.species](rowIndices.length, columnIndices.length);
	            for (var i = 0; i < indices.row.length; i++) {
	                var rowIndex = indices.row[i];
	                for (var j = 0; j < indices.column.length; j++) {
	                    var columnIndex = indices.column[j];
	                    newMatrix[i][j] = this.get(rowIndex, columnIndex);
	                }
	            }
	            return newMatrix;
	        }
	
	        /**
	         * Returns the trace of the matrix (sum of the diagonal elements)
	         * @return {number}
	         */
	        trace() {
	            var min = Math.min(this.rows, this.columns);
	            var trace = 0;
	            for (var i = 0; i < min; i++) {
	                trace += this.get(i, i);
	            }
	            return trace;
	        }
	
	        /*
	         Matrix views
	         */
	
	        /**
	         * Returns a view of the transposition of the matrix
	         * @return {MatrixTransposeView}
	         */
	        transposeView() {
	            return new MatrixTransposeView(this);
	        }
	
	        /**
	         * Returns a view of the row vector with the given index
	         * @param {number} row - row index of the vector
	         * @return {MatrixRowView}
	         */
	        rowView(row) {
	            checkRowIndex(this, row);
	            return new MatrixRowView(this, row);
	        }
	
	        /**
	         * Returns a view of the column vector with the given index
	         * @param {number} column - column index of the vector
	         * @return {MatrixColumnView}
	         */
	        columnView(column) {
	            checkColumnIndex(this, column);
	            return new MatrixColumnView(this, column);
	        }
	
	        /**
	         * Returns a view of the matrix flipped in the row axis
	         * @return {MatrixFlipRowView}
	         */
	        flipRowView() {
	            return new MatrixFlipRowView(this);
	        }
	
	        /**
	         * Returns a view of the matrix flipped in the column axis
	         * @return {MatrixFlipColumnView}
	         */
	        flipColumnView() {
	            return new MatrixFlipColumnView(this);
	        }
	
	        /**
	         * Returns a view of a submatrix giving the index boundaries
	         * @param {number} startRow - first row index of the submatrix
	         * @param {number} endRow - last row index of the submatrix
	         * @param {number} startColumn - first column index of the submatrix
	         * @param {number} endColumn - last column index of the submatrix
	         * @return {MatrixSubView}
	         */
	        subMatrixView(startRow, endRow, startColumn, endColumn) {
	            return new MatrixSubView(this, startRow, endRow, startColumn, endColumn);
	        }
	
	        /**
	         * Returns a view of the cross of the row indices and the column indices
	         * @example
	         * // resulting vector is [[2], [2]]
	         * var matrix = new Matrix([[1,2,3], [4,5,6]]).selectionView([0, 0], [1])
	         * @param {Array<number>} rowIndices
	         * @param {Array<number>} columnIndices
	         * @return {MatrixSelectionView}
	         */
	        selectionView(rowIndices, columnIndices) {
	            return new MatrixSelectionView(this, rowIndices, columnIndices);
	        }
	
	        /**
	         * Returns a view of the row indices
	         * @example
	         * // resulting vector is [[1,2,3], [1,2,3]]
	         * var matrix = new Matrix([[1,2,3], [4,5,6]]).rowSelectionView([0, 0])
	         * @param {Array<number>} rowIndices
	         * @return {MatrixRowSelectionView}
	         */
	        rowSelectionView(rowIndices) {
	            return new MatrixRowSelectionView(this, rowIndices);
	        }
	
	        /**
	         * Returns a view of the column indices
	         * @example
	         * // resulting vector is [[2, 2], [5, 5]]
	         * var matrix = new Matrix([[1,2,3], [4,5,6]]).columnSelectionView([1, 1])
	         * @param {Array<number>} columnIndices
	         * @return {MatrixColumnSelectionView}
	         */
	        columnSelectionView(columnIndices) {
	            return new MatrixColumnSelectionView(this, columnIndices);
	        }
	
	
	        /**
	        * Calculates and returns the determinant of a matrix as a Number
	        * @example
	        *   new Matrix([[1,2,3], [4,5,6]]).det()
	        * @return {number}
	        */
	        det() {
	            if (this.isSquare()) {
	                var a, b, c, d;
	                if (this.columns === 2) {
	                    // 2 x 2 matrix
	                    a = this.get(0, 0);
	                    b = this.get(0, 1);
	                    c = this.get(1, 0);
	                    d = this.get(1, 1);
	
	                    return a * d - (b * c);
	                } else if (this.columns === 3) {
	                    // 3 x 3 matrix
	                    var subMatrix0, subMatrix1, subMatrix2;
	                    subMatrix0 = this.selectionView([1, 2], [1, 2]);
	                    subMatrix1 = this.selectionView([1, 2], [0, 2]);
	                    subMatrix2 = this.selectionView([1, 2], [0, 1]);
	                    a = this.get(0, 0);
	                    b = this.get(0, 1);
	                    c = this.get(0, 2);
	
	                    return a * subMatrix0.det() - b * subMatrix1.det() + c * subMatrix2.det();
	                } else {
	                    // general purpose determinant using the LU decomposition
	                    return new LuDecomposition$$1(this).determinant;
	                }
	
	            } else {
	                throw Error('Determinant can only be calculated for a square matrix.');
	            }
	        }
	
	        /**
	         * Returns inverse of a matrix if it exists or the pseudoinverse
	         * @param {number} threshold - threshold for taking inverse of singular values (default = 1e-15)
	         * @return {Matrix} the (pseudo)inverted matrix.
	         */
	        pseudoInverse(threshold) {
	            if (threshold === undefined) threshold = Number.EPSILON;
	            var svdSolution = new SingularValueDecomposition$$1(this, {autoTranspose: true});
	
	            var U = svdSolution.leftSingularVectors;
	            var V = svdSolution.rightSingularVectors;
	            var s = svdSolution.diagonal;
	
	            for (var i = 0; i < s.length; i++) {
	                if (Math.abs(s[i]) > threshold) {
	                    s[i] = 1.0 / s[i];
	                } else {
	                    s[i] = 0.0;
	                }
	            }
	
	            // convert list to diagonal
	            s = this.constructor[Symbol.species].diag(s);
	            return V.mmul(s.mmul(U.transposeView()));
	        }
	
	        /**
	         * Creates an exact and independent copy of the matrix
	         * @return {Matrix}
	         */
	        clone() {
	            var newMatrix = new this.constructor[Symbol.species](this.rows, this.columns);
	            for (var row = 0; row < this.rows; row++) {
	                for (var column = 0; column < this.columns; column++) {
	                    newMatrix.set(row, column, this.get(row, column));
	                }
	            }
	            return newMatrix;
	        }
	    }
	
	    Matrix.prototype.klass = 'Matrix';
	
	    function compareNumbers(a, b) {
	        return a - b;
	    }
	
	    /*
	     Synonyms
	     */
	
	    Matrix.random = Matrix.rand;
	    Matrix.diagonal = Matrix.diag;
	    Matrix.prototype.diagonal = Matrix.prototype.diag;
	    Matrix.identity = Matrix.eye;
	    Matrix.prototype.negate = Matrix.prototype.neg;
	    Matrix.prototype.tensorProduct = Matrix.prototype.kroneckerProduct;
	    Matrix.prototype.determinant = Matrix.prototype.det;
	
	    /*
	     Add dynamically instance and static methods for mathematical operations
	     */
	
	    var inplaceOperator = `
	(function %name%(value) {
	    if (typeof value === 'number') return this.%name%S(value);
	    return this.%name%M(value);
	})
	`;
	
	    var inplaceOperatorScalar = `
	(function %name%S(value) {
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this.set(i, j, this.get(i, j) %op% value);
	        }
	    }
	    return this;
	})
	`;
	
	    var inplaceOperatorMatrix = `
	(function %name%M(matrix) {
	    matrix = this.constructor.checkMatrix(matrix);
	    if (this.rows !== matrix.rows ||
	        this.columns !== matrix.columns) {
	        throw new RangeError('Matrices dimensions must be equal');
	    }
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this.set(i, j, this.get(i, j) %op% matrix.get(i, j));
	        }
	    }
	    return this;
	})
	`;
	
	    var staticOperator = `
	(function %name%(matrix, value) {
	    var newMatrix = new this[Symbol.species](matrix);
	    return newMatrix.%name%(value);
	})
	`;
	
	    var inplaceMethod = `
	(function %name%() {
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this.set(i, j, %method%(this.get(i, j)));
	        }
	    }
	    return this;
	})
	`;
	
	    var staticMethod = `
	(function %name%(matrix) {
	    var newMatrix = new this[Symbol.species](matrix);
	    return newMatrix.%name%();
	})
	`;
	
	    var inplaceMethodWithArgs = `
	(function %name%(%args%) {
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this.set(i, j, %method%(this.get(i, j), %args%));
	        }
	    }
	    return this;
	})
	`;
	
	    var staticMethodWithArgs = `
	(function %name%(matrix, %args%) {
	    var newMatrix = new this[Symbol.species](matrix);
	    return newMatrix.%name%(%args%);
	})
	`;
	
	
	    var inplaceMethodWithOneArgScalar = `
	(function %name%S(value) {
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this.set(i, j, %method%(this.get(i, j), value));
	        }
	    }
	    return this;
	})
	`;
	    var inplaceMethodWithOneArgMatrix = `
	(function %name%M(matrix) {
	    matrix = this.constructor.checkMatrix(matrix);
	    if (this.rows !== matrix.rows ||
	        this.columns !== matrix.columns) {
	        throw new RangeError('Matrices dimensions must be equal');
	    }
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this.set(i, j, %method%(this.get(i, j), matrix.get(i, j)));
	        }
	    }
	    return this;
	})
	`;
	
	    var inplaceMethodWithOneArg = `
	(function %name%(value) {
	    if (typeof value === 'number') return this.%name%S(value);
	    return this.%name%M(value);
	})
	`;
	
	    var staticMethodWithOneArg = staticMethodWithArgs;
	
	    var operators = [
	        // Arithmetic operators
	        ['+', 'add'],
	        ['-', 'sub', 'subtract'],
	        ['*', 'mul', 'multiply'],
	        ['/', 'div', 'divide'],
	        ['%', 'mod', 'modulus'],
	        // Bitwise operators
	        ['&', 'and'],
	        ['|', 'or'],
	        ['^', 'xor'],
	        ['<<', 'leftShift'],
	        ['>>', 'signPropagatingRightShift'],
	        ['>>>', 'rightShift', 'zeroFillRightShift']
	    ];
	
	    var i;
	    var eval2 = eval;
	    for (var operator of operators) {
	        var inplaceOp = eval2(fillTemplateFunction(inplaceOperator, {name: operator[1], op: operator[0]}));
	        var inplaceOpS = eval2(fillTemplateFunction(inplaceOperatorScalar, {name: operator[1] + 'S', op: operator[0]}));
	        var inplaceOpM = eval2(fillTemplateFunction(inplaceOperatorMatrix, {name: operator[1] + 'M', op: operator[0]}));
	        var staticOp = eval2(fillTemplateFunction(staticOperator, {name: operator[1]}));
	        for (i = 1; i < operator.length; i++) {
	            Matrix.prototype[operator[i]] = inplaceOp;
	            Matrix.prototype[operator[i] + 'S'] = inplaceOpS;
	            Matrix.prototype[operator[i] + 'M'] = inplaceOpM;
	            Matrix[operator[i]] = staticOp;
	        }
	    }
	
	    var methods = [
	        ['~', 'not']
	    ];
	
	    [
	        'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil',
	        'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p',
	        'log10', 'log2', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'
	    ].forEach(function (mathMethod) {
	        methods.push(['Math.' + mathMethod, mathMethod]);
	    });
	
	    for (var method of methods) {
	        var inplaceMeth = eval2(fillTemplateFunction(inplaceMethod, {name: method[1], method: method[0]}));
	        var staticMeth = eval2(fillTemplateFunction(staticMethod, {name: method[1]}));
	        for (i = 1; i < method.length; i++) {
	            Matrix.prototype[method[i]] = inplaceMeth;
	            Matrix[method[i]] = staticMeth;
	        }
	    }
	
	    var methodsWithArgs = [
	        ['Math.pow', 1, 'pow']
	    ];
	
	    for (var methodWithArg of methodsWithArgs) {
	        var args = 'arg0';
	        for (i = 1; i < methodWithArg[1]; i++) {
	            args += `, arg${i}`;
	        }
	        if (methodWithArg[1] !== 1) {
	            var inplaceMethWithArgs = eval2(fillTemplateFunction(inplaceMethodWithArgs, {
	                name: methodWithArg[2],
	                method: methodWithArg[0],
	                args: args
	            }));
	            var staticMethWithArgs = eval2(fillTemplateFunction(staticMethodWithArgs, {name: methodWithArg[2], args: args}));
	            for (i = 2; i < methodWithArg.length; i++) {
	                Matrix.prototype[methodWithArg[i]] = inplaceMethWithArgs;
	                Matrix[methodWithArg[i]] = staticMethWithArgs;
	            }
	        } else {
	            var tmplVar = {
	                name: methodWithArg[2],
	                args: args,
	                method: methodWithArg[0]
	            };
	            var inplaceMethod2 = eval2(fillTemplateFunction(inplaceMethodWithOneArg, tmplVar));
	            var inplaceMethodS = eval2(fillTemplateFunction(inplaceMethodWithOneArgScalar, tmplVar));
	            var inplaceMethodM = eval2(fillTemplateFunction(inplaceMethodWithOneArgMatrix, tmplVar));
	            var staticMethod2 = eval2(fillTemplateFunction(staticMethodWithOneArg, tmplVar));
	            for (i = 2; i < methodWithArg.length; i++) {
	                Matrix.prototype[methodWithArg[i]] = inplaceMethod2;
	                Matrix.prototype[methodWithArg[i] + 'M'] = inplaceMethodM;
	                Matrix.prototype[methodWithArg[i] + 'S'] = inplaceMethodS;
	                Matrix[methodWithArg[i]] = staticMethod2;
	            }
	        }
	    }
	
	    function fillTemplateFunction(template, values) {
	        for (var value in values) {
	            template = template.replace(new RegExp('%' + value + '%', 'g'), values[value]);
	        }
	        return template;
	    }
	
	    return Matrix;
	}
	
	class Matrix extends AbstractMatrix(Array) {
	    constructor(nRows, nColumns) {
	        var i;
	        if (arguments.length === 1 && typeof nRows === 'number') {
	            return new Array(nRows);
	        }
	        if (Matrix.isMatrix(nRows)) {
	            return nRows.clone();
	        } else if (Number.isInteger(nRows) && nRows > 0) { // Create an empty matrix
	            super(nRows);
	            if (Number.isInteger(nColumns) && nColumns > 0) {
	                for (i = 0; i < nRows; i++) {
	                    this[i] = new Array(nColumns);
	                }
	            } else {
	                throw new TypeError('nColumns must be a positive integer');
	            }
	        } else if (Array.isArray(nRows)) { // Copy the values from the 2D array
	            const matrix = nRows;
	            nRows = matrix.length;
	            nColumns = matrix[0].length;
	            if (typeof nColumns !== 'number' || nColumns === 0) {
	                throw new TypeError('Data must be a 2D array with at least one element');
	            }
	            super(nRows);
	            for (i = 0; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                }
	                this[i] = [].concat(matrix[i]);
	            }
	        } else {
	            throw new TypeError('First argument must be a positive number or an array');
	        }
	        this.rows = nRows;
	        this.columns = nColumns;
	        return this;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this[rowIndex][columnIndex] = value;
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this[rowIndex][columnIndex];
	    }
	
	    /**
	     * Removes a row from the given index
	     * @param {number} index - Row index
	     * @return {Matrix} this
	     */
	    removeRow(index) {
	        checkRowIndex(this, index);
	        if (this.rows === 1) {
	            throw new RangeError('A matrix cannot have less than one row');
	        }
	        this.splice(index, 1);
	        this.rows -= 1;
	        return this;
	    }
	
	    /**
	     * Adds a row at the given index
	     * @param {number} [index = this.rows] - Row index
	     * @param {Array|Matrix} array - Array or vector
	     * @return {Matrix} this
	     */
	    addRow(index, array) {
	        if (array === undefined) {
	            array = index;
	            index = this.rows;
	        }
	        checkRowIndex(this, index, true);
	        array = checkRowVector(this, array, true);
	        this.splice(index, 0, array);
	        this.rows += 1;
	        return this;
	    }
	
	    /**
	     * Removes a column from the given index
	     * @param {number} index - Column index
	     * @return {Matrix} this
	     */
	    removeColumn(index) {
	        checkColumnIndex(this, index);
	        if (this.columns === 1) {
	            throw new RangeError('A matrix cannot have less than one column');
	        }
	        for (var i = 0; i < this.rows; i++) {
	            this[i].splice(index, 1);
	        }
	        this.columns -= 1;
	        return this;
	    }
	
	    /**
	     * Adds a column at the given index
	     * @param {number} [index = this.columns] - Column index
	     * @param {Array|Matrix} array - Array or vector
	     * @return {Matrix} this
	     */
	    addColumn(index, array) {
	        if (typeof array === 'undefined') {
	            array = index;
	            index = this.columns;
	        }
	        checkColumnIndex(this, index, true);
	        array = checkColumnVector(this, array);
	        for (var i = 0; i < this.rows; i++) {
	            this[i].splice(index, 0, array[i]);
	        }
	        this.columns += 1;
	        return this;
	    }
	}
	
	class WrapperMatrix1D extends AbstractMatrix() {
	    /**
	     * @class WrapperMatrix1D
	     * @param {Array<number>} data
	     * @param {object} [options]
	     * @param {object} [options.rows = 1]
	     */
	    constructor(data, options = {}) {
	        const {
	            rows = 1
	        } = options;
	
	        if (data.length % rows !== 0) {
	            throw new Error('the data length is not divisible by the number of rows');
	        }
	        super();
	        this.rows = rows;
	        this.columns = data.length / rows;
	        this.data = data;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        var index = this._calculateIndex(rowIndex, columnIndex);
	        this.data[index] = value;
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        var index = this._calculateIndex(rowIndex, columnIndex);
	        return this.data[index];
	    }
	
	    _calculateIndex(row, column) {
	        return (row * this.columns) + column;
	    }
	
	    static get [Symbol.species]() {
	        return Matrix;
	    }
	}
	
	class WrapperMatrix2D extends AbstractMatrix() {
	    /**
	     * @class WrapperMatrix2D
	     * @param {Array<Array<number>>} data
	     */
	    constructor(data) {
	        super();
	        this.data = data;
	        this.rows = data.length;
	        this.columns = data[0].length;
	    }
	
	    set(rowIndex, columnIndex, value) {
	        this.data[rowIndex][columnIndex] = value;
	        return this;
	    }
	
	    get(rowIndex, columnIndex) {
	        return this.data[rowIndex][columnIndex];
	    }
	
	    static get [Symbol.species]() {
	        return Matrix;
	    }
	}
	
	/**
	 * @param {Array<Array<number>>|Array<number>} array
	 * @param {object} [options]
	 * @param {object} [options.rows = 1]
	 * @return {WrapperMatrix1D|WrapperMatrix2D}
	 */
	function wrap(array, options) {
	    if (Array.isArray(array)) {
	        if (array[0] && Array.isArray(array[0])) {
	            return new WrapperMatrix2D(array);
	        } else {
	            return new WrapperMatrix1D(array, options);
	        }
	    } else {
	        throw new Error('the argument is not an array');
	    }
	}
	
	/**
	 * @class QrDecomposition
	 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	 * @param {Matrix} value
	 */
	class QrDecomposition$$1 {
	    constructor(value) {
	        value = WrapperMatrix2D.checkMatrix(value);
	
	        var qr = value.clone();
	        var m = value.rows;
	        var n = value.columns;
	        var rdiag = new Array(n);
	        var i, j, k, s;
	
	        for (k = 0; k < n; k++) {
	            var nrm = 0;
	            for (i = k; i < m; i++) {
	                nrm = hypotenuse(nrm, qr.get(i, k));
	            }
	            if (nrm !== 0) {
	                if (qr.get(k, k) < 0) {
	                    nrm = -nrm;
	                }
	                for (i = k; i < m; i++) {
	                    qr.set(i, k, qr.get(i, k) / nrm);
	                }
	                qr.set(k, k, qr.get(k, k) + 1);
	                for (j = k + 1; j < n; j++) {
	                    s = 0;
	                    for (i = k; i < m; i++) {
	                        s += qr.get(i, k) * qr.get(i, j);
	                    }
	                    s = -s / qr.get(k, k);
	                    for (i = k; i < m; i++) {
	                        qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
	                    }
	                }
	            }
	            rdiag[k] = -nrm;
	        }
	
	        this.QR = qr;
	        this.Rdiag = rdiag;
	    }
	
	    /**
	     * Solve a problem of least square (Ax=b) by using the QR decomposition. Useful when A is rectangular, but not working when A is singular.
	     * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :
	     * var qr = QrDecomposition(A);
	     * var x = qr.solve(b);
	     * @param {Matrix} value - Matrix 1D which is the vector b (in the equation Ax = b)
	     * @return {Matrix} - The vector x
	     */
	    solve(value) {
	        value = Matrix.checkMatrix(value);
	
	        var qr = this.QR;
	        var m = qr.rows;
	
	        if (value.rows !== m) {
	            throw new Error('Matrix row dimensions must agree');
	        }
	        if (!this.isFullRank()) {
	            throw new Error('Matrix is rank deficient');
	        }
	
	        var count = value.columns;
	        var X = value.clone();
	        var n = qr.columns;
	        var i, j, k, s;
	
	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }
	
	        return X.subMatrix(0, n - 1, 0, count - 1);
	    }
	
	    /**
	     *
	     * @return {boolean}
	     */
	    isFullRank() {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get upperTriangularMatrix() {
	        var qr = this.QR;
	        var n = qr.columns;
	        var X = new Matrix(n, n);
	        var i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get orthogonalMatrix() {
	        var qr = this.QR;
	        var rows = qr.rows;
	        var columns = qr.columns;
	        var X = new Matrix(rows, columns);
	        var i, j, k, s;
	
	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }
	
	                    s = -s / qr[k][k];
	
	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	}
	
	/**
	 * Computes the inverse of a Matrix
	 * @param {Matrix} matrix
	 * @param {boolean} [useSVD=false]
	 * @return {Matrix}
	 */
	function inverse$$1(matrix, useSVD = false) {
	    matrix = WrapperMatrix2D.checkMatrix(matrix);
	    if (useSVD) {
	        return new SingularValueDecomposition$$1(matrix).inverse();
	    } else {
	        return solve$$1(matrix, Matrix.eye(matrix.rows));
	    }
	}
	
	/**
	 *
	 * @param {Matrix} leftHandSide
	 * @param {Matrix} rightHandSide
	 * @param {boolean} [useSVD = false]
	 * @return {Matrix}
	 */
	function solve$$1(leftHandSide, rightHandSide, useSVD = false) {
	    leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
	    rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);
	    if (useSVD) {
	        return new SingularValueDecomposition$$1(leftHandSide).solve(rightHandSide);
	    } else {
	        return leftHandSide.isSquare() ? new LuDecomposition$$1(leftHandSide).solve(rightHandSide) : new QrDecomposition$$1(leftHandSide).solve(rightHandSide);
	    }
	}
	
	/**
	 * @class EigenvalueDecomposition
	 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	 * @param {Matrix} matrix
	 * @param {object} [options]
	 * @param {boolean} [options.assumeSymmetric=false]
	 */
	class EigenvalueDecomposition$$1 {
	    constructor(matrix, options = {}) {
	        const {
	            assumeSymmetric = false
	        } = options;
	
	        matrix = WrapperMatrix2D.checkMatrix(matrix);
	        if (!matrix.isSquare()) {
	            throw new Error('Matrix is not a square matrix');
	        }
	
	        var n = matrix.columns;
	        var V = getFilled2DArray(n, n, 0);
	        var d = new Array(n);
	        var e = new Array(n);
	        var value = matrix;
	        var i, j;
	
	        var isSymmetric = false;
	        if (assumeSymmetric) {
	            isSymmetric = true;
	        } else {
	            isSymmetric = matrix.isSymmetric();
	        }
	
	        if (isSymmetric) {
	            for (i = 0; i < n; i++) {
	                for (j = 0; j < n; j++) {
	                    V[i][j] = value.get(i, j);
	                }
	            }
	            tred2(n, e, d, V);
	            tql2(n, e, d, V);
	        } else {
	            var H = getFilled2DArray(n, n, 0);
	            var ort = new Array(n);
	            for (j = 0; j < n; j++) {
	                for (i = 0; i < n; i++) {
	                    H[i][j] = value.get(i, j);
	                }
	            }
	            orthes(n, H, ort, V);
	            hqr2(n, e, d, V, H);
	        }
	
	        this.n = n;
	        this.e = e;
	        this.d = d;
	        this.V = V;
	    }
	
	    /**
	     *
	     * @return {Array<number>}
	     */
	    get realEigenvalues() {
	        return this.d;
	    }
	
	    /**
	     *
	     * @return {Array<number>}
	     */
	    get imaginaryEigenvalues() {
	        return this.e;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get eigenvectorMatrix() {
	        if (!Matrix.isMatrix(this.V)) {
	            this.V = new Matrix(this.V);
	        }
	        return this.V;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get diagonalMatrix() {
	        var n = this.n;
	        var e = this.e;
	        var d = this.d;
	        var X = new Matrix(n, n);
	        var i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            } else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	}
	
	function tred2(n, e, d, V) {
	    var f, g, h, i, j, k,
	        hh, scale;
	
	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }
	
	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }
	
	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }
	
	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }
	
	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }
	
	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }
	
	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }
	
	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }
	
	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }
	
	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }
	
	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }
	
	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }
	
	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }
	
	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}
	
	function tql2(n, e, d, V) {
	
	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;
	
	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }
	
	    e[n - 1] = 0;
	
	    var f = 0;
	    var tst1 = 0;
	    var eps = Number.EPSILON;
	
	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }
	
	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;
	
	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }
	
	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }
	
	                f = f + h;
	
	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);
	
	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }
	
	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;
	
	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }
	
	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }
	
	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}
	
	function orthes(n, H, ort, V) {
	
	    var low = 0;
	    var high = n - 1;
	    var f, g, h, i, j, m;
	    var scale;
	
	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }
	
	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }
	
	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }
	
	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;
	
	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }
	
	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }
	
	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }
	
	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }
	
	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }
	
	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }
	
	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }
	
	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }
	
	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}
	
	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1;
	    var low = 0;
	    var high = nn - 1;
	    var eps = Number.EPSILON;
	    var exshift = 0;
	    var norm = 0;
	    var p = 0;
	    var q = 0;
	    var r = 0;
	    var s = 0;
	    var z = 0;
	    var iter = 0;
	    var i, j, k, l, m, t, w, x, y;
	    var ra, sa, vr, vi;
	    var notlast, cdivres;
	
	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }
	
	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }
	
	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }
	
	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];
	
	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;
	
	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }
	
	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }
	
	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }
	
	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }
	
	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }
	
	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }
	
	            iter = iter + 1;
	
	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }
	
	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }
	
	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }
	
	                if (x === 0) {
	                    break;
	                }
	
	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }
	
	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }
	
	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;
	
	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }
	
	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }
	
	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }
	
	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }
	
	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }
	
	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }
	
	    if (norm === 0) {
	        return;
	    }
	
	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];
	
	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }
	
	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }
	
	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;
	
	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }
	
	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }
	
	                w = H[i][i] - p;
	
	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }
	
	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }
	
	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }
	
	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}
	
	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    } else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}
	
	/**
	 * @class CholeskyDecomposition
	 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	 * @param {Matrix} value
	 */
	class CholeskyDecomposition$$1 {
	    constructor(value) {
	        value = WrapperMatrix2D.checkMatrix(value);
	        if (!value.isSymmetric()) {
	            throw new Error('Matrix is not symmetric');
	        }
	
	        var a = value;
	        var dimension = a.rows;
	        var l = new Matrix(dimension, dimension);
	        var positiveDefinite = true;
	        var i, j, k;
	
	        for (j = 0; j < dimension; j++) {
	            var Lrowj = l[j];
	            var d = 0;
	            for (k = 0; k < j; k++) {
	                var Lrowk = l[k];
	                var s = 0;
	                for (i = 0; i < k; i++) {
	                    s += Lrowk[i] * Lrowj[i];
	                }
	                Lrowj[k] = s = (a.get(j, k) - s) / l[k][k];
	                d = d + s * s;
	            }
	
	            d = a.get(j, j) - d;
	
	            positiveDefinite &= (d > 0);
	            l[j][j] = Math.sqrt(Math.max(d, 0));
	            for (k = j + 1; k < dimension; k++) {
	                l[j][k] = 0;
	            }
	        }
	
	        if (!positiveDefinite) {
	            throw new Error('Matrix is not positive definite');
	        }
	
	        this.L = l;
	    }
	
	    /**
	     *
	     * @param {Matrix} value
	     * @return {Matrix}
	     */
	    solve(value) {
	        value = WrapperMatrix2D.checkMatrix(value);
	
	        var l = this.L;
	        var dimension = l.rows;
	
	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }
	
	        var count = value.columns;
	        var B = value.clone();
	        var i, j, k;
	
	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }
	
	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }
	
	        return B;
	    }
	
	    /**
	     *
	     * @return {Matrix}
	     */
	    get lowerTriangularMatrix() {
	        return this.L;
	    }
	}
	
	exports['default'] = Matrix;
	exports.Matrix = Matrix;
	exports.abstractMatrix = AbstractMatrix;
	exports.wrap = wrap;
	exports.WrapperMatrix2D = WrapperMatrix2D;
	exports.WrapperMatrix1D = WrapperMatrix1D;
	exports.solve = solve$$1;
	exports.inverse = inverse$$1;
	exports.SingularValueDecomposition = SingularValueDecomposition$$1;
	exports.SVD = SingularValueDecomposition$$1;
	exports.EigenvalueDecomposition = EigenvalueDecomposition$$1;
	exports.EVD = EigenvalueDecomposition$$1;
	exports.CholeskyDecomposition = CholeskyDecomposition$$1;
	exports.CHO = CholeskyDecomposition$$1;
	exports.LuDecomposition = LuDecomposition$$1;
	exports.LU = LuDecomposition$$1;
	exports.QrDecomposition = QrDecomposition$$1;
	exports.QR = QrDecomposition$$1;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
	
	var max = _interopDefault(__webpack_require__(22));
	var min = _interopDefault(__webpack_require__(23));
	
	function rescale(input, options = {}) {
	    if (!Array.isArray(input)) {
	        throw new TypeError('input must be an array');
	    } else if (input.length === 0) {
	        throw new TypeError('input must not be empty');
	    }
	
	    let output;
	    if (options.output !== undefined) {
	        if (!Array.isArray(options.output)) {
	            throw new TypeError('output option must be an array if specified');
	        }
	        output = options.output;
	    } else {
	        output = new Array(input.length);
	    }
	
	    const currentMin = min(input);
	    const currentMax = max(input);
	
	    if (currentMin === currentMax) {
	        throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');
	    }
	
	    const {
	        min: minValue = options.autoMinMax ? currentMin : 0,
	        max: maxValue = options.autoMinMax ? currentMax : 1
	    } = options;
	
	    if (minValue >= maxValue) {
	        throw new RangeError('min option must be smaller than max option');
	    }
	
	    const factor = (maxValue - minValue) / (currentMax - currentMin);
	    for (var i = 0; i < input.length; i++) {
	        output[i] = (input[i] - currentMin) * factor + minValue;
	    }
	
	    return output;
	}
	
	module.exports = rescale;


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Computes the maximum of the given values
	 * @param {Array<number>} input
	 * @return {number}
	 */
	function max(input) {
	    if (!Array.isArray(input)) {
	        throw new Error('input must be an array');
	    }
	
	    if (input.length === 0) {
	        throw new Error('input must not be empty');
	    }
	
	    var max = input[0];
	    for (var i = 1; i < input.length; i++) {
	        if (input[i] > max) max = input[i];
	    }
	    return max;
	}
	
	module.exports = max;


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Computes the minimum of the given values
	 * @param {Array<number>} input
	 * @return {number}
	 */
	function min(input) {
	    if (!Array.isArray(input)) {
	        throw new Error('input must be an array');
	    }
	
	    if (input.length === 0) {
	        throw new Error('input must not be empty');
	    }
	
	    var min = input[0];
	    for (var i = 1; i < input.length; i++) {
	        if (input[i] < min) min = input[i];
	    }
	    return min;
	}
	
	module.exports = min;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2017, Helikar Lab.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Author: Renato Fabbri
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	// inspired in Matlab implementation
	// and JS transcription in
	// https://github.com/alanmeeson/spectral-graph-layout
	
	var _utils = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	        this._epsilon = 1e-8; // tolerance
	        this._MAX_ITTERATIONS = 100; //We use power iteration, this is analogous to wall time to avoid infinite loops.
	        this._num_elements = nodes.length; //number of nodes in graph
	        this._dims = 2;
	    }
	
	    _createClass(_class, [{
	        key: 'apply',
	        value: function apply() {
	            var A = (0, _utils.create2dArray)(this._nodes.length, this._nodes.length);
	            // build the adjacency matrix
	            for (var i = 0; i < this._edges.length; ++i) {
	                var ii = this._edges[i].source.index;
	                var j = this._edges[i].target.index;
	                A[ii][j] = 1; // not considering edge weight for now (the example json files don't have weight)
	            }
	            var D = deg(A); //degree of each node in graph (number of connections).
	
	            var dims = this._dims + 1; //add one to the dims to allow for the first eigen vector
	            var u = new Array(dims); //declare the eigen vector matrix
	            u[0] = normalize(ones(this._num_elements)); //create & normalize the first eigen vector
	            for (var _i = 1; _i < dims; _i++) {
	                u[_i] = zeros(this._num_elements);
	            } //create empty space for the other eigen vectors
	
	            //Power iteration to determine the remaining eigen vectors.
	            for (var k = 1; k < dims; k++) {
	                //for each eigen vector after the first, 
	                //initialize eigen vector with random values
	                var uhk = normalize(rand(this._num_elements));
	
	                var itt_count = 0; //we are allowing a max of 100 iterations, to avoid hanging and infinite loops. (specified above in constants)
	                var stop = false; //stopping criterion flag.
	                while (!stop) {
	                    // do...while using flags to keep it consistent with my matlab implementation
	
	                    //D-orthogonalize against previous eigenvectors
	                    var uk = uhk.slice();
	                    for (var l = 0; l < k; l++) {
	                        var ul = u[l]; //extract the l-th eigen vector
	
	                        //Calculate (uk'.D.ul)/(ul'.D.ul)
	                        var top_ = 0;
	                        var bottom = 0;
	                        for (var vmi = 0; vmi < uk.length; vmi++) {
	                            top_ += uk[vmi] * D[vmi] * ul[vmi];
	                            bottom += ul[vmi] * D[vmi] * ul[vmi];
	                        }
	                        var ratio = top_ / bottom;
	
	                        //uk = uk - ((uk' . D . ul) / (ul' . D ul)) . ul
	                        for (var vsi = 0; vsi < uk.length; vsi++) {
	                            uk[vsi] = uk[vsi] - ratio * ul[vsi];
	                        }
	                    }
	
	                    //multiply with .5(I+D^-1 A)
	                    for (var _i2 = 0; _i2 < uhk.length; _i2++) {
	                        uhk[_i2] = 0.5 * (uk[_i2] + dot(A[_i2], uk) / D[_i2]);
	                    }
	
	                    uhk = normalize(uhk);
	
	                    itt_count = itt_count + 1;
	                    stop = itt_count > 100 | !(dot(uhk, uk) < 1 - this._epsilon);
	                }
	                u[k] = uhk.slice();
	            }
	
	            //discard the first eigenvector which should be [ones].
	            // var v = new Array(u.length);
	            // for (var i=0; i < u.length; i++) {
	            //     v[i] = new Array(u[i].length);
	            //     for (var j=0; j < u[i].length; j++) v[i][j] = u[i][j];
	            // }
	            var x = normalize2(u[1]);
	            var y = normalize2(u[2]);
	            this._nodes.forEach(function (node, i) {
	                node.x = x[i];
	                node.y = y[i];
	            });
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;
	
	function deg(graph) {
	    //Calculate the degree of each node from the graph matrix.
	    var d = zeros(graph.length);
	
	    //degree of node i is the sum of the weights of all edges connected to it.
	    for (var i = 0; i < graph.length; i++) {
	        var node_degree = 0;
	        for (var j = 0; j < graph[i].length; j++) {
	            node_degree += graph[i][j];
	        }
	        d[i] = node_degree + 1;
	    }
	
	    return d;
	}
	
	function dot(a, b) {
	    //inner product of two vectors
	    var d = 0;
	    for (var i = 0; i < a.length; i++) {
	        d += a[i] * b[i];
	    }
	    return d;
	}
	
	function euclideanDistance(coordinates) {
	    //calculate the euclidean distance between two points/vectors.
	    // used for normalization.
	    var d = 0;
	
	    for (var i = 0; i < coordinates.length; i++) {
	        d += Math.pow(coordinates[i], 2);
	    }
	    return Math.sqrt(d);
	}
	
	function normalize(arr) {
	    //normalizes a vector = arr/||arr||
	    var d = euclideanDistance(arr);
	    var narr = new Array(arr.length);
	    for (var i = 0; i < arr.length; i++) {
	        narr[i] = arr[i] / d;
	    }
	
	    return narr;
	}
	
	function rand(n) {
	    //create a vector of length n and fill with random numbers.
	    var arr = new Array(n);
	    for (var i = 0; i < n; i++) {
	        arr[i] = Math.random();
	    }return arr;
	}
	
	function add(a, b) {
	    var c = new Array(a.length);
	    for (var i = 0; i < a.length; i++) {
	        c[i] = new Array(a[i].length);
	        for (var j = 0; j < a[i].length; j++) {
	            c[i][j] = a[i][j] + b[i][j];
	        }
	    }
	    return c;
	}
	
	function symmetricRandMatrix(n, ulim) {
	    var mat = new Array(n);
	    for (var i = 0; i < n; i++) {
	        mat[i] = new Array(n);
	        mat[i][i] = 0;
	    }
	    for (var _i3 = 0; _i3 < n; _i3++) {
	        for (var j = _i3 + 1; j < n; j++) {
	            mat[_i3][j] = ulim * Math.random();
	            mat[j][_i3] = mat[_i3][j];
	        }
	    }
	    return mat;
	}
	
	function zeros(n) {
	    //create a vector filled with zeros
	    var arr = new Array(n);
	    for (var i = 0; i < n; i++) {
	        arr[i] = 0;
	    }return arr;
	}
	
	function ones(n) {
	    //create a vector filled with ones
	    var arr = new Array(n);
	    for (var i = 0; i < n; i++) {
	        arr[i] = 1;
	    }return arr;
	}
	
	function normalize2(x) {
	    var maxx = Math.max.apply(null, x.map(Math.abs));
	    var minx = Math.min.apply(null, x);
	    for (var i = 0; i < x.length; ++i) {
	        x[i] = 0.1 + (x[i] - minx) / ((maxx - minx) * 1.25);
	    }
	    return x;
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) 2017, Helikar Lab.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This source code is licensed under the GPLv3 License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Author: Renato Fabbri
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _utils = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    // get degree of all nodes
	    function _class(nodes, edges) {
	        _classCallCheck(this, _class);
	
	        this._nodes = nodes;
	        this._edges = edges;
	        this._margin = 0.05; // from [0,1] borders
	        this._radius = 0.05; // of the empty circle on the center
	        this._nlines = 5;
	    }
	
	    _createClass(_class, [{
	        key: 'apply',
	        value: function apply() {
	            var nd = (0, _utils.degrees)(this._nodes, this._edges);
	            var nodes_segment = this._nodes.length / this._nlines;
	            var segment = 0.5 - (this._margin + this._radius);
	            var step = segment / nodes_segment;
	            var angle = 2 * Math.PI / this._nlines;
	            var j = 0;
	            for (var i = 0; i < this._nodes.length; ++i) {
	                var ii = nd.nodes[i].index;
	                this._nodes[ii].x = 0.5 + (this._radius + step * (i - j * nodes_segment)) * Math.cos(angle * j + Math.PI / 2);
	                this._nodes[ii].y = 0.5 + (this._radius + step * (i - j * nodes_segment)) * Math.sin(angle * j + Math.PI / 2);
	                j = Math.floor(i / nodes_segment);
	            }
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	     value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	     function _class(nodes, edges) {
	          _classCallCheck(this, _class);
	
	          this._nodes = nodes;
	          this._edges = edges;
	          this._margin = 0.05;
	     }
	
	     _createClass(_class, [{
	          key: 'apply',
	          value: function apply() {
	               var nd = (0, _utils.degrees)(this._nodes, this._edges);
	               var sq = Math.sqrt(this._nodes.length);
	               var reminder = sq - Math.floor(sq);
	               if (reminder > 0) var nnodes = Math.floor(sq) + 1;else var nnodes = sq;
	               var step = (1 - this._margin * 2) / nnodes;
	
	               var nlines = this._nodes.length / nnodes;
	               var reminder2 = nlines - Math.floor(nlines);
	               if (reminder2 > 0) var nlines2 = Math.floor(nlines) + 1;else var nlines2 = nlines;
	               var stepy = (1 - 2 * this._margin) / (nlines2 - 2);
	               for (var i = 0; i < this._nodes.length; ++i) {
	                    var j = Math.floor(i / (nnodes + 1));
	                    this._nodes[nd.nodes[i].index].x = this._margin + step * (i - j * (nnodes + 1));
	                    this._nodes[nd.nodes[i].index].y = this._margin + stepy * j;
	                    this._nodes[nd.nodes[i].index].weight = nd.degrees[i];
	               }
	          }
	     }]);
	
	     return _class;
	}();
	
	exports.default = _class;
	;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(14);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	  // the hubs are on the first half of the sinusoid period
	  // the intermediary are on the second half
	  // and the periphery are on the upper straight line
	  // further versions should enable the choice of other
	  // fractions of hubs, intermediary and peripheral vertices
	  // or the Erdös sectioning.
	  // maybe also let the user set the endpoints of the periphery segment
	  function _class(nodes, edges) {
	    _classCallCheck(this, _class);
	
	    this._nodes = nodes;
	    this._edges = edges;
	    this._margin = 0.05;
	    this._hubs = 0.1; // 10%
	    this._intermediary = 0.2;
	  }
	
	  _createClass(_class, [{
	    key: 'apply',
	    value: function apply() {
	      var nd = (0, _utils.degrees)(this._nodes, this._edges);
	      var nhubs_intermediary = Math.floor(this._nodes.length * (this._hubs + this._intermediary));
	      var nhubs = Math.floor(this._nodes.length * this._hubs);
	      var stepx1 = (1 - 2 * this._margin) / 2 / (nhubs - 1);
	      var steprad = Math.PI / (nhubs - 1);
	      var i = 0;
	      while (i < nhubs) {
	        this._nodes[nd.nodes[i].index].x = this._margin + stepx1 * i;
	        this._nodes[nd.nodes[i].index].y = this._margin + 0.4 + 0.4 * Math.sin(i * steprad);
	        ++i;
	      }
	      var nintermediary = nhubs_intermediary - nhubs;
	      var steprad2 = Math.PI / nintermediary;
	      var stepx2 = (1 - 2 * this._margin) / 2 / nintermediary;
	      i = 0;
	      while (i < nintermediary) {
	        this._nodes[nd.nodes[i + nhubs].index].x = 0.5 + stepx2 * (i + 1);
	        this._nodes[nd.nodes[i + nhubs].index].y = this._margin + 0.4 + 0.4 * Math.sin(Math.PI + (i + 1) * steprad2);
	        ++i;
	      }
	      var p0 = [0.85, 0.75];
	      var p1 = [0.4, 1 - this._margin];
	      var nperipheral = this._nodes.length - nhubs_intermediary;
	      var stepxx = (p1[0] - p0[0]) / (nperipheral - 1);
	      var stepy = (p1[1] - p0[1]) / (nperipheral - 1);
	      i = 0;
	      while (i < nperipheral) {
	        this._nodes[nd.nodes[i + nhubs_intermediary].index].x = p0[0] + stepxx * i;
	        this._nodes[nd.nodes[i + nhubs_intermediary].index].y = p0[1] + stepy * i;
	        ++i;
	      }
	    }
	  }]);
	
	  return _class;
	}();
	
	exports.default = _class;
	;

/***/ },
/* 28 */
/***/ function(module, exports) {

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

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _rbush = __webpack_require__(30);
	
	var _rbush2 = _interopRequireDefault(_rbush);
	
	var _geomutils = __webpack_require__(28);
	
	var _geomutils2 = _interopRequireDefault(_geomutils);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _primitiveTools = __webpack_require__(8);
	
	var _geomtools = __webpack_require__(31);
	
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
	    for (var _style in sd) {
	      var rb = this.rbushtree_s[_style] = (0, _rbush2.default)();
	      rb.load(sd[_style]);
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

/***/ },
/* 30 */
/***/ function(module, exports) {

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

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.neq = exports.eq = exports.getBBFromPoints = exports.pDistance2 = exports.distance2 = exports.distance2ToBezier = exports.pointInRect = exports.rectIntersectsRect = exports.lineIntersectsRect = exports.bezierIntersectsLine = exports.bezierIntersectsRect = exports.EPS = undefined;
	
	var _rbush = __webpack_require__(30);
	
	var _rbush2 = _interopRequireDefault(_rbush);
	
	var _geomutils = __webpack_require__(28);
	
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

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

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
	
	var _default = __webpack_require__(35);
	
	var _default2 = _interopRequireDefault(_default);
	
	var _sdf = __webpack_require__(36);
	
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

/***/ },
/* 35 */
/***/ function(module, exports) {

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

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _pbf = __webpack_require__(37);
	
	var _pbf2 = _interopRequireDefault(_pbf);
	
	var _atlas = __webpack_require__(39);
	
	var _atlas2 = _interopRequireDefault(_atlas);
	
	var _glyphs = __webpack_require__(41);
	
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

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = Pbf;
	
	var ieee754 = __webpack_require__(38);
	
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


/***/ },
/* 38 */
/***/ function(module, exports) {

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


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shelfPack = __webpack_require__(40);
	
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

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 41 */
/***/ function(module, exports) {

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

/***/ },
/* 42 */
/***/ function(module, exports) {

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

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _geomutils = __webpack_require__(28);
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=ccNetViz.js.map
if(typeof module !== "undefined")
module.exports = ccNetViz;