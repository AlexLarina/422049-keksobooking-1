'use strict';

(function () {
  var AD_NUMBER = 5;
  var ENTER_KEYCODE = 13;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;

  var userDialog = document.querySelector('.map');
  var mapPinsListElement = userDialog.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var ads = [];

  var BoundaryCoords = {
    Y_MIN: 100,
    Y_MAX: 500
  };

  var createFragment = function (render, adsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(AD_NUMBER, adsArray.length); i++) {
      fragment.appendChild(render(adsArray[i]));
    }
    return fragment;
  };

  var mapActivate = function (data) {
    userDialog.classList.remove('map--faded');
    ads = data.slice();
    mapPinsListElement.appendChild(createFragment(window.pin.render, ads));
  };

  var mapUpdateAfterFilter = function () {
    var filteredAds = window.filtratePins(ads);

    window.utils.removeNodes(mapPinsListElement);
    window.card.removeCard();
    mapPinsListElement.appendChild(mainPin);
    mapPinsListElement.appendChild(createFragment(window.pin.render, filteredAds));
  };

  var mainPinClickHandler = function () {
    window.backend.load(mapActivate, errorHandler);
    window.form.activate();
    mainPin.removeEventListener('mouseup', mainPinClickHandler);
  };

  var mainPinPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.backend.load(mapActivate, errorHandler);
      window.form.activate();
    }
  };

  mainPin.addEventListener('mouseup', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinPressHandler);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
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

      var xCorrection = MAIN_PIN_WIDTH / 2;
      var yCorrection = MAIN_PIN_HEIGHT / 2;
      var borderTop = BoundaryCoords.Y_MIN - yCorrection;
      var borderBottom = BoundaryCoords.Y_MAX - yCorrection;
      var borderRight = userDialog.offsetWidth - xCorrection;

      if (currentCoords.y < borderTop) {
        currentCoords.y = borderTop;
      }
      if (currentCoords.y > borderBottom) {
        currentCoords.y = borderBottom;
      }

      if (currentCoords.x < xCorrection) {
        currentCoords.x = xCorrection;
      }
      if (currentCoords.x > borderRight) {
        currentCoords.x = borderRight;
      }

      mainPin.style.top = currentCoords.y + 'px';
      mainPin.style.left = currentCoords.x + 'px';

      window.form.fillAdress(currentCoords.x, (currentCoords.y + yCorrection));
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var errorHandler = function () {
    var errorPopup = window.utils.errorPopup();
    document.querySelector('body').appendChild(errorPopup);
  };

  window.mapUpdate = mapUpdateAfterFilter;
})();
