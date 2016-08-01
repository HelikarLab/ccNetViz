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
    
    return {x: (s.x+t.x)/2, y: (s.y+t.y)/2, uniqid: e.uniqid, index: e.index};
  }
  
  return e.source;
};

geomutils.edgeTarget = function(e) {
  if(e.target.source){
    //target is edge
    var s = geomutils.edgeSource(e.target);
    var t = geomutils.edgeTarget(e.target);
    
    return {x: (s.x+t.x)/2, y: (s.y+t.y)/2, uniqid: e.uniqid, index: e.index};
  }

  return e.target;
};

module.exports = geomutils;

});