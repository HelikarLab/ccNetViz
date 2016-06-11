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
function distanceToBezier(x,y,a,d,b,e,c,f){
  //based on compute derivation of: d/dt ((X - (a*(1-t)*(1-t)+2*b*t*(1-t)+c*t*t))^2 + (Y - (d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t))^2)
  
  var A = 4*a*a  - 16*a*b + 8*a*c  + 16*b*b - 16*b*c + 4*c*c  + 4*d*d  + 16*d*e + 8*d*f  + 16*e*e - 16*e*f + 4*f*f;
  var B = 12*a*a + 36*a*b + 12*a*c - 24*b*b + 12*b*c - 12*d*d + 36*d*e - 12*d*f - 24*e*e + 12*e*f;
  var C = 12*a*a - 24*a*b + 4*a*c  + 4*a*x  + 8*b*b  + 8*b*x  - 4*c*x  + 12*d*d - 24*d*e + 4*d*f  - 4*d*y  + 8*e*e + 8*e*y - 4*f*y
  var D = 4*a*a  + 4*a*b  + 4*a*x  - 4*b*x  - 4*d*d  + 4*d*e  + 4*d*y  - 4*e*y;
    
  var eqresult = solveCubic(A,B,C,D);
  
  
  var mindist = Infinity;
  for(var i = 0; i < eqresult.length; i++){
    var t = eqresult[i];
    
    if(t < 0 || t > 1)
      continue;
    
    //point at bezier curve
    var px = a*(1-t)*(1-t)+2*b*t*(1-t)+c*t*t;
    var py = d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t;
    
    var dist = distance(x,y,px,py);
    if(dist < mindist)
      mindist = dist;
    
  }
  
  return mindist;
}



var spatialIndex = function(nodes, edges) {
    var i, j, d, rbushtree, EPS;

    EPS = Number.EPSILON || 1e-14;


    function getNodeBBox(node){
      return [node.x-EPS, node.y - EPS, node.x + EPS, node.y + EPS];
    }

    function getEdgeBBox(edge){
      var x1,x2,x3,y1,y2,y3;
      x1 = edge.source.x;
      y1 = edge.source.y;
      x3 = x2 = edge.target.x;
      y3 = y2 = edge.target.x; 
      if(edge.target.index == edge.source.index){
	//edge with same source and target >> bezier curve
	var size = 2.5 * c.nodeSize;
	
	var xsize = size / c.width;
	var ysize = size / c.height;
	
	
      }else{
      }
      return [Math.min(x1,x2,x3), Math.min(y1,y2,y3), Math.max(x1,x2,x3), Math.max(y1,y2,y3)];
    }
   
    function initTree(){
      rbushtree = rbush();

      d = [];
      d.length = nodes.length + edges.length;

      for(i = 0, j = 0;i < nodes.length; i++){
	d[i] = getNodeBBox(nodes[i]);
	d[i].push({node:nodes[i]});
      }
      
      for(j = 0;j < edges.length;i++, j++){
	d[i] = getEdgeBBox(edges[j]);
	d[i].push({edge:edges[j]});
      }
      
      rbushtree.load(d);
    }
    
    
    //distance from point to point
    function distance(x1,y1,x2,y2){
      var dx = x1 - x2;
      var dy = y1 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
    
    
    //distance from point to line
    function pDistance(x, y, x1, y1, x2, y2) {
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

      var dx = x - xx;
      var dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function sortByDistances(e1, e2){
      return e1.dist - e2.dist;
    }
    
    this.find = (x,y, radius, nodes, edges) => {
      var ret = {};
      if(edges)
	ret.edges = [];
      if(nodes)
	ret.nodes = [];

      var data = rbushtree.search([x - radius, y - radius, x + radius,  y+ radius]);

      for(var i = 0; i < data.length; i++){
	var e = data[i][4];
	if(e.node && nodes){
	  var dist = distance(x,y,e.node.x,e.node.y);
	  if(dist > radius)
	    continue;

	  ret.nodes.push({node:e.node, dist: dist});
	}
	if(e.edge && edges){
	  var dist = pDistance(x,y,e.edge.source.x,e.edge.source.y,e.edge.target.x,e.edge.target.y);

	  if(dist > radius)
	    continue;
	  ret.edges.push({edge:e.edge, dist: dist});
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

    initTree();
};

module.exports = spatialIndex;

});