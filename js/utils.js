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

  var removeNodes = function (node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  };

  window.utils = {
    getRandFromRange: getRandFromRange,
    chooseUniqueFromArray: chooseUniqueFromArray,
    removeNodes: removeNodes
  };
})();
