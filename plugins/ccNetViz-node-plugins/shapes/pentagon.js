import Shape from "../shape"

let Pentagon = (config, instance) => {
  class Pentagon extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Pentagon';
    }
    _draw() {
      this.context.beginPath();
      this.context.moveTo(this.t(0.5), this.t(0));
      this.context.lineTo(this.t(1), this.t(0.4));
      this.context.lineTo(this.t(0.8), this.t(1));
      this.context.lineTo(this.t(0.2), this.t(1));
      this.context.lineTo(this.t(0), this.t(0.4));
      this.context.lineTo(this.t(0.5), this.t(0));
      super._draw();
    }
  }
  return new Pentagon(config, instance)
}

export default Pentagon