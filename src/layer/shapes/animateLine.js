import ccNetViz_primitive from '../../primitive';
import ccNetViz_gl from '../../gl';
import ccNetViz_geomutils from '../../geomutils';
import { normalize } from '../util';
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

const setVerticeCurveShift = (v, iV, s, t) => {
  let ct1 = {},
    ct2 = {};
  let csx, csy, ctx, cty, cisx, cisy, sisy, citx, city;
  ccNetViz_geomutils.getCurveShift(t.e, ct1);
  ctx = ct1.x;
  cty = ct1.y;
  citx = ct1.cx;
  city = ct1.cy;

  ccNetViz_geomutils.getCurveShift(s.e, ct2);
  csx = ct2.x;
  csy = ct2.y;
  cisx = ct2.cx;
  cisy = ct2.cy;

  v.curveShift &&
    ccNetViz_primitive.vertices(
      v.curveShift,
      iV,
      -csy,
      csx,
      -csy,
      csx,
      -cty,
      ctx,
      -cty,
      ctx
    );
  v.circleShift &&
    ccNetViz_primitive.vertices(
      v.circleShift,
      iV,
      -cisy,
      cisx,
      -cisy,
      cisx,
      -city,
      citx,
      -city,
      citx
    );
};

const shapeFillers = {
  lines: style => ({
    set: (v, e, iV, iI) => {
      let s = ccNetViz_geomutils.edgeSource(e);
      let t = ccNetViz_geomutils.edgeTarget(e);
      let dx = s.x - t.x;
      let dy = s.y - t.y;
      let d = normalize(s, t);

      setVerticeCurveShift(v, iV, s, t);

      ccNetViz_primitive.vertices(
        v.position,
        iV,
        s.x,
        s.y,
        s.x,
        s.y,
        t.x,
        t.y,
        t.x,
        t.y
      );
      ccNetViz_primitive.vertices(
        v.lengthSoFar,
        iV,
        0,
        0,
        0,
        0,
        dx,
        dy,
        dx,
        dy
      );
      ccNetViz_primitive.vertices(
        v.normal,
        iV,
        -d.y,
        d.x,
        d.y,
        -d.x,
        d.y,
        -d.x,
        -d.y,
        d.x
      );

      // NOTE: edge animation set from style
      const hasEdgeAnimation =
        !!style.animateType && style.animateType !== 'none';
      if (hasEdgeAnimation) {
        // when do edge animation, shader need to know the startPos and endPos
        ccNetViz_primitive.vertices(
          v.startPos,
          iV,
          s.x,
          s.y,
          s.x,
          s.y,
          s.x,
          s.y,
          s.x,
          s.y
        );
        ccNetViz_primitive.vertices(
          v.endPos,
          iV,
          t.x,
          t.y,
          t.x,
          t.y,
          t.x,
          t.y,
          t.x,
          t.y
        );
      }

      ccNetViz_primitive.quad(v.indices, iV, iI);
    },
  }),
  curves: style => ({
    numVertices: 3,
    numIndices: 3,
    set: (v, e, iV, iI) => {
      let s = ccNetViz_geomutils.edgeSource(e);
      let t = ccNetViz_geomutils.edgeTarget(e);
      let dx = s.x - t.x;
      let dy = s.y - t.y;
      let d = normalize(s, t);

      setVerticeCurveShift(v, iV, s, t);

      ccNetViz_primitive.vertices(
        v.position,
        iV,
        s.x,
        s.y,
        0.5 * (t.x + s.x),
        0.5 * (t.y + s.y),
        t.x,
        t.y
      );
      ccNetViz_primitive.vertices(
        v.lengthSoFar,
        iV,
        0,
        0,
        dx / 2,
        dy / 2,
        dx,
        dy
      );
      ccNetViz_primitive.vertices(v.normal, iV, 0, 0, d.y, -d.x, 0, 0);
      ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0.0, 0, 0);
      ccNetViz_primitive.indices(v.indices, iV, iI, 0, 1, 2);
    },
  }),
  circles: style => ({
    set: (v, e, iV, iI) => {
      let s = ccNetViz_geomutils.edgeSource(e);
      let d = s.y < 0.5 ? 1 : -1;

      let xdiff1 = 0;
      let ydiff1 = 0;
      let xdiff2 = 1;
      let ydiff2 = d;
      let xdiff3 = 2;
      let ydiff3 = 1.25 * d;
      let xdiff4 = 3;
      let ydiff4 = 1.5 * d;

      setVerticeCurveShift(v, iV, s, s);

      ccNetViz_primitive.vertices(
        v.position,
        iV,
        s.x,
        s.y,
        s.x,
        s.y,
        s.x,
        s.y,
        s.x,
        s.y
      );
      ccNetViz_primitive.vertices(
        v.lengthSoFar,
        iV,
        xdiff1,
        ydiff1,
        xdiff2,
        ydiff2,
        xdiff3,
        ydiff3,
        xdiff4,
        ydiff4
      );
      ccNetViz_primitive.vertices(v.normal, iV, 0, 0, 1, d, 0, 1.25 * d, -1, d);
      ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
      ccNetViz_primitive.quad(v.indices, iV, iI);
    },
  }),
};

export { AnimateLine };
