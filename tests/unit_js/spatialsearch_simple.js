$(function(){
  QUnit.test( "Spatial search - separated", function( assert ) {
    
    //init context
    var fakecontext1 = {
      aspect2: 1,
      count : 3,
      curveExc: 62.5,
      height: 250,
      nodeSize: 16,
      offsetX: 0.016,
      offsetY: 0.016,
      width: 250
    };

    var normalize = (a, b) => {
	var x = b.x - a.x;
	var y = b.y - a.y;
	var sc = 1 / Math.sqrt(x*x + y*y);
	return { x: sc * x, y: sc * y };
    };

    var fakenodes1 = [{"label":"Hello","index":0,"weight":4,"x":0,"y":0,"px":-5.35063864596904,"py":-5.166442424206773},{"label":"World","index":1,"weight":3,"x":1,"y":0.27607603976422057,"px":8.741467776497304,"py":-1.418606372028333},{"label":"!","index":2,"weight":1,"x":0.2400995841964108,"y":1,"px":-1.9528618110929463,"py":8.454018884273431}];
    var fakelines1 = [{"source":{"label":"World","index":1,"weight":3,"x":1,"y":0.27607603976422057,"px":8.741467776497304,"py":-1.418606372028333},"target":{"label":"!","index":2,"weight":1,"x":0.2400995841964108,"y":1,"px":-1.9528618110929463,"py":8.454018884273431}}];
    var fakecurves1 = [{"source":{"label":"Hello","index":0,"weight":4,"x":0,"y":0,"px":-5.35063864596904,"py":-5.166442424206773},"target":{"label":"World","index":1,"weight":3,"x":1,"y":0.27607603976422057,"px":8.741467776497304,"py":-1.418606372028333}},{"source":{"label":"World","index":1,"weight":3,"x":1,"y":0.27607603976422057,"px":8.741467776497304,"py":-1.418606372028333},"target":{"label":"Hello","index":0,"weight":4,"x":0,"y":0,"px":-5.35063864596904,"py":-5.166442424206773}}];
    var fakecircles1 = [{"source":{"label":"Hello","index":0,"weight":4,"x":0,"y":0,"px":-5.35063864596904,"py":-5.166442424206773},"target":{"label":"Hello","index":0,"weight":4,"x":0,"y":0,"px":-5.35063864596904,"py":-5.166442424206773}}];
    
    
    var spatialSearch1 = new ccNetViz.spatialSearch(fakecontext1, fakenodes1, fakelines1, fakecurves1, fakecircles1, normalize);
    var fakeview1 = {size: 1};


    //do some tests
    var x = 0.3637818638153076;
    var y = 0.3596421361846924;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    
    assert.deepEqual({"edges":[],"nodes":[]},ret, "Somewhere in the middle 1, should not return any of edge or node" );

    var x = -0.0077381361846923825;
    var y = 0.9602661361846924;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.deepEqual({"edges":[],"nodes":[]},ret, "Somewhere in the middle 2, should not return any of edge or node" );
    
    
    /******** TESTING DISTANCE PARAMETER *********/
    var x = 0.2358138638153076;
    var y = 1.0015461361846925;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 1, "Test of dist parameter 1" );

    var x = 0.2258138638153076;
    var y = 1.0015461361846925;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 0 && ret.nodes.length == 0, "Test of dist parameter 2" );
    
    var x = 0.2658138638153076;
    var y = 1.0015461361846925;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 0 && ret.nodes.length == 0, "Test of dist parameter 3" );

    var x = 0.2658138638153076;
    var y = 1.0315461361846925;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 0 && ret.nodes.length == 0, "Test of dist parameter 3" );
    
    var x = 0.2658138638153076;
    var y = 1.0315461361846925;
    var dist = 0.05;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 1, "Test of dist parameter 4" );
    /******** END OF TESTING DISTANCE PARAMETER *********/
    
    
    /******** TESTING SEARCH FOR DIFFERENT TYPES ********/
    var x = 0.019093863815307616;
    var y = 0.09957813618469238;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 0, "Search for circle" );

    var x = 0.8054778638153076;
    var y = 0.4504581361846923;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 0, "Search for line" );
    
    var x = 0.34520586381530766;
    var y = 0.8921541361846924;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 0, "Search for the same line" );
    
    var x = 0.2358138638153076;
    var y = 1.0015461361846925;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 1, "Search for node and line" );
    
    var x = 0.48968586381530754;
    var y = 0.2089701361846924;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 0, "Search for curve" );

    var x = 0.8137338638153077;
    var y = 0.2688261361846924;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 0, "Second search for curve" );

    var x = 0.4587258638153076;
    var y = 0.22341813618469236;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 0 && ret.nodes.length == 0, "Search for curve - shall fail" );
    
    var x = 0.4587258638153076;
    var y = 0.22341813618469236;
    var dist = 0.05;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 1 && ret.nodes.length == 0, "Search for curve - with bigger radius" );
    
    var x = 0.9933018638153075;
    var y = 0.27089013618469243;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,true);
    assert.ok(ret.edges.length == 3 && ret.nodes.length == 1, "Test for 3 edges and 1 node" );
    
    var x = 0.9933018638153075;
    var y = 0.27089013618469243;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, true,false);
    assert.ok(ret.edges === undefined && ret.nodes !== undefined, "Test for edges parameter" );
    
    var x = 0.9933018638153075;
    var y = 0.27089013618469243;
    var dist = 0.01;
    var ret = spatialSearch1.find(fakecontext1, x,y,dist, fakeview1.size, false,true);
    assert.ok(ret.edges !== undefined && ret.nodes === undefined, "Test for nodes parameter" );
  });
});