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
  var insertSucceessMessage = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: green;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  var insertErrorMessage = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  w.domUtil = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    insertSucceessMessage: insertSucceessMessage,
    insertErrorMessage: insertErrorMessage,
  };
})(window);
