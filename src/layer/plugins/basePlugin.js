class BasePlugin {
  constructor(options) {
    this.options = options;

    this.scene = {
      elements: [],
      add: (key, el) => {
        this.scene[key] = el;
        this.scene.elements.push(el);
      },
    };

    ['draw'].forEach(func => {
      this[func] = (...args) => {
        this.scene.elements.forEach(el => {
          el[func](...args);
        });
      };
    });
  }
}

export default BasePlugin;
