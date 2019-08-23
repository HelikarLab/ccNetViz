import rbush from './rbush';
import ccNetViz_geomutils from '../geomutils';
import { getLabelVertices } from '../layer/plugins/label/shape/labelsBackground';
import { partitionByStyle, getPartitionStyle } from '../primitiveTools';
import {
  EPS,
  bezierIntersectsRect,
  bezierIntersectsLine,
  lineIntersectsRect,
  rectIntersectsRect,
  pointInRect,
  distance2ToBezier,
  distance2,
  pDistance2,
  getBBFromPoints,
  eq,
  neq,
} from './geomtools';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */

let ct = {};
function getEdgeShift(context, screensize, e, ct) {
  ccNetViz_geomutils.getCurveShift(e, ct); //get shift because of edge-to-edge functionality

  //compute all transformations made in the vertex shader
  let ctx, cty, citx, city;

  ctx = -ct.y;
  cty = ct.x * context.aspect2;

  let len2 =
    ctx * context.width * ctx * context.width +
    cty * context.height * cty * context.height;

  if (eq(len2, 0)) {
    ctx = 0;
    cty = 0;
  } else {
    let len = Math.sqrt(len2);
    ctx *= (context.curveExc * 0.25 * screensize) / len;
    cty *= (context.curveExc * 0.25 * screensize) / len;
  }

  let sizex = (2.5 * context.nodeSize * screensize) / context.width;
  let sizey = (2.5 * context.nodeSize * screensize) / context.height;
  citx = -ct.cy * 0.5 * sizex;
  city = ct.cx * 0.5 * sizey;

  ct.x = ctx + citx;
  ct.y = cty + city;
}

function getBezierPointsCurve(edge, context, normalize, size) {
  let x1, x2, y1, y2;
  let s = ccNetViz_geomutils.edgeSource(edge);
  let t = ccNetViz_geomutils.edgeTarget(edge);

  x1 = s.x;
  y1 = s.y;
  x2 = t.x;
  y2 = t.y;
  let d = normalize(s, t);

  let n2 = d.y;
  let n3 = context.aspect2 * -d.x;

  let x = context.width * n2;
  let y = context.height * n3;
  let l = Math.sqrt(x * x + y * y) * 2;

  n2 *= (context.curveExc * size) / (2 * l);
  n3 *= (context.curveExc * size) / (2 * l);

  getEdgeShift(context, size, s.e, ct);
  x1 += ct.x;
  y1 += ct.y;
  getEdgeShift(context, size, t.e, ct);
  x2 += ct.x;
  y2 += ct.y;

  let ret = [x1, y1, (x1 + x2) / 2 + n2, (y1 + y2) / 2 + n3, x2, y2];
  return ret;
}

function getBezierPointsCircle(edge, context, screensize) {
  let ct = {};
  let x1, y1, s;
  s = ccNetViz_geomutils.edgeSource(edge);
  x1 = s.x;
  y1 = s.y;

  let size = 2.5 * context.nodeSize * screensize;
  let xsize = size / context.width / 2;
  let ysize = size / context.height / 2;

  let d = s.y < 0.5 ? 1 : -1;

  getEdgeShift(context, screensize, s.e, ct);
  x1 += ct.x;
  y1 += ct.y;
  var ret = [
    x1,
    y1,
    x1 + xsize * 1,
    y1 + ysize * d,
    x1,
    y1 + ysize * 1.25 * d,
    x1 - xsize * 1,
    y1 + ysize * d,
  ];

  return ret;
}

function getBezierPointsLine(edge, context, size) {
  let x1, y1, x2, y2;

  let s = ccNetViz_geomutils.edgeSource(edge);
  let t = ccNetViz_geomutils.edgeTarget(edge);

  x1 = s.x;
  y1 = s.y;
  x2 = t.x;
  y2 = t.y;

  getEdgeShift(context, size, s.e, ct);
  x1 += ct.x;
  y1 += ct.y;
  getEdgeShift(context, size, t.e, ct);
  x2 += ct.x;
  y2 += ct.y;

  return [x1, y1, x2, y2];
}

function getLabelPos(edge, context, size, normalize) {
  let p, x, y;
  //circle
  if (edge.t == 2) {
    p = getBezierPointsCircle(edge, context, size);
    x = p[4];
    y = p[5];
  }
  //curve
  else if (edge.t == 1) {
    p = getBezierPointsCurve(edge, context, normalize, size);
    x = p[2];
    y = p[3];
  }
  //line
  else if (edge.t == 0) {
    p = getBezierPointsLine(edge, context, size);
    x = (p[0] + p[2]) / 2;
    y = (p[1] + p[3]) / 2;
  }
  return { x: x, y: y };
}

class Node {
  constructor(n) {
    this.e = n;
  }
  get isNode() {
    return true;
  }
  getBBox() {
    return [this.e.x - EPS, this.e.y - EPS, this.e.x + EPS, this.e.y + EPS];
  }
  intersectsRect(x1, y1, x2, y2) {
    return pointInRect(this.e.x, this.e.y, x1, y1, x2, y2);
  }
  dist2(x, y, context) {
    return distance2(x, y, this.e.x, this.e.y);
  }
}

class Label {
  constructor(n, textpos, style, fontSize, isSDF, getLabelSize, texts) {
    this.e = n;
    this.pos = textpos;
    this.style = style;
    this.fontSize = fontSize;
    this.isSDF = isSDF;
    this.getLabelSize = getLabelSize;
    this.texts = texts;
  }
  get isLabel() {
    return true;
  }

  // function to return the char
  searchChar(x, y, size, context, normalize) {
    let posX, posY;
    if (this.e.x && this.e.y) {
      posX = this.e.x;
      posY = this.e.y;
    } else {
      let p = getLabelPos(this.e, context, size, normalize);
      posX = p.x;
      posY = p.y;
    }
    let x1, y1, x2, y2;
    let wantedSize = this.isSDF
      ? this.getLabelSize(context, this.style.label || {})
      : this.fontSize;
    let fontScale = wantedSize / this.fontSize;
    if (wantedSize === 0) {
      fontScale = 0;
    }
    const label = this.e.label.replace(/\s+/g, '');
    const offset = 0.5 * context.nodeSize;
    let step = (edge, x) => (x < edge ? 0 : 1);

    //iterating through positions to check out which char fits

    for (let i = 0; i < this.pos.length; i++) {
      let c = this.pos[i];
      // -8 in c.dx because +3 added while position setting in sdf and 5 for background calculation
      const offsety = (2.0 * step(y, 0.5) - 1.0) * offset;
      x1 = posX + (size * ((c.dx - 8) * fontScale)) / context.width / 2;
      y1 = posY + (size * (c.dy * fontScale + offsety)) / context.height / 2;
      x2 =
        posX +
        (size * ((c.dx - 8 + c.width / 3) * fontScale)) / context.width / 2;
      y2 =
        posY +
        (size * ((c.dy + c.height / 2) * fontScale + offsety)) /
          context.height /
          2;

      let charPosX1 = Math.min(x1, x2);
      let charPosX2 = Math.max(x1, x2);
      let charPosY1 = Math.min(y1, y2);
      let charPosY2 = Math.max(y1, y2);

      // check if point clicked on canvas is in rectangle of char
      if (pointInRect(x, y, charPosX1, charPosY1, charPosX2, charPosY2)) {
        return { charPos: i, char: label[i] };
      }
    }
    return 0;
  }

  // function to return the word
  getCharAndWord(x, y, size, context, normalize) {
    let charObj = this.searchChar(x, y, size, context, normalize);

    if (!charObj) {
      return { char: false, charPos: false, word: false, wordPos: false };
    }

    let charPos = charObj.charPos;
    const textArray = this.e.label.split(' ');
    let sumOfString = -1;
    let c = 0;
    while (sumOfString + textArray[c].length < charPos) {
      sumOfString += textArray[c].length;
      c += 1;
    }
    // wordPos ===  first position of word considering only one whitespace in between words
    return {
      char: charObj.char,
      charPos: charObj.charPos + c,
      word: textArray[c],
      wordPos: sumOfString + (c + 1),
    };
  }

  getTextPos(context, size, normalize) {
    let x, y;
    if (this.e.x && this.e.y) {
      x = this.e.x;
      y = this.e.y;
    } else {
      let p = getLabelPos(this.e, context, size, normalize);
      x = p.x;
      y = p.y;
    }
    let x1, y1, x2, y2;
    x1 = x2 = x;
    y1 = y2 = y;
    let wantedSize = this.isSDF
      ? this.getLabelSize(context, this.style.label || {})
      : this.fontSize;
    let fontScale = wantedSize / this.fontSize;
    if (wantedSize === 0) {
      fontScale = 0;
    }

    let step = (edge, x) => (x < edge ? 0 : 1);
    const offset = 0.5 * context.nodeSize;
    const MAX = 10;
    const MIN = -10;
    let bbox = [MAX, MAX, MIN, MIN];
    let rect = getLabelVertices(
      this.texts,
      this.style.label.font,
      this.e.label,
      x,
      y
    );

    const offsety = (2.0 * step(y, 0.5) - 1.0) * offset;
    x1 = x + (size * (rect.startPosX * fontScale)) / context.width / 2;
    y1 = y + (size * (0 * fontScale + offsety)) / context.height / 2;
    x2 = x + (size * (rect.endPosX * fontScale)) / context.width / 2;
    y2 = y + (size * (rect.height * fontScale + offsety)) / context.height / 2;

    bbox[0] = Math.min(x1, x2);
    bbox[1] = Math.min(y1, y2);
    bbox[2] = Math.max(x1, x2);
    bbox[3] = Math.max(y1, y2);

    return bbox;
  }

  getBBox(context, size, normalize) {
    let bb = this.getTextPos(context, size, normalize);
    bb[0] = this.e.x ? Math.min(bb[0], this.e.x) : bb[0];
    bb[1] = this.e.y ? Math.min(bb[1], this.e.y) : bb[1];
    bb[2] = this.e.x ? Math.max(bb[2], this.e.x) : bb[2];
    bb[3] = this.e.y ? Math.max(bb[3], this.e.y) : bb[3];
    return bb;
  }

  intersectsRect(x1, y1, x2, y2, context, size, normalize) {
    let t = this.getTextPos(context, size, normalize);
    return rectIntersectsRect(x1, y1, x2, y2, t[0], t[1], t[2], t[3]);
  }

  dist2(x, y, context, size, normalize) {
    // getting up position of labels
    let t = this.getTextPos(context, size, normalize);
    // see if point which was clicked on canvas is in label area
    if (pointInRect(x, y, t[0], t[1], t[2], t[3])) return 0;

    //minimum from distance from corners or distance from borders
    return Math.min(
      distance2(t[0], t[1]),
      distance2(t[2], t[3]),
      distance2(t[0], t[3]),
      distance2(t[2], t[1]),
      pDistance2(x, y, t[0], t[1], t[2], t[1]),
      pDistance2(x, y, t[0], t[3], t[2], t[3]),
      pDistance2(x, y, t[0], t[1], t[0], t[3]),
      pDistance2(x, y, t[2], t[1], t[2], t[3])
    );
  }
}

class Line {
  constructor(l) {
    this.e = l;
  }
  get isEdge() {
    return true;
  }
  getPoints(context, size) {
    let p = getBezierPointsLine(this.e, context, size);
    return p;
  }
  getBBox(context, size) {
    let p = this.getPoints(context, size);

    return [
      Math.min(p[0], p[2]),
      Math.min(p[1], p[3]),
      Math.max(p[0], p[2]),
      Math.max(p[1], p[3]),
    ];
  }
  intersectsRect(x1, y1, x2, y2, context, size) {
    let p = this.getPoints(context, size);

    return lineIntersectsRect(p[0], p[1], p[2], p[3], x1, y1, x2, y2);
  }
  dist2(x, y, context, size) {
    let p = this.getPoints(context, size);

    return pDistance2(x, y, p[0], p[1], p[2], p[3]);
  }
}

class Circle {
  constructor(c) {
    this.e = c;
  }
  get isEdge() {
    return true;
  }
  getBezierPoints(context, screensize) {
    let p = getBezierPointsCircle(this.e, context, screensize);
    return p;
  }
  getBBox(context, size) {
    let v = this.getBezierPoints(context, size);

    return getBBFromPoints(v);
  }
  intersectsRect(x1, y1, x2, y2, context, size, normalize) {
    let v = this.getBezierPoints(context, size);
    return (
      bezierIntersectsRect(
        v[0],
        v[1],
        v[2],
        v[3],
        v[4],
        v[5],
        x1,
        y1,
        x2,
        y2
      ) ||
      bezierIntersectsRect(v[2], v[3], v[4], v[5], v[6], v[7], x1, y1, x2, y2)
    );
  }
  dist2(x, y, context, size) {
    let v = this.getBezierPoints(context, size);

    //circle is just 2 bezier curves :)
    let d1 = distance2ToBezier(x, y, v[0], v[1], v[2], v[3], v[4], v[5]);
    let d2 = distance2ToBezier(x, y, v[2], v[3], v[4], v[5], v[6], v[7]);

    return Math.min(d1, d2);
  }
}

class Curve {
  constructor(c) {
    this.e = c;
  }
  get isEdge() {
    return true;
  }
  getBezierPoints(context, size, normalize) {
    let p = getBezierPointsCurve(this.e, context, normalize, size);
    return p;
  }
  intersectsRect(x1, y1, x2, y2, context, size, normalize) {
    let v = this.getBezierPoints(context, size, normalize);
    return bezierIntersectsRect(
      v[0],
      v[1],
      v[2],
      v[3],
      v[4],
      v[5],
      x1,
      y1,
      x2,
      y2
    );
  }
  getBBox(context, size, normalize) {
    let v = this.getBezierPoints(context, size, normalize);
    return getBBFromPoints(v);
  }
  dist2(x, y, context, size, normalize) {
    let v = this.getBezierPoints(context, size, normalize);
    return distance2ToBezier(x, y, v[0], v[1], v[2], v[3], v[4], v[5]);
  }
}

function sortByDistances(e1, e2) {
  return e1.dist2 - e2.dist2;
}

let tConst = {
  nodes: Node,
  lines: Line,
  circles: Circle,
  curves: Curve,
  labels: Label,
};

export default class spatialIndex {
  constructor(
    c,
    texts,
    options,
    nodes,
    nodesParts,
    lines,
    linesParts,
    curves,
    curvesParts,
    circles,
    circlesParts,
    normalize,
    nodeStyle,
    edgeStyle,
    getLabelSize,
    getLabelHideScreen
  ) {
    //init all elements into rbush tree with size 1 (outer bound - the worst case)
    const size = 1;
    const oldsize = c.size || 1;
    c.size = 1;

    this.texts = texts;
    this.normalize = normalize;
    let t = (this.types = {
      nodes: [],
      lines: [],
      circles: [],
      curves: [],
      labels: [],
    });
    let i = 0,
      d = [];

    let addEntity = (e, d, i) => {
      d[i] = e.getBBox(c, size, normalize);
      d[i].push(e);
      return e;
    };

    nodes.forEach(n => {
      t.nodes.push(addEntity(new Node(n), d, i++));
    });

    lines.forEach(l => {
      t.lines.push(addEntity(new Line(l), d, i++));
    });

    circles.forEach(c => {
      t.circles.push(addEntity(new Circle(c), d, i++));
    });

    curves.forEach(c => {
      t.curves.push(addEntity(new Curve(c), d, i++));
    });

    let sd = {};
    let sdi = {};

    //labels position could differ by style >> must partition by it
    let styleOptions = [
      [nodesParts, nodeStyle],
      [circlesParts, edgeStyle],
      [curvesParts, edgeStyle],
      [linesParts, edgeStyle],
    ];

    styleOptions.forEach(element => {
      let part = element[0];
      let styleOp = element[1];

      if (styleOp) {
        for (let style in part) {
          let labelContainer = part[style];
          let ns = getPartitionStyle(options.styles[style], styleOp, 'label');
          let textEngine = texts.getEngine(ns.font);
          textEngine.setFont(ns.font);
          const fontSize = textEngine.fontSize;
          const isSDF = textEngine.isSDF;

          let sd_n = sd[style] || (sd[style] = []);
          let sdi_n = sdi[style] || (sdi[style] = 0);

          //biggest size in which the text is shown
          c.size = getLabelHideScreen(c, ns.label || {});
          labelContainer.forEach(n => {
            let p = getLabelPos(n, c, size, normalize);
            let textpos =
              n.label && textEngine.get(n.label, n.x || p.x, n.y || p.y);

            n.label &&
              t.labels.push(
                addEntity(
                  new Label(
                    n,
                    textpos,
                    ns,
                    fontSize,
                    isSDF,
                    getLabelSize,
                    texts
                  ),
                  sd_n,
                  sdi_n++
                )
              );
          });
          sdi[style] = sdi_n;
        }
      }
    });
    this.rbushtree_s = {};
    for (let style in sd) {
      let rb = (this.rbushtree_s[style] = rbush());
      rb.load(sd[style]);
    }

    //tree initialization
    this.rbushtree = rbush();
    this.rbushtree.load(d);

    //restore the size of scale (loosen outer the upper bound)
    c.size = oldsize;
  }
  _tryAddEl(ret, e, dist2, nodes, edges, labels) {
    if (nodes && e.isNode) {
      ret.nodes.push({ node: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
    }
    if (edges && e.isEdge) {
      ret.edges.push({ edge: e.e, dist: Math.sqrt(dist2), dist2: dist2 });
    }
    if (labels && e.isLabel) {
      ret.labels.push({
        label: e.e,
        dist: Math.sqrt(dist2),
        dist2: dist2,
        detail: e.detail,
      });
    }
  }
  findArea(context, x1, y1, x2, y2, size, nodes, edges, labels) {
    if (x1 > x2) {
      let p = x1;
      x1 = x2;
      x2 = p;
    }
    if (y1 > y2) {
      let p = y1;
      y1 = y2;
      y2 = p;
    }

    let ret = {};
    if (edges) ret.edges = [];
    if (nodes) ret.nodes = [];
    if (labels) ret.labels = [];

    let x = (x1 + x2) / 2;
    let y = (y1 + y2) / 2;
    let data = this.rbushtree.search([x1 - EPS, y1 - EPS, x2 + EPS, y2 + EPS]);
    if (labels) {
      for (let s in this.rbushtree_s) {
        data = data.concat(
          this.rbushtree_s[s].search([x1 - EPS, y1 - EPS, x2 + EPS, y2 + EPS])
        );
      }
    }

    for (let i = 0; i < data.length; i++) {
      let e = data[i][4];
      let dist2 = e.dist2(x, y, context, size, this.normalize);

      if ((e.isLabel && e.isSDF) || e.label) {
        let Obj = e.getCharAndWord(x, y, size, context, this.normalize);
        e.detail = Obj;
      }

      if (!e.intersectsRect(x1, y1, x2, y2, context, size, this.normalize))
        continue;

      this._tryAddEl(ret, e, dist2, nodes, edges, labels);
    }

    for (let k in ret) {
      ret[k].sort(sortByDistances);
    }
    return ret;
  }
  find(context, x, y, radius, size, nodes, edges, labels) {
    let ret = {};
    if (edges) ret.edges = [];
    if (nodes) ret.nodes = [];
    if (labels) ret.labels = [];

    let xradius = radius;
    let yradius = radius;

    let radius2 = radius * radius;

    let data = this.rbushtree.search([
      x - xradius,
      y - yradius,
      x + xradius,
      y + yradius,
    ]);
    if (labels) {
      for (let s in this.rbushtree_s) {
        data = data.concat(
          this.rbushtree_s[s].search([
            x - xradius,
            y - yradius,
            x + xradius,
            y + yradius,
          ])
        );
      }
    }

    for (let i = 0; i < data.length; i++) {
      let e = data[i][4];
      let dist2 = e.dist2(x, y, context, size, this.normalize, this.texts);

      if ((e.isLabel && e.isSDF) || e.label) {
        let Obj = e.getCharAndWord(x, y, size, context, this.normalize);
        e.detail = Obj;
      }

      if (dist2 > radius2) continue;

      this._tryAddEl(ret, e, dist2, nodes, edges, labels);
    }

    for (let k in ret) {
      ret[k].sort(sortByDistances);
    }

    return ret;
  }
  update(context, t, i, v) {
    //init all elements into rbush tree with size 1 (the biggest possible - the worst case)
    let size = 1;

    this.rbushtree.remove(this.types[t][i]);

    let e = new tConst[t](v);
    let arr = e.getBBox(context, size, this.normalize, this.texts);
    arr.push(e);

    this.rbushtree.insert((this.types[t][i] = arr));
  }
}
