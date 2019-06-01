import Shape from "../shape"

let Hexagon = (config, instance) => {
  class Hexagon extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Hexagon';
    }
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
  return new Hexagon(config, instance)
}

export default Hexagon