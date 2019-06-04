import Shape from "../shape"

let Square = (config, instance) => {
  class Square extends Shape {
    constructor(config, instance) {
      super(config, instance);
      this.type = 'Square';
    }

    _draw() {
      this.context.beginPath();
      this.context.lineTo(this.t(0), this.t(0));
      this.context.lineTo(this.t(1), this.t(0));
      this.context.lineTo(this.t(1), this.t(1));
      this.context.lineTo(this.t(0), this.t(1));
      this.context.closePath();
      this.context.stroke();
      this.context.fill();
    }
  }
  return new Square(config, instance)
}

export default Square