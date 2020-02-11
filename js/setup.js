'use strict';

(function () {
  var MAX_COUNT_WIZARDS = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  var generateWizards = function () {
    var result = [];
    var randomNamesAndSurNames = window.mathUtil.generateRandomOrderOfCouple([WIZARD_NAMES, WIZARD_SURNAMES]);

    for (var i = 0; i < MAX_COUNT_WIZARDS; i++) {
      result.push({
        name: window.mathUtil.getRandomArrayElement(randomNamesAndSurNames[0]) + ' ' + window.mathUtil.getRandomArrayElement(randomNamesAndSurNames[1]),
        coatColor: window.mathUtil.getRandomArrayElement(COAT_COLOR),
        eyesColor: window.mathUtil.getRandomArrayElement(EYES_COLOR),
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

  var init = function () {
    document.querySelector('.setup').classList.remove('hidden');
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  init();
  renderWizards(generateWizards());
})();
