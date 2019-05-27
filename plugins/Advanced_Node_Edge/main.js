import { Circle, Ellipse, Triangle, Rectangle, Rhombus, Pentagon, Hexagon, Heptagon, Star } from "./shape.js"

export default class Plugin {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 0;
    this.canvas.height = 0;
    //this.canvas.style.display = 'none';
  }

  circle(config) {
    const circle = new Circle(this.canvas, config);
  }

  ellipse(config) {
    const ellipse = new Ellipse(this.canvas, config);
  }

  triangle(config) {
    const triangle = new Triangle(this.canvas, config);
  }

  rectangle(config) {
    const rectangle = new Rectangle(this.canvas, config);
  }

  rhombus(config) {
    const rhombus = new Rhombus(this.canvas, config);
  }

  pentagon(config) {
    const pentagon = new Pentagon(this.canvas, config);
  }

  hexagon(config) {
    const hexagon = new Hexagon(this.canvas, config);
  }

  heptagon(config) {
    const heptagon = new Heptagon(this.canvas, config);
  }

  star(config) {
    const star = new Star(this.canvas, config);
  }
}

window.Plugin = Plugin;