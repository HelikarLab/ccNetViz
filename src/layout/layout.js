var layoutForce = require( './force' );
var layoutRandom = require( './random' );
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


layout.normalize = function(nodes, dim) {
    var minX, minY, n = nodes.length;
    
    if (dim) {
        minX = dim.minX;
        minY = dim.minY;
    }
    else {
        var maxX = -Infinity;
        var maxY = -Infinity;
        minX = minY = Infinity;
        
        for (var i = 0; i < n; i++) {
            var o = nodes[i];
            maxX = Math.max(maxX, o.x);
            maxY = Math.max(maxY, o.y);
            minX = Math.min(minX, o.x);
            minY = Math.min(minY, o.y);
        };
        
        dim = {
            maxX: maxX,
            maxY: maxY,
            minX: minX,
            minY: minY
        }
    }

    var scX = minX !== dim.maxX ? 1 / (dim.maxX - minX) : ((minX -= 0.5), 1);
    var scY = minY !== dim.maxY ? 1 / (dim.maxY - minY) : ((minY -= 0.5), 1);

    for (var i = 0; i < n; i++) {
        var o = nodes[i];
        o.x = scX * (o.x - minX);
        o.y = scY * (o.y - minY);
    }
    
    return dim;
}

module.exports = layout;
