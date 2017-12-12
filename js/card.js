'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var userDialog = document.querySelector('.map');

  var ApartmentTypeParams = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
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
    document.addEventListener('keydown', keyPopupCloseHandler);
    popupClose.addEventListener('keydown', keyPopupInFocusCloseHandler);
    return mapCardElement;
  };

  var getFeature = function (feature) {
    var liElem = document.createElement('li');
    liElem.classList.add('feature', 'feature--' + feature);
    return liElem;
  };

  var insertCard = function (ad) {
    var card = renderCard(ad);
    userDialog.insertBefore(card, userDialog.querySelector('.map__filters-container'));
  };

  var popupCloseHandler = function () {
    var popup = document.querySelector('.popup');
    userDialog.removeChild(popup);
  };

  var mousePopupCloseHandler = function () {
    popupCloseHandler();
    window.pin.deactivate();
  };

  var keyPopupCloseHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popupCloseHandler();
      window.pin.deactivate();
    }
  };

  var keyPopupInFocusCloseHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popupCloseHandler();
      window.pin.deactivate();
    }

  };

  window.insertCard = insertCard;
})();
