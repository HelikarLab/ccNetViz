import generateCurve from './curve';
import generateLine from './line';

var generateEdge = function() {
  this.set = function(drawEntities, svg, styles) {
    let lines = drawEntities.lines;
    let curves = drawEntities.curves;
    let circles = drawEntities.circles;

    this.mapEdges(lines);
    this.mapEdges(curves);
    this.mapEdges(circles);
  };

  this.mapEdges = function(edges) {
    edges.map((edge, index) => {
      const source = geomutils.edgeSource(edge);
      const target = geomutils.edgeTarget(edge);

      let currentStyle = this.updateStyles(drawEntities, edge, target, styles);
    });
  };

  this.drawEdges = function(svg, source, target, id, styles) {};
};
