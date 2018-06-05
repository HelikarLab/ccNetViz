function transformEdges(nodes, edges) {
    nodes.forEach(function(node, i) {
        node.index = i;
    });
    edges.forEach(function(edge) {
        //non equal to object >> numeric index >> transform to object
        if (edge.source !== Object(edge.source)) {
            edge.source = nodes[edge.source];
        }
        if (edge.target !== Object(edge.target))
            edge.target = nodes[edge.target];
    });
}

function initViz() {

    //we load data in the
    $.ajax({ method: 'get', url: 'data/graph-100-3.json', async: false, dataType: 'text' }).done(function(d) {
        data = d;
    });

    d = JSON.parse(data);
    var t_start_layout, t_start_draw, t_end_layout, t_end_draw,
        t_layout, t_draw;

    createTable(tableViz, "th_viz");

    transformEdges(d.nodes, d.edges);

    for (var i = 0; i < layouts.length; i++) {

        t_start_layout = new Date().getTime();
        //layout computation 
        var layout = new ccNetViz.layout[layouts[i]](d.nodes, d.edges, {}).apply();

        t_end_layout = new Date().getTime();
        t_layout = t_end_layout - t_start_layout;

        t_start_draw = new Date().getTime();
        graph.set(d.nodes, d.edges);
        graph.draw();
        t_end_draw = new Date().getTime();
        t_draw = t_end_draw - t_start_draw;

        fillTable(tableViz, layouts[i], t_layout, t_draw);

        onElementClick();
        setInitialSelection();
    }
}

function onElementClick() {
    if (tableViz != null) {
        for (var i = 0; i < tableViz.rows.length; i++) {
            tableViz.rows[i].cells[0].onclick = function() {
                $("#perfTableViz tr").removeClass('onClickStyle');
                graph.set(d.nodes, d.edges, this.innerHTML);
                graph.draw();
                $(this).parent().addClass('onClickStyle');
            };
        }
    }
}

function setInitialSelection() {
    graph.set(d.nodes, d.edges, 'circular');
    document.getElementById('perfTableViz').childNodes[1].className = "onClickStyle";
}

function createTable(tableName, th_class) {
    var tr_head = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.setAttribute("class", th_class);
    var th2 = document.createElement('th');
    th2.setAttribute("class", th_class);
    var th3 = document.createElement('th');
    th3.setAttribute("class", th_class);

    var text1 = document.createTextNode('Layout style');
    var text2 = document.createTextNode('Layout computation time [ms]');
    var text3 = document.createTextNode('Layout drawing time [ms]');

    th1.appendChild(text1);
    th2.appendChild(text2);
    th3.appendChild(text3);

    tr_head.appendChild(th1);
    tr_head.appendChild(th2);
    tr_head.appendChild(th3);

    tableName.appendChild(tr_head);
}

function fillTable(tableName, layoutI, t_layout, t_draw) {
    var tr = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    text1 = document.createTextNode(layoutI);
    text2 = document.createTextNode(t_layout);
    text3 = document.createTextNode(t_draw);

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tableName.appendChild(tr);
}

function initSigma() {
    $.ajax({ method: 'get', url: 'data/graph-100-3.json', async: false, dataType: 'text' }).done(function(d) {
        data = d;
        var newJson = convertDataSigma(data);
        let original = JSON.parse(newJson);

        dataCCNetViz = JSON.parse(data);

        var blob = new Blob([JSON.stringify(original, null, 2)], { type: 'application/json' });
        objectURL = URL.createObjectURL(blob);

        var t_start_layout, t_start_draw, t_end_layout, t_end_draw,
            t_layout, t_draw = 0;

        createTable(tableSigma, "th_sigma");

        transformEdges(dataCCNetViz.nodes, dataCCNetViz.edges);

        for (var i = 0; i < layouts.length; i++) {

            var layout = new ccNetViz.layout[layouts[0]](dataCCNetViz.nodes, dataCCNetViz.edges, {}).apply();
            //time for the layout computation for sigma is unknown since
            //sigma doesn't have predefined layouts
            //we are using ccNetViz to determine the nodes for the layouts
            t_layout = "-";

            refreshSigmaGraph();
            
            t_start_draw = new Date().getTime();
            parseSigmaData(dataCCNetViz.nodes, dataCCNetViz.edges);
            t_end_draw = new Date().getTime();
            t_draw = t_end_draw - t_start_draw;

            fillTable(tableSigma, layouts[i], t_layout, t_draw);

        }

        setInitialSelectionSigma();
        onElementClickSigma();
    });
}

function convertDataSigma(data) {
    let original = JSON.parse(data);
    let out = {
        nodes: [],
        edges: []
    }

    for (let i = 0; i < original.nodes.length; i++) {
        var rand = Math.floor((Math.random() * 10) + 1);
        out.nodes.push({
            id: 'n' + i,
            label: original.nodes[i].label,
            x: rand,
            y: -rand
        });
    }

    for (let i = 0; i < original.edges.length; i++) {
        out.edges.push({
            id: 'e' + i,
            source: 'n' + original.edges[i].source,
            target: 'n' + original.edges[i].target
        });
    }

    return JSON.stringify(out);
}

function onElementClickSigma() {
    if (tableSigma != null) {
        for (var i = 0; i < tableSigma.rows.length; i++) {
            tableSigma.rows[i].cells[0].onclick = function() {
                $("#perfTableSigma tr").removeClass('onClickStyle');
                refreshSigmaGraph();
                var layout = new ccNetViz.layout[this.innerHTML](dataCCNetViz.nodes, dataCCNetViz.edges, {}).apply();
                parseSigmaData(dataCCNetViz.nodes, dataCCNetViz.edges);
                $(this).parent().addClass('onClickStyle');
            };
        }
    }
}

function setInitialSelectionSigma() {
    var layout = new ccNetViz.layout['circular'](dataCCNetViz.nodes, dataCCNetViz.edges, {}).apply();
    parseSigmaData(dataCCNetViz.nodes, dataCCNetViz.edges);
    document.getElementById('perfTableSigma').childNodes[1].className = "onClickStyle";
}

function refreshSigmaGraph() {
    // to delete & refresh the graph
    var g = document.querySelector('#containerSigma');
    var p = g.parentNode;
    p.removeChild(g);
    var c = document.createElement('div');
    c.setAttribute('id', 'containerSigma');
    p.appendChild(c);
}

function parseSigmaData(nodes, edges) {
    sigma.parsers.json(objectURL, {
            container: 'containerSigma',
            settings: {
                defaultNodeColor: '#ec5148'
            }
        },
        function(s) {
            s.graph.nodes().forEach(function(node, i, a) {
                node.x = nodes[i].x;
                node.y = nodes[i].y;
            });

            s.graph.edges().forEach(function(node, i, a) {
                edge = edges[i];
            });

            //Call refresh to render the new graph
            s.refresh();

        }
    );

}


function initCyto() {
    $.ajax({ method: 'get', url: 'data/graph-100-1.json', async: false, dataType: 'text' }).done(function(d) {
        dataCyto = d;
        d_parsed = convertDataCyto(data);

        var t_start_layout, t_start_draw, t_end_layout, t_end_draw,
            t_layout, t_draw;

        createTable(tableCyto, "th_cyto");

        for (var i = 0; i < layoutsCyto.length; i++) {

            t_start_layout = new Date().getTime();
            containerCyto = cytoscape({
                container: document.getElementById('containerCyto'),
                elements: d_parsed,
                style: [{
                    selector: 'node',
                    style: {
                        'background-color': '#FFA500'
                    }
                }]
            });
            t_end_layout = new Date().getTime();
            t_layout = t_end_layout - t_start_layout;

            t_start_draw = new Date().getTime();
            var layout = containerCyto.layout({
                name: layoutsCyto[i]
            });

            layout.run();
            t_end_draw = new Date().getTime();
            t_draw = t_end_draw - t_start_draw;

            fillTable(tableCyto, layoutsCyto[i], t_layout, t_draw);
        }

        onElementClickCyto();
        setInitialSelectionCyto();
    });
}

function convertDataCyto(data) {
    let original = JSON.parse(data);
    let out = [];

    for (let i = 0; i < original.nodes.length; i++) {
        out.push({
            data: {
                id: original.nodes[i].label
            }
        });
    }

    for (let i = 0; i < original.edges.length; i++) {
        out.push({
            data: {
                id: '' + original.edges[i].source + original.edges[i].target,
                source: original.edges[i].source,
                target: original.edges[i].target
            }
        });
    }

    return out;
}

function setInitialSelectionCyto() {
    var layout = containerCyto.layout({
        name: 'circle'
    });
    layout.run();
    document.getElementById('perfTableCyto').childNodes[1].className = "onClickStyle";
}

function onElementClickCyto() {
    if (tableCyto != null) {
        for (var i = 0; i < tableCyto.rows.length; i++) {
            tableCyto.rows[i].cells[0].onclick = function() {
                $("#perfTableCyto tr").removeClass('onClickStyle');
                var layout = containerCyto.layout({
                    name: this.innerHTML
                });
                layout.run();
                $(this).parent().addClass('onClickStyle');
            };
        }
    }
}