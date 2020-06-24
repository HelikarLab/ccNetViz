import ccNetViz from './ccNetViz';
import { svg_renderer } from './svg';
import globalUtiilites from './globalUtiilites';

// Main entry point into ccNetViz libaray
var entry = function(drawingElement, options) {
  let typeOfDE = drawingElement.nodeName;
  console.log(typeOfDE);

  // depending upon the type of element, call its
  // respective constructor
  if (typeOfDE === 'CANVAS') {
    var graph = new ccNetViz(drawingElement, options);
  } else if (typeOfDE === 'svg' || typeOfDE === 'SVG') {
    var svgr = new svg_renderer();
  } else {
    console.warn('Cannot create graph on the given element');
  }

  // data is passed and the graph is drawn on the given drawingElement
  this.set = (data, layout, layout_options = {}, canvas) => {
    if (typeOfDE === 'CANVAS') {
      graph.set(data.nodes, data.edges, layout).then(() => {
        graph.draw();
      });
    } else if (typeOfDE === 'svg' || typeOfDE === 'SVG') {
      const gl = globalUtiilites.getContext(canvas);
      svgr.draw(
        data.nodes,
        data.edges,
        layout,
        layout_options,
        gl,
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
