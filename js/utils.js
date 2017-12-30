'use strict';

(function () {
  var lastTimeout = null;

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
    removeNodes: removeNodes,
    debounce: debounce
  };
})();
