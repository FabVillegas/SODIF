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

  $scope.test = function(){
    console.log('Entra funcion');
    $scope.prueb = $firebase(new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014')).$asArray();
/*
    $scope.prueb.$loaded().then(function(){
      console.log($scope.prueb[0]);
    });*/

    $scope.testRef = new Firebase('https://sistema-de-oficios.firebaseio.com/contadores/2014');

    $scope.testRef.orderByChild('val').on('child_added', function(snapshot){
      //$scope.monthArray.push($snapshot);
      //console.log(snapshot.key());
      //console.log(snapshot.val());
      //console.log('Mes de ' + snapshot.key() + " vale " + snapshot.val());
      $scope.monthsArray.push({
        x: snapshot.key(),
        y: [snapshot.val().val]
      });
      console.log('MonthsArray');
      console.log($scope.monthsArray);
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
      colors: ['#00C900', '#00A200', '#005C00', '#002D00', '#008000'],
    };

    $scope.data = {
      series: ['JP01', 'JP02', 'JP03', 'JP04', 'JP05'],
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

     // alert(diff('September 2014', 'November 2014'));

      var mesesEjeX = [];
      mesesEjeX = diff('November 2014', 'November 2014');








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

$scope.arregloPrueba = [];


var ref = new Firebase("https://sistema-de-oficios.firebaseio.com/contadores");

/*$scope.contadoresRef = $firebase(new Firebase('https://sistema-de-oficios.firebaseio.com/contadores')).$asArray();

$scope.contadoresRef.$loaded().then(function(){
  console.log('Arreglo de contadores');
  console.log($scope.contadoresRef[0].Noviembre.autoridad.PGJE.contAutoridad);
});*/

/*
var ref = new Firebase("https://dinosaur-facts.firebaseio.com/");
ref.orderByChild("height").on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});
*/






ref.orderByChild("val").on("child_added", function(childSnapshot) {
  var pruebilla = [];
  pruebilla = childSnapshot.val();
  console.log(pruebilla);
  console.log(pruebilla.Noviembre.autoridad.PGJE.contAutoridad);
});







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
