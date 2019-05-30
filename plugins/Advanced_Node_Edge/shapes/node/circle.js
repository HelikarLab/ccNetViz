import Shape from "../shape"

export default class Circle extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.arc(
      (this.config.size / 2) + this.config.stroke.size,
      (this.config.size / 2) + this.config.stroke.size,
      this.config.size / 2, 0, 2 * Math.PI);
    super._draw();
  }
}