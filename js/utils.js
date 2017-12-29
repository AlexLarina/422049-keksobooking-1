'use strict';

(function () {
  var lastTimeout = null;

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

  var removeNodes = function (node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  };

  var debounce = function (callback, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, interval);
  };

  window.utils = {
    getRandFromRange: getRandFromRange,
    chooseUniqueFromArray: chooseUniqueFromArray,
    removeNodes: removeNodes,
    debounce: debounce
  };
})();
