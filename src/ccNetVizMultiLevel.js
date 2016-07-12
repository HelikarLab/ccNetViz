define([
	'./ccNetViz',
    ], 
    function(
	ccNetViz
    ){
/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska
 */


var ccNetVizMultiLevel = function(canvas, options){
  var vizScreen = new ccNetViz(canvas, options);
  var vizLayout;

  var history = [];
  var curlevel = {};


  //right click >> go back
  canvas.addEventListener('contextmenu', function(e){
    if(history.length > 0){
	var histel = history.pop();

	//currently shown level
	curlevel = histel;

	vizScreen.set(curlevel.nodes, curlevel.edges);
	vizScreen.draw();
    }

    e.preventDefault();
  });

  canvas.addEventListener('click', function(e){
    var bb = el.getBoundingClientRect();

    var x = e.clientX - bb.left;
    var y = e.clientY - bb.top;
    var radius = 5;

    var result = vizScreen.find(x,y,radius,true,false);
    if(result.nodes.length > 0){
      var node = result.nodes[0].node;

      var layout = node.layout || vizLayout;
      if(node.__computedLayout){
	//it is not nessesary to recompute layout if it was yet computed on this subgraph
	layout = undefined;
      }else{
	//we store that layout was once computed for this subgraph
        node.__computedLayout = true;
      }

      if(node.nodes && node.edges){
	var insidenodes = node.nodes;
	var insideedges = node.edges;

	history.push(curlevel);

	curlevel = {nodes: insidenodes, edges: insideedges};

	vizScreen.set(curlevel.nodes, curlevel.edges, layout);
	vizScreen.draw();
      }
    }
  });
  
  var exposeMethods = ['find', 'draw', 'resetView', 'resize'];
  var self = this;
  exposeMethods.forEach(function(method){
    (function(method, self){
      self[method] = function(){
	return vizScreen[method].apply(vizScreen, arguments);
      };
    })(method, self);
  });


  this.set = function(nodes, edges, layout){
    toplevels = [];

    curlevel = {nodes: nodes, edges: edges};
    history = [];

    vizLayout = layout;
    vizScreen.set.apply(vizScreen, arguments);
  }
};


window.ccNetVizMultiLevel = module.exports = ccNetVizMultiLevel;


});