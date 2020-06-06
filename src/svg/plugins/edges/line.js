import geomutils from '../../../geomutils';
import utils from './utils';
// plural
var generateLine = function() {
  this.set = function(drawEntities, svg, styles) {
    let edges = drawEntities.lines;

    edges.map((edge, index) => {
      const source = geomutils.edgeSource(edge);
      const target = geomutils.edgeTarget(edge);

      let currentStyle = utils.updateStyles(drawEntities, edge, target, styles);

      this.draw(
        svg,
        source.x,
        source.y,
        target.x,
        target.y,
        edge.uniqid,
        currentStyle
      );
    });
  };

  // FUNCTION: Draws individual edges
  this.draw = function(svg, x1, y1, x2, y2, id, styles) {
    // read the svg element's height and width
    x1 = x1 * 500;
    y1 = y1 * 500;
    x2 = x2 * 500;
    y2 = y2 * 500;

    let currentEdge = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );

    currentEdge.setAttribute('id', id);
    currentEdge.setAttribute('x1', x1);
    currentEdge.setAttribute('y1', y1);
    currentEdge.setAttribute('x2', x2);
    currentEdge.setAttribute('y2', y2);
    currentEdge.setAttribute('stroke', styles.color || 'rgb(204, 204, 204)');
    currentEdge.setAttribute('stroke-width', styles.width || 1);

    let defs = utils.addArrowHead(currentEdge, styles, 'line', id);

    svg.append(defs);
    svg.append(currentEdge);
  };
};

export { generateLine };
