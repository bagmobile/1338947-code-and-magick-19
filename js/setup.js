'use strict';

(function () {
  var MAX_COUNT_WIZARDS = 4;
  var wizardsData = [];

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
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

  var init = function (isXHR) {
    var onLoad = function (data) {
      document.querySelector('.setup').classList.remove('hidden');
      document.querySelector('.setup-similar').classList.remove('hidden');
      wizardsData = data;
      window.dialog.updateColors(wizardsData);
      renderWizards(wizardsData.slice(0, MAX_COUNT_WIZARDS));
    };
    var onError = function (message) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
    };
    if (isXHR) {
      window.backend.load(onLoad, onError);
    } else {
      window.onLoad = onLoad;
      var loader = document.createElement('script');
      loader.src = 'https://js.dump.academy/code-and-magick/data?callback=onLoad';
      document.body.appendChild(loader);
    }
  };
  var getRank = function (wizard, filter) {
    var rank = 0;

    if (wizard.colorCoat === filter.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === filter.eyesColor) {
      rank += 1;
    }

    return rank;
  };
  var filterWizards = function (filter) {
    document.querySelectorAll('.setup-similar-list div').forEach(function (element) {
      element.remove();
    });
    window.setTimeout(function () {
      renderWizards(wizardsData.sort(function (left, right) {
        return getRank(right, filter) - getRank(left, filter);
      }).slice(0, MAX_COUNT_WIZARDS));
    }, 500);
  };

  init(true);

  window.setup = {
    filterWizards: filterWizards,
  };
})();
