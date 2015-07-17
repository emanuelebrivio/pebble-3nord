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
    url: 'https://raw.githubusercontent.com/sabas/trenitalia/master/stazioni.tsv',
    type: 'text',
    method: 'get',
    crossOrigin: true,
    error: function (err) { },
    success: function (resp) {
      
      stations = resp.response.split('\n');
      stations = _.map(stations, function (s) {
        return {
          nome: s.split('\t')[0],
          id: s.split('\t')[1]
        };
      });
      console.log(stations);
      
      /*
      stations = _.map(resp.features, function (s) {
        return {
          nome: s.properties.name,
          id_reg: s.properties.id_reg,
          id_staz: s.properties.id_staz,
          coords: s.geometry.coordinates,
        };
      });
      */
      
      awesompleteFirst.list = awesompleteLast.list = _.pluck(stations, 'nome');
      
    }
  });
  
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    var first = _.filter(stations, { 'nome': firstInput.value })[0];
    var last = _.filter(stations, { 'nome': lastInput.value })[0];
    
    document.getElementById('message').textContent = '';
    
    if (first && last) {
      // Everything is ok!
      
      console.log(first);
      
      reqwest({
        //url: 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/dettaglioStazione/' + first.id + '/1',
        url: 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/regione/' + first.id,
        type: 'text',
        method: 'get',
        crossOrigin: true,
        success: function (resp) {
          console.log('RESPONSE', resp);
        }
      });
      
      // http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/dettaglioStazione/S09218/0
      
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
      setTimeout(function () {
        document.getElementById('message').textContent = '';
      }, 3500);
      return false;
    }
    
  });

})();