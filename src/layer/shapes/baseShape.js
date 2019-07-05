class BaseShape {
  constructor() {
    this._primitive = null;
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
