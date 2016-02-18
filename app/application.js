var Application = React.createClass({displayName: "Application",
    mixins: [Frame],

    render: function() {
        var wp = { parentWidth: this.state.width, parentHeight: this.state.height };

        return (
            React.createElement("div", null, 
                React.createElement(Banner, React.__spread({},  wp)), 
                React.createElement("div", {className: "page"}, 
                    React.createElement("div", null, 
                        React.createElement("div", null, 
                            "ccNetViz is a lightweight (22kB minified), high performance javascript library for large network graphs visualization using WebGL.", React.createElement("br", null), 
                            "It enables custom styling of nodes and edges, dynamic changes of the network, force-directed layout and basic graph interactivity.", React.createElement("br", null), 
                            "Used for example by ", React.createElement("a", {href: "http://cellcollective.org"}, "Cell Collective"), " project.", React.createElement("br", null), 
                            "ccNetViz is open source library available under ", React.createElement("a", {href: "http://www.gnu.org/licenses/gpl-3.0.en.html"}, "GPLv3 License"), "."
                        ), 
                        React.createElement("div", null, 
                            React.createElement("div", null, 
                                React.createElement("div", null, 
                                    React.createElement(StaticGraph, React.__spread({},  wp, {data: "drosophila.json"}))
                                )
                            ), 
                            React.createElement("div", null, 
                                React.createElement("div", null, 
                                    React.createElement(DynamicGraph, React.__spread({},  wp, {data: "macrophage.json"}))
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});