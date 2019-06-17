import Arrow from "./shapes/custom"

export default { Arrow }

if (typeof ccNetVizPlugins === 'undefined')
  window.ccNetVizPlugins = {};
ccNetVizPlugins.Arrow = Arrow;