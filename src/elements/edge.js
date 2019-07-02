import ccNetViz_geomutils from '../geomutils';
import ccNetViz_primitive from '../primitive';

function Edge(edgeStyle) {
  this.edges = [];

  let edgeTypes; // TODO: ??
  let edgePoses;
  let spatialSearch = undefined;

  this.getEdgesCnt = () => {
    // TODO: get edge count
    return this.edges.length;
  };

  // set animation flag
  this.hasEdgeAnimation =
    !!edgeStyle.animateType && edgeStyle.animateType !== 'none';

  let setVerticeCurveShift = (v, iV, s, t) => {
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

  let edgesFiller = {
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

        if (this.hasEdgeAnimation) {
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
        ccNetViz_primitive.vertices(
          v.normal,
          iV,
          0,
          0,
          1,
          d,
          0,
          1.25 * d,
          -1,
          d
        );
        ccNetViz_primitive.vertices(v.curve, iV, 1, 1, 0.5, 0, 0, 0, 0.5, 0);
        ccNetViz_primitive.quad(v.indices, iV, iI);
      },
    }),
  };

  this.updateEdge = (e, i) => {
    let t = edgeTypes[i];
    let pos = edgePoses[i];

    t.d[pos] = this.edges[i] = e;

    if (spatialSearch) spatialSearch.update(context, t.k, pos, e); // TODO: spatialSearch set

    if (!gl) return;

    scene[t.k].updateEl(gl, e, pos, edgesFiller[t.k]);
    if (edgeStyle.arrow)
      scene[t.kArrow].updateEl(gl, e, pos, arrowFiller[t.kArrow]);
  };
}

export { Edge };
