define([
//        './ccNetVizMultiLevel',
        './layer',
        './layout/layout',
        './gl',
        './color',
        './utils',
        './textures',
        './interactivityBatch',
        './spatialSearch/spatialSearch'
    ], 
    function(
//        ccNetVizMultiLevel,
        ccNetViz_layer,
	ccNetViz_layout,
	ccNetViz_gl,
	ccNetViz_color,
        ccNetViz_utils,
	ccNetViz_textures,
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


var lastUniqId = 0;


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

var ccNetViz = function(canvas, options){

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
  

  var checkUniqId = (el) => {
    if(el.uniqid === undefined)
      el.uniqid = ++lastUniqId;
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
  
  function checkRemoved(){
    if(removed){
      console.error("Cannot call any function on graph after remove()")
      return true;
    }
    return false;
  }
    
  var nodes, nodes;

  var batch = undefined;
  function getBatch(){
    if(!batch)
      batch = new ccNetViz_interactivityBatch(layerScreen, layerScreenTemp, drawFunc, nodes, edges);
    return batch;
  };
  
  this.set = (n, e, layout) => {
    if(checkRemoved()) return;
    
    nodes = n;
    edges = e;
    
    nodes.forEach(checkUniqId);
    edges.forEach(checkUniqId);
    
    layerScreenTemp.set([], [], layout);
    layerScreen.set(nodes, edges, layout);
    
    //reset batch
    batch = undefined;
  };
  
  //make all dynamic changes static
  this.reflow = () => {
    if(checkRemoved()) return;

    getBatch().applyChanges();
    
    //nodes and edges in dynamic chart are actual
    var n = layerScreen.getVisibleNodes().concat(layerScreenTemp.getVisibleNodes());
    var e = layerScreen.getVisibleEdges().concat(layerScreenTemp.getVisibleEdges());
    
    this.set(n,e);
    this.draw();
  };
  
  this.removeNode = (n) => { if(checkRemoved()){return this;} getBatch().removeNode(n); return this; };
  this.removeEdge = (e) => { if(checkRemoved()){return this;} getBatch().removeEdge(e); return this; };
  this.addEdge = (e) => { if(checkRemoved()){return this;} checkUniqId(e); getBatch().addEdge(e); return this;};
  this.addNode = (n) => { if(checkRemoved()){return this;} checkUniqId(n); getBatch().addNode(n); return this;};
  this.updateNode = (n) => { if(checkRemoved()){return this;} this.removeNode(n); this.addNode(n); return this; };
  this.updateEdge = (e) => { if(checkRemoved()){return this;} this.removeEdge(e); this.addEdge(e); return this; };
  this.applyChanges = () => { if(checkRemoved()){return this;} getBatch().applyChanges(); return this; };

  this.addEdges = (edges) => {
    if(checkRemoved()) return this;
    
    edges.forEach((e) => {
      this.addEdge(e);
    });
    
    return this;
  };
  
  this.addNodes = (nodes) => {
    if(checkRemoved()) return this;

    nodes.forEach((n) => {
      this.addNode(n);
    });

    return this;
  };

  this.removeEdges = (edges) => {
    if(checkRemoved()) return this;

    edges.forEach((e) => {
      this.removeEdge(e);
    });
    return this;
  };
  
  this.removeNodes = (nodes) => {
    if(checkRemoved()) return this;

    nodes.forEach((n) => {
      this.removeNode(n);
    });
    return this;
  };

  this.updateNodes = (nodes) => {
    if(checkRemoved()) return this;

    nodes.forEach((n) => {
      this.updateNode(n);
    });
    
    return this;
  };

  this.updateEdges = (edges) => {
    if(checkRemoved()) return this;

    edges.forEach((e) => {
      this.updateEdge(e);
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
    if(checkRemoved()) return;

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
    context.style     = nodeStyle;

    context.curveExc = getSize(context, getEdgesCnt(), 0.5);
    context.nodeSize = getNodeSize(context);

    gl.viewport(0, 0, width, height);

    gl.clear(gl.COLOR_BUFFER_BIT);

    for(var i = 0; i < layerScreen.scene.elements.length; i++){
      layerScreen.scene.elements[i].draw(context);
      layerScreenTemp.scene.elements[i].draw(context);
    }
  };
  drawFunc = this.draw.bind(this);
  
  this.getLayerCoords = function(conf){
    if(checkRemoved()) return;

    var x = conf.x;

    x = (x/canvas.width)*(view.size+2*context.offsetX)-context.offsetX+view.x;
    y = (1-y/canvas.height)*(view.size+2*context.offsetY)-context.offsetY+view.y;
    return {x: x, y:y, radius: dist};
    var y = conf.y;
    var dist = conf.radius;

    var disth = dist / canvas.height;
    var distw = dist / canvas.width;
    dist = Math.max(disth, distw) * view.size;
  }
  
  this.find = function(){
    if(checkRemoved()) return;

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
  
  var onDownThis, onWheelThis;
  canvas.addEventListener("mousedown", onDownThis = onMouseDown.bind(this));
  canvas.addEventListener("wheel", onWheelThis = onWheel.bind(this));
  
  this.remove = () => {
    if(checkRemoved()) return;

    gl.viewport(0, 0, context.width*2, context.height*2);
    gl.clear(gl.COLOR_BUFFER_BIT);

    canvas.removeEventListener('mousedown', onDownThis);
    canvas.removeEventListener('wheel', onWheelThis);
    
    removed = true;
  }

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
    if(checkRemoved()) return;

    return canvas.toDataURL();
  }

  
  this.resize = function() {
    if(checkRemoved()) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  this.resetView = function() {
    if(checkRemoved()) return;

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
  
  var textures = new ccNetViz_textures(options.onLoad || this.draw);
  layerScreen = new ccNetViz_layer(canvas, context, view, gl, textures, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw);
  layerScreenTemp = new ccNetViz_layer(canvas, context, view, gl, textures, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw);  
};


ccNetViz.spatialSearch = ccNetViz_spatialSearch;
ccNetViz.layout = ccNetViz_layout;


window.ccNetViz = module.exports = ccNetViz;


});