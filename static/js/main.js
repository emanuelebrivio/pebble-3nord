/*jshint browser:true, indent:2, laxcomma:true, loopfunc: true */
/*global NodeList, HTMLCollection */

(function () {

  'use strict';
  
  var options = { color: 'white', border: true };
  
  document.getElementById('save').addEventListener('click', function (e) {
    e.preventDefault();
    document.location = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(options));
  });

})();