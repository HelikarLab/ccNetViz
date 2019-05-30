import Node from "./shapes/node"

export default class AdvancedNodeEdge {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 0;
    this.canvas.height = 0;
    this.canvas.style.display = 'none';
  }

  createTexture(config) {
    let nodes = new Node(this.canvas, config);
    return nodes.generate();
  }
}

window.AdvancedNodeEdge = AdvancedNodeEdge;