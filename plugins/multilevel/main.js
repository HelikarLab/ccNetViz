let history = [];
let breadcrumb = [];
let temp = {};
let container = false;
const _default = {
  radius: 0.1,
  activation: 0.5,
  layout: 'force',
};

let $wrapper = document.createElement('div');
let $breadcrumb = document.createElement('div');

let MultiLevel = (viewport, graph, canvas) => {
  if (viewport.size === temp.size) return;
  temp.size = viewport.size;
  let nodes = graph.findArea(0, 0, 1, 1, true, true);

  let graphViewport = graph.find(
    viewport.x + viewport.size / 2,
    viewport.y + viewport.size / 2,
    viewport.size,
    true
  );

  // Check the viewport if have an only one multilevel graph.
  if (graphViewport.nodes.length === 1) {
    let keyNode = graphViewport.nodes[0].node;
    if (typeof keyNode.multiLevel !== 'undefined') {
      graph.setViewport({ size: 1, x: 0, y: 0 });
      graph
        .set(
          keyNode.nodes,
          keyNode.edges,
          keyNode.multiLevel.layout,
          keyNode.multiLevel.params
        )
        .then(() => {
          graph.draw();
          history.push(nodes);
          if (typeof keyNode.label !== 'undefined') {
            breadcrumb.push(keyNode.label);
          } else {
            breadcrumb.push(
              `Level - ${$breadcrumb.querySelectorAll('*').length + 1}`
            );
          }
        });
    }
  } else {
    nodes.nodes.map(node => {
      let n = node.node;
      if (typeof n !== 'undefined') {
        if (typeof n.multiLevel !== 'undefined') {
          // Default values definition when couldn't exist.
          if (typeof n.multiLevel.radius === 'undefined')
            n.multiLevel.radius = _default.radius;
          if (typeof n.multiLevel.activation === 'undefined')
            n.multiLevel.activation = _default.activation;
          if (typeof n.multiLevel.layout === 'undefined')
            n.multiLevel.layout = _default.layout;

          // With mentioned radius and activation range checking node position.
          if (viewport.size <= n.multiLevel.activation) {
            let x = graph.find(
              viewport.x + viewport.size / 2,
              viewport.y + viewport.size / 2,
              n.multiLevel.radius,
              true
            );
            let avaibleNodes = x.nodes;
            if (avaibleNodes) {
              for (let i = 0; i < avaibleNodes.length; i++) {
                let nodeKey = avaibleNodes[i].node;
                if (typeof nodeKey.multiLevel !== 'undefined') {
                  graph.setViewport({ size: 1, x: 0, y: 0 });
                  graph
                    .set(
                      nodeKey.nodes,
                      nodeKey.edges,
                      nodeKey.multiLevel.layout,
                      nodeKey.multiLevel.params
                    )
                    .then(() => {
                      graph.draw();
                      history.push(nodes);
                      breadcrumb.push(nodeKey.label);
                    });
                  break;
                }
              }
            }
          }
        }
      }
    });
  }

  if (!container) {
    // Container initialization.
    $wrapper.classList.add('ccNetViz-multilevel');
    canvas.parentNode.replaceChild($wrapper, canvas);
    $wrapper.appendChild(canvas);
    $breadcrumb.classList.add(`ccNetViz-multilevel-container`);
    $wrapper.appendChild($breadcrumb);
    container = true;
  } else {
    _breadcrumb(graph, canvas);
  }
};

let _breadcrumb = (graph, canvas) => {
  let elem = $breadcrumb.querySelectorAll('*');

  for (let i = 0; i < elem.length; i++) {
    const e = elem[i];
    $breadcrumb.removeChild(e);
  }

  breadcrumb.map((item, index) => {
    if (!canvas.parentNode.getElementsByClassName(`level-${index}`).length) {
      let elem = document.createElement('span');
      elem.classList.add(`level-${index}`, `ccNetViz-multilevel-item`);
      elem.innerHTML = `${item}  `;
      elem.addEventListener('click', () => {
        _parent(graph, canvas, index);
      });
      $breadcrumb.appendChild(elem);
    }
  });
};

let _parent = (graph, canvas, index) => {
  let key = history[index];

  // Refactoring nodes and edges object.
  let formattedNodes = [];
  let formattedEdges = [];

  key.nodes.map(n => {
    formattedNodes.push(n.node);
  });

  key.edges.map(e => {
    formattedEdges.push(e.edge);
  });

  graph.setViewport({ size: 1, x: 0, y: 0 });

  graph.set(formattedNodes, formattedEdges).then(() => {
    graph.draw();
    history = history.slice(0, index);
    breadcrumb = breadcrumb.slice(0, index);

    _breadcrumb(graph, canvas);
  });
};

if (typeof ccNetViz === 'undefined') {
  console.warn('ccNetViz multi-level plugin could not be implemented.');
} else {
  if (typeof ccNetViz.plugin === 'undefined') ccNetViz.plugin = {};
  ccNetViz.plugin.multilevel = MultiLevel;
}

export default MultiLevel;
