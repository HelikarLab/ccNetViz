import ccNetViz_primitive from '../../primitive';
import ccNetViz_gl from '../../gl';
import { elementShaders } from '../../shaders';
import { BaseShape } from './baseShape';

const shaderparams = { attribute: { offsetMul: 1 } };

const bindEdgeArrows = (gl, view, getSize, getEdgesCnt) => {
  return c => {
    let size = getSize(c, c.style, getEdgesCnt(), 0.2);
    if (!size) return true;

    let uniforms = c.shader.uniforms;
    gl.uniform1f(uniforms.offset, 0.5 * c.nodeSize);
    gl.uniform2f(uniforms.arrowsize, size, c.style.aspect * size);
    gl.uniform1f(uniforms.exc, c.curveExc);
    uniforms.cexc && gl.uniform1f(uniforms.cexc, 0.5 * view.size * c.curveExc);
    if (uniforms.size) {
      size = 2.5 * c.nodeSize;
      uniforms.size &&
        gl.uniform2f(uniforms.size, size / c.width, size / c.height);
    }
    gl.uniform2f(uniforms.screen, c.width, c.height);
    gl.uniform1f(uniforms.aspect2, c.aspect2);
    ccNetViz_gl.uniformColor(gl, uniforms.color, c.style.color);
  };
};

class LineArrow extends BaseShape {
  constructor(gl, view, edgeStyle, getSize, getEdgesCnt) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      'arrow',
      elementShaders.vsLineArrow,
      elementShaders.fsColorTexture,
      bindEdgeArrows(gl, view, getSize, getEdgesCnt),
      shaderparams
    );
  }
}

class CurveArrow extends BaseShape {
  constructor(gl, view, edgeStyle, getSize, getEdgesCnt) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      'arrow',
      elementShaders.vsCurveArrow,
      elementShaders.fsColorTexture,
      bindEdgeArrows(gl, view, getSize, getEdgesCnt),
      shaderparams
    );
  }
}

class CircleArrow extends BaseShape {
  constructor(gl, view, edgeStyle, getSize, getEdgesCnt) {
    super();
    this._primitive = new ccNetViz_primitive(
      gl,
      edgeStyle,
      'arrow',
      elementShaders.vsCircleArrow,
      elementShaders.fsColorTexture,
      bindEdgeArrows(gl, view, getSize, getEdgesCnt),
      shaderparams
    );
  }
}

export { LineArrow, CurveArrow, CircleArrow };
