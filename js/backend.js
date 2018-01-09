'use strict';

(function () {
  var DATA_URL = 'https://1510.dump.academy/keksobooking';
  var OK_STATUS = 200;

  var setupRequest = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        loadHandler(xhr.response);
      } else {
        errorHandler(xhr.response);
      }
    });
    return xhr;
  };

  var load = function (loadHandler, errorHandler) {
    var xhr = setupRequest(loadHandler, errorHandler);
    xhr.open('GET', DATA_URL + '/data');
    xhr.send();
  };

  var save = function (data, loadHandler, errorHandler) {
    var xhr = setupRequest(loadHandler, errorHandler);
    xhr.open('POST', DATA_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
