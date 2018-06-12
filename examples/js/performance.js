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

    var selectedGraph = "data/" + selElmnt + ".json";

    //we load data in the
    $.ajax({ method: 'get', url: selectedGraph, async: false, dataType: 'text' }).done(function(d) {
        data = d;
    });

    d = JSON.parse(data);
    var t_start_layout, t_start_draw, t_end_layout, t_end_draw,
        t_layout, t_draw;

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

        fillTableViz(tableViz, layouts[i], t_layout, t_draw);

    }

    for (var j = 0; j < layoutsAll.length; j++) {
        if (!layouts.includes(layoutsAll[j])) {
            fillTableViz(tableViz, layoutsAll[j], "-", "-");
        }
    }

    onElementClick();
    setInitialSelection();
}

function onElementClick() {
    if (tableViz != null) {
        for (var i = 0; i < tableViz.rows.length; i++) {
            tableViz.rows[i].cells[0].onclick = function() {
                var lay = this.innerHTML;
                $("#perfTableViz tr").removeClass('onClickStyle');
                if (lay != "breadthfirst" && lay != "concentric" && lay != "cose") {
                    document.getElementById("containerViz").style.display = "block";
                    document.getElementById("containerCyto").style.display = "none";
                    graph.set(d.nodes, d.edges, this.innerHTML);
                    graph.draw();
                } else {
                    document.getElementById("containerViz").style.display = "none";
                    document.getElementById("containerCyto").style.display = "block";
                    var layout = containerCyto.layout({
                        name: this.innerHTML
                    });
                    layout.run();
                }

                $(this).parent().addClass('onClickStyle');
            };
        }
    }
}

function setInitialSelection() {
    graph.set(d.nodes, d.edges, 'circular');
    graph.draw();
    document.getElementById('perfTableViz').rows[2].className = "onClickStyle";
}

function createTable(tableName, th_class) {
    for (var i = 0; i < layoutsAll.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute("id", layoutsAll[i]);
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');
        text1 = document.createTextNode(layoutsAll[i]);
        td1.appendChild(text1);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        tableName.appendChild(tr);
    }

}

function fillTableViz(tableName, layoutI, t_layout, t_draw) {
    var tr = document.getElementById(layoutI);
    var Cells = tr.getElementsByTagName("td");
    Cells[1].innerHTML = t_layout;
    Cells[2].innerHTML = t_draw;
}

function fillTableCyto(tableName, layoutI, t_layout, t_draw) {
    var tr = document.getElementById(layoutI);
    var Cells = tr.getElementsByTagName("td");
    Cells[3].innerHTML = t_layout;
    Cells[4].innerHTML = t_draw;
}

function fillTableSigma(tableName, layoutI, t_layout, t_draw) {
    var tr = document.getElementById(layoutI);
    var Cells = tr.getElementsByTagName("td");
    Cells[5].innerHTML = t_layout;
    Cells[6].innerHTML = t_draw;
}

function initSigma() {
    var selectedGraph = "data/" + selElmnt + ".json";

    $.ajax({ method: 'get', url: selectedGraph, async: false, dataType: 'text' }).done(function(d) {
        data = d;

        dataCCNetViz = JSON.parse(data);

        var t_start_layout, t_start_draw, t_end_layout, t_end_draw,
            t_layout, t_draw = 0;

        transformEdges(dataCCNetViz.nodes, dataCCNetViz.edges);

        for (var i = 0; i < layouts.length; i++) {
            var sigmaGraph = {
                nodes: [],
                edges: []
            };
            var layout = new ccNetViz.layout[layouts[i]](dataCCNetViz.nodes, dataCCNetViz.edges, {}).apply();
            //time for the layout computation for sigma is unknown since
            //sigma doesn't have predefined layouts
            //we are using ccNetViz to determine the nodes for the layouts
            t_layout = "-";

            //refreshSigmaGraph();

            parseSigmaData(sigmaGraph, dataCCNetViz.nodes, dataCCNetViz.edges);

            t_start_draw = new Date().getTime();
            var s = new sigma({
                graph: sigmaGraph,
                container: 'containerSigma'
            });
            t_end_draw = new Date().getTime();
            t_draw = t_end_draw - t_start_draw;

            fillTableSigma(tableViz, layouts[i], t_layout, t_draw);

        }

        for (var j = 0; j < layoutsAll.length; j++) {
            if (!layouts.includes(layoutsAll[j])) {
                fillTableSigma(tableViz, layoutsAll[j], "-", "-");
            }
        }

        //setInitialSelectionSigma();
        //onElementClickSigma();
    });
}

function onElementClickSigma() {
    if (tableSigma != null) {
        for (var i = 0; i < tableSigma.rows.length; i++) {
            tableSigma.rows[i].cells[0].onclick = function() {
                $("#perfTableSigma tr").removeClass('onClickStyle');
                refreshSigmaGraph();
                var sigmaGraph = {
                    nodes: [],
                    edges: []
                }
                var layout = new ccNetViz.layout[this.innerHTML](dataCCNetViz.nodes, dataCCNetViz.edges, {}).apply();
                parseSigmaData(sigmaGraph, dataCCNetViz.nodes, dataCCNetViz.edges);
                var s = new sigma({
                    graph: sigmaGraph,
                    container: 'containerSigma'
                });
                $(this).parent().addClass('onClickStyle');
            };
        }
    }
}

function setInitialSelectionSigma() {
    refreshSigmaGraph();
    var sigmaGraph = {
        nodes: [],
        edges: []
    };
    var layout = new ccNetViz.layout['circular'](dataCCNetViz.nodes, dataCCNetViz.edges, {}).apply();
    parseSigmaData(sigmaGraph, dataCCNetViz.nodes, dataCCNetViz.edges);
    s = new sigma({
        graph: sigmaGraph,
        container: 'containerSigma'
    });
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

function parseSigmaData(sigmaGraph, nodes, edges) {
    for (var j = 0; j < nodes.length; j++) {
        sigmaGraph.nodes.push({
            id: 'n' + j,
            label: nodes[j].label,
            x: nodes[j].x,
            y: nodes[j].y,
            color: '#ec5148'
        });
    }

    for (var j = 0; j < edges.length; j++) {
        sigmaGraph.edges.push({
            id: 'e' + j,
            source: 'n' + edges[j].source.label,
            target: 'n' + edges[j].target.label,
            color: '#ec5148'
        });
    }
}


function initCyto() {
    var selectedGraph = "data/" + selElmnt + ".json";
    $.ajax({ method: 'get', url: selectedGraph, async: false, dataType: 'text' }).done(function(d) {
        dataCyto = d;
        d_parsed = convertDataCyto(data);

        var t_start_layout, t_start_draw, t_end_layout, t_end_draw,
            t_layout, t_draw;

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

            if (layoutsCyto[i] == "circle") fillTableCyto(tableViz, "circular", t_layout, t_draw);
            else fillTableCyto(tableViz, layoutsCyto[i], t_layout, t_draw);
        }

        for (var j = 0; j < layoutsAll.length; j++) {
            if (!layoutsCyto.includes(layoutsAll[j]) && layoutsAll[j] != "circular") {
                fillTableCyto(tableViz, layoutsAll[j], "-", "-");
            }
        }

        //onElementClickCyto();
        //setInitialSelectionCyto();
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