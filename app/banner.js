var Banner = React.createClass({displayName: "Banner",
    statics: {
        defColor: new ccNetViz.color(0.2, 0.2, 0.2),
        titleColor: new ccNetViz.color(1, 1, 1),
        round: 30,
        titleWidth: 69,
        titleHeight: 15,
        title: [[3,0],[4,0],[5,0],[13,0],[14,0],[15,0],[20,0],[21,0],[27,0],[28,0],[34,0],[35,0],[36,0],[37,0],[43,0],[44,0],[50,0],[51,0],[57,0],[58,0],[61,0],[62,0],[63,0],[64,0],[65,0],[66,0],[67,0],[68,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[20,1],[21,1],[27,1],[28,1],[32,1],[33,1],[34,1],[35,1],[36,1],[37,1],[38,1],[39,1],[42,1],[43,1],[44,1],[50,1],[51,1],[57,1],[58,1],[61,1],[62,1],[63,1],[64,1],[65,1],[66,1],[67,1],[68,1],[1,2],[2,2],[6,2],[7,2],[11,2],[12,2],[16,2],[17,2],[20,2],[21,2],[27,2],[28,2],[32,2],[33,2],[38,2],[39,2],[42,2],[43,2],[49,2],[50,2],[51,2],[52,2],[57,2],[58,2],[62,2],[63,2],[0,3],[1,3],[10,3],[11,3],[20,3],[21,3],[27,3],[28,3],[31,3],[32,3],[42,3],[43,3],[49,3],[50,3],[51,3],[52,3],[57,3],[58,3],[63,3],[64,3],[0,4],[1,4],[10,4],[11,4],[20,4],[21,4],[27,4],[28,4],[31,4],[32,4],[42,4],[43,4],[48,4],[49,4],[52,4],[53,4],[57,4],[58,4],[63,4],[64,4],[0,5],[1,5],[10,5],[11,5],[20,5],[21,5],[27,5],[28,5],[31,5],[32,5],[33,5],[34,5],[35,5],[36,5],[37,5],[38,5],[39,5],[42,5],[43,5],[48,5],[49,5],[52,5],[53,5],[57,5],[58,5],[64,5],[65,5],[0,6],[1,6],[10,6],[11,6],[20,6],[21,6],[27,6],[28,6],[31,6],[32,6],[33,6],[34,6],[35,6],[36,6],[37,6],[38,6],[39,6],[42,6],[43,6],[47,6],[48,6],[53,6],[54,6],[57,6],[58,6],[65,6],[66,6],[0,7],[1,7],[10,7],[11,7],[20,7],[21,7],[27,7],[28,7],[31,7],[32,7],[38,7],[39,7],[42,7],[43,7],[47,7],[48,7],[53,7],[54,7],[57,7],[58,7],[65,7],[66,7],[1,8],[2,8],[6,8],[7,8],[11,8],[12,8],[16,8],[17,8],[20,8],[21,8],[22,8],[26,8],[27,8],[28,8],[32,8],[33,8],[37,8],[38,8],[42,8],[43,8],[47,8],[48,8],[53,8],[54,8],[57,8],[58,8],[66,8],[67,8],[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[11,9],[12,9],[13,9],[14,9],[15,9],[16,9],[17,9],[20,9],[21,9],[22,9],[23,9],[24,9],[25,9],[26,9],[27,9],[32,9],[33,9],[34,9],[35,9],[36,9],[37,9],[38,9],[41,9],[42,9],[43,9],[44,9],[46,9],[47,9],[54,9],[55,9],[57,9],[58,9],[61,9],[62,9],[63,9],[64,9],[65,9],[66,9],[67,9],[68,9],[3,10],[4,10],[5,10],[13,10],[14,10],[15,10],[20,10],[21,10],[23,10],[24,10],[25,10],[26,10],[34,10],[35,10],[36,10],[41,10],[42,10],[43,10],[44,10],[46,10],[47,10],[54,10],[55,10],[57,10],[58,10],[61,10],[62,10],[63,10],[64,10],[65,10],[66,10],[67,10],[68,10],[42,11],[43,11],[42,12],[43,12],[42,13],[43,13],[57,13],[58,13],[57,14],[58,14]]
    },
    getInitialState: function() {
        return {};
    },
    componentWillMount: function() {
        var size = Math.min(8, Math.max(3, Math.ceil(this.props.parentWidth / 200)));

        this.styles = {
            background: { color: "rgb(0, 0, 0)" },
            node: { minSize: 8, texture: "images/circle.png" },
            edge: { color: "rgb(60, 60, 60)", arrow: { texture: "images/arrow.png", hideSize: 2 } },
            title: { minSize: size, maxSize: size }
        };
    },
    init: function() {
        var graph = this.refs.graph.self;
        var dom = this.getDOMNode();
        var nX = Math.ceil(dom.offsetWidth / 16);
        var nY = Math.ceil(dom.offsetHeight / 16);
        var nodes = [];
        var edges = [];
        var coord = function(e, n)  {return Math.min(1, Math.max(0, (e + 0.6*(Math.random() - 0.5)) / n));};

        for (var i = 0; i <= nY; i++) {
            for (var j = 0; j <= nX; j++) {
                nodes.push({ x: coord(j, nX), y: coord(i, nY), color: Banner.defColor });
            }
        }
        var aspect = Banner.titleHeight / Banner.titleWidth;
        var width = Math.min(2 / 3, Math.max(1 / 3, 500 / dom.offsetWidth));
        var height = Math.min(2 / 3, Math.max(1 / 3, 500 * aspect / dom.offsetHeight));
        var size = Math.min(0.5 * (width * dom.offsetWidth + height * dom.offsetHeight / aspect), 2 * dom.offsetWidth / 3);
        width = size / dom.offsetWidth;
        height = aspect * size / dom.offsetHeight;
        Banner.title.forEach(function(e)  {return nodes.push({ x: width * e[0] / (Banner.titleWidth - 1) + 0.5*(1 - width), y: height * e[1] / (Banner.titleHeight - 1) + 0.5*(1 - height), color: Banner.titleColor, neighbours: [], style: "title" });});

        for (var y = 0, k = 0; y <= nY; y++) {
            for (var x = 0; x <= nX; x++) {
                var s = nodes[k++];
                s.neighbours = [];
                var ch = {};
                for (var i = 0; i < 4; i++) {
                    ch[Math.floor(4 * Math.random() + (Math.random() > 0.5 ? 5 : 0))] = true;
                }
                for (var i = y - 1, m = 0; i <= y + 1; i++) {
                    for (var j = x - 1; j <= x + 1; j++, m++) {
                        if (i >= 0 && i <= nY && j >= 0 && j <= nX && ch[m]) {
                            var n = i * (nX + 1) + j;
                            s.neighbours.push(n);
                            edges.push({ source: s, target: nodes[n] });
                        }
                    }
                }
            }
        }
        var i = (nX + 1) * (nY + 1);
        Banner.title.forEach(function(e)  {
            var t = nodes[i];
            var s = nodes[(nX + 1) * Math.round(nY * t.y) + Math.round(nX * t.x)];
            s.neighbours.push(i++);
            edges.push({ source: s, target: t });
        });

        graph.set(nodes, edges);
        graph.draw();

        this.colors = graph.nodes.map(function(e)  {return e.color;});
        this.steps = Math.ceil(0.01 * dom.offsetWidth);
        this.delay = Math.ceil(0.3 * this.steps * Banner.round);
        this.marks = {};

        this.setState({ numNodes: nodes.length, numEdges: edges.length });
    },
    componentDidMount: function() {
        var pool = [
            new ccNetViz.color("rgb(220, 220, 220)"),
            new ccNetViz.color("rgb(31, 119, 180)"),
            new ccNetViz.color("rgb(214, 39, 40)"),
            new ccNetViz.color("rgb(23, 190, 207)")
        ];

        this.init();

        var graph = this.refs.graph.self;
        var time = 0;
        var rTime = 0;
        var fps = 20;
        var ci = 0;

        var mark = function(p)  {
            var nodes = graph.nodes;
            var map = {};
            map[p] = true;
            var result = [p = [p]];

            for (var i = 1; i < this.steps; i++) {
                var c = [];
                p.forEach(function(e)  {return nodes[e].neighbours.forEach(function(e)  {return !map[e] && (map[e] = true) && c.push(e);});});
                result.push(p = c);
            }
            return result;
        }.bind(this);

        var mix = function(s, t, v)  {return s * (1 - v) + v * t;};

        var colorize = function(e, v, c)  {
            var d = new ccNetViz.color(mix(Banner.defColor.r, c.r, v), mix(Banner.defColor.g, c.g, v), mix(Banner.defColor.b, c.b, v));
            var t = new ccNetViz.color(mix(Banner.titleColor.r, c.r, 0.5*v), mix(Banner.titleColor.g, c.g, 0.5*v), mix(Banner.titleColor.b, c.b, 0.5*v));
            var count = graph.nodes.length - Banner.title.length;
            e.forEach(function(e)  {return this.colors[e] = e < count ? d : t;}.bind(this));
        }.bind(this);

        setInterval(function()  {
            !(time % this.delay) && (this.marks[(ci++) % pool.length] = { levels: mark(Math.floor(Math.random() * (graph.nodes.length - Banner.title.length))), time: time });
            !(time % fps) && (this.setState({ rTime: rTime / fps }), rTime = 0);

            for (var p in this.marks) {
                var m = this.marks[p];
                var n = m.levels.length;
                var duration = time - m.time;
                var i = Math.floor(duration / Banner.round);

                if (i < n) {
                    var j = (duration % Banner.round) / (Banner.round - 1);
                    var c = pool[p];
                    colorize(m.levels[i++], Math.cos(0.5 * Math.PI * j), c);
                    i < n && colorize(m.levels[i++], 1, c);
                    i < n && colorize(m.levels[i], Math.sin(0.5 * Math.PI * j), c);
                }
                else {
                    delete this.marks[p];
                }
            }

            var t = Date.now();
            graph.update("nodesColored", "color", this.colors);
            graph.draw();
            rTime += Date.now() - t;
            time++;
        }.bind(this), 1000 / fps);
    },
    componentWillReceiveProps: function(props) {
        (props.parentWidth !== this.props.parentWidth || props.parentHeight !== this.props.parentHeight) && this.init();
    },
    render: function() {
        var rDL = function(t, d)  
            {return React.createElement("dl", null, 
                React.createElement("dt", null, t + ":"), 
                d && (React.createElement("dd", null, d))
            );}
        ;

        return (
            React.createElement("div", {className: "banner"}, 
                React.createElement("div", {className: "links"}, 
                    React.createElement("a", {href: "https://github.com/DavidTichy/ccNetViz"}, React.createElement("b", null, "View on GitHub")), 
                    React.createElement("a", {href: "https://github.com/DavidTichy/ccNetViz/zipball/master"}, React.createElement("b", null, "Download"))
                ), 
                React.createElement("div", {className: "author"}, "Created by David Tichy at ", React.createElement("a", {href: "http://helikarlab.org"}, React.createElement("b", null, "Helikar Lab"))), 
                React.createElement("div", {className: "statistics"}, 
                    rDL("Number of Nodes", this.state.numNodes), 
                    rDL("Number of Edges", this.state.numEdges), 
                    rDL("Rendering Time", (this.state.rTime || 0).toFixed(1) + "ms")
                ), 
                React.createElement("div", {className: "help"}, 
                    React.createElement("i", null, "Use mouse to pan and zoom in the graph.")
                ), 
                React.createElement(Graph, {ref: "graph", styles: this.styles, parentWidth: this.props.parentWidth, parentHeight: this.props.parentHeight})
            )
        );
    }
});