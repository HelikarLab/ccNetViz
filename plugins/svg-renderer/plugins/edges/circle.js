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
      const nodesCnt = baseUtils.getNodesCnt(drawEntities);
      const edgesCnt = baseUtils.getEdgesCnt(drawEntities);
      currentStyle.curve = edgesCnt / nodesCnt;

      await this.draw(svg, edge, currentStyle);
    }
  };

  // FUNCTION: Draws individual edges
  this.draw = async function(svg, edge, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;

    const x1 = edge.position.x1 * width;
    const y1 = edge.position.y1 * height;
    const mx1 = edge.position.cx1 * width;
    const my1 = edge.position.cy1 * height;
    const x2 = edge.position.x2 * width;
    const y2 = edge.position.y2 * height;
    const mx2 = edge.position.cx2 * width;
    const my2 = edge.position.cy2 * height;

    const rx1 = mx1 * 2 - x1;
    const ry1 = y2 + (y2 - my1) + (y2 - my1) / 2;
    const rx2 = mx2 * 2 - x2;
    const ry2 = y2 + (y2 - my1) + (y2 - my1) / 2;

    let curve =
      'M' +
      x1 +
      ',' +
      y1 +
      ' C' +
      rx1 +
      ',' +
      ry1 +
      ' ' +
      rx2 +
      ',' +
      ry2 +
      ' ' +
      x1 +
      ',' +
      y1;

    let currentCircle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    currentCircle.setAttribute('d', curve);
    currentCircle.setAttribute('stroke', styles.color || 'rgb(204, 204, 204)');
    currentCircle.setAttribute('stroke-width', styles.width || 1);
    currentCircle.setAttribute('fill', 'none');
    currentCircle.setAttribute('id', edge.uniqid);

    const key = edgeUtils.generateArrowHeadId(styles);
    const url = 'url(#' + key + ')';
    currentCircle.setAttribute('marker-end', url);

    svg.append(styles.arrowHead);
    svg.append(currentCircle);
  };
};

export { generateCircles };
