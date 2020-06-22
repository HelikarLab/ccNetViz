import baseUtils from '../utils/index';
import nodeUtils from './utils';
import Shader from '../shader/shader';

var generateNodes = function() {
  let nodeImageHashMap = {};
  this.set = async function(drawEntities, svg, styles) {
    const nodes = drawEntities.nodes;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let currentStyle = nodeUtils.updateStyles(
        svg,
        drawEntities,
        node,
        styles
      );

      this.draw(svg, node, currentStyle);
    }
  };

  this.customeNode = async function(svg, x, y, id, styles) {
    let shader = new Shader();
    await shader.lazyCacheNodes(
      svg,
      x,
      y,
      'node-' + id,
      styles,
      nodeImageHashMap
    );
  };

  this.draw = async function(svg, node, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;
    const x = node.x * height;
    const y = node.y * width;
    var svgNS = 'http://www.w3.org/2000/svg';
    var currentNode = document.createElementNS(svgNS, 'circle');
    currentNode.setAttributeNS(null, 'cx', x);
    currentNode.setAttributeNS(null, 'cy', y);
    currentNode.setAttributeNS(null, 'r', styles.size / 2 || 5);
    // console.log(styles);
    if (styles && styles.texture !== undefined) {
      await this.customeNode(svg, x, y, node.uniqid, styles);
    } else {
      currentNode.setAttributeNS(null, 'id', 'node-' + node.uniqid);
      currentNode.setAttributeNS(
        null,
        'fill',
        (styles && styles.color) || 'black'
      );
      currentNode.setAttributeNS(null, 'stroke', 'none');
      svg.appendChild(currentNode);
    }
  };
};

export { generateNodes };
