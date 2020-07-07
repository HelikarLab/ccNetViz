import geomutils from '../../../../src/geomutils';
import baseUtils from '../utils/index';
import edgeUtils from './utils';

var generateCurves = function() {
  this.set = async function(drawEntities, svg, styles, arrowHeadHashMmap) {
    let edges = drawEntities.curves;
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
    let ex = edge.position.cx * width;
    let ey = edge.position.cy * height;

    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;

    let rx = ex * 2 - mx;
    let ry = ey * 2 - my;

    let curve =
      'M' + x1 + ' ' + y1 + ' Q ' + rx + ' ' + ry + ' ' + x2 + ' ' + y2;

    let currentCurve = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    currentCurve.setAttribute('id', edge.uniqid);
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
