import Arrow from "./shapes/custom"

let Integration = (o, i) => {
  let shapes = [];
  let options = o;
  let instance = i;

  if (typeof options === "undefined")
    return { shapes, options }

  if (typeof options.styles === "undefined")
    return { shapes, options }

  // Predefined styles
  let arrows = ['arrow', 'arrow short', 'delta', 'delta short', 'diamond', 'diamond short', 'T', 'harpoon up', 'harpoon down', 'thin arrow'];
  for (let i = 0; i < arrows.length; i++) {
    const type = arrows[i];
    if (typeof options.styles[type] === "undefined") {
      options.styles[type] = { arrow: { type: type } };
    } else {
      // Overwriting existing predefined styles.
      options.styles[type].arrow = Object.assign({ type: type }, options.styles[type].arrow);
    }
  }
  // Generating styles
  for (let key in options.styles) {
    if (typeof options.styles[key].arrow !== "undefined") {
      if (typeof options.styles[key].arrow.type !== "undefined") {
        let style = options.styles[key].arrow;
        let shape = new Arrow(Object.assign(style, { plugin: 'arrow', key: key }), instance);
        shapes.push({ config: shape.toConfig(), name: key, plugin: 'arrow' });
      }
    }
  }

  return { options, shapes };
}

if (typeof ccNetVizPlugins === 'undefined')
  window.ccNetVizPlugins = {};
ccNetVizPlugins.arrow = { Arrow, Integration };

export default { Arrow, Integration }