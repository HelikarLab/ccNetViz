import ccNetViz from './ccNetViz';

// Main entry point into ccNetViz libaray
function ccNetVizAdvanced(drawingElement, ...args) {
  let typeOfDE = drawingElement.nodeName.toLowerCase();

  const renderer = ccNetVizAdvanced.prototype.elementRenderers[typeOfDE];

  if (!renderer) {
    throw new Error(`No renderer for ${typeOfDE} element`);
  }

  return new renderer(drawingElement, ...args);
}

ccNetVizAdvanced.prototype.elementRenderers = {
  canvas: ccNetViz,
};

window.ccNetVizAdvanced = ccNetVizAdvanced;
export default ccNetViz;
export { ccNetVizAdvanced };
