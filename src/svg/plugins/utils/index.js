export default class {
  static getSVGDimensions(svg) {
    // let height = svg.height.baseVal.value;
    // let width = svg.width.baseVal.value;

    let height = svg.getAttribute('height');
    let width = svg.getAttribute('width');

    return { height, width };
  }

  // FUNCTION: returns number of nodes
  static getNodesCnt(drawEntities) {
    return drawEntities.nodes.length;
  }

  // FUNCTION: return number of edges
  static getEdgesCnt(drawEntities) {
    return (
      drawEntities.lines.length +
      drawEntities.curves.length +
      drawEntities.circles.length
    );
  }

  // FUNCTION: Gives a number through which curve can be formed
  // Similar to `src/ccNetViz` -> 385
  static getSize(context, styles, count, sc) {
    let svg = this.getSVGDimensions(context);

    // multiplied by 0.5 as done in `src/ccNetViz` on line -> 445,446
    let height = svg.height * 0.5;
    let width = svg.width * 0.5;

    let result = sc * Math.sqrt((width * height) / (count + 1));
    if (styles) {
      let min = styles.size ? styles.size : styles.minSize;
      let max = styles.size ? styles.size : styles.maxSize;

      result = max ? Math.min(max, result) : result;
      if (result < styles.hideSize) return 0;
      result = min ? Math.max(min, result) : result;
    }
    return result;
  }
}
