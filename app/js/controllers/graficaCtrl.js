angular.module('sodif').controller('graficaCtrl', graficaCtrl);

graficaCtrl.$inject = ['$scope', '$state', '$firebase', 'ngDialog', 'destroyerFactory', 'dateFactory', 'firebaseRefFactory'];

function graficaCtrl($scope, $state, $firebase, ngDialog, destroyerFactory, dateFactory,  firebaseRefFactory){
  // variables que si se usan
  $scope.chartType = 'bar';
  $scope.juzgadosQueryIsShown = false;
  $scope.chartIsShown = false;
  $scope.isNotAutoridadQuery = false;
  $scope.isDisabled = true;

  $scope.query = '';

  $scope.callbacks = [];
  $scope.series = [];
  $scope.dataArray = [];
  $scope.monthsRange = [];
  $scope.tiposDeJuzgados = [];
  $scope.autoridadArray = [];

  $scope.disableButtons = function(){
    if($scope.isDisabled)
      $scope.disableStyle = {'background-color':'grey', 'border-color':'black'};
    else
      $scope.disableStyle = {};
  };

  $scope.disableButtons();

  $scope.configChart = function(){
    $scope.config = { // config chart
      title: $scope.requestedtQuery,
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
    $scope.isDisabled = false;
    $scope.disableButtons();
    $scope.chartIsShown = false;
    $scope.isNotAutoridadQuery = false;
    $scope.juzgadosQueryIsShown = false;
    /* limpiar arreglos */
    $scope.cleanArray($scope.series);
    $scope.cleanArray($scope.series);
    $scope.cleanArray($scope.dataArray); $scope.dataArray = [];
    $scope.cleanArray($scope.monthsRange);
    $scope.cleanArray($scope.tiposDeJuzgados);
    $scope.cleanArray($scope.autoridadArray);
    /* limpiar grafica */
    $scope.config = {};
    $scope.data = {};
    /* destruir las referencias a firebase */
    for(var i = 0; i < $scope.callbacks.length; i++){
      if($scope.query != 'autoridad'){
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

  $scope.totalesQuery = function(firebaseRef, index){ /* aplica para consulta de total de niños o de oficios */
    $scope.callbacks[index] = $firebase(new Firebase(firebaseRef)).$asObject();
    var sync = $scope.callbacks[index].$inst()._ref.path.n[2];
    $scope.callbacks[index].$loaded().then(function(child){
      $scope.dataArray.push({
        x: sync.substring(0,3),
        y: [child.$value]
      });
    });
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
                name: child[i].$id,
                val: child[i].$value
              });
            }
          }
        }
      }
      $scope.dataArray.push({
        x: sync.substring(0,3),
        y: aux,
      });
    });

  };

  $scope.tiposDeJuzgadoQuery = function(firebaseObj, index, ref){
    $scope.juzgadosQueryIsShown = true;
    $scope.firstCall = $firebase(firebaseObj).$asArray();
    console.log($scope.firstCall.$inst()._ref.path);
    $scope.tiposDeJuzgados.push({
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
            for($scope.w = 0; $scope.w < $scope.tiposDeJuzgados.length; $scope.w ++){
              if($scope.tiposDeJuzgados[$scope.w].place == index){
                var autoridadName = child.key;
                var surrogate = [{
                  autoridad: autoridadName,
                  name: thirdChild.$id,
                  value: thirdChild.$value,
                  place: index
                }];
                $scope.tiposDeJuzgados[index].values.push(surrogate);
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
        x: sync.$ref().path.n[2].substring(0,3),
        y: [datEvent.val().PGJE.contAutoridad, datEvent.val().PJE.contAutoridad, datEvent.val().PJF.contAutoridad]
      });
    });
  };

  $scope.resolveQuery = function(arrayData, queryFunction){
    for($scope.z = 0; $scope.z < arrayData.length; $scope.z++){
      var tempYear = dateFactory.getYear(arrayData[$scope.z]);
      var tempMonth = dateFactory.getMonthName(arrayData[$scope.z]);
      var tempRef = firebaseRefFactory.getContadoresRef() + tempYear + '/' + tempMonth + '/' + $scope.query;
      queryFunction(tempRef, $scope.z);
    }
  };

  $scope.expectQuery = function(arrayData){
    $scope.chartIsShown = true;
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
        $scope.isNotAutoridadQuery = true;
        $scope.data = { // config chart data
          series: [],
          data: $scope.dataArray,
        };
        break;
      case 'Municipio':
        $scope.query = 'municipio';
        $scope.resolveQuery(arrayData, $scope.juicioQuery);
        $scope.configChart();
        $scope.isNotAutoridadQuery = true;
        $scope.data = { // config chart data
          series: [],
          data: $scope.dataArray,
        };
        break;
      case 'Menores':
        $scope.query = 'totalMenores';
        $scope.resolveQuery(arrayData, $scope.totalesQuery);
        $scope.configChart();
        $scope.isNotAutoridadQuery = false;
        $scope.data = { // config chart data
          series: ['Total de menores'],
          data: $scope.dataArray,
        };
        break;
      case 'Oficios':
        $scope.query = 'totalOficios';
        $scope.resolveQuery(arrayData, $scope.totalesQuery);
        $scope.configChart();
        $scope.isNotAutoridadQuery = false;
        $scope.data = { // config chart data
          series: ['Total de oficios'],
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
