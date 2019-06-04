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
      let inset = this.config.inset || 2;
      let radius = this.config.size / 2;

      for (var i = 1; i <= spikes * 2; i++) {
        let x, y;
        let theta = i * (Math.PI * 2) / (spikes * 2);
        let center = radius + this.config.stroke.size;

        if (i % 2 == 0) {
          x = center + (radius * Math.cos(theta));
          y = center + (radius * Math.sin(theta));
        } else {
          x = center + ((radius / inset) * Math.cos(theta));
          y = center + ((radius / inset) * Math.sin(theta));
        }

        this.context.lineTo(x, y);
      }

      this.context.closePath();
      this.context.stroke();
      this.context.fill();
    }
  }
  return new Star(config, instance)
}

export default Star