var Application = React.createClass({
    mixins: [Frame],

    render: function() {
        var wp = { parentWidth: this.state.width, parentHeight: this.state.height };

        return (
            <div>
                <Banner {...wp}/>
                <div className="page">
                    <div>
                        <div>
                            ccNetViz is a lightweight (22kB minified), high performance javascript library for large network graphs visualization using WebGL.<br/>
                            It enables custom styling of nodes and edges in css like way, curve edges, dynamic changes of the network, force-directed layout and basic graph interactivity.<br/>
                            Used for example by <a href="http://cellcollective.org">Cell Collective</a> project.<br/>
                            ccNetViz is open source library available under <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3 License</a>.
                        </div>
                        <div>
                            <div>
                                <div>
                                    <StaticGraph {...wp} data="drosophila.json"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <DynamicGraph {...wp} data="macrophage.json"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
