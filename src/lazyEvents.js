/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

export default class {
  constructor(){
    this._enable = true;
  }

  debounce(func, wait, immediate) {
      let timeout, args, context, timestamp, result;

      let later = () => {
          let last = Date.now - timestamp;

          if (last < wait && last > 0) {
              timeout = setTimeout(later, wait - last);
          } else {
              timeout = null;
              if (!immediate) {
                  if(this._enable){
                    result = func.apply(context, args);
                  }
                  if (!timeout) context = args = null;
              }
          }
      };

      return () => {
          context = this;
          args = arguments;
          timestamp = Date.now;
          let callNow = immediate && !timeout;
          if (!timeout) timeout = setTimeout(later, wait);
          if (callNow) {
              if(this._enable){
                result = func.apply(context, args);
              }
              context = args = null;
          }

          return result;
      };
  }
  
  disable(){
    this._enable = false;
  }
};