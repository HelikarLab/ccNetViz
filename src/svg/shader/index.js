var effectButton;
var paintButton;
var canvas;
var context;

function init() {
  effectButton = document.getElementById('EffectButton');
  paintButton = document.getElementById('PaintButton');
  canvas = document.getElementById('Canvas');
  console.log(canvas);
  context = canvas.getContext('2d');
  console.log(context);
  var image = document.getElementById('SourceImage');
  console.log(image);

  // Set the canvas the same width and height of the image
  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);
  console.log(context);

  effectButton.addEventListener('click', onClick);
}

function drawImage(image) {
  context.drawImage(image, 0, 0);
}

function onClick() {
  var inpColor = document.getElementById('input-color').value;

  inpColor = inpColor
    .substring(4, inpColor.length - 1)
    .replace(/ /g, '')
    .split(',');

  //   console.log(context);
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData.data);
  convertColor(imageData.data, inpColor);
  console.log(imageData.data);
  context.putImageData(imageData, 0, 0);
}

function convertColor(data, inpColor) {
  var inputHue = rgbToHsl(
    parseInt(inpColor[0]),
    parseInt(inpColor[1]),
    parseInt(inpColor[2])
  );
  for (var i = 0; i < data.length; i += 4) {
    red = data[i + 0];
    green = data[i + 1];
    blue = data[i + 2];
    alpha = data[i + 3];

    // skip transparent/semiTransparent pixels
    if (alpha < 150) {
      continue;
    }

    var hsl = rgbToHsl(red, green, blue);
    var hue = hsl.h * 360;

    // TODO: have an accurate conversion of colours
    // change blueish pixels to the new color
    if (hue > 200 && hue < 300) {
      var newRgb = hslToRgb(
        inputHue.h,
        hsl.s * (inputHue.s * 1.5),
        hsl.l * (inputHue.l * 1.5)
      );
      data[i + 0] = newRgb.r;
      data[i + 1] = newRgb.g;
      data[i + 2] = newRgb.b;
      data[i + 3] = 255;
    }
  }
}

function rgbToHsl(r, g, b) {
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

function hslToRgb(h, s, l) {
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

window.addEventListener('load', init);
