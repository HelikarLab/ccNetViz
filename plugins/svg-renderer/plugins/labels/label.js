import baseUtils from '../utils/index';
import labelUtils from './utils';

var generateLabels = function() {
  this.set = async function(drawEntities, svg, styles) {
    let nodes = drawEntities.nodes;
    const labelSize = baseUtils.getSize(
      svg,
      styles.node,
      baseUtils.getNodesCnt(drawEntities),
      0.25
    );

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      let currentStyle = labelUtils.updateStyles(node, styles, labelSize);

      await this.draw(svg, node, currentStyle);
    }
  };

  this.draw = async function(svg, node, styles) {
    const height = baseUtils.getSVGDimensions(svg).height;
    const width = baseUtils.getSVGDimensions(svg).width;

    var currentLabel = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );

    const pos = labelUtils.updatePosition(
      currentLabel,
      node,
      height,
      width,
      styles
    );
    const x = pos.x;
    const y = pos.y;

    const labelColor =
      styles && styles.label && styles.label.color
        ? styles.label.color
        : 'black';
    currentLabel.setAttributeNS(null, 'x', x);
    currentLabel.setAttributeNS(null, 'y', y);
    currentLabel.setAttributeNS(null, 'fill', labelColor);
    svg.appendChild(currentLabel);
  };
};

export { generateLabels };
