var ccNetViz_layer = require('./layer');
var ccNetViz_layout = require('./layout/layout');
var ccNetViz_gl = require('./gl');
var ccNetViz_color = require('./color');
var ccNetViz_utils = require('./utils');
var ccNetViz_textures = require('./dataSources/textures');
var ccNetViz_files = require('./dataSources/files');
var ccNetViz_interactivityBatch = require('./interactivityBatch');
var ccNetViz_spatialSearch = require('./spatialSearch/spatialSearch');

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

function checkUniqId(el){
  if(el.__uniqid !== undefined){
    el.uniqid = el.__uniqid;
    delete el.__uniqid;
  }else if(el.uniqid === undefined){
    el.uniqid = ++lastUniqId;
  }
}


function mergeArrays(a, b, cmp){
  let r = [];
  r.length = a.length + b.length;

  let i = 0,j=0,k=0;
  
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
  let self = this;
  
  let backgroundStyle = options.styles.background = options.styles.background || {};
  let backgroundColor = new ccNetViz_color(backgroundStyle.color || "rgb(255, 255, 255)");
  
  let removed = false;
  let setted  = false;
  
  let nodeStyle = options.styles.node = options.styles.node || {};
  nodeStyle.minSize = nodeStyle.minSize != null ? nodeStyle.minSize : 6;
  nodeStyle.maxSize = nodeStyle.maxSize || 16;
  nodeStyle.color = nodeStyle.color || "rgb(255, 255, 255)";

  if (nodeStyle.label) {
      let s = nodeStyle.label;
      s.color = s.color || "rgb(120, 120, 120)";
      s.font = s.font || "11px Arial, Helvetica, sans-serif";
  }

  let edgeStyle = options.styles.edge = options.styles.edge || {};
  edgeStyle.width = edgeStyle.width || 1;
  edgeStyle.color = edgeStyle.color || "rgb(204, 204, 204)";

  let onLoad = (
                options.onLoad
                  ||
                (() => {
                if(removed || !setted) return;
                 this.draw();
                })
              );  

  if (edgeStyle.arrow) {
      let s = edgeStyle.arrow;
      s.minSize = s.minSize != null ? s.minSize : 6;
      s.maxSize = s.maxSize || 12;
      s.aspect = 1;
  }
  

  function getContext(){
      let attributes = { depth: false, antialias: false };
      let gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);

//      let gl_lose = gl.getExtension('WEBGL_lose_context');
//      if(gl_lose) gl_lose.restoreContext();
      
      return gl;
  }
  
  let layers = {};
  let view,gl,drawFunc;
  let context = {};
  
  this.cntShownNodes = () => {
    let n = 0;
    for(var k in layers)
      n += layers[k].cntShownNodes();
    return n;
  }
  let getNodesCnt = options.getNodesCnt || this.cntShownNodes;
  
  this.cntShownEdges = () => {
    let e = 0;
    for(var k in layers)
      e += layers[k].cntShownEdges();
    return e;
  }
  let getEdgesCnt = options.getEdgesCnt || this.cntShownEdges;

  let onRedraw = ccNetViz_utils.debounce(() => {
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
    
  let nodes, edges;
  
  function insertTempLayer(){
    if(layers.temp)
      return;
    layers.temp = new ccNetViz_layer(canvas, context, view, gl, textures, files, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad);
  }

  let batch = undefined;
  function getBatch(){
    if(!batch)
      batch = new ccNetViz_interactivityBatch(layers, insertTempLayer, drawFunc, nodes, edges, checkUniqId);
    return batch;
  };
  
  this.set = (n, e, layout) => {
    if(checkRemoved()) return this;
    
    nodes = n || [];
    edges = e || [];
    
    nodes.forEach(checkUniqId);
    edges.forEach(checkUniqId);
    
    if(layers.temp)
      layers.temp.set([], [], layout);
    layers.main.set(nodes, edges, layout);
    
    //reset batch
    batch = undefined;
    setted = true;
    return this;
  };
  
  //make all dynamic changes static
  this.reflow = () => {
    if(checkRemoved()) return;

    getBatch().applyChanges();
    
    //nodes and edges in dynamic chart are actual
    let n = layers.main.getVisibleNodes();
    if(layers.temp)
      n= n.concat(layers.temp.getVisibleNodes());
    
    let e = layers.main.getVisibleEdges();
    if(layers.temp)
      e = e.concat(layers.temp.getVisibleEdges());
    
    this.set(n,e);
    this.draw();
  };
  
  this.removeNode = (n) => { if(checkRemoved()){return this;} getBatch().removeNode(n); return this; };
  this.removeEdge = (e) => { if(checkRemoved()){return this;} getBatch().removeEdge(e); return this; };
  this.addEdge = (e) => { if(checkRemoved()){return this;} getBatch().addEdge(e); return this;};
  this.addNode = (n) => { if(checkRemoved()){return this;} getBatch().addNode(n); return this;};
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


  
  let getSize = (c, n, sc) => {
    let result = sc * Math.sqrt(c.width * c.height / n) / view.size;
    let s = c.style;
    if (s) {
      result = s.maxSize ? Math.min(s.maxSize, result) : result;
      result = result < s.hideSize ? 0 : (s.minSize ? Math.max(s.minSize, result) : result);
    }
    return result;
  };

  let getNodeSize = c => getSize(c, getNodesCnt(), 0.4);

  let offset = 0.5 * nodeStyle.maxSize;

  this.draw = () => {
    if(checkRemoved()) return;

    let width = canvas.width;
    let height = canvas.height;
    let aspect = width / height;
    let o = view.size === 1 ? offset : 0;
    let ox = o / width;
    let oy = o / height;

    context.transform = ccNetViz_gl.ortho(view.x - ox, view.x + view.size + ox, view.y - oy, view.y + view.size + oy, -1, 1);
    context.offsetX   = ox;
    context.offsetY   = oy;
    context.width     = 0.5 * width;
    context.height    = 0.5 * height;
    context.aspect2   = aspect * aspect;
    context.aspect    = aspect;
    context.count     = getNodesCnt();

    //bad hack because we use different size for curveExc and for nodeSize :(
    if(context.style) delete context.style;
    context.curveExc = getSize(context, getEdgesCnt(), 0.5);
    context.style     = nodeStyle;
    context.nodeSize = getNodeSize(context);

    gl.viewport(0, 0, width, height);

    gl.clear(gl.COLOR_BUFFER_BIT);

    for(let i = 0; i < layers.main.scene.elements.length; i++){
      layers.main.scene.elements[i].draw(context);
      if(layers.temp)
        layers.temp.scene.elements[i].draw(context);
    }
  };
  drawFunc = this.draw.bind(this);
  
  this.getLayerCoords = function(conf){
    if(checkRemoved()) return;

    let ret = {};       

    ['x','x1','x2'].forEach(k => {
      if(conf[k] !== undefined){
	let x = conf[k];
	x = (x/canvas.width)*(view.size+2*context.offsetX)-context.offsetX+view.x;
	ret[k] = x;
      }
    });
    
    
    ['y','y1','y2'].forEach(k => {
      if(conf[k] !== undefined){
	let y = conf[k];
	y = (1-y/canvas.height)*(view.size+2*context.offsetY)-context.offsetY+view.y;
	ret[k] = y;
      }
    });

    if(conf.radius !== undefined){
      let dist = conf.radius;

      let disth = dist / canvas.height;
      let distw = dist / canvas.width;
      dist = Math.max(disth, distw) * view.size;

      ret.radius = dist;
    }

    return ret;
  }

  let findMerge = function(funcname, args){
    if(checkRemoved()) return;

    let f1 = layers.main[funcname].apply(layers.main, args);

    if(!layers.temp)
      return f1;

    let f2 = layers.temp[funcname].apply(layers.temp, args);

    let r = {};
    for(let key in f1){
      r[key] = mergeArrays(f1[key], f2[key], (e1, e2) => {
			      return e1.dist2 - e2.dist2;
			    });
    }

    return r;
  };

  this.find = function(){return findMerge('find', arguments); };
  this.findArea = function(){return findMerge('findArea', arguments); };


  let onDownThis, onWheelThis;
  canvas.addEventListener("mousedown", onDownThis = onMouseDown.bind(this));
  canvas.addEventListener("wheel", onWheelThis = onWheel.bind(this));

  this.remove = () => {
    if(checkRemoved()) return;

    gl.viewport(0, 0, context.width*2, context.height*2);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    let gl_lose = gl.getExtension('WEBGL_lose_context');
    if(gl_lose) gl_lose.loseContext();

    canvas.removeEventListener('mousedown', onDownThis);
    canvas.removeEventListener('wheel', onWheelThis);

    removed = true;
  }
  
  let last_view = {};
  function checkChangeViewport(){
    let is_change = false;
    if(last_view){
      for(let k in view){
	if(last_view[k] !== view[k]) 
	  is_change = true;
      }
    }
    ccNetViz_utils.extend(last_view, view);
       
    if(is_change){
      options.onChangeViewport && options.onChangeViewport(view);
    }
  }

  function onMouseDown(e) {
    let width = canvas.width / view.size;
    let height = canvas.height / view.size;
    let sx = e.clientX;
    let sy = e.clientY;
    let dx = view.x + sx / width;
    let dy = sy / height - view.y;
    let od = options.onDrag;
    let dragged, custom;

    let drag = e => {
      if (dragged) {
          if (custom) {
              od.drag && od.drag(e);
          }
          else {
              view.x = Math.max(0, Math.min(1 - view.size, dx - e.clientX / width));
              view.y = Math.max(0, Math.min(1 - view.size, e.clientY / height - dy));
              checkChangeViewport();
              this.draw();
          }
      }
      else {
          let mx = e.clientX - sx;
          let my = e.clientY - sy;

          if (mx * mx + my * my > 8) {
              dragged = true;
              custom = od && od.start({ clientX: sx, clientY: sy });
              custom && od.drag && od.drag(e);
          }
      }
      e.preventDefault();
    };

    let up = e => {
        custom && od.stop && od.stop(e);
        !dragged && options.onClick && options.onClick(e);

        window.removeEventListener('mouseup', up);
        window.removeEventListener('mousemove', drag);
    };
    window.addEventListener('mouseup', up);
    window.addEventListener('mousemove', drag);
  }

  function onWheel(e) {
      let rect = canvas.getBoundingClientRect();
      let size = Math.min(1.0, view.size * (1 + 0.001 * (e.deltaMode ? 33 : 1) * e.deltaY));
      let delta = size - view.size;

      e.preventDefault();

      let oldsize = view.size;
      let oldx = view.x;
      let oldy = view.y;
      
      
      view.size = size;
      view.x = Math.max(0, Math.min(1 - size, view.x - delta * (e.clientX - rect.left) / canvas.width));
      view.y = Math.max(0, Math.min(1 - size, view.y - delta * (1 - (e.clientY - rect.top) / canvas.height)));

      if(options.onZoom && options.onZoom(view) === false){
        view.size = oldsize;
        view.x = oldx;
        view.y = oldy;
        return;
      }
      
      checkChangeViewport();
      
      this.draw();
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

  this.getViewport = function() {
    return view;
  }

  this.setViewport = function(v) {
    if(checkRemoved()) return;

    ccNetViz_utils.extend(view, v);

    checkChangeViewport();
  }

  this.resetView = () => this.setViewport({size:1,x:0,y:0});

  //expose these methods from layer into this class
  ['update'].forEach(function(method){
    (function(method, self){
      self[method] = function(){
        let args = arguments;
        for(let k in layers){
	  let l = layers[k];
          l[method].apply(l,args);
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

  view = {size:1,x:0,y:0};

  this.resize();

  let textures = new ccNetViz_textures(onLoad);
  let files = new ccNetViz_files(onLoad);
  layers.main = new ccNetViz_layer(canvas, context, view, gl, textures, files, options, nodeStyle, edgeStyle, getSize, getNodeSize, getNodesCnt, getEdgesCnt, onRedraw, onLoad);
};


ccNetViz.color = ccNetViz_color;
ccNetViz.spatialSearch = ccNetViz_spatialSearch;
ccNetViz.layout = ccNetViz_layout;
ccNetViz.color = ccNetViz_color;


window.ccNetViz = ccNetViz;
module.exports = ccNetViz;