$(function(){

  var el;
  var data = {};
  var layouts = ['force'];				//names of layout tests to initialize
  var datafiles = ['graph-100-3', 'graph-100-2'];	//links to /examples/data/FILENAME.json
    
  function initData(){
    //load all data
    $.each(datafiles, function(i, v){
      
      //we load data in the
      $.ajax({method: 'get', url: '../examples/data/'+v+'.json', async: false, dataType: 'text'}).done(function(d){
	data[v] = d;
      });
    });
	
    el = document.createElement('canvas');
    el.setAttribute('id', 'container');
    document.body.appendChild(el);
  }
  
  initData();

  suite('Graph-with-layout', function(suite) {

    setup(function() {
    });

    
    $.each(layouts, function(kl, layout){
      $.each(data, function(k, v){
	bench(layout+'#'+k, function() {
	  $(el).hide();

	  var graph = new ccNetViz(el, {
	    styles: {
	      node: { texture: "images/node.png", label: { hideSize: 16 } },
	      edge: { arrow: { texture: "images/arrow.png" } }
	    }});
	  
	  
	  var d = JSON.parse(v);	//parse data from the text so we have for each test run new js objects (objects modifications from the main library does not have any effect on tests)
	  graph.set(d.nodes, d.edges, layout);
	  graph.draw();

	  $(el).show();
	});
      });
	
    });
  });

  
  suite('Only-layout-function', function(suite) {

    setup(function() {
    });

    
    $.each(layouts, function(kl, layout){
      $.each(data, function(k, v){
	bench(layout+'#'+k, function() {
	  var d = JSON.parse(v);	//parse data from the text so we have for each test run new js objects (objects modifications from the main library does not have any effect on tests)
	  new ccNetViz.layout[layout](d.nodes, d.edges).apply();
	});

      });
    });
  });
  
});