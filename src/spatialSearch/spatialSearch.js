import rbush from './rbush' ;
import ccNetViz_geomutils from '../geomutils' ;
import ccNetViz_utils from '../utils' ;
import {partitionByStyle, getPartitionStyle} from '../primitiveTools' ;
import {
        EPS,
        bezierIntersectsRect, 
        bezierIntersectsLine, 
        lineIntersectsRect, 
        rectIntersectsRect, 
        pointInRect, 
        distance2ToBezier, 
        distance2, 
        pDistance2, 
        getBBFromPoints,
        eq,
        neq
      } from './geomtools';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */



let ct = {};
function getEdgeShift(context, screensize, e, ct){
  ccNetViz_geomutils.getCurveShift(e,ct);	//get shift because of edge-to-edge functionality
  
  
  //compute all transformations made in the vertex shader
  let ctx,cty,citx,city;
  
  ctx = -ct.y;
  cty = ct.x * context.aspect2;
  
  let len2 = ctx*context.width*ctx*context.width + cty*context.height*cty*context.height;
  
  if(eq(len2, 0)){
    ctx = 0;
    cty = 0;
  }else{
    let len = Math.sqrt(len2);
    ctx *= context.curveExc * 0.25 * screensize / len;
    cty *= context.curveExc * 0.25 * screensize / len;
  }

  let sizex = 2.5 * context.nodeSize * screensize / context.width;
  let sizey = 2.5 * context.nodeSize * screensize / context.height;
  citx = -ct.cy * 0.5 * sizex;
  city = ct.cx * 0.5 * sizey;
  
  ct.x = ctx + citx;
  ct.y = cty + city;
}

class Node{
  constructor(n){
    this.e = n;
  };
  get isNode(){
    return true;
  };
  getBBox(){
    return [this.e.x-EPS, this.e.y - EPS, this.e.x + EPS, this.e.y + EPS];
  };
  intersectsRect(x1,y1,x2,y2){
    return pointInRect(this.e.x, this.e.y, x1,y1,x2,y2);
  };
  dist2(x,y, context){
    return distance2(x,y,this.e.x,this.e.y);
  };
}

class Label{
  constructor(n, textpos, style, fontSize, isSDF, getLabelSize){
    this.e = n;
    this.pos = textpos;
    this.style = style;
    this.fontSize = fontSize;
    this.isSDF = isSDF;
    this.getLabelSize = getLabelSize;
  };
  get isLabel(){
    return true;
  };
  getTextPos(context,size){
    let x = this.e.x;
    let y = this.e.y;
    
    let x1,y1,x2,y2;
    x1 = x2 = x;
    y1 = y2 = y;
    
    let wantedSize = ( this.isSDF ? this.getLabelSize(context, this.style.label || {}) : this.fontSize );

    let fontScale = wantedSize / this.fontSize;
    if(wantedSize === 0){ fontScale = 0; };

    let step = (edge, x) => (x < edge ? 0 : 1);


    const offset = 0.5 * context.nodeSize;    
    const MAX =  10.;
    const MIN = -10.;
    let bbox = [MAX, MAX, MIN, MIN];
    
    
    this.pos.forEach((c) => {
      const offsety = (2.0 * step(y, 0.5) - 1.0) * offset;
      x1 = x + size * ( c.dx * fontScale ) / context.width / 2;
      y1 = y + size * ( ( c.dy * fontScale ) + offsety ) / context.height / 2;
      x2 = x + size * ( ( ( c.dx + c.width ) * fontScale ) ) / context.width / 2;
      y2 = y + size * ( ( ( c.dy + c.height ) * fontScale ) + offsety ) / context.height / 2;
      
      bbox[0] = Math.min(x1,bbox[0]);
      bbox[1] = Math.min(y1,bbox[1]);
      bbox[2] = Math.max(x2,bbox[2]);
      bbox[3] = Math.max(y2,bbox[3]);
    });
    
    return bbox;
  };
  getBBox(context){
    let bb = this.getTextPos(context,1);
    bb[0] = Math.min(bb[0],this.e.x);
    bb[1] = Math.min(bb[1],this.e.y);
    bb[2] = Math.max(bb[2],this.e.x);
    bb[3] = Math.max(bb[3],this.e.y);
    return bb;
  };
  intersectsRect(x1,y1,x2,y2,context,size){
    let t = this.getTextPos(context,size);
    return rectIntersectsRect(x1,y1,x2,y2,t[0],t[1],t[2],t[3]);
  };
  dist2(x,y, context, size){
    let t = this.getTextPos(context, size);

    if(pointInRect(x,y,t[0],t[1],t[2],t[3]))
      return 0;
    
    //minimum from distance from corners or distance from borders
    return Math.min(
      distance2(t[0],t[1]),
      distance2(t[2],t[3]),
      distance2(t[0],t[3]),
      distance2(t[2],t[1]),
      pDistance2(x,y,t[0],t[1],t[2],t[1]),
      pDistance2(x,y,t[0],t[3],t[2],t[3]),
      pDistance2(x,y,t[0],t[1],t[0],t[3]),
      pDistance2(x,y,t[2],t[1],t[2],t[3])              
    );
  };
}

class Line{
  constructor(l){
    this.e = l;
  };
  get isEdge(){
    return true;
  };
  getPoints(context, size){
    let x1,y1,x2,y2;
    
    let s = ccNetViz_geomutils.edgeSource(this.e);
    let t = ccNetViz_geomutils.edgeTarget(this.e);
    
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

    return [x1,y1,x2,y2];
  };
  getBBox(context, size){
    let p = this.getPoints(context, size);
    
    return [Math.min(p[0],p[2]), Math.min(p[1],p[3]), Math.max(p[0],p[2]), Math.max(p[1],p[3])];
  };
  intersectsRect(x1,y1,x2,y2, context, size){
    let p = this.getPoints(context, size);

    return lineIntersectsRect(p[0], p[1], p[2], p[3], x1,y1,x2,y2);
  };
  dist2(x,y, context, size){
    let p = this.getPoints(context, size);

    return pDistance2(x,y,p[0],p[1],p[2],p[3]);
  };
}

class Circle{
  constructor(c){
    this.e = c;
  };
  get isEdge(){
    return true;
  };
  getBezierPoints(context, screensize){
    let x1,y1,s;
    s = ccNetViz_geomutils.edgeSource(this.e);
    x1 = s.x;
    y1 = s.y;

    let size = 2.5 * context.nodeSize * screensize;
    let xsize = size / context.width / 2;
    let ysize = size / context.height / 2;

    let d = s.y < 0.5 ? 1 : -1;

    getEdgeShift(context, screensize, s.e, ct);
    x1 += ct.x;
    y1 += ct.y;
    
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
    let v = this.getBezierPoints(context, size);
    
    return getBBFromPoints(v);
  };
  intersectsRect(x1,y1,x2,y2, context, size, normalize){
    let v = this.getBezierPoints(context,size);
    return bezierIntersectsRect(v[0],v[1],v[2],v[3],v[4],v[5],x1,y1,x2,y2) || bezierIntersectsRect(v[2],v[3],v[4],v[5],v[6],v[7],x1,y1,x2,y2);
  };
  dist2(x,y,context,size){
    let v = this.getBezierPoints(context,size);

    //circle is just 2 bezier curves :)
    let d1 = distance2ToBezier(x,y,v[0],v[1],v[2],v[3],v[4],v[5]);
    let d2 = distance2ToBezier(x,y,v[2],v[3],v[4],v[5],v[6],v[7]);

    return Math.min(d1,d2);
  };
}

class Curve{
  constructor(c){
    this.e = c;
  };
  get isEdge(){
    return true;
  };
  getBezierPoints(context, size, normalize){
    let x1,x2,y1,y2;
    let s = ccNetViz_geomutils.edgeSource(this.e);
    let t = ccNetViz_geomutils.edgeTarget(this.e);

    x1 = s.x;
    y1 = s.y;
    x2 = t.x;
    y2 = t.y; 
    
    let d = normalize(s, t);
    
    let n2 = d.y;
    let n3 = context.aspect2*-d.x;

    let x = context.width * n2;
    let y = context.height* n3;
    let l = Math.sqrt(x*x+y*y)*2;

    n2 *= context.curveExc*size/l;
    n3 *= context.curveExc*size/l;

    getEdgeShift(context, size, s.e, ct);
    x1 += ct.x;
    y1 += ct.y;
    getEdgeShift(context, size, t.e, ct);
    x2 += ct.x;
    y2 += ct.y;

    let ret = [
      x1,
      y1,
      (x1+x2)/2 + n2,
      (y1+y2)/2 + n3,
      x2,
      y2
    ];
    return ret;
  };
  intersectsRect(x1,y1,x2,y2, context, size, normalize){
    let v = this.getBezierPoints(context, size, normalize);
    return bezierIntersectsRect(v[0],v[1],v[2],v[3],v[4],v[5],x1,y1,x2,y2);
  };
  getBBox(context, size, normalize){
    let v = this.getBezierPoints(context, size, normalize);
    return getBBFromPoints(v);
  };
  dist2(x,y, context, size, normalize){
    let v = this.getBezierPoints(context, size, normalize);
    return distance2ToBezier(x,y,v[0],v[1],v[2],v[3],v[4],v[5]);
  };
}


function sortByDistances(e1, e2){
  return e1.dist2 - e2.dist2;
}


let tConst = {nodes: Node, lines: Line, circles: Circle, curves: Curve, labels: Label};

export default class spatialIndex{
  constructor(c, texts, options, nodes, nodesParts, lines, linesParts, curves, curvesParts, circles, circlesParts, normalize, nodeStyle, getLabelSize, getLabelHideScreen){
    //init all elements into rbush tree with size 1 (outer bound - the worst case)
    const size = 1; const oldsize = c.size || 1; c.size = 1.;
    
    this.texts = texts;
    this.normalize = normalize;
    let t = this.types = {nodes: [], lines: [], circles: [], curves: [], labels: []};
    let i = 0, d = [];

    let addEntity = (e, d, i) => {
      d[i] = e.getBBox(c, size, normalize);
      d[i].push(e);
      return e;
    };
    
    nodes.forEach((n) => {
      t.nodes.push(addEntity(new Node(n), d, i++));
    });

    lines.forEach((l) => {
      t.lines.push(addEntity(new Line(l), d, i++));
    });

    circles.forEach((c) => {
      t.circles.push(addEntity(new Circle(c), d, i++));
    });
    
    curves.forEach((c) => {
      t.curves.push(addEntity(new Curve(c), d, i++));
    });


    let sd = {};
    let sdi = {};


    //labels position could differ by style >> must partition by it
    for(let style in nodesParts){
      let nodes = nodesParts[style];


      let ns = getPartitionStyle(options.styles[style],nodeStyle,"label");
      let textEngine = texts.getEngine(ns.font);
      textEngine.setFont(ns.font);
      const fontSize = textEngine.fontSize;
      const isSDF = textEngine.isSDF;

      let sd_n = (sd[style] || (sd[style] = []));
      let sdi_n = (sdi[style] || (sdi[style] = 0));

      //biggest size in which the text is shown
      c.size = getLabelHideScreen(c, ns.label || {});
      nodes.forEach((n) => {
        let textpos = textEngine.get(n.label, n.x, n.y);
        t.labels.push(addEntity(new Label(n,textpos, ns, fontSize, isSDF, getLabelSize), sd_n, sdi_n++));
      });

      sdi[style] = sdi_n;
    }

    this.rbushtree_s = {};
    for(let style in sd){
        let rb = this.rbushtree_s[style] = rbush();
        rb.load(sd[style]);
    }

    //tree initialization
    this.rbushtree = rbush();
    this.rbushtree.load(d);
    
    
    //restore the size of scale (loosen outer the upper bound)
    c.size = oldsize;
  }
  _tryAddEl(ret, e, dist2, nodes, edges, labels){
    if(nodes && e.isNode){
      ret.nodes.push({node:e.e, dist: Math.sqrt(dist2), dist2: dist2});
    }
    if(edges && e.isEdge){
      ret.edges.push({edge:e.e, dist: Math.sqrt(dist2), dist2: dist2});
    }
    if(labels && e.isLabel){
      ret.labels.push({label:e.e, dist: Math.sqrt(dist2), dist2: dist2});
    }
  }
  findArea(context,x1,y1,x2,y2,size,nodes,edges,labels){
    if(x1 > x2){
      let p = x1;
      x1 = x2;
      x2 = p;
    }
    if(y1 > y2){
      let p = y1;
      y1 = y2;
      y2 = p;
    }

    
    let ret = {};
    if(edges) ret.edges = [];
    if(nodes) ret.nodes = [];
    if(labels) ret.labels = [];

    let x = (x1+x2)/2;
    let y = (y1+y2)/2;

    let data = this.rbushtree.search([x1-EPS, y1-EPS, x2+EPS,  y2+EPS]);
    if(labels){
        for(let s in this.rbushtree_s){
            data = data.concat(this.rbushtree_s[s].search([x1-EPS, y1-EPS, x2+EPS,  y2+EPS]));
        }
    }

    for(let i = 0; i < data.length; i++){
      let e = data[i][4];
      let dist2 = e.dist2(x,y, context, size, this.normalize, this.texts);
      if(!e.intersectsRect(x1,y1,x2,y2,context, size, this.normalize, this.texts))
        continue;

      this._tryAddEl(ret, e, dist2, nodes, edges, labels);
    }
    
    for(let k in ret){
      ret[k].sort(sortByDistances);
    }

    return ret;    
  }
  find(context, x,y, radius, size, nodes, edges, labels){
    let ret = {};
    if(edges) ret.edges = [];
    if(nodes) ret.nodes = [];
    if(labels) ret.labels = [];

    let xradius = radius;
    let yradius = radius;

    let radius2 = radius*radius;

    let data = this.rbushtree.search([x - xradius, y - yradius, x + xradius,  y + yradius]);
    if(labels){
        for(let s in this.rbushtree_s){
            data = data.concat(this.rbushtree_s[s].search([x - xradius, y - yradius, x + xradius,  y + yradius]));
        }
    }

    for(let i = 0; i < data.length; i++){
      let e = data[i][4];
      let dist2 = e.dist2(x,y, context, size, this.normalize, this.texts);
      if(dist2 > radius2)
        continue;

      this._tryAddEl(ret, e, dist2, nodes, edges, labels);
    }

    for(let k in ret){
      ret[k].sort(sortByDistances);
    }

    return ret;
  }
  update(context, t, i, v){
    //init all elements into rbush tree with size 1 (the biggest possible - the worst case)
    let size = 1;

    this.rbushtree.remove(this.types[t][i]);

    let e = new tConst[t](v);
    let arr = e.getBBox(context, size, this.normalize, this.texts);
    arr.push(e);

    this.rbushtree.insert(this.types[t][i] = arr);
  }
}