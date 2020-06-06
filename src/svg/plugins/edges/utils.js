export default class {
  // FUNCTION: Gives a number through which curve can be formed
  // Similar to `src/ccNetViz` -> 385
  static getSize(context, styles, count, sc) {
    // multiplied by 0.5 as done in `src/ccNetViz` on line -> 445,446
    let height = context.height.baseVal.value * 0.5;
    let width = context.width.baseVal.value * 0.5;
    let result = sc * Math.sqrt((width * height) / (count + 1));
    if (styles) {
      let min = styles.size ? styles.size : styles.minSize;
      let max = styles.size ? styles.size : styles.maxSize;

      result = max ? Math.min(max, result) : result;
      if (result < styles.hideSize) return 0;
      result = min ? Math.max(min, result) : result;
    }
    return result;
  }

  // FUNCTION: returns number of nodes
  static getNodesCnt(drawEntities) {
    return drawEntities.nodes.length();
  }

  // FUNCTION: return number of edges
  static getEdgesCnt(drawEntities) {
    return (
      drawEntities.lines.length +
      drawEntities.curves.length +
      drawEntities.circles.length
    );
  }

  // FUNCTION: Adds the arrow at the end of the edge
  // lazy cache the elements and do not create new for every edge
  // i.e. reuse for edges
  static addArrowHead(currentEdge, styles, type, id) {
    // declare variables
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const marker = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'marker'
    );
    // setting arrowsize
    let arrowSize = 10;
    if (styles.arrow && styles.arrow.size) arrowSize = styles.arrow.size;
    let d =
      'M0,0 L0,' + arrowSize + 'L' + arrowSize + ',' + arrowSize / 2 + ' z';
    path.setAttribute('d', d);
    path.setAttribute('fill', styles.color || 'rgb(204, 204, 204)');

    const arrowId = type + 'Arrow' + id;

    // adding marker-head attributes
    marker.setAttribute('markerWidth', arrowSize);
    marker.setAttribute('markerHeight', arrowSize);
    marker.setAttribute('id', arrowId);
    marker.setAttribute(
      'refX',
      arrowSize - arrowSize / 6 + (styles.targetNodeRadius || 5)
    ); // TODO: this is trial and error and needs to be redefined
    marker.setAttribute('refY', arrowSize / 2);
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('markerUnits', 'userSpaceOnUse');

    // adding elements to svg
    marker.appendChild(path);
    defs.appendChild(marker);
    const url = 'url(#' + arrowId + ')';
    currentEdge.setAttribute('marker-end', url);

    return defs;
  }
  // FUNCTION: Updates the edge styles with target node radius, which will help in position of the arrow head
  // do not change the passed objects
  // create a new object and send back that object
  static updateStyles(drawEntities, edge, target, styles) {
    let currentStyle;

    // get the target node
    const targetNode = drawEntities.nodes.find(node => {
      return node.uniqid == target.uniqid;
    });

    // extract the target node's style
    let targetNodeStyle;
    if (targetNode && targetNode.style !== undefined)
      targetNodeStyle = styles[targetNode.style];
    else targetNodeStyle = styles.node;

    // extract the target edge's individualstyle if present
    let targetNodeRadius = targetNodeStyle.size;
    if (edge.style !== undefined) currentStyle = styles[edge.style];
    else currentStyle = styles.edge;

    // check if the node has custom style
    if (targetNodeStyle.texture !== undefined)
      targetNodeRadius -= targetNodeRadius / 2;

    // update the current edge stlye
    if (target.index === undefined) currentStyle.targetNodeRadius = 1;
    // this if condition is mailny for overlapping circles
    // a bad hack based on => comaparing various drawEntites objects and then
    // selecting the one through which we can differentiate which circle to shift
    else currentStyle.targetNodeRadius = targetNodeRadius;

    return currentStyle;
  }

  // FUNCTION: Calculates quadratic bezier curve coordinates
  static quadraticCurvePoint(x1, x2, y1, y2, eccentricity) {
    // TODO: Try if the curvature can be defined from `getSize()`

    let x = (x1 + x2) / 2;
    let y = (y1 + y2) / 2;

    let dx = x2 - x1;
    let dy = y2 - y1;

    // eccentricity comes from getSize() function
    // 5 is constant basen on visual comparison with ccNetViz
    eccentricity = eccentricity / 5;

    let cx = -dy / eccentricity;
    let cy = dx / eccentricity;

    cx = x + cx;
    cy = y + cy;

    return { cx, cy };
  }

  //FUNCTION: Calculates height, weight, and x,y coordinates
  // for cubic bezier curves, helpful for overlapping circles
  static getCurveBoundary(ax, ay, bx, by, cx, cy, dx, dy) {
    var tobx = bx - ax;
    var toby = by - ay;
    var tocx = cx - bx;
    var tocy = cy - by;
    var todx = dx - cx;
    var tody = dy - cy;
    var step = 1 / 40; // precission
    var d,
      px,
      py,
      qx,
      qy,
      rx,
      ry,
      tx,
      ty,
      sx,
      sy,
      x,
      y,
      i,
      minx,
      miny,
      maxx,
      maxy;
    function min(num1, num2) {
      if (num1 > num2) return num2;
      if (num1 < num2) return num1;
      return num1;
    }
    function max(num1, num2) {
      if (num1 > num2) return num1;
      if (num1 < num2) return num2;
      return num1;
    }
    for (var i = 0; i < 41; i++) {
      d = i * step;
      px = ax + d * tobx;
      py = ay + d * toby;
      qx = bx + d * tocx;
      qy = by + d * tocy;
      rx = cx + d * todx;
      ry = cy + d * tody;
      let toqx = qx - px;
      let toqy = qy - py;
      let torx = rx - qx;
      let tory = ry - qy;

      sx = px + d * toqx;
      sy = py + d * toqy;
      tx = qx + d * torx;
      ty = qy + d * tory;
      let totx = tx - sx;
      let toty = ty - sy;

      x = sx + d * totx;
      y = sy + d * toty;
      if (i == 0) {
        minx = x;
        miny = y;
        maxx = x;
        maxy = y;
      } else {
        minx = min(minx, x);
        miny = min(miny, y);
        maxx = max(maxx, x);
        maxy = max(maxy, y);
      }
    }
    return {
      x: Math.round(minx),
      y: Math.round(miny),
      width: Math.round(maxx - minx),
      height: Math.round(maxy - miny),
    };
  }
}
