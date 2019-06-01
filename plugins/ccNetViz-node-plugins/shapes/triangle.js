import Shape from "../shape"

let Triangle = (config, instance) => {
  class Triangle extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Triangle';
    }
    _draw() {
      this.context.beginPath();
      this.context.moveTo(this.t(0.5), this.t(0));
      this.context.lineTo(this.t(1), this.t(1));
      this.context.lineTo(this.t(0), this.t(1));
      this.context.lineTo(this.t(0.5), this.t(0));
      super._draw();
    }
  }
  return new Triangle(config, instance)
}

window.Triangle = Triangle;
export default Triangle