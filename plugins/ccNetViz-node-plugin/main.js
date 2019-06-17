import Ellipse from "./shapes/ellipse"
import Star from "./shapes/star"
import Polygon from "./shapes/polygon"
import Custom from "./shapes/custom"

export default { Ellipse, Star, Polygon, Custom }

if (typeof ccNetVizPlugins === 'undefined')
  window.ccNetVizPlugins = {};
ccNetVizPlugins.node = { Ellipse, Star, Polygon, Custom }