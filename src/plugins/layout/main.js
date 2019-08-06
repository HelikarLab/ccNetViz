import cytoscape from './cytoscape.min.js';

let layout = (nodes, edges, layout) => {
  let temp = [];

  nodes.map((elem, index) => {
    temp.push({ data: { id: `${index}` } });
  });

  edges.map(elem => {
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

  let canvas = document.createElement('div');
  canvas.setAttribute(
    'style',
    'width:500px!important;height:500px!important;opacity:0!important;'
  );
  document.body.appendChild(canvas);

  var cy = cytoscape({
    container: canvas,
    layout: layout,
    elements: temp,
  });

  cy.ready(event => {
    let c = {};

    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);

    // Setting up the Cytoscape coordinate system to ccNetViz
    event.cy
      .elements()
      .nodes()
      .map(item => {
        if (typeof c.xMax === 'undefined') {
          c.xMax = item._private.position.x;
          c.xMin = item._private.position.x;
        }
        if (typeof c.yMax === 'undefined') {
          c.yMax = item._private.position.y;
          c.yMin = item._private.position.y;
        }
        if (item._private.position.x < c.xMin)
          c.xMin = item._private.position.x;
        if (item._private.position.x > c.xMax)
          c.xMax = item._private.position.x;
        if (item._private.position.y > c.yMax)
          c.yMax = item._private.position.y;
        if (item._private.position.y < c.yMin)
          c.yMin = item._private.position.y;
      });

    // Set the layout positions
    event.cy
      .elements()
      .nodes()
      .map((item, index) => {
        let el = nodes[index];
        if (typeof item._private.style !== 'undefined') {
          if (typeof item._private.style.width !== 'undefined')
            if (typeof el.style === 'undefined')
              el.style = `node-${item._private.style.width.value}`;
        }
        if (c.xMin < 0)
          el.x =
            (item._private.position.x + Math.abs(c.xMin)) /
            (Math.abs(c.xMin) + c.xMax);
        else el.x = (item._private.position.x - Math.abs(c.xMin) / 2) / c.xMax;

        if (c.yMin < 0)
          el.y =
            (item._private.position.y + Math.abs(c.yMin)) /
            (Math.abs(c.yMin) + c.yMax);
        else el.y = (item._private.position.y - Math.abs(c.yMin) / 2) / c.yMax;
      });
  });

  return [nodes, edges];
};

if (typeof ccNetVizPlugins === 'undefined') window.ccNetVizPlugins = {};
ccNetVizPlugins.layout = layout;
export default layout;
