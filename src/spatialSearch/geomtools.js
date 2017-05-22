import rbush from './rbush' ;
import ccNetViz_geomutils from '../geomutils' ;
import {partitionByStyle, getPartitionStyle} from '../primitiveTools' ;

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */



const EPS = Number.EPSILON || 1e-14;




//solving cube analyticaly for bezier curves
function cuberoot(x) {
    const y = Math.pow(Math.abs(x), 1/3);
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

        const D = b*b - 4*a*c;
        if (Math.abs(D) < 1e-8)
            return [-b/(2*a)];
        else if (D > 0)
            return [(-b+Math.sqrt(D))/(2*a), (-b-Math.sqrt(D))/(2*a)];
        return [];
    }

    // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
    const p = (3*a*c - b*b)/(3*a*a);
    const q = (2*b*b*b - 9*a*b*c + 27*a*a*d)/(27*a*a*a);
    let roots;

    if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
        roots = [cuberoot(-q)];
    } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
        roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
    } else {
        const D = q*q/4 + p*p*p/27;
        if (Math.abs(D) < 1e-8) {       // D = 0 -> two roots
            roots = [-1.5*q/p, 3*q/p];
        } else if (D > 0) {             // Only one real root
            const u = cuberoot(-q/2 - Math.sqrt(D));
            roots = [u - p/(3*u)];
        } else {                        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
            const u = 2*Math.sqrt(-p/3);
            const t = Math.acos(3*q/p/u)/3;  // D < 0 implies p < 0 and acos argument in [-1..1]
            const k = 2*Math.PI/3;
            roots = [u*Math.cos(t), u*Math.cos(t-k), u*Math.cos(t-2*k)];
        }
    }

    // Convert back from depressed cubic
    for (let i = 0; i < roots.length; i++)
        roots[i] -= b/(3*a);

    return roots;
}

//function distanceToBezier(x,y,ax,ay,bx,by,cx,cy){
function distance2ToBezier(x,y,a,d,b,e,c,f){
  //based on compute derivation of: d/dt ((X - (a*(1-t)*(1-t)+2*b*t*(1-t)+c*t*t))^2 + (Y - (d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t))^2)
  
  const A =   4*a*a  - 16*a*b + 8*a*c  + 16*b*b - 16*b*c + 4*c*c  + 4*d*d  - 16*d*e + 8*d*f  + 16*e*e - 16*e*f + 4*f*f;
  const B = - 12*a*a + 36*a*b - 12*a*c - 24*b*b + 12*b*c - 12*d*d + 36*d*e - 12*d*f - 24*e*e + 12*e*f;
  const C =   12*a*a - 24*a*b + 4*a*c  - 4*a*x  + 8*b*b  + 8*b*x  - 4*c*x  + 12*d*d - 24*d*e + 4*d*f  - 4*d*y  + 8*e*e + 8*e*y - 4*f*y
  const D = - 4*a*a  + 4*a*b  + 4*a*x  - 4*b*x  - 4*d*d  + 4*d*e  + 4*d*y  - 4*e*y;
    
  const eqresult = solveCubic(A,B,C,D);
  
  
  //loop through all possible solitions to find out which point is the nearest
  let mindist = Infinity;
  for(let i = 0; i < eqresult.length; i++){
    const t = eqresult[i];
    
    if(t < 0 || t > 1)
      continue;
    
    //point at bezier curve
    const px = a*(1-t)*(1-t)+2*b*t*(1-t)+c*t*t;
    const py = d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t;
    
    const dist = distance2(x,y,px,py);
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
  let xmin = Infinity;
  let xmax = -xmin;
  let ymin = Infinity;
  let ymax = -ymin;
  
  //x of points - even indexes in array 
  for(let i = 0; i < v.length; i+=2){
    const val = v[i];
    if(val < xmin) xmin = val;
    if(val > xmax) xmax = val;
  }
  
  //y of points - odd indexes in array 
  for(let i = 1; i < v.length; i+=2){
    const val = v[i];
    if(val < ymin) ymin = val;
    if(val > ymax) ymax = val;
  }

  return [xmin, ymin, xmax, ymax];
}

//distance from point to point
function distance2(x1,y1,x2,y2){
  const dx = x1 - x2;
  const dy = y1 - y2;
  return dx * dx + dy * dy;
}

//distance from point to line
function pDistance2(x, y, x1, y1, x2, y2) {
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  if (len_sq != 0) //in case of 0 length line
      param = dot / len_sq;

  let xx, yy;

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

function lineIntersectsLine(l1p1x, l1p1y, l1p2x, l1p2y, l2p1x, l2p1y, l2p2x, l2p2y)
{
    let q = (l1p1y - l2p1y) * (l2p2x - l2p1x) - (l1p1x - l2p1x) * (l2p2y - l2p1y);
    let d = (l1p2x - l1p1x) * (l2p2y - l2p1y) - (l1p2y - l1p1y) * (l2p2x - l2p1x);

    if( d == 0 )
    {
        return false;
    }

    let r = q / d;

    q = (l1p1y - l2p1y) * (l1p2x - l1p1x) - (l1p1x - l2p1x) * (l1p2y - l1p1y);
    let s = q / d;

    if( r < 0 || r > 1 || s < 0 || s > 1 )
    {
        return false;
    }

    return true;
}

function pointInRect(px,py, x1, y1, x2, y2){
  return px >= x1 - EPS && px <= x2 + EPS && py >= y1 - EPS && py <= y2 + EPS
}

function rectIntersectsRect(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r2y){
  return p1x <= r2x &&
          p1y <= r2y &&
          p2x >= r1x &&
          p2y >= r1y;
}

function lineIntersectsRect(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r2y)
{
    if(pointInRect(p1x, p1y, r1x, r1y, r2x, r2y) || pointInRect(p2x, p2y, r1x, r1y, r2x, r2y))
      return true;
    
    return lineIntersectsLine(p1x, p1y, p2x, p2y, r1x, r1y, r2x, r1y) ||
        lineIntersectsLine(p1x, p1y, p2x, p2y, r2x, r1y, r2x, r2y) ||
        lineIntersectsLine(p1x, p1y, p2x, p2y, r2x, r2y, r1x, r2y) ||
        lineIntersectsLine(p1x, p1y, p2x, p2y, r1x, r2y, r1x, r1y);
}

function eq(a,b){
  return a >= b-EPS && a <= b+EPS;
}

function neq(a,b){
  return !eq(a,b);
}


function checkBezierTkoef(a,d,b,e,c,f,t,q,s,r,v){
  if(t < 0 || t > 1)
    return false;
  
  if(neq(v-s,0)){
    const x = (d*(1-t)*(1-t)+2*e*t*(1-t)+f*t*t)/(v-s);
    if(x < 0 || x > 1)
      return false;
  }
  
  return true;
}

function bezierIntersectsLine(a,d,b,e,c,f, q,s,r,v){
    //based on wolfram alpha: >> solve ((d*(1-x)*(1-x)+2*e*x*(1-x)+f*x*x) = s + ((-a*(x-1)*(x-1) + x*(2*b*(x-1)-c*x)+q)/(q-r))*(v - s)) for x <<

    let t;
    
    let tden = -a*s+a*v+2*b*s-2*b*v-c*s+c*v+d*q-d*r-2*e*q+2*e*r+f*q-f*r;
    if(neq(tden, 0)){
      if(neq(q-r, 0)){
        let sq1 = 2*a*s-2*a*v-2*b*s+2*b*v-2*d*r+2*e*q-2*e*r;
        let sq = sq1*sq1 - 4*(-a*s+a*v+d*q-d*r-q*v+r*s)*(-a*s+a*v+2*b*s-2*b*v-c*s+c*v+d*q-d*r-2*e*q+2*e*r+f*q-f*r);
        if(sq >= 0){
          const t1 = a*s-a*v-b*s+b*v-d*q+d*r+e*q-e*r;
  
          t = (t1-0.5*Math.sqrt(sq))/tden;
          if(checkBezierTkoef(a,d,b,e,c,f, q,s,r,v,t))
            return true;
  
          t = (t1+0.5*Math.sqrt(sq))/tden;
          if(checkBezierTkoef(a,d,b,e,c,f, q,s,r,v,t))
            return true;
        }
      }
    }

    tden = -b*s+b*v+c*s-c*v+e*q-e*r-f*q+f*r;
    if(eq(d, 2*e-f) && eq(a,2*b-c) && neq(tden, 0) && neq(q*s-q*v-r*s+r*v,0)){
      t = -2*b*s+2*b*v+c*s-c*v+2*e*q-2*e*r-f*q+f*r-q*v+r*s;
      t = t/(2*tden);
      if(checkBezierTkoef(a,d,b,e,c,f, q,s,r,v,t))
        return true;
    }

    if(eq(s,v) && eq(d,2*e-f) && neq(e-f,0) && neq(q-r,0)){
      t = (2*e-f-v)/(2*(e-f));
      if(checkBezierTkoef(a,d,b,e,c,f, q,s,r,v,t))
        return true;
    }

    let aeq = (2*b*s-2*b*v-c*s+c*v+d*q-d*r-2*e*q+2*e*r+f*q-f*r)/(s-v);
    let val = b*d*s-b*d*v-2*b*e*s+2*b*e*v+b*f*s-b*f*v-c*d*s+c*d*v+2*c*e*s-2*c*e*v-c*f*s+c*f*v-d*e*q+d*e*r+d*f*q-d*f*r+2*e*e*q-2*e*e*r-3*e*f*q+3*e*f*r+f*f*q-f*f*r;
    if(eq(a, aeq) && neq(val,0) && neq(q-r, 0)){
      t = (2*b*s-2*b*v-c*s+c*v-2*e*q+2*e*r+f*q-f*r+q*v-r*s)/(2*(b*s-b*v-c*s+c*v-e*q+e*r+f*q-f*r));
      if(checkBezierTkoef(a,d,b,e,c,f, q,s,r,v,t))
        return true;
    }

    return false;
}

function bezierIntersectsRect(a,d,b,e,c,f, r1x, r1y, r2x, r2y)
{
    if(pointInRect(a, d, r1x, r1y, r2x, r2y) || pointInRect(c, f, r1x, r1y, r2x, r2y))
      return true;
    
    const centerx = (r1x+r2x)/2;
    const centery = (r1y+r2y)/2;
    
    const diffx = r1x-r2x;
    const diffy = r1y-r2y;
    
    //performance optimalization based on distance
    let diff2xy = diffx*diffx + diffy*diffy;
    let dist2 = distance2ToBezier(centerx, centery, a,d,b,e,c,f);
    if(dist2*4 > diff2xy)
      return false;
    if(dist2*4 <= Math.min(diffx*diffx, diffy*diffy))
      return true;

    return bezierIntersectsLine(a,d,b,e,c,f, r1y, r2x, r1y, r1y) ||
        bezierIntersectsLine(a,d,b,e,c,f, r2x, r1y, r2x, r2y) ||
        bezierIntersectsLine(a,d,b,e,c,f, r2x, r2y, r1x, r2y) ||
        bezierIntersectsLine(a,d,b,e,c,f, r1x, r2y, r1x, r1y);
}

export {
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
      };
