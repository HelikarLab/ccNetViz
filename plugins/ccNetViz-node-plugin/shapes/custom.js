import Shape from "../shape"

let Custom = (config, instance) => {
  class Custom extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Custom';
    }
    _preDraw() {
      switch (this.config.type) {
        case 'square':
          this.config.lines = [{}, { x: 1 }, { x: 1, y: 1 }, { y: 1 }];
          break;
        case 'vee':
          this.config.lines = [{}, { x: 0.5, y: 0.4 }, { x: 1 }, { x: 0.5, y: 1 }, {}];
          break;
        case 'tag':
          this.config.lines = [{}, { x: 0.7 }, { x: 1, y: 0.5 }, { x: 0.7, y: 1 }, { y: 1 }, {}];
          break;
        default:
          break;
      }
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