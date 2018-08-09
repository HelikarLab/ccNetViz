/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

import Worker_Random from './random.worker.js';
import Worker_Force from './force.worker.js';
import Worker_Circular from './circular.worker.js';
import Worker_Tree from './tree.worker.js';
// import Worker_TreeT from './treeT.worker.js';
// import Worker_Hierarchical from './hierarchical.worker.js';
// import Worker_Hierarchical2 from './hierarchical2.worker.js';
import Worker_Spectral from './spectral.worker.js';
// import Worker_Spectral2 from './spectral2.worker.js';
import Worker_Hive from './hive.worker.js';
// import Worker_Grid from './grid.worker.js';
// import Worker_Versinus from './versinus.worker.js';

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
      case "force":
        this._Worker = Worker_Force;
        break;
      case 'circular':
        this._Worker = Worker_Circular;
        break;
      case 'tree':
        this._Worker = Worker_Tree;
        break;
      // case 'treeT':
      //   this._Worker = Worker_TreeT;
      //   break;
      // case 'hierarchical':
      //   this._Worker = Worker_Hierarchical;
      //   break;
      // case 'hierarchical2':
      //   this._Worker = Worker_Hierarchical2;
      //   break;
      case 'spectral':
        this._Worker = Worker_Spectral;
        break;
      // case 'spectral2':
      //   this._Worker = Worker_Spectral2;
      //   break;
      case 'hive':
        this._Worker = Worker_Hive;
        break;
      // case 'grid':
      //   this._Worker = Worker_Grid;
      //   break;
      // case 'versinus':
      //   this._Worker = Worker_Versinus;
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
      
      worker.postMessage({nodes: this._nodes, edges: this._edges, layout_options: this.layout_options});
      worker.addEventListener('message', event => {

        if (event.data.nodes) {
          for (let i = 0, n = this._nodes.length; i < n; i++) {
            Object.assign(this._nodes[i], event.data.nodes[i]);
          }
        }

        if (event.data.edges) {
          for (let i = 0, n = this._nodes.length; i < n; i++) {
            Object.assign(this._edges[i], event.data.edges[i]);
          }
        }
        
        this._normalize(this._nodes);
        resolve(this._nodes);

      });
      worker.addEventListener('error', reject);
    })
  }
  
}
