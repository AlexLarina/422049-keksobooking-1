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
      case 'high': return adPrice > MAX_PRICE;
    }
    return false;
  };

  var filterByPrice = function (ads, value) {
    return ads.filter(function (ad) {
      return returnByPriceRange(ad.offer.price, value);
    });
  };

  var filterByValue = function (ads, filter, value) {
    return ads.filter(function (ad) {
      return ad.offer[filter].toString() === value || value === 'any';
    });
  };

  var filterByNumberValue = function (ads, filter, value) {
    return ads.filter(function (ad) {
      return parseInt(ad.offer[filter], 10) >= value;
    });
  };

  var filterByFeatures = function (ads, feature) {
    return ads.filter(function (ad) {
      return ad.offer.features.indexOf(feature) !== -1;
    });
  };

  window.filtrate = function (ads) {
    filteredArray = ads.slice(0);

    var applicableFilters = Array.prototype.filter.call(filters, function (filter) {
      return filter.value !== 'any';
    });

    applicableFilters.forEach(function (currentFilter) {
      var filterType = currentFilter.name.split('-').splice(1, 1).toString();
      var checkedFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
      console.log(checkedFeatures.length);

      if (filterType !== 'price' && filterType !== 'guests' || isNaN(parseInt(currentFilter.value, 10))) {
        filteredArray = filterByValue(filteredArray, filterType, currentFilter.value);
      } else if (filterType === 'guests' && !isNaN(parseInt(currentFilter.value, 10))) {
        filteredArray = filterByNumberValue(filteredArray, filterType, parseInt(currentFilter.value, 10));
      } else {
        filteredArray = filterByPrice(filteredArray, currentFilter.value);
      }
    });

    /* checkedFeatures.forEach(function (currentFeature) {
      filteredArray = filterByFeatures(filteredArray, currentFeature.value);
    });*/

    return filteredArray;
  };

})();
