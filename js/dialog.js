'use strict';

(function () {
  var wizardCoatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];

  var wizardEyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];

  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  var setupDialogElement = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupDialogElement.querySelector('.setup-close');
  var setupUserName = setupDialogElement.querySelector('.setup-user-name');
  var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var dialogForm = setupDialogElement.querySelector('form');
  var initChordsSetupDialogElement = {
    x: setupDialogElement.offsetLeft,
    y: setupDialogElement.offsetTop,
  };

  var openPopup = function () {
    setupDialogElement.style.top = initChordsSetupDialogElement.y + 'px';
    setupDialogElement.style.left = initChordsSetupDialogElement.x + 'px';
    setupDialogElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setupDialogElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== setupUserName) {
      window.domUtil.isEscEvent(evt, closePopup);
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.domUtil.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.domUtil.isEnterEvent(evt, closePopup);
  });

  setupWizardCoat.addEventListener('click', function (evt) {
    var color = wizardCoatColors[window.mathUtil.generateRandomValue(wizardCoatColors.length)];
    evt.target.style.fill = color;
    document.querySelector('input[name="coat-color"]').value = color;
  });

  setupWizardEyes.addEventListener('click', function (evt) {
    var color = wizardEyesColors[window.mathUtil.generateRandomValue(wizardEyesColors.length)];
    evt.target.style.fill = color;
    document.querySelector('input[name="eyes-color"]').value = color;
  });

  setupFireball.addEventListener('click', function (evt) {
    var color = fireballColors[window.mathUtil.generateRandomValue(fireballColors.length)];
    evt.currentTarget.style.background = color;
    evt.currentTarget.querySelector('input[name="fireball-color"]').value = color;
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  dialogForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var onSave = function () {
      window.domUtil.insertSucceessMessage('Данные успешно отправлены');
    };
    var onError = function (message) {
      window.domUtil.insertErrorMessage(message);
    };
    window.backend.save(new FormData(dialogForm), onSave, onError);
  });


})();
