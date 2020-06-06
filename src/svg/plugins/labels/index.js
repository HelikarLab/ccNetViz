import baseUtils from '../utils/index';
import labelUtils from './utils';

var generateLabels = function() {
  this.set = function(drawEntities, svg, styles) {
    let nodes = drawEntities.nodes;
    nodes.map((node, index) => {
      let currentStyle = labelUtils.updateStyles(node, styles);

      this.draw(svg, node, currentStyle);
    });
  };

  this.draw = function(svg, node, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;
    const x = node.x * height;
    const y = node.y * width;

    //TODO: change label position based on its coordinates

    var currentLabel = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    const labelColor =
      styles.label && styles.label.color ? styles.label.color : 'black';
    currentLabel.setAttributeNS(null, 'x', x + styles.size / 2);
    currentLabel.setAttributeNS(null, 'y', y + styles.size);
    currentLabel.setAttributeNS(null, 'fill', labelColor);
    var txt = document.createTextNode(node.label);
    currentLabel.appendChild(txt);
    svg.appendChild(currentLabel);
  };
};

export { generateLabels };
