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
    this.temp = {};
    for (let key in this.config) {
      switch (Object.keys(this.config[key])[0]) {
        case "circle":
          let circle = new Circle(this.canvas, this.config[key].circle);

          async function circleBlob(temp) {
            let blob = await circle.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          circleBlob(this.temp);
          break;
        case "ellipse":
          let ellipse = new Ellipse(this.canvas, this.config[key].ellipse);

          async function ellipseBlob(temp) {
            let blob = await ellipse.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          ellipseBlob(this.temp);
          break;
        case "triangle":
          let triangle = new Triangle(this.canvas, this.config[key].triangle);

          async function triangleBlob(temp) {
            let blob = await triangle.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          triangleBlob(this.temp);
          break;
        case "rectangle":
          let rectangle = new Rectangle(this.canvas, this.config[key].rectangle);

          async function rectangleBlob(temp) {
            let blob = await rectangle.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          rectangleBlob(this.temp);
          break;
        case "rhombus":
          let rhombus = new Rhombus(this.canvas, this.config[key].rhombus);

          async function rhombusBlob(temp) {
            let blob = await rhombus.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          rhombusBlob(this.temp);
          break;
        case "pentagon":
          let pentagon = new Pentagon(this.canvas, this.config[key].pentagon);

          async function pentagonBlob(temp) {
            let blob = await pentagon.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          pentagonBlob(this.temp);
          break;
        case "hexagon":
          let hexagon = new Hexagon(this.canvas, this.config[key].hexagon);

          async function hexagonBlob(temp) {
            let blob = await hexagon.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          hexagonBlob(this.temp);
          break;
        case "heptagon":
          let heptagon = new Heptagon(this.canvas, this.config[key].heptagon);

          async function heptagonBlob(temp) {
            let blob = await heptagon.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          heptagonBlob(this.temp);
          break;
        case "star":
          let star = new Star(this.canvas, this.config[key].star);

          async function starBlob(temp) {
            let blob = await star.toBlob;
            temp[key] = { "texture": URL.createObjectURL(blob) };
          }

          starBlob(this.temp);
          break;
        default:
          // TODO : Throw error and shapes link
          break;
      }
    }
    return this.temp
  }
}

window.Plugin = Plugin;