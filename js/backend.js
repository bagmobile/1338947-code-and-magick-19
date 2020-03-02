'use strict';

(function (w) {
  var TIMEOUT_UPLOAD = 10000;
  var TIMEOUT_LOAD = 10000;
  var StatusCode = {
    OK: 200,
  };

  var getXHR = function (onSuccess, onError, timeout) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = timeout;
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var url = 'https://js.dump.academy/code-and-magick/data';
    var xhr = getXHR(onLoad, onError, TIMEOUT_LOAD);
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var url = 'https://js.dump.academy/code-and-magick';
    var xhr = getXHR(onLoad, onError, TIMEOUT_UPLOAD);
    xhr.open('POST', url);
    xhr.send(data);
  };

  w.backend = {
    load: load,
    save: save,
  };
})(window);
