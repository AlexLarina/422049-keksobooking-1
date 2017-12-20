'use strict';

(function () {
  var getRandFromRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var chooseUniqueFromArray = function (length, array, unique) {
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

  var createPopup = function () {
    var popup = document.createElement('div');

    popup.classList.add('popupMessage');
    popup.style.position = 'fixed';
    popup.style.top = '40%';
    popup.style.left = '50%';
    popup.style.zIndex = '10';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.minWidth = '250px';
    popup.style.minHeight = '250px';
    popup.style.padding = '20px 15px';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.boxSizing = 'border-box';
    popup.style.color = '#ff5635';
    popup.style.fontSize = '24px';
    popup.style.lineHeight = '32px';
    popup.style.backgroundColor = '#ffffff';
    popup.style.border = '3px solid #ff5635';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '0 0 10px 10px rgba(255, 86, 53, .7)';
    return popup;
  };

  var createPopupText = function (popup, text) {
    var popupText = document.createElement('p');
    popupText.style.margin = '0';
    popupText.style.marginBottom = '10px';
    popupText.style.fontSize = '18px';
    popupText.style.fontWeight = 'bold';
    popupText.textContent = text;
    popup.appendChild(popupText);
    return popupText;
  };

  var createSuccessPopup = function () {
    var successPopup = createPopup();
    createPopupText(successPopup, 'Все идет по плану');
    return successPopup;
  };

  var createErrorPopup = function () {
    var errorPopup = createPopup();
    createPopupText(errorPopup, 'Все летит в {censored}');
    return errorPopup;
  };

  window.utils = {
    getRandFromRange: getRandFromRange,
    chooseUniqueFromArray: chooseUniqueFromArray,
    successPopup: createSuccessPopup,
    errorPopup: createErrorPopup
  };
})();
