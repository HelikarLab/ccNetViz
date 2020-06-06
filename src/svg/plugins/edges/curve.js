import geomutils from '../../../geomutils';
import utils from './utils';

var generateCurve = function() {
  this.set = function(drawEntities, svg, styles) {
    let edges = drawEntities.curves;
    edges.map((edge, index) => {
      const source = geomutils.edgeSource(edge);
      const target = geomutils.edgeTarget(edge);

      let currentStyle = utils.updateStyles(drawEntities, edge, target, styles);

      this.draw(
        svg,
        source.x,
        source.y,
        source.uniqid,
        target.x,
        target.y,
        target.uniqid,
        edge.uniqid,
        currentStyle
      );
    });
  };

  // FUNCTION: Draws individual edges
  this.draw = function(svg, x1, y1, si, x2, y2, ti, id, styles) {
    x1 = x1 * 500;
    y1 = y1 * 500;
    x2 = x2 * 500;
    y2 = y2 * 500;
    ex = ex * 500;
    ey = ey * 500;
    let x = (x1 + x2) / 2;
    let y;
    if (si < ti) y = (y1 + y2) / 2 - 40;
    else y = (y1 + y2) / 2 + 40;

    let dis;
    if (si < ti) dis = -40;
    else dis = 40;

    // TODO: see if function curvePoint helps in anyway
    let roundness = utils.quadraticCurvePoint(x1, x2, y1, y2, dis);
    let ex = roundness.cx;
    let ey = roundness.cy;

    let curve =
      'M' + x1 + ' ' + y1 + ' Q ' + ex + ' ' + ey + ' ' + x2 + ' ' + y2;

    let currentCurve = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    currentCurve.setAttribute('d', curve);
    currentCurve.setAttribute('stroke', styles.color || 'rgb(204, 204, 204)');
    currentCurve.setAttribute('stroke-width', styles.width || 1);
    currentCurve.setAttribute('fill', 'none');

    let defs = utils.addArrowHead(currentCurve, styles, 'curve', id);

    svg.append(defs);
    svg.append(currentCurve);
  };
};

export { generateCurve };
