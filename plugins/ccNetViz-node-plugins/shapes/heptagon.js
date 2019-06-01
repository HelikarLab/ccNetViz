import Shape from "../shape"

let Heptagon = (config, instance) => {
  class Heptagon extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Heptagon';
    }
    _draw() {
      this.context.beginPath();
      this.context.moveTo(this.t(0.5), this.t(0));
      this.context.lineTo(this.t(0.9), this.t(0.2));
      this.context.lineTo(this.t(1), this.t(0.7));
      this.context.lineTo(this.t(0.7), this.t(1));
      this.context.lineTo(this.t(0.3), this.t(1));
      this.context.lineTo(this.t(0), this.t(0.7));
      this.context.lineTo(this.t(0.1), this.t(0.2));
      this.context.lineTo(this.t(0.5), this.t(0));
      super._draw();
    }
  }
  return new Heptagon(config, instance)
}

export default Heptagon