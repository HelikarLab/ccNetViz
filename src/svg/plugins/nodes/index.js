var generateNode = function() {
  this.set = function(drawEntities, svg, styles) {
    let nodes = drawEntities.nodes;
    nodes.map((node, index) => {
      let currentStyle = this.updateStyles(node, styles);

      this.draw(svg, node.x, node.y, node.uniqid, currentStyle);
    });
  };

  // FUNCTION: checks if the node has individual styles
  this.updateStyles = function(node, styles) {
    let currentStyle;
    if (node.style !== undefined) currentStyle = styles[node.style];
    else currentStyle = styles.node;

    return currentStyle;
  };

  this.customeNode = function(svg, node, x, y, id, styles) {
    // declare variables
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const clipPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'clipPath'
    );
    const image = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image'
    );

    let url = '../' + styles.texture;
    let radius = styles.radius || 5;
    image.setAttribute('href', url);
    image.setAttribute('x', x - radius / 2);
    image.setAttribute('y', y - radius / 2);

    image.setAttribute('height', radius);
    image.setAttribute('weight', radius);

    // let url = '../' + styles.texture;
    // image.setAttribute('xlink:href', url);
    // let cPathURL = 'url(#' + id + ')';
    // image.setAttribute('clip-path', cPathURL);

    // clipPath.setAttribute('id', id);

    // clipPath.appendChild(node);
    // defs.appendChild(clipPath);
    // svg.append(defs);
    svg.append(image);
  };

  this.draw = function(svg, x, y, id, styles) {
    x = x * 500;
    y = y * 500;
    var svgNS = 'http://www.w3.org/2000/svg';
    var currentNode = document.createElementNS(svgNS, 'circle');
    currentNode.setAttributeNS(null, 'cx', x);
    currentNode.setAttributeNS(null, 'cy', y);
    currentNode.setAttributeNS(null, 'r', styles.radius || 5);
    if (styles.texture !== undefined) {
      this.customeNode(svg, currentNode, x, y, id, styles);
    } else {
      currentNode.setAttributeNS(null, 'id', id);
      currentNode.setAttributeNS(null, 'fill', styles.color || 'black');
      currentNode.setAttributeNS(null, 'stroke', 'none');
      svg.appendChild(currentNode);
    }
  };
};

export { generateNode };
