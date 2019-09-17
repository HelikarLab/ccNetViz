#!/usr/bin/node
var fs = require('fs');

function myParseInt(value, dummyPrevious) {
  // parseInt takes a string and an optional radix
  return parseInt(value);
}

const program = require('commander');

program
  .option('-n, --nodes <nodes>', 'specify number of nodes', myParseInt, 10)
  .option(
    '-d, --degree <degree>',
    'degree of each node ( <= nodes )',
    myParseInt,
    2
  );

program.parse(process.argv);

if (program.degree >= program.nodes) {
  console.error(
    'ERROR degree (' + program.degree + ') > nodes (' + program.nodes + ')'
  );
  process.exit(0);
} else {
  console.log(
    'generating ' + program.nodes + ' nodes with degree ' + program.degree
  );
}

var nodes = [];
var edges = [];
for (var i = 0; i < program.nodes; ++i) {
  nodes.push({ label: i + '' });

  var usedNodes = [];
  for (var j = 0; j < program.degree; ++j) {
    do {
      var toindex = Math.floor(Math.random() * program.nodes);
      if (usedNodes.indexOf(toindex) < 0) {
        usedNodes.push(toindex);
        edges.push({ source: i, target: toindex });
        break;
      }
    } while (true);
  }
}

var fileName = 'data/graph-' + program.nodes + '-' + program.degree + '.json';

var data = {
  nodes: nodes,
  edges: edges,
};

console.log('successfullly generated');
console.log('---- ' + nodes.length + ' nodes');
console.log('---- ' + edges.length + ' edges');

console.log('Writing json specification of graph to the ' + fileName);
fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

/*
{
  "nodes": [
    { "label": "1"},
    { "label": "2"},
    { "label": "3"},
    { "label": "4"},
    { "label": "gurpreet"},
    { "label": "shelly"},
    { "label": "mohit"},
    { "label": "gaurav"},
    { "label": "9"},
    { "label": "10"}
  ],
  "edges": [
    { "source": 0, "target": 3 },
    { "source": 0, "target": 8 },
    { "source": 1, "target": 5 },
    { "source": 1, "target": 2 },
    { "source": 2, "target": 4 },
    { "source": 3, "target": 5 },
    { "source": 4, "target": 3 },
    { "source": 5, "target": 1 },
    { "source": 5, "target": 6 },
    { "source": 6, "target": 5 },
    { "source": 6, "target": 1 },
    { "source": 7, "target": 6 },
    { "source": 7, "target": 9 },
    { "source": 8, "target": 9 },
    { "source": 8, "target": 7 },
    { "source": 9, "target": 4 },
    { "source": 9, "target": 3 }
  ]
}
*/
