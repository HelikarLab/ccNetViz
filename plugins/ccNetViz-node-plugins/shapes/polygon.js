import Shape from "../shape"

let Polygon = (config, instance) => {
  class Polygon extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Polygon';
    }
    _draw() {
      this.context.beginPath();
      let edges = this.config.edges || 3;
      let degree = 360 / edges;
      let radius = this.config.size / 2;

      for (let i = 0; i < edges; i++) {
        let x = radius + this.config.stroke.size + (radius * Math.cos((degree * (i + 1)) * (Math.PI / 180)));
        let y = radius + this.config.stroke.size + (radius * Math.sin((degree * (i + 1)) * (Math.PI / 180)));
        this.context.lineTo(x, y);
      }

      super._draw();
    }
  }
  return new Polygon(config, instance)
}

export default Polygon