/*
 * User defined layouts
 * Labels
 * Layouts
 * Edges to edges
 * Node size & Color
 * Multi level graph
 * SDF Label
 * .findArea
 * .set
 * .draw
 */
window.addEventListener('DOMContentLoaded', event => {
  var nodes = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  var settings = {
    styles: {
      node: {
        texture: '../../examples/images/node.png',
        label: { hideSize: 16 },
      },
      edge: { arrow: { texture: '../../examples/images/arrow.png' } },
      nodeSize: {
        texture: '../../examples/images/node.png',
        label: { hideSize: 16 },
        size: 30,
      },
    },
  };

  var edges = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[2], target: nodes[3] },
    { source: nodes[3], target: nodes[4] },
    { source: nodes[4], target: nodes[5] },
    { source: nodes[5], target: nodes[6] },
    { source: nodes[6], target: nodes[7] },
    { source: nodes[7], target: nodes[8] },
    { source: nodes[0], target: nodes[9] },
    { source: nodes[2], target: nodes[1] },
  ];

  var layouts = [
    'circular',
    'grid',
    'hierarchical',
    'hierarchical2',
    'hive',
    'spectral',
    'versinus',
  ];

  var generateNetViz = function(nodes, edges, layout, settings) {
    var canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 250;
    canvas.id = `${layout}-canvas`;
    document.body.appendChild(canvas);
    var graph = new ccNetViz(canvas, settings);
    graph.set(nodes, edges, layout).then(() => {
      graph.draw();
    });
  };

  /*
   * User defined layouts
   * Labels
   * .findArea method
   */

  var def_nodes = [
    { label: 'Hello', x: 0, y: 1 },
    { label: 'World', x: 1, y: 1 },
    { label: '!', x: 0.5, y: 0 },
    { label: 'I am in center', x: 0.5, y: 0.5 },
    { label: 'Right bottom corner', x: 1, y: 0 },
  ];

  var def_edges = [
    { source: def_nodes[0], target: def_nodes[1] },
    { source: def_nodes[1], target: def_nodes[0] },
    { source: def_nodes[0], target: def_nodes[0] },
    { source: def_nodes[1], target: def_nodes[2] },
    { source: def_nodes[2], target: def_nodes[4] },
  ];

  {
    let canvas = document.createElement('canvas');
    let layout = 'user';
    canvas.width = 250;
    canvas.height = 250;
    canvas.id = `${layout}-canvas`;
    document.body.appendChild(canvas);
    let graph = new ccNetViz(canvas, settings);
    graph.set(def_nodes, def_edges, undefined).then(() => {
      graph.draw();
      graph.set(def_nodes, def_edges, undefined).then(() => {
        graph.findArea(0, 0, 0.5, 0.5, true, true).nodes[0].node.label =
          'center ?';
        graph.draw();
      });
    });
  }
  /*
// Layouts
for (var index = 0; index < layouts.length; index++) {
  var layout = layouts[index];

  generateNetViz(nodes, edges, layout, settings);
}

// SDF Label
var conf = {
  styles: {
    node: {
      minSize: 6,
      maxSize: 16,
      color: 'rgb(255, 0, 0)',
      texture: '../../examples/images/node.png',
      label: {
        color: 'rgb(120, 120, 120)',
        backgroundColor: 'rgb(200, 200, 200)',
        borderColor: 'rgb(180, 180, 180)',
        font: {
          family: 'vedana',
          weight: 'normal',
          strokeText: false,
          alignment: 'center',
          type: 'sdf'
        },
      },
    },
    edge: { arrow: { texture: '../../examples/images/arrow.png' } },
  },
};

generateNetViz(def_nodes, def_edges, undefined, conf);

// Edges to edges
// Diffrent sizes
var nodes_ee = [{ label: 'Hello' }, { label: 'World' }, { label: '!', style: 'nodeSize' }];

var e = { source: nodes_ee[0], target: nodes_ee[1] };
var e2 = { source: nodes_ee[1], target: nodes_ee[0] };
var e3 = { source: nodes_ee[1], target: nodes_ee[2] };
var e4 = { source: nodes_ee[0], target: nodes_ee[0] };

var edges_ee = [
  e,
  e2,
  e3,
  e4,
  { source: nodes_ee[2], target: e2 },
  { source: nodes_ee[0], target: e3 },
  { source: e2, target: nodes_ee[2] },
  { source: nodes_ee[2], target: e4 },
  { source: e2, target: e2 },
  { source: e3, target: e3 },
  { source: e4, target: e4 },
];

generateNetViz(nodes_ee, edges_ee, 'versinus', settings);

{
  var canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 250;
  canvas.id = `${layout}-canvas`;
  document.body.appendChild(canvas);
  var graph = new ccNetVizMultiLevel(canvas, settings);

  var nodes1 = [
    { label: 'Node1 of subgraph1' },
    { label: 'Node2 of subgraph1' },
  ];
  var edges1 = [
    { source: nodes1[0], target: nodes1[1] },
    { source: nodes1[0], target: nodes1[0] },
    { source: nodes1[1], target: nodes1[0] },
  ];

  var nodes2 = [
    { label: 'Node1 of subgraph2' },
    { label: 'Node2 of subgraph2' },
    { label: 'Node3 of subgraph2' },
    { label: 'Node4 of subgraph2' },
    { label: 'Node5 of subgraph2' },
  ];
  var edges2 = [
    { source: nodes2[0], target: nodes2[1] },
    { source: nodes2[0], target: nodes2[0] },
    { source: nodes2[1], target: nodes2[0] },
    { source: nodes2[3], target: nodes2[4] },
  ];

  var nodes = [
    { label: 'Hello', nodes: nodes2, edges: edges2 },
    { label: 'World', nodes: nodes1, edges: edges1 },
    { label: '!' },
  ];
  var edges = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[0] },
    { source: nodes[0], target: nodes[0] },
    { source: nodes[1], target: nodes[2] },
  ];

  graph.set(nodes, edges, 'force').then(() => {
    graph.draw();
  });
}*/
});
