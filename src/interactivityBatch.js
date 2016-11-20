import geomutils from './geomutils';
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

export default class {
  constructor(layers, insertTempLayer, draw, nodes, edges, checkUniqId){
    this._layers = layers;
    this._insertTempLayer = insertTempLayer;

    this._draw = draw;
    this._nodes = nodes;
    this._edges = edges;
    this._checkUniqId = checkUniqId;
    
    this._toAddEdges = [];
    this._toAddNodes = [];
    this._toRemoveEdges = [];
    this._toRemoveNodes = [];

    //create support structures
    this._nPos = {};
    this._ePos = {};
    this._eDirs = {};

    nodes.forEach((n, i) => {
      this._nPos[n.uniqid] = i;
      this._eDirs[n.uniqid] = {};
    });
    
    edges.forEach((e, i) => {
      let s = geomutils.edgeSource(e);
      let t = geomutils.edgeTarget(e);

      let si = s.uniqid || s.__uniqid;
      let ti = t.uniqid || t.__uniqid;
      (this._eDirs[si] || (this._eDirs[si] = {}))[ti] = e;
      this._ePos[e.uniqid] = i;
    });
    
    this._actualTempNodes = [];
    this._actualTempEdges = [];
  }
  _doRemoveNodes(nodes){
    nodes.forEach((n) => {
      if(n.uniqid === undefined)
        return;
      
      if(this._nPos[n.uniqid] !== undefined){
        //in the normal graph
        let pos = this._nPos[n.uniqid];
        this._layers.main.removeNodeAtPos(pos);
        delete this._nPos[n.uniqid];
      }else{
        //try to remove from temp graph
        
        for(let i = 0; i < this._actualTempNodes.length; i++){
          if(this._actualTempNodes[i] === n){
            this._actualTempNodes.splice(i,1);
            break;
          }
        }
      }
      
      n.__uniqid = n.uniqid;
      delete n.uniqid;
    });
  }
  _doRemoveEdges(edges){
    edges.forEach((e) => {
      if(e.uniqid === undefined)
        return;
      
      let s = geomutils.edgeSource(e);
      let t = geomutils.edgeTarget(e);

      delete (this._eDirs[s.uniqid || s.__uniqid] || {})[t.uniqid || t.__uniqid];
      
      if(this._ePos[e.uniqid] !== undefined){
        //in the normal graph
        let pos = this._ePos[e.uniqid];
        this._layers.main.removeEdgeAtPos(pos);
        delete this._ePos[e.uniqid];
      }else{
        //try to remove from temp graph
        
        for(let i = 0; i < this._actualTempEdges.length; i++){
          if(this._actualTempEdges[i] === e){
            this._actualTempEdges.splice(i,1);
            break;
          }
        }

      }
      
      e.__uniqid = e.uniqid;
      delete e.uniqid;
    });
  }
  _doAddEdges(){
    this._toAddEdges.forEach((e) => {
      //already added in main graph
      if(
        this._ePos[e.uniqid] !== undefined
      ){
        this._doRemoveEdges([e]);
      }
      
      if(e.uniqid !== undefined){
        console.error(e);
        console.error("This edge has been already added, if you want to add same edge twice, create new object with same properties");
        return;
      }
      this._checkUniqId(e);
      
      //add this node into temporary chart
      
      //TODO: Not so efficient >> causes quadratic complexity of adding edges into temporary graph
      pushUnique(this._actualTempEdges, e);
    });
  }
  _doAddNodes(nodes){
    this._toAddNodes.forEach((n) => {
      if(this._nPos[n.uniqid] !== undefined){
        this._doRemoveNodes([n]);
      }
      
      //already added
      if(n.uniqid !== undefined){
        console.error(n);
        console.error("This node has been already added, if you want to add same node twice, create new object with same properties");
        return;
      }
      this._checkUniqId(n);
      
      this._eDirs[n.uniqid] = {};

      //TODO: Not so efficient >> causes quadratic complexity of adding nodes into temporary graph
      pushUnique(this._actualTempNodes, n);
    });
  }
  addEdge(e){
    let s = geomutils.edgeSource(e);
    let t = geomutils.edgeTarget(e);
    
    let tid = t.uniqid || t.__uniqid;
    let sid = s.uniqid || s.__uniqid;
    
    if((this._eDirs[sid] || {})[tid]){
      //this edge was already added >> remove it
      this._doRemoveEdges([e]);
    }
    
    if((this._eDirs[tid] || {})[sid]){
      //must remove line and add two curves
      
      this._toAddEdges.push(this._eDirs[tid][sid]);
      this._doRemoveEdges([this._eDirs[tid][sid]]);

      this._toAddEdges.push(this._eDirs[sid][tid] = e);
      
      return this;
    }

    this._toAddEdges.push(e);
    return this;
  }
  addNode(n){
    this._toAddNodes.push(n);    
    return this;
  }
  removeNode(n){
    this._toRemoveNodes.push(n);    
    return this;
  }
  removeEdge(e){
    this._toRemoveEdges.push(e);
    return this;
  }
  applyChanges(){
    
    //nothing to do
    if(this._toRemoveEdges.length === 0 && this._toRemoveNodes.length === 0 && this._toAddEdges.length === 0 && this._toAddNodes.length === 0)
      return this;
    
    this._actualTempNodes = this._layers.temp ? this._layers.temp.nodes : [];
    this._actualTempEdges = this._layers.temp ? this._layers.temp.edges : [];
    
    this._doRemoveEdges(this._toRemoveEdges);
    this._doRemoveNodes(this._toRemoveNodes);
    this._doAddNodes();
    this._doAddEdges();
    
    this._toAddEdges = [];
    this._toAddNodes = [];
    this._toRemoveEdges = [];
    this._toRemoveNodes = [];
    
    this._insertTempLayer();
    this._layers.temp.set(this._actualTempNodes, this._actualTempEdges);

    this._draw();
    
    return this;
  }
};