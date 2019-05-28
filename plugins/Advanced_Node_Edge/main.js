import { Circle, Ellipse, Triangle, Rectangle, Rhombus, Pentagon, Hexagon, Heptagon, Star } from "./shape.js"

export default class Plugin {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 0;
    this.canvas.height = 0;
    this.canvas.style.display = 'none';
  }

  set(config) {
    this.config = config;
    let temp = {};
    let promises = [];
    for (let key in this.config) {
      switch (Object.keys(this.config[key])[0]) {
        case "circle":
          let circle = new Circle(this.canvas, this.config[key].circle);
          promises.push({ name: key, promise: circle.toBlob, config: this.config[key].circle });
          break;
        case "ellipse":
          let ellipse = new Ellipse(this.canvas, this.config[key].ellipse);
          promises.push({ name: key, promise: ellipse.toBlob, config: this.config[key].ellipse });
          break;
        case "triangle":
          let triangle = new Triangle(this.canvas, this.config[key].triangle);
          promises.push({ name: key, promise: triangle.toBlob, config: this.config[key].triangle });
          break;
        case "rectangle":
          let rectangle = new Rectangle(this.canvas, this.config[key].rectangle);
          promises.push({ name: key, promise: rectangle.toBlob, config: this.config[key].rectangle });
          break;
        case "rhombus":
          let rhombus = new Rhombus(this.canvas, this.config[key].rhombus);
          promises.push({ name: key, promise: rhombus.toBlob, config: this.config[key].rhombus });
          break;
        case "pentagon":
          let pentagon = new Pentagon(this.canvas, this.config[key].pentagon);
          promises.push({ name: key, promise: pentagon.toBlob, config: this.config[key].pentagon });
          break;
        case "hexagon":
          let hexagon = new Hexagon(this.canvas, this.config[key].hexagon);
          promises.push({ name: key, promise: hexagon.toBlob, config: this.config[key].hexagon });
          break;
        case "heptagon":
          let heptagon = new Heptagon(this.canvas, this.config[key].heptagon);
          promises.push({ name: key, promise: heptagon.toBlob, config: this.config[key].heptagon });
          break;
        case "star":
          let star = new Star(this.canvas, this.config[key].star);
          promises.push({ name: key, promise: star.toBlob, config: this.config[key].star });
          break;
        default:
          // TODO : Throw error and shapes link
          break;
      }
    }

    Promise.all(promises.map(item => { return item.promise })).then(blobs => {
      blobs.map((item, index) => {
        temp[promises[index].name] = { "texture": URL.createObjectURL(item) };
      });
    });

    return { styles: temp };
  }
}

window.Plugin = Plugin;