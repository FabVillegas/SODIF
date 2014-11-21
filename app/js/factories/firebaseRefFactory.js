angular.module('sodif').factory('firebaseRefFactory', function(){
	return{
		getMainRef: function(){
			var url = 'https://sistema-de-oficios.firebaseio.com/';
			return url;
		},
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
