import Shape from "../shape"

let Star = (config, instance) => {
  class Star extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Star';
    }
    _draw() {
      this.context.beginPath();
      let spikes = this.config.spikes || 5;
      let radius = this.config.size / 2;

      for (var i = 1; i <= spikes * 2; i++) {
        let x, y;
        let theta = i * (Math.PI * 2) / (spikes * 2);

        if (i % 2 == 0) {
          x = radius + this.config.stroke.size + (radius * Math.cos(theta));
          y = radius + this.config.stroke.size + (radius * Math.sin(theta));
        } else {
          x = radius + this.config.stroke.size + ((radius / 2) * Math.cos(theta));
          y = radius + this.config.stroke.size + ((radius / 2) * Math.sin(theta));
        }

        this.context.lineTo(x, y);
      }

      super._draw();
    }
  }
  return new Star(config, instance)
}

export default Star