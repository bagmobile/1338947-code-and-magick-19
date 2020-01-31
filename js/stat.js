'use strict';

window.renderStatistics = function (ctx, names, times) {

  var leftChordX = 100,
    leftChordY = 10,
    width = 420,
    height = 270,
    chartLeftChordX = 100,
    chartLeftChordY = 80,
    chartHeight = 150,
    chartRowTextHeight = 10,
    chartElementWidth = 40,
    chartElementOffsetWidth = 50,
    chartPadding = {top: 10, right: 10, bottom: 10, left: 40},
    player = 'Вы';

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

  var maxTimeValue = getMaxValue(times);

  var drawCloud = function (canvas) {
    var shadowOffset = 10;
    canvas.fillStyle = 'rgba(0, 0, 0, 0.7)';
    canvas.fillRect(leftChordX + shadowOffset, leftChordY + shadowOffset, width, height);
    canvas.fillStyle = 'white';
    canvas.fillRect(leftChordX, leftChordY, width, height);
  };

  var drawText = function (canvas) {
    var offsetX = 30;
    var offsetY = 30;
    var textRows = ['Ура вы победили!', 'Список результатов:'];
    var rowHeight = 20;

    textRows.forEach(function (value, index) {
      canvas.fillStyle = 'black';
      canvas.font = '16px PT Mono';
      canvas.fillText(value, leftChordX + offsetX, leftChordY + offsetY + index * rowHeight);
    });
  };

  var getElementOffsetLeftChordY = function (timeValue) {
    return Math.round(chartHeight - timeValue * chartHeight / maxTimeValue);
  };

  var getFillStyleChartElement = function (isMyself) {
    return isMyself ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.round(Math.floor(100)) + '%, ' + Math.floor(50) + '%)';
  };

  var getElementLeftChordX = function (i) {
    return chartLeftChordX + chartPadding.left + i * (chartElementWidth + chartElementOffsetWidth);
  };

  var getElementLeftChordY = function () {
    return chartLeftChordY + chartPadding.top;
  };

  var drawTextElement = function (canvas, textElement) {
    canvas.fillStyle = textElement.fillStyle;
    canvas.font = textElement.font;
    canvas.fillText(textElement.text, textElement.leftChordX, textElement.leftChordY);
  };

  var drawChartElement = function (canvas, element) {
    canvas.fillStyle = element.fillStyle;
    canvas.fillRect(element.leftChordX, element.leftChordY, element.width, element.height);
  };

  var drawChart = function (canvas, listNames, listTimes) {

    for (var i = 0; i < listNames.length; i++) {
      var time = Math.round(listTimes[i]);
      var offset = getElementOffsetLeftChordY(time);

      drawTextElement(canvas, {
        text: time,
        fillStyle: 'black',
        font: '16px PT Mono',
        leftChordX: getElementLeftChordX(i),
        leftChordY: getElementLeftChordY(),
      });

      drawChartElement(canvas, {
        fillStyle: getFillStyleChartElement(listNames[i] === player),
        leftChordX: getElementLeftChordX(i),
        leftChordY: getElementLeftChordY() + chartRowTextHeight + offset,
        width: chartElementWidth,
        height: chartHeight - offset,
      });

      drawTextElement(canvas, {
        text: listNames[i],
        fillStyle: 'black',
        font: '16px PT Mono',
        leftChordX: getElementLeftChordX(i),
        leftChordY: getElementLeftChordY() + 3 * chartRowTextHeight + chartHeight,
      });
    }
  };

  drawCloud(ctx);
  drawText(ctx);
  drawChart(ctx, names, times);
};
