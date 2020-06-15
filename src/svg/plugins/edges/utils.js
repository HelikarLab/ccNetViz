import baseUtils from '../utils/index';

export default class {
  // FUNCTION: Gives a number through which curve can be formed
  // Similar to `src/ccNetViz` -> 385
  static getSize(context, styles, count, sc) {
    let svg = baseUtils.getSVGDimensions(context);

    // multiplied by 0.5 as done in `src/ccNetViz` on line -> 445,446
    let height = svg.height * 0.5;
    let width = svg.width * 0.5;
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

  // FUNCTION: Checks whether we need to create a new arrow head or not
  static lazyCacheArrow(currentStyle, hMap) {
    const key = this.generateArrowHeadId(currentStyle);

    // if key(i.e. id of the arrow) is present, return the defs object
    if (key in hMap) {
      return hMap[key];
    }
    // else, create a new arrowHead, add it to hashmap, and then return it
    else {
      const newArrowHead = this.generateArrowHead(currentStyle, key); // a defs object
      hMap[key] = newArrowHead;
      return newArrowHead;
    }
  }

  // FUNCTION: Generates new arrow head based on given styles
  static generateArrowHeadId(currentStyle) {
    let arrowSize = 10;
    if (currentStyle.arrow && currentStyle.arrow.size)
      arrowSize = currentStyle.arrow.size;
    let color = currentStyle.color || 'rgb(204, 204, 204)';
    let radius = currentStyle.targetNodeRadius || 5;
    // removing unnecessary characters
    color = color.replace(/\s+/g, '-');
    color = color.replace('(', '-');
    color = color.replace(')', '-');
    color = color.replace(',', '');
    const id = arrowSize + '-' + color + radius;
    id.replace(/\s+/g, '-');
    return id;
  }

  // FUNCTION: Adds the arrow at the end of the edge
  static generateArrowHead(styles, id) {
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

    // adding marker-head attributes
    marker.setAttribute('markerWidth', arrowSize);
    marker.setAttribute('markerHeight', arrowSize);
    marker.setAttribute('id', id);
    marker.setAttribute(
      'refX',
      arrowSize - arrowSize / 6 + (styles.targetNodeRadius || 5)
    ); // TODO: this is trial and error and may need to be redefined
    marker.setAttribute('refY', arrowSize / 2);
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('markerUnits', 'userSpaceOnUse');

    // adding elements to svg
    marker.appendChild(path);
    defs.appendChild(marker);
    // const url = 'url(#' + arrowId + ')';
    // currentEdge.setAttribute('marker-end', url);

    return defs;
  }
  // FUNCTION: Updates the edge styles with target node radius, which will help in position of the arrow head
  static updateStyles(drawEntities, edge, target, styles) {
    let currentStyle = styles[edge.style] || {
      arrow: {},
    };

    // get the target node
    const targetNode = drawEntities.nodes.find(node => {
      return node.uniqid == target.uniqid;
    });

    // extract the target node's style
    let targetNodeStyle;
    if (targetNode && targetNode.style !== undefined)
      targetNodeStyle = styles[targetNode.style];
    else targetNodeStyle = styles.node;

    // get the target node's radius
    let targetNodeRadius = targetNodeStyle && targetNodeStyle.size;

    // check if the node has custom style
    if (targetNodeStyle && targetNodeStyle.texture !== undefined)
      targetNodeRadius -= targetNodeRadius / 2;

    // update the current edge stlye
    // this if condition is mainly for overlapping circles
    // a BAD HACK: based on => comaparing various drawEntites objects and then
    // selecting the one through which we can differentiate which circle to shift
    if (target.index === undefined) currentStyle.targetNodeRadius = 1;
    else currentStyle.targetNodeRadius = targetNodeRadius / 2;

    // extract the target edge's individualstyle if present
    if (edge.style !== undefined) currentStyle = styles[edge.style];
    else currentStyle = styles.edge;

    if (currentStyle === undefined) currentStyle = {};

    currentStyle.width = currentStyle.width || 1;
    currentStyle.color = currentStyle.color || 'rgb(204, 204, 204)';

    return currentStyle;
  }

  // FUNCTION: Calculates quadratic bezier curve coordinates
  static quadraticCurvePoint(x1, x2, y1, y2, eccentricity) {
    let x = (x1 + x2) / 2;
    let y = (y1 + y2) / 2;

    let dx = x2 - x1;
    let dy = y2 - y1;

    // eccentricity comes from getSize() function
    // 5 is constant basen on visual comparison with ccNetViz
    // const nodesCount = this.getNodesCnt();
    // const edgesCount = this.getEdgesCnt();
    // const factor = edgesCount/nodesCount;
    eccentricity = eccentricity;

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
