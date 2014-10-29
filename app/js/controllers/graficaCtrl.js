angular.module('sodif').controller('graficaCtrl', graficaCtrl);

graficaCtrl.$inject = ['$scope', '$state'];

function graficaCtrl($scope, $state){


  $scope.showDate = function(){
    alert($scope.beginDate);
  };

  $scope.goCaptura = function(){
    $state.go("captura")
  };

  $scope.goOficios = function(){
    $state.go("oficios")
  };

  $scope.chartType = 'bar';
  $scope.selectChartType = function(){
    $scope.chartType = $scope.chart; // Valid values: 'pie', 'bar', 'line', 'point', 'area'
  };

  $scope.config = {
    title: 'Autoridad',
    tooltips: true,
    labels: false,
    mouseover: function() {},
    mouseout: function() {},
    click: function() {},
    legend: {
      display: true,
      //could be 'left, right'
      position: 'right'
    },
    colors: ['#00C900', '#00A200', '#005C00', '#002D00', '#008000'],
  };

  $scope.data = {
    series: ['JP01', 'JP02', 'JP03', 'JP04', 'JP05'],
    data: [{
      x: "Enero",
      y: [100, 500, 10, 154, 59]
    }, {
      x: "Febrero",
      y: [300, 100, 100, 101, 13]
    }, {
      x: "Marzo",
      y: [351, 8, 10, 154, 59]
    }, {
      x: "Abril",
      y: [54, 0, 651, 10, 154]
    }]
  };
};
