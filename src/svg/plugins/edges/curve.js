import geomutils from '../../../geomutils';
import baseUtils from '../utils/index';
import edgeUtils from './utils';

var generateCurves = function() {
  this.set = function(drawEntities, svg, styles, arrowHeadHashMmap) {
    let edges = drawEntities.curves;

    edges.map((edge, index) => {
      const source = geomutils.edgeSource(edge);
      const target = geomutils.edgeTarget(edge);

      let currentStyle = edgeUtils.updateStyles(
        drawEntities,
        edge,
        target,
        styles
      );
      currentStyle.arrowHead = edgeUtils.lazyCacheArrow(
        currentStyle,
        arrowHeadHashMmap
      );
      const eccentricity = edgeUtils.getSize(
        svg,
        undefined,
        edgeUtils.getEdgesCnt(drawEntities),
        0.5
      );

      this.draw(svg, source, target, eccentricity, edge.uniqid, currentStyle);
    });
  };

  // FUNCTION: Draws individual edges
  this.draw = function(svg, source, target, eccentricity, id, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;
    let x1 = source.x * height;
    let y1 = source.y * width;
    let x2 = target.x * height;
    let y2 = target.y * width;

    // defines the curvature of the curve
    let roundness = edgeUtils.quadraticCurvePoint(x1, x2, y1, y2, eccentricity);
    let ex = roundness.cx;
    let ey = roundness.cy;

    let curve =
      'M' + x1 + ' ' + y1 + ' Q ' + ex + ' ' + ey + ' ' + x2 + ' ' + y2;

    let currentCurve = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    currentCurve.setAttribute('id', id);
    currentCurve.setAttribute('d', curve);
    currentCurve.setAttribute('stroke', styles.color || 'rgb(204, 204, 204)');
    currentCurve.setAttribute('stroke-width', styles.width || 1);
    currentCurve.setAttribute('fill', 'none');

    const key = edgeUtils.generateArrowHeadId(styles);
    const url = 'url(#' + key + ')';
    currentCurve.setAttribute('marker-end', url);

    svg.append(styles.arrowHead);
    svg.append(currentCurve);
  };
};

export { generateCurves };
