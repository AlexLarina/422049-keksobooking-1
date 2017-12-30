'use strict';

(function () {
  var popupTimeOut = 2000;

  var createPopup = function (text) {
    var popup = document.createElement('div');
    var popupText = document.createElement('p');

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

    popupText.style.margin = '0';
    popupText.style.marginBottom = '10px';
    popupText.style.fontSize = '18px';
    popupText.style.fontWeight = 'bold';
    popupText.textContent = text;
    popup.appendChild(popupText);

    setTimeout(function () {
      if (popup) {
        popup.parentNode.removeChild(popup);
      }
    }, popupTimeOut);


    return popup;
  };

  var createSuccessPopup = function () {
    var successPopup = createPopup('Все идет по плану');
    return successPopup;
  };

  var createErrorPopup = function () {
    var errorPopup = createPopup('Все летит в {censored}');
    return errorPopup;
  };

  window.popup = {
    createSuccess: createSuccessPopup,
    createError: createErrorPopup
  };

})();
