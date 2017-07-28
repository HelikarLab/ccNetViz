import {degrees} from './utils';

export default class {
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this._margin = 0.05;
  }
  apply () {
      let nd = degrees(this._nodes, this._edges);
      const sq = Math.sqrt(this._nodes.length);
      const reminder = sq - Math.floor(sq);
      if (reminder > 0)
	  var nnodes = Math.floor(sq)+1;
      else
	  var nnodes = sq;
      const step = (1 - this._margin*2)/nnodes;

      const nlines = this._nodes.length/nnodes;
      const reminder2 = nlines - Math.floor(nlines);
      if (reminder2 > 0)
	  var nlines2 = Math.floor(nlines)+1;
      else
	  var nlines2 = nlines;
      const stepy = (1-2*this._margin)/(nlines2-2);
      for (let i=0; i<this._nodes.length; ++i){
	  let j = Math.floor(i/(nnodes+1));
          this._nodes[nd.nodes[i].index].x = this._margin+step*(i-j*(nnodes+1));
          this._nodes[nd.nodes[i].index].y = this._margin+stepy*j;
          this._nodes[nd.nodes[i].index].weight = nd.degrees[i];
      }
  }
};
