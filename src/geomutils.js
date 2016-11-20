/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */

export default class {
  static edgeSource(e) {
    if(e.source.source){
      //source is edge
      let s = this.edgeSource(e.source);
      let t = this.edgeTarget(e.source);
      
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
  }

  static edgeTarget (e) {
    if(e.target.source){
      //target is edge
      let s = this.edgeSource(e.target);
      let t = this.edgeTarget(e.target);
      
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
  }

  static getCurveShift (e, r){
      r = r || {};
      r.x = r.y = r.cx = r.cy = 0;
      if(!e)
        return r;
      if(e.t && e.t >= 1){	//curve or circle
        if(e.t >= 2){ //circle
          let s = this.edgeSource(e);
          let d = s.y < 0.5 ? 1 : -1;

          r.cx = d * 1.25;
          r.cy = 0;
        }else{
          let se = this.edgeSource(e);
          let te = this.edgeTarget(e);

          r.x = se.x - te.x;
          r.y = se.y - te.y;
        }
      }
      return r;
  }
};