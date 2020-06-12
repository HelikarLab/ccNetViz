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
    let x = node.x * height;
    let y = node.y * width;

    // for top left quadrant, add label towards bottom right quadrant
    if (x <= width / 2 && y <= height / 2) {
      x = x + (styles.size + node.weight);
      y = y + (styles.size + node.weight);
    }
    // for top right quadrant, add label towards bottom left quadrant
    else if (x >= width / 2 && y <= height / 2) {
      x = x - (styles.size + node.weight);
      y = y + (styles.size + node.weight);
    }
    // for bottom left quadrant, add label towards top right quadrant
    else if (x >= width / 2 && y <= height / 2) {
      x = x + (styles.size + node.weight);
      y = y - (styles.size + node.weight);
    }
    // for bottom right quadrant, add label towards top left quadrant
    else {
      x = x - (styles.size + node.weight);
      y = y - (styles.size + node.weight);
    }

    var currentLabel = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    const labelColor =
      styles.label && styles.label.color ? styles.label.color : 'black';
    currentLabel.setAttributeNS(null, 'x', x);
    currentLabel.setAttributeNS(null, 'y', y);
    currentLabel.setAttributeNS(null, 'fill', labelColor);
    var txt = document.createTextNode(node.label);
    currentLabel.appendChild(txt);
    svg.appendChild(currentLabel);
  };
};

export { generateLabels };
