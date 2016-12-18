/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

import ccNetViz_defaultTexts  from './default';
import ccNetViz_sdfTexts      from './sdf/sdf';
import ccNetViz_utils         from '../utils';

export default class {
  constructor(gl, files, textures){
    this._gl = gl;

    this._modules = {
      'default': new ccNetViz_defaultTexts(gl, files, textures),
      'sdf': new ccNetViz_sdfTexts(gl, files, textures),
    };
  }

  clear() {
    for(let k in this._modules){
      this._modules[k].clear();
    }
  }
  
  isSDF(font){
    if(ccNetViz_utils.isObject(font)){
      if(font.type === 'sdf' && font.pbf){
        return true;
      }
    }
    return false;
  }
  
  getEngine(font) {
    if(this.isSDF(font)){
      return this._modules.sdf;
    }
    return this._modules.default;
  }

  bind () {
    for(let k in this._modules){
      this._modules[k].bind();
    }
  }
  
  remove () {
    for(let k in this._modules){
      this._modules[k].remove && this._modules[k].remove();
    }
  }

};