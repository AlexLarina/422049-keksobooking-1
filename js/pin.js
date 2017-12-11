'use strict';

(function () {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.setAttribute('style', 'left: ' + ad.location.x + 'px; ' + 'top: ' + ad.location.y + 'px; ');
    mapPinElement.querySelector('.map__pin img').setAttribute('src', ad.author.avatar);
    mapPinElement.addEventListener('click', function (evt) {
      pinClickHandler(evt, ad);
    });

    return mapPinElement;
  };

  var pinClickHandler = function (evt, ad) {
    deactivatePin(evt);
    var currentPin = evt.currentTarget;
    currentPin.classList.add('map__pin--active');
    window.insertCard(ad);
    // userDialog.insertBefore(window.card.renderCard(ad), userDialog.querySelector('.map__filters-container'));
    // popupCloseHandler();
  };

  var deactivatePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    renderPin: renderPin,
    deactivatePin: deactivatePin
  };
})();
