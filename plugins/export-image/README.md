## Description

This plugin allows you to export graph images.

### Supported extensions

- Jpeg
- Png
- Webp

## Basic Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ccNetViz example</title>
    <style type="text/css">
      #container {
        width: 500px;
        height: 500px;
      }
    </style>
    <script src="/lib/ccNetViz.js"></script>
    <script src="/lib/plugins/ccNetViz-export-image-plugin.js"></script>
  </head>

  <body>
    <canvas id="container" />
    <script>
      var container = document.getElementById('container');
      var config = {
        styles: {
          node: { texture: 'images/node.png', label: { hideSize: 16 } },
          edge: { arrow: { texture: 'images/arrow.png' } },
        },
      };

      var graph = new ccNetViz(container, config);
      var nodes = [{ label: 'Hello' }, { label: 'World' }, { label: '!' }];

      var edges = [
        { source: nodes[0], target: nodes[1] },
        { source: nodes[1], target: nodes[2] },
        { source: nodes[2], target: nodes[1] },
      ];
      graph.set(nodes, edges, 'force').then(() => {
        graph.draw();
        ccNetViz.plugin.imageExport.init(graph, config, canvas);
      });
    </script>
  </body>
</html>
```

### Methods

| Methods                     | Description                                                                     | Default        |
| --------------------------- | ------------------------------------------------------------------------------- | -------------- |
| init(graph, config, canvas) | Plugin constructor.                                                             |                |
| setScale(scale)             | You can update the graph scale-up multiplier.                                   | 1              |
| setQuality(quality)         | You can update the graph image quality.                                         | 1              |
| setExtension(extension)     | You can update the graph image extension.                                       | jpeg           |
| setResolution(width,height) | You can apply different resolutions, node size, edge size etc. does not affect. |                |
| setName(name)               | With this method, you can change the name of the image to be downloaded.        | ccnetviz-graph |
| export()                    | With this method, you can download the ccNetViz graph as an image               |                |
