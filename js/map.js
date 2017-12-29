'use strict';

(function () {
  var AD_NUMBER = 8;
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

  /* var createAdArray = function (adNumber) {
    var adArray = [];
    for (var i = 0; i < adNumber; i++) {
      adArray[i] = window.createAd(i);
    }
    return adArray;
  };*/

  var createFragment = function (render, adArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(AD_NUMBER, adArray.length); i++) {
      fragment.appendChild(render(adArray[i]));
    }
    return fragment;
  };

  var mapActivate = function (data) {
    userDialog.classList.remove('map--faded');
    ads = data.slice();
    mapPinsListElement.appendChild(createFragment(window.pin.render, ads));
    // console.log(ads);
    // mapPinsListElement.appendChild(createFragment(window.pin.render, advertismentArray));
  };
  var filtersContainer = document.querySelector('.map__filters');
  var mapUpdateAfterFilter = function () {
    var filteredAds = window.filtrate(ads);

    window.utils.removeNodes(mapPinsListElement);

    mapPinsListElement.appendChild(mainPin);
    mapPinsListElement.appendChild(createFragment(window.pin.render, filteredAds));
    console.log('works');
  };
  filtersContainer.addEventListener('change', mapUpdateAfterFilter, true);

  var mouseMainPinHandler = function () {
    // mapActivate();
    window.backend.load(mapActivate, errorHandler);
    window.form.activate();
    mainPin.removeEventListener('mouseup', mouseMainPinHandler);
  };

  var keyMainPinHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.backend.load(mapActivate, errorHandler);
      // mapActivate();
      window.form.activate();
    }
  };

  // var advertismentArray = createAdArray(AD_NUMBER);

  mainPin.addEventListener('mouseup', mouseMainPinHandler);
  mainPin.addEventListener('keydown', keyMainPinHandler);

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

  /* var successHandler = function () {
    mainPin.addEventListener('mouseup', mouseMainPinHandler);
    mainPin.addEventListener('keydown', keyMainPinHandler);
  };*/

  var errorHandler = function () {
    var errorPopup = window.utils.errorPopup();
    document.querySelector('body').appendChild(errorPopup);
  };

  // window.backend.load(successHandler, errorHandler);

})();
