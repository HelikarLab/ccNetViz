import ccNetViz_geomutils from '../../../../geomutils';
import ccNetViz_primitive from '../../../../primitive';
import { normalize } from '../../../util';

const getMidPoint = e => {
  let X,
    Y,
    s,
    t,
    d = 0;
  switch (e.t) {
    case 1:
      s = ccNetViz_geomutils.edgeSource(e);
      t = ccNetViz_geomutils.edgeTarget(e);
      d = normalize(s, t);
      X = 0.5 * (t.x + s.x);
      Y = 0.5 * (t.y + s.y);
      break;
    case 2:
      s = ccNetViz_geomutils.edgeSource(e);
      t = ccNetViz_geomutils.edgeSource(e);
      d = s.y < 0.5 ? 1 : -1;
      X = s.x;
      Y = s.y;
      break;
    case 0:
      s = ccNetViz_geomutils.edgeSource(e);
      t = ccNetViz_geomutils.edgeTarget(e);
      X = 0.5 * (t.x + s.x);
      Y = 0.5 * (t.y + s.y);
      break;
    default:
      X = e.x;
      Y = e.y;
  }
  return { x: X, y: Y, s: s, t: t, d: d };
};
const setShift = (v, iV, s, t) => {
  let ct = {};
  let csx, csy, cisx, cisy;
  // setting a constant shift for each label
  ccNetViz_geomutils.getCurveShift(s.e, ct);
  csx = ct.x;
  csy = ct.y;
  cisx = ct.cx;
  cisy = ct.cy;
  v.curveShift &&
    ccNetViz_primitive.vertices(
      v.curveShift,
      iV,
      -csy,
      csx,
      -csy,
      csx,
      -csy,
      csx,
      -csy,
      csx
    );
  v.circleShift &&
    ccNetViz_primitive.vertices(
      v.circleShift,
      iV,
      -cisy,
      cisx,
      -cisy,
      cisx,
      -cisy,
      cisx,
      -cisy,
      cisx
    );
};

const setLabelAttributes = (v, e, s, t, lX, lY, d, iV) => {
  switch (e.t) {
    case 1:
      setShift(v, iV, s, t);
      v.position &&
        ccNetViz_primitive.vertices(
          v.position,
          iV,
          lX,
          lY,
          lX,
          lY,
          lX,
          lY,
          lX,
          lY
        );
      v.normal &&
        ccNetViz_primitive.vertices(
          v.normal,
          iV,
          d.y,
          -d.x,
          d.y,
          -d.x,
          d.y,
          -d.x,
          d.y,
          -d.x
        );
      break;

    case 2:
      setShift(v, iV, s, t);
      v.position &&
        ccNetViz_primitive.vertices(
          v.position,
          iV,
          lX,
          lY,
          lX,
          lY,
          lX,
          lY,
          lX,
          lY
        );
      v.normal &&
        ccNetViz_primitive.vertices(
          v.normal,
          iV,
          0,
          1.25 * d,
          0,
          1.25 * d,
          0,
          1.25 * d,
          0,
          1.25 * d
        );
      break;

    default:
      v.position &&
        ccNetViz_primitive.vertices(
          v.position,
          iV,
          lX,
          lY,
          lX,
          lY,
          lX,
          lY,
          lX,
          lY
        );
  }
};

export { setLabelAttributes, getMidPoint };
