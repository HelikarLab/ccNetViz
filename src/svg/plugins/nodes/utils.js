export default class {
  // FUNCTION: checks if the node has individual styles
  static updateStyles(node, styles) {
    let currentStyle;
    if (
      node.style !== undefined &&
      node.style !== 'internal' &&
      node.style !== 'external'
    )
      currentStyle = styles[node.style];
    else {
      currentStyle = styles.node;
    }

    currentStyle.minSize = currentStyle.minSize || 6;
    currentStyle.maxSize = currentStyle.maxSize || 16;
    currentStyle.size = currentStyle.size || 16;
    currentStyle.color = currentStyle.color || 'rgb(255, 255, 255)';

    return currentStyle;
  }
}
