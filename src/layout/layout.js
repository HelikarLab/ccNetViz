define(['./force', './random', './userdef'], function(layoutForce, layoutRandom, layoutUserDef){
/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

var layout = function() {}
layout.force = layoutForce;
layout.random = layoutRandom;
layout.userdef = layoutUserDef;


layout.normalize = function(nodes) {
    var n = nodes.length;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var minX = Infinity;
    var minY = Infinity;

    for (var i = 0; i < n; i++) {
        var o = nodes[i];
        maxX = Math.max(maxX, o.x);
        maxY = Math.max(maxY, o.y);
        minX = Math.min(minX, o.x);
        minY = Math.min(minY, o.y);
    };

    var scX = minX !== maxX ? 1 / (maxX - minX) : ((minX -= 0.5), 1);
    var scY = minY !== maxY ? 1 / (maxY - minY) : ((minY -= 0.5), 1);

    for (var i = 0; i < n; i++) {
        var o = nodes[i];
        o.x = scX * (o.x - minX);
        o.y = scY * (o.y - minY);
    }
}

module.exports = layout;

});