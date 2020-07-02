## Description

This plugin allows you to generate and download graphs as SVG format.

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

        svg = document.getElementById('downloadSVG');
        var conf = {
          styles: styles,
        };
        document.getElementById('svgContainer').remove();

        var graph = new ccNetVizAdvanced(svg, conf);
        graph.set(data.nodes, data.edges, 'force').then(() => {
          graph.draw();
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
