import Circle from "./shapes/node/circle"
import Ellipse from "./shapes/node/ellipse"
import Triangle from "./shapes/node/triangle"
import Rectangle from "./shapes/node/rectangle"
import Rhombus from "./shapes/node/rhombus"
import Pentagon from "./shapes/node/pentagon"
import Hexagon from "./shapes/node/hexagon"
import Heptagon from "./shapes/node/heptagon"
import Star from "./shapes/node/star"

export default class AdvancedNodeEdge {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 0;
    this.canvas.height = 0;
    this.canvas.style.display = 'none';
  }

  createTexture(config) {
    this.config = config;
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

    Promise.all(promises.map(item => { return item.promise })).then(blobs => {
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

window.AdvancedNodeEdge = AdvancedNodeEdge;