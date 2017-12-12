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
    var currentPin = evt.currentTarget;
    if (currentPin.classList.contains('map__pin--active')) {
      evt.removeEventListener('click', pinClickHandler);
    }
    deactivatePin(evt);
    currentPin.classList.add('map__pin--active');
    window.insertCard(ad);
  };

  var deactivatePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    render: renderPin,
    deactivate: deactivatePin
  };
})();
