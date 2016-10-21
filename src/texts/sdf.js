/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: Aleš Saska
 */

class SDFTexts{
  constructor() {
    this._rendered = {};
    this._texts;
  }
  
  get isSDF(){
    return true;
  }
  
  clear (){
    this._rendered = {};
  }

  setFont (style, files, textures, gl, onLoad) {
    var font = style.font;
    this._rendered[font] = this._texts = this._rendered[font] || {};
    
    this.texture = this.getTexture(style, files, textures, gl, onLoad);
    this._files      = files;
    this._SDFmetrics = files.get(style.SDFmetrics);
  }

  getTexture (style, files, textures, gl, onLoad){
    
    //handler to wait until both atlas (texture) and metrics (json file) are loaded
    let onL = (() => {
      let loaded = {};

      return (k) => {
        loaded[k] = true;

        if(loaded.SDFmetrics && loaded.SDFatlas){
          onLoad && onLoad();
        }
      }
    })();
    
    files.load(style.SDFmetrics, () => {onL('SDFmetrics');}, 'json');
    return textures.get(gl, style.SDFatlas, () => {onL('SDFatlas');}, {sdf: true});
  }
  
  _getChar(text){
    var result  = this._texts[text];
    let metrics = this._SDFmetrics;
    if(!metrics)
      return {};
    
    if (!result) {
      let canvas = this.texture.image;

      let buffer = metrics.buffer;
    
      var char = metrics.chars[text];
      var width = char[0] + buffer * 2;
      var height = char[1] + buffer * 2;
      var horiBearingX = char[2];
      var horiBearingY = char[3];
      var horiAdvance = char[4];
      var posX = char[5];
      var posY = char[6];
      this._texts[text] = result = {
        horiAdvance: horiAdvance,
        horiBearingX: horiBearingX,
        horiBearingY: horiBearingY,
        width: width,
        height: height,
        left: (posX) / canvas.width,
        right: (posX + width) / canvas.width,
        top: (posY) / canvas.height,
        bottom: (posY+height) / canvas.height
      };
    }
    return result;
  }
  
  get (text, x, y){
    let width = 0; 
    let height = 0;

    for(let i = 0; i < text.length; i++){
      let char           = this._getChar(text[i]);
      height             = Math.max(height, char.height);
      if(char.horiAdvance) {
        /*
            We prepare for the atlas coordinates, which generate in our library ccNetViz
            */
          width         += char.horiAdvance + char.horiBearingX;
      } else {
          /*
            We prepare the coordinates for the atlas, which is created on the server
            */
          width         += char.width;
      }
    }

    let dx = x <= 0.5 ? 0 : -width ;
    let dy = y <= 0.5 ? height / 2 : -height; 
    
    let ret = [];
    for(let i = 0; i < text.length; i++) {
      let char = this._getChar(text[i]);

      let horiAdvance;
      let temp_dy = dy;
      if(char.horiAdvance) {
          /*
            We prepare for the atlas coordinates, which generate in our library ccNetViz
            */
          let horiBearingX = char.horiBearingX;
          let horiBearingY = char.horiBearingY;
          horiAdvance = char.horiAdvance;
          dy -= (char.height - horiBearingY);
          dx += horiBearingX;
      }

      ret.push({
        cCoord: char,
        dx: dx,
        dy: dy
      });
      
      dy = temp_dy;
      if(char.horiAdvance) {
          dx += horiAdvance; 
      } else {
          dx += char.width;
      }
    }
    return ret;
  }

  steps (text) {
    return text.length;
  }
  
  bind (){
  }
};

module.exports = SDFTexts;