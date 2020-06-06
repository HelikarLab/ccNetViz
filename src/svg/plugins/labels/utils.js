export default class {
  // FUNCTION: checks if the node has individual styles
  static updateStyles(node, styles) {
    let currentStyle;
    if (node.style !== undefined) currentStyle = styles[node.style];
    else currentStyle = styles.node;

    return currentStyle;
  }
}
