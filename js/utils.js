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
    popup.style.top = '10%';
    popup.style.left = '50%';
    popup.style.zIndex = '10';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.minWidth = '200px';
    popup.style.minHeight = '100px';
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
    console.log('popup created');
    return popup;
  };

  window.utils = {
    getRandFromRange: getRandFromRange,
    chooseUniqueFromArray: chooseUniqueFromArray,
    popup: createPopup
  };
})();
