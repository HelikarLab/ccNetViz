'use strict';

import ShelfPack from 'shelf-pack';

// size of the spritesheet generated in pixels
const DEFAULT_SIZE = 1024;

// multiplication factor by which spritesheet can grow, if shelfpack is full
const SIZE_GROWTH_RATE = 4;

// max size to contain all the characters in the spritesheet
// must be "DEFAULT_SIZE * SIZE_GROWTH_RATE ^ n" for some integer n
const MAX_SIZE = 2048;

export default class GlyphAtlas {
  constructor(gl, resetCache) {
    // setting width to default
    this.width = DEFAULT_SIZE;

    // setting height to default
    this.height = DEFAULT_SIZE;

    // resets cached glyphs in sdf.js before making resize() call
    this._resetCache = resetCache;

    // creating an empty spritesheet to pack glyphs
    this.bin = new ShelfPack(this.width, this.height);

    /**
     * stores information coordinate about character
     *
     * (Object):
     *  "fontstring#charid": {
     *      id, x, y, h, w, maxh, maxw, ref_count
     *  }
     */
    this.index = {};

    /**
     * stores list of character ids available in atlas.js
     *
     * (Object):
     *  "fontstring#charid": ["charid"]
     */
    this.ids = {};

    // webgl rendering context
    this.gl = gl;

    // initialized to empty Uint8Array buffer to store texture data
    this.data = new Uint8Array(this.width * this.height);
  }

  // refreshes texture of characters when updateTexture() is called
  _createTexture() {
    //
    this.dirty = false;

    // standard creation of webgl texture
    let gl = this.gl;
    let texture = gl.createTexture();
    // binds texture buffer to the target (gl.TEXTURE_2D = a 2 dimensional texture)
    gl.bindTexture(gl.TEXTURE_2D, texture);

    /**
     * pixelStorei() (Func): specifies the pixel storage modes
     * UNPACK_FLIP_Y_WEBGL (Parameter): Flips the source data along its vertical axis if true.
     */
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    // standard interpolation Filters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // specifies a two-dimensional image for texture buffer stored in variable named "texture"
    gl.texImage2D(
      gl.TEXTURE_2D, // target: A two-dimensional texture
      0, // level of detail: 0 = base image level; n = nth mipmap reduction level
      gl.ALPHA, // internalFormat: only reads the alpha component
      this.width, // width
      this.height, // height
      0, // border
      gl.ALPHA, // format
      gl.UNSIGNED_BYTE, // type
      this.data // ImageData object
    );

    // Unbinding the buffer channel
    gl.bindTexture(gl.TEXTURE_2D, null);

    // returning so formed texture
    return texture;
  }

  // utility function that returns list of glyphs added
  getGlyphs() {
    const glyphs = {};
    let split, name, id;

    for (const key in this.ids) {
      split = key.split('#');
      name = split[0];
      id = split[1];

      if (!glyphs[name]) glyphs[name] = [];
      glyphs[name].push(id);
    }
    return glyphs;
  }

  // utility function that returns list of rects added
  getRects() {
    const rects = {};
    let split, name, id;

    for (const key in this.ids) {
      split = key.split('#');
      name = split[0];
      id = split[1];

      if (!rects[name]) rects[name] = {};
      rects[name][id] = this.index[key];
    }
    return rects;
  }

  // main function of the module called from sdf.js
  addGlyph(
    id, // character id
    name, // name of the font - "fontstrong#range.pbf"
    glyph, // glyph object from sdf.js
    buffer, // padding around glyph
    fontSize,
    markDirty //
  ) {
    if (!glyph) return null;

    // compiles 'name' and glyph.id into a single string with a seperator '#'
    const key = `${name}#${glyph.id}`;

    // if key is present in index and not present in ids then add it in ids
    if (this.index[key]) {
      if (this.ids[key].indexOf(id) < 0) {
        this.ids[key].push(id);
      }
      return this.index[key];
    }

    const bufferedWidth = glyph.width + buffer * 2;
    const bufferedHeight = glyph.height + buffer * 2;

    // Add a 1px border around every image.
    // 'padding' variable is basically border
    // buffer variable is basically padding
    const padding = Math.floor(Math.pow(Math.ceil(fontSize / 7), 2));
    // const padding = 12;
    let packWidth = bufferedWidth + 2 * padding;
    let packHeight = bufferedHeight + 2 * padding;

    // Increase to next number divisible by 4, but at least 1.
    // This is so we can scale down the texture coordinates and pack them into fewer bytes
    packWidth += 4 - (packWidth % 4);
    packHeight += 4 - (packHeight % 4);

    let rect = this.bin.packOne(packWidth, packHeight);

    // if the current size is not sufficient to contain all the characters in the texture
    // then, expand (resize) it
    if (!rect) {
      this.resize();
      rect = this.bin.packOne(packWidth, packHeight);
      // if markDirty callback was passed then execute it
      markDirty && markDirty();
    }

    // if still not found then there is some problem, simply return null to indicate problem
    if (!rect) {
      return null;
    }

    this.index[key] = rect;
    this.ids[key] = [id];

    // if bitmap corresponding to the glyph object exists then, add the glyph
    if (glyph.bitmap) {
      const target = this.data;
      const source = glyph.bitmap;
      for (let y = 0; y < bufferedHeight; y++) {
        const y1 = this.width * (rect.y + y + padding) + rect.x + padding;
        const y2 = bufferedWidth * y;
        for (let x = 0; x < bufferedWidth; x++) {
          target[y1 + x] = source[y2 + x];
        }
      }
    }
    this.dirty = true;
    return rect;
  }

  // expands the size of the texture if all the characters were not contained in default size
  resize() {
    const prevWidth = this.width;
    const prevHeight = this.height;

    if (prevWidth >= MAX_SIZE || prevHeight >= MAX_SIZE) return;

    if (this._texture) {
      if (this.gl) {
        this.gl.deleteTexture(this._texture);
      }
      this._texture = null;
    }

    this.width *= SIZE_GROWTH_RATE;
    this.height *= SIZE_GROWTH_RATE;
    this.bin.resize(this.width, this.height);

    const buf = new ArrayBuffer(this.width * this.height);
    for (let i = 0; i < prevHeight; i++) {
      const src = new Uint8Array(this.data.buffer, prevHeight * i, prevWidth);
      const dst = new Uint8Array(
        buf,
        prevHeight * i * SIZE_GROWTH_RATE,
        prevWidth
      );
      dst.set(src);
    }
    this.data = new Uint8Array(buf);
    this._resetCache();
  }

  bind(gl) {}

  // getter of texture from GlyphAtlas object
  get texture() {
    if (!this._texture) {
      this._texture = this._createTexture();
    }
    return this._texture;
  }

  updateTexture() {
    let gl = this.gl;
    if (!this._texture) {
      this._texture = this._createTexture();
    }

    // if dirty functionality is true then:
    if (this.dirty) {
      gl.bindTexture(gl.TEXTURE_2D, this._texture);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

      // specifies a sub - rectangle of the current texture
      gl.texSubImage2D(
        gl.TEXTURE_2D,
        0,
        0,
        0,
        this.width,
        this.height,
        gl.ALPHA,
        gl.UNSIGNED_BYTE,
        this.data
      );
      gl.bindTexture(gl.TEXTURE_2D, null);
      this.dirty = false;
    }
    return this._texture;
  }
}
