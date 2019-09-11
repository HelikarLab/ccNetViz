import Ellipse from './shapes/ellipse';
import Star from './shapes/star';
import Polygon from './shapes/polygon';
import Custom from './shapes/custom';
import PieChart from './shapes/statistical/pie_chart';
import GaugeChart from './shapes/statistical/gauge_chart';
import DoughnutChart from './shapes/statistical/doughnut_chart';
import RadialHistogram from './shapes/statistical/radial_histogram';

let Integration = (o, i) => {
  let shapes = [];
  let options = o;
  let instance = i;

  if (typeof options === 'undefined') return { shapes, options };

  if (typeof options.styles === 'undefined') return { shapes, options };

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
      if (typeof options.styles[shape] === 'undefined') {
        options.styles[shape] = f({ type: shape });
      } else {
        // Overwriting existing predefined styles.
        if (typeof options.styles[shape].temp === 'undefined') {
          let config = options.styles[shape];
          if (typeof config.animation !== 'undefined') {
            if (config.animation.status === false) {
              options.styles[shape] = f(
                Object.assign({ type: shape }, options.styles[shape]),
                undefined,
                true
              );
              return;
            }
          }
          options.styles[shape] = f(
            Object.assign({ type: shape }, options.styles[shape])
          );
        }
      }
    });

    // Creating predefined and user-def styles.
    for (let key in options.styles) {
      let style = options.styles[key];
      if (style.type === type) {
        let path = style;
        if (typeof style.config !== 'undefined') {
          path = style.config;
        }
        if (typeof path.animation !== 'undefined') {
          if (path.animation.status === false) {
            path.texture =
              path.animation.textureFrame[path.animation.scene + 1];
            let shape = new f(path, instance, true);
            p.push({ config: shape.toTexture(), name: key });
            continue;
          } else {
            if (typeof path.animation.textureFrame === 'undefined')
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
  };

  // Predefined shapes
  let polygon = pluginConfig(
    Polygon,
    [
      'triangle',
      'quadrilateral',
      'pentagon',
      'hexagon',
      'heptagon',
      'octagon',
      'nonagon',
    ],
    'Polygon'
  );
  let ellipse = pluginConfig(Ellipse, ['circle', 'ellipse'], 'Ellipse');
  let custom = pluginConfig(Custom, ['square', 'vee', 'tag'], 'Custom');
  let pie_chart = pluginConfig(PieChart, [], 'PieChart');
  let doughnut_chart = pluginConfig(DoughnutChart, [], 'DoughnutChart');
  let gauge_chart = pluginConfig(GaugeChart, [], 'GaugeChart');
  let radial_histogram = pluginConfig(RadialHistogram, [], 'RadialHistogram');

  let s = ['star'];
  for (let spike = 3; spike <= 10; spike++) {
    s.push(`star-${spike}`);
  }

  let star = pluginConfig(Star, s, 'Star');

  shapes = shapes
    .concat(polygon)
    .concat(star)
    .concat(ellipse)
    .concat(custom)
    .concat(pie_chart)
    .concat(gauge_chart)
    .concat(doughnut_chart)
    .concat(radial_histogram);

  return { options, shapes };
};

if (typeof ccNetViz === 'undefined') {
  console.warn('ccNetViz node plugin could not be implemented.');
} else {
  if (typeof ccNetViz.plugin === 'undefined') ccNetViz.plugin = {};
  ccNetViz.plugin.node = {
    Ellipse,
    Star,
    Polygon,
    Custom,
    PieChart,
    GaugeChart,
    DoughnutChart,
    Integration,
  };
}

export default {
  Ellipse,
  Star,
  Polygon,
  Custom,
  PieChart,
  GaugeChart,
  DoughnutChart,
  Integration,
};
