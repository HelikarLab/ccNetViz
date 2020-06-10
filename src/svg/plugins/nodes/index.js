import baseUtils from '../utils/index';
import nodeUtils from './utils';
import shader from '../shader/shader';

var generateNodes = function() {
  this.set = function(drawEntities, svg, styles) {
    const nodes = drawEntities.nodes;
    nodes.map((node, index) => {
      let currentStyle = nodeUtils.updateStyles(node, styles);

      this.draw(svg, node, currentStyle);
    });
  };

  this.customeNode = function(svg, x, y, id, styles) {
    shader.imageProcessing(svg, x, y, 'node-' + id, styles);
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
      this.customeNode(svg, x, y, node.uniqid, styles);
    } else {
      currentNode.setAttributeNS(null, 'id', 'node-' + node.uniqid);
      currentNode.setAttributeNS(null, 'fill', styles.color || 'black');
      currentNode.setAttributeNS(null, 'stroke', 'none');
      svg.appendChild(currentNode);
    }
  };
};

export { generateNodes };
