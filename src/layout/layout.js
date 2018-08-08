// import layoutForce from './force' ;
// import layoutRandom from './random' ;
// import layoutCircular from './circular' ;
// import layoutTree from './tree' ;
// import layoutTreeT from './treeT' ;
// import layoutHierarchical from './hierarchical' ;
// import layoutHierarchical2 from './hierarchical2' ;
// import layoutSpectral from './spectral' ;
// import layoutSpectral2 from './spectral2' ;
// import layoutHive from './hive' ;
// import layoutGrid from './grid' ;
// import layoutVersinus from './versinus' ;

import Worker_Random from './random.worker.js';
// import Worker_Force from './force.worker.js';
// import Worker_Circular from './circular.worker.js';
// import Worker_Tree from './tree.worker.js';
// import Worker_TreeT from './treeT.worker.js';
// import Worker_Hierarchical from './hierarchical.worker.js';
// import Worker_Hierarchical2 from './hierarchical2.worker.js';
// import Worker_Spectral from './spectral.worker.js';
// import Worker_Spectral2 from './spectral2.worker.js';
// import Worker_Hive from './hive.worker.js';
// import Worker_Grid from './grid.worker.js';
// import Worker_Versinus from './versinus.worker.js';


/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

export default class {
  constructor(nodes, edges, layout, layout_options) {
    this._nodes = nodes;
    this._edges = edges;
    this._layout = layout;
    this._layout_options = layout_options;

    switch(this._layout) {
      case "random":
        this._Worker = Worker_Random;
        break;
      // case "force":
      //   this._worker = Worker_$;
      //   break;
      // case 'circular':
      //   this._worker = Worker_$;
      //   break;
      // case 'tree':
      //   this._worker = Worker_$;
      //   break;
      // case 'treeT':
      //   this._worker = Worker_$;
      //   break;
      // case 'hierarchical':
      //   this._worker = Worker_$;
      //   break;
      // case 'hierarchical2':
      //   this._worker = Worker_$;
      //   break;
      // case 'spectral':
      //   this._worker = Worker_$;
      //   break;
      // case 'spectral2':
      //   this._worker = Worker_$;
      //   break;
      // case 'hive':
      //   this._worker = Worker_$;
      //   break;
      // case 'grid':
      //   this._worker = Worker_$;
      //   break;
      // case 'versinus':
      //   this._worker = Worker_$;
      //   break;
      default:
        throw Error("Invalid layout value");     
    }
  }

  // brings values of x and y in range 0 - 1
  _normalize (nodes, dim) {
    let minX, 
    minY, 
    n = nodes.length; 

    if (dim) { 
      minX = dim.minX; 
      minY = dim.minY; 
    } else {
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
      }
    }

    let scX = minX !== dim.maxX ? 1 / (dim.maxX - minX) : ((minX -= 0.5), 1);
    let scY = minY !== dim.maxY ? 1 / (dim.maxY - minY) : ((minY -= 0.5), 1);

    for (let i = 0; i < n; i++) {
        let o = nodes[i];
        o.x = scX * (o.x - minX);
        o.y = scY * (o.y - minY);
    }
    return dim;
  }

  compute() {
    return new Promise((resolve, reject) => {
      let worker = new this._Worker();
      worker.postMessage(this._nodes);
      worker.addEventListener('message', event => {

        for (let i = 0, n = this._nodes.length; i < n; i++) {
          Object.assign(this._nodes[i], event.data[i]);
        }
        resolve(this._nodes);

      });
      worker.addEventListener('error', reject);
      this._normalize(this._nodes);
    })
  }
  
}
