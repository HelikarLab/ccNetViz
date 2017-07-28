/**
 *  Copyright (c) 2016, Helikar Lab.
 *  All rights reserved.
 *
 *  This source code is licensed under the GPLv3 License.
 *  Authors: David Tichy, Aleš Saska
 */

export default class Utils {
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
  
  static emptyObject(obj) {
    if(!Utils.isObject(obj))
      return false;

    for(var k in obj)
      return false;
    return true;
  }
  
  static ajax(url, callback, type){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = (function(cbk){
      return function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
          cbk(type == 'arraybuffer' ? xmlhttp.response : xmlhttp.responseText);
        }
      }
    })(callback);
    if(type) xmlhttp.responseType=type;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

};