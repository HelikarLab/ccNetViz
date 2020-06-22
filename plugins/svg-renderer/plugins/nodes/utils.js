import baseUtils from '../utils/index';

export default class {
  // FUNCTION: checks if the node has individual styles
  static updateStyles(svg, drawEntities, node, styles) {
    let currentStyle;
    //TODO: Might throw error if no styles are applied
    if (node.style !== undefined) currentStyle = styles[node.style];
    else {
      currentStyle = styles.node;
    }

    currentStyle.size = baseUtils.getSize(
      svg,
      currentStyle,
      baseUtils.getNodesCnt(drawEntities),
      0.4
    );

    currentStyle.minSize = currentStyle.minSize || 6;
    currentStyle.maxSize = currentStyle.maxSize || 16;
    currentStyle.color = currentStyle.color || 'rgb(255, 255, 255)';

    return currentStyle;
  }
}
