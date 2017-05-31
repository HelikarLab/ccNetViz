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
	
	var _textures = __webpack_require__(17);
	
	var _textures2 = _interopRequireDefault(_textures);
	
	var _files = __webpack_require__(18);
	
	var _files2 = _interopRequireDefault(_files);
	
	var _texts = __webpack_require__(19);
	
	var _texts2 = _interopRequireDefault(_texts);
	
	var _lazyEvents = __webpack_require__(27);
	
	var _lazyEvents2 = _interopRequireDefault(_lazyEvents);
	
	var _interactivityBatch = __webpack_require__(28);
	
	var _interactivityBatch2 = _interopRequireDefault(_interactivityBatch);
	
	var _spatialSearch = __webpack_require__(14);
	
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
	
	var _geomutils = __webpack_require__(13);
	
	var _geomutils2 = _interopRequireDefault(_geomutils);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _primitiveTools = __webpack_require__(8);
	
	var _spatialSearch = __webpack_require__(14);
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _rbush = __webpack_require__(15);
	
	var _rbush2 = _interopRequireDefault(_rbush);
	
	var _geomutils = __webpack_require__(13);
	
	var _geomutils2 = _interopRequireDefault(_geomutils);
	
	var _utils = __webpack_require__(7);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _primitiveTools = __webpack_require__(8);
	
	var _geomtools = __webpack_require__(16);
	
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.neq = exports.eq = exports.getBBFromPoints = exports.pDistance2 = exports.distance2 = exports.distance2ToBezier = exports.pointInRect = exports.rectIntersectsRect = exports.lineIntersectsRect = exports.bezierIntersectsLine = exports.bezierIntersectsRect = exports.EPS = undefined;
	
	var _rbush = __webpack_require__(15);
	
	var _rbush2 = _interopRequireDefault(_rbush);
	
	var _geomutils = __webpack_require__(13);
	
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
	
	var _default = __webpack_require__(20);
	
	var _default2 = _interopRequireDefault(_default);
	
	var _sdf = __webpack_require__(21);
	
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _pbf = __webpack_require__(22);
	
	var _pbf2 = _interopRequireDefault(_pbf);
	
	var _atlas = __webpack_require__(24);
	
	var _atlas2 = _interopRequireDefault(_atlas);
	
	var _glyphs = __webpack_require__(26);
	
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = Pbf;
	
	var ieee754 = __webpack_require__(23);
	
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shelfPack = __webpack_require__(25);
	
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _geomutils = __webpack_require__(13);
	
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