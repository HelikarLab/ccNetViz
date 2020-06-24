import ccNetViz from './ccNetViz';
import { svg_renderer } from './svg';
import globalUtiilites from './globalUtiilites';

// Main entry point into ccNetViz libaray
var entry = function(drawingElement, options) {
  let typeOfDE = drawingElement.nodeName;

  // depending upon the type of element, call its
  // respective constructor
  if (typeOfDE === 'CANVAS') {
    var graph = new ccNetViz(drawingElement, options);
  } else if (typeOfDE === 'svg') {
    var svgr = new svg_renderer();
  } else {
    console.warn('Cannot create graph on the given element');
  }

  // data is passed and the graph is drawn on the given drawingElement
  this.set = (data, layout, layout_options = {}) => {
    if (typeOfDE === 'CANVAS') {
      graph.set(data.nodes, data.edges, layout).then(() => {
        graph.draw();
      });
    } else if (typeOfDE === 'svg') {
      svgr.draw(
        data.nodes,
        data.edges,
        layout,
        layout_options,
        undefined,
        drawingElement,
        options.styles
      );
    } else {
      console.warn('Cannot create graph on the given element');
    }
  };
};

window.entry = entry;
export default entry;
