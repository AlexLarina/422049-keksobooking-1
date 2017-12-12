'use strict';

(function () {
  var AD_NUMBER = 8;
  var ENTER_KEYCODE = 13;

  var userDialog = document.querySelector('.map');
  var mapPinsListElement = userDialog.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var createAdArray = function (adNumber) {
    var adArray = [];
    for (var i = 0; i < adNumber; i++) {
      adArray[i] = window.createAd(i);
    }
    return adArray;
  };

  var createFragment = function (render, adArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < AD_NUMBER; i++) {
      fragment.appendChild(render(adArray[i]));
    }
    return fragment;
  };

  var mapActivate = function () {
    userDialog.classList.remove('map--faded');
    mapPinsListElement.appendChild(createFragment(window.pin.render, advertismentArray));
  };

  var mouseMainPinHandler = function () {
    mapActivate();
    window.formActivate();
    mainPin.removeEventListener('mouseup', mouseMainPinHandler);
  };

  var keyMainPinHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapActivate();
      window.formActivate();
    }
  };

  var advertismentArray = createAdArray(AD_NUMBER);

  mainPin.addEventListener('mouseup', mouseMainPinHandler);
  mainPin.addEventListener('keydown', keyMainPinHandler);

})();
