export default class {
  static getSVGDimensions(svg) {
    let height = svg.height.baseVal.value;
    let width = svg.width.baseVal.value;

    return { height, width };
  }
}
