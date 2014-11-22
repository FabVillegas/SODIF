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
		},/* de aqui para abajo ya no sirven */
		getOficiosRef: function(year, month){
			var url = 'https://sistema-de-oficios.firebaseio.com/oficios/' + year + '/' + month + '/';
			return url;
		},
		getRefToSave: function(year,month){
			var url = 'https://sistema-de-oficios.firebaseio.com/capturas/' + year + '/' + month + '/';
			return url;
		},
		getYearsRef: function(){
			var url = 'https://sistema-de-oficios.firebaseio.com/oficios';
			return url;
		},
		getMonthsRef: function(year){
			var url = 'https://sistema-de-oficios.firebaseio.com/capturas/' + year + '/';
			return url;
		},
		getOficioRef: function(year, month, number){
			var url = 'https://sistema-de-oficios.firebaseio.com/oficios/' + year + '/' + month + '/' + number;
			return url;
		},
		getCapturasYearsRef: function(){
			var url = 'https://sistema-de-oficios.firebaseio.com/capturas/';
			return url;
		},
		getTest: function(number){
			var url = 'https://sistema-de-oficios.firebaseio.com/oficios/' + number + '/';
			return url;
		},
		getContadoresRef: function(){
			var url = 'https://sistema-de-oficios.firebaseio.com/contadores/';
			return url;
		}
	};
});
