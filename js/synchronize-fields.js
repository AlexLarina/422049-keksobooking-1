'use strict';

(function () {
  var synchronizeFields = function (syncField, syncWithField, syncFieldOptions, syncWithFieldOptions, syncValues) {
    var index = syncFieldOptions.indexOf(syncField.value);
    syncValues(syncWithField, syncWithFieldOptions[index]);
  };
  window.synchronizeFields = synchronizeFields;
})();
