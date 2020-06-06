var generateLabel = function() {
  this.set = function(drawEntities, svg, styles) {
    let nodes = drawEntities.nodes;
    nodes.map((node, index) => {
      let currentStyle = this.updateStyles(node, styles);

      this.draw(svg, node.x, node.y, node.label, currentStyle);
    });
  };

  // FUNCTION: checks if the node has individual styles
  this.updateStyles = function(node, styles) {
    let currentStyle;
    if (node.style !== undefined) currentStyle = styles[node.style];
    else currentStyle = styles.node;

    return currentStyle;
  };

  this.draw = function(svg, x, y, label, styles) {
    x = x * 500;
    y = y * 500;
    var currentLabel = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    const labelColor =
      styles.label && styles.label.color ? styles.label.color : 'black';
    currentLabel.setAttributeNS(null, 'x', x + styles.radius / 2);
    currentLabel.setAttributeNS(null, 'y', y + styles.radius);
    currentLabel.setAttributeNS(null, 'fill', labelColor);
    var txt = document.createTextNode(label);
    currentLabel.appendChild(txt);
    svg.appendChild(currentLabel);
  };
};

export { generateLabel };
