## Description

This plugin allows you to generate and download graphs as SVG format.

## Intialization

- Inside styles(options), add height and width for svg element
- Pass the element inside `ccNetVizAdvanced` constructor

```js
var options = {
  styles: {
    svg: {
      height: 1500,
      width: 1500,
    },
  },
};

var graph = new ccNetVizAdvanced(element, options);
graph.set(nodes, edges, layout).then(() => {
  graph.draw();
});
```

## Usage

When using this plugin to augment ccNetViz's features. You need first import `ccNetViz` liabrary:

```html
<script src="../lib/ccNetViz.js"></script>
```

then simply import this plugin:

```html
<script src="../lib/plugins/ccNetViz-svg-renderer-plugin.js"></script>
```

## Working Example

- SVG Download Graph: http://helikarlab.github.io/ccNetViz/examples/svg_renderer.html

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
    <script src="../lib/plugins/ccNetViz-svg-renderer-plugin.js"></script>
    <script src="../lib/ccNetViz.js"></script>
  </head>

  <body>
    <canvas id="container" />
    <script>
      function init() {
        $('#showGraph').click(showGraph);

        $.ajax({ url: 'data/graph-10-3.json', dataType: 'json' }).done(
          dataLoaded
        );
      }
      function dataLoaded(d) {
        data = d;
        showGraph();
      }

      function showGraph() {
        var styles = {
          svg: {
            height: 1500,
            width: 1500,
          },
          background: {
            color: 'rgb(255, 255, 255)',
          },
          node: {
            minSize: 8, //minimum size of node representation in pixels, default: 6
            maxSize: 16, //maximum size of node representation in pixels, default: 16
            color: 'rgb(148, 187, 247)', //node color (combined with node image), default: "rgb(255, 255, 255)"
            texture: 'images/node.png', //node image
            label: {
              hideSize: 16,
              color: 'rgb(120, 0, 0)', //label color, default: "rgb(120, 120, 120)"
            },
          },
          edge: {
            width: 2, //edge width in pixels, default: 1
            color: 'rgb(204, 204, 204)',
            arrow: {
              minSize: 6, //minimum size of arrow in pixels, default: 6
              maxSize: 12, //maximum size of arrow, default: 12
              aspect: 2, //aspect of arrow image, default: 1
              texture: 'images/arrow.png', //arrow image
              hideSize: 2, //minimum size of arrow to be displayed
            },
            type: 'line',
          },
        };

        var el = document.getElementById('container');
        let svg = document.createElement('svg');
        el.appendChild(svg);

        el.getContext('webgl', { preserveDrawingBuffer: true });
        var conf = {
          styles: styles,
        };

        svg.setAttribute('id', 'downloadSVG');
        svg.setAttribute('background-color', styles.background.color);

        // this will draw the webgl graph on screen
        var graph = new ccNetVizAdvanced(el, conf);
        graph.set(data.nodes, data.edges, 'force');

        // this will draw an svg graph in the background
        var svgGraph = new ccNetVizAdvanced(svg, conf);
        svgGraph.set(data.nodes, data.edges).then(() => {
          svgGraph.draw();
        });
      }

      document.getElementById('down_img').addEventListener(
        'click',
        function() {
          toDownload = document.getElementById('downloadSVG');

          let dataURL = svgDataURL(toDownload);
          download(dataURL);
        },
        false
      );
      function svgDataURL(svg) {
        var svgAsXML = new XMLSerializer().serializeToString(svg);
        return 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);
      }
      function download(dataURL) {
        var dl = document.createElement('a');
        document.body.appendChild(dl); // This line makes it work in Firefox.
        dl.setAttribute('href', dataURL);
        dl.setAttribute('download', 'graph.svg');
        dl.click();
      }

      $(init);
    </script>
  </body>
</html>
```
