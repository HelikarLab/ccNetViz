import ccNetViz_primitive from '../../primitive';
import ccNetViz_gl from '../../gl';
import ccNetViz_geomutils from '../../geomutils';
import { normalize } from '../util';
import { elementShaders } from '../../shaders';
import { BaseShape, BaseShapeManager } from './baseShape';

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

let dx = Math.cos(0.9);
let dy = Math.sin(0.9);
let ct = {};

const set = (v, e, s, t, iV, iI, dx, dy) => {
  let tx = t.x;
  let ty = t.y;

  let offsetMul;
  let ctx, cty, citx, city;

  ccNetViz_geomutils.getCurveShift(t.e, ct);
  ctx = ct.x;
  cty = ct.y;
  citx = ct.cx;
  city = ct.cy;

  if (t.is_edge) {
    //if target is edge, disable node offset for arrow
    //normal of that edge
    offsetMul = 0;
  } else {
    offsetMul = 1;
  }
  v.curveShift &&
    ccNetViz_primitive.vertices(
      v.curveShift,
      iV,
      -cty,
      ctx,
      -cty,
      ctx,
      -cty,
      ctx,
      -cty,
      ctx
    );
  v.circleShift &&
    ccNetViz_primitive.vertices(
      v.circleShift,
      iV,
      -city,
      citx,
      -city,
      citx,
      -city,
      citx,
      -city,
      citx
    );

  ccNetViz_primitive.singles(
    v.offsetMul,
    iV,
    offsetMul,
    offsetMul,
    offsetMul,
    offsetMul
  );
  ccNetViz_primitive.vertices(v.position, iV, tx, ty, tx, ty, tx, ty, tx, ty);
  ccNetViz_primitive.vertices(v.direction, iV, dx, dy, dx, dy, dx, dy, dx, dy);
  ccNetViz_primitive.vertices(v.textureCoord, iV, 0, 0, 1, 0, 1, 1, 0, 1);
  ccNetViz_primitive.quad(v.indices, iV, iI);
};

class LineArrow extends BaseShape {
  constructor(gl, view, edgeStyle, getSize, getEdgesCnt) {
    super();

    this.filler = style => ({
      set: (v, e, iV, iI) => {
        let s = ccNetViz_geomutils.edgeSource(e);
        let t = ccNetViz_geomutils.edgeTarget(e);
        let d = normalize(s, t);
        return set(v, e, s, t, iV, iI, d.x, d.y);
      },
    });

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

    this.filler = style => ({
      set: (v, e, iV, iI) => {
        let s = ccNetViz_geomutils.edgeSource(e);
        let t = ccNetViz_geomutils.edgeTarget(e);
        return set(v, e, s, t, iV, iI, 0.5 * (t.x - s.x), 0.5 * (t.y - s.y));
      },
    });

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

    this.filler = style => ({
      set: (v, e, iV, iI) => {
        let t = ccNetViz_geomutils.edgeTarget(e);
        let s = t;
        return set(
          v,
          e,
          s,
          t,
          iV,
          iI,
          t.x < 0.5 ? dx : -dx,
          t.y < 0.5 ? -dy : dy
        );
      },
    });

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
