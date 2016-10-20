var ccNetViz_shader = require( './shader' );
var ccNetViz_color  = require( './color' );
var ccNetViz_utils  = require( './utils' );

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

class primitive{
  constructor(gl, baseStyle, styleProperty, vs, fs, bind, shaderParams) {
    let shader = new ccNetViz_shader(gl, vs.join('\n'), fs.join('\n'), shaderParams);
    let buffers = [];
    let sections = [];   
    
    let sectionsByStyle = {};

    let e = {};
    let iV, iI, iS = 0, iB = 0;

    let partLength = (filler, part) => {
        if(filler.size){
          let n = 0;
          part.forEach( p => {
            n+=filler.size(e,p);
          });
          return n;
        }else{
          return part.length;
        }
        return;
    };
    
    let init = (filler, n) => {
        iV = iI = 0;
        let max = Math.floor(primitive.maxBufferSize / filler.numVertices);
        let nV = Math.min(max, n - (iB - iS)*max);
        let nI = nV * filler.numIndices;

        if (!e.indices || e.indices.length !== nI) {
            e.indices = new Uint16Array(nI);
            nV *= filler.numVertices;
            for (let a in shader.attributes) e[a] = new Float32Array(shader.attributes[a].size * nV);
        }
    };

//    this.set = (gl, styles, textures, data, get) => {
    this.set = (gl, styles, adder, data, get) => {
        let parts = {};
        
        let pN = {};
        for (let i = 0; i < data.length; i++) {
            let el = data[i];
            let part = parts[el.style] = parts[el.style] || [];

            el.sI = pN[el.style] = pN[el.style] === undefined ? 0 : pN[el.style]+1;
            
            part.push(el);
        }

        iS = 0;
        iB = 0;


        let store = (section) => {
            let b = buffers[iB];
            if (!b) {
                buffers[iB] = b = {};
                for (let a in e) b[a] = gl.createBuffer();
            }
            for (let a in shader.attributes) {
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

        let createStyle = style => {
            let result = {};

            let copy = s => {
                if (s) for (let p in s) result[p] = s[p];
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
        for (let p in parts) {
            iS = iB;

            let section = {
                style: createStyle(styles[p]),
                buffers: [],
                styleName: p
            };

            let filler = get(section.style);
            filler.numVertices = filler.numVertices || 4;
            filler.numIndices = filler.numIndices || 6;

            let part = parts[p];
            let pL = partLength(filler, part);
            init(filler, pL);
            let max = primitive.maxBufferSize - filler.numVertices;
            for (let i = 0; i < part.length; i++) {
                if (iV > max) {
                    store(section);
                    init(filler, pL);
                }
                filler.set(e, part[i], iV, iI);

                let s = filler.size ? filler.size(e, part[i]) : 1;
                iI += s * filler.numIndices;
                iV += s * filler.numVertices;
            }
            store(section);

            function add() {
                sections.push(this);
                sectionsByStyle[this.styleName] = this;
            }
            let addSection = add.bind(section);

            adder ? adder(section, addSection) : addSection();
        }
    }

    let fb;
    this.update = function(gl, attribute, data, get)  {
        let i = 0, size = shader.attributes[attribute].size;
        sections.forEach(function(section)  {
            let filler = get(section.style);
            filler.numVertices = filler.numVertices || 4;

            section.buffers.forEach(function(e)  {
                (!fb || fb.length !== size * e.numVertices) && (fb = new Float32Array(size * e.numVertices));
                for (let iV = 0; iV < e.numVertices; iV += (filler.size ? filler.size(e, data[i]) : 1) * filler.numVertices) filler.set(fb, data[i++], iV);
                gl.bindBuffer(gl.ARRAY_BUFFER, e[attribute]);
                gl.bufferData(gl.ARRAY_BUFFER, fb, gl.DYNAMIC_DRAW);
            });
        });
   }

   this.updateEl = (gl, el, pos, get) => {
        let storeToPos = (b, i) => {
            for (let a in shader.attributes) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
                gl.bufferSubData(gl.ARRAY_BUFFER, shader.attributes[a].size*filler.numVertices*e[a].BYTES_PER_ELEMENT*i, e[a]);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, i * filler.numIndices*e.indices.BYTES_PER_ELEMENT, e.indices);
        };

        let section = sectionsByStyle[el.style];
        
        let filler = get(section.style);
        filler.numVertices = filler.numVertices || 4;
        filler.numIndices = filler.numIndices || 6;
        
        let index = el.sI;
        
        let elsPerBuff = Math.floor(primitive.maxBufferSize/filler.numVertices);
        
        let buffer = section.buffers[Math.floor(pos / elsPerBuff)];

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
  
  static vertices(buffer, iV) {
      for (let i = 2, j = 2 * iV, n = arguments.length; i < n; i++, j++) buffer[j] = arguments[i];
  }
  
  static singles(buffer, iV) {
    for (let i = 2, j = 1 * iV, n = arguments.length; i < n; i++, j++) buffer[j] = arguments[i];
  }
  
  static colors(buffer, iV) {
    for (let i = 2, j = 4 * iV, n = arguments.length; i < n; i++) {
        let c = arguments[i];
        buffer[j++] = c.r;
        buffer[j++] = c.g;
        buffer[j++] = c.b;
        buffer[j++] = c.a;
    }
  }
  
  static indices(buffer, iV, iI){
      for (let i = 3, j = iI, n = arguments.length; i < n; i++, j++) buffer[j] = iV + arguments[i];
  }

  static quad(buffer, iV, iI) {
      primitive.indices(buffer, iV, iI, 0, 1, 2, 2, 3, 0);
  }

  static get maxBufferSize(){
    return 65536;
  } 
}

module.exports = primitive;