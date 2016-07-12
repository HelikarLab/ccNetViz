define(['./rbush'], function(rbush){

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


    function Node(n){
      this.e = n;
    };
    Node.prototype.isNode = true;
    Node.prototype.getBBox = function(){
      return [this.e.x-EPS, this.e.y - EPS, this.e.x + EPS, this.e.y + EPS];
    };
    Node.prototype.dist2 = function(x,y, context){ return distance2(x,y,this.e.x,this.e.y);};
    
    function Line(l){
      this.e = l;
    }
    Line.prototype.isEdge = true;
    Line.prototype.getBBox = function(){
      var x1,x2,y1,y2;
      x1 = this.e.source.x;
      y1 = this.e.source.y;
      x2 = this.e.target.x;
      y2 = this.e.target.y; 
      return [Math.min(x1,x2), Math.min(y1,y2), Math.max(x1,x2), Math.max(y1,y2)];
    };
    Line.prototype.dist2 = function(x,y, context){ return pDistance2(x,y,this.e.source.x,this.e.source.y,this.e.target.x,this.e.target.y); };
    
    function Circle(c){
      this.e = c;
    }
    Circle.prototype.isEdge = true;
    Circle.prototype.getBezierPoints = function(context, screensize){
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
    Circle.prototype.getBBox = function(context, size){
      var v = this.getBezierPoints(context, size);
      
      return getBBFromPoints(v);
    };
    Circle.prototype.dist2 = function(x,y,context,size){
      var v = this.getBezierPoints(context,size);

      //circle is just 2 bezier curves :)
      var d1 = distance2ToBezier(x,y,v[0],v[1],v[2],v[3],v[4],v[5]);
      var d2 = distance2ToBezier(x,y,v[2],v[3],v[4],v[5],v[6],v[7]);

      return Math.min(d1,d2);
    };
    
    function Curve(c){
      this.e = c;
    }
    Curve.prototype.isEdge = true;
    Curve.prototype.getBezierPoints = function(context, size){
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
    Curve.prototype.getBBox = function(context, size){
      var v = this.getBezierPoints(context, size);
      return getBBFromPoints(v);
    };
    Curve.prototype.dist2 = function(x,y, context, size){
      var v = this.getBezierPoints(context, size);
      return distance2ToBezier(x,y,v[0],v[1],v[2],v[3],v[4],v[5]);
    };

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

});