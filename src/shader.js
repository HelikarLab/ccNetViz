define(['./gl'], function(ccNetViz_gl){

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

var shader = function(gl, vs, fs, shaderParams) {
    var program = gl.createProgram();

    gl.attachShader(program, ccNetViz_gl.createShader(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(program, ccNetViz_gl.createShader(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);

    this.uniforms = {};
    var n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < n; i++) {
        var name = gl.getActiveUniform(program, i).name;
        this.uniforms[name] = gl.getUniformLocation(program, name);
    }
    
    var attrParams = (shaderParams || {}).attribute || {};


    this.attributes = {};
    n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (var i = 0; i < n; i++) {
        var name = gl.getActiveAttrib(program, i).name;
        this.attributes[name] = { index: i, size: attrParams[name] || shader.attribute[name] || 2 };
    }

    this.bind = () => {
        gl.useProgram(program);
        for (var i = 0; i < n; i++) gl.enableVertexAttribArray(i);
    };

    this.unbind = () => {
        for (var i = 0; i < n; i++) gl.disableVertexAttribArray(i);
    };
}

shader.attribute = {
    color: 4
}

module.exports = shader;

});