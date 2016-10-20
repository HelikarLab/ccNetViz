/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

class Utils {
  static debounce(func, wait, immediate) {
      var timeout, args, context, timestamp, result;

      var later = () => {
          var last = Date.now - timestamp;

          if (last < wait && last > 0) {
              timeout = setTimeout(later, wait - last);
          } else {
              timeout = null;
              if (!immediate) {
                  result = func.apply(context, args);
                  if (!timeout) context = args = null;
              }
          }
      };

      return () => {
          context = this;
          args = arguments;
          timestamp = Date.now;
          var callNow = immediate && !timeout;
          if (!timeout) timeout = setTimeout(later, wait);
          if (callNow) {
              result = func.apply(context, args);
              context = args = null;
          }

          return result;
      };
  }

  static extend(from){
    for(var i = 1; i < arguments.length; i++){
      for(var k in arguments[i]){
	from[k] = arguments[i][k];
      }
    }
    return from;
  }
  
  static isObject (obj) {
    return obj === Object(obj);
  }
  
  static ajax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        callback(xmlhttp.responseText);
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

};


module.exports = Utils;