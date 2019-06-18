import Ellipse from "./shapes/ellipse"
import Star from "./shapes/star"
import Polygon from "./shapes/polygon"
import Custom from "./shapes/custom"

let Integration = (o, i) => {
  let shapes = [];
  let options = o;
  let instance = i;

  if (typeof options === "undefined")
    return { shapes, options }

  if (typeof options.styles === "undefined")
    return { shapes, options }

  /**
   * This function can create-manipulate a ccNetViz config with ccNetViz node, arrow plugins.
   * @param {f} function - Shape factory.
   * @param {shapes} Object - Shapes to be created.
   * @param {type} String - Shape type.
   * @return {Array} - Array of texture promises.
   */
  let pluginConfig = (f, shapes, type) => {
    let p = [];

    shapes.map(shape => {
      // Adding predefined styles.
      if (typeof options.styles[shape] === "undefined") {
        options.styles[shape] = f({ type: shape });
      } else {
        // Overwriting existing predefined styles.
        options.styles[shape] = f(Object.assign({ type: shape }, options.styles[shape.name]));
      }
    });

    // Creating predefined and user-def styles.
    for (let key in options.styles) {
      let style = options.styles[key];
      if (style.type === type) {
        let shape = new f(style.config || style, instance);
        p.push({ config: shape.toConfig(), name: key });
      }
    }
    return p;
  }

  // Predefined shapes
  let polygon = pluginConfig(Polygon, ['triangle', 'quadrilateral', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon'], 'Polygon');
  let ellipse = pluginConfig(Ellipse, ['circle', 'ellipse'], 'Ellipse');
  let custom = pluginConfig(Custom, ['square', 'vee', 'tag'], "Custom");

  let s = ['star'];
  for (let spike = 3; spike <= 10; spike++) {
    s.push(`star-${spike}`);
  }

  let star = pluginConfig(Star, s, 'Star');

  shapes = shapes.concat(polygon).concat(star).concat(ellipse).concat(custom);

  return { options, shapes };
}

if (typeof ccNetVizPlugins === 'undefined')
  window.ccNetVizPlugins = {};
ccNetVizPlugins.node = { Ellipse, Star, Polygon, Custom, Integration };

export default { Ellipse, Star, Polygon, Custom, Integration }