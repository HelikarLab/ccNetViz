import Shape from "../shape"

let Rectangle = (config, instance) => {
  class Rectangle extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Rectangle';
    }
    _draw() {
      this.context.beginPath();
      this.context.moveTo(this.t(0), this.t(0));
      this.context.lineTo(this.t(0), this.t(1));
      this.context.lineTo(this.t(1), this.t(1));
      this.context.lineTo(this.t(1), this.t(0));
      this.context.lineTo(this.t(0), this.t(0));
      super._draw();
    }
  }
  return new Rectangle(config, instance)
}

window.Rectangle = Rectangle;
export default Rectangle