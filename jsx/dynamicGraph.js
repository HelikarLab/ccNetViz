var DynamicGraph = React.createClass({
    componentWillMount: function() {
        this.styles = {
            background: { color: "rgb(35, 35, 35)" },
            node: { minSize: 8, texture: "images/circle.png", label: { hideSize: 16 } },
            edge: { color: "rgb(86, 86, 86)", arrow: { texture: "images/arrow.png", hideSize: 2 } }
        };
    },
    componentDidMount: function() {
        utils.ajax("http://davidtichy.github.io/ccNetViz/data/" + this.props.data, null, data => {
            var c = new ccNetViz.color(1, 1, 1);
            var nodes = data.nodes.map(e => ({ label: e.label, style: e.style, color: c }));
            var edges = data.edges.map(e => ({ source: nodes[e.source], target: nodes[e.target], style: e.style }));
            var graph = this.refs.graph.self;
            graph.set(nodes, edges, "force");
            graph.draw();

            var colors = graph.nodes.map(() => c);
            var max = 20;
            var duration = 50;
            var nodes = {};

            setInterval(() => {
                var c = 0, remove = [];
                Immutable.Seq(nodes).forEach((v, k) => ++v.time > duration ? remove.push(k) : c += (duration - v.time));
                remove.forEach(e => delete nodes[e]);
                Math.random() > c / (duration * max) && (nodes[Math.floor(Math.random() * colors.length)] = { time: 0 });
                Immutable.Seq(nodes).forEach((v, k) => colors[k] = new ccNetViz.color(Math.abs(2*v.time / duration - 1), 1, 1));

                graph.update("nodesColored", "color", colors);
                graph.draw();
            }, 200);
        });
    },
    render: function() {
        return (<Graph ref="graph" styles={this.styles} parentWidth={this.props.parentWidth} parentHeight={this.props.parentHeight}/>);
    }
});