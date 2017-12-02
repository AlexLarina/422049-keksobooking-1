'use strict';

var AD_NUMBER = 8;
var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var APARTMENT_TYPE = ['flat', 'house', 'bungalo'];
var CHECK_IN_OUT_TIME = ['12:00', '13:00', '14:00'];
var APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function createAuthor(imageIndex) {
  return {
    avatar: 'img/avatars/user0' + imageIndex + '.png'
  };
}

function getRandFromRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createFeatures(featuresNumber) {
  var featuresArray = [];
  for (var i = 0; i < featuresNumber; i++) {
    featuresArray[i] = APARTMENT_FEATURES[i];
  }
  return featuresArray;
}

function createOffer(index) {
  return {
    title: AD_TITLES[index],
    adress: createLocation().x + ', ' + createLocation().y,
    price: getRandFromRange(1000, 1000000),
    type: APARTMENT_TYPE[1],
    rooms: getRandFromRange(1, 5),
    guests: getRandFromRange(1, 20),
    checkin: CHECK_IN_OUT_TIME[2],
    checkout: CHECK_IN_OUT_TIME[0],
    features: createFeatures(getRandFromRange(0, APARTMENT_FEATURES.length)),
    description: '',
    photos: []
  };
}

function createLocation() {
  return {
    x: getRandFromRange(300, 900),
    y: getRandFromRange(100, 500)
  };
}

function createAd(index) {
  return {
    author: createAuthor(index),
    offer: createOffer(index - 1),
    location: createLocation()
  };
}

function createAdArray(adNumber) {
  var adArray = [];
  for (var i = 1; i <= adNumber; i++) {
    adArray[i - 1] = createAd(i);
  }
  return adArray;
}

var renderPin = function (ad) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.setAttribute('style', 'left: ' + ad.location.x + 'px; ' + 'top: ' + ad.location.y + 'px; ');
  // mapPinElement.setAttribute('style', 'left: ' + ad.location.x + 'px');
  // mapPinElement.setAttribute('style', 'top: ' + ad.location.y + 'px');
  mapPinElement.children[0].setAttribute('src', '' + ad.author.avatar + '');
  // console.log(mapPinElement.children[0].attributes[1]);
  // mapPinElement.style.top = ad.location.y + 'px;';
  // mapPinElement.style.left = ad.location.x + 'px;';

  return mapPinElement;
};

var renderCard = function (ad) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('.popup__avatar').setAttribute('src', '' + ad.author.avatar + '');

  mapCardElement.querySelector('h3').textContent = ad.offer.title;
  mapCardElement.querySelector('small').textContent = ad.offer.adress;
  mapCardElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
  mapCardElement.querySelector('h4').textContent = ad.offer.type;
  // количество комнат для гостей похоже не работает
  mapCardElement.querySelectorAll('p:nth-child(3)').textContent = ad.offer.rooms + 'для' + ad.offer.guests + 'гостей';
  // тут тоже магия не сработала
  mapCardElement.querySelector('p:nth-child(4)').textContent = 'Заезд после' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  // не знаю, как сделать вывод в элементы списка
  // mapCardElement.querySelector('popup__features').innerHTML = ad.offer.features;
  // и это тоже не работает
  // mapCardElement.querySelector('p:last-child').textContent = ad.offer.description;
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
userDialog.classList.remove('map--faded');

var mapPinsListElement = userDialog.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var mapCardsListElement = userDialog.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');

var advertismentArray = createAdArray(AD_NUMBER);

mapPinsListElement.appendChild(createFragment(renderPin, advertismentArray));
mapCardsListElement.appendChild(createFragment(renderCard, advertismentArray));
