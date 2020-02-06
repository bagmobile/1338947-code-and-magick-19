'use strict';

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var MAX_COUNT_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomArrayElement = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var getRandomNameOrder = function (values) {
  var fioOrderFirst = getRandomArrayElement(values);
  values.splice(values.indexOf(fioOrderFirst), 1);
  return [fioOrderFirst, values[0]];
};

var generateWizards = function () {
  var result = [];
  var randomNamesAndSurNames = getRandomNameOrder([WIZARD_NAMES, WIZARD_SURNAMES]);
  for (var i = 0; i < MAX_COUNT_WIZARDS; i++) {
    result.push({
      name: getRandomArrayElement(randomNamesAndSurNames[0]) + ' ' + getRandomArrayElement(randomNamesAndSurNames[1]),
      coatColor: getRandomArrayElement(COAT_COLOR),
      eyesColor: getRandomArrayElement(EYES_COLOR),
    });
  }
  return result;
};

var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (wizards) {
  var similarListElement = document.querySelector('.setup-similar-list');
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    documentFragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.append(documentFragment);
};

renderWizards(generateWizards());


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
