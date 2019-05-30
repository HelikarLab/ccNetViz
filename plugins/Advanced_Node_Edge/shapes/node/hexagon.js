import Shape from "../shape"

export default class Hexagon extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.moveTo(this.t(0.25), this.t(0));
    this.context.lineTo(this.t(0.75), this.t(0.0));
    this.context.lineTo(this.t(1), this.t(0.5));
    this.context.lineTo(this.t(0.75), this.t(1));
    this.context.lineTo(this.t(0.25), this.t(1));
    this.context.lineTo(this.t(0), this.t(0.5));
    this.context.lineTo(this.t(0.25), this.t(0));
    super._draw();
  }
}