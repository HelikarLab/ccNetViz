import Arrow from './shapes/custom';

let Integration = (o, i) => {
  let shapes = [];
  let options = o;
  let instance = i;

  if (typeof options === 'undefined') return { shapes, options };

  if (typeof options.styles === 'undefined') return { shapes, options };

  // Predefined styles
  let arrows = [
    'arrow',
    'arrow short',
    'delta',
    'delta short',
    'diamond',
    'diamond short',
    'T',
    'harpoon up',
    'harpoon down',
    'thin arrow',
  ];
  for (let i = 0; i < arrows.length; i++) {
    const type = arrows[i];
    if (typeof options.styles[type] === 'undefined') {
      options.styles[type] = { arrow: { type: type } };
    } else {
      // Overwriting existing predefined styles.
      options.styles[type].arrow = Object.assign(
        { type: type },
        options.styles[type].arrow
      );
    }
  }
  // Generating styles
  for (let key in options.styles) {
    if (typeof options.styles[key].arrow !== 'undefined') {
      if (typeof options.styles[key].arrow.type !== 'undefined') {
        let style = options.styles[key].arrow;
        if (typeof style.animation !== 'undefined') {
          if (style.animation.status === false) {
            style.texture =
              style.animation.textureFrame[style.animation.scene + 1];

            let shape = new Arrow(
              Object.assign(style, { plugin: 'arrow', key: key }),
              instance,
              true
            );
            shapes.push({
              config: shape.toTexture(),
              name: key,
              plugin: 'arrow',
            });
            continue;
          } else {
            if (typeof style.animation.textureFrame === 'undefined')
              style.animation.textureFrame = [];
            style.animation.textureFrame.push(style.texture);
            delete style.texture;
          }
        } else if (typeof style.temp !== 'undefined') {
          continue;
        }
        let shape = new Arrow(
          Object.assign(style, { plugin: 'arrow', key: key }),
          instance
        );
        shapes.push({ config: shape.toConfig(), name: key, plugin: 'arrow' });
      }
    }
  }

  return { options, shapes };
};

if (typeof ccNetVizPlugins === 'undefined') window.ccNetVizPlugins = {};
ccNetVizPlugins.arrow = { Arrow, Integration };

export default { Arrow, Integration };
