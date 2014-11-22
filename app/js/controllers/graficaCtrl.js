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


  $scope.dataArray = [];
  $scope.series = [];

  // variables que si se usan
  $scope.monthsRange = [];
  $scope.query = '';
  $scope.autoridadArray = [];
  $scope.callbacks = [];
  $scope.isJuzgadosQuery = false;
  // firebase objects
  $scope.tempFirebaseObj;

  $scope.show = function(){
    //console.log(1); /* resuelve el bug, no modificar */
  };

  $scope.reset = function(){
    $scope.monthsRange = [];
    $scope.autoridadArray = [];
    $scope.config = { };
    $scope.data = { series: [], data: [] }; // no cambiar nada ya funciona
    for(var i = 0; i < $scope.callbacks.length; i++){
      destroyerFactory.destroyFirebaseReference($scope.callbacks[i]);
    }
    destroyerFactory.destroyFirebaseObject($scope.firstCall);
    destroyerFactory.destroyFirebaseObject($scope.secondCall);
    destroyerFactory.destroyFirebaseObject($scope.thirdCall);
    $scope.foos = [];
    $scope.list = [];
  };

  $scope.cleanArray =  function(array){
    while(array.length){
      array.pop();
    }
  };

  $scope.tiposDeJuzgadoQuery = function(firebaseObj, index, ref){
    $scope.isJuzgadosQuery = true;
    $scope.firstCall = $firebase(firebaseObj).$asArray();
    $scope.foos.push({
      place: index,
      month: $scope.firstCall.$inst()._ref.path.n[2],
      values: []
    });
    //console.log($scope.foos);
    $scope.firstCall.$watch(function(child){
      $scope.secondCall = $firebase(new Firebase(ref + '/' + child.key)).$asArray();
      var syncRef2 = $scope.secondCall.$inst()._ref.path.n[2];
      //console.log('syncRef2: ' + syncRef2);
      $scope.secondCall.$watch(function(secondChild){
        if(secondChild.key != 'contAutoridad'){
          $scope.thirdCall = $firebase(new Firebase(ref + '/' + child.key + '/' + secondChild.key)).$asObject();
          var syncRef3 = $scope.thirdCall.$inst()._ref.path.n[2];
          //console.log('syncRef3: ' + syncRef3);
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

  $scope.auxAutoridadQuery = function(firebaseObj, index){
    firebaseObj.once('value', function(datEvent){
      var sync = $firebase($scope.callbacks[index]);
      $scope.autoridadArray.push({
        x: sync.$ref().path.n[2],
        y: [datEvent.val().PGJE.contAutoridad, datEvent.val().PJE.contAutoridad, datEvent.val().PJF.contAutoridad]
      });
    });
  };

  $scope.autoridadQuery = function(arrayData){
    /*
    for($scope.z = 0; $scope.z < arrayData.length; $scope.z++){
      var tempYear = divideDateFactory.getYear(arrayData[$scope.z]);
      var tempMonth = divideDateFactory.getMonthName(arrayData[$scope.z]);
      var tempRef = firebaseRefFactory.getContadoresRef() + tempYear + '/' + tempMonth + '/' + $scope.query;
      $scope.callbacks[$scope.z] = new Firebase(tempRef);
      $scope.auxAutoridadQuery($scope.callbacks[$scope.z], $scope.z);
      $scope.tiposDeJuzgadoQuery($scope.callbacks[$scope.z], $scope.z, tempRef);
    }
    /*$scope.config = { // config chart
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
      colors: ['#00C900', '#030182', '#B60009'],
    };
    $scope.data = { // config chart data
      series: ['PGJE', 'PJE', 'PJF'],
      data: $scope.autoridadArray,
    };
    */
  };

  $scope.juicioQuery = function(firebaseRef, index){
    $scope.callbacks[index] = $firebase(new Firebase(firebaseRef)).$asArray();
    $scope.callbacks[index].$loaded().then(function(child){
      var aux = [];
      for(var i = 0; i < child.length; i++){
        if(child[i].$id != 'Tipo de Juicio'){
          aux.push(child[i].$value);
          $scope.series.push(child[i].$id);
        }
      }
      $scope.dataArray.push({
        x: 'Noviembre', //sync.$ref().path.n[2]
        y: aux,
      });
    });
    /*
    $scope.tempFirebaseObj = $firebase(new Firebase(firebaseRef)).$asArray();
    $scope.tempFirebaseObj.$loaded().then(function(child){
      //var sync = $scope.tempFirebaseObj.$inst();
      var aux = [];
      for(var i = 0; i < child.length; i++){
        if(child[i].$id != 'Tipo de Juicio'){
          aux.push(child[i].$value);
          $scope.series.push(child[i].$id);
        }
      }
      $scope.dataArray.push({
        x: 'Noviembre', //sync.$ref().path.n[2]
        y: aux,
      });
      /*
      $scope.autoridadArray.push({
        x: sync.$ref().path.n[2],
        y: [datEvent.val().PGJE.contAutoridad, datEvent.val().PJE.contAutoridad, datEvent.val().PJF.contAutoridad]
      });

      console.log('dataArray');
      console.log($scope.dataArray);
      console.log('series');
      console.log($scope.series)

    });
    */
  };


  $scope.resolveQuery = function(arrayData){
    for($scope.z = 0; $scope.z < arrayData.length; $scope.z++){
      var tempYear = divideDateFactory.getYear(arrayData[$scope.z]);
      var tempMonth = divideDateFactory.getMonthName(arrayData[$scope.z]);
      var tempRef = firebaseRefFactory.getContadoresRef() + tempYear + '/' + tempMonth + '/' + $scope.query;
      $scope.juicioQuery(tempRef, $scope.z);
      //$scope.callbacks[$scope.z] = new Firebase(tempRef);
      //$scope.auxAutoridadQuery($scope.callbacks[$scope.z], $scope.z);
      //$scope.tiposDeJuzgadoQuery($scope.callbacks[$scope.z], $scope.z, tempRef);
    }
  };

  $scope.expectQuery = function(arrayData){
    $scope.isShown = true;
    $scope.data = { series: [], data: [] }; // no cambiar nada ya funciona
    $scope.cleanArray($scope.autoridadArray);
    switch($scope.requestedtQuery){
      case 'Autoridad':
        $scope.query = 'autoridad';
        $scope.resolveQuery(arrayData);
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
          colors: ['#00C900', '#030182', '#B60009'],
        };
        $scope.data = { // config chart data
          series: ['PGJE', 'PJE', 'PJF'],
          data: $scope.autoridadArray,
        };
        break;
      case 'Tipo de juicio':
        $scope.query = 'juicio';
        $scope.resolveQuery(arrayData);
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
        $scope.data = { // config chart data
          series: $scope.series,
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
