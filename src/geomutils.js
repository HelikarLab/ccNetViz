define(function(){

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */

var geomutils = function() {};

geomutils.edgeSource = function(e) {
  if(e.source.source){
    //source is edge
    var s = geomutils.edgeSource(e.source);
    var t = geomutils.edgeTarget(e.source);
    
    return {
            x: (s.x+t.x)/2, 
            y: (s.y+t.y)/2, 
            uniqid: e.uniqid, 
            index: e.index, 
            is_edge: true, 
            e: e.source
    };
  }
  
  return e.source;
};

geomutils.edgeTarget = function(e) {
  if(e.target.source){
    //target is edge
    var s = geomutils.edgeSource(e.target);
    var t = geomutils.edgeTarget(e.target);
    
    return {
            x: (s.x+t.x)/2,
            y: (s.y+t.y)/2,
            uniqid: e.uniqid,
            index: e.index,
            is_edge: true,
            e: e.target
    };
  }

  return e.target;
};

geomutils.getCurveShift = (e ,r) => {
    r = r || {};
    r.x = r.y = r.cx = r.cy = 0;
    if(!e)
      return r;
    if(e.t && e.t >= 1){	//curve or circle
      if(e.t >= 2){ //circle
	var s = geomutils.edgeSource(e);
	var d = s.y < 0.5 ? 1 : -1;
	
	r.cx = d * 1.25;
	r.cy = 0;
      }else{
	var se = geomutils.edgeSource(e);
	var te = geomutils.edgeTarget(e);

	r.x = se.x - te.x;
	r.y = se.y - te.y;
      }
    }
    return r;
};



module.exports = geomutils;

});