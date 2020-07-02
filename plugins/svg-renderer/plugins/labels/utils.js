export default class {
  // FUNCTION: checks if the node has individual styles
  static updateStyles(node, styles, labelSize) {
    let currentStyle;
    if (node.style !== undefined) currentStyle = styles[node.style];

    if (currentStyle === undefined) currentStyle = styles.node;

    // checks whether to show labels or not, depeneding upon the
    // size of the graph
    if (labelSize < currentStyle.label.hideSize)
      currentStyle.label.font.size = 0;

    return currentStyle;
  }

  static updatePosition(currentLabel, node, height, width, styles) {
    let x = node.x * width;
    let y = node.y * height;
    const radius = styles && styles.size ? styles.size / 2 : 5;
    const fontSize =
      styles && styles.font && styles.font.size ? styles.font.size : 16;

    // for top left quadrant, add label towards bottom right quadrant
    if (x <= width / 2 && y <= height / 2) {
      currentLabel.setAttribute('alignment-baseline', 'hanging');
      y = y + radius;
    }
    // for top right quadrant, add label towards bottom left quadrant
    else if (x >= width / 2 && y <= height / 2) {
      currentLabel.setAttribute('alignment-baseline', 'hanging');
      currentLabel.setAttribute('text-anchor', 'end');
      y = y + radius;
    }
    // for bottom left quadrant, add label towards top right quadrant
    else if (x <= width / 2 && y >= height / 2) {
      const words = node.label.split(' ');
      const wordCount = words.length;
      const verticalShift = fontSize * wordCount;
      currentLabel.setAttribute('alignment-baseline', 'baseline');
      y = y - radius - verticalShift;
    }
    // for bottom right quadrant, add label towards top left quadrant
    else {
      const words = node.label.split(' ');
      const wordCount = words.length;
      const verticalShift = fontSize * wordCount;
      currentLabel.setAttribute('alignment-baseline', 'baseline');
      currentLabel.setAttribute('text-anchor', 'end');
      y = y - radius - verticalShift;
    }

    this.convertText(currentLabel, node.label, x, y, styles);
    return { x, y };
  }

  static convertText(currentLabel, text, x, y, styles) {
    const currentStyle = styles.label.font;
    const words = text.split(' ');
    const fontSize = currentStyle.size;
    const fontWeight = currentStyle.weight;
    const fontFamily = currentStyle.family;
    words.map((word, index) => {
      let currentWord = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'tspan'
      );
      currentWord.setAttribute('x', x);
      if (index == 0) currentWord.setAttribute('dy', '0.7em');
      else {
        currentWord.setAttribute('dy', '1.2em');
      }
      currentWord.setAttribute('font-weight', fontWeight);
      currentWord.setAttribute('font-style', fontWeight);
      currentWord.setAttribute('font-family', fontFamily);
      const textNode = document.createTextNode(word);
      currentWord.appendChild(textNode);
      currentLabel.setAttribute('font-size', fontSize);
      currentLabel.appendChild(currentWord);
    });
  }
}
