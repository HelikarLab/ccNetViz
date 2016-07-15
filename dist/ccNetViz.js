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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	//        './ccNetVizMultiLevel',
	        __webpack_require__(1),
	        __webpack_require__(3),
	        __webpack_require__(2),
	        __webpack_require__(11),
	        __webpack_require__(15),
	        __webpack_require__(13)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	//        ccNetVizMultiLevel,
	        ccNetViz_layer,
		ccNetViz_gl,
		ccNetViz_color,
	        ccNetViz_utils,
	        ccNetViz_interactivityBatch,
		ccNetViz_spatialSearch
	    ){
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska
	 */


	var ccNetViz = function(canvas, options){

	  var backgroundStyle = options.styles.background = options.styles.background || {};
	  var backgroundColor = new ccNetViz_color(backgroundStyle.color || "rgb(255, 255, 255)");
	  
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
	  
	  var stylesTransl = {
	    'line': 0,
	    'dashed'  : 1,
	    'chain-dotted': 2,
	    'dotted': 3
	  }
	  if(stylesTransl[edgeStyle.type] !== undefined){
	    edgeStyle.type = stylesTransl[edgeStyle.type];
	  }
	  
	  if(edgeStyle.type === undefined || typeof edgeStyle.type !== 'number'){
	    edgeStyle.type = 0;
	  }


	  if (edgeStyle.arrow) {
	      var s = edgeStyle.arrow;
	      s.minSize = s.minSize != null ? s.minSize : 6;
	      s.maxSize = s.maxSize || 12;
	      s.aspect = 1;
	  }
	  


	  
	  function getContext(){
	      var attributes = { depth: false, antialias: false };
	      return canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
	  }
	  
	  var layerScreen,layerScreenTemp,vizLayout,view,gl,drawFunc;

	  var getNodesCnt = (() => {
	    return layerScreenTemp.cntShownNodes() + layerScreen.cntShownNodes();
	  });
	  var getEdgesCnt = (() => {
	    return layerScreenTemp.cntShownEdges() + layerScreen.cntShownEdges();
	  });

	  var self = this;
	  var onRedraw = ccNetViz_utils.debounce(() => {
	    self.draw.call(self);
	    return false;
	  }, 5);
	  
	  
	    
	  var nodes;
	  var edges;

	  var batch = undefined;
	  function getBatch(){
	    if(!batch)
	      batch = new ccNetViz_interactivityBatch(layerScreen, layerScreenTemp, drawFunc, nodes, edges);
	    return batch;
	  };  
	  
	  this.set = (n, e, layout) => {
	    nodes = n;
	    edges = e;
	    
	    layerScreenTemp.set([], [], layout);
	    layerScreen.set(nodes, edges, layout);
	    
	    //reset batch
	    batch = undefined;
	  };
	  
	  //make all dynamic changes static
	  this.reflow = () => {
	    //nodes and edges in dynamic chart are actual
	    var n = layerScreen.getVisibleNodes().concat(layerScreenTemp.getVisibleNodes());
	    var e = layerScreen.getVisibleEdges().concat(layerScreenTemp.getVisibleEdges());
	    
	    this.set(n,e);
	    this.draw();
	  };
	  
	  this.removeNode = (n) => { getBatch().removeNode(n); return this; };  
	  this.removeEdge = (e) => { getBatch().removeEdge(e); return this; };  
	  this.addEdge = (e) => { getBatch().addEdge(e); return this;}
	  this.addNode = (n) => { getBatch().addNode(n); return this;}
	  this.applyChanges = () => { getBatch().applyChanges(); return this; };

	  this.addEdges = (edges) => {
	    edges.forEach((e) => {
	      this.addEdge(e);
	    });
	    
	    return this;
	  };

	  this.addNodes = (nodes) => {
	    nodes.forEach((n) => {
	      this.addNode(n);
	    });

	    return this;
	  };

	  this.removeEdges = (nodes) => {
	    nodes.forEach((n) => {
	      this.removeNode(n);
	    });
	    return this;
	  };
	  
	  this.removeNodes = (nodes) => {
	    nodes.forEach((n) => {
	      this.removeNode(n);
	    });
	    return this;
	  };
	  
	  var getSize = (c, n, sc) => {
	      var result = sc * Math.sqrt(c.width * c.height / n) / view.size;
	      var s = c.style;
	      if (s) {
		  result = s.maxSize ? Math.min(s.maxSize, result) : result;
		  result = result < s.hideSize ? 0 : (s.minSize ? Math.max(s.minSize, result) : result);
	      }
	      return result;
	  };

	  var getNodeSize = c => getSize(c, getNodesCnt(), 0.4);
	  
	  
	  var offset = 0.5 * nodeStyle.maxSize;

	  this.draw = () => {
	        var width = canvas.width;
	        var height = canvas.height;
	        var aspect = width / height;
	        var o = view.size === 1 ? offset : 0;
	        var ox = o / width;
	        var oy = o / height;

	        context.transform = ccNetViz_gl.ortho(view.x - ox, view.x + view.size + ox, view.y - oy, view.y + view.size + oy, -1, 1);
	        context.offsetX   = ox;
	        context.offsetY   = oy;
	        context.width     = 0.5 * width;
	        context.height    = 0.5 * height;
	        context.aspect2   = aspect * aspect;
	        context.count     = getNodesCnt();

	        context.curveExc = getSize(context, getEdgesCnt(), 0.5);
	        context.style = nodeStyle;
	        context.nodeSize = getNodeSize(context);

	        gl.viewport(0, 0, width, height);

		gl.clear(gl.COLOR_BUFFER_BIT);

		for(var key in layerScreen.scene.elements){
		  layerScreen.scene.elements[key].draw(context);
		  layerScreenTemp.scene.elements[key].draw(context);
		}
	  };
	  drawFunc = this.draw.bind(this);
	  
	  this.find = function(){
	    function mergeArrays(a, b, cmp){
	      var r = [];
	      r.length = a.length + b.length;

	      var i = 0,j=0,k=0;
	      
	      while (i < a.length && j < b.length)
	      {
	        if (cmp(a[i],b[j]) < 0)       
	          r[k++] = a[i++];
	        else        
	          r[k++] = b[j++];               
	      }

	      while (i < a.length)
	        r[k++] = a[i++];


	      while (j < b.length)
	        r[k++] = b[j++];
	      
	      return r;
	    }
	    
	    var f1 = layerScreen.find.apply(layerScreen, arguments);
	    var f2 = layerScreenTemp.find.apply(layerScreenTemp, arguments);
	    
	    var r = {};
	    for(var key in f1){
	      r[key] = mergeArrays(f1[key], f2[key], (e1, e2) => {
				      return e1.dist2 - e2.dist2;
				    });
	    }
	    
	    return r;
	  };
	  
	  canvas.addEventListener("mousedown", onMouseDown.bind(this));
	  canvas.addEventListener("wheel", onWheel.bind(this));

	  function onMouseDown(e) {
	      var width = canvas.width / view.size;
	      var height = canvas.height / view.size;
	      var dx = view.x + e.clientX / width;
	      var dy = e.clientY / height - view.y;

	      var drag = e => {
		  view.x = Math.max(0, Math.min(1 - view.size, dx - e.clientX / width));
		  view.y = Math.max(0, Math.min(1 - view.size, e.clientY / height - dy));
		  this.draw();
		  e.preventDefault();
	      };

	      var up = () => {
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

	      view.size = size;
	      view.x = Math.max(0, Math.min(1 - size, view.x - delta * (e.clientX - rect.left) / canvas.width));
	      view.y = Math.max(0, Math.min(1 - size, view.y - delta * (1 - (e.clientY - rect.top) / canvas.height)));

	      this.draw();
	      e.preventDefault();
	  }

	  this.image = function() {
	      return canvas.toDataURL();
	  }

	  
	  this.resize = function() {
	    canvas.width = canvas.offsetWidth;
	    canvas.height = canvas.offsetHeight;
	  }

	  this.resetView = function() {
	      view.size = 1;
	      view.x = view.y = 0;
	  }

	  gl = getContext();

	  gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
	  gl.blendEquation(gl.FUNC_ADD);
	  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
	  gl.enable(gl.BLEND);

	  view = {};
	  var context = {};

	  this.resetView();
	  this.resize();
	  
	  layerScreen = new ccNetViz_layer(canvas, context, view, gl, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw);
	  layerScreenTemp = new ccNetViz_layer(canvas, context, view, gl, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw);  
	};


	ccNetViz.spatialSearch = ccNetViz_spatialSearch;


	window.ccNetViz = module.exports = ccNetViz;


	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(2),
	        __webpack_require__(3),
	        __webpack_require__(4), 
	        __webpack_require__(6),
	        __webpack_require__(10), 
	        __webpack_require__(12),
	        __webpack_require__(13)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	        ccNetViz_color,
	        ccNetViz_gl,
	        ccNetViz_primitive,
	        ccNetViz_layout,
	        ccNetViz_textures,
	        ccNetViz_texts,
	        ccNetViz_spatialSearch
	    ){
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var layer = function(canvas, context, view, gl, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw) {
	    getNodesCnt = getNodesCnt || (()=>{return this.nodes.length;});
	    getEdgesCnt = getEdgesCnt || (()=>{return this.edges.length;});
	    this.redraw = onRedraw || (() => {});
	  
	    options = options || {};
	    options.styles = options.styles || {};

	    var nodesFiller = (
	      style => ({
	        set: (v, e, iV, iI) => {
	            var x = e.x;
	            var y = e.y;
	            ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
	            ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
	            if(v.color){
	              var c = e.color;
	              ccNetViz_primitive.colors(v.color, iV, c, c, c, c);
	            }
	            ccNetViz_primitive.quad(v.indices, iV, iI);
	        }})
	    );
	    var labelsFiller = (style => {
		texts.setFont(style.font);
		style.texture = texts.texture;
		return {
		    set: (v, e, iV, iI) => {
			var x = e.x;
			var y = e.y;
			ccNetViz_primitive.vertices(v.position, iV, x, y, x, y, x, y, x, y);
			var t = texts.get(e.label);
			var dx = x <= 0.5 ? 0 : -t.width;
			var dy = y <= 0.5 ? 0 : -t.height;
			ccNetViz_primitive.vertices(v.relative, iV, dx, dy, t.width + dx, dy, t.width + dx, t.height + dy, dx, t.height + dy);
			ccNetViz_primitive.vertices(v.textureCoord, iV, t.left, t.bottom, t.right, t.bottom, t.right, t.top, t.left, t.top);
			ccNetViz_primitive.quad(v.indices, iV, iI);
		    }}
		}	
	    );

	    var normalize = (a, b) => {
	        var x = b.x - a.x;
	        var y = b.y - a.y;
	        var sc = 1 / Math.sqrt(x*x + y*y);
	        return { x: sc * x, y: sc * y };
	    };
	    
	    var edgesFiller = {
	      'lines': (style => ({
	            set: (v, e, iV, iI) => {
	                var s = e.source;
	                var t = e.target;
	                var dx = s.x-t.x;
	                var dy = s.y-t.y;
	                var d = normalize(s, t);

	                ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, t.x, t.y, t.x, t.y);
	                ccNetViz_primitive.vertices(v.lengthSoFar, iV, 0, 0,0,0,dx, dy, dx, dy);
	                ccNetViz_primitive.vertices(v.normal, iV, -d.y, d.x, d.y, -d.x, d.y, -d.x, -d.y, d.x);
	                ccNetViz_primitive.quad(v.indices, iV, iI);
	            }})),
	       'curves': (style => ({
	                    numVertices: 3,
	                    numIndices: 3,
	                    set: (v, e, iV, iI) => {
	                        var s = e.source;
	                        var t = e.target;
	                        var dx = s.x-t.x;
	                        var dy = s.y-t.y;
	                        var d = normalize(s, t);

	                        ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, 0.5 * (t.x + s.x), 0.5 * (t.y + s.y), t.x, t.y);
	                        ccNetViz_primitive.vertices(v.lengthSoFar, iV, 0, 0,dx/2, dy/2, dx, dy);
	                        ccNetViz_primitive.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
	                        ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0.0, 0, 0);
	                        ccNetViz_primitive.indices(v.indices, iV, iI, 0, 1, 2);
	                    }
	                })),
	       'circles': (style => ({
	                    set: (v, e, iV, iI) => {
	                        var s = e.source;
	                        var d = s.y < 0.5 ? 1 : -1;

	                        var xdiff1 = 0;
	                        var ydiff1 = 0;
	                        var xdiff2 = 1;
	                        var ydiff2 = d;
	                        var xdiff3 = 2;
	                        var ydiff3 = 1.25*d;
	                        var xdiff4 = 3;
	                        var ydiff4 = 1.5*d;

	                        ccNetViz_primitive.vertices(v.position, iV, s.x, s.y, s.x, s.y, s.x, s.y, s.x, s.y);
	                        ccNetViz_primitive.vertices(v.lengthSoFar, iV, xdiff1, ydiff1, xdiff2, ydiff2, xdiff3, ydiff3, xdiff4, ydiff4);
	                        ccNetViz_primitive.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
	                        ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
	                        ccNetViz_primitive.quad(v.indices, iV, iI);
	                    }
	                }))
	    };

	    var set = (v, e, iV, iI, dx, dy) => {
	        var tx = e.target.x;
	        var ty = e.target.y;
	        ccNetViz_primitive.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
	        ccNetViz_primitive.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
	        ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
	        ccNetViz_primitive.quad(v.indices, iV, iI);
	    };
	            
	    var dx = Math.cos(0.9);
	    var dy = Math.sin(0.9);
	    var arrowFiller = {
	      lineArrows: (style => ({
	                set: (v, e, iV, iI) => {
	                    var d = normalize(e.source, e.target);
	                    set(v, e, iV, iI, d.x, d.y);
	                }})),
	       curveArrows: (style => ({
	                        set: (v, e, iV, iI) => set(v, e, iV, iI, 0.5 * (e.target.x - e.source.x), 0.5 * (e.target.y - e.source.y))
	                    })),
	       circleArrows: (style => ({
	                        set: (v, e, iV, iI) => set(v, e, iV, iI, e.target.x < 0.5 ? dx : -dx, e.target.y < 0.5 ? -dy : dy)
	                    }))
	    };

	    var edgeTypes;
	    var edgePoses;

	    var spatialSearch = undefined;

	    this.set = function(nodes, edges, layout) {
	        this.nodes = nodes = nodes || [];
	        this.edges = edges = edges ? [].concat(edges) : [];

	        spatialSearch = undefined;

	        var lines = [], curves = [], circles = [];

	        //tanslate indexes into node objects
	        for (var i = 0; i < edges.length; i++) {
	          var e = edges[i];
	          if(typeof e.source == 'number')
	            e.source = nodes[e.source];
	          var e = edges[i];
	          if(typeof e.target == 'number')
	            e.target = nodes[e.target];
	        }


	        this.getCurrentSpatialSearch = (context) => {
	          if(spatialSearch === undefined){
	            spatialSearch = new ccNetViz_spatialSearch(context, nodes, lines, curves, circles, view.size, normalize);
	          }
	          return spatialSearch;
	        }

	        var init = () => {
	            for (var i = 0; i < nodes.length; i++) {
	                nodes[i].index = i;
	            }

	            edgeTypes = [];
	            edgePoses = [];
	            var dummysd  = {k:  '_',      kArrow: '_', d: []};
	            var circlesd = {k: 'circles', kArrow: 'circleArrows', d: circles};
	            var linesd   = {k: 'lines',   kArrow: 'lineArrows',d: lines};
	            var curvesd  = {k: 'curves',  kArrow: 'curveArrows',d: curves};
	            
	            if (extensions.OES_standard_derivatives) {
	                var map = {};
	                for (var i = 0; i < edges.length; i++) {
	                    var e = edges[i];
	    
	                    var si = e.source.uniqid || e.source.index;
	                    var ti = e.target.uniqid || e.target.index;
	    
	                    (map[si] || (map[si] = {}))[ti] = true;
	                }

	                for (var i = 0; i < edges.length; i++) {
	                    var target, e = edges[i];

	                    var si = e.source.uniqid || e.source.index;
	                    var ti = e.target.uniqid || e.target.index;
	    
	                    var t = dummysd;
	                    if (si === ti) {
	                        target = circles;
	                        t = circlesd;
	                    }else {
	                        var m = map[ti];
	                        if(m && m[si]){
	                          target = curves;
	                          t = curvesd;
	                        }else{
	                          target = lines;
	                          t = linesd;
	                        }
	                    }
	                    edgeTypes.push(t);
	                    edgePoses.push(t.d.length);
	                    target.push(e);
	                }
	            } else {
	                for (var i = 0; i < edges.length; i++) {
	                    var e = edges[i];

	                    var si = e.source.uniqid || e.source.index;
	                    var ti = e.target.uniqid || e.target.index;

	                    var t = dummysd;
	                    if(si !== ti){
	                      t = linesd;
	                      lines.push(e);
	                    }
	                    edgeTypes.push(t);
	                    edgePoses.push(t.d.length);
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
	    }
	    
	    
	    this.find = (x,y,dist,nodes,edges) => {
	      var disth = dist / canvas.height;
	      var distw = dist / canvas.width;
	      dist = Math.max(disth, distw) * view.size;

	      x = (x/canvas.width)*(view.size+2*context.offsetX)-context.offsetX+view.x;
	      y = (1-y/canvas.height)*(view.size+2*context.offsetY)-context.offsetY+view.y;
	      
	      return this.getCurrentSpatialSearch(context).find(context, x,y,dist, view.size, nodes,edges);
	    }

	    this.updateNode = (n, i) => {
	      this.nodes[i] = n;

	      (this.nodes[0].color ? scene.nodesColored : scene.nodes).updateEl(gl, n, i, nodesFiller);
	      scene.labels.updateEl(gl, n, i, labelsFiller);
	      
	      if(spatialSearch)
	        spatialSearch.update('nodes', i, n);
	    };
	    
	    this.updateEdge = ((e, i) => {
	      var t = edgeTypes[i];
	      var pos = edgePoses[i];

	      t.d[pos] = this.edges[i] = e;
	      scene[t.k].updateEl(gl, e, pos, edgesFiller[t.k]);
	      if (edgeStyle.arrow)
		scene[t.kArrow].updateEl(gl, e, pos, arrowFiller[t.kArrow]);
	      
	      if(spatialSearch)
	        spatialSearch.update(t.k, pos, e);
	    });
	    
	    var removedNodes = 0;
	    var removedEdges = 0;
	    
	    var freenode = {x:-1,y:-1,title:""};
	    this.removeNodeAtPos = ((pos) => {
	      if(this.nodes[pos] === freenode){
	        return;
	      }

	      removedNodes++;
	      this.updateNode(freenode, pos);
	    });

	    var freeedge = {source:{x:-1,y:-1},target:{x:-1,y:-1}};
	    this.removeEdgeAtPos = ((pos) => {
	      if(this.edges[pos] === freeedge){
	        return;
	      }

	      removedEdges++;

	      this.updateEdge(freeedge, pos);
	    });
	    
	    this.getVisibleNodes = () => {
	      if(removedNodes <= 0)
		return this.nodes;

	      var r = [];
	      this.nodes.forEach((n) => {
		if(n !== freenode)
		  r.push(n);
	      });
	      return r;
	    }

	    this.getVisibleEdges = () => {
	      if(removedEdges <= 0)
		return this.edges;
	      
	      var r = [];
	      this.edges.forEach((n) => {
		if(n !== freeedge)
		  r.push(n);
	      });
	      return r;
	    }
	    
	    this.cntShownNodes = (() => {
	      return this.nodes.length - removedNodes;
	    });

	    this.cntShownEdges = (() => {
	      return this.edges.length - removedEdges;
	    });

	    
	    this.nodes = [];
	    this.edges = [];

	    var extensions = ccNetViz_gl.initExtensions(gl, "OES_standard_derivatives");
	    var textures = new ccNetViz_textures(options.onLoad || this.redraw);
	    var texts = new ccNetViz_texts(gl);
	    var scene = this.scene = createScene.call(this);

	    var fsColorTexture = [
	        "precision mediump float;",
	        "uniform vec4 color;",
	        "uniform sampler2D texture;",
	        "varying vec2 tc;",
	        "void main(void) {",
	        "   gl_FragColor = color * texture2D(texture, vec2(tc.s, tc.t));",
	        "}"
	    ];

	    var fsVarColorTexture = [
	        "precision mediump float;",
	        "uniform sampler2D texture;",
	        "varying vec2 tc;",
	        "varying vec4 c;",
	        "void main(void) {",
	        "   gl_FragColor = c * texture2D(texture, vec2(tc.s, tc.t));",
	        "}"
	    ];

	    var fsCurve = [
	        "#extension GL_OES_standard_derivatives : enable",
	        "#ifdef GL_ES",
	        "precision highp float;",
	        "#endif",
	        "uniform float width;",
	        "uniform vec4 color;",
	        "uniform float type;",
	        "uniform float lineStepSize;",
	        "varying vec2 c;",
	        "varying vec2 v_lengthSoFar;",
	        "void main(void) {",
	        "   float part = abs(fract(length(v_lengthSoFar)*lineStepSize));",
	        "   if(type >= 2.5){",        //3.0 dotted
	        "      part = fract(part*5.0);",
	        "      if(part < 0.5) discard;",
	        "   }else if(type >= 1.5){",        //2.0 - chain dotted
	        "      if(part < 0.15) discard;",
	        "      if(part > 0.25 && part < 0.40) discard;",
	        "   }else if(type >= 0.5){",        //1.0 - dashed
	        "      if(part < 0.2) discard;",
	        "   }",
	        "   vec2 px = dFdx(c);",
	        "   vec2 py = dFdy(c);",
	        "   float fx = 2.0 * c.x * px.x - px.y;",
	        "   float fy = 2.0 * c.y * py.x - py.y;",
	        "   float sd = (c.x * c.x - c.y) / sqrt(fx * fx + fy * fy);",
	        "   float alpha = 1.0 - abs(sd) / width;",
	        "   if (alpha < 0.0) discard;",
	        "   gl_FragColor = vec4(color.r, color.g, color.b, min(alpha, 1.0));",
	        "}"
	    ];

	    scene.add("lines", new ccNetViz_primitive(gl, edgeStyle, null, [
	            "precision mediump float;",
	            "attribute vec2 position;",
	            "attribute vec2 normal;",
	            "attribute vec2 lengthSoFar;",
	            "uniform vec2 width;",
	            "uniform mat4 transform;",
	            "varying vec2 n;",
	            "varying vec2 v_lengthSoFar;",
	            "void main(void) {",
	            "   gl_Position = vec4(width * normal, 0, 0) + transform * vec4(position, 0, 1);",

	            "   vec4 p = transform*vec4(lengthSoFar,0,0);",
	            "   v_lengthSoFar.x = p.x;",
	            "   v_lengthSoFar.y = p.y;",

	            "   n = normal;",
	            "}"
	        ], [
	            "precision mediump float;",
	            "uniform float type;",
	            "uniform vec4 color;",
	            "varying vec2 n;",
	            "varying vec2 v_lengthSoFar;",
	            "void main(void) {",
	            "   float part = abs(fract(length(v_lengthSoFar)*15.0));",
	            "   if(type >= 2.5){",        //3.0 dotted
	            "      part = fract(part*5.0);",
	            "      if(part < 0.5) discard;",
	            "   }else if(type >= 1.5){",        //2.0 - chain dotted
	            "      if(part < 0.15) discard;",
	            "      if(part > 0.25 && part < 0.40) discard;",
	            "   }else if(type >= 0.5){",        //1.0 - dashed
	            "      if(part < 0.2) discard;",
	            "   }",
	            "   gl_FragColor = vec4(color.r, color.g, color.b, color.a - length(n));",
	            "}"
	        ], c => {
	            gl.uniform2f(c.shader.uniforms.width, c.style.width / c.width, c.style.width / c.height);
	            gl.uniform1f(c.shader.uniforms.type, c.style.type);
	            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	        })
	    );

	    if (extensions.OES_standard_derivatives) {
	        scene.add("curves", new ccNetViz_primitive(gl, edgeStyle, null, [
	                "precision highp float;",
	                "attribute vec2 position;",
	                "attribute vec2 normal;",
	                "attribute vec2 curve;",
	                "attribute vec2 lengthSoFar;",
	                "uniform float exc;",
	                "uniform vec2 screen;",
	                "uniform float aspect2;",
	                "uniform mat4 transform;",
	                "varying vec2 v_lengthSoFar;",
	                "varying vec2 c;",
	                "void main(void) {",
	                "   vec2 n = vec2(normal.x, aspect2 * normal.y);",
	                "   float length = length(screen * n);",
	                "   n = length == 0.0 ? vec2(0, 0) : n / length;",
	                "   gl_Position = vec4(exc * n, 0, 0) + transform * vec4(position, 0, 1);",
	                "   c = curve;",

	                "   vec4 p = transform*vec4(lengthSoFar,0,0);",
	                "   v_lengthSoFar.x = p.x;",
	                "   v_lengthSoFar.y = p.y;",

	                "}"
	            ], fsCurve, c => {
	                gl.uniform1f(c.shader.uniforms.width, c.style.width);
	                gl.uniform1f(c.shader.uniforms.exc, c.curveExc);
	                gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
	                gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
	                gl.uniform1f(c.shader.uniforms.type, c.style.type);
	                gl.uniform1f(c.shader.uniforms.lineStepSize, 15);
	                ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	            })
	        );
	        scene.add("circles", new ccNetViz_primitive(gl, edgeStyle, null, [
	                "precision highp float;",
	                "attribute vec2 position;",
	                "attribute vec2 normal;",
	                "attribute vec2 curve;",
	                "attribute vec2 lengthSoFar;",
	                "uniform vec2 size;",
	                "uniform mat4 transform;",
	                "varying vec2 c;",
	                "varying vec2 v_lengthSoFar;",
	                "void main(void) {",
	                "   gl_Position = vec4(size * normal, 0, 0) + transform * vec4(position, 0, 1);",
	                "   c = curve;",

	                "   vec4 p = transform*vec4(size * lengthSoFar,0,0);",
	                "   v_lengthSoFar.x = p.x;",
	                "   v_lengthSoFar.y = p.y;",
	                "}"
	            ], fsCurve, c => {
	                gl.uniform1f(c.shader.uniforms.width, c.style.width);
	                gl.uniform1f(c.shader.uniforms.type, c.style.type);
	                var size = 2.5 * c.nodeSize;
	                gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	                gl.uniform1f(c.shader.uniforms.lineStepSize, 5);
	                ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	            })
	        );
	    }

	    if (edgeStyle.arrow) {
	        var bind = c => {
	            var size = getSize(c, getEdgesCnt(), 0.2);
	            if (!size) return true;
	            gl.uniform1f(c.shader.uniforms.offset, 0.5 * c.nodeSize);
	            gl.uniform2f(c.shader.uniforms.size, size, c.style.aspect * size);
	            c.shader.uniforms.exc && gl.uniform1f(c.shader.uniforms.exc, 0.5 * view.size * c.curveExc);
	            gl.uniform2f(c.shader.uniforms.screen, c.width, c.height);
	            c.shader.uniforms.aspect2 && gl.uniform1f(c.shader.uniforms.aspect2, c.aspect2);
	            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	        };
	      
	        scene.add("lineArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
	                "attribute vec2 position;",
	                "attribute vec2 direction;",
	                "attribute vec2 textureCoord;",
	                "uniform float offset;",
	                "uniform vec2 size;",
	                "uniform vec2 screen;",
	                "uniform float aspect2;",
	                "uniform mat4 transform;",
	                "varying vec2 tc;",
	                "void main(void) {",
	                "   vec2 u = direction / length(screen * direction);",
	                "   vec2 v = vec2(u.y, -aspect2 * u.x);",
	                "   v = v / length(screen * v);",
	                "   gl_Position = vec4(size.x * (0.5 - textureCoord.x) * v - size.y * textureCoord.y * u - offset * u, 0, 0) + transform * vec4(position, 0, 1);",
	                "   tc = textureCoord;",
	                "}"
	            ], fsColorTexture, bind)
	        );

	        if (extensions.OES_standard_derivatives) {
	            scene.add("curveArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
	                    "attribute vec2 position;",
	                    "attribute vec2 direction;",
	                    "attribute vec2 textureCoord;",
	                    "uniform float offset;",
	                    "uniform vec2 size;",
	                    "uniform float exc;",
	                    "uniform vec2 screen;",
	                    "uniform float aspect2;",
	                    "uniform mat4 transform;",
	                    "varying vec2 tc;",
	                    "void main(void) {",
	                    "   vec2 u = normalize(vec2(direction.y, -aspect2 * direction.x));",
	                    "   u = normalize(direction - exc * u / length(screen * u));",
	                    "   u = u / length(screen * u);",
	                    "   vec2 v = vec2(u.y, -aspect2 * u.x);",
	                    "   v = v / length(screen * v);",
	                    "   gl_Position = vec4(size.x * (0.5 - textureCoord.x) * v - size.y * textureCoord.y * u - offset * u, 0, 0) + transform * vec4(position, 0, 1);",
	                    "   tc = textureCoord;",
	                    "}"
	                ], fsColorTexture, bind)
	            );
	            scene.add("circleArrows", new ccNetViz_primitive(gl, edgeStyle, "arrow", [
	                    "attribute vec2 position;",
	                    "attribute vec2 direction;",
	                    "attribute vec2 textureCoord;",
	                    "uniform float offset;",
	                    "uniform vec2 size;",
	                    "uniform vec2 screen;",
	                    "uniform mat4 transform;",
	                    "varying vec2 tc;",
	                    "void main(void) {",
	                    "   vec2 u = direction;",
	                    "   vec2 v = vec2(direction.y, -direction.x);",
	                    "   gl_Position = vec4((size.x * (0.5 - textureCoord.x) * v - size.y * textureCoord.y * u - offset * u) / screen, 0, 0) + transform * vec4(position, 0, 1);",
	                    "   tc = textureCoord;",
	                    "}"
	                ], fsColorTexture, bind)
	            );
	        }
	    }
	        
	    scene.add("nodes", new ccNetViz_primitive(gl, nodeStyle, null, [
	            "attribute vec2 position;",
	            "attribute vec2 textureCoord;",
	            "uniform vec2 size;",
	            "uniform mat4 transform;",
	            "varying vec2 tc;",
	            "void main(void) {",
	            "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);",
	            "   tc = textureCoord;",
	            "}"
	        ], fsColorTexture, c => {
	            var size = getNodeSize(c);
	            gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	        })
	    );
	    scene.add("nodesColored", new ccNetViz_primitive(gl, nodeStyle, null, [
	            "attribute vec2 position;",
	            "attribute vec2 textureCoord;",
	            "attribute vec4 color;",
	            "uniform vec2 size;",
	            "uniform mat4 transform;",
	            "varying vec2 tc;",
	            "varying vec4 c;",
	            "void main(void) {",
	            "   gl_Position = vec4(size * (textureCoord - vec2(0.5, 0.5)), 0, 0) + transform * vec4(position, 0, 1);",
	            "   tc = textureCoord;",
	            "   c = color;",
	            "}"
	        ], fsVarColorTexture, c => {
	            var size = getNodeSize(c);
	            gl.uniform2f(c.shader.uniforms.size, size / c.width, size / c.height);
	        })
	    );
	    nodeStyle.label && scene.add("labels", new ccNetViz_primitive(gl, nodeStyle, "label", [
	            "attribute vec2 position;",
	            "attribute vec2 relative;",
	            "attribute vec2 textureCoord;",
	            "uniform float offset;",
	            "uniform vec2 scale;",
	            "uniform mat4 transform;",
	            "varying vec2 tc;",
	            "void main(void) {",
	            "   gl_Position = vec4(scale * (relative + vec2(0, (2.0 * step(position.y, 0.5) - 1.0) * offset)), 0, 0) + transform * vec4(position, 0, 1);",
	            "   tc = textureCoord;",
	            "}"
	        ], fsColorTexture, c => {
	            if (!getNodeSize(c)) return true;
	            gl.uniform1f(c.shader.uniforms.offset, 0.5 * c.nodeSize);
	            gl.uniform2f(c.shader.uniforms.scale, 1 / c.width, 1 / c.height);
	            ccNetViz_gl.uniformColor(gl, c.shader.uniforms.color, c.style.color);
	        })
	    );

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
	            add: (name, e) => {
	                scene[name] = e;
	                scene.elements.push(e);
	            }
	        };
	    }
	}

	module.exports = layer;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */
	module.exports = function (color) {
	    this.a = 1;

	    if (arguments.length >= 3) {
	        this.r = arguments[0];
	        this.g = arguments[1];
	        this.b = arguments[2];
	        arguments.length > 3 && (this.a = arguments[3]);
	    }
	    else if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(color)) {
	        color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(color);
	        var get = v => parseInt(v, 10) / 255;

	        this.r = get(color[1]);
	        this.g = get(color[2]);
	        this.b = get(color[3]);
	    }
	    else if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(color)) {
	        color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(color);
	        var get = v => parseInt(v, 10) / 100;

	        this.r = get(color[1]);
	        this.g = get(color[2]);
	        this.b = get(color[3]);
	    }
	    else if (/^\#([0-9a-f]{6})$/i.test(color)) {
	        color = parseInt(color.substring(1), 16);
	        this.r = (color >> 16 & 255) / 255;
	        this.g = (color >> 8 & 255) / 255;
	        this.b = (color & 255) / 255;
	    }
	    else {
	        this.r = this.g = this.b = 0;
	    }
	};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var gl = function(){};

	gl.initExtensions = function(gl) {
	    var extensions = gl.getSupportedExtensions();
	    var result = {};
	    for (var i = 1; i < arguments.length; i++) {
	        var e = arguments[i];
	        (result[e] = extensions.indexOf(e) >= 0) && gl.getExtension(e);
	    }
	    return result;
	};

	gl.createShader = function(gl, type, source) {
	    var result = gl.createShader(type);
	    gl.shaderSource(result, source);
	    gl.compileShader(result);

	    if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
	        console.log(gl.getShaderInfoLog(result));
	        return null;
	    }
	    return result;
	};

	gl.createTexture = function(gl, img, onLoad) {
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
	};

	gl.uniformColor = function(gl, location, color) {
	    gl.uniform4f(location, color.r, color.g, color.b, color.a);
	};

	gl.ortho = function(left, right, bottom, top, near, far) {
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
	};


	module.exports = gl;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ccNetViz_shader,ccNetViz_color){

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var primitive = function(gl, baseStyle, styleProperty, vs, fs, bind) {
	    var shader = new ccNetViz_shader(gl, vs.join('\n'), fs.join('\n'));
	    var buffers = [];
	    var sections = [];   
	    
	    var sectionsByStyle = {};

	    var e = {};
	    var iV, iI, iS = 0, iB = 0;

	    var init = (filler, n) => {
	        iV = iI = 0;
	        var max = Math.floor(primitive.maxBufferSize / filler.numVertices);
	        var nV = Math.min(max, n - (iB - iS)*max);
	        var nI = nV * filler.numIndices;

	        if (!e.indices || e.indices.length !== nI) {
	            e.indices = new Uint16Array(nI);
	            nV *= filler.numVertices;
	            for (var a in shader.attributes) e[a] = new Float32Array(shader.attributes[a].size * nV);
	        }
	    };
	    
	    this.set = (gl, styles, textures, data, get) => {
	        var parts = {};
	        
	        var pN = {};
	        for (var i = 0; i < data.length; i++) {
	            var el = data[i];
	            var part = parts[el.style] = parts[el.style] || [];

	            el.sI = pN[el.style] = pN[el.style] === undefined ? 0 : pN[el.style]+1;
	            
	            part.push(el);
	        }

	        iS = 0;
	        iB = 0;


	        var store = (section) => {
	            var b = buffers[iB];
	            if (!b) {
	                buffers[iB] = b = {};
	                for (var a in e) b[a] = gl.createBuffer();
	            }
	            for (var a in shader.attributes) {
	                gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
	                gl.bufferData(gl.ARRAY_BUFFER, e[a], gl.STATIC_DRAW);
	//                gl.bufferData(gl.ARRAY_BUFFER, e[a], gl.DYNAMIC_DRAW);
	            }
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
	            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, e.indices, gl.STATIC_DRAW);
	//            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, e.indices, gl.DYNAMIC_DRAW);
	            b.numIndices = iI;
	            b.numVertices = iV;
	            section.buffers.push(b);
	            iB++;
	        };

	        var createStyle = style => {
	            var result = {};

	            var copy = s => {
	                if (s) for (var p in s) result[p] = s[p];
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
	            iS = iB;

	            var section = {
	                style: createStyle(styles[p]),
	                buffers: [],
	                styleName: p
	            };

	            var filler = get(section.style);
	            filler.numVertices = filler.numVertices || 4;
	            filler.numIndices = filler.numIndices || 6;

	            var part = parts[p];
	            init(filler, part.length);
	            var max = primitive.maxBufferSize - filler.numVertices;
	            for (var i = 0; i < part.length; i++, iV += filler.numVertices, iI += filler.numIndices) {
	                if (iV > max) {
	                    store(section);
	                    init(filler, part.length);
	                }
	                filler.set(e, part[i], iV, iI);
	            }
	            store(section);

	            function add() {
	                sections.push(this);
	                sectionsByStyle[this.styleName] = this;
	            }
	            var addSection = add.bind(section);

	            typeof section.style.texture === 'string' ? section.style.texture = textures.get(gl, section.style.texture, addSection) : addSection();
	        }
	    }

	    var fb;
	    this.updateEl = (gl, el, pos, get) => {
	        var storeToPos = (b, i) => {
	            for (var a in shader.attributes) {
	                gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
	                gl.bufferSubData(gl.ARRAY_BUFFER, shader.attributes[a].size*filler.numVertices*e[a].BYTES_PER_ELEMENT*i, e[a]);
	                console.log("sub "+a+" "+(shader.attributes[a].size*filler.numVertices*i));
	            }
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
	            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, i * filler.numIndices*e.indices.BYTES_PER_ELEMENT, e.indices);
	        };

	        var section = sectionsByStyle[el.style];
	        
	        var filler = get(section.style);
	        filler.numVertices = filler.numVertices || 4;
	        filler.numIndices = filler.numIndices || 6;
	        
	        var index = el.sI;
	        
	        var elsPerBuff = Math.floor(primitive.maxBufferSize/filler.numVertices);
	        
	        var buffer = section.buffers[Math.floor(pos / elsPerBuff)];

	        iB=iS=0;
	        init(filler, 1);

	        filler.set(e, el, 0, 0);

	        storeToPos(buffer, pos);
	    };

	    this.draw = (context) => {
	        context.shader = shader;
	        shader.bind();

	        gl.uniformMatrix4fv(shader.uniforms.transform, false, context.transform);

	        sections.forEach(section => {
	            if (section.style.texture) {
	                gl.activeTexture(gl.TEXTURE0);
	                gl.bindTexture(gl.TEXTURE_2D, section.style.texture);
	                gl.uniform1i(shader.uniforms.texture, 0);
	            }

	            context.style = section.style;
	            if (bind(context)) return;

	            section.buffers.forEach(e => {
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
	    }
	}

	primitive.vertices = function(buffer, iV) {
	    for (var i = 2, j = 2 * iV, n = arguments.length; i < n; i++, j++) buffer[j] = arguments[i];
	}

	primitive.singles = function(buffer, iV) {
	    for (var i = 2, j = 1 * iV, n = arguments.length; i < n; i++, j++) buffer[j] = arguments[i];
	}

	primitive.colors = function(buffer, iV) {
	    for (var i = 2, j = 4 * iV, n = arguments.length; i < n; i++) {
	        var c = arguments[i];
	        buffer[j++] = c.r;
	        buffer[j++] = c.g;
	        buffer[j++] = c.b;
	        buffer[j++] = c.a;
	    }
	}

	primitive.indices = function(buffer, iV, iI) {
	    for (var i = 3, j = iI, n = arguments.length; i < n; i++, j++) buffer[j] = iV + arguments[i];
	}

	primitive.quad = function(buffer, iV, iI) {
	    primitive.indices(buffer, iV, iI, 0, 1, 2, 2, 3, 0);
	}

	primitive.maxBufferSize = 65536;

	module.exports = primitive;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ccNetViz_gl){

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var shader = function(gl, vs, fs) {
	    var program = gl.createProgram();

	    gl.attachShader(program, ccNetViz_gl.createShader(gl, gl.VERTEX_SHADER, vs));
	    gl.attachShader(program, ccNetViz_gl.createShader(gl, gl.FRAGMENT_SHADER, fs));
	    gl.linkProgram(program);

	    this.uniforms = {};
	    var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
	    for (var i = 0; i < n; i++) {
	        var name = gl.getActiveUniform(program, i).name;
	        this.uniforms[name] = gl.getUniformLocation(program, name);
	    }

	    this.attributes = {};
	    n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
	    for (var i = 0; i < n; i++) {
	        var name = gl.getActiveAttrib(program, i).name;
	        this.attributes[name] = { index: i, size: shader.attribute[name] || 2 };
	    }

	    this.bind = () => {
	        gl.useProgram(program);
	        for (var i = 0; i < n; i++) gl.enableVertexAttribArray(i);
	    };

	    this.unbind = () => {
	        for (var i = 0; i < n; i++) gl.disableVertexAttribArray(i);
	    };
	}

	shader.attribute = {
	    color: 4
	}

	module.exports = shader;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(layoutForce, layoutRandom){
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var layout = function() {}
	layout.force = layoutForce;
	layout.random = layoutRandom;


	layout.normalize = function(nodes) {
	    var n = nodes.length;
	    var maxX = -Infinity;
	    var maxY = -Infinity;
	    var minX = Infinity;
	    var minY = Infinity;

	    for (var i = 0; i < n; i++) {
	        var o = nodes[i];
	        maxX = Math.max(maxX, o.x);
	        maxY = Math.max(maxY, o.y);
	        minX = Math.min(minX, o.x);
	        minY = Math.min(minY, o.y);
	    };

	    var scX = minX !== maxX ? 1 / (maxX - minX) : ((minX -= 0.5), 1);
	    var scY = minY !== maxY ? 1 / (maxY - minY) : ((minY -= 0.5), 1);

	    for (var i = 0; i < n; i++) {
	        var o = nodes[i];
	        o.x = scX * (o.x - minX);
	        o.y = scY * (o.y - minY);
	    }
	}

	module.exports = layout;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ccNetViz_quadtree){

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	module.exports = function(nodes, edges) {
	    var size = [1, 1],
	        alpha,
	        friction = 0.9,
	        edgeDistance = 15,
	        edgeStrength = 1,
	        charge = -30,
	        chargeDistance2 = Infinity,
	        gravity = 0.4,
	        theta2 = .64,
	        distances = [],
	        strengths = [],
	        charges = [];

	    function accumulate(quad, alpha, charges) {
	        var cx = 0, cy = 0;
	        quad.charge = 0;
	        if (!quad.leaf) {
	            var nodes = quad.nodes;
	            var c, n = nodes.length;

	            for (var i = 0; i < n; i++) {
	                c = nodes[i];
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
	        return function(quad, x1, _, x2) {
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
	                    var k = quad.pointCharge / dn;
	                    node.px -= dx * k;
	                    node.py -= dy * k;
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

	        var q, o, s, t, l, k, x, y;
	        var n = nodes.length;
	        var m = edges.length;

	        for (var i = 0; i < m; i++) {
	            o = edges[i];
	            s = o.source;
	            t = o.target;
	            x = t.x - s.x;
	            y = t.y - s.y;
	            if (l = (x * x + y * y)) {
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

	            for (var i = 0; i < n; i++) {
	                o = nodes[i];
	                o.x += (x - o.x) * k;
	                o.y += (y - o.y) * k;
	            }
	        }

	        if (charge) {
	            accumulate(q = ccNetViz_quadtree(nodes), alpha, charges);

	            for (var i = 0; i < n; i++) {
	                var o = nodes[i];
	                !o.fixed && q.visit(repulse(o));
	            }
	        }

	        for (var i = 0; i < n; i++) {
	            o = nodes[i];
	            if (o.fixed) {
	                o.x = o.px;
	                o.y = o.py;
	            }
	            else {
	                o.x -= (o.px - (o.px = o.x)) * friction;
	                o.y -= (o.py - (o.py = o.y)) * friction;
	            }
	        }
	    };

	    this.apply = function() {
	        var n = nodes.length;
	        var d = Math.sqrt(n);
	        var s = 0.3 / d;

	        for (var i = 0; i < n; i++) {
	            var o = nodes[i];
	            o.weight = 0;
	            o.x = o.x !== undefined ? o.x : s + (i % d) / d;
	            o.y = o.y !== undefined ? o.y : s + Math.floor(i / d) / d;
	            o.px = o.x;
	            o.py = o.y;
	            charges[i] = charge;
	        }

	        for (var i = 0; i < edges.length; i++) {
	            var o = edges[i];
	            o.source.weight++;
	            o.target.weight++;
	            distances[i] = edgeDistance;
	            strengths[i] = edgeStrength;
	        }

	        alpha = 0.1;
	        while (!step());

	        return true;
	    };
	};

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var quadtree = function(points) {
	    var d, xs, ys, i, n, x1_, y1_, x2_, y2_;

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
	                }
	                else {
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
	        var closestPoint;

	        (function find(node, x1, y1, x2, y2) {
	            if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;

	            if (point = node.point) {
	                var point;
	                var dx = x - node.x;
	                var dy = y - node.y;
	                var distance2 = dx * dx + dy * dy;

	                if (distance2 < minDistance2) {
	                    var distance = Math.sqrt(minDistance2 = distance2);
	                    x0 = x - distance, y0 = y - distance;
	                    x3 = x + distance, y3 = y + distance;
	                    closestPoint = point;
	                }
	            }

	            var children = node.nodes;
	            var xm = (x1 + x2) * .5;
	            var ym = (y1 + y2) * .5;
	            var right = x >= xm;
	            var below = y >= ym;

	            for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
	                if (node = children[i & 3]) switch (i & 3) {
	                    case 0: find(node, x1, y1, xm, ym); break;
	                    case 1: find(node, xm, y1, x2, ym); break;
	                    case 2: find(node, x1, ym, xm, y2); break;
	                    case 3: find(node, xm, ym, x2, y2); break;
	                }
	            }
	        })(root, x0, y0, x3, y3);

	        return closestPoint;
	    }

	    var root = create();
	    root.visit = f => visit(f, root, x1_, y1_, x2_, y2_);
	    root.find = (x, y) => findNode(root, x, y, x1_, y1_, x2_, y2_);

	    for (i = 0; i < n; i++) insert(root, points[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
	    --i;

	    xs = ys = points = d = null;

	    return root;
	};

	module.exports = quadtree;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	module.exports = function(nodes) {
	    this.apply = function() {
	        for (var i = 0, n = nodes.length; i < n; i++) {
	            var o = nodes[i];
	            o.x = Math.random();
	            o.y = Math.random();
	        }
	    }
	};

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(11), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(ccNetViz_utils, ccNetViz_gl){

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var textures = function(onLoad) {
	    var load = ccNetViz_utils.debounce(onLoad, 5);
	    var textures = {};
	    var pending = {};
	    var n = 0;

	    this.get = function(gl, img, action) {
	        var p = pending[img];
	        var t = textures[img];

	        if (p) {
	            p.push(action);
	        }
	        else if (t) {
	            action && action();
	        }
	        else {
	            p = pending[img] = [action];
	            n++;
	            textures[img] = t = ccNetViz_gl.createTexture(gl, img, () => {
	                p.forEach(a => a && a());
	                delete pending[img];
	                --n || load();
	            });
	        }
	        return t;
	    }
	}

	module.exports = textures;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var utils = function() {};

	utils.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
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

	    return function() {
	        context = this;
	        args = arguments;
	        timestamp = Date.now;
	        var callNow = immediate && !timeout;
	        if (!timeout) timeout = setTimeout(later, wait);
	        if (callNow) {
	            result = func.apply(context, args);
	            context = args = null;
	        }

	        return result;
	    };
	};

	module.exports = utils;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: David Tichy
	 */

	var texts = function(gl) {
	    var size = 1024;

	    var canvas = document.createElement("canvas");
	    canvas.width = canvas.height = size;
	    canvas.style.width = canvas.style.height = size + 'px';
	    canvas.style.display = "none";
	    document.body.appendChild(canvas);

	    var context = canvas.getContext('2d');
	    context.fillStyle = "white";
	    context.textAlign = "left";
	    context.textBaseline = "top";

	    var rendered, texts;
	    var x, y, height;

	    this.texture = gl.createTexture();

	    this.clear = () => {
	        rendered = {};
	        context.clearRect(0, 0, size, size);
	        height = x = y = 0;
	    };

	    this.setFont = font => {
	        rendered[font] = texts = rendered[font] || {};
	        context.font = font;
	        x = 0;
	        y += height;
	        height = +/(\d+)px/.exec(font)[1] + 1;
	    };

	    this.get = text => {
	        var result = texts[text];
	        if (!result) {
	            var width = context.measureText(text).width;
	            if (x + width > size) {
	                x = 0;
	                y += height;
	            }
	            context.fillText(text, x, y);
	            texts[text] = result = {
	                width: width,
	                height: height,
	                left: x / size,
	                right: (x + width) / size,
	                top: y / size,
	                bottom: (y + height) / size
	            };
	            x += width;
	        }
	        return result;
	    };

	    this.bind = () => {
	        gl.bindTexture(gl.TEXTURE_2D, this.texture);
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
	        gl.bindTexture(gl.TEXTURE_2D, null);
	    };
	};

	module.exports = texts;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(rbush){

	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska
	 */



	//solving cube analyticaly for bezier curves
	function cuberoot(x) {
	    var y = Math.pow(Math.abs(x), 1/3);
	    return x < 0 ? -y : y;
	}

	function solveCubic(a, b, c, d) {
	    if (Math.abs(a) < 1e-8) { // Quadratic case, ax^2+bx+c=0
	        a = b; b = c; c = d;
	        if (Math.abs(a) < 1e-8) { // Linear case, ax+b=0
	            a = b; b = c;
	            if (Math.abs(a) < 1e-8) // Degenerate case
	                return [];
	            return [-b/a];
	        }

	        var D = b*b - 4*a*c;
	        if (Math.abs(D) < 1e-8)
	            return [-b/(2*a)];
	        else if (D > 0)
	            return [(-b+Math.sqrt(D))/(2*a), (-b-Math.sqrt(D))/(2*a)];
	        return [];
	    }

	    // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
	    var p = (3*a*c - b*b)/(3*a*a);
	    var q = (2*b*b*b - 9*a*b*c + 27*a*a*d)/(27*a*a*a);
	    var roots;

	    if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
	        roots = [cuberoot(-q)];
	    } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
	        roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
	    } else {
	        var D = q*q/4 + p*p*p/27;
	        if (Math.abs(D) < 1e-8) {       // D = 0 -> two roots
	            roots = [-1.5*q/p, 3*q/p];
	        } else if (D > 0) {             // Only one real root
	            var u = cuberoot(-q/2 - Math.sqrt(D));
	            roots = [u - p/(3*u)];
	        } else {                        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
	            var u = 2*Math.sqrt(-p/3);
	            var t = Math.acos(3*q/p/u)/3;  // D < 0 implies p < 0 and acos argument in [-1..1]
	            var k = 2*Math.PI/3;
	            roots = [u*Math.cos(t), u*Math.cos(t-k), u*Math.cos(t-2*k)];
	        }
	    }

	    // Convert back from depressed cubic
	    for (var i = 0; i < roots.length; i++)
	        roots[i] -= b/(3*a);

	    return roots;
	}

	//function distanceToBezier(x,y,ax,ay,bx,by,cx,cy){
	function distance2ToBezier(x,y,a,d,b,e,c,f){
	  //based on compute derivation of: d/dt ((X - (a*(1-t)*(1-t)+2*b*t*(1-t)+c*t*t))^2 + (Y - (d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t))^2)
	  
	  var A =   4*a*a  - 16*a*b + 8*a*c  + 16*b*b - 16*b*c + 4*c*c  + 4*d*d  - 16*d*e + 8*d*f  + 16*e*e - 16*e*f + 4*f*f;
	  var B = - 12*a*a + 36*a*b - 12*a*c - 24*b*b + 12*b*c - 12*d*d + 36*d*e - 12*d*f - 24*e*e + 12*e*f;
	  var C =   12*a*a - 24*a*b + 4*a*c  - 4*a*x  + 8*b*b  + 8*b*x  - 4*c*x  + 12*d*d - 24*d*e + 4*d*f  - 4*d*y  + 8*e*e + 8*e*y - 4*f*y
	  var D = - 4*a*a  + 4*a*b  + 4*a*x  - 4*b*x  - 4*d*d  + 4*d*e  + 4*d*y  - 4*e*y;
	    
	  var eqresult = solveCubic(A,B,C,D);
	  
	  
	  //loop through all possible solitions to find out which point is the nearest
	  var mindist = Infinity;
	  for(var i = 0; i < eqresult.length; i++){
	    var t = eqresult[i];
	    
	    if(t < 0 || t > 1)
	      continue;
	    
	    //point at bezier curve
	    var px = a*(1-t)*(1-t)+2*b*t*(1-t)+c*t*t;
	    var py = d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t;
	    
	    var dist = distance2(x,y,px,py);
	    if(dist < mindist)
	      mindist = dist;
	    
	  }
	  
	  return mindist;
	}

	/*
	 * @param v - array of with points [x1,y1,x2,y2 .... ]
	 * @return array representing bounding box [x1,y1,x2,y2]
	 */
	function getBBFromPoints(v){
	  var xmin = Infinity;
	  var xmax = -xmin;
	  var ymin = Infinity;
	  var ymax = -ymin;
	  
	  //x of points - even indexes in array 
	  for(var i = 0; i < v.length; i+=2){
	    var val = v[i];
	    if(val < xmin) xmin = val;
	    if(val > xmax) xmax = val;
	  }
	  
	  //y of points - odd indexes in array 
	  for(var i = 1; i < v.length; i+=2){
	    var val = v[i];
	    if(val < ymin) ymin = val;
	    if(val > ymax) ymax = val;
	  }

	  return [xmin, ymin, xmax, ymax];
	}

	//distance from point to point
	function distance2(x1,y1,x2,y2){
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

	  var xx, yy;

	  if (param < 0) {
	    xx = x1;
	    yy = y1;
	  }
	  else if (param > 1) {
	    xx = x2;
	    yy = y2;
	  }
	  else {
	    xx = x1 + param * C;
	    yy = y1 + param * D;
	  }

	  return distance2(x,y,xx,yy);
	}

	    
	var EPS = Number.EPSILON || 1e-14;


	var spatialIndex = function(c, nodes, lines, curves, circles, size, normalize) {
	    var i, j, d, rbushtree, context;
	    context = c;
	    var types = {};
	    
	    class Node{
	      constructor(n){
		this.isNode = true;
		this.e = n;
	      };
	      getBBox(){
		return [this.e.x-EPS, this.e.y - EPS, this.e.x + EPS, this.e.y + EPS];
	      };
	      dist2(x,y, context){
		return distance2(x,y,this.e.x,this.e.y);
	      };
	    }
	    
	    class Line{
	      constructor(l){
		this.isEdge = true;
		this.e = l;
	      };
	      getBBox(){
		var x1,x2,y1,y2;
		x1 = this.e.source.x;
		y1 = this.e.source.y;
		x2 = this.e.target.x;
		y2 = this.e.target.y; 
		return [Math.min(x1,x2), Math.min(y1,y2), Math.max(x1,x2), Math.max(y1,y2)];
	      };
	      dist2(x,y, context){
		return pDistance2(x,y,this.e.source.x,this.e.source.y,this.e.target.x,this.e.target.y);
	      };
	    }
	    
	    class Circle{
	      constructor(c){
		this.isEdge = true;
		this.e = c;
	      };
	      getBezierPoints(context, screensize){
		var x1,y1,s;
		s = this.e.source;
		x1 = s.x;
		y1 = s.y;

		var size = 2.5 * context.nodeSize * screensize;
		var xsize = size / context.width / 2;
		var ysize = size / context.height / 2;

		var d = s.y < 0.5 ? 1 : -1;
		
		return [
		  x1,
		  y1,
		  x1 + xsize*1,
		  y1 + ysize*d,
		  x1,
		  y1 + ysize*1.25*d,
		  x1 - xsize*1,
		  y1 + ysize*d
		];
	      };
	      getBBox(context, size){
		var v = this.getBezierPoints(context, size);
		
		return getBBFromPoints(v);
	      };
	      dist2(x,y,context,size){
		var v = this.getBezierPoints(context,size);

		//circle is just 2 bezier curves :)
		var d1 = distance2ToBezier(x,y,v[0],v[1],v[2],v[3],v[4],v[5]);
		var d2 = distance2ToBezier(x,y,v[2],v[3],v[4],v[5],v[6],v[7]);

		return Math.min(d1,d2);
	      };
	    }
	    
	    class Curve{
	      constructor(c){
		this.isEdge = true;
		this.e = c;
	      };
	      getBezierPoints(context, size){
		var x1,x2,y1,y2;
		x1 = this.e.source.x;
		y1 = this.e.source.y;
		x2 = this.e.target.x;
		y2 = this.e.target.y; 
		
		var d = normalize(this.e.source, this.e.target);
		
		var n2 = d.y;
		var n3 = context.aspect2*-d.x;

		var x = context.width * n2;
		var y = context.height* n3;
		var l = Math.sqrt(x*x+y*y)*2;

		n2 *= context.curveExc*size/l;
		n3 *= context.curveExc*size/l;

		var ret = [
		  x1,
		  y1,
		  (x1+x2)/2 + n2,
		  (y1+y2)/2 + n3,
		  x2,
		  y2
		];
		return ret;
	      };
	      getBBox(context, size){
		var v = this.getBezierPoints(context, size);
		return getBBFromPoints(v);
	      };
	      dist2(x,y, context, size){
		var v = this.getBezierPoints(context, size);
		return distance2ToBezier(x,y,v[0],v[1],v[2],v[3],v[4],v[5]);
	      };
	    }

	    function initTree(size){
	      rbushtree = rbush();

	      types = {nodes: [], lines: [], circles: [], curves: []};

	      d = [];
	      d.length = nodes.length;
	      for(i = 0;i < nodes.length; i++){
	        var e = new Node(nodes[i]);
	        d[i] = e.getBBox(context, size);
	        types.nodes.push(e);
	        d[i].push(e);
	      }

	      d.length += lines.length;
	      for(j = 0;j < lines.length;i++, j++){
	        var e = new Line(lines[j]);
	        d[i] = e.getBBox(context, size);
	        types.lines.push(e);
	        d[i].push(e);
	      }

	      d.length += circles.length;
	      for(j = 0;j < circles.length;i++, j++){
	        var e = new Circle(circles[j]);
	        d[i] = e.getBBox(context, size);
	        types.circles.push(e);
	        d[i].push(e);
	      }
	      
	      d.length += curves.length;
	      for(j = 0;j < curves.length;i++, j++){
	        var e = new Curve(curves[j]);
	        d[i] = e.getBBox(context, size);
	        types.curves.push(e);
	        d[i].push(e);
	      }


	      rbushtree.load(d);
	    }

	    var tConst = {nodes: Node, lines: Line, circles: Circle, curves: Curve};

	    this.update = (t, i, v) => {
	      rbushtree.remove(types[t][i]);

	      rbushtree.insert(types[t][i] = new tConst[t](v));
	    };


	    function sortByDistances(e1, e2){
	      return e1.dist2 - e2.dist2;
	    }

	    this.setContext = (c) => {
	      context = c;
	    };

	    this.find = (context, x,y, radius, size, nodes, edges) => {
	      var ret = {};
	      if(edges)
	        ret.edges = [];
	      if(nodes)
	        ret.nodes = [];

	      var xradius = radius;
	      var yradius = radius;

	      var radius2 = radius*radius;

	      var data = rbushtree.search([x - xradius, y - yradius, x + xradius,  y + yradius]);

	      for(var i = 0; i < data.length; i++){
	        var e = data[i][4];
	        var dist2 = e.dist2(x,y, context, size);
	        if(dist2 > radius2)
	          continue;

	        if(e.isNode && nodes){
	          ret.nodes.push({node:e.e, dist: Math.sqrt(dist2), dist2: dist2});
	        }
	        if(e.isEdge && edges){
	          ret.edges.push({edge:e.e, dist: Math.sqrt(dist2), dist2: dist2});
	        }
	      }

	      if(ret.nodes){
	        ret.nodes.sort(sortByDistances);
	      }
	      if(ret.edges){
	        ret.edges.sort(sortByDistances);
	      }

	      return ret;
	    }

	    initTree(size);
	};

	module.exports = spatialIndex;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*
	 (c) 2015, Vladimir Agafonkin
	 RBush, a JavaScript library for high-performance 2D spatial indexing of points and rectangles.
	 https://github.com/mourner/rbush
	*/

	(function () {
	'use strict';

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

	    all: function () {
	        return this._all(this.data, []);
	    },

	    search: function (bbox) {

	        var node = this.data,
	            result = [],
	            toBBox = this.toBBox;

	        if (!intersects(bbox, node.bbox)) return result;

	        var nodesToSearch = [],
	            i, len, child, childBBox;

	        while (node) {
	            for (i = 0, len = node.children.length; i < len; i++) {

	                child = node.children[i];
	                childBBox = node.leaf ? toBBox(child) : child.bbox;

	                if (intersects(bbox, childBBox)) {
	                    if (node.leaf) result.push(child);
	                    else if (contains(bbox, childBBox)) this._all(child, result);
	                    else nodesToSearch.push(child);
	                }
	            }
	            node = nodesToSearch.pop();
	        }

	        return result;
	    },

	    collides: function (bbox) {

	        var node = this.data,
	            toBBox = this.toBBox;

	        if (!intersects(bbox, node.bbox)) return false;

	        var nodesToSearch = [],
	            i, len, child, childBBox;

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

	    load: function (data) {
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

	    insert: function (item) {
	        if (item) this._insert(item, this.data.height - 1);
	        return this;
	    },

	    clear: function () {
	        this.data = {
	            children: [],
	            height: 1,
	            bbox: empty(),
	            leaf: true
	        };
	        return this;
	    },

	    remove: function (item) {
	        if (!item) return this;

	        var node = this.data,
	            bbox = this.toBBox(item),
	            path = [],
	            indexes = [],
	            i, parent, index, goingUp;

	        // depth-first iterative tree traversal
	        while (node || path.length) {

	            if (!node) { // go up
	                node = path.pop();
	                parent = path[path.length - 1];
	                i = indexes.pop();
	                goingUp = true;
	            }

	            if (node.leaf) { // check current node
	                index = node.children.indexOf(item);

	                if (index !== -1) {
	                    // item found, remove the item and condense tree upwards
	                    node.children.splice(index, 1);
	                    path.push(node);
	                    this._condense(path);
	                    return this;
	                }
	            }

	            if (!goingUp && !node.leaf && contains(node.bbox, bbox)) { // go down
	                path.push(node);
	                indexes.push(i);
	                i = 0;
	                parent = node;
	                node = node.children[0];

	            } else if (parent) { // go right
	                i++;
	                node = parent.children[i];
	                goingUp = false;

	            } else node = null; // nothing found
	        }

	        return this;
	    },

	    toBBox: function (item) { return item; },

	    compareMinX: function (a, b) { return a[0] - b[0]; },
	    compareMinY: function (a, b) { return a[1] - b[1]; },

	    toJSON: function () { return this.data; },

	    fromJSON: function (data) {
	        this.data = data;
	        return this;
	    },

	    _all: function (node, result) {
	        var nodesToSearch = [];
	        while (node) {
	            if (node.leaf) result.push.apply(result, node.children);
	            else nodesToSearch.push.apply(nodesToSearch, node.children);

	            node = nodesToSearch.pop();
	        }
	        return result;
	    },

	    _build: function (items, left, right, height) {

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
	            i, j, right2, right3;

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

	    _chooseSubtree: function (bbox, node, level, path) {

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

	    _insert: function (item, level, isNode) {

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
	    _split: function (insertPath, level) {

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

	        if (level) insertPath[level - 1].children.push(newNode);
	        else this._splitRoot(node, newNode);
	    },

	    _splitRoot: function (node, newNode) {
	        // split root node
	        this.data = {
	            children: [node, newNode],
	            height: node.height + 1,
	            bbox: null,
	            leaf: false
	        };
	        calcBBox(this.data, this.toBBox);
	    },

	    _chooseSplitIndex: function (node, m, M) {

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
	    _chooseSplitAxis: function (node, m, M) {

	        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
	            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
	            xMargin = this._allDistMargin(node, m, M, compareMinX),
	            yMargin = this._allDistMargin(node, m, M, compareMinY);

	        // if total distributions margin value is minimal for x, sort by minX,
	        // otherwise it's already sorted by minY
	        if (xMargin < yMargin) node.children.sort(compareMinX);
	    },

	    // total margin of all possible split distributions where each node is at least m full
	    _allDistMargin: function (node, m, M, compare) {

	        node.children.sort(compare);

	        var toBBox = this.toBBox,
	            leftBBox = distBBox(node, 0, m, toBBox),
	            rightBBox = distBBox(node, M - m, M, toBBox),
	            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
	            i, child;

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

	    _adjustParentBBoxes: function (bbox, path, level) {
	        // adjust bboxes along the given tree path
	        for (var i = level; i >= 0; i--) {
	            extend(path[i].bbox, bbox);
	        }
	    },

	    _condense: function (path) {
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

	    _initFormat: function (format) {
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

	function empty() { return [Infinity, Infinity, -Infinity, -Infinity]; }

	function extend(a, b) {
	    a[0] = Math.min(a[0], b[0]);
	    a[1] = Math.min(a[1], b[1]);
	    a[2] = Math.max(a[2], b[2]);
	    a[3] = Math.max(a[3], b[3]);
	    return a;
	}

	function compareNodeMinX(a, b) { return a.bbox[0] - b.bbox[0]; }
	function compareNodeMinY(a, b) { return a.bbox[1] - b.bbox[1]; }

	function bboxArea(a)   { return (a[2] - a[0]) * (a[3] - a[1]); }
	function bboxMargin(a) { return (a[2] - a[0]) + (a[3] - a[1]); }

	function enlargedArea(a, b) {
	    return (Math.max(b[2], a[2]) - Math.min(b[0], a[0])) *
	           (Math.max(b[3], a[3]) - Math.min(b[1], a[1]));
	}

	function intersectionArea(a, b) {
	    var minX = Math.max(a[0], b[0]),
	        minY = Math.max(a[1], b[1]),
	        maxX = Math.min(a[2], b[2]),
	        maxY = Math.min(a[3], b[3]);

	    return Math.max(0, maxX - minX) *
	           Math.max(0, maxY - minY);
	}

	function contains(a, b) {
	    return a[0] <= b[0] &&
	           a[1] <= b[1] &&
	           b[2] <= a[2] &&
	           b[3] <= a[3];
	}

	function intersects(a, b) {
	    return b[0] <= a[2] &&
	           b[1] <= a[3] &&
	           b[2] >= a[0] &&
	           b[3] >= a[1];
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
	            while (compare(arr[i], t) < 0) i++;
	            while (compare(arr[j], t) > 0) j--;
	        }

	        if (compare(arr[left], t) === 0) swap(arr, left, j);
	        else {
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


	// export as AMD/CommonJS module or global variable
	if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return rbush; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	else if (typeof module !== 'undefined') module.exports = rbush;
	else if (typeof self !== 'undefined') self.rbush = rbush;
	else window.rbush = rbush;

	})();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	    ){
	/**
	 *  Copyright (c) 2016, Helikar Lab.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the GPLv3 License.
	 *  Author: Aleš Saska
	 */


	var interactivityBatch = function(layerScreen, layerScreenTemp, draw, nodes, edges){
	    var toAddEdges = [];
	    var toAddNodes = [];
	    var toRemoveEdges = [];
	    var toRemoveNodes = [];
	    
	    var ePos,nPos,eDirs,lastNodeIndex,lastEdgeIndex;
	    
	    
	    
	    function createSupportStructs(nodes, edges){
	      nPos = {};
	      ePos = {};
	      eDirs = {};

	      nodes.forEach((n, i) => {
		n.uniqid = i;
		nPos[n.uniqid] = i;
		eDirs[n.uniqid] = {};
	      });
	      
	      edges.forEach((e, i) => {
		e.uniqid = i;
		eDirs[e.source.uniqid][e.target.uniqid] = e;
		ePos[e.uniqid] = i;
	      });
	      
	      lastNodeIndex = nodes[nodes.length-1].uniqid;
	      lastEdgeIndex = nodes[nodes.length-1].uniqid;
	      
	      supStructsCreated = true;
	    };

	  function doRemoveNodes(){
	    toRemoveNodes.forEach((n) => {
	      if(n.uniqid === undefined)
	        return;
	      
	      if(nPos[n.uniqid] !== undefined){
	        //in the normal graph
	        var pos = nPos[n.uniqid];
	        layerScreen.removeNodeAtPos(pos);
	      }else{
	        //try to remove from temp graph
	        
	        for(var i = 0; i < actualTempNodes.length; i++){
	          if(actualTempNodes[i].uniqid === n.uniqid){
	            actualTempNodes.splice(i,1);
	            break;
	          }
	        }
	      }
	      
	      delete n.uniqid;
	    });
	  }

	  function doRemoveEdges(){
	    toRemoveEdges.forEach((e) => {
	      if(e.uniqid === undefined)
	        return;

	      delete eDirs[e.source.uniqid][e.target.uniqid];
	      
	      if(ePos[e.uniqid] !== undefined){
	        //in the normal graph
	        var pos = ePos[e.uniqid];
	        layerScreen.removeEdgeAtPos(pos);
	      }else{
	        //try to remove from temp graph
	        
	        for(var i = 0; i < actualTempEdges.length; i++){
	          if(actualTempEdges[i].uniqid === e.uniqid){
	            actualTempEdges.splice(i,1);
	            break;
	          }
	        }

	      }
	      
	      delete e.uniqid;
	    });
	  }
	  
	  function doAddEdges(){
	    toAddEdges.forEach((e) => {
	      //already added
	      if(e.uniqid !== undefined){
	        console.error(e);
	        console.error("This edge has been already added, if you want to add same edge twice, create new object with same properties");
	        return;
	      }
	      //already added
	      e.uniqid = ++lastEdgeIndex;

	      //add this node into temporary chart
	      actualTempEdges.push(e);
	    });
	  }
	  
	  function doAddNodes(nodes){
	    toAddNodes.forEach((n) => {
	      
	      //already added
	      if(n.uniqid !== undefined){
	        console.error(n);
	        console.error("This node has been already added, if you want to add same node twice, create new object with same properties");
	        return;
	      }

	      n.uniqid = ++lastNodeIndex;
	      
	      eDirs[n.uniqid] = {};
	      actualTempNodes.push(n);
	    });
	  }

	  this.addEdge = (e) => {
	    var tid = e.target.uniqid;
	    var sid = e.source.uniqid;
	    
	    if((eDirs[sid] || {})[tid]){
	      //this edge was already added
	      return this;
	    }
	    if((eDirs[tid] || {})[sid]){
	      //must remove line and add two curves
	      
	      toRemoveEdges.push(eDirs[tid][sid]);
	      
	      toAddEdges.push(eDirs[tid][sid]);
	      toAddEdges.push(eDirs[sid][tid] = e);
	      
	      return this;
	    }

	    toAddEdges.push(e);
	    return this;
	  };
	  
	  this.addNode = (n) => {
	    toAddNodes.push(n);    
	    return this;
	  };

	  this.applyChanges = () => {
	    actualTempNodes = layerScreenTemp.nodes;
	    actualTempEdges = layerScreenTemp.edges;
	    
	    doRemoveEdges();
	    doRemoveNodes();
	    doAddNodes();
	    doAddEdges();
	    
	    toAddEdges = [];
	    toAddNodes = [];
	    toRemoveEdges = [];
	    toRemoveNodes = [];
	    
	    
	    layerScreenTemp.set(actualTempNodes, actualTempEdges);
	    draw();
	    
	    return this;
	  };
	  
	  createSupportStructs(nodes, edges);
	  
	}

	module.exports = interactivityBatch;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


	 


/***/ }
/******/ ]);