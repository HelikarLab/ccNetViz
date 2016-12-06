import ccNetViz_utils from '../utils' ;
import ccNetViz_gl from '../gl' ;

/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

export default class {
  constructor(events, onLoad){
    this._load = [events.debounce(onLoad || (() => {}), 5)];
    this._files = {};
    this._pending = {};
    this._n = 0;
  }
  
  _transformFile(data, dataType) {
    if(dataType === 'json')
      return JSON.parse(data);
    return data;    
  }
  
  get(url) {
    return this._files[url];
  }

  /*
   * @param type {
   *   url: 'url of file',
   *   success: callback
   *   dataType "text" || "json"
   * }
   */
  load(url, action, dataType) {
    let p = this._pending[url];
    let f = this._files[url];

    if (p) {
        p.push(action);
    }
    else if (f) {
        action && action();
    }
    else {
      p = this._pending[url] = [action];
      this._n++;

      ccNetViz_utils.ajax(url, (data) => {
        this._files[url] = this._transformFile(data,dataType);
        p.forEach(a => a && a(this._files[url]));
        delete this._pending[url];
        --this._n || this._load.forEach(l => l());
      }, dataType=='arraybuffer'?dataType:undefined);
    }
    return f;
  }
  
  onLoad (action) {
    if(this.allLoaded())
      action();
    else
      this._load.push(action);
  }
  
  allLoaded(){
    return ccNetViz_utils.emptyObject(this._pending);
  }
  
}
