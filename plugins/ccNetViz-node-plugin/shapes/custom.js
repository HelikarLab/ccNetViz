import Shape from "../shape"

let Custom = (config, instance) => {
  class Custom extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Custom';
    }

    _draw() {
      this.context.beginPath();
      this.config.lines.map(line => {
        this.context.lineTo(this.t(line.x || 0), this.t(line.y || 0));
      });
      this.context.closePath();
      this.context.stroke();
      this.context.fill();
    }
  }
  return new Custom(config, instance)
}

export default Custom