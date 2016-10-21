var ccNetViz_utils = require( '../utils' );
var ccNetViz_gl = require( '../gl' );

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

class Textures {
  constructor(onLoad){
    this._load = [ccNetViz_utils.debounce(onLoad, 5)];
    this._textures = {};
    this._pending = {};
    this._n = 0;
  }

  get(gl, img, action, options) {
      var p = this._pending[img];
      var t = this._textures[img];

      if (p) {
          p.push(action);
      }
      else if (t) {
          action && action();
      }
      else {
          p = this._pending[img] = [action];
          this._n++;
          this._textures[img] = t = ccNetViz_gl.createTexture(gl, img, () => {
	      console.log('Onload texture '+img);
              p.forEach(a => a && a());
              delete this._pending[img];
              --this._n || this._load.forEach(l => l());
          }, options);
      }
      return t;
  }

  onLoad (action) {
    if(this.allLoaded())
      action();
    else
      this._load.push(action);
  }
  
  allLoaded(){
    return ccNetViz_utils.emptyObject(this._pending);
  }

}

module.exports = Textures;