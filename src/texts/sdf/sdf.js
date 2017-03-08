import Protobuf from 'pbf';
import GlyphAtlas from './atlas';
import Glyphs from './glyphs';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: Aleš Saska
 */


// A simplified representation of the glyph containing only the properties needed for shaping.
class SimpleGlyph {
    constructor(glyph, rect, buffer) {
        const padding = 1;
        this.advance = glyph.advance;
        this.left = glyph.left - buffer - padding;
        this.top = glyph.top + buffer + padding;
        this.rect = rect;
    }
}




const SIZE_GROWTH_RATE = 4;
const DEFAULT_SIZE = 512;
// must be "DEFAULT_SIZE * SIZE_GROWTH_RATE ^ n" for some integer n
const MAX_SIZE = 2048;

export default class {
  constructor(gl, files, textures) {
    this.width = DEFAULT_SIZE;
    this.height = DEFAULT_SIZE;

    this.clear();

    this._files    = files;
    
    this._rendered = {};
    this._texts;
    this._gl = gl;

    this.atlas = new GlyphAtlas(this._gl, () => { this._cachedGlyphs = {}; });
    this._textures = {};
    this._glyphs = {};
    this._rects = {};
    this._cachedGlyphs = {};
  }

  get isSDF(){
    return true;
  }

  clear (){
  }

  setFont (style) {
    this.curFont = style.pbf;
  }
  
  get fontSize(){
    return 24;
  }

  getTexture (style, onLoad){
    let myOnLoad = ((onL) => {
      return () => {
        let data = this._files.load(style.pbf, onLoad, 'arraybuffer');
        
        //init first most-used ASCII chars
        for(let i = 0; i < 128; i++){
          this._getChar(String.fromCharCode(i));
        }
        
        onL && onL.apply(this,arguments);
      }
    })(onLoad);
    

    var font = style.pbf;
    if(!this._glyphs[font]){
      let data = this._files.load(style.pbf, myOnLoad, 'arraybuffer');
      this._curglyphs = this._glyphs[font] = data && new Glyphs(new Protobuf(data));
    }else{
      myOnLoad();
    }

    return this.atlas.texture;
  }

  _getChar(text, markDirty){
    const font = this.curFont;
    const glyphID = text.charCodeAt(0);

    const buffer = 3;
    const range = Math.floor(glyphID / 256);

    if(this._glyphs[font]){
      const g = this._glyphs[font];
      if(g){
        const stack = g.stacks[range];
        if(stack){
          const glyph = stack.glyphs[glyphID];
          if(!this._rects[font]) this._rects[font] = {}; 
          
          this._rects[font][text] = this.atlas.addGlyph(glyphID, this.curFont, glyph, buffer, markDirty);
        }
      }
    }

    let r,rect;
    if( (r = this._rects[font]) && (rect = r[text])){
        let cache = (this._cachedGlyphs[font] || (this._cachedGlyphs[font] = {}));
        return cache[glyphID] || ( cache[glyphID] = new SimpleGlyph(this._glyphs[font].stacks[range].glyphs[glyphID], rect, buffer));
    }

    return {};
  }

  get (text, x, y, markDirty){
    let width = 0; 
    let height = 0;

    const horiBearingX = 3;
    const horiBearingY = 2;

    for(let i = 0; i < text.length; i++){
      const char           = this._getChar(text[i], markDirty);
      const rect           = char.rect || {};
      height               = Math.max(height, rect.h - char.top);
      width               += char.advance + horiBearingX;
//      width               += rect.w + horiBearingX;
    }

    let dx = x <= 0.5 ? 0 : -width ;
    let dy = y <= 0.5 ? 0 : -height ; 



    let ret = [];
    for(let i = 0; i < text.length; i++) {
      const char = this._getChar(text[i], markDirty);
      const rect = char.rect || {};

      let horiAdvance;

      dx += horiBearingX;

      ret.push({
        width:  rect.w,
        height: rect.h,
        left:   rect.x / this.atlas.width,
        right:  ( rect.x + rect.w ) / this.atlas.width,
        bottom: ( rect.y + rect.h ) / this.atlas.height,
        top:    rect.y / this.atlas.height,
        dx:     dx,
        dy:     dy + char.top + ( height - rect.h )
      });

      dx += char.advance;
//      dx += rect.w;
    }
    return ret;
  }

  steps (text) {
    return text.length;
  }
  
  bind (){
    this.atlas.updateTexture(this._gl);
  }
};