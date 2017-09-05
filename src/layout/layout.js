import layoutForce from './force' ;
import layoutRandom from './random' ;
import layoutCircular from './circular' ;
import layoutTree from './tree' ;
import layoutTreeT from './treeT' ;
import layoutHierarchical from './hierarchical' ;
import layoutHierarchical2 from './hierarchical2' ;
import layoutSpectral from './spectral' ;
import layoutSpectral2 from './spectral2' ;
import layoutHive from './hive' ;
import layoutGrid from './grid' ;
import layoutVersinus from './versinus' ;

import ccNetViz_utils from '../utils';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

export default class {
  static get force(){
    return layoutForce;
  }
  static get random(){
    return layoutRandom;
  }
  static get circular(){
    return layoutCircular;
  }
  static get tree(){
    return layoutTree;
  }
  static get tree2(){
    return layoutTreeT;
  }
  static get hierarchical(){
    return layoutHierarchical;
  }
  static get hierarchical2(){
    return layoutHierarchical2;
  }
  static get spectral(){
    return layoutSpectral;
  }
  static get spectral2(){
    return layoutSpectral2;
  }
  static get hive(){
    return layoutHive;
  }
  static get grid(){
    return layoutGrid;
  }
  static get versinus(){
    return layoutVersinus;
  }
  
  static normalize(nodes, dim, options) {
    let minX, minY, n = nodes.length;
    
    if (dim) {
        minX = dim.minX;
        minY = dim.minY;
    }
    else {
        let maxX = -Infinity;
        let maxY = -Infinity;
        minX = minY = Infinity;
        
        for (let i = 0; i < n; i++) {
            let o = nodes[i];
            maxX = Math.max(maxX, o.x);
            maxY = Math.max(maxY, o.y);
            minX = Math.min(minX, o.x);
            minY = Math.min(minY, o.y);
        };
        
        dim = {
            maxX: maxX,
            maxY: maxY,
            minX: minX,
            minY: minY
        };
    }
    const margin = options && options.margin || 0;
    const factor = 1 - 2*margin;
    let scX = minX !== dim.maxX ? factor / (dim.maxX - minX) : ((minX -= 0.5), 1);
    let scY = minY !== dim.maxY ? factor / (dim.maxY - minY) : ((minY -= 0.5), 1);

    const direction = options && options.direction || "left-right";
    if (direction == "left-right"){
        for (let i = 0; i < n; ++i) {
            let o = nodes[i];
            o.x = scX * (o.x - minX) + margin;
            o.y = scY * (o.y - minY) + margin;
        }
    } else if (direction == "right-left"){
        for (let i=0; i<n; ++i){
            let o = nodes[i];
            o.x = 1 - (scX * (o.x - minX) + margin);
            o.y = scY * (o.y - minY) + margin;
        }
    } else if (direction == "top-down"){ 
        for (let i=0; i<n; ++i){
            let o = nodes[i];
            const foo = 1 - scX * (o.x - minX) + margin;
            o.x = scY * (o.y - minY) + margin;
            o.y = foo;
        }
    } else if (direction == "bottom-up"){ 
        for (let i=0; i<nodes.length; ++i){
            let o = nodes[i];
            const foo = scX * (o.x - minX) + margin;
            o.x = scY * (o.y - minY) + margin;
            o.y = foo;
        }
    } else { 
        throw new Error("directions can be only 'left-right' (default), 'right-left', 'top-down' or 'bottom-up'");
    }    
    return dim; // any use for this return? Should we remove it?
  }
}
