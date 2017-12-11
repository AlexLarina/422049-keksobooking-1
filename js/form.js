'use strict';

(function () {

  var initialAdress = document.querySelector('#address');
  initialAdress.value = '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3';
  var form = document.querySelector('.notice__form');
  var timein = document.querySelector('select[name="timein"]');
  var timeout = document.querySelector('select[name="timeout"]');
  var apartmentType = document.querySelector('select[name="type"]');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var adTitle = document.querySelector('#title');

  var BORDER_WRONG = 'border: 2px solid red;';
  var offerTypesPrices = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var roomsForGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var timeHandler = function (evt, select) {
    select.value = evt.target.value;
  };

  var apartmentTypeChangeHandler = function (evt) {
    price.placeholder = (offerTypesPrices['flat'] || offerTypesPrices['default']);
    price.min = offerTypesPrices[evt.target.value];
  };


  var roomsForGuestsHandler = function () {
    document.querySelectorAll('#capacity > option').forEach(function (item) {
      item.disabled = !roomsForGuests[roomNumber.value].includes(item.value);
      document.querySelector('#capacity').value = roomsForGuests[roomNumber.value][0];
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
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Цена меньше минимальной: ' + price.min);
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Цена больше максимальной: ' + price.max);
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

  roomsForGuestsHandler();

})();