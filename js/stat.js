'use strict';

(function () {

  window.renderStatistics = function (ctx, names, times) {

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

    var cloud = {
      leftChordX: 100,
      leftChordY: 10,
      width: 420,
      height: 270,
      cloudColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.7)',
      shadowOffset: 10,
      getLeftChordShadow: function (chord) {
        return chord + this.shadowOffset;
      },
      draw: function (canvas) {
        canvas.fillStyle = this.shadowColor;
        canvas.fillRect(this.getLeftChordShadow(this.leftChordX), this.getLeftChordShadow(this.leftChordY), this.width, this.height);
        canvas.fillStyle = this.cloudColor;
        canvas.fillRect(this.leftChordX, this.leftChordY, this.width, this.height);
      },
    };

    var text = {
      leftChordX: 130,
      leftChordY: 40,
      textRows: ['Ура вы победили!', 'Список результатов:'],
      font: '16px PT Mono',
      color: 'black',
      textRowHeight: 20,
      draw: function (canvas) {
        var self = this;
        this.textRows.forEach(function (value, index) {
          canvas.fillStyle = self.color;
          canvas.font = self.font;
          canvas.fillText(value, self.leftChordX, self.leftChordY + index * self.textRowHeight);
        });
      },
    };

    var chart = {
      width: 420,
      height: 150,
      rowTextHeight: 20,
      elementWidth: 40,
      elementOffsetWidth: 50,
      padding: {top: 10, right: 10, bottom: 10, left: 10},
      player: 'Вы',
      maxTimeValue: getMaxValue(times),
      getLeftChordX: function (cloudData) {
        return;
      },
      getLeftChordY: function () {
        return;
      },
      getElementLeftChordX: function (numberElement) {
        return this.getLeftChordX() + numberElement * (this.elementWidth + this.elementOffsetWidth) + this.elementOffsetWidth;
      },
      getElementLeftChordY: function (timeValue) {
        return this.getLeftChordY() + this.getHeight() - timeValue * this.getHeight() / this.maxTimeValue;
      },
      drawElement: function (element) {
      },
      draw: function (canvas, listNames, listTimes) {

      },
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

    cloud.draw(ctx);
    text.draw(ctx);
  };
})();
