if (typeof window.requestAnimationFrame === 'undefined')
  window.requestAnimFrame =
    window.requestAnimFrame ||
    function(f) {
      window.setTimeout(f, 1000 / 60);
    };

function transformEdges(nodes, edges) {
  nodes.forEach(function(node, i) {
    node.index = i;
  });
  edges.forEach(function(edge) {
    //non equal to object >> numeric index >> transform to object
    if (edge.source !== Object(edge.source)) {
      edge.source = nodes[edge.source];
    }
    if (edge.target !== Object(edge.target)) edge.target = nodes[edge.target];
  });
}

let layout_list = [
  'circle',
  'circular',
  'force',
  'grid',
  'hierarchical',
  'hierarchical2',
  'hive',
  'spectral',
  'spectral2',
  'versinus',
  'breadthfirst',
  'concentric',
  'cose',
];

function fetchData() {
  let elem = document.getElementById('selectID');
  let options = elem.options[elem.selectedIndex].innerText.trim();
  $.ajax({
    method: 'get',
    url: `data/${options}.json`,
    async: false,
    dataType: 'text',
  }).done(function(d) {
    data = d;
    document.getElementById('node-edge-count').setAttribute('style', '');
    document.getElementById('node-edge-count').innerHTML = `Nodes: ${
      JSON.parse(data).nodes.length
    }, Edges: ${JSON.parse(data).edges.length}`;
  });

  return JSON.parse(data);
}

function ccNetVizBenchmark(callback, layouts) {
  if (!layouts) return false;
  let benchmark = [];
  benchmark.push({ type: 'CC' });

  let d = fetchData();

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
          for (let p = 0; p < layout_list.length; p++) {
            if (layouts.indexOf(layout_list[p]) < 0) {
              benchmark.push({
                layout: layout_list[p],
                layout_time: '-',
                draw_time: '-',
              });
            }
          }
          appendTable(benchmark);
          setTimeout(() => {
            if (callback) callback();
          }, 1000);
        }
        if (i + 1 !== layouts.length) sequentialLayout(layouts[i + 1], i + 1);
      });
    });
  }
  sequentialLayout(layouts[0], 0);
}

function CytoscapeBenchmark(callback, layouts) {
  if (!layouts) return false;
  let benchmark = [];
  benchmark.push({ type: 'CS' });
  let d = fetchData();

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
      await instances.cytoscape
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
          for (let p = 0; p < layout_list.length; p++) {
            if (layouts.indexOf(layout_list[p]) < 0) {
              benchmark.push({
                layout: layout_list[p],
                layout_time: '-',
                draw_time: '-',
              });
            }
          }

          appendTable(benchmark);
          setTimeout(() => {
            if (callback) callback();
          }, 1000);
        }

        if (i + 1 !== layouts.length) sequentialLayout(layouts[i + 1], i + 1);
      });
    });
  }

  sequentialLayout(layouts[0], 0);
}

function SigmaBenchmark(callback, layouts) {
  if (!layouts) return false;
  let elem = document.getElementById('selectID');
  let options = elem.options[elem.selectedIndex].innerText.trim();

  let benchmark = [];
  benchmark.push({ type: 'SI' });

  let data = fetchData();

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
        for (let p = 0; p < layout_list.length; p++) {
          if (layouts.indexOf(layout_list[p]) < 0) {
            benchmark.push({
              layout: layout_list[p],
              layout_time: '-',
              draw_time: '-',
            });
          }
        }
        appendTable(benchmark);
        setTimeout(() => {
          if (callback) callback();
        }, 1000);
      }
      if (i + 1 !== layouts.length) sequentialLayout(layouts[i + 1], i + 1);
    });
  }
  sequentialLayout(layouts[0], 0);
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
  let sigma_layouts = [
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
  let ccnetviz_layouts = [
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
  let cytoscape_layouts = [
    'circle',
    'breadthfirst',
    'concentric',
    'cose',
    'grid',
  ];

  document.getElementById('select-button').addEventListener('click', event => {
    let checkbox = document.querySelectorAll(
      '#perfTableViz td input[type=checkbox]'
    );
    for (let i = 0; i < checkbox.length; i++) {
      const e = checkbox[i];
      e.checked = true;
    }
  });

  document
    .getElementById('unselect-button')
    .addEventListener('click', event => {
      let checkbox = document.querySelectorAll(
        '#perfTableViz td input[type=checkbox]'
      );
      for (let i = 0; i < checkbox.length; i++) {
        const e = checkbox[i];
        e.checked = false;
      }
    });

  document.getElementById('draw-cc-button').addEventListener('click', event => {
    let checkbox = document.querySelectorAll(
      '#perfTableViz td input[type=checkbox]'
    );
    let activeLayouts = [];
    for (let i = 0; i < checkbox.length; i++) {
      const e = checkbox[i];
      if (e.checked) {
        activeLayouts.push(e.getAttribute('data-layout'));
      }
    }

    let avaibleLayouts = [];
    // Eliminate layouts
    for (let i = 0; i < activeLayouts.length; i++) {
      const e = activeLayouts[i];
      if (ccnetviz_layouts.indexOf(e) >= 0) {
        avaibleLayouts.push(e);
      }
    }
    if (avaibleLayouts.length) ccNetVizBenchmark(undefined, avaibleLayouts);
  });

  document.getElementById('draw-cy-button').addEventListener('click', event => {
    let checkbox = document.querySelectorAll(
      '#perfTableViz td input[type=checkbox]'
    );
    let activeLayouts = [];
    for (let i = 0; i < checkbox.length; i++) {
      const e = checkbox[i];
      if (e.checked) {
        activeLayouts.push(e.getAttribute('data-layout'));
      }
    }

    let avaibleLayouts = [];
    // Eliminate layouts
    for (let i = 0; i < activeLayouts.length; i++) {
      const e = activeLayouts[i];
      if (cytoscape_layouts.indexOf(e) >= 0) {
        avaibleLayouts.push(e);
      }
    }
    if (avaibleLayouts.length) CytoscapeBenchmark(undefined, avaibleLayouts);
  });

  document.getElementById('draw-si-button').addEventListener('click', event => {
    let checkbox = document.querySelectorAll(
      '#perfTableViz td input[type=checkbox]'
    );
    let activeLayouts = [];
    for (let i = 0; i < checkbox.length; i++) {
      const e = checkbox[i];
      if (e.checked) {
        activeLayouts.push(e.getAttribute('data-layout'));
      }
    }

    let avaibleLayouts = [];
    // Eliminate layouts
    for (let i = 0; i < activeLayouts.length; i++) {
      const e = activeLayouts[i];
      if (sigma_layouts.indexOf(e) >= 0) {
        avaibleLayouts.push(e);
      }
    }
    if (avaibleLayouts.length) SigmaBenchmark(undefined, avaibleLayouts);
  });

  document
    .getElementById('draw-all-button')
    .addEventListener('click', event => {
      let checkbox = document.querySelectorAll(
        '#perfTableViz td input[type=checkbox]'
      );
      let activeLayouts = [];
      for (let i = 0; i < checkbox.length; i++) {
        const e = checkbox[i];
        if (e.checked) {
          activeLayouts.push(e.getAttribute('data-layout'));
        }
      }

      let avaibleSigmaLayouts = [];
      let avaibleCCLayouts = [];
      let avaibleCYLayouts = [];

      // Eliminate layouts
      for (let i = 0; i < activeLayouts.length; i++) {
        const e = activeLayouts[i];
        if (sigma_layouts.indexOf(e) >= 0) {
          avaibleSigmaLayouts.push(e);
        }
        if (ccnetviz_layouts.indexOf(e) >= 0) {
          avaibleCCLayouts.push(e);
        }
        if (cytoscape_layouts.indexOf(e) >= 0) {
          avaibleCYLayouts.push(e);
        }
      }
      if (
        avaibleSigmaLayouts.length &&
        avaibleCCLayouts.length &&
        avaibleCYLayouts.length
      ) {
        ccNetVizBenchmark(
          CytoscapeBenchmark(
            SigmaBenchmark(undefined, avaibleSigmaLayouts),
            avaibleCYLayouts
          ),
          avaibleCCLayouts
        );
      } else if (avaibleCCLayouts.length && avaibleCYLayouts.length) {
        ccNetVizBenchmark(
          CytoscapeBenchmark(undefined, avaibleCYLayouts),
          avaibleCCLayouts
        );
      } else if (avaibleCCLayouts.length && avaibleSigmaLayouts.length) {
        ccNetVizBenchmark(
          SigmaBenchmark(undefined, avaibleSigmaLayouts),
          avaibleCCLayouts
        );
      } else if (avaibleSigmaLayouts.length && avaibleCCLayouts.length) {
        CytoscapeBenchmark(
          SigmaBenchmark(undefined, avaibleSigmaLayouts),
          avaibleCYLayouts
        );
      } else if (avaibleCCLayouts.length) {
        ccNetVizBenchmark(undefined, avaibleCCLayouts);
      } else if (avaibleSigmaLayouts.length) {
        SigmaBenchmark(undefined, avaibleSigmaLayouts);
      } else {
        CytoscapeBenchmark(undefined, avaibleCYLayouts);
      }
    });

  let frameList = [];
  document.getElementById('fps-start').addEventListener('click', event => {
    if (document.getElementById('fps-start').classList.length) {
      document.getElementById('fps-start').classList.remove('active');
      if (typeof window.fps !== 'undefined') {
        clearInterval(window.fps);
        frameList.push(window.frames);
      }
    } else {
      document.getElementById('fps-start').classList.add('active');
      let x = 0;
      let p = undefined;
      let step = 0;
      let frameCount = 0;
      window.frames = [];

      window.fps = setInterval(() => {
        window.requestAnimationFrame(function(x) {
          if (typeof p === 'undefined') {
            frames.push({ start_date: new Date() });
            p = x;
          }
          if (x >= p + 1000) {
            document.getElementById(
              'fps-counter'
            ).innerHTML = `FPS: ${frameCount}`;
            frames.push({ frame: step, fps: frameCount });
            drawFPS(frames);
            frameCount = 0;
            p = x;
            step++;
          } else {
            frameCount++;
          }
        });
      });
    }
  });
});

function drawFPS(frames) {
  let canvas = document.getElementById('fps-canvas');
  canvas.width = frames.length * 10;
  let context = canvas.getContext('2d');
  context.fillStyle = '#8ad28a';
  let fps = {
    max: 0,
    min: 5000,
  };
  for (let i = 1; i < frames.length; i++) {
    const frame = frames[i];
    if (frame.fps > fps.max) {
      fps.max = frame.fps;
    }
    if (frame.fps < fps.min) {
      fps.min = frame.fps;
    }
  }

  for (let i = 1; i < frames.length; i++) {
    context.beginPath();

    const frame = frames[i];
    const x0 = i > 0 ? (i - 1) * 10 : 0;
    const x1 = i * 10;

    // frame.fps
    context.lineTo(x0, fps.max - frame.fps + 30);
    context.lineTo(x1, fps.max - frame.fps + 30);
    context.lineTo(x1, 200);
    context.lineTo(x0, 200);

    context.closePath();

    context.fill();
  }
}

function CytoscapeConvert(data) {
  let temp = [];
  let d = data;
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

function appendTable(benchmark) {
  let index = [];
  for (let i = 0; i < benchmark.length; i++) {
    const elem = benchmark[i];
    if (typeof elem.type !== 'undefined') {
      if (elem.type === 'CC') {
        index = [1, 2];
      } else if (elem.type === 'CS') {
        index = [3, 4];
      } else {
        index = [5, 6];
      }
    } else {
      document.querySelectorAll(`.${elem.layout} td`)[index[0]].innerHTML =
        elem.layout_time;
      document.querySelectorAll(`.${elem.layout} td`)[index[1]].innerHTML =
        elem.draw_time;
    }
  }
}
