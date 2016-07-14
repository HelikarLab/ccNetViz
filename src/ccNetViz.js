define([
        './ccNetVizMultiLevel',
        './layer',
        './utils'
    ], 
    function(
        ccNetVizMultiLevel,
        layer,
        utils
    ){
/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska
 */


var ccNetViz = function(canvas, options){
  var vizScreen,vizScreenTemp,vizLayout;

  var getNodesCnt = (() => {
    return vizScreenTemp.cntShownNodes() + vizScreen.cntShownNodes();
  });
  var getEdgesCnt = (() => {
    return vizScreenTemp.cntShownEdges() + vizScreen.cntShownEdges();
  });
  
  vizScreen = new layer(canvas, options, getNodesCnt);
  vizScreenTemp = new layer(canvas, options, getEdgesCnt);
  
    
  var supStructsCreated = false;

  var lastNodeIndex;
  var lastEdgeIndex;
  
  var uniqid = 0;
  
  //with edges id with keys of node ids
  // {1:[4,5], 2:[4]} - node id 1 has associated edge with id 4 and 5, node with id 2 has associated edge 4
  var nPos = {};
  var ePos = {};
  var eDirs = {};
  
  
  var toAddNodes = [];
  var toAddEdges = [];
  var toRemoveNodes = [];
  var toRemoveEdges = [];
  
  var actualTempNodes = [];
  var actualTempEdges = [];
  
  var nodes;
  var edges;


  var onRedraw = utils.debounce(() => {
    self.draw.call(self);
    return false;
  }, 5);  
  
  var self = this;
  vizScreen.onRedraw = vizScreenTemp.onRedraw = (() => {
    onRedraw();
    return false;
  });
  
  function removeNodes(){
    toRemoveNodes.forEach((n) => {
      if(n.uniqid === undefined)
        return;
      
      if(nPos[n.uniqid] !== undefined){
        //in the normal graph
        var pos = nPos[n.uniqid];
        vizScreen.removeNodeAtPos(pos);
      }else{
        //try to remove from temp graph
        
        for(var i = 0; i < actualTempNodes.length; i++){
          if(actualTempNodes[i].uniqid === n.uniqid){
            actualTempNodes.splice(i,1);
            break;
          }
        }
      }
      
      delete n.uniqid;
    });
  }

  function removeEdges(){
    toRemoveEdges.forEach((e) => {
      if(e.uniqid === undefined)
        return;

      delete eDirs[e.source.uniqid][e.target.uniqid];
      
      if(ePos[e.uniqid] !== undefined){
        //in the normal graph
        var pos = ePos[e.uniqid];
        vizScreen.removeEdgeAtPos(pos);
      }else{
        //try to remove from temp graph
        
        for(var i = 0; i < actualTempEdges.length; i++){
          if(actualTempEdges[i].uniqid === e.uniqid){
            actualTempEdges.splice(i,1);
            break;
          }
        }

      }
      
      delete e.uniqid;
    });
  }
  
  function addEdges(){
    toAddEdges.forEach((e) => {
      //already added
      if(e.uniqid !== undefined){
        console.error(e);
        console.error("This edge has been already added, if you want to add same edge twice, create new object with same properties");
        return;
      }
      //already added
      e.uniqid = ++lastEdgeIndex;

      //add this node into temporary chart
      actualTempEdges.push(e);
    });
  }
  
  function addNodes(nodes){
    toAddNodes.forEach((n) => {
      
      //already added
      if(n.uniqid !== undefined){
        console.error(n);
        console.error("This node has been already added, if you want to add same node twice, create new object with same properties");
        return;
      }

      n.uniqid = ++lastNodeIndex;
      
      eDirs[n.uniqid] = {};
      actualTempNodes.push(n);
    });
  }
  
  
  function isAnyChange(){
    return toAddEdges.length > 0 || toAddNodes.length > 0 || toRemoveEdges.length > 0 || toRemoveNodes.length > 0;
  }
  
  function createSupportStructs(nodes, edges){
    if(supStructsCreated)
      return;
    
    nPos = {};
    ePos = {};
    eDirs = {};

    nodes.forEach((n, i) => {
      n.uniqid = i;
      nPos[n.uniqid] = i;
      eDirs[n.uniqid] = {};
    });
    
    edges.forEach((e, i) => {
      e.uniqid = i;
      eDirs[e.source.uniqid][e.target.uniqid] = e;
      ePos[e.uniqid] = i;
    });
    
    lastNodeIndex = nodes[nodes.length-1].uniqid;
    lastEdgeIndex = nodes[nodes.length-1].uniqid;
    
    supStructsCreated = true;
  };

  this.set = (n, e, layout) => {
    nodes = n;
    edges = e;
    
    vizScreenTemp.set([], [], layout);
    vizScreen.set(nodes, edges, layout);
    
    supStructsCreated = false;
  };
  
  this.removeNode = (n) => {
    createSupportStructs(nodes, edges);

    toRemoveNodes.push(n);
    return this;
  };
  
  this.removeNodes = (nodes) => {
    nodes.forEach((n) => {
      this.removeNode(n);
    });
    return this;
  };
  
  //make all dynamic changes static
  this.reflow = () => {
    //nodes and edges in dynamic chart are actual
    var n = vizScreen.getVisibleNodes().concat(vizScreenTemp.getVisibleNodes());
    var e = vizScreen.getVisibleEdges().concat(vizScreenTemp.getVisibleEdges());
    
    this.set(n,e);
    this.draw();
  };

  this.addEdge = (e) => {
    createSupportStructs(nodes, edges);

    var tid = e.target.uniqid;
    var sid = e.source.uniqid;
    
    if(eDirs[sid][tid]){
      //this edge was already added
      return this;
    }
    if(eDirs[tid][sid]){
      //must remove line and add two curves
      
      toRemoveEdges.push(eDirs[tid][sid]);
      
      toAddEdges.push(eDirs[tid][sid]);
      toAddEdges.push(eDirs[sid][tid] = e);
      
      return this;
    }

    toAddEdges.push(e);
    return this;
  };
  
  this.addNode = (n) => {
    createSupportStructs(nodes, edges);

    toAddNodes.push(n);    
    return this;
  };

  
  this.addEdges = (edges) => {
    edges.forEach((e) => {
      this.addEdge(e);
    });
    
    return this;
  };

  this.addNodes = (nodes) => {
    nodes.forEach((n) => {
      this.addNode(n);
    });

    return this;
  };
  
  this.applyChanges = () => {
    
    actualTempNodes = vizScreenTemp.nodes;
    actualTempEdges = vizScreenTemp.edges;
    
    removeEdges();
    removeNodes();
    addNodes();
    addEdges();
    
    toAddEdges = [];
    toAddNodes = [];
    toRemoveEdges = [];
    toRemoveNodes = [];
    
    
    vizScreenTemp.set(actualTempNodes, actualTempEdges);
    this.draw();
    
    return this;
  };
  
  this.draw = () => {
    vizScreen.draw();
    vizScreenTemp.draw(true);
  };
  
  this.find = function(){
    function mergeArrays(a, b, cmp){
      var r = [];
      r.length = a.length + b.length;

      var i = 0,j=0,k=0;
      
      while (i < a.length && j < b.length)
      {
        if (cmp(a[i],b[j]) < 0)       
          r[k++] = a[i++];
        else        
          r[k++] = b[j++];               
      }

      while (i < a.length)
        r[k++] = a[i++];


      while (j < b.length)
        r[k++] = b[j++];
      
      return r;
    }
    
    var f1 = vizScreen.find.apply(vizScreen, arguments);
    var f2 = vizScreenTemp.find.apply(vizScreenTemp, arguments);
    
    var r = {};
    for(var key in f1){
      r[key] = mergeArrays(f1[key], f2[key], (e1, e2) => {
			      return e1.dist2 - e2.dist2;
			    });
    }
    
    return r;
  };


  var exposeMethods = ['resetView', 'resize'];
  var self = this;
  exposeMethods.forEach(((method) => {
    (function(method, self){
      self[method] = function(){
        vizScreenTemp[method].apply(vizScreenTemp, arguments);
        return vizScreen[method].apply(vizScreen, arguments);
      };
    })(method, self);
  }));
  
};


window.ccNetViz = module.exports = ccNetViz;


});