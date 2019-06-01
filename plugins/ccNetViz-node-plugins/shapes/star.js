import Shape from "../shape"

let Star = (config, instance) => {
  class Star extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Star';
    }
    _draw() {
      this.context.beginPath();
      this.context.moveTo(this.t(0.5), this.t(0));
      this.context.lineTo(this.t(0.8), this.t(1));
      this.context.lineTo(this.t(0), this.t(0.4));
      this.context.lineTo(this.t(1), this.t(0.4));
      this.context.lineTo(this.t(0.2), this.t(1));
      super._draw();
    }
  }
  return new Star(config, instance)
}

window.Star = Star;
export default Star