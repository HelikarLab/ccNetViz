let ccNetVizImageExport = {
  init(instance, config, canvas) {
    this.instance = instance;
    this.config = Object.assign({}, config);

    this.source.width = canvas.width;
    this.source.height = canvas.height;

    this.instance.imageExport = this;
  },
  setScale(x) {
    this.scale = x;

    // Scaling up ccNetViz configuration textures
    let c = this.config;
    let t = JSON.parse(JSON.stringify(c));

    for (let key in c.styles) {
      let temp = t.styles[key];
      let conf = c.styles[key];

      // When texture created by node plugin remove and re-create.
      if (typeof temp.texture !== 'undefined')
        if (temp.texture.indexOf('blob:') === 0) delete temp.texture;

      // Scaling up default parameters.
      if (typeof conf.minSize !== 'undefined') {
        temp.minSize = conf.minSize * this.scale;
      }

      if (typeof conf.maxSize !== 'undefined')
        temp.maxSize = conf.maxSize * this.scale;

      if (typeof conf.size !== 'undefined') temp.size = conf.size * this.scale;

      if (typeof conf.width !== 'undefined')
        temp.width = conf.width * this.scale;

      if (typeof conf.label !== 'undefined')
        if (typeof conf.label.font !== 'undefined')
          if (typeof conf.label.font.size !== 'undefined')
            temp.label.font.size = conf.label.font.size * this.scale;

      if (typeof conf.arrow !== 'undefined') {
        if (typeof conf.arrow.minSize !== 'undefined')
          temp.arrow.minSize = conf.arrow.minSize * this.scale;
        if (typeof conf.arrow.maxSize !== 'undefined')
          temp.arrow.maxSize = conf.arrow.maxSize * this.scale;
      }
    }

    this._config = t;

    // Scaling new canvas.
    this.target.width = this.source.width * this.scale;
    this.target.height = this.source.height * this.scale;

    return this;
  },
  setExtension(e) {
    this.extension = e;

    return this;
  },
  setName(n) {
    this.name = n;

    return this;
  },
  setQuality(q) {
    this.quality = q;

    return this;
  },
  setResolution(w, h) {
    this.target.width = w;
    this.target.height = h;

    return this;
  },
  export() {
    // Find all nodes and edges
    let temp = this.instance.findArea(1, 1, 0, 0, true, true);

    // Clean up nodes and edges
    let nodes = this._setNodes(temp.nodes);
    let edges = this._setEdges(temp.edges);

    // Create new ccNetViz graph
    let canvas = document.createElement('canvas');
    canvas.width = this.target.width;
    canvas.height = this.target.height;
    canvas.style.visibility = 'hidden';

    document.body.appendChild(canvas);

    let g = new ccNetViz(canvas, this._config || this.config);

    g.set(nodes, edges).then(() => {
      g.draw();

      // TODO: Remove random delay and waiting for node-arrow plugin textures
      setTimeout(() => {
        canvas.getContext('webgl', { preserveDrawingBuffer: true });

        // Converting canvas to blob image
        canvas.toBlob(
          blob => {
            // Creating temp anchor
            var url = URL.createObjectURL(blob);

            var a = document.createElement('a');
            a.href = url;
            a.download = `${this.name}.${this.extension}`;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.remove();
          },
          `image/${this.extension}`,
          this.quality
        );

        g.remove();
        canvas.remove();
      }, 500);
    });
  },
  _setNodes(n) {
    this.nodes = Object.assign({}, n);
    let nodes = [];

    // Remove unnecessary keys
    for (let k in this.nodes) {
      this.nodes[k] = this.nodes[k].node;
      delete this.nodes[k].index;
      delete this.nodes[k].uniqid;
      delete this.nodes[k].weight;
      delete this.nodes[k].sI;
      delete this.nodes[k].px;
      delete this.nodes[k].py;

      nodes.push(this.nodes[k]);
    }

    return nodes;
  },
  _setEdges(e) {
    this.edges = Object.assign({}, e);
    let edges = [];

    // Remove unnecessary keys
    for (let k in this.edges) {
      this.edges[k] = this.edges[k].edge;

      delete this.edges[k].nidx;
      delete this.edges[k].sI;
      delete this.edges[k].t;
      delete this.edges[k].uniqid;

      edges.push(this.edges[k]);
    }

    return edges;
  },
  nodes: [],
  edges: [],
  config: {},
  extension: 'jpeg',
  quality: 1,
  scale: 1,
  name: 'ccnetviz-graph',
  source: {
    width: 0,
    height: 0,
  },
  target: {
    width: 0,
    height: 0,
  },
  instance: () => { },
};

if (typeof ccNetViz === 'undefined') {
  console.warn('ccNetViz export image plugin could not be implemented.');
} else {
  if (typeof ccNetViz.plugin === 'undefined') ccNetViz.plugin = {};
  ccNetViz.plugin.imageExport = ccNetVizImageExport;
}

export default { ccNetVizImageExport };
