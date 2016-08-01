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
  <script src="dist/ccNetViz.min.js"></script>
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

**Advanced Examples**

* Advanced styling - [live example](http://github.alessaska.cz/HelikarLab/ccNetViz/master/examples/styles.html)
* Complex graphs - [live example](http://github.alessaska.cz/HelikarLab/ccNetViz/master/examples/complex.html)
* Mouse event on hover - [live example](http://github.alessaska.cz/HelikarLab/ccNetViz/master/examples/interactivity_hover.html)
* Mouse events on move - [live example](http://github.alessaska.cz/HelikarLab/ccNetViz/master/examples/interactivity_move.html)
* Multi level - [live example](http://github.alessaska.cz/HelikarLab/ccNetViz/master/examples/interactivity_move.html)
* Styles - [live example](http://github.alessaska.cz/HelikarLab/ccNetViz/master/examples/styles.html)
* User definied layout - [live example](http://github.alessaska.cz/HelikarLab/ccNetViz/master/examples/userdef_layout.html)


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
      },
      type: "line"    //type of edge (supported types - "line", "dashed", "dotted", "chain-dotted")
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
* node: default style used for all nodes
* edge: default style used for all edges
* background: default style used for canvas background

All default property values of these styles can be overriden (as in example above).

Besides overriding default styles (used for all nodes / edges) it is possible to define custom styles (like "nodeBlue" etc. in example above) and then use this style just for specified subset of nodes / edges (see bellow how to define style for given node / edge). Property values specified for given custom style override default style values.


***set(nodes, edges, layout)***

Sets the data to be displayed by given ccNetViz instance. "nodes" argument is an array of objects describing graph nodes. Each node can have following properties:
* label (optional): text label for given node (displayed if node labels are enabled by node label style)
* x, y (optional): predefined position for given node (if "layout" argument is not specified these positions will be used for graph layout)
* color (optional): ccNetViz.color object defining color for this given node (use this in case of coloring each node separately, for coloring groups of nodes use color property of node style)
* style (optional): name of custom style class used for this node (for example: "nodeBlue" see above section for how to define custom styles)
 
"edges" argument is an array of objects describing directed graph edges. Each edge has following properties:
* source: pointer to given source node object
* target: pointer to given target node object
* style (optional): name of custom style class used for this edge

Optional "layout" argument defines layout used to render this graph. Possible values: "force", "random". If not specified, positions are taken from each node x, y properties.


***find(x, y, radius, nodes, edges)***


***findArea(x1, y1, x2, y2, nodes, edges)***




***draw()***

Renders current data.


***resize()***

Adjust graph for current canvas size.


***resetView()***

Reset zoom and panning.


***remove()***

Clear graph and remove internal events from DOM.


***nodes***

Property to access nodes data of given graph. Use this just to read current values, for modification use "set" method instead.


***edges***

Property to access edges data of given graph. Use this just to read current values, for modification use "set" method instead.
