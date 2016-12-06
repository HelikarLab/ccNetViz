import Protobuf from 'pbf';
import GlyphAtlas from './dynamicsdf/atlas';
import Glyphs from './dynamicsdf/glyphs';

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
const DEFAULT_SIZE = 128;
// must be "DEFAULT_SIZE * SIZE_GROWTH_RATE ^ n" for some integer n
const MAX_SIZE = 2048;

export default class {
  constructor(gl) {
    this.width = DEFAULT_SIZE;
    this.height = DEFAULT_SIZE;

    this.clear();

    this._rendered = {};
    this._texts;
    this._gl = gl;
    
    this.atlas = new GlyphAtlas(this._gl);
    this._textures = {};
    this._glyphs = {};
    this._rects = {};
  }

  get isSDF(){
    return true;
  }

  clear (){
  }

  setFont (style, files, textures, onLoad) {
    var font = style.pbf;
    
    this.curFont = font;

    this._files      = files;
    this._SDFmetrics = files.get(style.metrics);
  }
  
  get fontSize(){
    return 24;
    console.log(this._curglyphs);
    return (this._SDFmetrics || {}).size;
  }

  getTexture (style, files, textures, onLoad){
    let myOnLoad = () => {
      let data = files.load(style.pbf, onLoad, 'arraybuffer');
      
      //init first most-used ASCII chars
//      for(let i = 0; i < 128; i++){
//        this._getChar(String.fromCharCode(i));
//      }

//      onLoad && onLoad.apply(this,arguments);
    };
    

    var font = style.pbf;
    if(!this._glyphs[font]){
      let data = files.load(style.pbf, onLoad, 'arraybuffer');
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
          const rect = this.atlas.addGlyph(glyphID, this.curFont, glyph, buffer, markDirty);
          this._rects[font][text] = rect;
        }
      }
    }

    let r,rect;
    if( (r = this._rects[font]) && (rect = r[text]) ){
        const glyph = this._glyphs[font].stacks[range].glyphs[glyphID];
        
        const glS = new SimpleGlyph(glyph, rect, buffer);
        const posX = glS.rect.x;//+glS.left;
        const posY = glS.rect.y;//+glS.top;
        const horiBearingX = 3;
        const horiBearingY = 2;
        const w = glS.rect.w;
        const h = glS.rect.h;
        return {
          horiAdvance: glS.advance,
          horiBearingX: horiBearingX,
          horiBearingY: glS.rect.h,
          width: w,
          height: h,
          left: (posX) / this.atlas.width,
          right: (posX + glS.rect.w) / this.atlas.width,
          top: (posY) / this.atlas.height,
          bottom: (posY+glS.rect.h) / this.atlas.height
        };
    }
    
    return {};
  }
  
  get (text, x, y, markDirty){
    let width = 0; 
    let height = 0;

    for(let i = 0; i < text.length; i++){
      let char           = this._getChar(text[i], markDirty);
      height             = Math.max(height, char.height);
      width         += char.horiAdvance + char.horiBearingX;
    }

    let dx = x <= 0.5 ? 0 : -width ;
    let dy = y <= 0.5 ? height/4 : -height; 



    let ret = [];
    for(let i = 0; i < text.length; i++) {
      let char = this._getChar(text[i], markDirty);

      let horiAdvance;
      dx += char.horiBearingX;

      ret.push({
        cCoord: char,
        dx: dx,
        dy: dy
      });
      
      dx += char.horiAdvance; 
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