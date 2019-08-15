function transformEdges(nodes, edges) {
  nodes.forEach(function (node, i) {
    node.index = i;
  });
  edges.forEach(function (edge) {
    //non equal to object >> numeric index >> transform to object
    if (edge.source !== Object(edge.source)) {
      edge.source = nodes[edge.source];
    }
    if (edge.target !== Object(edge.target)) edge.target = nodes[edge.target];
  });
}

function ccNetVizBenchmark() {
  let elem = document.getElementById('selectID');
  let options = elem.options[elem.selectedIndex].innerText.trim();
  let layouts = [
    'circular',
    'force',
    'grid',
    'hierarchical',
    'hierarchical2',
    'hive',
    'spectral',
    'spectral2',
    'versinus',
  ];
  let benchmark = [];

  $.ajax({
    method: 'get',
    url: `data/${options}.json`,
    async: false,
    dataType: 'text',
  }).done(function (d) {
    data = d;
  });

  d = JSON.parse(data);

  transformEdges(d.nodes, d.edges);
  function sequentialLayout(layout, i) {
    //layout computation

    async function layout_computation() {
      let s = new Date().getTime();
      await new ccNetViz.layout[layouts[i]](d.nodes, d.edges, {}).apply();
      let e = new Date().getTime();
      return e - s;
    }

    async function draw(nodes, edges, layout, layout_time) {
      let s = new Date().getTime();

      await instances.ccNetViz.set(nodes, edges).then(() => {
        instances.ccNetViz.draw();
      });
      let e = new Date().getTime();
      return { layout: layout, layout_time: layout_time, draw_time: e - s };
    }

    layout_computation().then(layout_time => {
      draw(d.nodes, d.edges, layout, layout_time).then(val => {
        benchmark.push(val);
        if (i + 1 === layouts.length) {
          benchmark.push({
            layout: 'breadthfirst',
            layout_time: '-',
            draw_time: '-',
          });
          benchmark.push({
            layout: 'concentric',
            layout_time: '-',
            draw_time: '-',
          });
          benchmark.push({ layout: 'cose', layout_time: '-', draw_time: '-' });
          for (let index = 0; index < benchmark.length; index++) {
            const element = benchmark[index];
            appendTable(element.layout, element.layout_time, element.draw_time);
          }
          CytoscapeBenchmark();
        }
        if (i + 1 !== layouts.length)
          sequentialLayout(layouts[i + 1], i + 1);
      });
    });
  }
  sequentialLayout(layouts[0], 0);
}

function CytoscapeBenchmark() {
  let elem = document.getElementById('selectID');
  let options = elem.options[elem.selectedIndex].innerText.trim();
  let layouts = ['circle', 'breadthfirst', 'concentric', 'cose', 'grid'];
  let benchmark = [];

  $.ajax({
    method: 'get',
    url: `data/${options}.json`,
    async: false,
    dataType: 'text',
  }).done(function (d) {
    function sequentialLayout(layout, i) {
      async function layout_computation() {
        let s = new Date().getTime();
        instances.cytoscape = await cytoscape({
          container: document.getElementById('containerCyto'),
          elements: CytoscapeConvert(d),
        });
        let e = new Date().getTime();
        return e - s;
      }

      async function draw(layout, layout_time) {
        let s = new Date().getTime();
        instances.cytoscape
          .layout({
            name: layout,
          })
          .run();
        let e = new Date().getTime();
        return { layout: layout, layout_time: layout_time, draw_time: e - s };
      }

      layout_computation().then(layout_time => {
        draw(layout, layout_time).then(d => {
          benchmark.push(d);
          if (i + 1 === layouts.length) {
            benchmark.push({
              layout: 'force',
              layout_time: '-',
              draw_time: '-',
            });
            benchmark.push({
              layout: 'hierarchical',
              layout_time: '-',
              draw_time: '-',
            });
            benchmark.push({
              layout: 'hierarchical2',
              layout_time: '-',
              draw_time: '-',
            });
            benchmark.push({
              layout: 'hive',
              layout_time: '-',
              draw_time: '-',
            });
            benchmark.push({
              layout: 'spectral',
              layout_time: '-',
              draw_time: '-',
            });
            benchmark.push({
              layout: 'spectral2',
              layout_time: '-',
              draw_time: '-',
            });
            benchmark.push({
              layout: 'versinus',
              layout_time: '-',
              draw_time: '-',
            });

            for (let index = 0; index < benchmark.length; index++) {
              const element = benchmark[index];
              appendTable(
                element.layout,
                element.layout_time,
                element.draw_time
              );
            }
            SigmaBenchmark();
          }

          if (i + 1 !== layouts.length)
            sequentialLayout(layouts[i + 1], i + 1);
        });
      });
    };
    sequentialLayout(layouts[0], 0)
  });
}

function CytoscapeConvert(data) {
  let temp = [];
  let d = JSON.parse(data);
  d.nodes.map((elem, index) => {
    temp.push({ data: { id: `${index}` } });
  });

  d.edges.map(elem => {
    if (typeof elem.source === 'number') {
      if (elem.source !== elem.target)
        temp.push({
          data: {
            id: `${elem.source}-${elem.target}`,
            source: `${elem.source}`,
            target: `${elem.target}`,
          },
        });
    } else if (typeof elem.source === 'object') {
      if (elem.source.index !== elem.target.index)
        temp.push({
          data: {
            id: `${elem.source.index}-${elem.target.index}`,
            source: `${elem.source.index}`,
            target: `${elem.target.index}`,
          },
        });
    }
  });

  return temp;
}

function SigmaBenchmark() {
  let elem = document.getElementById('selectID');
  let options = elem.options[elem.selectedIndex].innerText.trim();
  let layouts = [
    'circular',
    'force',
    'grid',
    'hierarchical',
    'hierarchical2',
    'hive',
    'spectral',
    'spectral2',
    'versinus',
  ];
  let benchmark = [];

  $.ajax({
    method: 'get',
    url: `data/${options}.json`,
    async: false,
    dataType: 'text',
  }).done(function (d) {
    let data = JSON.parse(d);

    transformEdges(data.nodes, data.edges);

    function sequentialLayout(layout, i) {
      let graph = {
        nodes: [],
        edges: [],
      };
      let x = new ccNetViz.layout[layout](data.nodes, data.edges, {}).apply();
      refreshSigmaGraph();

      parseSigmaData(graph, data.nodes, data.edges);
      async function draw() {
        let s = new Date().getTime();
        instances.sigma = await new sigma({
          graph: graph,
          container: 'containerSigma',
        });
        let e = new Date().getTime();
        return { layout: layout, layout_time: '-', draw_time: e - s };
      }
      draw().then(d => {
        benchmark.push(d);
        if (i + 1 === layouts.length) {
          benchmark.push({
            layout: 'breadthfirst',
            layout_time: '-',
            draw_time: '-',
          });
          benchmark.push({
            layout: 'concentric',
            layout_time: '-',
            draw_time: '-',
          });
          benchmark.push({ layout: 'cose', layout_time: '-', draw_time: '-' });
          for (let index = 0; index < benchmark.length; index++) {
            const element = benchmark[index];
            appendTable(element.layout, element.layout_time, element.draw_time);
          }
        }
        if (i + 1 !== layouts.length)
          sequentialLayout(layouts[i + 1], i + 1);
      });
    }
    sequentialLayout(layouts[0], 0)
  });
}

window.addEventListener('DOMContentLoaded', event => {
  if (window.location.hash !== '') {
    jQuery('#selectID')
      .find('option')
      .eq(parseInt(window.location.hash.replace(/#/g, '')))
      .attr('selected', 'selected');
  }
  window.instances = {};
  instances.ccNetViz = new ccNetViz(document.getElementById('containerViz'), {
    styles: {
      node: { texture: 'images/node.png', label: { hideSize: 16 } },
      edge: { arrow: { texture: 'images/arrow.png' } },
    },
  });
  document.getElementById('selectID').onchange = () => {
    window.location = `${window.location.pathname}#${
      document.getElementById('selectID').selectedIndex
      }`;
    window.location.reload();
  };
  ccNetVizBenchmark();
});

function refreshSigmaGraph() {
  // to delete & refresh the graph
  var g = document.querySelector('#containerSigma');
  var p = g.parentNode;
  p.removeChild(g);
  var c = document.createElement('div');
  c.setAttribute('id', 'containerSigma');
  p.appendChild(c);
}

function parseSigmaData(sigmaGraph, nodes, edges) {
  for (var j = 0; j < nodes.length; j++) {
    sigmaGraph.nodes.push({
      id: 'n' + j,
      label: nodes[j].label,
      x: nodes[j].x,
      y: nodes[j].y,
      color: '#ec5148',
      size: 1,
    });
  }

  for (var j = 0; j < edges.length; j++) {
    let elem = edges[j];

    if (typeof elem.source === 'number') {
      if (elem.source !== elem.target)
        sigmaGraph.edges.push({
          id: 'e' + j,
          source: 'n' + elem.source,
          target: 'n' + elem.target,
          color: '#ec5148',
        });
    } else if (typeof elem.source === 'object') {
      if (elem.source.index !== elem.target.index)
        sigmaGraph.edges.push({
          id: 'e' + j,
          source: 'n' + elem.source.index,
          target: 'n' + elem.target.index,
          color: '#ec5148',
        });
    }
  }
}

function appendTable(layout, layout_time, draw_time) {
  let container = document.querySelector(`.${layout}`);
  if (container.innerHTML === '') {
    let elem_name = document.createElement('td');
    elem_name.innerHTML = layout;
    container.appendChild(elem_name);
  }

  let elem_layout = document.createElement('td');
  elem_layout.innerHTML = layout_time;
  container.appendChild(elem_layout);

  let elem_draw = document.createElement('td');
  elem_draw.innerHTML = draw_time;
  container.appendChild(elem_draw);
}