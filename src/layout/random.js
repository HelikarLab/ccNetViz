import Worker from './random.worker.js';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

export default class {
  constructor(nodes){
    this._nodes = nodes;
  }
  
  apply() {    
    
    return new Promise((resolve, reject) => {
      let worker = new Worker();
      worker.postMessage(this._nodes);
      worker.addEventListener('message', event => {
        this._nodes = event.data;
        resolve(this._nodes);
      });
      worker.addEventListener('error', reject);
    })

    // for (let i = 0, n = this._nodes.length; i < n; i++) {
    //   let o = this._nodes[i];
    //   o.x = Math.random();
    //   o.y = Math.random();
    // }


  }
};
