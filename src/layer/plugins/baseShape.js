class BaseShape {
  constructor() {
    this._primitive = null;

    ['update', 'updateEl', 'draw'].forEach(k => {
      this[k] = (...args) => this.getPrimitive()[k](...args);
    });
  }
  set(...newargs) {
    //if(!args[5])  //filler
    newargs[5] = newargs[5] || this.filler;
    return this.getPrimitive().set(...newargs);
  }
  updateEl(...newargs) {
    //if(!args[3])  //filler
    newargs[3] = newargs[3] || this.filler;
    return this.getPrimitive().updateEl(...newargs);
  }
  getPrimitive() {
    return this._primitive;
  }
}

class BaseShapeManager {
  constructor() {
    this._filler = null;
  }

  getFiller() {
    return this._filler;
  }
}

export { BaseShape, BaseShapeManager };
