'use strict';

(function () {
  var PriceParams = {
    MIN: 10000,
    MAX: 50000
  };

  var FILTER_SWITCH_DELAY = 500;
  var filteredArray = [];
  var filtersContainer = document.querySelector('.map__filters');
  var filters = filtersContainer.querySelectorAll('.map__filter');

  var priceRange = {
    'low': function (price) {
      return price < PriceParams.MIN;
    },
    'middle': function (price) {
      return price >= PriceParams.MIN && price <= PriceParams.MAX;
    },
    'high': function (price) {
      return price > PriceParams.MAX;
    }
  };

  var filterByPrice = function (ads, value) {
    return ads.filter(function (ad) {
      return priceRange[value](ad.offer.price);
    });
  };

  var filterByValue = function (ads, filter, value) {
    return ads.filter(function (ad) {
      return ad.offer[value].toString() === filter;
    });
  };

  var filterByFeatures = function (ads, feature) {
    return ads.filter(function (ad) {
      return ad.offer.features.indexOf(feature) !== -1;
    });
  };

  window.filtratePins = function (ads) {
    var checkedFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    filteredArray = ads.slice(0);

    var applicableFilters = Array.prototype.filter.call(filters, function (filter) {
      return filter.value !== 'any';
    });

    applicableFilters.forEach(function (currentFilter) {
      var filterType = currentFilter.name.split('-')[1];

      if (filterType !== 'price') {
        filteredArray = filterByValue(filteredArray, currentFilter.value, filterType);
      } else {
        filteredArray = filterByPrice(filteredArray, currentFilter.value);
      }
    });

    checkedFeatures.forEach(function (currentFeature) {
      filteredArray = filterByFeatures(filteredArray, currentFeature.value);
    });

    return filteredArray;
  };

  filtersContainer.addEventListener('change', function () {
    window.utils.debounce(window.mapUpdate, FILTER_SWITCH_DELAY);
  });

})();
