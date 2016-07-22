define([
    ], 
    function(
    ){
/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Author: Aleš Saska
 */


function pushUnique(arr, e){
  if(arr.indexOf(e) >= 0)
    return;
  arr.push(e);
}


var uniqid = [];

var interactivityBatch = function(layerScreen, layerScreenTemp, draw, nodes, edges){
    var toAddEdges = [];
    var toAddNodes = [];
    var toRemoveEdges = [];
    var toRemoveNodes = [];
    
    var ePos,nPos,eDirs,lastNodeIndex,lastEdgeIndex;
    
    
    
    function createSupportStructs(nodes, edges){
      nPos = {};
      ePos = {};
      eDirs = {};

      nodes.forEach((n, i) => {
        nPos[n.uniqid] = i;
        eDirs[n.uniqid] = {};
      });
      
      edges.forEach((e, i) => {
        eDirs[e.source.uniqid][e.target.uniqid] = e;
        ePos[e.uniqid] = i;
      });
      
      supStructsCreated = true;
    };

  function doRemoveNodes(nodes){
    nodes.forEach((n) => {
      if(n.uniqid === undefined)
        return;
      
      if(nPos[n.uniqid] !== undefined){
        //in the normal graph
        var pos = nPos[n.uniqid];
        layerScreen.removeNodeAtPos(pos);
      }else{
        //try to remove from temp graph
        
        for(var i = 0; i < actualTempNodes.length; i++){
          if(actualTempNodes[i] === n){
            actualTempNodes.splice(i,1);
            break;
          }
        }
      }
      
      delete n.uniqid;
    });
  }

  function doRemoveEdges(edges){
    edges.forEach((e) => {
      if(e.uniqid === undefined)
        return;

      delete (eDirs[e.source.uniqid] || {})[e.target.uniqid];
      
      if(ePos[e.uniqid] !== undefined){
        //in the normal graph
        var pos = ePos[e.uniqid];
        layerScreen.removeEdgeAtPos(pos);
      }else{
        //try to remove from temp graph
        
        for(var i = 0; i < actualTempEdges.length; i++){
          if(actualTempEdges[i] === e){
            actualTempEdges.splice(i,1);
            break;
          }
        }

      }
      
      delete e.uniqid;
    });
  }
  
  function doAddEdges(){
    toAddEdges.forEach((e) => {
      //already added in main graph
//      var tid = e.target.uniqid;
//      var sid = e.source.uniqid;
      if(
	ePos[e.uniqid] !== undefined
      ){
	doRemoveEdges([e]);
      }
      
      if(e.uniqid !== undefined){
        console.error(e);
        console.error("This edge has been already added, if you want to add same edge twice, create new object with same properties");
        return;
      }
      
      //add this node into temporary chart
      
      //TODO: Not so efficient >> causes quadratic complexity of adding edges into temporary graph
      pushUnique(actualTempEdges, e);
    });
  }
  
  function doAddNodes(nodes){
    toAddNodes.forEach((n) => {
      if(nPos[n.uniqid] !== undefined){
	doRemoveNodes([n]);
      }
      
      //already added
      if(n.uniqid !== undefined){
        console.error(n);
        console.error("This node has been already added, if you want to add same node twice, create new object with same properties");
        return;
      }
      
      eDirs[n.uniqid] = {};

      //TODO: Not so efficient >> causes quadratic complexity of adding nodes into temporary graph
      pushUnique(actualTempNodes, n);
    });
  }

  this.addEdge = (e) => {
    var tid = e.target.uniqid;
    var sid = e.source.uniqid;
    
    if((eDirs[sid] || {})[tid]){
      //this edge was already added >> remove it
      doRemoveEdges([e]);
    }
    
    if((eDirs[tid] || {})[sid]){
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
    toAddNodes.push(n);    
    return this;
  };

  this.removeNode = (n) => {
    toRemoveNodes.push(n);    
    return this;
  };

  this.removeEdge = (e) => {
    toRemoveEdges.push(e);
    return this;
  };
  
  this.applyChanges = () => {
    
    //nothing to do
    if(toRemoveEdges.length === 0 && toRemoveNodes.length === 0 && toAddEdges.length === 0 && toAddNodes.length === 0)
      return this;
    
    actualTempNodes = layerScreenTemp.nodes;
    actualTempEdges = layerScreenTemp.edges;
    
    doRemoveEdges(toRemoveEdges);
    doRemoveNodes(toRemoveNodes);
    doAddNodes();
    doAddEdges();
    
    toAddEdges = [];
    toAddNodes = [];
    toRemoveEdges = [];
    toRemoveNodes = [];
    
    
    layerScreenTemp.set(actualTempNodes, actualTempEdges);
    draw();
    
    return this;
  };
  
  createSupportStructs(nodes, edges);
  
}

module.exports = interactivityBatch;

});


 
