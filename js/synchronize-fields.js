'use strict';

(function () {
  window.synchronizeFields = function (syncField, syncWithField, syncFieldOptions, syncWithFieldOptions, syncValues) {
    // var index = syncFieldOptions.indexOf(syncField.value);
    syncField.addEventListener('change', function () {
      var index = syncFieldOptions.indexOf(syncField.value);
      syncValues(syncWithField, syncWithFieldOptions[index]);
    });
    // syncValues(syncWithField, syncWithFieldOptions[index]);
  };
  // window.synchronizeFields = synchronizeFields;
})();
