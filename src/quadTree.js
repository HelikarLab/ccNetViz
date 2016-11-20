/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: David Tichy
 */

export default function(points) {
    let d, xs, ys, i, n, x1_, y1_, x2_, y2_;

    x2_ = y2_ = -(x1_ = y1_ = Infinity);
    xs = [], ys = [];
    n = points.length;

    for (i = 0; i < n; ++i) {
        d = points[i];
        if (d.x < x1_) x1_ = d.x;
        if (d.y < y1_) y1_ = d.y;
        if (d.x > x2_) x2_ = d.x;
        if (d.y > y2_) y2_ = d.y;
        xs.push(d.x);
        ys.push(d.y);
    }

    let dx = x2_ - x1_;
    let dy = y2_ - y1_;
    dx > dy ? y2_ = y1_ + dx : x2_ = x1_ + dy;

    function create() {
        return {
            leaf: true,
            nodes: [],
            point: null,
            x: null,
            y: null
        };
    }

    function visit(f, node, x1, y1, x2, y2) {
        if (!f(node, x1, y1, x2, y2)) {
            let sx = (x1 + x2) * 0.5;
            let sy = (y1 + y2) * 0.5;
            let children = node.nodes;

            if (children[0]) visit(f, children[0], x1, y1, sx, sy);
            if (children[1]) visit(f, children[1], sx, y1, x2, sy);
            if (children[2]) visit(f, children[2], x1, sy, sx, y2);
            if (children[3]) visit(f, children[3], sx, sy, x2, y2);
        }
    }

    function insert(n, d, x, y, x1, y1, x2, y2) {
        if (n.leaf) {
            let nx = n.x;
            let ny = n.y;

            if (nx !== null) {
                if (nx === x && ny === y) {
                    insertChild(n, d, x, y, x1, y1, x2, y2);
                }
                else {
                    let nPoint = n.point;
                    n.x = n.y = n.point = null;
                    insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
                    insertChild(n, d, x, y, x1, y1, x2, y2);
                }
            } else {
                n.x = x, n.y = y, n.point = d;
            }
        } else {
            insertChild(n, d, x, y, x1, y1, x2, y2);
        }
    }

    function insertChild(n, d, x, y, x1, y1, x2, y2) {
        let xm = (x1 + x2) * 0.5;
        let ym = (y1 + y2) * 0.5;
        let right = x >= xm;
        let below = y >= ym;
        let i = below << 1 | right;

        n.leaf = false;
        n = n.nodes[i] || (n.nodes[i] = create());

        right ? x1 = xm : x2 = xm;
        below ? y1 = ym : y2 = ym;
        insert(n, d, x, y, x1, y1, x2, y2);
    }

    function findNode(root, x, y, x0, y0, x3, y3) {
        let minDistance2 = Infinity;
        let closestPoint;

        (function find(node, x1, y1, x2, y2) {
            if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;

            if (point = node.point) {
                let point;
                let dx = x - node.x;
                let dy = y - node.y;
                let distance2 = dx * dx + dy * dy;

                if (distance2 < minDistance2) {
                    let distance = Math.sqrt(minDistance2 = distance2);
                    x0 = x - distance, y0 = y - distance;
                    x3 = x + distance, y3 = y + distance;
                    closestPoint = point;
                }
            }

            let children = node.nodes;
            let xm = (x1 + x2) * .5;
            let ym = (y1 + y2) * .5;
            let right = x >= xm;
            let below = y >= ym;

            for (let i = below << 1 | right, j = i + 4; i < j; ++i) {
                if (node = children[i & 3]) switch (i & 3) {
                    case 0: find(node, x1, y1, xm, ym); break;
                    case 1: find(node, xm, y1, x2, ym); break;
                    case 2: find(node, x1, ym, xm, y2); break;
                    case 3: find(node, xm, ym, x2, y2); break;
                }
            }
        })(root, x0, y0, x3, y3);

        return closestPoint;
    }

    let root = create();
    root.visit = f => visit(f, root, x1_, y1_, x2_, y2_);
    root.find = (x, y) => findNode(root, x, y, x1_, y1_, x2_, y2_);

    for (i = 0; i < n; i++) insert(root, points[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
    --i;

    xs = ys = points = d = null;

    return root;
};