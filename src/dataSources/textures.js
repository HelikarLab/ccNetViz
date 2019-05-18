import ccNetViz_utils from '../utils' ;
import ccNetViz_gl from '../gl' ;

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

// this file creates webGL type textures of images example custom.html

export default class {
  constructor(events, onLoad){
    this._load = [events.debounce(onLoad, 5)];
    this._textures = {}; //already converted to textures
    this._pending = {}; //pending images 
    this._n = 0;  //counts pending images to be converted to textures
  }

  get(gl, img, action, options) { 
      var p = this._pending[img];
      var t = this._textures[img];

      
      // TODO : add explanation about if-else statements below
      if (p) {
          p.push(action);
      }
      else if (t) {
          action && action();
      }

      // if image is neither in this._pending array nor nor in already converted this._textures array
      //add the image to the pending, then convert it to texture on line ccNetViz_gl.createTexture(gl, img,function)
      // and remove it from pending + add it to textures
      
      else {
          p = this._pending[img] = [action];
          this._n++;
          this._textures[img] = t = ccNetViz_gl.createTexture(gl, img, () => {
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