import Shape from '../../shape';

let RadialHistogram = (config, instance, t) => {
  class RadialHistogram extends Shape {
    constructor(config, instance, t) {
      super(config, instance, t);
      this.type = 'RadialHistogram';
    }
    _draw() {
      let histograms = this.config.chart;
      let degree = 360 / histograms.length;
      let radius = this.config.size / 2;
      let center = radius + this.config.stroke.size;

      // Drawing histograms
      for (let i = 0; i < histograms.length; i++) {
        let item = histograms[i];

        let theta = degree * (i + 1) * (Math.PI / 180);
        let x =
          center +
          (item.ratio * (radius / 2 / 100) + radius / 2) * Math.cos(theta);
        let y =
          center +
          (item.ratio * (radius / 2 / 100) + radius / 2) * Math.sin(theta);

        let theta2 =
          (degree * (i + 1) +
            (100 / histograms.length > 20 ? 20 : 100 / histograms.length)) *
          (Math.PI / 180);
        let x1 =
          center +
          (item.ratio * (radius / 2 / 100) + radius / 2) * Math.cos(theta2);
        let y1 =
          center +
          (item.ratio * (radius / 2 / 100) + radius / 2) * Math.sin(theta2);

        this.context.beginPath();
        this.context.moveTo(center, center);
        this.context.lineTo(x, y);
        this.context.lineTo(x1, y1);
        this.context.lineTo(x1, y1);
        this.context.fillStyle = item.color || '#000000';
        this.context.strokeStyle = item.color || '#000000';
        this.context.lineWidth = 2;
        this.context.lineJoin = 'round';
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
      }

      // Drawing node
      this.context.beginPath();
      this.context.strokeStyle = this.config.stroke.color;
      this.context.lineWidth = this.config.stroke.size;
      this.context.fillStyle = this.config.textureColor;
      this.context.arc(center, center, radius / 2, 0, 2 * Math.PI, false);
      this.context.stroke();
      this.context.fill();
    }
  }
  return new RadialHistogram(config, instance, t);
};

export default RadialHistogram;
