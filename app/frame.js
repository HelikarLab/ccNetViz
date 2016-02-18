var Frame = {
    onResize: function() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    },
    componentWillMount: function() {
        this.onResize();
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.onResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.onResize);
    }
};