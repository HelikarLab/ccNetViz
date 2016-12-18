import ccNetViz_shader from './shader' ;
import ccNetViz_utils  from './utils' ;
import {getPartitionStyle} from './primitiveTools';


/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */



export default class primitive{
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

    let zerofiller =  {
      set: (v, iV, iI, numVertices, numIndices) => {
        let indicesarr = [v.indices, iV, iI];
        for(let i = 0; i < numIndices; i++)
          indicesarr.push(0);

        let verticesarr = [undefined, iV, iI];
        for(let i = 0; i < numVertices; i++)
          verticesarr.push(0);

        for(var k in v){
          if(k === 'indices'){
            primitive.indices.apply(this, indicesarr);
          }else{
            verticesarr[0] = v[k];
            primitive.vertices.apply(this, verticesarr);
          }
        }
      }
    }
    
    this.set = (gl, styles, adder, data, parts, get) => {
        var isDirty = false;
      
        iS = 0;
        iB = 0;

        this._iIs = new Uint32Array(data.length);
        this._iVs = new Uint32Array(data.length);
        this._iBs = new Uint8Array(data.length);
        this._sizes = new Uint8Array(data.length);


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

        sections = [];
        for (let p in parts) {
            iS = iB;

            let section = {
                style: getPartitionStyle(styles[p], baseStyle, styleProperty),
                buffers: [],
                styleName: p
            };

            let filler = get(section.style);
            filler.numVertices = filler.numVertices || 4;
            filler.numIndices = filler.numIndices || 6;

            let part = parts[p];

            let pL = partLength(filler, part);
            init(filler, pL);
            let max = primitive.maxBufferSize;
            for (let i = 0; i < part.length; i++) {
                let s = filler.size ? filler.size(e, part[i]) : 1;
                let niV = iV + s * filler.numVertices;
                let niI = iI + s * filler.numIndices;

                if (niV >= max) {
                    store(section);
                    init(filler, pL);
                    niV = iV;
                    niI = iI;
                }


                if(filler.set(e, part[i], iV, iI))
                  isDirty = true;


                let idx = part.idx[i];
                this._iIs[idx] = iI;
                this._iVs[idx] = iV;
                this._iBs[idx] = iB;
                this._sizes[idx] = s;

                iI = niI;
                iV = niV;
            }
            store(section);

            function add() {
                sections.push(this);
                sectionsByStyle[this.styleName] = this;
            }
            let addSection = add.bind(section);

            adder ? adder(section, addSection) : addSection();
        }
        
        return isDirty;
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
        let storeToPos = (b, iV, iI) => {
            for (let a in shader.attributes) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b[a]);
                gl.bufferSubData(gl.ARRAY_BUFFER, shader.attributes[a].size*iV*e[a].BYTES_PER_ELEMENT, e[a]);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.indices);
            gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, iI*e.indices.BYTES_PER_ELEMENT, e.indices);
        };

        let section = sectionsByStyle[el.style];
        
        let filler = get(section.style);
        filler.numVertices = filler.numVertices || 4;
        filler.numIndices = filler.numIndices || 6;
             
        iB=iS=0;

        let buffer = section.buffers[this._iBs[pos]];
        let s = filler.size ? filler.size(buffer, el) : 1;
        let olds = this._sizes[pos];
        if(s > olds){
          console.error('Cannot set primitive to new value which has greater size ('+s+" > "+olds+") - no enough empty space to fill in GL buffer");
          return;
        }

        init(filler, olds);
        filler.set(e, el, 0, 0);

        for(;s < olds; s++){
          //zero fill empty spaces
          zerofiller.set(e, s*filler.numVertices, s*filler.numIndices, filler.numVertices, filler.numIndices);
        }

        let iV = this._iVs[pos];
        let iI = this._iIs[pos];
        storeToPos(buffer, iV, iI);
    };

    this.draw = (context) => {
        context.shader = shader;
        shader.bind();

        gl.uniformMatrix4fv(shader.uniforms.transform, false, context.transform);

        sections.forEach(section => {
            if (section.style.texture) {
                section.style.texture.update && section.style.texture.update();
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