angular.module('sodif').controller('graficaCtrl', graficaCtrl);

graficaCtrl.$inject = ['$scope', '$state', '$firebase', 'ngDialog', 'destroyerFactory', 'dateFactory', 'firebaseRefFactory', 'divideDateFactory', 'chartQueryFactory'];

function graficaCtrl($scope, $state, $firebase, ngDialog, destroyerFactory, dateFactory,  firebaseRefFactory, divideDateFactory, chartQueryFactory){
  // variables auxiliares
  $scope.monthsArray = [];
  $scope.checkList = [];
  $scope.detallesArray = [];
  $scope.variable = 'autoridad';
  $scope.list = [];
  $scope.isShown = true;
  $scope.chartType = 'bar';
  $scope.fooArray = [];
  $scope.foos = [];
  $scope.series = [];

  $scope.query = '';
  $scope.autoridadArray = [];

  $scope.isJuzgadosQuery = false;
  $scope.tempFirebaseObj;




  // variables que si se usan
  $scope.callbacks = [];
  $scope.series = [];
  $scope.dataArray = [];
  $scope.monthsRange = [];

  $scope.configChart = function(){
    $scope.config = { // config chart
      title: $scope.chartQuery,
      tooltips: true,
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      legend: {
        display: true,
        position: 'right' //could be 'left, right'
      },
    };
  };


  $scope.show = function(){
    /* resuelve el bug de la grafica, no modificar */
  };

  $scope.cleanArray =  function(array){
    while(array.length){
      array.pop();
    }
  };

  $scope.reset = function(){
    /* limpiar arreglos */
    $scope.cleanArray($scope.series);
    $scope.cleanArray($scope.series);
    $scope.cleanArray($scope.dataArray);
    $scope.cleanArray($scope.monthsRange);
    /* limpiar grafica */
    $scope.config = {};
    $scope.data = {};
    /* destruir las referencias a firebase */
    for(var i = 0; i < $scope.callbacks.length; i++){
      if($scope.query == 'juicio'){
        destroyerFactory.destroyFirebaseObject($scope.callbacks[i]);
      }
      else{ /* las referencias en el query de autoridad no son $asArray ni $asObject, debe destruirse con otro metodo */
        destroyerFactory.destroyFirebaseReference($scope.callbacks[i]);
      }
    }
    if($scope.query == 'autoridad'){
      destroyerFactory.destroyFirebaseObject($scope.firstCall);
      destroyerFactory.destroyFirebaseObject($scope.secondCall);
      destroyerFactory.destroyFirebaseObject($scope.thirdCall);
    }
  };

  $scope.juicioQuery = function(firebaseRef, index){
    $scope.callbacks[index] = $firebase(new Firebase(firebaseRef)).$asArray();
    var sync = $scope.callbacks[index].$inst()._ref.path.n[2];
    $scope.series.push({
      spot: index,
      month: sync,
      labels: []
    });
    $scope.callbacks[index].$loaded().then(function(child){
      var aux = [];
      for(var i = 0; i < child.length; i++){
        if(child[i].$id != 'Tipo de Juicio'){
          aux.push(child[i].$value);
          for(var j = 0; j < $scope.series.length; j ++){
            if($scope.series[j].spot == index){
              $scope.series[index].labels.push({
                placeInChart: i+1,
                name: child[i].$id
              });
            }
          }
        }
      }
      $scope.dataArray.push({
        x: sync,
        y: aux,
      });
    });
  };

  $scope.tiposDeJuzgadoQuery = function(firebaseObj, index, ref){
    $scope.isJuzgadosQuery = true;
    $scope.firstCall = $firebase(firebaseObj).$asArray();
    $scope.foos.push({
      place: index,
      month: $scope.firstCall.$inst()._ref.path.n[2],
      values: []
    });
    $scope.firstCall.$watch(function(child){
      $scope.secondCall = $firebase(new Firebase(ref + '/' + child.key)).$asArray();
      var syncRef2 = $scope.secondCall.$inst()._ref.path.n[2];
      $scope.secondCall.$watch(function(secondChild){
        if(secondChild.key != 'contAutoridad'){
          $scope.thirdCall = $firebase(new Firebase(ref + '/' + child.key + '/' + secondChild.key)).$asObject();
          var syncRef3 = $scope.thirdCall.$inst()._ref.path.n[2];
          $scope.thirdCall.$loaded().then(function(thirdChild){
            var callbacksRef = $firebase($scope.callbacks[index]).$ref().path.n[2];
            $scope.list.push({
              name: thirdChild.$id,
              value: thirdChild.$value,
              place: index
            });
            for($scope.w = 0; $scope.w < $scope.foos.length; $scope.w ++){
              if($scope.foos[$scope.w].place == index){
                var surrogate = [{
                  name: thirdChild.$id,
                  value: thirdChild.$value,
                  place: index
                }];
                $scope.foos[index].values.push(surrogate);
              }
            }
          });
        }
      });
    });
  };

  $scope.autoridadQuery = function(firebaseRef, index){
    $scope.callbacks[index] = new Firebase(firebaseRef);
    $scope.tiposDeJuzgadoQuery($scope.callbacks[index], index, firebaseRef);
    $scope.callbacks[index].once('value', function(datEvent){
      var sync = $firebase($scope.callbacks[index]);
      $scope.autoridadArray.push({
        x: sync.$ref().path.n[2],
        y: [datEvent.val().PGJE.contAutoridad, datEvent.val().PJE.contAutoridad, datEvent.val().PJF.contAutoridad]
      });
    });
  };

  $scope.resolveQuery = function(arrayData, queryFunction){
    for($scope.z = 0; $scope.z < arrayData.length; $scope.z++){
      var tempYear = divideDateFactory.getYear(arrayData[$scope.z]);
      var tempMonth = divideDateFactory.getMonthName(arrayData[$scope.z]);
      var tempRef = firebaseRefFactory.getContadoresRef() + tempYear + '/' + tempMonth + '/' + $scope.query;
      //$scope.juicioQuery(tempRef, $scope.z);
      $scope.callbacks[$scope.z] = new Firebase(tempRef);
      queryFunction(tempRef, $scope.z);
    }
  };

  $scope.expectQuery = function(arrayData){
    $scope.isShown = true;
    $scope.data = { series: [], data: [] }; // no cambiar nada ya funciona
    $scope.cleanArray($scope.autoridadArray);
    switch($scope.requestedtQuery){
      case 'Autoridad':
        $scope.query = 'autoridad';
        $scope.resolveQuery(arrayData, $scope.autoridadQuery);
        $scope.configChart();
        $scope.data = { // config chart data
          series: ['PGJE', 'PJE', 'PJF'],
          data: $scope.autoridadArray,
        };
        break;
      case 'Tipo de juicio':
        $scope.query = 'juicio';
        $scope.resolveQuery(arrayData, $scope.juicioQuery);
        $scope.configChart();
        $scope.data = { // config chart data
          series: [],
          data: $scope.dataArray,
        };
        break;
      default:
        ngDialog.open({ template: 'queryMessage' });
        break;
    }
  };

  $scope.getData = function(){
    if($scope.beginDate == '' || $scope.endDate == ''){
      ngDialog.open({ template: 'alertMessage' });
    }
    else{
      //$scope.monthsRange = [];
      $scope.monthsRange = dateFactory.getMonthsRange($scope.beginDate, $scope.endDate);
      $scope.expectQuery($scope.monthsRange);
    }
  };

};
