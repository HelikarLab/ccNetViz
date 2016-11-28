import ccNetViz from './ccNetViz';

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska - http://alessaska.cz/
 */


var ccNetVizMultiLevel = function(canvas, options){
  var vizScreen = new ccNetViz(canvas, options);
  var vizLayout;

  var history = [];
  var curlevel = {};


  var onContextMenu, onClick;
  
  //right click >> go back
  canvas.addEventListener('contextmenu', onContextMenu = function(e){
    if(history.length > 0){
	var histel = history.pop();

	//currently shown level
	curlevel = histel;

	vizScreen.set(curlevel.nodes, curlevel.edges);
	vizScreen.draw();
    }

    e.preventDefault();
  });

  canvas.addEventListener('click', onClick = function(e){
    var bb = canvas.getBoundingClientRect();

    var x = e.clientX - bb.left;
    var y = e.clientY - bb.top;
    var radius = 5;

    var lCoords = vizScreen.getLayerCoords({radius: radius, x:x, y:y});
    var result = vizScreen.find(lCoords.x,lCoords.y,lCoords.radius,true,false);
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
  
  ////TODO: Add interactivity functios into this class
  
  this.remove = function(){
    canvas.removeEventListener('contextmenu', onContextMenu);
    canvas.removeEventListener('click', onClick);
    vizScreen.remove();
  };


  this.set = function(nodes, edges, layout){
    curlevel = {nodes: nodes, edges: edges};
    history = [];

    vizLayout = layout;
    vizScreen.set.apply(vizScreen, arguments);
  }
  
  var exposeMethods = ['find', 'findArea', 'getLayerCoords', 'draw', 'resetView', 'setViewport', 'update', 'resetView'];
  var self = this;
  exposeMethods.forEach(function(method){
    (function(method, self){
      self[method] = function(){
	return vizScreen[method].apply(vizScreen, arguments);
      };
    })(method, self);
  });
};


window.ccNetVizMultiLevel = ccNetVizMultiLevel;

export default ccNetVizMultiLevel;