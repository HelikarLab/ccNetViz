import ccNetViz from './ccNetViz';
import { svg_renderer } from './svg';
import globalUtiilites from './globalUtiilites';

var entry = function(drawingElement, options) {
  let typeOfDE = drawingElement.nodeName;

  if (typeOfDE === 'CANVAS') {
    var graph = new ccNetViz(drawingElement, options);
  } else if (typeOfDE === 'svg') {
    var svgr = new svg_renderer();
  } else {
    console.warn('Cannot create graph on the given element');
  }

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
