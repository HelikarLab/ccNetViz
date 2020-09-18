import geomutils from '../../../../src/geomutils';
import baseUtils from '../utils/index';
import edgeUtils from './utils';

var generateLines = function() {
  this.set = async function(drawEntities, svg, styles, arrowHeadHashMmap) {
    let edges = drawEntities.lines;
    const arrowSize = baseUtils.getSize(
      svg,
      styles.edge.arrow,
      baseUtils.getEdgesCnt(drawEntities),
      0.2
    );

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
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

      await this.draw(svg, edge, currentStyle);
    }
  };

  // FUNCTION: Draws individual edges
  this.draw = async function(svg, edge, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;
    let x1 = edge.position.x1 * width;
    let y1 = edge.position.y1 * height;
    let x2 = edge.position.x2 * width;
    let y2 = edge.position.y2 * height;

    let currentEdge = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );

    currentEdge.setAttribute('id', edge.uniqid);
    currentEdge.setAttribute('x1', x1);
    currentEdge.setAttribute('y1', y1);
    currentEdge.setAttribute('x2', x2);
    currentEdge.setAttribute('y2', y2);
    currentEdge.setAttribute('stroke', styles.color || 'rgb(204, 204, 204)');
    currentEdge.setAttribute('stroke-width', styles.width || 1);

    const key = edgeUtils.generateArrowHeadId(styles);
    const url = 'url(#' + key + ')';
    currentEdge.setAttribute('marker-end', url);

    svg.append(styles.arrowHead);
    svg.append(currentEdge);
  };
};

export { generateLines };
