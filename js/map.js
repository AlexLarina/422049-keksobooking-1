'use strict';

(function () {
  var AD_NUMBER = 8;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_HEIGT = 44;
  var MAIN_PIN_WIDTH = 40;

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
    window.form.formActivate();
    mainPin.removeEventListener('mouseup', mouseMainPinHandler);
  };

  var keyMainPinHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapActivate();
      window.form.formActivate();
    }
  };

  var advertismentArray = createAdArray(AD_NUMBER);

  mainPin.addEventListener('mouseup', mouseMainPinHandler);
  mainPin.addEventListener('keydown', keyMainPinHandler);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX + MAIN_PIN_WIDTH / 2,
      y: evt.clientY + MAIN_PIN_HEIGT
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (currentCoords.y < 100) {
        currentCoords.y = 100;
      } else if (currentCoords.y > 500) {
        currentCoords.y = 500;
      }

      if (currentCoords.x < MAIN_PIN_WIDTH / 2) {
        currentCoords.x = MAIN_PIN_WIDTH / 2;
      } else if (currentCoords.x > (userDialog.offsetWidth - MAIN_PIN_WIDTH / 2)) {
        currentCoords.x = userDialog.offsetWidth - MAIN_PIN_WIDTH / 2;
      }

      console.log('width = ' + userDialog.offsetWidth);
      mainPin.style.top = currentCoords.y + 'px';
      mainPin.style.left = currentCoords.x + 'px';

      window.form.initialAdress.value = currentCoords.x + ', ' + currentCoords.y;
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
