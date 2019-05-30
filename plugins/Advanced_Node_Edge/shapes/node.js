import Circle from "./node/circle"
import Ellipse from "./node/ellipse"
import Triangle from "./node/triangle"
import Rectangle from "./node/rectangle"
import Rhombus from "./node/rhombus"
import Pentagon from "./node/pentagon"
import Hexagon from "./node/hexagon"
import Heptagon from "./node/heptagon"
import Star from "./node/star"

export default class Node {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
  }

  async generate() {
    let temp = {};
    let promises = [];

    for (let key in this.config) {
      let config = this.config[key];

      switch (Object.keys(config)[0]) {
        case "circle":
          let circle = new Circle(this.canvas, config.circle);
          promises.push({ name: key, promise: circle.toBlob, config: config.circle });
          break;
        case "ellipse":
          let ellipse = new Ellipse(this.canvas, config.ellipse);
          promises.push({ name: key, promise: ellipse.toBlob, config: config.ellipse });
          break;
        case "triangle":
          let triangle = new Triangle(this.canvas, config.triangle);
          promises.push({ name: key, promise: triangle.toBlob, config: config.triangle });
          break;
        case "rectangle":
          let rectangle = new Rectangle(this.canvas, config.rectangle);
          promises.push({ name: key, promise: rectangle.toBlob, config: config.rectangle });
          break;
        case "rhombus":
          let rhombus = new Rhombus(this.canvas, config.rhombus);
          promises.push({ name: key, promise: rhombus.toBlob, config: config.rhombus });
          break;
        case "pentagon":
          let pentagon = new Pentagon(this.canvas, config.pentagon);
          promises.push({ name: key, promise: pentagon.toBlob, config: config.pentagon });
          break;
        case "hexagon":
          let hexagon = new Hexagon(this.canvas, config.hexagon);
          promises.push({ name: key, promise: hexagon.toBlob, config: config.hexagon });
          break;
        case "heptagon":
          let heptagon = new Heptagon(this.canvas, config.heptagon);
          promises.push({ name: key, promise: heptagon.toBlob, config: config.heptagon });
          break;
        case "star":
          let star = new Star(this.canvas, config.star);
          promises.push({ name: key, promise: star.toBlob, config: config.star });
          break;
        default:
          // TODO : Throw error and shapes link
          break;
      }
    }

    await Promise.all(promises.map(item => { return item.promise })).then(blobs => {
      blobs.map((blob, index) => {
        let item = promises[index];

        temp[item.name] = {
          texture: URL.createObjectURL(blob),
          ...item.config
        };
      });
    });

    return temp;
  }
}