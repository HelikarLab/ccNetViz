import ccNetViz_color from '../../../../src/color';

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
  convertColor(data, styles) {
    let cccolor = new ccNetViz_color(styles.color);

    for (var i = 0; i < data.length; i += 4) {
      data[i + 0] *= cccolor.r;
      data[i + 1] *= cccolor.g;
      data[i + 2] *= cccolor.b;
      data[i + 3] *= cccolor.a;
    }
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
    const texture = styles.texture;

    return new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas');
      canvas.id = 'nodeCanvas';
      let nodeImage = new Image();
      nodeImage.src = texture;
      // wait for image to load
      nodeImage.onload = () => {
        canvas.width = nodeImage.height;
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
  appendNodeImage(svg, x, y, nodeId, styles, src) {
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
