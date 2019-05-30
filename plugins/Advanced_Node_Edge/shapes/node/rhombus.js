import Shape from "../shape"

export default class Rhombus extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.moveTo(this.t(0.5), this.t(0));
    this.context.lineTo(this.t(1), this.t(0.5));
    this.context.lineTo(this.t(0.5), this.t(1));
    this.context.lineTo(this.t(0), this.t(0.5));
    this.context.lineTo(this.t(0.5), this.t(0));
    super._draw();
  }
}