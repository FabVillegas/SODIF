angular.module('sodif').controller('oficiosCtrl', oficiosCtrl);

oficiosCtrl.$inject = ['$scope', '$firebase', '$state', '$stateParams', 'firebaseRefFactory', '$location', 'divideDateFactory'];

function oficiosCtrl($scope, $firebase, $state, $stateParams, firebaseRefFactory, $location, divideDateFactory){

  // variables
  $scope.myData = [];
  var currentYear = new Date().getFullYear();
  $scope.years = [];
  $scope.months = [];
  $scope.oficios = [];
  $scope.mySelections = [];
  $scope.selectedIDs = [];
  $scope.elementos = [];


  // metodos ng-click
  $scope.foo = function(fecha, numero){
    if (numero != undefined){
      var year = divideDateFactory.getYear(fecha);
      var month = divideDateFactory.getMonth(fecha);
      $location.path('/oficios/' + year + '/' + month + '/' + numero);
    }
    else{
      // do nothing
    }
  };

  // metodos ng-change
  $scope.getMonths = function(){
    $scope.months = []; // 'limpiar' arreglo
    var monthsRef = $firebase(new Firebase(firebaseRefFactory.getMonthsRef($scope.selectedYear))).$asArray();
    monthsRef.$watch(function(child_added){
      $scope.months.push({
        key: child_added.key
      });
    });
  };

  // cargar meses

  // variables auxiliares


  // metodos auxiliares
  $scope.getYears = function(){
    var yearsRef = $firebase(new Firebase(firebaseRefFactory.getCapturasYearsRef())).$asArray();
    yearsRef.$watch(function(child_added){
      $scope.years.push({
        key: child_added.key
      });
    });
  };


  // ng-click

  $scope.testArray = [];

  // ng-change
  $scope.getOficios = function(){
    $scope.testArray = [];
    var oficiosRef = $firebase(new Firebase(firebaseRefFactory.getRefToSave($scope.selectedYear, $scope.selectedMonth))).$asArray();
    oficiosRef.$watch(function(child_added){
      console.log(firebaseRefFactory.getTest(child_added.key));
      var temporaryOficioObj = $firebase(new Firebase(firebaseRefFactory.getTest(child_added.key))).$asObject();
      $scope.testArray.push(temporaryOficioObj);
      console.log($scope.testArray);
      $scope.myData = $scope.testArray;
    });

    /*
    $scope.elementos = $firebase(new Firebase(firebaseRefFactory.getOficiosRef($scope.selectedYear, $scope.selectedMonth))).$asArray();
    $scope.elementos.$watch(function(child_added){
      console.log(child_added);
    });


    $scope.elementos.$loaded().then(function(){
      $scope.myData =  $scope.elementos;
    });*/
  };

  // set-up ngGrid
  $scope.gridOptions = {
    data: 'myData',
    enablePinning: true,
    columnDefs: [
      { field: 'numero', displayName: 'Folio', width: 100, pinned: true},
      {field: 'fecha', displayName: 'Fecha', width: 175, pinned: true},
      { field: 'autoridad', displayName: 'Autoridad Correspondiente', width: 250},
      { field: 'tipoJuzgado', displayName: 'Tipo de Juzgado', width: 250 },
      { field: "tipoDeJuicio", displayName: 'Tipo de Juicio', width: 250 },
      { field: "municipio", displayName: 'Municipio', width: 150 },
      { field: "servicio", displayName: 'Servicio', width: 250 },
      { field: "areaDeServicio", displayName: 'Área de servicio', width: 250 },
      { field: "tipoDeServicio", displayName: 'Tipo de servicio', width: 250 },
      { field: "descripcion", displayName: 'Descripción', width: 250 }
    ],
    filterOptions: {filterText: '', useExternalFilter: false},
    showFilter: true,
    selectedItems: $scope.mySelections,
    multiSelect: false,
    beforeSelectionChange: function(row) {
      row.changed = true;
      return true;
    },
    afterSelectionChange: function (row, event) {
      if (row.changed){
        console.log("deal with row " + row.entity.numero);
        $scope.foo(row.entity.fecha, row.entity.numero);
        row.changed = false;
      }
    }
  };

  // onLoad methods
  $scope.getYears();


};
