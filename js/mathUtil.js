'use strict';

(function (w) {

  var getMaxValue = function (data) {
    var maxValue = data[0];
    if (data.length > 1) {
      for (var i = 1; i < data.length; i++) {
        if (maxValue < data[i]) {
          maxValue = data[i];
        }
      }
    }
    return Math.round(maxValue);
  };
  var generateRandomValue = function (max) {
    return Math.floor(Math.random() * max);
  };

  var getRandomArrayElement = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  var generateRandomOrderOfCouple = function (values) {
    var first = getRandomArrayElement(values);
    values.splice(values.indexOf(first), 1);
    return [first, values[0]];
  };

  w.mathUtil = {
    getMaxValue: getMaxValue,
    generateRandomValue: generateRandomValue,
    getRandomArrayElement: getRandomArrayElement,
    generateRandomOrderOfCouple: generateRandomOrderOfCouple
  };
})(window);
