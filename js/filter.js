'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var filteredArray = [];
  var filtersContainer = document.querySelector('.map__filters');
  var filters = filtersContainer.querySelectorAll('.map__filter');

  var returnByPriceRange = function (adPrice, value) {
    switch (value) {
      case 'any': return true;
      case 'low': return adPrice < MIN_PRICE;
      case 'middle': return adPrice >= MIN_PRICE && adPrice <= MAX_PRICE;
      case 'high': return adPrice >= MAX_PRICE;
    }
    return false;
  };

  var filterByPrice = function (ads, value) {
    return ads.filter(function (ad) {
      return returnByPriceRange(ad.offer.price, value);
    });
  };

  window.filtrate = function (ads) {
    filteredArray = ads.slice(0);

    filters.forEach(function (currentFilter) {
      if (currentFilter.value !== 'any') {
        filteredArray = filterByPrice(filteredArray, currentFilter.value);
      }
      console.log(filteredArray);
      return filteredArray;
    });
  };

})();
