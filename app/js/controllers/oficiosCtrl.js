angular.module('sodif').controller('oficiosCtrl', oficiosCtrl);

oficiosCtrl.$inject = ['$scope', '$firebase', '$state', '$stateParams', '$location', 'firebaseRefFactory', 'dateFactory'];

function oficiosCtrl($scope, $firebase, $state, $stateParams, $location, firebaseRefFactory, dateFactory){

  /* variables necesarias */
  $scope.myData = [];
  $scope.years = [];
  $scope.months = [];
  $scope.oficiosArray = [];
  $scope.yearsRef = '';
  $scope.monthsRef = '';
  $scope.oficios = [];
  $scope.mySelections = [];
  /* metodos ng-change*/
  $scope.getYears = function(){ /* Traer los años que tienen capturas para delimitar que oficios traer y aligerar carga */
    $scope.yearsRef = $firebase(new Firebase(firebaseRefFactory.goToRef('capturas'))).$asArray();
    $scope.yearsRef.$watch(function(child_added){
      $scope.years.push({
        key: child_added.key
      });
    });
  };

  $scope.getMonths = function(){ /* tras seleccionar año, se traen los meses que contengan capturas */
    $scope.months = []; /* 'limpiar' arreglo para que los elementos no se repitan en caso de cambiar año */
    $scope.monthsRef = $firebase(new Firebase(firebaseRefFactory.getCapturasMonthsRef($scope.selectedYear))).$asArray();
    $scope.monthsRef.$watch(function(child_added){
      $scope.months.push({
        key: child_added.key
      });
    });
  };

  /* metodos ng-click */
  $scope.goDetalle = function(fecha, numero){
    if (numero != undefined){
      var year = dateFactory.getYear(fecha);
      var month = dateFactory.getMonth(fecha);
      /* Destruir arreglos y objetos antes de dejar esta view */
      $scope.yearsRef.$destroy();
      $scope.monthsRef.$destroy();
      $scope.oficiosArray.$destroy();
      $location.path('/oficios/' + year + '/' + month + '/' + numero);
    }
    else{
      // do nothing
    }
  };

  /* setup de ngGrid */
  /* plugin de documentacion del repo de ngGrid que permite realizar los filtros por columna */
  var filterBarPlugin = {
    init: function(scope, grid) {
      filterBarPlugin.scope = scope;
      filterBarPlugin.grid = grid;
      $scope.$watch(function() {
        var searchQuery = "";
        angular.forEach(filterBarPlugin.scope.columns, function(col) {
          if (col.visible && col.filterText) {
            var filterText = (col.filterText.indexOf('*') == 0 ? col.filterText.replace('*', '') : "^" + col.filterText) + ";";
            searchQuery += col.displayName + ": " + filterText;
          }
        });
        return searchQuery;
      },
      function(searchQuery) {
        filterBarPlugin.scope.$parent.filterText = searchQuery;
        filterBarPlugin.grid.searchProvider.evalFilter();
      });
    },
    scope: undefined,
    grid: undefined,
  };
  /* Definicion de parametros de ngGrid */
  $scope.gridOptions = {
    data: 'myData',
    enablePinning: true,
    columnDefs : [
      { field: 'numero', displayName: 'Folio', width: 100, pinned: true, headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: 'fecha', displayName: 'Fecha', width: 175, pinned: true, headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: 'autoridad', displayName: 'Autoridad Correspondiente', width: 250, headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: 'tipoJuzgado', displayName: 'Tipo de Juzgado', width: 250 , headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: "tipoDeJuicio", displayName: 'Tipo de Juicio', width: 250 , headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: "municipio", displayName: 'Municipio', width: 150 , headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: "servicio", displayName: 'Servicio', width: 250 , headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: "areaDeServicio", displayName: 'Área de servicio', width: 250 , headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: "tipoDeServicio", displayName: 'Tipo de servicio', width: 250 , headerCellTemplate: 'views/filterHeaderTemplate.html'},
      { field: "descripcion", displayName: 'Descripción', width: 250 , headerCellTemplate: 'views/filterHeaderTemplate.html'}
    ],
    plugins: [filterBarPlugin],
    headerRowHeight: 60, /* altura para que la barra de filtro aparezca */
    selectedItems: $scope.mySelections,
    multiSelect: false,
    plugins: [filterBarPlugin], /* integra plugin con proceso de filtros */
    beforeSelectionChange: function(row) { /* verifica que a la seleccion el indice del elemento seleccionado ha cambiado */
      row.changed = true;
      return true;
    },
    afterSelectionChange: function (row, event) { /* elimina el doble callback al cambiar de un elemento seleccionado a otro, teniendo indice del que se le da click despues */
      if (row.changed){
        console.log("deal with row " + row.entity.numero);
        $scope.goDetalle(row.entity.fecha, row.entity.numero); /* metodo para ir a detalle de oficio */
        row.changed = false;
      }
    }
  };

  // ng-change
  $scope.getOficios = function(){ /* Traer los oficios desde Firebase */
    $scope.oficios = [];
    $scope.oficiosArray = $firebase(new Firebase(firebaseRefFactory.getRefToSaveCaptura($scope.selectedYear, $scope.selectedMonth))).$asArray();
    $scope.oficiosArray.$watch(function(child_added){
      var temporaryCapturaObj = $firebase(new Firebase(firebaseRefFactory.getCaptura($scope.selectedYear, $scope.selectedMonth, child_added.key))).$asObject();
      temporaryCapturaObj.$loaded().then(function(child){
        console.log(child.$value);
        if(child.$value){
          var temporaryOficioObj = $firebase(new Firebase(firebaseRefFactory.getOficio(child_added.key))).$asObject();
          $scope.oficios.push(temporaryOficioObj);
          $scope.myData = $scope.oficios;
        }
      });

    });
  };

  // on loaded view methods
  $scope.getYears();
};
