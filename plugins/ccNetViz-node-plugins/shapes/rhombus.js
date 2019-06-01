import Shape from "../shape"

let Rhombus = (config, instance) => {
  class Rhombus extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Rhombus';
    }
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
  return new Rhombus(config, instance)
}

export default Rhombus