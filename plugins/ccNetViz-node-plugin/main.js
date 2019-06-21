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
        if (typeof options.styles[shape].temp === "undefined") {
          options.styles[shape] = f(Object.assign({ type: shape }, options.styles[shape]));
        }
      }
    });

    // Creating predefined and user-def styles.
    for (let key in options.styles) {
      let style = options.styles[key];
      if (style.type === type) {
        let path = style;
        if (typeof style.config !== "undefined") {
          path = style.config;
        }
        if (typeof path.animation !== "undefined") {
          if (path.animation.status === false) {
            path.texture = path.animation.textureFrame[path.animation.scene + 1];
            let shape = new f(path, instance, true);
            p.push({ config: shape.toTexture(), name: key });
            continue;
          } else {
            if (typeof path.animation.textureFrame === "undefined")
              path.animation.textureFrame = [];
            path.animation.textureFrame.push(path.texture);
            delete path.texture;
          }
        }

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