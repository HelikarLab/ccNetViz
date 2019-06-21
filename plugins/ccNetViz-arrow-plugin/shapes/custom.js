import Shape from "../shape"

let Custom = (config, instance, t) => {
  class Custom extends Shape {
    constructor(config, instance, t) {
      super(config, instance, t);
      this.type = 'Arrow';
    }

    _preDraw() {
      if (typeof this.config.lines === "undefined") {
        switch (this.config.type) {
          case 'delta':
          case 'arrow':
            this.config.lines = [{ y: 1, x: 0.5 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { y: 1, x: 0.5 }];
            break;
          case 'delta short':
          case 'arrow short':
            this.config.lines = [{ y: 0.7, x: 0.5 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { y: 0.7, x: 0.5 }];
            break;
          case 'diamond':
            this.config.lines = [{ x: 0.5, y: 0 }, { x: 1, y: 0.5 }, { x: 0.5, y: 1 }, { x: 0, y: 0.5 }, { x: 0.5 }];
            break;
          case 'diamond short':
            this.config.lines = [{ x: 0.5, y: 0.2 }, { x: 1, y: 0.5 }, { x: 0.5, y: 0.8 }, { x: 0, y: 0.5 }, { x: 0.5, y: 0.2 }];
            break;
          case 'T':
            this.config.lines = [{ x: 0, y: 0.9 }, { x: 1, y: 0.9 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0.9 }];
            break;
          case 'harpoon up':
            this.config.lines = [{ x: 0.5 }, { x: 1, y: 0 }, { x: 0.5, y: 1 }, { x: 0.5, y: 0 }];
            break;
          case 'harpoon down':
            this.config.lines = [{}, { x: 0.5, y: 1 }, { x: 0.5, y: 0 }, {}];
            break;
          case 'thin arrow':
            this.config.lines = [{}, { x: 0.5, y: 1 }, { x: 1, y: 0 }, { x: 0.9, y: 0 }, { x: 0.5, y: 0.9 }, { x: 0.1, y: 0 }, {}];
            break;
          default:
            this.config.lines = [];
            // TODO : WIKI
            break;
        }
      }
    }

    _draw() {
      this.context.beginPath();
      this.config.lines.map(line => {
        this.context.lineTo(this.x(line.x || 0), this.y(line.y || 0));
      });
      this.context.closePath();
      this.context.stroke();
      this.context.fill();
    }
  }
  return new Custom(config, instance, t);
}

export default Custom