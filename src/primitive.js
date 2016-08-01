define(['./shader', './color'], function(ccNetViz_shader,ccNetViz_color){

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

var primitive = function(gl, baseStyle, styleProperty, vs, fs, bind, shaderParams) {
    var shader = new ccNetViz_shader(gl, vs.join('\n'), fs.join('\n'), shaderParams);
    var buffers = [];
    var sections = [];   
    
    var sectionsByStyle = {};

    var e = {};
    var iV, iI, iS = 0, iB = 0;

    var init = (filler, n) => {
        iV = iI = 0;
        var max = Math.floor(primitive.maxBufferSize / filler.numVertices);
        var nV = Math.min(max, n - (iB - iS)*max);
        var nI = nV * filler.numIndices;

        if (!e.indices || e.indices.length !== nI) {
            e.indices = new Uint16Array(nI);
            nV *= filler.numVertices;
            for (var a in shader.attributes) e[a] = new Float32Array(shader.attributes[a].size * nV);
        }
    };
    
    this.set = (gl, styles, textures, data, get) => {
        var parts = {};
        
        var pN = {};
        for (var i = 0; i < data.length; i++) {
            var el = data[i];
            var part = parts[el.style] = parts[el.style] || [];

            el.sI = pN[el.style] = pN[el.style] === undefined ? 0 : pN[el.style]+1;
            
            part.push(el);
        }

        iS = 0;
        iB = 0;


        var store = (section) => {
            var b = buffers[iB];
            if (!b) {
                buffers[iB] = b = {};
                for (var a in e) b[a] = gl.createBuffer();
            }
            for (var a in shader.attributes) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
                gl.bufferData(gl.ARRAY_BUFFER, e[a], gl.STATIC_DRAW);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, e.indices, gl.STATIC_DRAW);
            b.numIndices = iI;
            b.numVertices = iV;
            section.buffers.push(b);
            iB++;
        };

        var createStyle = style => {
            var result = {};

            var copy = s => {
                if (s) for (var p in s) result[p] = s[p];
            };

            copy(baseStyle);
            copy(style);

            if (styleProperty) {
                copy(baseStyle[styleProperty]);
                style && copy(style[styleProperty]);
            }
            result.color = result.color && new ccNetViz_color(result.color);
            return result;
        };

        sections = [];
        for (var p in parts) {
            iS = iB;

            var section = {
                style: createStyle(styles[p]),
                buffers: [],
                styleName: p
            };

            var filler = get(section.style);
            filler.numVertices = filler.numVertices || 4;
            filler.numIndices = filler.numIndices || 6;

            var part = parts[p];
            init(filler, part.length);
            var max = primitive.maxBufferSize - filler.numVertices;
            for (var i = 0; i < part.length; i++, iV += filler.numVertices, iI += filler.numIndices) {
                if (iV > max) {
                    store(section);
                    init(filler, part.length);
                }
                filler.set(e, part[i], iV, iI);
            }
            store(section);

            function add() {
                sections.push(this);
                sectionsByStyle[this.styleName] = this;
            }
            var addSection = add.bind(section);

            typeof section.style.texture === 'string' ? section.style.texture = textures.get(gl, section.style.texture, addSection) : addSection();
        }
    }

    var fb;
    this.updateEl = (gl, el, pos, get) => {
        var storeToPos = (b, i) => {
            for (var a in shader.attributes) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
                gl.bufferSubData(gl.ARRAY_BUFFER, shader.attributes[a].size*filler.numVertices*e[a].BYTES_PER_ELEMENT*i, e[a]);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, i * filler.numIndices*e.indices.BYTES_PER_ELEMENT, e.indices);
        };

        var section = sectionsByStyle[el.style];
        
        var filler = get(section.style);
        filler.numVertices = filler.numVertices || 4;
        filler.numIndices = filler.numIndices || 6;
        
        var index = el.sI;
        
        var elsPerBuff = Math.floor(primitive.maxBufferSize/filler.numVertices);
        
        var buffer = section.buffers[Math.floor(pos / elsPerBuff)];

        iB=iS=0;
        init(filler, 1);

        filler.set(e, el, 0, 0);

        storeToPos(buffer, pos);
    };

    this.draw = (context) => {
        context.shader = shader;
        shader.bind();

        gl.uniformMatrix4fv(shader.uniforms.transform, false, context.transform);

        sections.forEach(section => {
            if (section.style.texture) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, section.style.texture);
                gl.uniform1i(shader.uniforms.texture, 0);
            }

            context.style = section.style;
            if (bind(context)) return;

            section.buffers.forEach(e => {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, e.indices);

                for (var a in shader.attributes) {
                    var attribute = shader.attributes[a];
                    gl.bindBuffer(gl.ARRAY_BUFFER, e[a]);
                    gl.vertexAttribPointer(attribute.index, attribute.size, gl.FLOAT, false, 0, 0);
                }

                gl.drawElements(gl.TRIANGLES, e.numIndices, gl.UNSIGNED_SHORT, 0);
            });
        });

        shader.unbind();
    }
}

primitive.vertices = function(buffer, iV) {
    for (var i = 2, j = 2 * iV, n = arguments.length; i < n; i++, j++) buffer[j] = arguments[i];
}

primitive.singles = function(buffer, iV) {
    for (var i = 2, j = 1 * iV, n = arguments.length; i < n; i++, j++) buffer[j] = arguments[i];
}

primitive.colors = function(buffer, iV) {
    for (var i = 2, j = 4 * iV, n = arguments.length; i < n; i++) {
        var c = arguments[i];
        buffer[j++] = c.r;
        buffer[j++] = c.g;
        buffer[j++] = c.b;
        buffer[j++] = c.a;
    }
}

primitive.indices = function(buffer, iV, iI) {
    for (var i = 3, j = iI, n = arguments.length; i < n; i++, j++) buffer[j] = iV + arguments[i];
}

primitive.quad = function(buffer, iV, iI) {
    primitive.indices(buffer, iV, iI, 0, 1, 2, 2, 3, 0);
}

primitive.maxBufferSize = 65536;

module.exports = primitive;
});