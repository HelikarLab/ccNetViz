Network graphs visualization library
====================================

[ccNetViz](http://helikarlab.github.io/ccNetViz) is a lightweight (22kB minified), high performance javascript library for large network graphs visualization using WebGL.
It enables custom styling of nodes and edges, dynamic changes of the network, force-directed layout and basic graph interactivity.
Used for example by [Cell Collective](http://cellcollective.org) project.
[ccNetViz](http://helikarlab.github.io/ccNetViz) is open source library available under [GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html) License.

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
  <script src="ccNetViz-1.0.0.min.js"></script>
</head>
<body>
  <canvas id="container"/>
  <script>
    var graph = new ccNetViz(document.getElementById('container'), { styles: { node: { label: { hideSize: 16 } } } });
    var nodes = [
      { label: "Hello" },
      { label: "World!" }
    ];
    var edges = [
      { source: nodes[0], target: nodes[1] }
    ];
    graph.set(nodes, edges, "force");
    graph.draw();
  </script>
</body>
</html>
```