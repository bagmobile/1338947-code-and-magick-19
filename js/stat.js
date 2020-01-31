'use strict';

window.renderStatistics = function (ctx, names, times) {

  var Cloud = {
    X: 100,
    Y: 10,
    WIDTH: 420,
    HEIGHT: 270,
    SHADOW_OFFSET: 10,
  };
  var Text = {
    OFFSET: 30,
    HEIGHT: 20,
  };
  var Chart = {
    HEIGHT: 150,
    ELEMENT_WIDTH: 40,
    ELEMENT_OFFSET_WIDTH: 50,
    PLAYER: 'Вы',
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
    return Math.round(maxValue);
  };

  var drawCloud = function (canvas) {
    canvas.fillStyle = 'rgba(0, 0, 0, 0.7)';
    canvas.fillRect(Cloud.X + Cloud.SHADOW_OFFSET, Cloud.Y + Cloud.SHADOW_OFFSET, Cloud.WIDTH, Cloud.HEIGHT);
    canvas.fillStyle = 'white';
    canvas.fillRect(Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT);
  };

  var drawTextElement = function (canvas, textElement) {
    canvas.fillStyle = 'black';
    canvas.font = '16px PT Mono';
    canvas.fillText(textElement.text, textElement.leftChordX, textElement.leftChordY);
  };

  var drawText = function (canvas) {
    var textRows = ['Ура вы победили!', 'Список результатов:'];

    textRows.forEach(function (value, index) {
      drawTextElement(canvas, {
        text: value,
        leftChordX: Cloud.X + Text.OFFSET,
        leftChordY: Cloud.Y + Text.OFFSET + index * Text.HEIGHT,
      });
    });
  };

  var getFillStyleChartElement = function (isMyself) {
    return isMyself ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.round(Math.floor(100)) + '%, ' + Math.floor(50) + '%)';
  };

  var drawChart = function (canvas, listNames, listTimes) {
    var maxTimeValue = getMaxValue(times);

    for (var i = 0; i < listNames.length; i++) {
      var time = Math.round(listTimes[i]);
      var offset = Math.round(Chart.HEIGHT - Chart.HEIGHT * time / maxTimeValue);
      var dataPlayer = [time, listNames[i]];
      var chartElementLeftChordX = Cloud.X + Chart.ELEMENT_OFFSET_WIDTH + i * (Chart.ELEMENT_WIDTH + Chart.ELEMENT_OFFSET_WIDTH);
      var chartElementLeftChordY = Cloud.Y + 2 * Text.HEIGHT + Text.OFFSET;

      for (var j = 0; j <= dataPlayer.length - 1; j++) {
        drawTextElement(canvas, {
          text: dataPlayer[j],
          leftChordX: chartElementLeftChordX,
          leftChordY: chartElementLeftChordY + ((j === 1) ? (2 * Text.HEIGHT + Chart.HEIGHT) : offset + Text.HEIGHT / 2),
        });
      }

      canvas.fillStyle = getFillStyleChartElement(listNames[i] === Chart.PLAYER);
      canvas.fillRect(chartElementLeftChordX, chartElementLeftChordY + Text.HEIGHT + offset,
        Chart.ELEMENT_WIDTH, Chart.HEIGHT - offset);
    }
  };

  if ((names.length !== 0) && times.length !== 0) {
    drawCloud(ctx);
    drawText(ctx);
    drawChart(ctx, names, times);
  }
};
