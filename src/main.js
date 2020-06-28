import ccNetViz from './ccNetViz';
import { svg_renderer } from './svg';

// Main entry point into ccNetViz libaray
var entry = function(drawingElement, options) {
  let typeOfDE = drawingElement.nodeName;
  console.log(typeOfDE);

  // depending upon the type of element, call its
  // respective constructor
  if (typeOfDE === 'CANVAS') {
    var graph = new ccNetViz(drawingElement, options);
    return graph;
  } else if (typeOfDE === 'svg' || typeOfDE === 'SVG') {
    var svgr = new svg_renderer(drawingElement, options);
    return svgr;
  } else {
    console.warn('Cannot create graph on the given element');
  }
};

window.entry = entry;
export default entry;
