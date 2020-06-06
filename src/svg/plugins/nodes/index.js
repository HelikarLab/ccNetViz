import baseUtils from '../utils/index';
import nodeUtils from './utils';

var generateNodes = function() {
  this.set = function(drawEntities, svg, styles) {
    const nodes = drawEntities.nodes;
    nodes.map((node, index) => {
      let currentStyle = nodeUtils.updateStyles(node, styles);

      this.draw(svg, node, currentStyle);
    });
  };

  this.customeNode = function(svg, x, y, id, styles) {
    // declare variables
    const image = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image'
    );
    const url = '../' + styles.texture;
    const size = styles.size || 5;
    image.setAttribute('href', url);
    image.setAttribute('x', x - size / 2);
    image.setAttribute('y', y - size / 2);
    image.setAttribute('id', id);
    image.setAttribute('height', size);
    image.setAttribute('weight', size);

    svg.append(image);
  };

  this.draw = function(svg, node, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;
    const x = node.x * height;
    const y = node.y * width;
    var svgNS = 'http://www.w3.org/2000/svg';
    var currentNode = document.createElementNS(svgNS, 'circle');
    currentNode.setAttributeNS(null, 'cx', x);
    currentNode.setAttributeNS(null, 'cy', y);
    currentNode.setAttributeNS(null, 'r', styles.size || 5);
    if (styles.texture !== undefined) {
      this.customeNode(svg, x, y, node.id, styles);
    } else {
      currentNode.setAttributeNS(null, 'id', node.id);
      currentNode.setAttributeNS(null, 'fill', styles.color || 'black');
      currentNode.setAttributeNS(null, 'stroke', 'none');
      svg.appendChild(currentNode);
    }
  };
};

export { generateNodes };
