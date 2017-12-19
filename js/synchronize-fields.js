'use strict';

(function () {
  window.synchronizeFields = function (syncField, syncWithField, syncFieldOptions, syncWithFieldOptions, syncValues) {
    syncField.addEventListener('change', function () {
      var index = syncFieldOptions.indexOf(syncField.value);
      syncValues(syncWithField, syncWithFieldOptions[index]);
    });
  };
})();
