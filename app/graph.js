var Graph = React.createClass({displayName: "Graph",
    shouldComponentUpdate: function() {
        return false;
    },
    componentWillReceiveProps: function(props) {
        if (props.parentWidth !== this.props.parentWidth || props.parentHeight !== this.props.parentHeight) {
            this.self.resize();
            this.self.draw();
        }
    },
    componentDidMount: function() {
        this.self = new ccNetViz(this.getDOMNode(), { styles: this.props.styles });
    },
    render: function() {
        return (React.createElement("canvas", null));
    }
});