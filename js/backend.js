'use strict';

(function () {
  var DATA_URL = 'https://1510.dump.academy/keksobooking';
  var setupRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setupRequest(onLoad, onError);
    xhr.open('GET', DATA_URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = setupRequest(onLoad, onError);
    xhr.open('POST', DATA_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
