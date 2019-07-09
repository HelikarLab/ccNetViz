import layoutForce from './force';
import layoutRandom from './random';
import layoutCircular from './circular';
import layoutTree from './tree';
import layoutTreeT from './treeT';
import layoutHierarchical from './hierarchical';
import layoutHierarchical2 from './hierarchical2';
import layoutSpectral from './spectral';
import layoutSpectral2 from './spectral2';
import layoutHive from './hive';
import layoutGrid from './grid';
import layoutVersinus from './versinus';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

export default class {
  static get force() {
    return layoutForce;
  }
  static get random() {
    return layoutRandom;
  }
  static get circular() {
    return layoutCircular;
  }
  static get tree() {
    return layoutTree;
  }
  static get tree2() {
    return layoutTreeT;
  }
  static get hierarchical() {
    return layoutHierarchical;
  }
  static get hierarchical2() {
    return layoutHierarchical2;
  }
  static get spectral() {
    return layoutSpectral;
  }
  static get spectral2() {
    return layoutSpectral2;
  }
  static get hive() {
    return layoutHive;
  }
  static get grid() {
    return layoutGrid;
  }
  static get versinus() {
    return layoutVersinus;
  }

  static normalize(nodes, dim, _options) {
    let minX,
      minY,
      n = nodes.length;

    if (dim) {
      minX = dim.minX;
      minY = dim.minY;
    } else {
      let maxX = -Infinity;
      let maxY = -Infinity;
      minX = minY = Infinity;

      for (let i = 0; i < n; i++) {
        let o = nodes[i];
        maxX = Math.max(maxX, o.x);
        maxY = Math.max(maxY, o.y);
        minX = Math.min(minX, o.x);
        minY = Math.min(minY, o.y);
      }

      dim = {
        maxX: maxX,
        maxY: maxY,
        minX: minX,
        minY: minY,
      };
    }
    const factor = 1 - 2 * _options.margin;
    let scX =
      minX !== dim.maxX ? factor / (dim.maxX - minX) : ((minX -= 0.5), 1);
    let scY =
      minY !== dim.maxY ? factor / (dim.maxY - minY) : ((minY -= 0.5), 1);

    const direction = _options.direction;
    switch (direction) {
      case 'left-right':
        for (let i = 0; i < n; ++i) {
          let o = nodes[i];
          o.x = scX * (o.x - minX) + _options.margin;
          o.y = scY * (o.y - minY) + _options.margin;
        }
        break;
      case 'right-left':
        for (let i = 0; i < n; ++i) {
          let o = nodes[i];
          o.x = 1 - (scX * (o.x - minX) + _options.margin);
          o.y = scY * (o.y - minY) + _options.margin;
        }
        break;
      case 'top-down':
        for (let i = 0; i < n; ++i) {
          let o = nodes[i];
          const foo = 1 - scX * (o.x - minX) + _options.margin;
          o.x = scY * (o.y - minY) + _options.margin;
          o.y = foo;
        }
        break;
      case 'bottom-up':
        for (let i = 0; i < nodes.length; ++i) {
          let o = nodes[i];
          const foo = scX * (o.x - minX) + _options.margin;
          o.x = scY * (o.y - minY) + _options.margin;
          o.y = foo;
        }
        break;
      default:
        throw new Error(
          "directions can be only 'left-right' (default), 'right-left', 'top-down' or 'bottom-up'"
        );
    }
    return dim; // any use for this return? Should we remove it?
  }
}
