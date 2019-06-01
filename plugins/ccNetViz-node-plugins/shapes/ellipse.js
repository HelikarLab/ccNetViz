import Shape from "../shape"

let Ellipse = (config, instance) => {
  class Ellipse extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Ellipse';
    }
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
  return new Ellipse(config, instance)
}

export default Ellipse