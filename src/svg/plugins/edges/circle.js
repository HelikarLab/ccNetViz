import geomutils from '../../../geomutils';
import utils from './utils';

var generateCircles = function() {
  this.set = function(drawEntities, svg, styles) {
    let edges = drawEntities.circles;
    edges.map((edge, index) => {
      //   const source = geomutils.edgeSource(edge);
      const target = geomutils.edgeTarget(edge);

      let currentStyle = utils.updateStyles(drawEntities, edge, target, styles);
      let eccentricity = utils.getSize(
        svg,
        undefined,
        utils.getEdgesCnt(drawEntities),
        0.5
      );

      this.draw(svg, target, edge, eccentricity, currentStyle);
    });
  };

  // FUNCTION: Draws individual edges
  this.draw = function(svg, target, edge, eccentricity, styles) {
    let x = target.x * 500;
    let y = target.y * 500;

    // 2.5 --> based on visual comparison with ccNetViz
    let crx = x - eccentricity * 2.5;
    let clx = x + eccentricity * 2.5;
    let cy;

    // Checks the midpoint of the canvas, and draws circle depending upon
    // whether it is in top half (=> add 100 to draw circle bottom-down)
    // or bottom half (=> subtracts 100 to draw circle bottom-up)
    if (y < 250) cy = y + 75;
    // 250 => change it with respect to view height
    else cy = y - 75;

    let circleBoundaries = utils.getCurveBoundary(x, y, clx, cy, crx, cy, x, y);

    // EXTRA -> If circle crosses the 500x500 canvas horizontally
    // ==> Checks if it is crossing any horizontal boundries
    // if (x1 - 100 < 0) crx = 0;
    // else crx = x1 - 100;
    // if (x2 + 100 > 500) clx = 500;
    // else clx = x2 + 100;
    if (edge.weight !== undefined) {
      if (y < 250) {
        y = y + circleBoundaries.height;
        cy = y + 75;
      } else {
        y = y - circleBoundaries.height;
        cy = y - 75;
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

    let defs = utils.addArrowHead(currentCircle, styles, 'circle', edge.uniqid);

    svg.append(defs);
    svg.append(currentCircle);
  };
};

export { generateCircles };
