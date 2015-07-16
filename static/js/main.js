/*jshint browser:true, indent:2, laxcomma:true, loopfunc: true */
/*global NodeList, HTMLCollection */

(function () {

  'use strict';
  
  var options = { color: 'white', border: true };
  
  document.getElementById('save').addEventListener('click', function (e) {
    e.preventDefault();
    
    document.location = 'https://cloudpebble.net/ide/emulator/config@#' + encodeURIComponent(JSON.stringify(options));
  });

})();