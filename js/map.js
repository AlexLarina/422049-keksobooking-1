'use strict';

var AD_NUMBER = 8;
var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var APARTMENT_TYPE = ['flat', 'house', 'bungalo'];
var CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');

function getRandFromRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// надо обдумать, как переделать функцию, т.к. в нынешней реализации фичи могут повторяться
function chooseFeatures(featuresNumber) {
  var featuresArray = [];
  for (var i = 0; i < featuresNumber; i++) {
    var j = getRandFromRange(0, APARTMENT_FEATURES.length);
    featuresArray[i] = APARTMENT_FEATURES[j];
  }
  return featuresArray;
}

function createAd(index) {
  var XCoord = getRandFromRange(300, 900);
  var YCoord = getRandFromRange(100, 500);
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: AD_TITLES[index],
      adress: XCoord + ', ' + YCoord,
      price: getRandFromRange(1000, 1000000),
      type: APARTMENT_TYPE[1],
      rooms: getRandFromRange(1, 5),
      guests: getRandFromRange(1, 20),
      checkin: CHECK_IN_OUT_TIME[getRandFromRange(0, CHECK_IN_OUT_TIME.length - 1)],
      checkout: CHECK_IN_OUT_TIME[getRandFromRange(0, CHECK_IN_OUT_TIME.length - 1)],
      features: chooseFeatures(getRandFromRange(0, APARTMENT_FEATURES.length)),
      description: '',
      photos: []
    },
    location: {
      x: XCoord,
      y: YCoord
    }
  };
}

function createAdArray(adNumber) {
  var adArray = [];
  for (var i = 0; i < adNumber; i++) {
    adArray[i] = createAd(i);
  }
  return adArray;
}

var renderPin = function (ad) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.setAttribute('style', 'left: ' + ad.location.x + 'px; ' + 'top: ' + ad.location.y + 'px; ');
  mapPinElement.querySelector('.map__pin img').setAttribute('src', ad.author.avatar);

  return mapPinElement;
};

var renderCard = function (ad) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('.popup__avatar').setAttribute('src', '' + ad.author.avatar + '');

  mapCardElement.querySelector('h3').textContent = ad.offer.title;
  mapCardElement.querySelector('small').textContent = ad.offer.adress;
  mapCardElement.querySelector('.popup__price').textContent = ad.offer.price + '\t\u20BD/ночь';
  mapCardElement.querySelector('h4').textContent = ad.offer.type;
  mapCardElement.querySelector('h4 + p').textContent = ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';

  // Так и не поняла, в чем проблема с nth-child, документацию прочла.
  // В консоль выводится именно этот p
  mapCardElement.querySelector('p:nth-child(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  console.log(mapCardElement.querySelector('p:nth-child(4)').textContent);

  // не знаю, как сделать вывод в элементы списка
  // mapCardElement.querySelector('popup__features').innerHTML = ad.offer.features;

  mapCardElement.querySelector('.popup__features + p').textContent = ad.offer.description;
  return mapCardElement;
};

function createFragment(render, adArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AD_NUMBER; i++) {
    fragment.appendChild(render(adArray[i]));
  }
  return fragment;
}
var userDialog = document.querySelector('.map');

var mapPinsListElement = userDialog.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var map = userDialog.querySelector('.map');
// var mapCardsListElement = map.insertBefore(createFragment(renderCard, advertismentArray), userDialog.querySelector('.map__filters-container'));
// var mapCardElement = userDialog.querySelector('.map__filters-container');

var advertismentArray = createAdArray(AD_NUMBER);

mapPinsListElement.appendChild(createFragment(renderPin, advertismentArray));
// mapCardElement.appendChild(createFragment(renderCard, advertismentArray));

// прочитала документацию insertBefore, но не понимаю, как конкретно здесь это работает
// userDialog.querySelector('.map__filters-container') - это элемент перед которым хотим вставить
// createFragment(renderCard, advertismentArray) - этот тот article, который хотим вставить
// map - родитель обоих элементов
map.insertBefore(createFragment(renderCard, advertismentArray), userDialog.querySelector('.map__filters-container'));
userDialog.classList.remove('map--faded');
