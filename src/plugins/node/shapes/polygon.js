import Shape from '../shape';

let Polygon = (config, instance, t) => {
  class Polygon extends Shape {
    constructor(config, instance, t) {
      super(config, instance, t);
      this.type = 'Polygon';
    }
    _preDraw() {
      switch (this.config.type) {
        case 'triangle':
          this.config.edges = 3;
          break;
        case 'quadrilateral':
          this.config.edges = 4;
          break;
        case 'pentagon':
          this.config.edges = 5;
          break;
        case 'hexagon':
          this.config.edges = 6;
          break;
        case 'heptagon':
          this.config.edges = 7;
          break;
        case 'octagon':
          this.config.edges = 8;
          break;
        case 'nonagon':
          this.config.edges = 9;
          break;
        case 'decagon':
          this.config.edges = 9;
          break;
        default:
          break;
      }
    }
    _draw() {
      this.context.beginPath();
      let edges = this.config.edges || 3;
      let degree = 360 / edges;
      let radius = this.config.size / 2;

      for (let i = 0; i < edges; i++) {
        let theta = degree * (i + 1) * (Math.PI / 180);
        let center = radius + this.config.stroke.size;

        let x = center + radius * Math.cos(theta);
        let y = center + radius * Math.sin(theta);
        this.context.lineTo(x, y);
      }

      this.context.closePath();
      this.context.stroke();
      this.context.fill();
    }
  }
  return new Polygon(config, instance, t);
};

export default Polygon;
