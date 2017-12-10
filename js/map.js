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
var form = document.querySelector('.notice__form');
var formFieldset = form.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

// создание DOM-объъектов пинов и карточек объявлений
var getFeature = function (feature) {
  var liElem = document.createElement('li');
  liElem.classList.add('feature', 'feature--' + feature);

  return liElem;
};

var getRandFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var chooseFeatures = function (length, array, unique) {
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
};

var createAd = function (index) {
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
      features: chooseFeatures(getRandFromRange(0, AdParams.FEATURES.length), AdParams.FEATURES, true),
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

var deactivateForm = function () {
  form.classList.add('notice__form--disabled');
  formFieldset.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
};

// рендеринг

var renderPin = function (ad) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.setAttribute('style', 'left: ' + ad.location.x + 'px; ' + 'top: ' + ad.location.y + 'px; ');
  mapPinElement.querySelector('.map__pin img').setAttribute('src', ad.author.avatar);
  mapPinElement.dataset.cardId = parseInt(ad.author.avatar.split(/\D+/g)[1], 10);
  mapPinElement.addEventListener('click', function (evt) {
    pinClickHandler(evt, ad);
  });

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

  var popupClose = mapCardElement.querySelector('.popup__close');
  popupClose.addEventListener('click', mousePopupCloseHandler);
  popupClose.addEventListener('keydown', keyPopupInFocusCloseHandler);
  return mapCardElement;
};

// обработчики

var pinClickHandler = function (evt, ad) {
  deactivatePin(evt);
  var currentPin = evt.currentTarget;
  currentPin.classList.add('map__pin--active');
  userDialog.insertBefore(renderCard(ad), userDialog.querySelector('.map__filters-container'));
  // popupCloseHandler();
};

var popupCloseHandler = function () {
  var popup = document.querySelector('.popup');
  userDialog.removeChild(popup);
  // popup.remove();
};

var deactivatePin = function () {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};

var mapActivate = function () {
  userDialog.classList.remove('map--faded');
  mapPinsListElement.appendChild(createFragment(renderPin, advertismentArray));
};

var formActivate = function () {
  form.classList.remove('notice__form--disabled');
  formFieldset.forEach(function (item) {
    item.removeAttribute('disabled', 'disabled');
  });
};

var mouseMainPinHandler = function () {
  mapActivate();
  formActivate();
};

var keyMainPinHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    mapActivate();
    formActivate();
  }
};

var mousePopupCloseHandler = function () {
  popupCloseHandler();
  deactivatePin();
};

var keyPopupCloseHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    popupCloseHandler();
    deactivatePin();
  }
};

var keyPopupInFocusCloseHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    popupCloseHandler();
    deactivatePin();
  }
};

// вызовы
var advertismentArray = createAdArray(AD_NUMBER);
deactivateForm();
mainPin.addEventListener('mouseup', mouseMainPinHandler);
mainPin.addEventListener('keydown', keyMainPinHandler);
document.addEventListener('keydown', keyPopupCloseHandler);

// форма

var initialAdress = document.querySelector('#address');
initialAdress.value = '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3';
var timein = document.querySelector('select[name="timein"]');
var timeout = document.querySelector('select[name="timeout"]');
var apartmentType = document.querySelector('select[name="type"]');
var price = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');
var adTitle = document.querySelector('#title');

var BORDER_WRONG = 'border: 2px solid red;';
var offerTypesPrices = {
  'flat': 1000,
  'bungalo': 0,
  'house': 5000,
  'palace': 10000
};

var roomsForGuests = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

var timeHandler = function (evt, select) {
  select.value = evt.target.value;
};

// не уверена, что правильно сделала дефолтные значения
var apartmentTypeChangeHandler = function (evt) {
  price.placeholder = (offerTypesPrices['flat'] || offerTypesPrices['default']);
  price.min = offerTypesPrices[evt.target.value];
};

var roomsForGuestsHandler = function () {
  document.querySelectorAll('#capacity > option').forEach(function (item) {
    item.disabled = !roomsForGuests[roomNumber.value].includes(item);
  });
};

timein.addEventListener('change', function (evt) {
  timeHandler(evt, timeout);
});

timeout.addEventListener('change', function (evt) {
  timeHandler(evt, timein);
});

apartmentType.addEventListener('change', apartmentTypeChangeHandler);
roomNumber.addEventListener('change', roomsForGuestsHandler);

// валидация

// валидация заголовка

adTitle.addEventListener('invalid', function () {
  // adTitle.setAttribute('style', BORDER_WRONG);
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity('Имя должно состоять минимум из 30 символов');
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Обязательное поле');
  } else {
    adTitle.setCustomValidity('');
  }
});

// for Edge
adTitle.addEventListener('input', function (evt) {
  // adTitle.setAttribute('style', BORDER_WRONG);
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 30 символов');
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Обязательное поле');
  } else {
    adTitle.setCustomValidity('');
  }
});

// валидация цены
price.addEventListener('invalid', function () {
  // price.setAttribute('style', BORDER_WRONG);
  if (price.validity.rangeUnderflow) {
    // price.min не прокатил
    price.setCustomValidity('Цена меньше минимальной: ' + price.min);
  } else if (price.validity.rangeOverflow) {
    // как и price.max не прокатил
    price.setCustomValidity('Цена больше максимальной' + price.max);
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

price.addEventListener('invalid', function (evt) {
  // price.setAttribute('style', BORDER_WRONG);
  // pricePerNightInput.min = offerTypesPrices[evt.target.value];
  var target = evt.target;
  if (target.value < price.min) {
    target.setCustomValidity('Цена меньше минимальной: ');
  } else if (target.value > price.max) {
    price.setCustomValidity('Цена больше максимальной');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

form.addEventListener('invalid', function (evt) {
  var target = evt.target;
  target.setAttribute('style', BORDER_WRONG);
}, true);
