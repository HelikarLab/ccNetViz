Network graphs visualization library
====================================

[ccNetViz](http://helikarlab.github.io/ccNetViz) is a lightweight (22kB minified), high performance javascript library for large network graphs visualization using WebGL.
It enables custom styling of nodes and edges in css like way, curve edges, dynamic changes of the network, force-directed layout and basic graph interactivity.
Used for example by [Cell Collective](http://cellcollective.org) project.
[ccNetViz](http://helikarlab.github.io/ccNetViz) is open source library available under [GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html) License.

**Basic Example**
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
    var graph = new ccNetViz(document.getElementById('container'), {
      styles: {
        node: { texture: "images/node.png", label: { hideSize: 16 } },
        edge: { arrow: { texture: "images/arrow.png" } }
      }});
    var nodes = [
      { label: "Hello" },
      { label: "World" },
      { label: "!" }
    ];
    var edges = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[1], target: nodes[2] },
      { source: nodes[2], target: nodes[1] }
    ];
    graph.set(nodes, edges, "force");
    graph.draw();
  </script>
</body>
</html>
```

**Documentation**

***ccNetViz(element, options)***

Creates new ccNetViz graph renderer attached to canvas element specified as first argument, styled with styles defined in styles property of options parameter.

*Example style options*

```javascript
{
  styles: {
    background: { color: "rgb(0, 0, 0)" },  //background color of canvas, default: "rgb(255, 255, 255)"
    node: { //predefined style
      minSize: 8,   //minimum size of node representation in pixels, default: 6
      maxSize: 16,    //maximum size of node representation in pixels, default: 16
      color: "rgb(255, 0, 0)",  //node color (combined with node image), default: "rgb(255, 255, 255)"
      texture: "images/circle.png",   //node image
      label: {
        hideSize: 16,   //minimum size (height) for the label to be displayed
        color: "rgb(120, 0, 0)",  //label color, default: "rgb(120, 120, 120)"
        font: "15px Arial, Helvetica, sans-serif" //label font, default: "11px Arial, Helvetica, sans-serif"
      }
    },
    edge: {   //predefined style
      width: 2,   //edge width in pixels, default: 1
      color: "rgb(86, 86, 86)",   //edge color, default: "rgb(204, 204, 204)"
      arrow: {
        minSize: 6,   //minimum size of arrow in pixels, default: 6
        maxSize: 12,  //maximum size of arrow, default: 12
        aspect: 2,  //aspect of arrow image, default: 1
        texture: "images/arrow.png",  //arrow image
        hideSize: 2   //minimum size of arrow to be displayed
      }
    },
    nodeBlue: {   //custom style
      color: "rgb(0, 0, 255)"
    },
    nodeGiant: {  //custom style
      minSize: 16
    },
    nodeWithSmallBlueLabel: {   //custom style
      label: {
        color: "rgb(0, 0, 255)",
        font: "11px Arial, Helvetica, sans-serif"
      }
    },
    edgeWideYellow: {   //custom style
      width: 4,
      color: "rgb(255, 255, 0)"
    },
    edgeWithWhiteArrow: {   //custom style
      arrow: {
        color: "rgb(255, 255, 255)"
      }
    }
  }
}
```

There are three predefined styles:

node: default style used for all nodes

edge: default style used for all edges

background: default style used for canvas background

All default property values of these styles can be overriden (as in example above).

Besides overriding default styles (used for all nodes / edges) it is possible to define custom styles (like "nodeBlue" etc. in example above) and then use this style just for specified subset of nodes / edges (see bellow how to define style for given node / edge). Property values specified for given custom style override default style values.
