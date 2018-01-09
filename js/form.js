'use strict';

(function () {
  var BORDER_WRONG = 'border: 2px solid red;';
  var TIME_VALUES = ['12:00', '13:00', '14:00'];
  var OFFER_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var OFFER_PRICES = [1000, 0, 5000, 10000];
  var MAIN_PIN_HEIGHT = 84;

  var ROOMS_FOR_GUESTS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var initialAdress = document.querySelector('#address');
  var form = document.querySelector('.notice__form');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var apartmentType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var adTitle = document.querySelector('#title');
  var capacity = document.querySelector('#capacity');
  var capacityItems = document.querySelectorAll('#capacity > option');
  var formFieldsets = form.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.notice__form');
  var avatarPreview = noticeForm.querySelector('.notice__preview img');
  var photoPreview = noticeForm.querySelector('.form__photo-container');
  var mainPin = document.querySelector('.map__pin--main');

  var activateForm = function () {
    form.classList.remove('notice__form--disabled');
    formFieldsets.forEach(function (item) {
      item.removeAttribute('disabled', 'disabled');
    });
  };

  var deactivateForm = function () {
    form.classList.add('notice__form--disabled');
    formFieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  var deletePreviews = function () {
    var images = photoPreview.querySelectorAll('img');
    avatarPreview.src = 'img/muffin.png';
    images.forEach(function (image) {
      photoPreview.removeChild(image);
    });
  };

  var fillAdress = function (x, y) {
    initialAdress.value = x + ', ' + y;
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    if (element.placeholder) {
      element.placeholder = value;
    }
  };

  var roomsForGuestsHandler = function () {
    capacityItems.forEach(function (item) {
      item.disabled = !ROOMS_FOR_GUESTS[roomNumber.value].includes(item.value);
      capacity.value = ROOMS_FOR_GUESTS[roomNumber.value][0];
    });
  };

  var errorHandler = function () {
    var errorPopup = window.popup.createError();
    document.querySelector('body').appendChild(errorPopup);
  };

  var successHandler = function () {
    var successPopup = window.popup.createSuccess();
    document.querySelector('body').appendChild(successPopup);
    form.reset();
    var index = OFFER_TYPES.indexOf(apartmentType.value);
    syncValueWithMin(price, OFFER_PRICES[index]);
    deletePreviews();
    setDefaultForm();
  };

  var setDefaultForm = function () {
    window.synchronizeFields(timein, timeout, TIME_VALUES, TIME_VALUES, syncValues);
    window.synchronizeFields(timeout, timein, TIME_VALUES, TIME_VALUES, syncValues);
    window.synchronizeFields(apartmentType, price, OFFER_TYPES, OFFER_PRICES, syncValueWithMin);
    roomNumber.addEventListener('change', roomsForGuestsHandler);
    roomsForGuestsHandler();
    fillAdress(mainPin.offsetLeft, (mainPin.offsetTop + MAIN_PIN_HEIGHT / 2));
  };

  adTitle.addEventListener('invalid', function () {
    if (adTitle.validity.tooShort || adTitle.validity.patternMismatch) {
      adTitle.setCustomValidity('Имя должно состоять минимум из 30 символов');
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
      price.style.borderColor = '#d9d9d3';
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

  setDefaultForm();
  deactivateForm();

  window.form = {
    activate: activateForm,
    fillAdress: fillAdress
  };

})();
