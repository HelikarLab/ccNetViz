import ccNetViz_quadtree from '../quadTree' ;

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

export default function(nodes, edges) {
    const edgeDistance = 15,
          edgeStrength = 1,
          friction = 0.9,
          charge = -30,
          gravity = 0.4,
          theta2 = .64,
          size = [1,1],
          chargeDistance2 = Infinity;

    let   alpha,
          distances = [],
          strengths = [],
          charges = [];


    function accumulate(quad, alpha, charges) {
        let cx = 0, cy = 0;
        quad.charge = 0;
        if (!quad.leaf) {
            let nodes = quad.nodes;
            let c, n = nodes.length;

            for (let i = 0; i < n; i++) {
                c = nodes[i];
                if (c == null) continue;
                accumulate(c, alpha, charges);
                quad.charge += c.charge;
                cx += c.charge * c.cx;
                cy += c.charge * c.cy;
            }
        }
        if (quad.point) {
            if (!quad.leaf) {
                quad.point.x += Math.random() - 0.5;
                quad.point.y += Math.random() - 0.5;
            }
            let k = alpha * charges[quad.point.index];
            quad.charge += quad.pointCharge = k;
            cx += k * quad.point.x;
            cy += k * quad.point.y;
        }
        quad.cx = cx / quad.charge;
        quad.cy = cy / quad.charge;
    }

    function repulse(node) {
        return function(quad, x1, _, x2) {
            if (quad.point !== node) {
                let dx = quad.cx - node.x;
                let dy = quad.cy - node.y;
                let dw = x2 - x1;
                let dn = dx * dx + dy * dy;

                if (dw * dw / theta2 < dn) {
                    if (dn < chargeDistance2) {
                        let k = quad.charge / dn;
                        node.px -= dx * k;
                        node.py -= dy * k;
                    }
                    return true;
                }

                if (quad.point && dn && dn < chargeDistance2) {
                    let k = quad.pointCharge / dn;
                    node.px -= dx * k;
                    node.py -= dy * k;
                }
            }
            return !quad.charge;
        };
    }

    function step() {
        if ((alpha *= .99) < .05) {
            alpha = 0;
            return true;
        }

        let q, o, s, t, l, k, x, y;
        let n = nodes.length;
        let m = edges.length;

        for (let i = 0; i < m; i++) {
            o = edges[i];
            s = o.source;
            t = o.target;
            x = t.x - s.x;
            y = t.y - s.y;
            if (l = (x * x + y * y)) {
                l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
                x *= l;
                y *= l;
                t.x -= x * (k = s.weight / (t.weight + s.weight));
                t.y -= y * k;
                s.x += x * (k = 1 - k);
                s.y += y * k;
            }
        }

        if (k = alpha * gravity) {
            x = size[0] / 2;
            y = size[1] / 2;

            for (let i = 0; i < n; i++) {
                o = nodes[i];
                o.x += (x - o.x) * k;
                o.y += (y - o.y) * k;
            }
        }

        if (charge) {
            accumulate(q = ccNetViz_quadtree(nodes), alpha, charges);

            for (let i = 0; i < n; i++) {
                let o = nodes[i];
                !o.fixed && q.visit(repulse(o));
            }
        }

        for (let i = 0; i < n; i++) {
            o = nodes[i];
            if (o.fixed) {
                o.x = o.px;
                o.y = o.py;
            }
            else {
                o.x -= (o.px - (o.px = o.x)) * friction;
                o.y -= (o.py - (o.py = o.y)) * friction;
            }
        }
    };

    this.apply = function() {
        let n = nodes.length;
        let d = Math.sqrt(n);
        let s = 0.3 / d;

        for (let i = 0; i < n; i++) {
            let o = nodes[i];
            o.weight = 0;
            o.x = o.x !== undefined ? o.x : s + (i % d) / d;
            o.y = o.y !== undefined ? o.y : s + Math.floor(i / d) / d;
            o.px = o.x;
            o.py = o.y;
            charges[i] = charge;
        }

        for (let i = 0; i < edges.length; i++) {
            let o = edges[i];
            o.source.weight++;
            o.target.weight++;
            distances[i] = edgeDistance;
            strengths[i] = edgeStrength;
        }

        alpha = 0.1;
        while (!step());

        return true;
    };
};