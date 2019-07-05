/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

import ccNetViz_utils from '../utils';

export default class {
  constructor(nodes, layout_options) {
    this._nodes = nodes;
    let defaults = {
      margin: 0.05,
      direction: 'left-right',
    };
    ccNetViz_utils.extend(defaults, layout_options);
    this._options = defaults;
  }

  apply() {
    for (let i = 0, n = this._nodes.length; i < n; i++) {
      let o = this._nodes[i];
      o.x = Math.random();
      o.y = Math.random();
    }
    return this._options;
  }
}
