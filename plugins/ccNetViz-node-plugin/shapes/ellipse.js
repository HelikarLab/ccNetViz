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

      this.config.offset = {
        x: 0,
        y: 0
      }

      if (cursor.x1 < cursor.y1) {
        this.config.offset.x = cursor.y1 - cursor.x1;
        cursor.x1 = cursor.y1;
      } else {
        this.config.offset.y = cursor.x1 - cursor.y1;
        cursor.y1 = cursor.x1;
      }

      this.canvas.width = cursor.x1;
      this.canvas.height = cursor.y1;
      this.context = this.canvas.getContext('2d');
      this.context.fillStyle = this.config.textureColor;
      this.context.strokeStyle = this.config.stroke.color;
      this.context.lineWidth = this.config.stroke.size;
    }
    _preDraw() {
      if (this.config.type === 'ellipse') {
        this.config.radiusX = 25;
        this.config.radiusY = 15;
      }
    }
    _draw() {
      this.context.ellipse(
        (this.config.radiusX) + this.config.stroke.size + (this.config.offset.x / 2),
        (this.config.radiusY) + this.config.stroke.size + (this.config.offset.y / 2),
        this.config.radiusX,
        this.config.radiusY, 0, 0, 2 * Math.PI);
      this.context.stroke();
      this.context.fill();
    }
  }
  return new Ellipse(config, instance)
}

export default Ellipse