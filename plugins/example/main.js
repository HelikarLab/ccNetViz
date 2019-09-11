let Integration = (o, i) => {
  let shapes = [];
  let options = o;

  let delta = (options.styles['delta'] = { type: 'delta' });

  // Generating styles
  let shape = new Node(delta);
  shapes.push({ config: shape.toConfig(), name: 'delta' });

  return { options, shapes };
};

class Node {
  constructor(config, instance) {
    this._draw();
  }

  _draw() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 16;
    this.canvas.height = 16;

    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#333333';
    this.context.beginPath();
    this.context.lineTo(8, 0);
    this.context.lineTo(16, 8);
    this.context.lineTo(8, 16);
    this.context.lineTo(0, 8);
    this.context.lineTo(8, 0);
    this.context.closePath();
    this.context.fill();
  }

  toConfig() {
    return new Promise((resolve, reject) => {
      this.ready = true;
      this.canvas.toBlob(blob => {
        resolve(
          Object.assign({ texture: URL.createObjectURL(blob) }, this.config)
        );
      }, 'image/png');
    });
  }
}

if (typeof ccNetViz === 'undefined') {
  console.warn('ccNetViz example plugin could not be implemented.');
} else {
  if (typeof ccNetViz.plugin === 'undefined') ccNetViz.plugin = {};
  ccNetViz.plugin.example = { Integration };
}

export default { Integration };
