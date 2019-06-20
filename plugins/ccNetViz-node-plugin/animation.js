class Animation {
  constructor() {
    this.config = {
      fps: 10,
      duration: 2000,
      frame: 0,
      frameCount: 0,
      scene: 0
    };
    this.listener = {};
    this.status = true;
    this.frameBatch = [];

    this.config.frameCount = this.config.fps * (this.config.duration / 1000);
  }

  addListener(type) {
    this.listener[type] = true;
  }

  async draw(instance, frame) {
    this.frameBatch.push(frame);
    if (typeof this.instance === "undefined") {
      this.instance = instance;
    }
    if (this.frameBatch.length >= Object.keys(this.listener).length) {
      await this.fps();
      if (this.frameBatch.length) {
        this.instance.reflow();
        if (frame > this.config.frameCount) {
          this.status = false;
        }
        this.config.scene = frame % this.config.frameCount;
        this.frameBatch.length = 0;
      }
    }
  }

  fps() {
    return new Promise(resolve => setTimeout(resolve, 1000 / this.config.fps));
  }
}

let animation = new Animation();

export default animation;