'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloudData = {
    leftChordX: 100,
    leftChordY: 10,
    width: 420,
    height: 270,
    color: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOffset: 10,
  };
  var textData = {
    headerText: 'Ура вы победили!',
    listResultText: 'Список результатов:',
    font: '16px PT Mono',
    color: 'black',
    leftChordsOffset: 35,
    rowOffset: 20,
    leftChordX: cloudData.leftChordX,
    leftChordY: cloudData.leftChordY,
  };
  var getMaxValue = function (data) {
    var maxValue = data[0];
    if (data.length > 1) {
      for (var i = 1; i < data.length; i++) {
        if (maxValue < data[i]) {
          maxValue = data[i];
        }
      }
    }
    return maxValue;
  };
  var areaData = {
    padding: 15,
    rowTimeHeight: 10,
    rowNameHeight: 25,
    elementWidth: 40,
    elementOffsetWidth: 50,
    playerYou: 'Вы',
    maxTimeValue: getMaxValue(times),
    getOffsetY: function () {
      return textData.leftChordsOffset + textData.rowOffset;
    },
    getLeftChordX: function () {
      return cloudData.leftChordX + this.padding;
    },
    getLeftChordY: function () {
      return cloudData.leftChordY + this.getOffsetY() + this.padding;
    },
    getWidth: function () {
      return cloudData.width - this.padding * 2;
    },
    getHeight: function () {
      return cloudData.height - this.getOffsetY() - this.padding * 2;
    },
    getElementWidth: function (countElements) {
      return (countElements > 0) ? Math.round(this.getWidth() / countElements * 2) : 0;
    },
    getElementHeight: function () {
      return this.getHeight() - this.getElementLeftChordY();
    },
    getElementLeftChordX: function (numberElement) {
      return this.getLeftChordX() + numberElement * (this.elementWidth + this.elementOffsetWidth) + this.elementOffsetWidth;

    },
    getElementLeftChordY: function (timeValue) {
      return this.getLeftChordY() + this.getHeight() - timeValue * this.getHeight() / this.maxTimeValue;
    },
  };
  var drawCloud = function (cloud) {
    ctx.fillStyle = cloud.shadowColor;
    ctx.fillRect(cloud.leftChordX + cloud.shadowOffset, cloud.leftChordY + cloud.shadowOffset, cloud.width, cloud.height);
    ctx.fillStyle = cloud.color;
    ctx.fillRect(cloud.leftChordX, cloud.leftChordY, cloud.width, cloud.height);
  };
  var drawText = function (text) {
    ctx.fillStyle = text.color;
    ctx.font = text.font;
    ctx.fillText(text.headerText, text.leftChordX + text.leftChordsOffset, text.leftChordY + text.leftChordsOffset);
    ctx.fillText(text.listResultText, text.leftChordX + text.leftChordsOffset, text.leftChordY + text.leftChordsOffset + text.rowOffset);
  };
  var drawArea = function (area) {
    for (var i = 0; i < names.length; i++) {
      var time = Math.round(times[i]);
      ctx.fillStyle = 'black';
      ctx.fillText(String(time), area.getElementLeftChordX(i), area.getElementLeftChordY(times[i]));
      ctx.fillStyle = (names[i] === area.playerYou) ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, 0.5)';
      var elementLeftChordY = area.getElementLeftChordY(times[i]);
      var elementHeight = cloudData.height - elementLeftChordY - area.rowNameHeight - area.rowTimeHeight;
      ctx.fillRect(area.getElementLeftChordX(i), elementLeftChordY + area.rowTimeHeight, area.elementWidth, elementHeight);
      ctx.fillStyle = 'black';
      ctx.fillText(names[i], area.getElementLeftChordX(i), area.getElementLeftChordY(times[i]) + elementHeight + area.rowTimeHeight);
    }
  };

  drawCloud(cloudData);
  drawText(textData);
  drawArea(areaData);
};
