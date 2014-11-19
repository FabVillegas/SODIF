angular.module('sodif').controller('graficaCtrl', graficaCtrl);

graficaCtrl.$inject = ['$scope', '$state', '$firebase'];

function graficaCtrl($scope, $state, $firebase){

  /*
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
  */

  $scope.monthsArray = [];
  $scope.checkList = [];
  $scope.detallesArray = [];

  $scope.variable = 'autoridad';

  $scope.test = function(){
    $scope.otraCosa = $firebase(new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014')).$asArray(); // quien sabe que pedo
    /*
    $scope.otraCosa.$loaded().then(function(x) {
      console.log(x);
    });
    */



    $scope.testRef = new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014');
    $scope.testRef.orderByChild('val').on('child_added', function(snapshot){

      console.log('referencia de captura https://sistema-de-oficios.firebaseio.com/contadores/2014/' + snapshot.key() + '/' + $scope.variable);
      /*
      var temporaryObj = $firebase(
        new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014/' + snapshot.key() + '/' + $scope.variable + '/PGJE')
      ).$asObject();
      $scope.checkList.push(temporaryObj);
      console.log($scope.checkList);
*/

      var firstRef = $firebase(new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014/' + snapshot.key() + '/' + $scope.variable)).$asArray();
      firstRef.$watch(function(event){
        //console.log(event.key);
        var secondRef = $firebase(new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014/' + snapshot.key() + '/' + $scope.variable + '/' + event.key)).$asArray();
        secondRef.$watch(function(snap){
          console.log('secondREf');
          var x = 'https://sistema-de-oficios.firebaseio.com/contadores/2014/' + snapshot.key() + '/' + $scope.variable + '/' + event.key + '/' + snap.key;
          console.log(x.toString());

          $scope.thirdRef = $firebase(new Firebase(x)).$asObject();
          $scope.thirdRef.$loaded().then(function(child){
            console.log(child.$id);
            console.log(child.$value);
          });

          /*
          $scope.thirdRef.$loaded().then(function(){
            console.log('primer huijo');
            console.log(thirdRef[0]);
          });
          */
        });
      });


      /*
      var temporaryOficioObj = $firebase(new Firebase(firebaseRefFactory.getTest(child_added.key))).$asObject();
      $scope.oficios.push(temporaryOficioObj);
      console.log($scope.oficios);
      $scope.myData = $scope.oficios;
      /*
      $scope.checkList.push({
        value: snapshot.val().autoridad//.PGJE[ 'AMP INV No 1 EJFDS GPE' ]
      });
      console.log('Este es el checklist');
      console.log($scope.checkList);
      */
      $scope.monthsArray.push({
        x: snapshot.key(),
        y: [snapshot.val().autoridad.PGJE.contAutoridad, snapshot.val().autoridad.PJE.contAutoridad, snapshot.val().autoridad.PJF.contAutoridad]
      });
    });

    $scope.config = {
      title: 'Autoridad',
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
      data: $scope.monthsArray
    };





  };

  $scope.test();


  $scope.chartType = 'bar';
  $scope.selectChartType = function(){
    $scope.chartType = $scope.chart; // Valid values: 'pie', 'bar', 'line', 'point', 'area'
  };



  // Instanciar objeto
  $scope.graficaDatos = {
    tipo : '',
    beginDate : '',
    endDate : ''
  };


  $scope.guardar = function(){
    if($scope.graficaDatos.beginDate == ''){
      ngDialog.open({
        template: 'alertMessage'
      });
    }
    else{
      // Funciones auxiliares
      var getMonth = function(fecha){
        var x;
        for(i = 3; i < fecha.length - 1; i++){
          if(fecha.substring(i,i+1) == ' ')
            x = i;
        }
        var y = fecha.substring(3,x);
        return y;
      };

      var getYear = function(fecha){
        var x = fecha.substring(fecha.length - 4, fecha.length);
        return x;
      };



      var beginYear = getYear($scope.graficaDatos.beginDate);
      var beginMonth = getMonth($scope.graficaDatos.beginDate);

      var endYear = getYear($scope.graficaDatos.endDate);
      var endMonth = getMonth($scope.graficaDatos.endDate);

      var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];

      function diff(from, to) {
          var arr = [];
          var datFrom = new Date('1 ' + from);
          var datTo = new Date('1 ' + to);
          var fromYear =  datFrom.getFullYear();
          var toYear =  datTo.getFullYear();
          var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();

          for (var i = datFrom.getMonth(); i <= diffYear; i++) {
              arr.push(monthNames[i%12] + " " + Math.floor(fromYear+(i/12)));
          }

          return arr;
      };

      var mesesEjeX = [];

      mesesEjeX = diff('Noviembre 2014', 'Marzo 2015');

    alert(mesesEjeX);






  //    $scope.dataAutoridad = {
  //      series: ['PGJE', 'PJF', 'PJE'],
  //      data: [{x: beginMonth, y: [contPGJE, contPJF, contPJE]},
  //      {
  //        x: "Octubre",
  //        y: [contPGJE, contPJF, contPJE]
  //      }, {
  //        x: endMonth,
  //        y: [contPGJE, contPJF, contPJE]
  //      }]
  //    };


      var contadoresParaCadaMes = [];






//
   //   //var contadores = [contPGJE, contPJF, contPJE];
   //   //contadoresParaCadaMes.push(contadores);
////
   //   //alert("hi");
//
   // }
    //alert("sali");















/*
      $scope.configAutoridad = {
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

      $scope.dataAutoridad = {
        series: ['PGJE', 'PJF', 'PJE'],
        data: [{x: beginMonth, y: [contPGJE, contPJF, contPJE]},
        {
          x: endMonth,
          y: [contPGJE, contPJF, contPJE]
        }]
      };

*/












    }
  };











//  $scope.showDate = function(){
//    alert($scope.beginDate);
//  };
//
//  $scope.goCaptura = function(){
//    $state.go("captura")
//  };
//
//  $scope.goOficios = function(){
//    $state.go("oficios")
//  };

/*
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
      y: [100, 500, 10, 154, 59,]
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
*/


};
