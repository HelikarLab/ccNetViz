import ccNetViz_color from '../../../color';

class Shader {
  // FUNCTION: converts rgb color string to int type
  rgbStringToInt(rgbColorString) {
    const rgb = rgbColorString
      .substring(4, rgbColorString.length - 1)
      .replace(/ /g, '')
      .split(',');

    return rgb;
  }

  // FUNCTION: converts the given image data according to a passed color
  // TODO: Use ccNetViz Function instead of conversions
  convertColor(data, styles) {
    let cccolor = new ccNetViz_color(styles.color);
    const requiredColor = this.rgbStringToInt(styles.color);
    var requiredHue = this.rgbToHsl(
      parseInt(requiredColor[0]),
      parseInt(requiredColor[1]),
      parseInt(requiredColor[2])
    );

    for (var i = 0; i < data.length; i += 4) {
      const red = data[i + 0];
      const green = data[i + 1];
      const blue = data[i + 2];
      const alpha = data[i + 3];

      var hsl = this.rgbToHsl(red, green, blue);
      var hue = hsl.h * 360;

      var newRgb = this.hslToRgb(
        requiredHue.h,
        hsl.s * (requiredHue.s * 1.6),
        hsl.l * (requiredHue.l * 1.6)
      );
      data[i + 0] *= cccolor.r;
      data[i + 1] *= cccolor.g;
      data[i + 2] *= cccolor.b;
      data[i + 3] *= cccolor.a;
    }
  }

  // FUNCTION: converts rgb color scheme to hsl scheme
  rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h,
      s: s,
      l: l,
    };
  }

  // FUNCTION: converts hsl color scheme to rgb scheme
  hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  // FUNCTION: checks if the node style has been previously created or not
  // previously created values are stored in hashmap(hMap)
  async lazyCacheNodes(svg, x, y, nodeId, styles, hMap) {
    try {
      const key = this.generateNodeKey(styles);

      if (key in hMap) {
        await this.appendNodeImage(svg, x, y, nodeId, styles, hMap[key]);
      } else {
        const src = await this.getImageData(styles);
        hMap[key] = src;
        await this.appendNodeImage(svg, x, y, nodeId, styles, src);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // FUNCTION: generates a key for hashmap
  generateNodeKey(styles) {
    const size = styles.size || 16;
    const texture = styles.texture;
    const color = styles.color || 'null';
    const key = size + '-' + texture + '-' + color;
    return key;
  }

  // FUNCTION: generates image data from the given image file
  // paints onto a canvas, changes color based on user preference
  // and returns the new image data
  async getImageData(styles) {
    const size = styles.size || 16;
    const texture = styles.texture;

    return new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas');
      canvas.id = 'nodeCanvas';
      let nodeImage = new Image();
      nodeImage.height = size;
      nodeImage.width = size;
      nodeImage.src = texture;
      // wait for image to load
      nodeImage.onload = () => {
        canvas.width = nodeImage.width;
        canvas.height = nodeImage.height;
        let context = canvas.getContext('2d');
        // draw original image here
        context.drawImage(nodeImage, 0, 0);
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        // shift colors according to user preference
        if (styles.color !== undefined) {
          this.convertColor(imageData.data, styles);
        }

        // overwrite the image with new colors
        context.putImageData(imageData, 0, 0);
        const src = canvas.toDataURL();
        resolve(src);
      };
    });
  }

  // FUNCTION: appends the base64 image to the svg bas
  async appendNodeImage(svg, x, y, nodeId, styles, src) {
    return new Promise((resolve, reject) => {
      var newImage = new Image();
      // get image base 64 data from the canvas
      newImage.src = src;
      newImage.onload = function() {
        const svgImage = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'image'
        );
        const size = styles.size || 5;
        svgImage.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          newImage.src
        );
        svgImage.setAttribute('x', x - size / 2);
        svgImage.setAttribute('y', y - size / 2);
        svgImage.setAttribute('id', nodeId);
        svgImage.setAttribute('height', size);
        svgImage.setAttribute('width', size);
        svg.append(svgImage);
        resolve();
      };
    });
  }
}
export default Shader;
