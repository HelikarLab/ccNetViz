var Graph = React.createClass({
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
        return (<canvas/>);
    }
});