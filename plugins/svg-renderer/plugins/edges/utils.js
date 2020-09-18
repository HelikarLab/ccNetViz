export default class {
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
    let arrowSize = styles.arrow.size;
    let d =
      'M0,0 L0,' + arrowSize + 'L' + arrowSize + ',' + arrowSize / 2 + ' z';
    path.setAttribute('d', d);
    path.setAttribute('fill', styles.color || 'rgb(204, 204, 204)');

    // adding marker-head attributes
    marker.setAttribute('markerWidth', arrowSize);
    marker.setAttribute('markerHeight', arrowSize);
    marker.setAttribute('id', id);
    marker.setAttribute('refX', arrowSize + styles.targetNodeRadius + 1); // TODO: 5 is trial and error and may need to be redefined
    marker.setAttribute('refY', arrowSize / 2);
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('markerUnits', 'userSpaceOnUse');

    // adding elements to svg
    marker.appendChild(path);
    defs.appendChild(marker);

    return defs;
  }
  // FUNCTION: Updates the edge styles with target node radius, which will help in position of the arrow head
  static updateStyles(drawEntities, edge, target, styles, arrowSize) {
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

    if (targetNodeStyle === undefined) targetNodeStyle = styles.node;

    // extract the target edge's individualstyle if present
    if (edge.style !== undefined) currentStyle = styles[edge.style];

    if (currentStyle === undefined) currentStyle = styles.edge;

    // get the target node's radius
    let targetNodeRadius = targetNodeStyle.size;

    // check if the node has custom style
    if (targetNodeStyle && targetNodeStyle.texture !== undefined)
      targetNodeRadius -= targetNodeRadius / 2;

    // update the current edge stlye
    // this if condition is mainly for overlapping circles
    // a BAD HACK: based on => comaparing various drawEntites objects and then
    // selecting the one through which we can differentiate which circle to shift
    if (target.index === undefined || targetNode === undefined) {
      currentStyle.targetNodeRadius = 1;
    } else currentStyle.targetNodeRadius = targetNodeRadius / 2;

    currentStyle.width = currentStyle.width || 1;
    currentStyle.color = currentStyle.color || 'rgb(204, 204, 204)';

    if (arrowSize > currentStyle.arrow.maxSize)
      arrowSize = currentStyle.arrow.maxSize;
    else if (
      arrowSize <= currentStyle.arrow.maxSize &&
      arrowSize >= currentStyle.arrow.minSize
    )
      arrowSize = arrowSize;
    else if (
      arrowSize < currentStyle.arrow.minSize &&
      arrowSize >= currentStyle.arrow.hideSize
    )
      arrowSize = currentStyle.arrow.minSize;
    else arrowSize = 0;

    currentStyle.arrow.size = arrowSize;

    return currentStyle;
  }
}
