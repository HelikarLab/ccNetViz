$(function(){
  QUnit.test( "Spatial search - complex", function( assert ) {
      //TODO: add some more complex tests after "predefined" layout instead of "force" would be implemented
    
      var el = document.createElement('canvas');
      el.setAttribute('id', 'container');
      document.body.appendChild(el);
    
    
      var graph = new ccNetViz(el, {
	styles: {
	  node: { texture: "images/node.png", label: { hideSize: 16 } },
	  edge: { arrow: { texture: "images/arrow.png" } }
	}});
      var nodes = [
	{ label: "Hello", x: 0, y: 0 },
	{ label: "World", x: 1, y: 0.27607603976422057 },
	{ label: "!", x: 0.2400995841964108, y: 1 }
      ];
      var edges = [
	{ source: nodes[0], target: nodes[1] },
	{ source: nodes[1], target: nodes[2] },
	{ source: nodes[2], target: nodes[1] }
      ];
      
      //we use userdef layout so we have always same position and can run tests
      graph.set(nodes, edges, "userdef");
      graph.draw();
      
      var radius = 5;
      var x = 92.00284099578857;
      var y = 289.0028409957886;

      var ret = graph.find(x, y, radius, true, true);
      assert.ok(ret.edges.length == 0 && ret.nodes.length == 0, "Somewhere in middle" );

      var x = 79.00284099578857;
      var y = 161.00284099578857;
      var ret = graph.find(x, y, radius, true, true);
      assert.ok(ret.edges.length == 0 && ret.nodes.length == 0, "Somewhere in middle 2" );
      
      var x = 123.00284099578857;
      var y = 12.002840995788574;
      var ret = graph.find(x, y, radius, true, true);
      
      assert.ok(ret.edges.length == 2 && ret.nodes.length == 1, "Somewhere in middle 3" );
      
      
      //do zoom
//      var e = jQuery.Event( "mousewheel",{clientX: 170, clientY: 302, deltaMode: 0, deltaY: -34} );
//      $( el ).trigger( e );
//      var e = jQuery.Event( "mousewheel",{clientX: 170, clientY: 302, deltaMode: 0, deltaY: -86} );
//      $( el ).trigger( e );

      var event = new Event('wheel');
      event.clientX = 201;
      event.clientY = 307;
      event.deltaMode = 0;
      event.deltaY = -26;
      el.dispatchEvent(event);

      var event = new Event('wheel');
      event.clientX = 201;
      event.clientY = 307;
      event.deltaMode = 0;
      event.deltaY = -160;
      el.dispatchEvent(event);
      

      var x = 0.0028409957885742188;
      var y = 498.0028409957886;
      var ret = graph.find(x, y, radius, true, true);
      assert.ok(ret.edges.length == 0 && ret.nodes.length == 0, "Left bottom after zoom" );
      

      var x = 302.0028409957886;
      var y = 122.00284099578857;
      var ret = graph.find(x, y, radius, true, true);
      assert.ok(ret.edges.length == 2 && ret.nodes.length == 0, "Line after zoom" );
      
      
      document.body.removeChild(el);
  });
});