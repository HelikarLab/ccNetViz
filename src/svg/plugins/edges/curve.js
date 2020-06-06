import geomutils from '../../../geomutils';
import utils from './utils';

var generateCurves = function() {
  this.set = function(drawEntities, svg, styles) {
    let edges = drawEntities.curves;
    edges.map((edge, index) => {
      const source = geomutils.edgeSource(edge);
      const target = geomutils.edgeTarget(edge);

      let currentStyle = utils.updateStyles(drawEntities, edge, target, styles);
      let eccentricity = utils.getSize(
        svg,
        undefined,
        utils.getEdgesCnt(drawEntities),
        0.5
      );

      this.draw(svg, source, target, eccentricity, edge.uniqid, currentStyle);
    });
  };

  // FUNCTION: Draws individual edges
  this.draw = function(svg, source, target, eccentricity, id, styles) {
    let x1 = source.x * 500;
    let y1 = source.y * 500;
    let x2 = target.x * 500;
    let y2 = target.y * 500;

    // defines the curvature of the curve
    let roundness = utils.quadraticCurvePoint(x1, x2, y1, y2, eccentricity);
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

export { generateCurves };
