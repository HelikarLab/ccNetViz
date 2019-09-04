let MultiLevel = graph => {
  let history = [];

  setInterval(() => {
    let viewport = graph.getViewport();
    let nodes = graph.findArea(0, 0, 1, 1, true, true);
    nodes.nodes.map(node => {
      let n = node.node;
      if (typeof n !== 'undefined') {
        if (typeof n.multiLevel !== 'undefined') {
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
                const nodeKey = avaibleNodes[i].node;
                if (typeof nodeKey.multiLevel !== 'undefined') {
                  graph
                    .set(
                      nodeKey.nodes,
                      nodeKey.edges,
                      nodeKey.multiLevel.layout,
                      nodeKey.multiLevel.params
                    )
                    .then(() => {
                      graph.draw();
                      graph.resetView();
                      graph.setViewport({ size: 0.99 });
                      history.push(nodes);
                    });
                  break;
                }
              }
            }
          }
        }
      }
    });

    if (history.length) {
      if (viewport.size === 1) {
        let key = history[history.length - 1];

        // Refactoring nodes and edges object.
        let formattedNodes = [];
        let formattedEdges = [];

        key.nodes.map(n => {
          formattedNodes.push(n.node);
        });

        key.edges.map(e => {
          formattedEdges.push(e.edge);
        });

        graph.set(formattedNodes, formattedEdges).then(() => {
          graph.draw();
          graph.resetView();
          graph.setViewport({ size: 0.999 });
          history.pop();
        });
      }
    }
  }, 1000);
};

if (typeof ccNetVizPlugins === 'undefined') window.ccNetVizPlugins = {};
ccNetVizPlugins.multiLevel = MultiLevel;

export default MultiLevel;
