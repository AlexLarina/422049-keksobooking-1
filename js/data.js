'use strict';

(function () {
  var AdParams = {
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPE: ['flat', 'house', 'bungalo'],
    CHECK_IN_OUT_TIME: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    X_MIN: 300,
    X_MAX: 900,
    Y_MIN: 100,
    Y_MAX: 500,
    PRICE_MIN: 1000,
    PRICE_MAX: 1000000,
    ROOMS_MIN: 1,
    ROOMS_MAX: 5,
    GUESTS_MIN: 1,
    GUESTS_MAX: 20
  };

  var createAd = function (index) {
    var xCoord = window.utils.getRandFromRange(AdParams.X_MIN, AdParams.X_MAX);
    var yCoord = window.utils.getRandFromRange(AdParams.Y_MIN, AdParams.Y_MAX);
    return {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      offer: {
        title: AdParams.TITLES[index],
        adress: xCoord + ', ' + yCoord,
        price: window.utils.getRandFromRange(AdParams.PRICE_MIN, AdParams.PRICE_MAX),
        type: AdParams.TYPE[window.utils.getRandFromRange(0, AdParams.TYPE.length)],
        rooms: window.utils.getRandFromRange(AdParams.ROOMS_MIN, AdParams.ROOMS_MAX),
        guests: window.utils.getRandFromRange(AdParams.GUESTS_MIN, AdParams.GUESTS_MAX),
        checkin: AdParams.CHECK_IN_OUT_TIME[window.utils.getRandFromRange(0, AdParams.CHECK_IN_OUT_TIME.length - 1)],
        checkout: AdParams.CHECK_IN_OUT_TIME[window.utils.getRandFromRange(0, AdParams.CHECK_IN_OUT_TIME.length - 1)],
        features: window.utils.chooseUniqueFromArray(window.utils.getRandFromRange(0, AdParams.FEATURES.length), AdParams.FEATURES, true),
        description: '',
        photos: []
      },
      location: {
        x: xCoord,
        y: yCoord
      }
    };
  };

  window.data = {
    AdParams: AdParams,
    createAd: createAd
  };
})();
