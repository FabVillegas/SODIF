angular.module('sodif').controller('graficaCtrl', graficaCtrl);

graficaCtrl.$inject = ['$scope', '$state', '$firebase', 'ngDialog', 'firebaseRefFactory', 'divideDateFactory', 'chartQueryFactory'];

function graficaCtrl($scope, $state, $firebase, ngDialog, firebaseRefFactory, divideDateFactory, chartQueryFactory){
  // variables auxiliares
  $scope.monthsRange = [];
  $scope.query = '';
  $scope.monthsArray = [];
  $scope.checkList = [];
  $scope.detallesArray = [];
  $scope.variable = 'autoridad';
  $scope.tempoArray = [];
  $scope.callback = [];

  $scope.list = [];

  $scope.isShown = true;
  $scope.chartType = 'bar';


  $scope.show = function(){
    console.log(1); /* resuelve el bug, no modificar */
  };

  $scope.cleanArray =  function(array){
    while(array.length){
      array.pop();
    }
  };

  $scope.fooArray = [];

  $scope.bar = function(){
    var ref = 'https://sistema-de-oficios.firebaseio.com/contadores/';
    var ano = '2014'
    var mes = 'Noviembre';
    var query = 'autoridad';
    console.log(ref + ano + '/' + mes + '/' + query + '/')
    $scope.juzgadoFirstRef = new Firebase(ref + ano + '/' + mes + '/' + query + '/');
    var sync = $firebase($scope.juzgadoFirstRef).$ref();
    console.log(sync.path.n[2]);
    $scope.juzgadoFirstRef.on('child_added', function(firstEvent){
        //console.log(firstEvent.key());
        $scope.juzgadoSecondRef = new Firebase(ref + ano + '/' + mes + '/' + query + '/' + firstEvent.key());
        $scope.juzgadoSecondRef.once('child_added', function(secondEvent){
          //console.log(secondEvent.key());
          $scope.juzgadoThirdRef = $firebase(new Firebase(ref + ano + '/' + mes + '/' + query + '/' + firstEvent.key() + '/' + secondEvent.key())).$asObject();
          $scope.juzgadoThirdRef.$loaded().then(function(child){
            if(child.$id != 'contAutoridad'){
              $scope.checkList.push({
                name: child.$id,
                value: child.$value
              });
            }
          });
        });
    });

    $scope.fooArray.push({
      monthName: sync.path.n[2],
      info: $scope.checkList
    });
  };


  $scope.foos = [];

  $scope.tiposDeJuzgadoQuery = function(firebaseObj, index, ref){
    $scope.fb = $firebase(firebaseObj).$asArray();
    $scope.foos.push({
      place: index,
      month: $scope.fb.$inst()._ref.path.n[2],
      values: []
    });

    console.log($scope.foos);
    $scope.fb.$watch(function(child){
      $scope.fb2 = $firebase(new Firebase(ref + '/' + child.key)).$asArray();
      var syncRef2 = $scope.fb2.$inst()._ref.path.n[2];
      console.log('syncRef2: ' + syncRef2);
      $scope.fb2.$watch(function(secondChild){
        if(secondChild.key != 'contAutoridad'){
          $scope.fb3 = $firebase(new Firebase(ref + '/' + child.key + '/' + secondChild.key)).$asObject();
          var syncRef3 = $scope.fb3.$inst()._ref.path.n[2];
          console.log('syncRef3: ' + syncRef3);
          $scope.fb3.$loaded().then(function(thirdChild){
            var callbackRef = $firebase($scope.callback[index]).$ref().path.n[2];
            $scope.list.push({
              name: thirdChild.$id,
              value: thirdChild.$value,
              place: index
            });

            for($scope.w = 0; $scope.w < $scope.foos.length; $scope.w ++){
              if($scope.foos[$scope.w].place == index){
                console.log('goes in here ' + index);
                console.log(thirdChild.$id);
                var surrogate = [{
                  name: thirdChild.$id,
                  value: thirdChild.$value,
                  place: index
                }];
                $scope.foos[index].values.push(surrogate);
              }
            }
            /*
            console.log('Arreglo');
            console.log($scope.list);
            console.log('Resultado de callbackRef');
            console.log(callbackRef);
            */



            $scope.fb2.$destroy();
            $scope.fb.$destroy();
          });
        }
      });
    });


    /*
    var sync = $firebase($scope.callback[index]);
    console.log('before cleanup');
    console.log($scope.checkList);
    $scope.fooArray.push({
      monthName: sync.$ref().path.n[2],
      info: $scope.checkList
    });
    $scope.cleanArray($scope.checkList);
    console.log('after cleanup');
    console.log($scope.checkList);
    */




    /*
    $scope.fb.$loaded().then(function(fbChild){

      /*
      $scope.fb2 = $firebase(new Firebase(ref + '/' + lala.key)).$asArray();
      $scope.fb2.$watch(function(lolo){
        if(lolo.key != 'contAutoridad'){
          console.log(lolo.key);
          $scope.fb3 = $firebase(new Firebase(ref + '/' + lala.key + '/' + lolo.key)).$asObject();
          $scope.fb3.$loaded().then(function(child){
            console.log(child.$id);
            console.log(child.$value);
            $scope.checkList.push({
              name: child.$id,
              value: child.$value
            });
          });
        }
      });
      */
    //});


    /*
    $scope.fb.$watch(function(lala){
      console.log('inside watch');
      console.log(lala.key);
      $scope.fb2 = $firebase(new Firebase(ref + '/' + lala.key)).$asArray();
      $scope.fb2.$watch(function(lolo){
        if(lolo.key != 'contAutoridad'){
          console.log(lolo.key);
          $scope.fb3 = $firebase(new Firebase(ref + '/' + lala.key + '/' + lolo.key)).$asObject();
          $scope.fb3.$loaded().then(function(child){
            console.log(child.$id);
            console.log(child.$value);
            $scope.checkList.push({
              name: child.$id,
              value: child.$value
            });
          });
        }
      });

    });

    $scope.fb.$loaded().then(function(child){
      console.log('DESTROY!!!!');
      $scope.fb.$destroy();
    });

  //  $scope.fb.$destroy();

    /*
    foo example
    firebaseObj.once('value', function(datEvent){
      var sync = $firebase($scope.callback[index]);
      $scope.tempoArray.push({
        x: sync.$ref().path.n[2],
        y: [datEvent.val().PGJE.contAutoridad, datEvent.val().PJE.contAutoridad, datEvent.val().PJF.contAutoridad, ]
      });
    });
    */
    /*
    console.log(firebaseObj);
    firebaseObj.once('child_added', function(lala){
      console.log(lala.key());
      //$scope.fb = new Firebase(ref + '/' + 'autoridad');

    });
    */
    /*
    $scope.juzgadoFirstRef = firebaseObj;
    var sync = $firebase($scope.juzgadoFirstRef).$ref();
    $scope.testRef = $firebase(firebaseObj).$asArray();
    $scope.testRef.$watch(function(event) {
      $scope.anotherRef = $firebase(new Firebase(thatRef + '/' + event.key)).$asArray();
      $scope.anotherRef.$watch(function(anotherEvent){
        if(anotherEvent.key != 'contAutoridad'){
            $scope.deepRef = $firebase(new Firebase(thatRef + '/' + event.key + '/' + anotherEvent.key)).$asObject();
            $scope.deepRef.$loaded().then(function(child) {
              $scope.checkList.push({
                name: child.$id,
                value: child.$value
              });
            });
        }
      });
    });

    /*
    var sync = $firebase($scope.juzgadoFirstRef).$ref();
    console.log(sync.path.n[2]);
    $scope.testRef = $firebase(firebaseObj).$asArray();
    $scope.testRef.$watch(function(event) {
      console.log(event);
    });
    /*
    $scope.anotherTest = new Firebase(thatRef);
    $scope.anotherTest.on('child_added', function(snapshot){
      console.log(snapshot.key());
    });
    */
    /*
    $scope.juzgadoFirstRef.on('child_added', function(firstEvent){
      console.log(firstEvent.key());
        //console.log(firstEvent.key());
        $scope.juzgadoSecondRef = new Firebase(thatRef + '/' + firstEvent.key());
        $scope.juzgadoSecondRef.once('child_added', function(secondEvent){
          //console.log(secondEvent.key());
          $scope.juzgadoThirdRef = $firebase(new Firebase(thatRef + '/' + firstEvent.key() + '/' + secondEvent.key())).$asObject();
          $scope.juzgadoThirdRef.$loaded().then(function(child){
            if(child.$id != 'contAutoridad'){
              $scope.checkList.push({
                name: child.$id,
                value: child.$value
              });
            }
          });
        });

    });

    $scope.fooArray.push({
      monthName: sync.path.n[2],
      info: $scope.checkList
    });
    */
  };

  $scope.foo = function(firebaseObj, index){
    firebaseObj.once('value', function(datEvent){
      var sync = $firebase($scope.callback[index]);
      $scope.tempoArray.push({
        x: sync.$ref().path.n[2],
        y: [datEvent.val().PGJE.contAutoridad, datEvent.val().PJE.contAutoridad, datEvent.val().PJF.contAutoridad, ]
      });
    });
  };

  $scope.autoridadQuery = function(arrayData){
    $scope.query = 'autoridad';
    for($scope.z = 0; $scope.z < arrayData.length; $scope.z++){
      $scope.tempYear = divideDateFactory.getYear(arrayData[$scope.z]);
      $scope.tempMonth = divideDateFactory.getMonthName(arrayData[$scope.z]);
      $scope.tempRef = firebaseRefFactory.getContadoresRef() + $scope.tempYear + '/' + $scope.tempMonth + '/' + $scope.query;
      $scope.callback[$scope.z] = new Firebase($scope.tempRef);
      $scope.foo($scope.callback[$scope.z], $scope.z);

      $scope.tiposDeJuzgadoQuery($scope.callback[$scope.z], $scope.z, $scope.tempRef);
    }
    $scope.config = {
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
    $scope.data = {
      series: ['PGJE', 'PJE', 'PJF'],
      data: $scope.tempoArray
    };
  };

  $scope.expectQuery = function(arrayData){
    $scope.isShown = true;
    $scope.data = { series: [], data: [] }; // no cambiar nada ya funciona
    $scope.cleanArray($scope.tempoArray);
    switch($scope.chartQuery){
      case 'Autoridad':
        $scope.autoridadQuery(arrayData);
        break;
      default:
        ngDialog.open({ template: 'queryMessage' });
        break;
    }
  };

  $scope.getMonthsRange = function(from, to){
    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
    var arr = [];
    var datFrom = new Date();
    datFrom.setDate(1);
    datFrom.setMonth(parseInt(divideDateFactory.getNumericMonth(from)) - 1);
    datFrom.setFullYear(parseInt(divideDateFactory.getNumericYear(from)));
    var datTo = new Date();
    datTo.setDate(1);
    datTo.setMonth(parseInt(divideDateFactory.getNumericMonth(to) - 1));
    datTo.setFullYear(parseInt(divideDateFactory.getNumericYear(to)));

    var fromYear =  datFrom.getFullYear();
    var toYear =  datTo.getFullYear();
    var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();

    for (var i = datFrom.getMonth(); i <= diffYear; i++) {
        arr.push(monthNames[i%12] + " " + Math.floor(fromYear+(i/12)));
    }

    return arr;
  };

  $scope.guardar = function(){
    if($scope.beginDate == '' || $scope.endDate == ''){
      ngDialog.open({ template: 'alertMessage' });
    }
    else{
      $scope.monthsRange = [];
      $scope.monthsRange = $scope.getMonthsRange($scope.beginDate, $scope.endDate);
      $scope.expectQuery($scope.monthsRange);
    }
  };

};
