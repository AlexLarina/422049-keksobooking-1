'use strict';

(function () {
  var AD_NUMBER = 8;
  var AdParams = {
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPE: ['flat', 'house', 'bungalo'],
    CHECK_IN_OUT_TIME: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
  };

  window.data = {
    AD_NUMBER: AD_NUMBER,
    AdParams: AdParams
  };
})();
