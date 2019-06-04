import Shape from "../shape"

let Ellipse = (config, instance) => {
  class Ellipse extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Ellipse';
    }
    _setCanvas() {
      this.config.radiusX = this.config.radiusX || 16;
      this.config.radiusY = this.config.radiusY || 16;

      let cursor = {
        x0: this.config.radiusX,
        y0: this.config.radiusY,
        x1: this.config.radiusX + ((this.config.stroke.size * 2) + this.config.radiusX),
        y1: this.config.radiusY + ((this.config.stroke.size * 2) + this.config.radiusY)
      };
      cursor.x1 > cursor.x2 ? cursor.x1 = cursor.x2 : false;
      this.canvas.width = cursor.x1;
      this.canvas.height = cursor.x1;
      this.context = this.canvas.getContext('2d');
      this.context.fillStyle = this.config.textureColor;
      this.context.strokeStyle = this.config.stroke.color;
      this.context.lineWidth = this.config.stroke.size;
    }
    _draw() {
      this.context.ellipse(
        (this.config.radiusX) + this.config.stroke.size,
        (this.config.radiusY) + this.config.stroke.size,
        this.config.radiusX,
        this.config.radiusY, 0, 0, 2 * Math.PI);
      super._draw();
    }
  }
  return new Ellipse(config, instance)
}

export default Ellipse