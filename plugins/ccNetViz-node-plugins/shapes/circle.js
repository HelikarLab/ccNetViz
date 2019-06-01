import Shape from "../shape"

let Circle = (config, instance) => {
  class Circle extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Circle';
    }
    _draw() {
      this.context.beginPath();
      this.context.arc(
        (this.config.size / 2) + this.config.stroke.size,
        (this.config.size / 2) + this.config.stroke.size,
        this.config.size / 2, 0, 2 * Math.PI);
      super._draw();
    }
  }
  return new Circle(config, instance)
}

window.Circle = Circle;
export default Circle