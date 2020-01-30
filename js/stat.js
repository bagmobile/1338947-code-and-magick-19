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
      return Math.round(maxValue);
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
      offsetX: 30,
      offsetY: 30,
      textRows: ['Ура вы победили!', 'Список результатов:'],
      font: '16px PT Mono',
      color: 'black',
      rowHeight: 20,
      draw: function (canvas) {
        var self = this;
        this.textRows.forEach(function (value, index) {
          canvas.fillStyle = self.color;
          canvas.font = self.font;
          canvas.fillText(value, cloud.leftChordX + self.offsetX, cloud.leftChordY + self.offsetY + index * self.rowHeight);
        });
      },
    };

    var chart = {
      leftChordX: cloud.leftChordX,
      leftChordY: cloud.leftChordY + text.offsetY + text.rowHeight * text.textRows.length,
      chartHeight: 150,
      rowTextHeight: 10,
      elementWidth: 40,
      elementOffsetWidth: 50,
      padding: {top: 10, right: 10, bottom: 10, left: 40},
      player: 'Вы',
      maxTimeValue: getMaxValue(times),
      getElementLeftChordX: function (i) {
        return this.leftChordX + this.padding.left + i * (this.elementWidth + this.elementOffsetWidth);
      },
      getElementLeftChordY: function () {
        return this.leftChordY + this.padding.top;
      },
      getElementOffsetLeftChordY: function (timeValue) {
        return Math.round(this.chartHeight - timeValue * this.chartHeight / this.maxTimeValue);
      },
      getFillStyleChartElement: function (isMyself) {
        return isMyself ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.round(Math.floor(100)) + '%, ' + Math.floor(50) + '%)';
      },
      drawTextElement: function (canvas, textElement) {
        canvas.fillStyle = textElement.fillStyle;
        canvas.font = textElement.font;
        canvas.fillText(textElement.text, textElement.leftChordX, textElement.leftChordY);
      },
      drawChartElement: function (canvas, element) {
        canvas.fillStyle = element.fillStyle;
        canvas.fillRect(element.leftChordX, element.leftChordY, element.width, element.height);
      },
      draw: function (canvas, listNames, listTimes) {
        for (var i = 0; i < listNames.length; i++) {
          var time = Math.round(listTimes[i]);
          var offset = this.getElementOffsetLeftChordY(time);

          this.drawTextElement(canvas, {
            text: time,
            fillStyle: 'black',
            font: '16px PT Mono',
            leftChordX: this.getElementLeftChordX(i),
            leftChordY: this.getElementLeftChordY(),
          });

          this.drawChartElement(canvas, {
            fillStyle: this.getFillStyleChartElement(listNames[i] === this.player),
            leftChordX: this.getElementLeftChordX(i),
            leftChordY: this.getElementLeftChordY() + this.rowTextHeight + offset,
            width: this.elementWidth,
            height: this.chartHeight - offset,
          });

          this.drawTextElement(canvas, {
            text: listNames[i],
            fillStyle: 'black',
            font: '16px PT Mono',
            leftChordX: this.getElementLeftChordX(i),
            leftChordY: this.getElementLeftChordY() + 3 * this.rowTextHeight + this.chartHeight,
          });
        }
      },
    };

    cloud.draw(ctx);
    text.draw(ctx);
    chart.draw(ctx, names, times);
  };
})();
