### Plugin Structure

All of the plugins must be inside the ccNetVizPlugins object. If the object doesn't exists create one.

The integration structure differs according to the areas you will influence with the plugin.

**Update the nodes-edges**

The plugin can be completely separate, you can run the plugin methods for nodes and edges before the ccNetViz instance is created.

**Update ccNetViz options**

You need to create integration inside to ccNetViz.set method. You can update all of the options inside the set method.

**Create-update the DOM Objects**

The plugin can be completely separate, you can run the plugin methods inside a set method.

If you don’t know what to do, you can create a GitHub issue.

### Development environment

It must be plugins own development environment.

#### Creating files

The plugin needs its own folder inside the plugins folder.
```bash
mkdir src/plugins/new-plugin  
cd src/plugins/new-plugin
```
#### Initializing the Node Package Manager

```bash
npm init
```

#### Installing Babel

```bash
npm install --save-dev @babel-core @babel/preset-env
```

#### Installing Webpack

```bash
npm install --save-dev webpack
```

**Webpack Configuration**
Inside the Webpack configuration output path must be lib/plugins.

```js
var Webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    path: path.join(__dirname, '..', '..', '..', 'lib', 'plugins'),
    filename: 'new-plugin',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
```
Example of `./main.js` for the node plugins;
```js
let Integration = (o, i) => {
  let shapes = [];
  let options = o;

  let delta = options.styles['delta'] = { type: 'delta' };

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
};
```

#### Documentations

**Babel**: [https://babeljs.io/docs/en/](https://babeljs.io/docs/en/)

**Webpack**: [https://webpack.js.org/guides/](https://webpack.js.org/guides/)
