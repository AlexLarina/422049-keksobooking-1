'use strict';

(function () {

  var AD_NUMBER = 8;
  var AdParams = {
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPE: ['flat', 'house', 'bungalo'],
    CHECK_IN_OUT_TIME: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };

  var userDialog = document.querySelector('.map');
  var mapPinsListElement = userDialog.querySelector('.map__pins');
  // var form = document.querySelector('.notice__form');
  // var formFieldset = form.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var ENTER_KEYCODE = 13;
  // var ESC_KEYCODE = 27;

  var createAd = function (index) {
    var xCoord = window.utils.getRandFromRange(300, 900);
    var yCoord = window.utils.getRandFromRange(100, 500);
    return {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      offer: {
        title: AdParams.TITLES[index],
        adress: xCoord + ', ' + yCoord,
        price: window.utils.getRandFromRange(1000, 1000000),
        type: AdParams.TYPE[window.utils.getRandFromRange(0, AdParams.TYPE.length)],
        rooms: window.utils.getRandFromRange(1, 5),
        guests: window.utils.getRandFromRange(1, 20),
        checkin: AdParams.CHECK_IN_OUT_TIME[window.utils.getRandFromRange(0, AdParams.CHECK_IN_OUT_TIME.length - 1)],
        checkout: AdParams.CHECK_IN_OUT_TIME[window.utils.getRandFromRange(0, AdParams.CHECK_IN_OUT_TIME.length - 1)],
        features: window.utils.chooseFeatures(window.utils.getRandFromRange(0, AdParams.FEATURES.length), AdParams.FEATURES, true),
        description: '',
        photos: []
      },
      location: {
        x: xCoord,
        y: yCoord
      }
    };
  };

  var createAdArray = function (adNumber) {
    var adArray = [];
    for (var i = 0; i < adNumber; i++) {
      adArray[i] = createAd(i);
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

  /* var insertCardNode = function (node) {
    userDialog.insertBefore(node, userDialog.querySelector('.map__filters-container'));
  }; */

  /* var deactivateForm = function () {
    form.classList.add('notice__form--disabled');
    formFieldset.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };*/

  var mapActivate = function () {
    userDialog.classList.remove('map--faded');
    mapPinsListElement.appendChild(createFragment(window.pin.render, advertismentArray));
  };

  /* var formActivate = function () {
    form.classList.remove('notice__form--disabled');
    formFieldset.forEach(function (item) {
      item.removeAttribute('disabled', 'disabled');
    });
  };*/

  var mouseMainPinHandler = function () {
    mapActivate();
    window.formActivate();
  };

  var keyMainPinHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mapActivate();
      window.formActivate();
    }
  };

  var advertismentArray = createAdArray(AD_NUMBER);
  // deactivateForm();
  mainPin.addEventListener('mouseup', mouseMainPinHandler);
  mainPin.addEventListener('keydown', keyMainPinHandler);

  // window.insertCardNode = insertCardNode;

})();
