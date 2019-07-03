import ccNetViz_primitive from '../../primitive';
import ccNetViz_gl from '../../gl';
import { elementShaders } from '../../shaders';
import { BaseShape } from './baseShape';

const getEdgeStyleSize = c => {
  return c.width / 120;
  /*      let avsize = (c.width + c.height)/2;
    let koef = (Math.min(Math.max((avsize - 150)/150, 0),1)+1)*1.3;
    //koef 1 for 150 size and 1.4 for 300 size
    return c.width/(130*koef);
*/
};

const stylesTransl = {
  line: 0,
  dashed: 1,
  'chain-dotted': 2,
  dotted: 3,
};
const getEdgeType = t => {
  if (t !== undefined) {
    t = stylesTransl[t];
  }

  if (t === undefined || typeof t !== 'number') {
    t = 0;
  }

  return t;
};

const animateStylesTransl = {
  none: 0,
  basic: 1,
  gradient: 2,
};
const getEdgeAnimateType = t => {
  if (t !== undefined) {
    t = animateStylesTransl[t];
  }

  if (t === undefined || typeof t !== 'number') {
    t = 0;
  }

  return t;
};

class Line extends BaseShape {
  constructor(gl, edgeStyle, hasAnimation) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      null,
      elementShaders.vsLine,
      elementShaders.fsLineAnimate(edgeStyle.animateEase),
      c => {
        let uniforms = c.shader.uniforms;
        uniforms.exc && gl.uniform1f(uniforms.exc, c.curveExc);
        gl.uniform2f(uniforms.screen, c.width, c.height);
        let size = 2.5 * c.nodeSize;
        uniforms.size &&
          gl.uniform2f(uniforms.size, size / c.width, size / c.height);
        gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
        gl.uniform1f(uniforms.aspect2, c.aspect2);
        gl.uniform1f(uniforms.aspect, c.aspect);
        gl.uniform2f(
          uniforms.width,
          c.style.width / c.width,
          c.style.width / c.height
        );
        gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
        ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);

        if (hasAnimation) {
          gl.uniform1f(
            uniforms.animateType,
            getEdgeAnimateType(c.style.animateType)
          );
          gl.uniform1f(uniforms.animateSpeed, c.style.animateSpeed);
          ccNetViz_gl.uniformColor(
            gl,
            uniforms.animateColor,
            c.style.animateColor
          );
        }
      }
    );
  }
}

class Curve extends BaseShape {
  constructor(gl, edgeStyle) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      null,
      elementShaders.vsCurve,
      elementShaders.fsCurve,
      c => {
        let uniforms = c.shader.uniforms;
        gl.uniform1f(uniforms.width, c.style.width);
        gl.uniform1f(uniforms.exc, c.curveExc);
        gl.uniform2f(uniforms.screen, c.width, c.height);
        let size = 2.5 * c.nodeSize;
        uniforms.size &&
          gl.uniform2f(uniforms.size, size / c.width, size / c.height);
        gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
        gl.uniform1f(uniforms.aspect2, c.aspect2);
        gl.uniform1f(uniforms.aspect, c.aspect);
        gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
        uniforms.lineStepSize && gl.uniform1f(uniforms.lineStepSize, 5);
        ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
      }
    );
  }
}

class Circle extends BaseShape {
  constructor(gl, edgeStyle) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      null,
      elementShaders.vsCircle,
      elementShaders.fsCircle,
      c => {
        let uniforms = c.shader.uniforms;
        uniforms.exc && gl.uniform1f(uniforms.exc, c.curveExc);
        gl.uniform1f(uniforms.width, c.style.width);
        gl.uniform1f(uniforms.type, getEdgeType(c.style.type));
        gl.uniform2f(uniforms.screen, c.width, c.height);
        let size = 2.5 * c.nodeSize;
        uniforms.size &&
          gl.uniform2f(uniforms.size, size / c.width, size / c.height);
        gl.uniform1f(uniforms.lineSize, getEdgeStyleSize(c));
        gl.uniform1f(uniforms.aspect2, c.aspect2);
        gl.uniform1f(uniforms.aspect, c.aspect);
        uniforms.lineStepSize && gl.uniform1f(uniforms.lineStepSize, 5 / 3);
        ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
      }
    );
  }
}

export { Line, Curve, Circle };
