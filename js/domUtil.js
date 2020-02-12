'use strict';

(function (w) {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };
  w.domUtil = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
  };
})(window);
