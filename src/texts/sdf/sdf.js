import GlyphAtlas from './atlas';
import SpriteGenerator from './spriteGenerator';

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


// Multiplication factor by which the size will grow
const SIZE_GROWTH_RATE = 4;

// Size in which we try to contian the glyphs
const DEFAULT_SIZE = 512;

// must be "DEFAULT_SIZE * SIZE_GROWTH_RATE ^ n" for some integer n
// Maybe the maximum size allowed of the atlas
const MAX_SIZE = 2048;


// Class for the text engine

// invoked only when main configuration object, the "font" is mentioned and
// the proper link to the font file is present
export default class {

  // new text engine object takes 3 arguments
  // 1. gl = Webgl context
  // 2. files = File object programmed in src/dataSources/files.js
  // 3. texture = Texture object programmed in src/dataSources/textures.js

  constructor(gl, files, textures) {
    // Defines the dimensions of the texture
    this.width = DEFAULT_SIZE;
    this.height = DEFAULT_SIZE;

    // Does nothing. Required in default.js text engine
    this.clear();

    // _files contains the file object of the glyph obtained via protobuf
    this._files = files;

    // Webgl Rendering context
    this._gl = gl;

    // Atlas object programmed in src/texts/sdf/atlas.js
    this.atlas = new GlyphAtlas(this._gl, () => { this._cachedGlyphs = {}; });

    // For every char_id, contains position, properties and buffer data
    this._glyphs = {};

    // For every char_id, contains position and properties
    this._rects = {};

    // glyphs that are cached from previous draw call of label for next one
    this._cachedGlyphs = {};

    // Client-Side builder of spritesheet
    this.spriteGenerator = new SpriteGenerator();
  }


  // returns if we are using SDF TextEngine or not
  get isSDF() {
    return true;
  }

  // this is a dummy method to make 'interface' of sdf.js and default.js same
  clear() {
  }


  /**
   * style = object: {
   *   pbf: <url to the font file on the server>
   *   type: 'sdf' {Type of the font file & sdf => distance transformed spriteSheet}
   * }
   */
  setFont(style) {
    // curFont => current_font
    // style.pbf examplar value = http://helikarlab.github.io/ccNetViz/fonts/FineHand/0-65535.pbf
    this.curFont = style.pbf;
  }

  // FontSize is fixed and hardcoded i.e. 24
  get fontSize() {
    return 24;
  }

  //
  getTexture(style, onLoad) {
    // init with first most-used ASCII chars
    for (let i = 0; i < 128; i++) {
      // Cache the most used characters prior to the knowledge if they would be used in lables or not
      // TODO: Ideally get methods should return something which in-turn should pe passed to other variables
      this._getChar(String.fromCharCode(i));
    }
    onLoad && onLoad.apply(this, arguments);

    // by calling this._getChar, we have updated the texture in this.atlas object
    // following we are returning the updated object
    // TODO: this code is not intuitive, we can write better
    return this.atlas.texture;
  }


  /**
   * Updates the 'texture' member variable of this.atlas object
   *
   * text = single character which is to be added to the texture of 'this.atlas'
   * markDirty = ??? callback to be called if the size of the texture is resized
   */
  // TODO: parameter name should be changed from 'text' to 'char'
  _getChar(text, markDirty) {
    // curFont is same as style.pbf defined above
    // TODO: We are doing this too many times in this code. Find a better mech.
    const font = this.curFont;

    // glyphId is the character code of the glyph passed in arguments under the name 'text'
   // charCodeAt returns an integer between 0 and 65535 representing the UTF-16 code unit
   // refer https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt

    const glyphID = text.charCodeAt(0);

    // Padding around the glyph
    const buffer = 0;

    const cache = (this._cachedGlyphs[font] || (this._cachedGlyphs[font] = {}));
    const glyph = (cache[glyphID] && cache[glyphID].glyph) || this.spriteGenerator.draw(text);
    
    // Testing code for new developer, if stuck, uncomment the lines below and defined t in sdf.html
    // The code below renders a testing canvas with first alphabet it encounters
    // if you want to show more alphabets , just increase "t" in sdf.html and 
    // change ctx.putImageData(imgData, 10, 20); to something variable
    
    // if(document.getElementById("test-canvas") && typeof t !== "undefined" && t>0) {
    //   const imgData = this.spriteGenerator._makeRGBAImageData(glyph.bitmap, glyph.width, glyph.height);
    //   const testCanvas = document.getElementById("test-canvas");
    //   const ctx = testCanvas.getContext("2d");
    //   ctx.putImageData(imgData, 10, 20);
    //   --t;
    // }
    
    // After uncommenting the lines above , comment the "if" code below, this might help in debugging 

    if((document.getElementById("test-canvas") && typeof t === "undefined") || (document.getElementById("test-canvas") && t)) {

      const testCanvas = document.getElementById("test-canvas");
      testCanvas.width = 0;
      testCanvas.height = 0;
    }

    const fontSize = this.spriteGenerator.fontSize;
    
    if (!this._rects[font]) this._rects[font] = {};
    let rect = this._rects[font][text] = this.atlas.addGlyph(
      glyphID, // character id
      this.curFont, // contains url of the font file on server
      glyph, // glyph object
      buffer, // padding
      fontSize, // fontSize
      markDirty, // callback function to be called if texture resizes
    );

    return (
      cache[glyphID] ||
      (cache[glyphID] = new SimpleGlyph(
        glyph,
        rect,
        buffer)
      )
    );
  }

  get(text, x, y, markDirty) {
    let width = 0;
    let height = 0;

    const horiBearingX = 3;
    const horiBearingY = 2;

    for (let i = 0; i < text.length; i++) {
      const char = this._getChar(text[i], markDirty);
      const rect = char.rect || {};
      
     // Initially in the "get" function , height is undefined so , height = 0 , now rect.h and char.top
     //decide the height and then max of them is taken each time to have a max height that fits each char

      height = Math.max(height, rect.h - char.top);

      // addiding const horiBearingx and char.advance wo get the total width of label

      width += char.advance + horiBearingX;
    }

    
   // x and y are the clipspace co-ordinates between 0 and 1
   // dx and dy shifts the position of label w.r.t possibly node
   // (TODO: dx and dy are calculated w.r.t what is not clear , please clear it if you find out)

    let dx = x <= 0.5 ? 0 : -width;
    let dy = y <= 0.5 ? 0 : -height;



    // "ret" must be the return object. "ret" is always the return object
    let ret = [];

    for (let i = 0; i < text.length; i++) {

      const char = this._getChar(text[i], markDirty);
      const rect = char.rect || {};

      let horiAdvance;
      
      dx += horiBearingX;

      // rect.x rect.w rect.h rect.y are all atlas widths heigths x y positions etc

      ret.push({
        width: rect.w,
        height: rect.h,
        left: rect.x / this.atlas.width,
        right: (rect.x + rect.w) / this.atlas.width,
        bottom: (rect.y + rect.h) / this.atlas.height,
        top: rect.y / this.atlas.height,
        dx: dx,
        dy: dy + char.top + (height - rect.h)
      });

      dx += char.advance;
      //      dx += rect.w;
    }
    return ret;
  }

  steps(text) {
    return text.length;
  }

  bind() {
    this.atlas.updateTexture(this._gl);
  }
};
