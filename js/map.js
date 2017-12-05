'use strict';

var AD_NUMBER = 8;
var AdParams = {
  TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  TYPE: ['flat', 'house', 'bungalo'],
  CHECK_IN_OUT_TIME: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};
var ApartmentTypeParams = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var userDialog = document.querySelector('.map');
var mapPinsListElement = userDialog.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

function getFeature(feature) {
  var liElem = document.createElement('li');
  liElem.classList.add('feature', 'feature--' + feature);

  return liElem;
}

function getRandFromRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function chooseFeatures(length, array, unique) {
  var newArr = [];

  while (newArr.length < length) {
    var elem = array[getRandFromRange(0, array.length - 1)];

    if (unique && newArr.indexOf(elem) !== -1) {
      continue;
    } else {
      newArr.push(elem);
    }
  }

  return newArr;
}

function createAd(index) {
  var xCoord = getRandFromRange(300, 900);
  var yCoord = getRandFromRange(100, 500);
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: AdParams.TITLES[index],
      adress: xCoord + ', ' + yCoord,
      price: getRandFromRange(1000, 1000000),
      type: AdParams.TYPE[getRandFromRange(0, AdParams.TYPE.length)],
      rooms: getRandFromRange(1, 5),
      guests: getRandFromRange(1, 20),
      checkin: AdParams.CHECK_IN_OUT_TIME[getRandFromRange(0, AdParams.CHECK_IN_OUT_TIME.length - 1)],
      checkout: AdParams.CHECK_IN_OUT_TIME[getRandFromRange(0, AdParams.CHECK_IN_OUT_TIME.length - 1)],
      features: chooseFeatures(2, AdParams.FEATURES, true),
      description: '',
      photos: []
    },
    location: {
      x: xCoord,
      y: yCoord
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
  mapCardElement.querySelector('h4').textContent = ApartmentTypeParams[ad.offer.type];
  mapCardElement.querySelector('h4 + p').textContent = ad.offer.rooms + ' комнат для ' + ad.offer.guests + ' гостей';
  mapCardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  var ulElem = mapCardElement.querySelector('.popup__features');
  ad.offer.features.forEach(function (feature) {
    ulElem.appendChild(getFeature(feature));
  });
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

var advertismentArray = createAdArray(AD_NUMBER);

mapPinsListElement.appendChild(createFragment(renderPin, advertismentArray));
userDialog.insertBefore(renderCard(advertismentArray[0]), userDialog.querySelector('.map__filters-container'));

userDialog.classList.remove('map--faded');
