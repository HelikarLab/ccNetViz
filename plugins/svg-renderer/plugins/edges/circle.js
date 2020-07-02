import geomutils from '../../../../src/geomutils';
import baseUtils from '../utils/index';
import edgeUtils from './utils';

var generateCircles = function() {
  this.set = async function(drawEntities, svg, styles, arrowHeadHashMmap) {
    let edges = drawEntities.circles;
    const arrowSize = baseUtils.getSize(
      svg,
      styles.arrow,
      baseUtils.getEdgesCnt(drawEntities),
      0.2
    );

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];

      //   const source = geomutils.edgeSource(edge);
      const target = geomutils.edgeTarget(edge);

      let currentStyle = edgeUtils.updateStyles(
        drawEntities,
        edge,
        target,
        styles,
        arrowSize
      );
      currentStyle.arrowHead = edgeUtils.lazyCacheArrow(
        currentStyle,
        arrowHeadHashMmap
      );
      let eccentricity = baseUtils.getSize(
        svg,
        undefined,
        baseUtils.getEdgesCnt(drawEntities),
        0.5
      );

      await this.draw(svg, target, edge, eccentricity, currentStyle);
    }
  };

  // FUNCTION: Draws individual edges
  this.draw = async function(svg, target, edge, eccentricity, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;
    let x = target.x * height;
    let y = target.y * width;

    // 2.5 --> based on visual comparison with ccNetViz
    const curvature = eccentricity * 2.5;
    let crx = x - curvature;
    let clx = x + curvature;
    let cy;

    // Checks the midpoint of the canvas, and draws circle depending upon
    // whether it is in top half (=> add `curvature` to draw circle bottom-down)
    // or bottom half (=> subtracts `curvature` to draw circle bottom-up)
    if (y < height / 2) cy = y + curvature;
    else cy = y - curvature;

    let circleBoundary = edgeUtils.getCurveBoundary(
      x,
      y,
      clx,
      cy,
      crx,
      cy,
      x,
      y
    );

    // EXTRA -> If circle crosses the horizontal boundary
    // ==> Checks if it is crossing any horizontal boundries
    // if (x1 - 100 < 0) crx = 0;
    // else crx = x1 - 100;
    // if (x2 + 100 > 500) clx = 500;
    // else clx = x2 + 100;

    // checks if there is any overlapping circle,
    // right now, if (edge.weight !== undefined) is a BAD HACK: based on comparisons
    // if overlapping found
    // then if point is in upper half, then shift the y coordinate down
    // else shift it up
    // also shift the cy (cubic curvature point) accordingly
    if (edge.weight !== undefined) {
      if (y < height) {
        y = y + circleBoundary.height;
        cy = y + curvature;
      } else {
        y = y - circleBoundary.height;
        arrowHeadHmap;
        cy = y - curvature;
      }
    }

    let curve =
      'M' +
      x +
      ',' +
      y +
      ' C' +
      crx +
      ',' +
      cy +
      ' ' +
      clx +
      ',' +
      cy +
      ' ' +
      x +
      ',' +
      y;

    let currentCircle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    currentCircle.setAttribute('d', curve);
    currentCircle.setAttribute('stroke', styles.color || 'rgb(204, 204, 204)');
    currentCircle.setAttribute('stroke-width', styles.width || 1);
    currentCircle.setAttribute('fill', 'none');

    const key = edgeUtils.generateArrowHeadId(styles);
    const url = 'url(#' + key + ')';
    currentCircle.setAttribute('marker-end', url);

    svg.append(styles.arrowHead);
    svg.append(currentCircle);
  };
};

export { generateCircles };
