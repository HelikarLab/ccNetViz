/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

var ccNetViz_defaultTexts  = require('./default');
var ccNetViz_sdfTexts      = require('./sdf');
var ccNetViz_utils         = require('../utils');

class Texts {
  constructor(gl){
    this._gl = gl;

    this._modules = {
      'default': new ccNetViz_defaultTexts(gl),
      'sdf': new ccNetViz_sdfTexts(gl),
    };
  }

  clear() {
    for(let k in this._modules){
      this._modules[k].clear();
    }
  }
  
  isSDF(font){
    if(ccNetViz_utils.isObject(font)){
      if(font.SDFatlas && font.SDFmetrics){
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

};

module.exports = Texts;