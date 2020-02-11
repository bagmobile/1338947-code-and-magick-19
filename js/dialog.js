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

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
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

})();
