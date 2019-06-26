import Shape from '../../shape';

let GaugeChart = (config, instance, t) => {
  class GaugeChart extends Shape {
    constructor(config, instance, t) {
      super(config, instance, t);
      this.type = 'GaugeChart';
    }
    colorGradient(s, e, c) {
      let start = s;
      let end = e;
      let alpha = 0.0;
      let colors = [];

      const len = c;

      for (let i = 0; i < len + 1; i++) {
        let c = [];
        alpha += 1.0 / len;

        c[0] = start[0] * alpha + (1 - alpha) * end[0];
        c[1] = start[1] * alpha + (1 - alpha) * end[1];
        c[2] = start[2] * alpha + (1 - alpha) * end[2];

        colors[i] = `rgb(${Math.abs(Math.floor(c[0]))},${Math.abs(
          Math.floor(c[1])
        )},${Math.abs(Math.floor(c[2]))})`;
      }
      return colors;
    }
    _draw() {
      let colorSet = [[0, 128, 0], [255, 255, 0], [255, 0, 0]];
      if (typeof this.config.colorSet !== 'undefined')
        colorSet = this.config.colorSet;

      let colors = this.colorGradient(colorSet[1], colorSet[2], 15).concat(
        this.colorGradient(colorSet[0], colorSet[1], 15)
      );
      let radius = this.config.size / 2;
      let center = radius + this.config.stroke.size;
      let cursor = { end: 0, start: Math.PI };

      // Gauge background
      this.context.arc(center, center, radius, 0, 2 * Math.PI, false);
      this.context.stroke();
      this.context.fill();

      // Gauge texture
      for (let i = 1; i <= colors.length; i++) {
        let item = colors[i - 1];
        let ratio = Math.PI / 2;
        let angle = ((2 * ratio) / 100) * Math.PI;

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
        this.context.fillStyle = item;
        this.context.fill();
        cursor.start += angle;
      }

      // Gauge arrow
      let arrows = this.config.chart;
      for (let i = 1; i <= arrows.length; i++) {
        let item = this.config.chart[i - 1];
        let cursorGauge = { end: 0, start: 0 };

        item.ratio = item.ratio % 100;
        cursorGauge.end = (10 + ((item.ratio + 2) * 10) / 100) / Math.PI;
        cursorGauge.start = (10 + ((item.ratio - 2) * 10) / 100) / Math.PI;

        this.context.beginPath();
        this.context.moveTo(center, center);
        this.context.arc(
          center,
          center,
          radius,
          cursorGauge.start,
          cursorGauge.end,
          false
        );
        this.context.fillStyle = item.color || '#000000';

        if (arrows.length <= 1) {
          this.context.font = `bold ${(center * 60) / 100}px arial`;
          this.context.textAlign = 'center';
          this.context.fillText(
            `${item.ratio}%`,
            center,
            center * 2 - center / 3
          );
        }

        this.context.fill();
      }
    }
  }
  return new GaugeChart(config, instance, t);
};

export default GaugeChart;
