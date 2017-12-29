'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var FILTER_SWITCH_DELAY = 500;
  var filteredArray = [];
  var filtersContainer = document.querySelector('.map__filters');
  var filters = filtersContainer.querySelectorAll('.map__filter');

  /* var returnByPriceRange = function (adPrice, value) {
    switch (value) {
      case 'any': return true;
      case 'low': return adPrice < MIN_PRICE;
      case 'middle': return adPrice >= MIN_PRICE && adPrice <= MAX_PRICE;
      case 'high': return adPrice > MAX_PRICE;
    }
    return false;
  };*/
  var priceRange = {
    'low': function (price) {
      return price < MIN_PRICE;
    },
    'middle': function (price) {
      return price >= MIN_PRICE && price <= MAX_PRICE;
    },
    'high': function (price) {
      return price > MAX_PRICE;
    }
  };

  var filterByPrice = function (ads, value) {
    return ads.filter(function (ad) {
      console.log('all is bad');
      return priceRange[value](ad.offer.price);
      // return returnByPriceRange(ad.offer.price, value);
    });
  };

  var filterByValue = function (ads, filter, value) {
    return ads.filter(function (ad) {
      return ad.offer[value].toString() === filter;
    });
  };

  /* var filterByValue = function (ads, filter, value) {
    return ads.filter(function (ad) {
      return ad.offer[filter].toString() === value || value === 'any';
    });
  };

  var filterByNumberValue = function (ads, filter, value) {
    return ads.filter(function (ad) {
      return parseInt(ad.offer[filter], 10) >= value;
    });
  };*/

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
      console.log(filterType);
      /* if (filterType !== 'price' || isNaN(parseInt(currentFilter.value, 10))) {
        filteredArray = filterByValue(filteredArray, filterType, currentFilter.value);
      } else if (filterType === 'guests' && !isNaN(parseInt(currentFilter.value, 10))) {
        filteredArray = filterByNumberValue(filteredArray, filterType, parseInt(currentFilter.value, 10));
      } else {
        filteredArray = filterByPrice(filteredArray, currentFilter.value);
      }
    });*/
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
