import animation from './animation';

export default class Shape {
  constructor(config, instance, t) {
    this.config = config;
    this.textureReady = t;

    if (typeof this.textureReady === 'undefined') {
      this._preConf();
      this._preAnimation();
    } else {
      this.config.animation.scene = animation.config.scene;
    }
    this._setAnimation(instance);

    if (typeof this.textureReady === 'undefined') {
      this.canvas = document.createElement('canvas');
      this.canvas.width = 0;
      this.canvas.height = 0;
      this.ready = false;

      this._setCanvas();
      this._setGradient();
      this._preDraw();
      this._draw();
    }
  }

  // Before the drawing; when the config is existed override the default config.
  _preConf() {
    // Default config
    this.default = {
      stroke: {
        color: '#ffffff',
        size: 0.00000001,
        round: false,
      },
      textureColor: '#2257a4',
      size: 20,
      minSize: 6,
      maxSize: 16,
      label: {
        color: 'rgb(120, 120, 120)',
        font: { type: 'Arial, Helvetica, sans-serif', size: 11 },
      },
    };

    if (typeof this.config !== 'undefined') {
      // Stroke configuration
      if (typeof this.config.stroke !== 'undefined') {
        this.config.stroke.size =
          this.config.stroke.size || this.default.stroke.size;
        this.config.stroke.color =
          this.config.stroke.color || this.default.stroke.color;
        this.config.stroke.round =
          this.config.stroke.round || this.default.stroke.round;
      } else {
        this.config.stroke = this.default.stroke;
      }

      // Label configuration
      if (typeof this.config.label !== 'undefined') {
        this.config.label.color =
          this.config.label.color || this.default.label.color;
        this.config.label.font =
          this.config.label.font || this.default.label.font;
      } else {
        this.config.label = this.default.label;
      }

      this.config.size = this.config.size || this.default.size;
      this.config.minSize = this.config.minSize || this.default.maxSize;
      this.config.maxSize = this.config.maxSize || this.default.maxSize;
      this.config.textureColor =
        this.config.textureColor || this.default.textureColor;
    } else {
      this.config = this.default;
    }
  }

  _preAnimation() {
    if (typeof this.config.animation !== 'undefined') {
      // Convert the rgb and hex color to [r,g,b]
      let convertColor = color => {
        if (!color) return [0, 0, 0];
        if (color.indexOf('rgb') >= 0) {
          return color
            .replace(/([A-z]|[().])+/g, '')
            .split(',')
            .map(i => parseInt(i));
        } else if (color.indexOf('#') >= 0) {
          color = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(
            m,
            r,
            g,
            b
          ) {
            return r + r + g + g + b + b;
          });

          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
          return result
            ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
              ]
            : [0, 0, 0];
        }
        return [0, 0, 0];
      };

      // Creating color gradients for animated node colors
      // @s Start color [r,g,b]
      // @e End color [r,g,b]
      // @c Count count of color code int
      let colorGradient = (s, e, c) => {
        let start = s;
        let end = e;
        let alpha = 0.0;
        let colors = [];

        const len = c;

        for (let i = 0; i < len + 1; i++) {
          let c = [];
          alpha += 1.0 / len;

          c[0] = start[0] * alpha + (1 - alpha) * end[0];
          c[1] = start[1] * alpha + (1 - alpha) * end[1];
          c[2] = start[2] * alpha + (1 - alpha) * end[2];

          colors[i] = `rgb(${Math.abs(Math.floor(c[0]))},${Math.abs(
            Math.floor(c[1])
          )},${Math.abs(Math.floor(c[2]))})`;
        }
        return colors;
      };

      // Animation configurations
      if (this.config.animation.type === 'color') {
        if (typeof this.config.animation.colors === 'undefined') {
          let colors = colorGradient(
            convertColor(this.config.animation.color),
            convertColor(this.config.textureColor),
            animation.config.frameCount / 2 || 0
          );
          this.config.animation.colors = colors.concat(
            colors.slice().reverse()
          );
        }
        this.config.animation.scene = animation.config.scene;
        if (typeof this.config.animation.colors !== 'undefined')
          this.config.textureColor = `${this.config.animation.colors[
            this.config.animation.frame
          ] || this.config.textureColor}`;
      } else if (this.config.animation.type === 'stroke') {
        this.config.stroke.color = this.config.animation.color || '#000';
        this.config.animation.scene = animation.config.scene;
        if (typeof this.config.animation.colors === 'undefined') {
          let colors = colorGradient(
            convertColor(this.config.animation.color),
            convertColor(this.config.textureColor),
            animation.config.frameCount / 2 || 0
          );
          this.config.animation.colors = colors.concat(
            colors.slice().reverse()
          );
        }
        if (
          this.config.animation.scene + 1 <=
          animation.config.frameCount / 2
        ) {
          this.config.stroke.size = this.config.stroke.size + 0.5;
        } else {
          this.config.stroke.size = this.config.stroke.size - 0.5;
        }

        if (typeof this.config.animation.colors !== 'undefined')
          this.config.stroke.color = `${this.config.animation.colors[
            this.config.animation.frame
          ] || this.config.textureColor}`;
      } else {
        if (
          this.config.animation.scene + 1 <=
          animation.config.frameCount / 2
        ) {
          this.config.size = this.config.size + 0.3;
        } else {
          this.config.size = this.config.size - 0.3;
        }

        this.config.animation.scene = animation.config.scene;
      }
    } else {
      this.config.temp = this.config.texture;
    }
  }

  async _setAnimation(instance) {
    if (
      typeof instance !== 'undefined' &&
      typeof this.config.animation !== 'undefined'
    ) {
      // Recursive check for the texture
      if (this.ready && instance.findArea(0, 0, 1, 1, 1, 0).nodes.length) {
        this.config.animation.status = animation.status;
        if (typeof this.config.animation.frame === 'undefined') {
          if (typeof this.config.type !== 'undefined')
            animation.addListener(this.config.type);
          this.config.animation.frame = 0;
        }
        animation.draw(instance, this.config.animation.frame++);
      } else {
        await new Promise(resolve => setTimeout(resolve, 50));
        this._setAnimation(instance);
      }
    }
  }

  // Setting up the canvas width, height. Also, creating canvas context and colors.
  _setCanvas() {
    let cursor = {
      x0: this.canvas.width,
      y0: this.canvas.height,
      x1: this.canvas.width + (this.config.stroke.size * 2 + this.config.size),
      y1: this.canvas.height + (this.config.stroke.size * 2 + this.config.size),
    };
    this.canvas.width = cursor.x1;
    this.canvas.height = cursor.y1;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = this.config.textureColor;
    this.context.strokeStyle = this.config.stroke.color;
    this.context.lineWidth = this.config.stroke.size;
    this.config.stroke.round ? (this.context.lineJoin = 'round') : false;
  }

  _setGradient() {
    if (typeof this.config.textureGradient !== 'undefined') {
      let gradient = this.context.createLinearGradient(
        0,
        0,
        typeof this.config.textureGradient[0].x !== 'undefined'
          ? this.canvas.width
          : 0,
        typeof this.config.textureGradient[0].y !== 'undefined'
          ? this.canvas.height
          : 0
      );
      this.config.textureGradient.map(item => {
        gradient.addColorStop(
          item.x || item.y || 0,
          item.color || this.config.textureColor
        );
      });
      this.context.fillStyle = gradient;
    }
  }

  _preDraw() {}

  _draw() {}

  // Canvas transform into the 0-1 range
  t(size) {
    return this.config.stroke.size + this.config.size * size;
  }

  toConfig() {
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(blob => {
        resolve(
          Object.assign({ texture: URL.createObjectURL(blob) }, this.config)
        );
        this.ready = true;
      }, 'image/png');
    });
  }

  toTexture() {
    return new Promise((resolve, reject) => {
      resolve(this.config);
      this.ready = true;
    });
  }
}
