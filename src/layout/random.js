/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

module.exports = function(nodes) {
    this.apply = function() {
        for (var i = 0, n = nodes.length; i < n; i++) {
            var o = nodes[i];
            o.x = Math.random();
            o.y = Math.random();
        }
    }
};