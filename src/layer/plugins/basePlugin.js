class BasePlugin {
  constructor(options) {
    this.options = options;

    this._registeredActions = [];

    this.scene = {
      elements: [],
      add: (key, el) => {
        this.scene[key] = el;
        this.scene.elements.push(el);
      },
    };
  }
  draw(...args) {
    this.scene.elements.forEach(el => {
      if (el.used) el.draw(...args);
    });
  }
  updateEl(key, n, i) {
    this._registeredActions.forEach(({ sceneKey, sourceKey }) => {
      if (sourceKey === key) this.scene[sceneKey].updateEl(gl, n, i);
    });
  }
  set(options) {
    const { gl, styles, drawEntities } = options;

    this._registeredActions = [];

    this.scene.elements.forEach(el => {
      el.used = false;
    });

    this.runRegistrations(options);

    let isDirty = false;

    this._registeredActions.forEach(
      ({ fun, sceneKey, sourceKey, adder, filler }) => {
        if (fun) {
          isDirty = isDirty || (fun() || false);
        } else {
          const data = drawEntities[sourceKey];
          const dataParts = drawEntities[`${sourceKey}Parts`];
          isDirty =
            isDirty ||
            this.scene[sceneKey].set(
              gl,
              styles,
              adder,
              data,
              dataParts,
              filler
            );
        }
      }
    );

    return isDirty;
  }
  register(sceneKey, sourceKey, adder, filler) {
    let fun;
    if (typeof sceneKey === 'function') {
      fun = sceneKey;
    } else {
      this.scene[sceneKey].used = true;
    }
    this._registeredActions.push({
      fun,
      sceneKey,
      sourceKey,
      adder,
      filler,
    });
  }
}

export default BasePlugin;
