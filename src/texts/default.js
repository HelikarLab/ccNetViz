/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

export default class {
  constructor(gl, files, textures){
    this._gl = gl;
    this._size = 1024;

    
    this._canvas = document.createElement("canvas");
    this._canvas.width = this._canvas.height = this._size;
    this._canvas.style.width = this._canvas.style.height = this._size + 'px';
    this._canvas.style.display = "none";
    this._el = document.body.appendChild(this._canvas);

    this._context = this._canvas.getContext('2d');
    this._context.fillStyle = "white";
    this._context.textAlign = "left";
    this._context.textBaseline = "top";

    this._rendered = this._texts = this._x = this._y = this._height = undefined;

    this.texture = this._gl.createTexture();
    
  }

  clear() {
    this._rendered = {};
    this._context.clearRect(0, 0, this._size, this._size);
    this._height = this._x = this._y = 0;
  }

  setFont (font) {
    var fontstr = font ? font.size+"px "+font.type : undefined;
    
    this._rendered [fontstr] = this._texts = this._rendered [fontstr] || {};
    this._context.font = fontstr;
    this._x = 0;
    this._y += this._height;
    this._height = font ? font.size + 1 : NaN;
  }
  
  get fontSize(){
    return this._height - 1;
  }
  
  getTexture (style, onLoad){
    onLoad();
    return this.texture;
  }

  _getText (text) {
    let result = this._texts[text];
    if (!result) {
        let width = this._context.measureText(text).width;
        if (this._x + width > this._size) {
            this._x = 0;
            this._y += this._height;
        }
        this._context.fillText(text, this._x, this._y);
        this._texts[text] = result = {
            width: width,
            height: this._height,
            left: this._x / this._size,
            right: (this._x + width) / this._size,
            top: this._y / this._size,
            bottom: (this._y + this._height) / this._size
        };
        this._x += width;
    }
    return result;
  }
  
  get (text, x, y) {
    let c = this._getText(text);
    
    let dx = x <= 0.5 ? 0 : -c.width ;
    let dy = y <= 0.5 ? 0 : -c.height;
    
    return [{
        width:  c.width,
        height: c.height,
        left:   c.left,
        right:  c.right,
        top:    c.top,
        bottom: c.bottom,
        dx: dx,
        dy: dy
      }];
  }
  
  steps (text) {
    return 1;
  }

  bind () {
    this._gl.bindTexture(this._gl.TEXTURE_2D, this.texture);
    this._gl.pixelStorei(this._gl.UNPACK_FLIP_Y_WEBGL, false);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
    this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
    this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, this._canvas);
    this._gl.bindTexture(this._gl.TEXTURE_2D, null);
  }
  
  remove () {
    this._context && this._el.parentNode.removeChild(this._el);
  }

};