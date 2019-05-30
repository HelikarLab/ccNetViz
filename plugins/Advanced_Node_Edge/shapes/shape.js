export default class Shape {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.default = {};

    this._preConf();
    this._setCanvas();
    this._draw();
    this.toBlob = new Promise((resolve, reject) => {
      this.canvas.toBlob(blob => {
        resolve(blob);
      }, 'image/png');
    });
  }

  // Before the drawing; when the config is existed override the default config.
  _preConf() {
    // Default config
    this.default = {
      stroke: {
        color: "#333333",
        size: 0,
      },
      textureColor: "#999999",
      size: 16
    };

    if (typeof this.config !== "undefined") {
      if (typeof this.config.stroke !== "undefined") {
        this.config.stroke.size = this.config.stroke.size || this.default.stroke.size;
        this.config.stroke.color = this.config.stroke.color || this.default.stroke.color;
      } else {
        this.config.stroke = this.default.stroke;
      }
      this.config.textureColor = this.config.textureColor || this.default.textureColor;
      this.config.size = this.config.size || this.default.size;

    } else {
      this.config = this.default;
    }
    this.canvas.width = 0;
    this.canvas.height = 0;
  }

  // Setting up the canvas width, height. Also, creating canvas context and colors.
  _setCanvas() {
    let cursor = {
      x0: this.canvas.width,
      y0: this.canvas.height,
      x1: this.canvas.width + ((this.config.stroke.size * 2) + this.config.size),
      y1: this.canvas.height + ((this.config.stroke.size * 2) + this.config.size)
    };
    this.canvas.width = cursor.x1;
    this.canvas.height = cursor.y1;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = this.config.textureColor;
    this.context.strokeStyle = this.config.stroke.color;
    this.context.lineWidth = (this.config.stroke.size);
    document.body.appendChild(this.canvas);
  }

  _draw() {
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  }

  // Canvas transform into the 0-1 range
  t(size) {
    return (this.config.stroke.size) + (this.config.size * size);
  }
}