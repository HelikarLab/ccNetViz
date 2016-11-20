import ccNetViz_gl from './gl' ;

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

var defaultAttr = {color: 4};

export default class Shader {
  constructor(gl, vs, fs, shaderParams) {
    this._gl = gl;
    this._vs = vs;
    this._fs = fs;
    
    let program = this._program = gl.createProgram();
    
    gl.attachShader(program, ccNetViz_gl.createShader(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(program, ccNetViz_gl.createShader(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);
    
    this.uniforms = {};
    let n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
        let name = gl.getActiveUniform(program, i).name;
        this.uniforms[name] = gl.getUniformLocation(program, name);
    }
    
    let attrParams = (shaderParams || {}).attribute || {};

    this.attributes = {};
    n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < n; i++) {
        let name = gl.getActiveAttrib(program, i).name;
        this.attributes[name] = { index: i, size: attrParams[name] || Shader.attribute[name] || 2 };
    }
    
  }
  
  static get attribute(){
    return defaultAttr;
  }
  
  bind () {
    this._gl.useProgram(this._program);

    let n = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < n; i++) this._gl.enableVertexAttribArray(i);
  }

  unbind () {
      let n = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < n; i++) this._gl.disableVertexAttribArray(i);
  }
  
};