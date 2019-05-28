class Shape {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;

    // Default config
    this.default = {
      stroke: {
        color: "#333333",
        size: 0,
      },
      color: "#999999",
      size: 16
    };

    this._preConf();
    this._setCanvas();
    this._draw();
    this.toBlob = new Promise((resolve, reject) => {
      this.canvas.toBlob(blob => {
        resolve(blob)
      }, 'image/png');
    });
  }

  // Before the drawing; when the config is existed override the default config.
  _preConf() {
    if (typeof this.config !== "undefined") {
      if (typeof this.config.stroke !== "undefined") {
        this.config.stroke.size = this.config.stroke.size || this.default.stroke.size;
        this.config.stroke.color = this.config.stroke.color || this.default.stroke.color;
      } else {
        this.config.stroke = this.default.stroke;
      }
      this.config.color = this.config.color || this.default.color;
      this.config.size = this.config.size || this.default.size;
    } else {
      this.config = this.default;
    }
    this.canvas.width = 0;
    this.canvas.height = 0;
  }

  // Setting up the canvas width, height. Also, creating canvas context and colors.
  _setCanvas() {
    this.config.cursor = {
      x0: this.canvas.width,
      y0: this.canvas.height,
      x1: this.canvas.width + ((this.config.stroke.size * 2) + this.config.size),
      y1: this.canvas.height + ((this.config.stroke.size * 2) + this.config.size)
    };
    this.canvas.width = this.config.cursor.x1;
    this.canvas.height = this.config.cursor.y1;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = this.config.color;
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

class Circle extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.arc(
      (this.config.size / 2) + this.config.stroke.size,
      (this.config.size / 2) + this.config.stroke.size,
      this.config.size / 2, 0, 2 * Math.PI);
    super._draw();
  }
}

class Ellipse extends Shape {
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

class Triangle extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.moveTo(this.t(0.5), this.t(0));
    this.context.lineTo(this.t(1), this.t(1));
    this.context.lineTo(this.t(0), this.t(1));
    this.context.lineTo(this.t(0.5), this.t(0));
    super._draw();
  }
}

class Rectangle extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.moveTo(this.t(0), this.t(0));
    this.context.lineTo(this.t(0), this.t(1));
    this.context.lineTo(this.t(1), this.t(1));
    this.context.lineTo(this.t(1), this.t(0));
    this.context.lineTo(this.t(0), this.t(0));
    super._draw();
  }
}

class Rhombus extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.moveTo(this.t(0.5), this.t(0));
    this.context.lineTo(this.t(1), this.t(0.5));
    this.context.lineTo(this.t(0.5), this.t(1));
    this.context.lineTo(this.t(0), this.t(0.5));
    this.context.lineTo(this.t(0.5), this.t(0));
    super._draw();
  }
}

class Pentagon extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.moveTo(this.t(0.5), this.t(0));
    this.context.lineTo(this.t(1), this.t(0.4));
    this.context.lineTo(this.t(0.8), this.t(1));
    this.context.lineTo(this.t(0.2), this.t(1));
    this.context.lineTo(this.t(0), this.t(0.4));
    this.context.lineTo(this.t(0.5), this.t(0));
    super._draw();
  }
}

class Hexagon extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.moveTo(this.t(0.25), this.t(0));
    this.context.lineTo(this.t(0.75), this.t(0.0));
    this.context.lineTo(this.t(1), this.t(0.5));
    this.context.lineTo(this.t(0.75), this.t(1));
    this.context.lineTo(this.t(0.25), this.t(1));
    this.context.lineTo(this.t(0), this.t(0.5));
    this.context.lineTo(this.t(0.25), this.t(0));
    super._draw();
  }
}

class Heptagon extends Shape {
  _draw() {
    this.context.beginPath();
    this.context.moveTo(this.t(0.5), this.t(0));
    this.context.lineTo(this.t(0.9), this.t(0.2));
    this.context.lineTo(this.t(1), this.t(0.7));
    this.context.lineTo(this.t(0.7), this.t(1));
    this.context.lineTo(this.t(0.3), this.t(1));
    this.context.lineTo(this.t(0), this.t(0.7));
    this.context.lineTo(this.t(0.1), this.t(0.2));
    this.context.lineTo(this.t(0.5), this.t(0));
    super._draw();
  }
}

class Star extends Shape {
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

export { Circle, Ellipse, Triangle, Rectangle, Rhombus, Pentagon, Hexagon, Heptagon, Star }