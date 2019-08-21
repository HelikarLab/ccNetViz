# [ccNetViz](http://helikarlab.github.io/ccNetViz/) 

[![Build Status](https://travis-ci.org/HelikarLab/ccNetViz.svg?branch=master)](https://travis-ci.org/HelikarLab/ccNetViz) [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

====================================

Graph theory (a.k.a. network) library for analysis and visualisation

Visit our [webpage](http://helikarlab.github.io/ccNetViz/) to see the detailed docs and examples.

## Description

[ccNetViz](http://helikarlab.github.io/ccNetViz) is a lightweight, high performance javascript library for large network graphs (see [graph theory](https://en.wikipedia.org/wiki/Graph_theory)) visualization using WebGL.
It enables custom styling of nodes and edges in css like way, curve edges, dynamic changes of the network, a number of layout settings (including force-directed, spectral, hierarchical, circular, versinus, grid and random) and basic graph interactivity.
Used for example by [Cell Collective](http://cellcollective.org) project.
[ccNetViz](http://helikarlab.github.io/ccNetViz) is open source library available under [GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html) License.

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
    <script src="lib/ccNetViz.js"></script>
  </head>
  <body>
    <canvas id="container" />
    <script>
      var graph = new ccNetViz(document.getElementById('container'), {
        styles: {
          node: { texture: 'images/node.png', label: { hideSize: 16 } },
          edge: { arrow: { texture: 'images/arrow.png' } },
        },
      });
      var nodes = [{ label: 'Hello' }, { label: 'World' }, { label: '!' }];
      var edges = [
        { source: nodes[0], target: nodes[1] },
        { source: nodes[1], target: nodes[2] },
        { source: nodes[2], target: nodes[1] },
      ];
      graph.set(nodes, edges, 'force').then(() => {
        graph.draw();
      });
    </script>
  </body>
</html>
```

**In-built support for the multiple layouts**

Recommended layout is **Force** based.

Inbuilt support for multiple layouts such as the **Force**, **Hierarchical**, **Circular**, **Spectral**, **Hive**, **Grid**, **Versinus**.

Inbuilt support for two modifications of **Tree** layout.

- Graph layouts - [live example](http://helikarlab.github.io/ccNetViz/examples/layouts.html)
- Tree-specific layouts - [live example](http://helikarlab.github.io/ccNetViz/examples/tree.html)

If you want to use one of our in-built layout ( see the https://github.com/HelikarLab/ccNetViz/tree/master/src/layout for list of all available ones ),
pass it as second parameter into the set function such as:

```javascript
graph.set(nodes, edges, 'force'); //set the force layout
```

## Advanced Examples

- Advanced styling - [live example](http://helikarlab.github.io/ccNetViz/examples/styles.html)
- Complex graphs - [live example](http://helikarlab.github.io/ccNetViz/examples/complex.html)
- Mouse event on hover - [live example](http://helikarlab.github.io/ccNetViz/examples/interactivity_hover.html)
- Mouse events on move - [live example](http://helikarlab.github.io/ccNetViz/examples/interactivity_move.html)
- Multi level - [live example](http://helikarlab.github.io/ccNetViz/examples/multi_level.html)
- Save graphs - [live example](http://helikarlab.github.io/ccNetViz/examples/save_graph.html)
- Using SDF fonts - [live example](http://helikarlab.github.io/ccNetViz/examples/sdf.html)
- User definied layout - [live example](http://helikarlab.github.io/ccNetViz/examples/userdef_layout.html)
- Edges-to-edges support - [live example](http://helikarlab.github.io/ccNetViz/examples/edges_to_edges.html)

## Documentation

**_ccNetViz(element, options)_**

Creates new ccNetViz graph renderer attached to canvas element specified as first argument, styled with styles defined in styles property of options parameter.

_Example options_

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
        backgroundColor: "rgb(255,255,0)", //default: "rgb(255, 255, 255)"
        borderColor: "rgb(0,0,0)",
        color: "rgb(120, 0, 0)",  //label color, default: "rgb(120, 120, 120)"
        font: { //label font
          size: 15,
          family: "Arial, Helvetica, sans-serif", //default: "sans-serif"
          weight: "normal|bold|italic", //default weight: normal
          strokeText: false, //default: false
          alignment: "left|right|center"  //default alignment: left
        }
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

      // edge animation configuration
      animateType: 'gradient', // type of animation: "basic", "gradient", "none"
      animateSpeed: 2,
      animateEase: 'sin-out', // default is "linear", refer to line_animation_complex in examples
      animateColor: 'rgb(240, 80, 100)', // animation color
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
        font: { //label font
          type: "Arial, Helvetica, sans-serif",
          size: 11
        }
      }
    },
    nodeWithSDFFont: {   //custom style with rendering SDF fonts
      label: {
        color: "rgb(0, 0, 255)",
        font: {
          type: "sdf",
          texture: "fonts/OpenSans-Regular.png",    //SDF (Signed distance field) texture
          metrics: "fonts/OpenSans-Regular.json",   //SDF metrics
          size: 15,
          outlineColor: "rgb(0,255,255)"            //color of outline - optional ( if it is not setted - background color would be used )
        }
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
  },
  onChangeViewport: function(viewport){},	//called every time viewport changes
  onLoad: function(){},	//called when graph loaded
  getNodesCount(){},	//callback to use if you want to force nodes count into this library (used to calculate curve excentricity and other built in options), expecting number as return value
  getEdgesCount(){},		//callback to use if you want to force edges count into this library (used to calculate curve excentricity and other built in options), expecting number as return value
  onDrag: function(viewport){}, //drag event, disable original event in case of return false
  onZoom: function(viewport){}, //zoom event, disable original event in case of return false
  onClick: function(){},	//called on click on graph
  onDblClick: function(){},	//called on double click on graph
  passiveEvts: false, //make mouse events passive for performance reasons ( default false )
  bidirectional: "curves" // ["curves"|"overlap"] how to show bidirectional nodes ( default "curves" ), if overlap then the edges are shown like line with two arrows
}
```

There are three predefined styles:

- node: default style used for all nodes
- edge: default style used for all edges
- background: default style used for canvas background

All default property values of these styles can be overriden (as in example above).

Besides overriding default styles (used for all nodes / edges) it is possible to define custom styles (like "nodeBlue" etc. in example above) and then use this style just for specified subsets of nodes / edges (see bellow how to define style for given node / edge). Property values specified for given custom style override default style values.

All of our texts are rendered with as a Signed Distance Field fonts which make them high qualty with keeping the performance high.

**_set(nodes, edges, layout, layout_options = {})_**

Sets the data to be displayed by given ccNetViz instance. "nodes" argument is an array of objects describing graph nodes. Each node can have following properties:

- label (optional): text label for given node (displayed if node labels are enabled by node label style)
- x, y (optional): predefined position for given node (if "layout" argument is not specified these positions will be used for graph layout)
- color (optional): ccNetViz.color object defining color for this given node (use this in case of coloring each node separately, for coloring groups of nodes use color property of node style)
- style (optional): name of custom style class used for this node (for example: "nodeBlue" see above section for how to define custom styles)

"edges" argument is an array of objects describing directed graph edges. Each edge has following properties:

- source: pointer to given source node object
- target: pointer to given target node object
- style (optional): name of custom style class used for this edge

Optional "layout" argument defines layout used to render this graph. Possible values: circular", "force", "grid", "hierarchical", "hierarchical2", "hive", "random", "spectral", "spectral2", "tree", "treeT", "versinus". If not specified, positions are taken from each node x, y properties.

Special layout options, such as margin and flip, are routed through the layout_options argument.
See [Advanced circular layout](http://github.alessaska.cz/HelikarLab/ccNetViz/master/examples/circular.html) for an example of further layout options.

**_find(x, y, radius, nodes, edges)_**

**_findArea(x1, y1, x2, y2, nodes, edges)_**

**_draw()_**

Renders current data.

**_resize()_**

Adjust graph for current canvas size.

**_resetView()_**

Reset zoom and panning.

**_setViewport(viewport)_**

Set graph viewport.

"viewport" argument is an object with keys to modify (all of keys are optional)

```javascript
{
  "x": 0.123,	//x offset of viewport (number in range 0-1), optional
  "y": 0.326,	//y offset of viewport (number in range 0-1), optional
  "size": 0.98,	//size value of viewport (number in range 0-1) - the amount of original screen that is visible, optional
}
```

**_cntShownNodes()_**

Get number of nodes

**_cntShownEdges()_**

Get number of edges

**_remove()_**

Clear graph and remove internal events from DOM.

**_nodes_**

Property to access nodes data of given graph. Use this just to read current values, for modification use "set" method instead.

**_edges_**

Property to access edges data of given graph. Use this just to read current values, for modification use "set" method instead.

## Plugin's Documentation

- [line animation plugin](./src/plugins/animation-line/README.md)

## Development in ccNetViz

Please follow the below instructions to get started with development in ccNetViz:

> You need to have [Node](https://nodejs.org/) and [yarn](https://yarnpkg.com/) .

1. Clone the repository.
2. Run `yarn install` inside the cloned repository to install dependencies.
3. Run `yarn dev` and go to `http://localhost:8080`. From here go to any of the examples or tests.
4. Making any changes to the src/ directory will trigger an auto reload and build of the webpage.
5. Finally when you are done with the changes run `yarn build` to create the final build.

_Note: if your having any problem with seeing changes, clear the browser cache._

## Contributing

If you are looking to contribute to ccNetViz, fork the ccNetViz repo, follow all the above steps (i.e. Development in ccNetViz), commit the changes(ccNetViz follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#specification) specification, please adhere to this format of commits in your Pull Requests) to your fork and make a pull request to ccNetViz.

[heilikarlab]: https://github.com/HelikarLab/ccNetViz

#### Developing new layouts

We recommend adding new/other layouts to src/layouts/ directory
and allowing its usage by routing in src/layouts/layouts.js
like implemented to the builtin layouts.

See the wiki pages for more information on the layouts implemented and that are possible.
