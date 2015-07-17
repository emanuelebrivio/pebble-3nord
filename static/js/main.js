/*jshint browser:true, indent:2, laxcomma:true, loopfunc: true, jquery: true */
/*global reqwest, console, Awesomplete, _ */

(function () {

  'use strict';
  var stations;
    
  var firstInput = document.querySelector('input[name="first"]');
  var awesompleteFirst = new Awesomplete(firstInput);
  var lastInput = document.querySelector('input[name="last"]');
  var awesompleteLast = new Awesomplete(lastInput);
  
  if (window.location.hash) {
    var json = JSON.parse(decodeURIComponent(window.location.hash.replace('#', '')));
    firstInput.value = json.firstStationName;
    lastInput.value = json.lastStationName;
  }
  
  reqwest({
    url: 'https://raw.githubusercontent.com/sabas/trenitalia/master/stazioni_coord.geojson',
    type: 'json',
    method: 'get',
    crossOrigin: true,
    error: function (err) { },
    success: function (resp) {
      
      stations = _.map(resp.features, function (s) {
        return {
          nome: s.properties.name,
          id_reg: s.properties.id_reg,
          id_staz: s.properties.id_staz,
          coords: s.geometry.coordinates,
        };
      });
      
      awesompleteFirst.list = awesompleteLast.list = _.pluck(stations, 'nome');
      
    }
  });
  
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    var first = _.find(stations, { nome: firstInput.value });
    var last = _.find(stations, { nome: lastInput.value });
    
    document.getElementById('message').textContent = '';
    
    if (first && last) {
      // Everything is ok!
      
      var options = {
        firstStationName: first.nome,
        firstStationCoords: first.coords,
        lastStationName: last.nome,
        lastStationCoords: last.coords,
      };
      
      document.location = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(options));
      
    } else {
      // You mess with the wrong guy
      document.getElementById('message').textContent = 'Verificare la correttezza dei campi inseriti';
      return false;
    }
    
  });

})();