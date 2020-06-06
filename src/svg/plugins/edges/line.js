import geomutils from '../../../geomutils';
import baseUtils from '../utils/index';
import edgeUtils from './utils';

var generateLines = function() {
  this.set = function(drawEntities, svg, styles) {
    let edges = drawEntities.lines;

    edges.map((edge, index) => {
      const source = geomutils.edgeSource(edge);
      const target = geomutils.edgeTarget(edge);

      let currentStyle = edgeUtils.updateStyles(
        drawEntities,
        edge,
        target,
        styles
      );

      this.draw(svg, source, target, edge.uniqid, currentStyle);
    });
  };

  // FUNCTION: Draws individual edges
  this.draw = function(svg, source, target, id, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;
    let x1 = source.x * height;
    let y1 = source.y * width;
    let x2 = target.x * height;
    let y2 = target.y * width;

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

    let defs = edgeUtils.addArrowHead(currentEdge, styles, 'line', id);

    svg.append(defs);
    svg.append(currentEdge);
  };
};

export { generateLines };
