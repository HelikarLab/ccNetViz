/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

export default class {
  static initExtensions(gl) {
      let extensions = gl.getSupportedExtensions();
      let result = {};
      for (let i = 1; i < arguments.length; i++) {
          let e = arguments[i];
          (result[e] = extensions.indexOf(e) >= 0) && gl.getExtension(e);
      }
      return result;
  }

  static createShader(gl, type, source) {
      let result = gl.createShader(type);
      gl.shaderSource(result, source);
      gl.compileShader(result);

      if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) {
          console.log(gl.getShaderInfoLog(result));
          return null;
      }
      return result;
  }

  static createTexture(gl, img, onLoad, options) {
      let result = gl.createTexture();

      let image = new Image();
      
      let load = () => {
            image.onload = null;
            gl.bindTexture(gl.TEXTURE_2D, result);

            if((options || {}).sdf){
              gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, image);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }else{
              gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }

            gl.bindTexture(gl.TEXTURE_2D, null);
            onLoad && onLoad();
      }

      image.onload = load;
      image.src = img;
      image.naturalWidth && image.naturalHeight && load();
      
      result.image = image;
      return result;
  }

  static uniformColor(gl, location, color) {
      gl.uniform4f(location, color.r, color.g, color.b, color.a);
  }

  static ortho(left, right, bottom, top, near, far) {
      let lr = 1 / (left - right),
          bt = 1 / (bottom - top),
          nf = 1 / (near - far);

      let result = new Float32Array(16);
      result[0] = -2 * lr;
      result[1] = 0;
      result[2] = 0;
      result[3] = 0;
      result[4] = 0;
      result[5] = -2 * bt;
      result[6] = 0;
      result[7] = 0;
      result[8] = 0;
      result[9] = 0;
      result[10] = 2 * nf;
      result[11] = 0;
      result[12] = (left + right) * lr;
      result[13] = (top + bottom) * bt;
      result[14] = (far + near) * nf;
      result[15] = 1;
      return result;
  }
};
