import baseUtils from '../utils/index';

export default class {
  // FUNCTION: checks if the node has individual styles
  static updateStyles(svg, drawEntities, node, styles) {
    let currentStyle;
    if (node.style !== undefined) currentStyle = styles[node.style];

    if (currentStyle === undefined) currentStyle = styles.node;

    return currentStyle;
  }
}
