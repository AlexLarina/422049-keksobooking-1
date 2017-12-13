'use strict';

(function () {
  var AD_NUMBER = 8;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 90;

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

  var getMainPinCoords = function () {
    // console.log(mainPin.offsetLeft, mainPin.offsetLeft);
    return {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop + MAIN_PIN_HEIGHT / 2
    };
  };

  var mapActivate = function () {
    var adress = getMainPinCoords();

    window.form.fillFormAdress(adress.x, adress.y);
    userDialog.classList.remove('map--faded');
    mapPinsListElement.appendChild(createFragment(window.pin.render, advertismentArray));
  };

  var mouseMainPinHandler = function () {
    mapActivate();
    window.form.activate();
    mainPin.removeEventListener('mouseup', mouseMainPinHandler);
  };

  var keyMainPinHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapActivate();
      window.form.activate();
    }
  };

  var advertismentArray = createAdArray(AD_NUMBER);

  mainPin.addEventListener('mouseup', mouseMainPinHandler);
  mainPin.addEventListener('keydown', keyMainPinHandler);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX + MAIN_PIN_WIDTH / 2,
      y: evt.clientY + MAIN_PIN_HEIGHT
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
        currentCoords.y = 100 - MAIN_PIN_HEIGHT / 2;
      }
      if (currentCoords.y > (500 - MAIN_PIN_HEIGHT / 2)) {
        currentCoords.y = 500 - MAIN_PIN_HEIGHT / 2;
      }

      if (currentCoords.x < MAIN_PIN_WIDTH / 2) {
        currentCoords.x = MAIN_PIN_WIDTH / 2;
      }
      if (currentCoords.x > (userDialog.offsetWidth - MAIN_PIN_WIDTH / 2)) {
        currentCoords.x = userDialog.offsetWidth - MAIN_PIN_WIDTH / 2;
      }

      // console.log('width = ' + userDialog.offsetWidth);
      mainPin.style.top = currentCoords.y + 'px';
      mainPin.style.left = currentCoords.x + 'px';

      window.form.fillFormAdress();
      // window.form.initialAdress.value = currentCoords.x + ', ' + (currentCoords.y + MAIN_PIN_HEIGHT / 2);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.getMainPinCoords = getMainPinCoords;

})();
