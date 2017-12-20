'use strict';

(function () {
  var BORDER_WRONG = 'border: 2px solid red;';

  var initialAdress = document.querySelector('#address');
  var form = document.querySelector('.notice__form');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var apartmentType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var adTitle = document.querySelector('#title');
  var capacity = document.querySelector('#capacity');
  var capacityItem = document.querySelectorAll('#capacity > option');
  var formFieldset = form.querySelectorAll('fieldset');

  var timeValues = ['12:00', '13:00', '14:00'];
  var offerTypes = ['flat', 'bungalo', 'house', 'palace'];
  var offerPrices = [1000, 0, 5000, 10000];
  var rooms = ['1', '2', '3', '100'];
  var guests = ['1', '2', '3', '0'];
  /* var offerTypesPrices = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };*/

  var roomsForGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var formActivate = function () {
    form.classList.remove('notice__form--disabled');
    formFieldset.forEach(function (item) {
      item.removeAttribute('disabled', 'disabled');
    });
  };

  var deactivateForm = function () {
    form.classList.add('notice__form--disabled');
    formFieldset.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  var fillAdress = function (x, y) {
    initialAdress.value = x + ', ' + y;
  };

  /* var timeHandler = function (evt, select) {
    select.value = evt.target.value;
  }; */

  // синхронизация
  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    if (element.placeholder) {
      element.placeholder = value;
    }
  };
  //
  /* var apartmentTypeChangeHandler = function (evt) {
    price.min = offerTypesPrices[evt.target.value];
  }; */

  var roomsForGuestsHandler = function () {
    capacityItem.forEach(function (item) {
      item.disabled = !roomsForGuests[roomNumber.value].includes(item.value);
      capacity.value = roomsForGuests[roomNumber.value][0];
    });
  };

  var errorHandler = function () {
    console.log('smth went wrong');
  };

  var successHandler = function () {
    // debugger;
    var successPopup = window.util.popup();
    document.querySelector('body').appendChild(successPopup);
    form.reset();
    console.log('all is well');
  };

  window.synchronizeFields(timein, timeout, timeValues, timeValues, syncValues);
  window.synchronizeFields(timeout, timein, timeValues, timeValues, syncValues);
  window.synchronizeFields(apartmentType, price, offerTypes, offerPrices, syncValueWithMin);
  window.synchronizeFields(roomNumber, capacity, rooms, guests, syncValues);

  adTitle.addEventListener('invalid', function () {
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

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  initialAdress.value = '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3';
  deactivateForm();
  roomsForGuestsHandler();

  window.form = {
    activate: formActivate,
    fillAdress: fillAdress
  };

})();
