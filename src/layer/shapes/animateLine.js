import ccNetViz_primitive from '../../primitive';
import ccNetViz_gl from '../../gl';
import { elementShaders } from '../../shaders';
import { BaseShape } from './baseShape';

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

const getEdgeStyleSize = c => {
  return c.width / 120;
  /*      let avsize = (c.width + c.height)/2;
    let koef = (Math.min(Math.max((avsize - 150)/150, 0),1)+1)*1.3;
    //koef 1 for 150 size and 1.4 for 300 size
    return c.width/(130*koef);
*/
};

const animateStylesTransl = {
  none: 0,
  basic: 1,
  gradient: 2,
  'double-gradient': 3,
  'shape-bubble': 4,
  'shape-wave': 5,
  'shape-dot': 6,
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

class AnimateLine extends BaseShape {
  constructor(gl, edgeStyle) {
    super();

    this.filler = shapeFillers.lines;

    const hasAnimation =
      !!edgeStyle.animateType && edgeStyle.animateType !== 'none';
    // TODO: check has shape animation is not best way
    const hasShapeAnimation =
      hasAnimation && getEdgeAnimateType(edgeStyle.animateType) > 3.5;
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
        gl.uniform1f(uniforms.width, c.style.width);
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

          hasShapeAnimation &&
            gl.uniform1f(uniforms.animateMaxWidth, c.style.animateMaxWidth);
          c.style.animateType === 'shape-dot' &&
            gl.uniform1i(uniforms.animateDotNum, c.style.animateDotNum);
          gl.uniform1f(uniforms.animateDotInterval, c.style.animateDotInterval);
        }
      }
    );
  }
}

export { AnimateLine };
