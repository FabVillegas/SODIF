angular.module('sodif').factory('firebaseRefFactory', function(){
	return{
		getMainRef: function(){
			var url = 'https://sistema-de-oficios.firebaseio.com/';
			return url;
		},
		getRefToSaveOficio: function(){
			var url = this.getMainRef() + 'oficios/';
			return url;
		},
		getRefToSaveCaptura: function(year, month){
			var url = this.getMainRef() + 'capturas/' + year + '/' + month + '/';
			return url;
		},
		getContadorOficiosRef: function(year, month){
			var url = this.getMainRef() + 'contadores/' + year + '/' + month + '/totalOficios';
			return url;
		},
		getContadorMenoresRef: function(year, month){
			var url = this.getMainRef() + 'contadores/' + year + '/' + month + '/totalMenores';
			return url;
		},
		getContadorAutoridadRef: function(year, month, autoridad){
			var url = this.getMainRef() + 'contadores/' + year + '/' + month + '/autoridad/' + autoridad + '/contAutoridad/';
			return url;
		},
		getContadorJuzgadoRef: function(year, month, autoridad, juzgado){
			var url = this.getMainRef() + 'contadores/' + year + '/' + month + '/autoridad/' + autoridad + '/' + juzgado;
			return url;
		},
		getContadorJuiciosRef: function(year, month, juicio){
			var url = this.getMainRef() + 'contadores/' + year + '/' + month + '/juicio/' + juicio;
			return url;
		},
		getContadorMunicipiosRef: function(year, month, municipio){
			var url = this.getMainRef() + 'contadores/' + year + '/' + month + '/municipio/' + municipio;
			return url;
		},
		goToRef: function(path){
			var url = this.getMainRef() + path + '/';
			return url;
		},
		getCapturasMonthsRef: function(year){
			var url = this.goToRef('capturas') + year + '/';
			return url;
		},
		getOficio: function(number){
			var url = this.getRefToSaveOficio() + number + '/';
			return url;
		},
		getCaptura: function(year, month, number){
			var url = this.getRefToSaveCaptura(year,month) + number;
			return url;
		},
		getContadoresRef: function(){
			var url = this.getMainRef() + 'contadores/';
			return url;
		},
	};
});
