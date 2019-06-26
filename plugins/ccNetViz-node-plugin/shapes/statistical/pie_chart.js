import Shape from '../../shape';

let PieChart = (config, instance, t) => {
  class PieChart extends Shape {
    constructor(config, instance, t) {
      super(config, instance, t);
      this.type = 'PieChart';
    }
    _draw() {
      let spikes = this.config.chart.length || 5;
      let radius = this.config.size / 2;
      let center = radius + +this.config.stroke.size;
      let cursor = { end: 0, start: 0 };

      this.context.beginPath();
      this.context.arc(center, center, radius, 0, 2 * Math.PI, false);
      this.context.stroke();
      this.context.fill();

      for (var i = 1; i <= spikes; i++) {
        let item = this.config.chart[i - 1];
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
    }
  }
  return new PieChart(config, instance, t);
};

export default PieChart;
