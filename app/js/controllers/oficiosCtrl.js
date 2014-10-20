angular.module('sodif').controller('oficiosCtrl', oficiosCtrl);

oficiosCtrl.$inject = ['$scope', '$state'];

function oficiosCtrl($scope, $state){

  $scope.goOficios = function(){
    state.go('oficios');
  };

  $scope.gridOptions = {
    data: 'myData',
    enablePinning: true,
    columnDefs: [
      { field: "Folio", width: 100, pinned: true },
      { field: "Oficio", width: 100, pinned: true },
      { field: "Autoridad", width: 150 },
      { field: "TipoDeJuzgado", width: 150 },
      { field: "Autoridad", width: 150 },
      { field: "Juzgado", width: 150 },
      { field: "TipoDeServicio", width: 150 },
      { field: "Servicios", width: 150 },
      { field: "Municipio", width: 150 },
      { field: "TipoDeJuicio", width: 150 },
      { field: "AreaDeServicio", width: 150 }
    ],
    filterOptions: {filterText: '', useExternalFilter: false},
    showFilter: true
  };

  $scope.myData = [
    { Folio: "05648", Oficio: "458/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05649", Oficio: "459/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05650", Oficio: "460/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05651", Oficio: "461/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05652", Oficio: "462/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05653", Oficio: "463/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05654", Oficio: "464/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05655", Oficio: "465/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05656", Oficio: "466/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05657", Oficio: "467/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05658", Oficio: "468/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05659", Oficio: "469/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05660", Oficio: "470/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05661", Oficio: "471/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05662", Oficio: "472/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05663", Oficio: "473/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05664", Oficio: "474/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05665", Oficio: "475/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05666", Oficio: "476/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05667", Oficio: "477/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05668", Oficio: "478/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"},
    { Folio: "05669", Oficio: "479/2014", Autoridad: "P.J.F.", TipoDeJuzgado: "Penales", Juzgado: "JP03", TipoDeServicio: "Asistencias", Servicios: "Coadyuvancia", Municipio: "Monterrey", TipoDeJuicio: "Causa Penal", AreaDeServicio: "Legal"}
  ];


};
