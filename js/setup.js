'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

var generateRandomValue = function (max) {
  return Math.floor(Math.random() * max);
};

var onPopupEscPress = function (evt) {
  if ((evt.key === ESC_KEY) && (document.activeElement !== setupUserName)) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

setupWizardCoat.addEventListener('click', function (evt) {
  var color = wizardCoatColors[generateRandomValue(wizardCoatColors.length)];
  evt.target.style.fill = color;
  document.querySelector('input[name="coat-color"]').value = color;
});

setupWizardEyes.addEventListener('click', function (evt) {
  var color = wizardEyesColors[generateRandomValue(wizardEyesColors.length)];
  evt.target.style.fill = color;
  document.querySelector('input[name="eyes-color"]').value = color;
});

setupFireball.addEventListener('click', function (evt) {
  var color = fireballColors[generateRandomValue(fireballColors.length)];
  evt.currentTarget.style.background = color;
  evt.currentTarget.querySelector('input[name="fireball-color"]').value = color;
});
