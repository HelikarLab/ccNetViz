## Description

This plugin allows you to use Cytoscape layouts to your ccNetViz library.

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
    <script src="/lib/plugins/ccNetViz-layout-plugin.js"></script>
    <script src="/lib/ccNetViz.js"></script>
  </head>

  <body>
    <canvas id="container" />
    <script>
      var graph = new ccNetViz(document.getElementById('container'), {
        styles: {
          node: { texture: 'images/node.png', label: { hideSize: 16 } },
        },
      });
      var nodes = [{ label: 'Hello' }, { label: 'World' }, { label: '!' }];
      var edges = [
        { source: nodes[0], style: 'arrow', target: nodes[1] },
        { source: nodes[1], style: 'diamond', target: nodes[2] },
        { source: nodes[2], style: 'T', target: nodes[1] },
      ];

      var layout = ccNetVizPlugins.layout(nodes, edges, {
        name: 'cose',
      });

      graph.set(...layout).then(() => {
        graph.draw();
      });
    </script>
  </body>
</html>
```

## Documentation

### ccNetVizPlugins.layout(Nodes, Edges, Layout);

#### Nodes

Nodes argument is an array of objects describing graph nodes.

#### Edges

Edges argument is an array of objects describing directed graph edges.

#### Layout

More detailed information: [Cytoscape layouts](http://js.cytoscape.org/#layouts)
