import Shape from '../../shape';

let DoughnutChart = (config, instance, t) => {
  class DoughnutChart extends Shape {
    constructor(config, instance, t) {
      super(config, instance, t);
      this.type = 'DoughnutChart';
    }
    _draw() {
      let charts = this.config.chart;
      let radius = this.config.size / 2;
      let center = radius + +this.config.stroke.size;
      let cursor = { end: 0, start: 0 };

      this.context.beginPath();
      this.context.arc(center, center, radius, 0, 2 * Math.PI, false);
      this.context.stroke();
      this.context.fill();

      for (var i = 1; i <= charts.length; i++) {
        let item = charts[i - 1];
        let angle = 2 * (item.ratio / 100) * Math.PI;

        cursor.end = angle;
        this.context.beginPath();
        this.context.moveTo(center, center);
        this.context.arc(
          center,
          center,
          radius - 1,
          cursor.start,
          cursor.end + cursor.start,
          false
        );
        this.context.fillStyle = item.color || '#000000';
        this.context.fill();
        cursor.start += angle;
      }

      this.context.beginPath();
      this.context.globalCompositeOperation = 'destination-out';
      this.context.arc(
        center,
        center,
        radius - (radius * 50) / 100,
        0,
        2 * Math.PI,
        false
      );
      this.context.fill();
      this.context.globalCompositeOperation = 'destination-over';
      this.context.fillStyle = this.config.textureColor;
      this.context.arc(center, center, radius, 0, 2 * Math.PI, false);
      this.context.fill();
    }
  }
  return new DoughnutChart(config, instance, t);
};

export default DoughnutChart;
