import {degrees} from './utils';

export default class {
  // the hubs are on the first half of the sinusoid period
  // the intermediary are on the second half
  // and the periphery are on the upper straight line
  // further versions should enable the choice of other
  // fractions of hubs, intermediary and peripheral vertices
  // or the Erdös sectioning.
  // maybe also let the user set the endpoints of the periphery segment
  constructor(nodes, edges) {
    this._nodes = nodes;
    this._edges = edges;
    this._margin = 0.05;
    this._hubs = 0.1; // 10%
    this._intermediary = 0.2;
  }
  apply () {
      let nd = degrees(this._nodes, this._edges);
      const nhubs_intermediary = Math.floor(this._nodes.length*(this._hubs + this._intermediary));
      const nhubs = Math.floor(this._nodes.length*this._hubs);
      const stepx1 = ((1 - 2*this._margin)/2)/(nhubs - 1);
      const steprad = Math.PI/(nhubs - 1); 
      let i = 0;
      while (i < nhubs ){
        this._nodes[nd.nodes[i].index].x = this._margin + stepx1*i;
        this._nodes[nd.nodes[i].index].y = this._margin + 0.4 + 0.4*Math.sin(i*steprad);
	++i;
      }
      const nintermediary = nhubs_intermediary - nhubs;
      const steprad2 = Math.PI/nintermediary; 
      const stepx2 = ((1 - 2*this._margin)/2)/nintermediary;
      i = 0;
      while (i < nintermediary ){
        this._nodes[nd.nodes[i+nhubs].index].x = 0.5 + stepx2*(i+1);
        this._nodes[nd.nodes[i+nhubs].index].y = this._margin + 0.4 + 0.4*Math.sin(Math.PI+(i+1)*steprad2);
	++i;
      }
      const p0 = [0.85, 0.75];
      const p1 = [0.4, 1-this._margin];
      const nperipheral = this._nodes.length - nhubs_intermediary;
      const stepxx = (p1[0]-p0[0])/(nperipheral - 1);
      const stepy = (p1[1]-p0[1])/(nperipheral - 1);
      i = 0;
      while (i < nperipheral ){
        this._nodes[nd.nodes[i+nhubs_intermediary].index].x = p0[0] + stepxx*i;
        this._nodes[nd.nodes[i+nhubs_intermediary].index].y = p0[1] + stepy*i;
	++i;
      }
  }
};
