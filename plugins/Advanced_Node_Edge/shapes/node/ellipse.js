import Shape from "../shape"

export default class Ellipse extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.ellipse(
      (this.config.size / 2) + this.config.stroke.size,
      (this.config.size / 2) + this.config.stroke.size,
      this.config.size / 2,
      this.config.size / 4, Math.PI / 4, 0, 2 * Math.PI);
    super._draw();
  }
}