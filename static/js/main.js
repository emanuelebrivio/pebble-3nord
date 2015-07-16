/*jshint browser:true, indent:2, laxcomma:true, loopfunc: true, jquery: true */
/*global $, console */

(function () {

  'use strict';
  
  /*$('.retrieve-station').selectize({
    valueField: 'url',
    labelField: 'name',
    searchField: 'name',
    create: false,
    render: {
      option: function (item, escape) {
        return item;
      }
    },
    load: function (query, callback) {
      if (!query.length) {
        return callback();
      }
      $.ajax({
        url: 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/autocompletaStazione/' + encodeURIComponent(query),
        type: 'GET',
        crossDomain: true,
        error: function () {
          callback();
        },
        success: function (res) {
          console.log(res);
          callback(res);
        }
      });
    }
  });*/
  
  reqwest({
      url: 'http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/autocompletaStazione/MILANO'
    , method: 'get'
    , crossOrigin: true
    , error: function (err) { }
    , success: function (resp) {
        console.log(resp);
      }
  });

})();