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
  var capacityItems = document.querySelectorAll('#capacity > option');
  var formFieldsets = form.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.notice__form');
  var avatarPreview = noticeForm.querySelector('.notice__preview img');
  var photoPreview = noticeForm.querySelector('.form__photo-container');

  var timeValues = ['12:00', '13:00', '14:00'];
  var offerTypes = ['flat', 'bungalo', 'house', 'palace'];
  var offerPrices = [1000, 0, 5000, 10000];

  var roomsForGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

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
      item.disabled = !roomsForGuests[roomNumber.value].includes(item.value);
      capacity.value = roomsForGuests[roomNumber.value][0];
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
    var index = offerTypes.indexOf(apartmentType.value);
    syncValueWithMin(price, offerPrices[index]);
    deletePreviews();
    setDefaultForm();
  };

  var setDefaultForm = function () {
    window.synchronizeFields(timein, timeout, timeValues, timeValues, syncValues);
    window.synchronizeFields(timeout, timein, timeValues, timeValues, syncValues);
    window.synchronizeFields(apartmentType, price, offerTypes, offerPrices, syncValueWithMin);
    roomNumber.addEventListener('change', roomsForGuestsHandler);
    roomsForGuestsHandler();
    initialAdress.value = '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3';
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
