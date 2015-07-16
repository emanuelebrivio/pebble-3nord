/*jshint browser:true, indent:2, laxcomma:true, loopfunc: true */
/*global NodeList, HTMLCollection */

(function () {

  'use strict';
  
  var options = { color: 'white', border: true };
  
  document.getElementById('save').addEventListener('click', function (e) {
    e.preventDefault();
    
    var returnto = window.location.href.split('return_to=')[1];
    
    document.location = returnto + '#' + encodeURIComponent(JSON.stringify(options));
  });

})();