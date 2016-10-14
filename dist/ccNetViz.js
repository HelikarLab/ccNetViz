/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ccNetViz = __webpack_require__(1);

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska - http://alessaska.cz/
	 */

	var ccNetVizMultiLevel = function ccNetVizMultiLevel(canvas, options) {
	  var vizScreen = new ccNetViz(canvas, options);
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

	module.exports = ccNetVizMultiLevel;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ccNetViz_layer = __webpack_require__(2);
	var ccNetViz_layout = __webpack_require__(7);
	var ccNetViz_gl = __webpack_require__(4);
	var ccNetViz_color = __webpack_require__(3);
	var ccNetViz_utils = __webpack_require__(15);
	var ccNetViz_textures = __webpack_require__(16);
	var ccNetViz_interactivityBatch = __webpack_require__(17);
	var ccNetViz_spatialSearch = __webpack_require__(13);

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: 
	 * 	David Tichy
	 *  	Aleš Saska - http://alessaska.cz/
	 */

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

	  var backgroundStyle = options.styles.background = options.styles.background || {};
	  var backgroundColor = new ccNetViz_color(backgroundStyle.color || "rgb(255, 255, 255)");

	  var removed = false;

	  var nodeStyle = options.styles.node = options.styles.node || {};
	  nodeStyle.minSize = nodeStyle.minSize != null ? nodeStyle.minSize : 6;
	  nodeStyle.maxSize = nodeStyle.maxSize || 16;
	  nodeStyle.color = nodeStyle.color || "rgb(255, 255, 255)";

	  if (nodeStyle.label) {
	    var s = nodeStyle.label;
	    s.color = s.color || "rgb(120, 120, 120)";
	    s.font = s.font || "11px Arial, Helvetica, sans-serif";
	  }

	  var edgeStyle = options.styles.edge = options.styles.edge || {};
	  edgeStyle.width = edgeStyle.width || 1;
	  edgeStyle.color = edgeStyle.color || "rgb(204, 204, 204)";

	  if (edgeStyle.arrow) {
	    var _s = edgeStyle.arrow;
	    _s.minSize = _s.minSize != null ? _s.minSize : 6;
	    _s.maxSize = _s.maxSize || 12;
	    _s.aspect = 1;
	  }

	  function getContext() {
	    var attributes = { depth: false, antialias: false };
	    var gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);

	    //      let gl_lose = gl.getExtension('WEBGL_lose_context');
	    //      if(gl_lose) gl_lose.restoreContext();

	    return gl;
	  }

	  var layers = {};
	  var view = void 0,
	      gl = void 0,
	      drawFunc = void 0;
	  var context = {};

	  this.cntShownNodes = function () {
	    var n = layers.main.cntShownNodes();
	    if (layers.temp) n += layers.temp.cntShownNodes();
	    return n;
	  };
	  var getNodesCnt = options.getNodesCnt || this.cntShownNodes;

	  this.cntShownEdges = function () {
	    var e = layers.main.cntShownEdges();
	    if (layers.temp) e += layers.temp.cntShownEdges();
	    return e;
	  };
	  var getEdgesCnt = options.getEdgesCnt || this.cntShownEdges;

	  var onRedraw = ccNetViz_utils.debounce(function () {
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
	    layers.temp = new ccNetViz_layer(canvas, context, view, gl, textures, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw);
	  }

	  var batch = undefined;
	  function getBatch() {
	    if (!batch) batch = new ccNetViz_interactivityBatch(layers, insertTempLayer, drawFunc, nodes, edges, checkUniqId);
	    return batch;
	  };

	  this.set = function (n, e, layout) {
	    if (checkRemoved()) return _this;

	    nodes = n || [];
	    edges = e || [];

	    nodes.forEach(checkUniqId);
	    edges.forEach(checkUniqId);

	    if (layers.temp) layers.temp.set([], [], layout);
	    layers.main.set(nodes, edges, layout);

	    //reset batch
	    batch = undefined;
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
	    }_this.removeNode(n);_this.addNode(n);return _this;
	  };
	  this.updateEdge = function (e) {
	    if (checkRemoved()) {
	      return _this;
	    }_this.removeEdge(e);_this.addEdge(e);return _this;
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

	  var getSize = function getSize(c, n, sc) {
	    var result = sc * Math.sqrt(c.width * c.height / n) / view.size;
	    var s = c.style;
	    if (s) {
	      result = s.maxSize ? Math.min(s.maxSize, result) : result;
	      result = result < s.hideSize ? 0 : s.minSize ? Math.max(s.minSize, result) : result;
	    }
	    return result;
	  };

	  var getNodeSize = function getNodeSize(c) {
	    return getSize(c, getNodesCnt(), 0.4);
	  };

	  var offset = 0.5 * nodeStyle.maxSize;

	  this.draw = function () {
	    if (checkRemoved()) return;

	    var width = canvas.width;
	    var height = canvas.height;
	    var aspect = width / height;
	    var o = view.size === 1 ? offset : 0;
	    var ox = o / width;
	    var oy = o / height;

	    context.transform = ccNetViz_gl.ortho(view.x - ox, view.x + view.size + ox, view.y - oy, view.y + view.size + oy, -1, 1);
	    context.offsetX = ox;
	    context.offsetY = oy;
	    context.width = 0.5 * width;
	    context.height = 0.5 * height;
	    context.aspect2 = aspect * aspect;
	    context.aspect = aspect;
	    context.count = getNodesCnt();

	    //bad hack because we use different size for curveExc and for nodeSize :(
	    if (context.style) delete context.style;
	    context.curveExc = getSize(context, getEdgesCnt(), 0.5);
	    context.style = nodeStyle;
	    context.nodeSize = getNodeSize(context);

	    gl.viewport(0, 0, width, height);

	    gl.clear(gl.COLOR_BUFFER_BIT);

	    for (var i = 0; i < layers.main.scene.elements.length; i++) {
	      layers.main.scene.elements[i].draw(context);
	      if (layers.temp) layers.temp.scene.elements[i].draw(context);
	    }
	  };
	  drawFunc = this.draw.bind(this);

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
	    if (checkRemoved()) return;

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

	  var onDownThis = void 0,
	      onWheelThis = void 0;
	  canvas.addEventListener("mousedown", onDownThis = onMouseDown.bind(this));
	  canvas.addEventListener("wheel", onWheelThis = onWheel.bind(this));

	  this.remove = function () {
	    if (checkRemoved()) return;

	    gl.viewport(0, 0, context.width * 2, context.height * 2);
	    gl.clear(gl.COLOR_BUFFER_BIT);

	    var gl_lose = gl.getExtension('WEBGL_lose_context');
	    if (gl_lose) gl_lose.loseContext();

	    canvas.removeEventListener('mousedown', onDownThis);
	    canvas.removeEventListener('wheel', onWheelThis);

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
	    ccNetViz_utils.extend(last_view, view);

	    if (is_change) {
	      options.onChangeViewport && options.onChangeViewport(view);
	    }
	  }

	  function onMouseDown(e) {
	    var _this2 = this;

	    var width = canvas.width / view.size;
	    var height = canvas.height / view.size;
	    var sx = e.clientX;
	    var sy = e.clientY;
	    var dx = view.x + sx / width;
	    var dy = sy / height - view.y;
	    var od = options.onDrag;
	    var dragged = void 0,
	        custom = void 0;

	    var drag = function drag(e) {
	      if (dragged) {
	        if (custom) {
	          od.drag && od.drag(e);
	        } else {
	          view.x = Math.max(0, Math.min(1 - view.size, dx - e.clientX / width));
	          view.y = Math.max(0, Math.min(1 - view.size, e.clientY / height - dy));
	          checkChangeViewport();
	          _this2.draw();
	        }
	      } else {
	        var mx = e.clientX - sx;
	        var my = e.clientY - sy;

	        if (mx * mx + my * my > 8) {
	          dragged = true;
	          custom = od && od.start({ clientX: sx, clientY: sy });
	          custom && od.drag && od.drag(e);
	        }
	      }
	      e.preventDefault();
	    };

	    var up = function up(e) {
	      custom && od.stop && od.stop(e);
	      !dragged && options.onClick && options.onClick(e);

	      window.removeEventListener('mouseup', up);
	      window.removeEventListener('mousemove', drag);
	    };
	    window.addEventListener('mouseup', up);
	    window.addEventListener('mousemove', drag);
	  }

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

	    ccNetViz_utils.extend(view, v);

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

	  gl = getContext();

	  gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
	  gl.blendEquation(gl.FUNC_ADD);
	  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
	  gl.enable(gl.BLEND);

	  view = { size: 1, x: 0, y: 0 };

	  this.resize();

	  var onLoad = options.onLoad || function () {
	    if (removed) return;
	    _this.draw();
	  };
	  var textures = new ccNetViz_textures(onLoad);
	  layers.main = new ccNetViz_layer(canvas, context, view, gl, textures, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw);
	};

	ccNetViz.color = ccNetViz_color;
	ccNetViz.spatialSearch = ccNetViz_spatialSearch;
	ccNetViz.layout = ccNetViz_layout;
	ccNetViz.color = ccNetViz_color;

	window.ccNetViz = ccNetViz;
	module.exports = ccNetViz;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ccNetViz_color = __webpack_require__(3);
	var ccNetViz_gl = __webpack_require__(4);
	var ccNetViz_primitive = __webpack_require__(5);
	var ccNetViz_layout = __webpack_require__(7);
	var ccNetViz_geomutils = __webpack_require__(11);
	var ccNetViz_texts = __webpack_require__(12);
	var ccNetViz_spatialSearch = __webpack_require__(13);

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: 
	 * 	David Tichy
	 * 	Aleš Saska - http://alessaska.cz/
	 */

	module.exports = function (canvas, context, view, gl, textures, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw) {
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
	                ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
	                ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
	                if (v.color) {
	                    var c = e.color;
	                    ccNetViz_primitive.colors(v.color, iV, c, c, c, c);
	                }
	                ccNetViz_primitive.quad(v.indices, iV, iI);
	            } };
	    };
	    var labelsFiller = function labelsFiller(style) {
	        texts.setFont(style.font);
	        style.texture = texts.texture;
	        return {
	            set: function set(v, e, iV, iI) {
	                var x = e.x;
	                var y = e.y;
	                ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
	                var t = texts.get(e.label);
	                var dx = x <= 0.5 ? 0 : -t.width;
	                var dy = y <= 0.5 ? 0 : -t.height;
	                ccNetViz_primitive.vertices(v.relative, iV, dx, dy, t.width + dx, dy, t.width + dx, t.height + dy, dx, t.height + dy);
	                ccNetViz_primitive.vertices(v.textureCoord, iV, t.left, t.bottom, t.right, t.bottom, t.right, t.top, t.left, t.top);
	                ccNetViz_primitive.quad(v.indices, iV, iI);
	            } };
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
	        ccNetViz_geomutils.getCurveShift(t.e, ct1);
	        ctx = ct1.x;
	        cty = ct1.y;
	        citx = ct1.cx;
	        city = ct1.cy;

	        ccNetViz_geomutils.getCurveShift(s.e, ct2);
	        csx = ct2.x;
	        csy = ct2.y;
	        cisx = ct2.cx;
	        cisy = ct2.cy;

	        v.curveShift && ccNetViz_primitive.vertices(v.curveShift, iV, -csy, csx, -csy, csx, -cty, ctx, -cty, ctx);
	        v.circleShift && ccNetViz_primitive.vertices(v.circleShift, iV, -cisy, cisx, -cisy, cisx, -city, citx, -city, citx);
	    };

	    var edgesFiller = {
	        'lines': function lines(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var s = ccNetViz_geomutils.edgeSource(e);
	                    var t = ccNetViz_geomutils.edgeTarget(e);
	                    var dx = s.x - t.x;
	                    var dy = s.y - t.y;
	                    var d = normalize(s, t);

	                    setVerticeCurveShift(v, iV, s, t);

	                    ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, t.x, t.y, t.x, t.y);
	                    ccNetViz_primitive.vertices(v.lengthSoFar, iV, 0, 0, 0, 0, dx, dy, dx, dy);
	                    ccNetViz_primitive.vertices(v.normal, iV, -d.y, d.x, d.y, -d.x, d.y, -d.x, -d.y, d.x);
	                    ccNetViz_primitive.quad(v.indices, iV, iI);
	                } };
	        },
	        'curves': function curves(style) {
	            return {
	                numVertices: 3,
	                numIndices: 3,
	                set: function set(v, e, iV, iI) {
	                    var s = ccNetViz_geomutils.edgeSource(e);
	                    var t = ccNetViz_geomutils.edgeTarget(e);
	                    var dx = s.x - t.x;
	                    var dy = s.y - t.y;
	                    var d = normalize(s, t);

	                    setVerticeCurveShift(v, iV, s, t);

	                    ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, 0.5 * (t.x + s.x), 0.5 * (t.y + s.y), t.x, t.y);
	                    ccNetViz_primitive.vertices(v.lengthSoFar, iV, 0, 0, dx / 2, dy / 2, dx, dy);
	                    ccNetViz_primitive.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
	                    ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0.0, 0, 0);
	                    ccNetViz_primitive.indices(v.indices, iV, iI, 0, 1, 2);
	                }
	            };
	        },
	        'circles': function circles(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var s = ccNetViz_geomutils.edgeSource(e);
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

	                    ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, s.x, s.y, s.x, s.y);
	                    ccNetViz_primitive.vertices(v.lengthSoFar, iV, xdiff1, ydiff1, xdiff2, ydiff2, xdiff3, ydiff3, xdiff4, ydiff4);
	                    ccNetViz_primitive.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
	                    ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
	                    ccNetViz_primitive.quad(v.indices, iV, iI);
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
	        v.curveShift && ccNetViz_primitive.vertices(v.curveShift, iV, -cty, ctx, -cty, ctx, -cty, ctx, -cty, ctx);
	        v.circleShift && ccNetViz_primitive.vertices(v.circleShift, iV, -city, citx, -city, citx, -city, citx, -city, citx);

	        ccNetViz_primitive.singles(v.offsetMul, iV, offsetMul, offsetMul, offsetMul, offsetMul);
	        ccNetViz_primitive.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
	        ccNetViz_primitive.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
	        ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
	        ccNetViz_primitive.quad(v.indices, iV, iI);
	    };

	    var arrowFiller = {
	        lineArrows: function lineArrows(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var s = ccNetViz_geomutils.edgeSource(e);
	                    var t = ccNetViz_geomutils.edgeTarget(e);
	                    var d = normalize(s, t);
	                    _set(v, e, s, t, iV, iI, d.x, d.y);
	                } };
	        },
	        curveArrows: function curveArrows(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var s = ccNetViz_geomutils.edgeSource(e);
	                    var t = ccNetViz_geomutils.edgeTarget(e);
	                    return _set(v, e, s, t, iV, iI, 0.5 * (t.x - s.x), 0.5 * (t.y - s.y));
	                }
	            };
	        },
	        circleArrows: function circleArrows(style) {
	            return {
	                set: function set(v, e, iV, iI) {
	                    var t = ccNetViz_geomutils.edgeTarget(e);
	                    var s = t;
	                    return _set(v, e, s, t, iV, iI, t.x < 0.5 ? dx : -dx, t.y < 0.5 ? -dy : dy);
	                }
	            };
	        }
	    };

	    this.getCurrentSpatialSearch = function (context) {
	        if (spatialSearch === undefined) {
	            spatialSearch = new ccNetViz_spatialSearch(context, [], [], [], [], normalize);
	        }
	        return spatialSearch;
	    };

	    var edgeTypes = void 0;
	    var edgePoses = void 0;

	    var spatialSearch = undefined;

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

	        this.getCurrentSpatialSearch = function (context) {
	            if (spatialSearch === undefined) {
	                spatialSearch = new ccNetViz_spatialSearch(context, nodes, lines, curves, circles, normalize);
	            }
	            return spatialSearch;
	        };

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

	        layout && new ccNetViz_layout[layout](nodes, edges).apply() && ccNetViz_layout.normalize(nodes);

	        scene.nodes.set(gl, options.styles, textures, nodes.length && !nodes[0].color ? nodes : [], nodesFiller);
	        scene.nodesColored.set(gl, options.styles, textures, nodes.length && nodes[0].color ? nodes : [], nodesFiller);

	        if (nodeStyle.label) {
	            texts.clear();
	            scene.labels.set(gl, options.styles, textures, nodes, labelsFiller);
	            texts.bind();
	        }

	        scene.lines.set(gl, options.styles, textures, lines, edgesFiller.lines);

	        if (extensions.OES_standard_derivatives) {
	            scene.curves.set(gl, options.styles, textures, curves, edgesFiller.curves);
	            scene.circles.set(gl, options.styles, textures, circles, edgesFiller.circles);
	        }

	        if (edgeStyle.arrow) {
	            scene.lineArrows.set(gl, options.styles, textures, lines, arrowFiller.lineArrows);

	            if (extensions.OES_standard_derivatives) {
	                scene.curveArrows.set(gl, options.styles, textures, curves, arrowFiller.curveArrows);

	                scene.circleArrows.set(gl, options.styles, textures, circles, arrowFiller.circleArrows);
	            }
	        }
	    };

	    this.update = function (element, attribute, data) {
	        scene[element].update(gl, attribute, data, function (style) {
	            return {
	                set: function set(v, e, iV) {
	                    return ccNetViz_primitive.colors(v, iV, e, e, e, e);
	                }
	            };
	        });
	    };

	    this.find = function (x, y, dist, nodes, edges) {
	        return _this.getCurrentSpatialSearch(context).find(context, x, y, dist, view.size, nodes, edges);
	    };

	    this.findArea = function (x1, y1, x2, y2, nodes, edges) {
	        return _this.getCurrentSpatialSearch(context).findArea(context, x1, y1, x2, y2, view.size, nodes, edges);
	    };

	    this.updateNode = function (n, i) {
	        _this.nodes[i] = n;

	        (_this.nodes[0].color ? scene.nodesColored : scene.nodes).updateEl(gl, n, i, nodesFiller);
	        scene.labels.updateEl(gl, n, i, labelsFiller);

	        if (spatialSearch) spatialSearch.update(context, 'nodes', i, n);
	    };

	    this.updateEdge = function (e, i) {
	        var t = edgeTypes[i];
	        var pos = edgePoses[i];

	        t.d[pos] = _this.edges[i] = e;
	        scene[t.k].updateEl(gl, e, pos, edgesFiller[t.k]);
	        if (edgeStyle.arrow) scene[t.kArrow].updateEl(gl, e, pos, arrowFiller[t.kArrow]);

	        if (spatialSearch) spatialSearch.update(context, t.k, pos, e);
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
	        var s = Math.max(c.width, c.height) / 250;
	        return s * s;
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

	    var extensions = ccNetViz_gl.initExtensions(gl, "OES_standard_derivatives");
	    var texts = new ccNetViz_texts(gl);
	    var scene = this.scene = createScene.call(this);

	    var fsColorTexture = ["precision mediump float;", "uniform vec4 color;", "uniform sampler2D texture;", "varying vec2 tc;", "void main(void) {", "   gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));", "}"];

	    var fsVarColorTexture = ["precision mediump float;", "uniform sampler2D texture;", "varying vec2 tc;", "varying vec4 c;", "void main(void) {", "   gl_FragColor = c * texture2D(texture, vec2(tc.s, tc.t));", "}"];

	    var fsCurve = ["#extension GL_OES_standard_derivatives : enable", "#ifdef GL_ES", "precision highp float;", "#endif", "uniform float width;", "uniform vec4 color;", "uniform float type;", "uniform float lineStepSize;", "varying vec2 c;", "varying vec2 v_lengthSoFar;", "void main(void) {", "   float part = abs(fract(length(v_lengthSoFar)*lineStepSize));", "   if(type >= 2.5){", //3.0 dotted
	    "      part = fract(part*5.0);", "      if(part < 0.5) discard;", "   }else if(type >= 1.5){", //2.0 - chain dotted
	    "      if(part < 0.15) discard;", "      if(part > 0.25 && part < 0.40) discard;", "   }else if(type >= 0.5){", //1.0 - dashed
	    "      if(part < 0.2) discard;", "   }", "   vec2 px = dFdx(c);", "   vec2 py = dFdy(c);", "   float fx = 2.0 * c.x * px.x - px.y;", "   float fy = 2.0 * c.y * py.x - py.y;", "   float sd = (c.x * c.x - c.y) / sqrt(fx * fx + fy * fy);", "   float alpha = 1.0 - abs(sd) / width;", "   if (alpha < 0.0) discard;", "   gl_FragColor = vec4(color.r, color.g, color.b, min(alpha, 1.0));", "}"];

	    var getShiftFuncs = ["attribute vec2 curveShift;", "vec4 getShiftCurve(void) {", "   vec2 shiftN = vec2(curveShift.x, aspect2 * curveShift.y);", "   float length = length(screen * shiftN);", "   return vec4(exc * (length == 0.0 ? vec2(0, 0) : shiftN * 0.5 / length), 0, 0);", "}", "attribute vec2 circleShift;", "vec4 getShiftCircle(void) {", "   return vec4(size*circleShift,0,0);", "}"];

	    scene.add("lines", new ccNetViz_primitive(gl, edgeStyle, null, ["precision mediump float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 lengthSoFar;", "uniform float exc;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform vec2 width;", "uniform mat4 transform;", "varying vec2 n;", "varying vec2 v_lengthSoFar;"].concat(getShiftFuncs).concat(["void main(void) {", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);", "   vec4 p = transform*vec4(lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x*aspect, p.y/aspect);", "   n = normal;", "}"]), ["precision mediump float;", "uniform float type;", "uniform vec4 color;", "varying vec2 n;", "varying vec2 v_lengthSoFar;", "uniform float lineSize;", "void main(void) {", "   float part = abs(fract(length(v_lengthSoFar)*lineSize*5.0));", "   if(type >= 2.5){", //3.0 dotted
	    "      part = fract(part*5.0);", "      if(part < 0.5) discard;", "   }else if(type >= 1.5){", //2.0 - chain dotted
	    "      if(part < 0.15) discard;", "      if(part > 0.25 && part < 0.40) discard;", "   }else if(type >= 0.5){", //1.0 - dashed
	    "      if(part < 0.2) discard;", "   }", "   gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));", "}"], function (c) {
	        c.shader.uniforms.exc && gl.uniform1f(c.shader.uniforms.exc, c.curveExc);
	        gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
	        var size = 2.5 * c.nodeSize;
	        c.shader.uniforms.size && gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	        gl.uniform1f(c.shader.uniforms.lineSize, getEdgeStyleSize(c));
	        gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
	        gl.uniform1f(c.shader.uniforms.aspect, c.aspect);
	        gl.uniform2f(c.shader.uniforms.width, c.style.width / c.width, c.style.width / c.height);
	        gl.uniform1f(c.shader.uniforms.type, getEdgeType(c.style.type));
	        ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	    }));

	    if (extensions.OES_standard_derivatives) {
	        scene.add("curves", new ccNetViz_primitive(gl, edgeStyle, null, ["precision highp float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 curve;", "attribute vec2 lengthSoFar;", "uniform vec2 size;", "uniform float exc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform mat4 transform;", "varying vec2 v_lengthSoFar;", "varying vec2 c;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 n = vec2(normal.x, aspect2 * normal.y);", "   float length = length(screen * n);", "   n = length == 0.0 ? vec2(0, 0) : n / length;", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(exc * n, 0, 0) + transform * vec4(position, 0, 1);", "   c = curve;", "   vec4 p = transform*vec4(lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x*aspect, p.y);", "}"]), fsCurve, function (c) {
	            gl.uniform1f(c.shader.uniforms.width, c.style.width);
	            gl.uniform1f(c.shader.uniforms.exc, c.curveExc);
	            gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
	            var size = 2.5 * c.nodeSize;
	            c.shader.uniforms.size && gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	            gl.uniform1f(c.shader.uniforms.lineSize, getEdgeStyleSize(c));
	            gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
	            gl.uniform1f(c.shader.uniforms.aspect, c.aspect);
	            gl.uniform1f(c.shader.uniforms.type, getEdgeType(c.style.type));
	            c.shader.uniforms.lineStepSize && gl.uniform1f(c.shader.uniforms.lineStepSize, 5);
	            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	        }));
	        scene.add("circles", new ccNetViz_primitive(gl, edgeStyle, null, ["precision highp float;", "attribute vec2 position;", "attribute vec2 normal;", "attribute vec2 curve;", "attribute vec2 lengthSoFar;", "uniform float exc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform float aspect;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 c;", "varying vec2 v_lengthSoFar;"].concat(getShiftFuncs).concat(["void main(void) {", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(size * normal, 0, 0) + transform * vec4(position, 0, 1);", "   c = curve;", "   vec4 p = transform*vec4(size * lengthSoFar,0,0);", "   v_lengthSoFar = vec2(p.x*aspect, p.y);", "}"]), fsCurve, function (c) {
	            c.shader.uniforms.exc && gl.uniform1f(c.shader.uniforms.exc, c.curveExc);
	            gl.uniform1f(c.shader.uniforms.width, c.style.width);
	            gl.uniform1f(c.shader.uniforms.type, getEdgeType(c.style.type));
	            gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
	            var size = 2.5 * c.nodeSize;
	            c.shader.uniforms.size && gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	            gl.uniform1f(c.shader.uniforms.lineSize, getEdgeStyleSize(c));
	            gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
	            gl.uniform1f(c.shader.uniforms.aspect, c.aspect);
	            c.shader.uniforms.lineStepSize && gl.uniform1f(c.shader.uniforms.lineStepSize, 5 / 3);
	            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	        }));
	    }

	    if (edgeStyle.arrow) {
	        var shaderparams = { attribute: { offsetMul: 1 } };

	        var bind = function bind(c) {
	            var size = getSize(c, getEdgesCnt(), 0.2);
	            if (!size) return true;

	            gl.uniform1f(c.shader.uniforms.offset, 0.5 * c.nodeSize);
	            gl.uniform2f(c.shader.uniforms.arrowsize, size, c.style.aspect * size);
	            gl.uniform1f(c.shader.uniforms.exc, c.curveExc);
	            c.shader.uniforms.cexc && gl.uniform1f(c.shader.uniforms.cexc, 0.5 * view.size * c.curveExc);
	            if (c.shader.uniforms.size) {
	                size = 2.5 * c.nodeSize;
	                c.shader.uniforms.size && gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	            }
	            gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
	            gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
	            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	        };

	        scene.add("lineArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float exc;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = direction / length(screen * direction);", "   vec2 v = vec2(u.y, -aspect2 * u.x);", "   v = v / length(screen * v);", "   gl_Position = getShiftCurve() + getShiftCircle()  + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));

	        if (extensions.OES_standard_derivatives) {
	            scene.add("curveArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform float exc;", "uniform float cexc;", "uniform vec2 screen;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = normalize(vec2(direction.y, -aspect2 * direction.x));", "   u = normalize(direction - cexc * u / length(screen * u));", "   u = u / length(screen * u);", "   vec2 v = vec2(u.y, -aspect2 * u.x);", "   v = v / length(screen * v);", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4(arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));
	            scene.add("circleArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", ["attribute vec2 position;", "attribute vec2 direction;", "attribute vec2 textureCoord;", "attribute float offsetMul;", "uniform float offset;", "uniform vec2 arrowsize;", "uniform vec2 size;", "uniform vec2 screen;", "uniform float exc;", "uniform float aspect2;", "uniform mat4 transform;", "varying vec2 tc;"].concat(getShiftFuncs).concat(["void main(void) {", "   vec2 u = direction;", "   vec2 v = vec2(direction.y, -direction.x);", "   gl_Position = getShiftCurve() + getShiftCircle() + vec4((arrowsize.x * (0.5 - textureCoord.x) * v - arrowsize.y * textureCoord.y * u - offset * offsetMul * u) / screen, 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"]), fsColorTexture, bind, shaderparams));
	        }
	    }

	    scene.add("nodes", new ccNetViz_primitive(gl, nodeStyle, null, ["attribute vec2 position;", "attribute vec2 textureCoord;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 tc;", "void main(void) {", "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"], fsColorTexture, function (c) {
	        var size = getNodeSize(c);
	        gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	        ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	    }));
	    scene.add("nodesColored", new ccNetViz_primitive(gl, nodeStyle, null, ["attribute vec2 position;", "attribute vec2 textureCoord;", "attribute vec4 color;", "uniform vec2 size;", "uniform mat4 transform;", "varying vec2 tc;", "varying vec4 c;", "void main(void) {", "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "   c = color;", "}"], fsVarColorTexture, function (c) {
	        var size = getNodeSize(c);
	        gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	    }));
	    nodeStyle.label && scene.add("labels", new ccNetViz_primitive(gl, nodeStyle, "label", ["attribute vec2 position;", "attribute vec2 relative;", "attribute vec2 textureCoord;", "uniform float offset;", "uniform vec2 scale;", "uniform mat4 transform;", "varying vec2 tc;", "void main(void) {", "   gl_Position = vec4(scale * (relative + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);", "   tc = textureCoord;", "}"], fsColorTexture, function (c) {
	        if (!getNodeSize(c)) return true;
	        gl.uniform1f(c.shader.uniforms.offset, 0.5 * c.nodeSize);
	        gl.uniform2f(c.shader.uniforms.scale, 1 / c.width, 1 / c.height);
	        ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	    }));

	    if (options.onLoad) {
	        var styles = options.styles;
	        for (var p in styles) {
	            var s = styles[p];
	            s.texture && textures.get(gl, s.texture);
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

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

	    if (arguments.length >= 3) {
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

	;

	module.exports = Color;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var Gl = function () {
	    function Gl() {
	        _classCallCheck(this, Gl);
	    }

	    _createClass(Gl, null, [{
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
	        value: function createTexture(gl, img, onLoad) {
	            var result = gl.createTexture();

	            function load() {
	                image.onload = null;
	                gl.bindTexture(gl.TEXTURE_2D, result);
	                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	                gl.bindTexture(gl.TEXTURE_2D, null);
	                onLoad && onLoad();
	            }

	            var image = new Image();
	            image.onload = load;
	            image.src = img;
	            image.naturalWidth && image.naturalHeight && load();
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

	    return Gl;
	}();

	;

	module.exports = Gl;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ccNetViz_shader = __webpack_require__(6);
	var ccNetViz_color = __webpack_require__(3);

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var primitive = function () {
	    function primitive(gl, baseStyle, styleProperty, vs, fs, bind, shaderParams) {
	        _classCallCheck(this, primitive);

	        var shader = new ccNetViz_shader(gl, vs.join('\n'), fs.join('\n'), shaderParams);
	        var buffers = [];
	        var sections = [];

	        var sectionsByStyle = {};

	        var e = {};
	        var iV = void 0,
	            iI = void 0,
	            iS = 0,
	            iB = 0;

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

	        this.set = function (gl, styles, textures, data, get) {
	            var parts = {};

	            var pN = {};
	            for (var i = 0; i < data.length; i++) {
	                var el = data[i];
	                var part = parts[el.style] = parts[el.style] || [];

	                el.sI = pN[el.style] = pN[el.style] === undefined ? 0 : pN[el.style] + 1;

	                part.push(el);
	            }

	            iS = 0;
	            iB = 0;

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

	            var createStyle = function createStyle(style) {
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
	                result.color = result.color && new ccNetViz_color(result.color);
	                return result;
	            };

	            sections = [];
	            for (var p in parts) {
	                var add = function add() {
	                    sections.push(this);
	                    sectionsByStyle[this.styleName] = this;
	                };

	                iS = iB;

	                var section = {
	                    style: createStyle(styles[p]),
	                    buffers: [],
	                    styleName: p
	                };

	                var _filler = get(section.style);
	                _filler.numVertices = _filler.numVertices || 4;
	                _filler.numIndices = _filler.numIndices || 6;

	                var _part = parts[p];
	                init(_filler, _part.length);
	                var max = primitive.maxBufferSize - _filler.numVertices;
	                for (var _i = 0; _i < _part.length; _i++, iV += _filler.numVertices, iI += _filler.numIndices) {
	                    if (iV > max) {
	                        store(section);
	                        init(_filler, _part.length);
	                    }
	                    _filler.set(e, _part[_i], iV, iI);
	                }
	                store(section);

	                var addSection = add.bind(section);

	                typeof section.style.texture === 'string' ? section.style.texture = textures.get(gl, section.style.texture, addSection) : addSection();
	            }
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
	                    for (var _iV = 0; _iV < e.numVertices; _iV += filler.numVertices) {
	                        filler.set(fb, data[i++], _iV);
	                    }gl.bindBuffer(gl.ARRAY_BUFFER, e[attribute]);
	                    gl.bufferData(gl.ARRAY_BUFFER, fb, gl.DYNAMIC_DRAW);
	                });
	            });
	        };

	        this.updateEl = function (gl, el, pos, get) {
	            var storeToPos = function storeToPos(b, i) {
	                for (var a in shader.attributes) {
	                    gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
	                    gl.bufferSubData(gl.ARRAY_BUFFER, shader.attributes[a].size * filler.numVertices * e[a].BYTES_PER_ELEMENT * i, e[a]);
	                }
	                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
	                gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, i * filler.numIndices * e.indices.BYTES_PER_ELEMENT, e.indices);
	            };

	            var section = sectionsByStyle[el.style];

	            var filler = get(section.style);
	            filler.numVertices = filler.numVertices || 4;
	            filler.numIndices = filler.numIndices || 6;

	            var index = el.sI;

	            var elsPerBuff = Math.floor(primitive.maxBufferSize / filler.numVertices);

	            var buffer = section.buffers[Math.floor(pos / elsPerBuff)];

	            iB = iS = 0;
	            init(filler, 1);

	            filler.set(e, el, 0, 0);

	            storeToPos(buffer, pos);
	        };

	        this.draw = function (context) {
	            context.shader = shader;
	            shader.bind();

	            gl.uniformMatrix4fv(shader.uniforms.transform, false, context.transform);

	            sections.forEach(function (section) {
	                if (section.style.texture) {
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

	module.exports = primitive;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ccNetViz_gl = __webpack_require__(4);

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

	    gl.attachShader(program, ccNetViz_gl.createShader(gl, gl.VERTEX_SHADER, vs));
	    gl.attachShader(program, ccNetViz_gl.createShader(gl, gl.FRAGMENT_SHADER, fs));
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

	;

	module.exports = Shader;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var layoutForce = __webpack_require__(8);
	var layoutRandom = __webpack_require__(10);
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var Layout = function () {
	    function Layout() {
	        _classCallCheck(this, Layout);
	    }

	    _createClass(Layout, null, [{
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
	            return layoutForce;
	        }
	    }, {
	        key: 'random',
	        get: function get() {
	            return layoutRandom;
	        }
	    }]);

	    return Layout;
	}();

	module.exports = Layout;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ccNetViz_quadtree = __webpack_require__(9);

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	module.exports = function (nodes, edges) {
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
	            accumulate(q = ccNetViz_quadtree(nodes), alpha, charges);

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

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	module.exports = function (points) {
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

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var Random = function () {
	  function Random(nodes) {
	    _classCallCheck(this, Random);

	    this._nodes = nodes;
	  }

	  _createClass(Random, [{
	    key: "apply",
	    value: function apply() {
	      for (var i = 0, n = this._nodes.length; i < n; i++) {
	        var o = this._nodes[i];
	        o.x = Math.random();
	        o.y = Math.random();
	      }
	    }
	  }]);

	  return Random;
	}();

	;

	module.exports = Random;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska - http://alessaska.cz/
	 */

	var Geomutils = function () {
	  function Geomutils() {
	    _classCallCheck(this, Geomutils);
	  }

	  _createClass(Geomutils, null, [{
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

	  return Geomutils;
	}();

	;

	module.exports = Geomutils;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: David Tichy, Aleš Saska
	 */

	var Texts = function () {
	  function Texts(gl) {
	    _classCallCheck(this, Texts);

	    this._gl = gl;
	    this._size = 1024;

	    this._canvas = document.createElement("canvas");
	    this._canvas.width = this._canvas.height = this._size;
	    this._canvas.style.width = this._canvas.style.height = this._size + 'px';
	    this._canvas.style.display = "none";
	    document.body.appendChild(this._canvas);

	    this._context = this._canvas.getContext('2d');
	    this._context.fillStyle = "white";
	    this._context.textAlign = "left";
	    this._context.textBaseline = "top";

	    this._rendered = this._texts = this._x = this._y = this._height = undefined;

	    this.texture = this._gl.createTexture();
	  }

	  _createClass(Texts, [{
	    key: "clear",
	    value: function clear() {
	      this._rendered = {};
	      this._context.clearRect(0, 0, this._size, this._size);
	      this._height = this._x = this._y = 0;
	    }
	  }, {
	    key: "setFont",
	    value: function setFont(font) {
	      this._rendered[font] = this._texts = this._rendered[font] || {};
	      this._context.font = font;
	      this._x = 0;
	      this._y += this._height;
	      this._height = +/(\d+)px/.exec(font)[1] + 1;
	    }
	  }, {
	    key: "get",
	    value: function get(text) {
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
	    key: "bind",
	    value: function bind() {
	      this._gl.bindTexture(this._gl.TEXTURE_2D, this.texture);
	      this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, false);
	      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
	      this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
	      this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._canvas);
	      this._gl.bindTexture(this._gl.TEXTURE_2D, null);
	    }
	  }]);

	  return Texts;
	}();

	;

	module.exports = Texts;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _rbush = __webpack_require__(14);

	var _rbush2 = _interopRequireDefault(_rbush);

	var _geomutils = __webpack_require__(11);

	var _geomutils2 = _interopRequireDefault(_geomutils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	  var t;

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

	  if (eq(len2, 0)) {
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

	    this.isNode = true;
	    this.e = n;
	  }

	  _createClass(Node, [{
	    key: 'getBBox',
	    value: function getBBox() {
	      return [this.e.x - EPS, this.e.y - EPS, this.e.x + EPS, this.e.y + EPS];
	    }
	  }, {
	    key: 'intersectsRect',
	    value: function intersectsRect(x1, y1, x2, y2) {
	      return pointInRect(this.e.x, this.e.y, x1, y1, x2, y2);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context) {
	      return distance2(x, y, this.e.x, this.e.y);
	    }
	  }]);

	  return Node;
	}();

	var Line = function () {
	  function Line(l) {
	    _classCallCheck(this, Line);

	    this.isEdge = true;
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

	      return lineIntersectsRect(p[0], p[1], p[2], p[3], x1, y1, x2, y2);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context, size) {
	      var p = this.getPoints(context, size);

	      return pDistance2(x, y, p[0], p[1], p[2], p[3]);
	    }
	  }]);

	  return Line;
	}();

	var Circle = function () {
	  function Circle(c) {
	    _classCallCheck(this, Circle);

	    this.isEdge = true;
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

	      return getBBFromPoints(v);
	    }
	  }, {
	    key: 'intersectsRect',
	    value: function intersectsRect(x1, y1, x2, y2, context, size, normalize) {
	      var v = this.getBezierPoints(context, size);
	      return bezierIntersectsRect(v[0], v[1], v[2], v[3], v[4], v[5], x1, y1, x2, y2) || bezierIntersectsRect(v[2], v[3], v[4], v[5], v[6], v[7], x1, y1, x2, y2);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context, size) {
	      var v = this.getBezierPoints(context, size);

	      //circle is just 2 bezier curves :)
	      var d1 = distance2ToBezier(x, y, v[0], v[1], v[2], v[3], v[4], v[5]);
	      var d2 = distance2ToBezier(x, y, v[2], v[3], v[4], v[5], v[6], v[7]);

	      return Math.min(d1, d2);
	    }
	  }]);

	  return Circle;
	}();

	var Curve = function () {
	  function Curve(c) {
	    _classCallCheck(this, Curve);

	    this.isEdge = true;
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
	      return bezierIntersectsRect(v[0], v[1], v[2], v[3], v[4], v[5], x1, y1, x2, y2);
	    }
	  }, {
	    key: 'getBBox',
	    value: function getBBox(context, size, normalize) {
	      var v = this.getBezierPoints(context, size, normalize);
	      return getBBFromPoints(v);
	    }
	  }, {
	    key: 'dist2',
	    value: function dist2(x, y, context, size, normalize) {
	      var v = this.getBezierPoints(context, size, normalize);
	      return distance2ToBezier(x, y, v[0], v[1], v[2], v[3], v[4], v[5]);
	    }
	  }]);

	  return Curve;
	}();

	function sortByDistances(e1, e2) {
	  return e1.dist2 - e2.dist2;
	}

	var tConst = { nodes: Node, lines: Line, circles: Circle, curves: Curve };

	module.exports = function () {
	  function spatialIndex(c, nodes, lines, curves, circles, normalize) {
	    _classCallCheck(this, spatialIndex);

	    //init all elements into rbush tree with size 1 (the biggest possible - the worst case)
	    var size = 1;

	    this.normalize = normalize;

	    //tree initialization
	    this.rbushtree = (0, _rbush2.default)();

	    this.types = { nodes: [], lines: [], circles: [], curves: [] };

	    var i = void 0,
	        j = void 0;
	    var d = [];

	    d.length = nodes.length;
	    for (i = 0; i < nodes.length; i++) {
	      var e = new Node(nodes[i]);
	      d[i] = e.getBBox(c, size);
	      this.types.nodes.push(e);
	      d[i].push(e);
	    }

	    d.length += lines.length;
	    for (j = 0; j < lines.length; i++, j++) {
	      var _e = new Line(lines[j]);
	      d[i] = _e.getBBox(c, size);
	      this.types.lines.push(_e);
	      d[i].push(_e);
	    }

	    d.length += circles.length;
	    for (j = 0; j < circles.length; i++, j++) {
	      var _e2 = new Circle(circles[j]);
	      d[i] = _e2.getBBox(c, size);
	      this.types.circles.push(_e2);
	      d[i].push(_e2);
	    }

	    d.length += curves.length;
	    for (j = 0; j < curves.length; i++, j++) {
	      var _e3 = new Curve(curves[j]);
	      d[i] = _e3.getBBox(c, size, normalize);
	      this.types.curves.push(_e3);
	      d[i].push(_e3);
	    }

	    this.rbushtree.load(d);
	  }

	  _createClass(spatialIndex, [{
	    key: 'findArea',
	    value: function findArea(context, x1, y1, x2, y2, size, nodes, edges) {
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

	      if (ret.nodes) {
	        ret.nodes.sort(sortByDistances);
	      }
	      if (ret.edges) {
	        ret.edges.sort(sortByDistances);
	      }

	      var x = (x1 + x2) / 2;
	      var y = (y1 + y2) / 2;

	      var data = this.rbushtree.search([x1 - EPS, y1 - EPS, x2 + EPS, y2 + EPS]);

	      for (var _i2 = 0; _i2 < data.length; _i2++) {
	        var e = data[_i2][4];

	        var dist2 = e.dist2(x, y, context, size, this.normalize);

	        if (!e.intersectsRect(x1, y1, x2, y2, context, size, this.normalize)) continue;

	        if (e.isNode && nodes) {
	          ret.nodes.push({ node: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
	        }
	        if (e.isEdge && edges) {
	          ret.edges.push({ edge: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
	        }
	      }

	      return ret;
	    }
	  }, {
	    key: 'find',
	    value: function find(context, x, y, radius, size, nodes, edges) {
	      var ret = {};
	      if (edges) ret.edges = [];
	      if (nodes) ret.nodes = [];

	      var xradius = radius;
	      var yradius = radius;

	      var radius2 = radius * radius;

	      var data = this.rbushtree.search([x - xradius, y - yradius, x + xradius, y + yradius]);

	      for (var _i3 = 0; _i3 < data.length; _i3++) {
	        var e = data[_i3][4];
	        var dist2 = e.dist2(x, y, context, size, this.normalize);
	        if (dist2 > radius2) continue;

	        if (e.isNode && nodes) {
	          ret.nodes.push({ node: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
	        }
	        if (e.isEdge && edges) {
	          ret.edges.push({ edge: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
	        }
	      }

	      if (ret.nodes) {
	        ret.nodes.sort(sortByDistances);
	      }
	      if (ret.edges) {
	        ret.edges.sort(sortByDistances);
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
	      var arr = e.getBBox(context, size, this.normalize);
	      arr.push(e);

	      this.rbushtree.insert(this.types[t][i] = arr);
	    }
	  }]);

	  return spatialIndex;
	}();

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

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

	module.exports = rbush;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

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
	        key: "debounce",
	        value: function debounce(func, wait, immediate) {
	            var _this = this,
	                _arguments = arguments;

	            var timeout, args, context, timestamp, result;

	            var later = function later() {
	                var last = Date.now - timestamp;

	                if (last < wait && last > 0) {
	                    timeout = setTimeout(later, wait - last);
	                } else {
	                    timeout = null;
	                    if (!immediate) {
	                        result = func.apply(context, args);
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
	                    result = func.apply(context, args);
	                    context = args = null;
	                }

	                return result;
	            };
	        }
	    }, {
	        key: "extend",
	        value: function extend(from) {
	            for (var i = 1; i < arguments.length; i++) {
	                for (var k in arguments[i]) {
	                    from[k] = arguments[i][k];
	                }
	            }
	            return from;
	        }
	    }]);

	    return Utils;
	}();

	;

	module.exports = Utils;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ccNetViz_utils = __webpack_require__(15);
	var ccNetViz_gl = __webpack_require__(4);

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Authors: David Tichy, Aleš Saska
	 */

	var Textures = function () {
	    function Textures(onLoad) {
	        _classCallCheck(this, Textures);

	        this._load = ccNetViz_utils.debounce(onLoad, 5);
	        this._textures = {};
	        this._pending = {};
	        this._n = 0;
	    }

	    _createClass(Textures, [{
	        key: 'get',
	        value: function get(gl, img, action) {
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
	                this._textures[img] = t = ccNetViz_gl.createTexture(gl, img, function () {
	                    p.forEach(function (a) {
	                        return a && a();
	                    });
	                    delete _this._pending[img];
	                    --_this._n || _this._load();
	                });
	            }
	            return t;
	        }
	    }]);

	    return Textures;
	}();

	module.exports = Textures;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var geomutils = __webpack_require__(11);
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

	var interactivityBatch = function () {
	  function interactivityBatch(layers, insertTempLayer, draw, nodes, edges, checkUniqId) {
	    var _this = this;

	    _classCallCheck(this, interactivityBatch);

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
	      var s = geomutils.edgeSource(e);
	      var t = geomutils.edgeTarget(e);

	      _this._eDirs[s.uniqid][t.uniqid] = e;
	      _this._ePos[e.uniqid] = i;
	    });

	    this._actualTempNodes = [];
	    this._actualTempEdges = [];
	  }

	  _createClass(interactivityBatch, [{
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

	        var s = geomutils.edgeSource(e);
	        var t = geomutils.edgeTarget(e);

	        delete (_this3._eDirs[s.uniqid] || {})[t.uniqid];

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
	      var s = geomutils.edgeSource(e);
	      var t = geomutils.edgeTarget(e);

	      var tid = t.uniqid;
	      var sid = s.uniqid;

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

	  return interactivityBatch;
	}();

	;

	module.exports = interactivityBatch;

/***/ }
/******/ ]);
if(typeof module !== "undefined")
module.exports = ccNetViz;