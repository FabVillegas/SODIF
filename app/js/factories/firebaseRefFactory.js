angular.module('sodif').factory('firebaseRefFactory', function(){
	return{
		getMainRef: function(){
			var url = 'https://sistema-de-oficios.firebaseio.com/';
			return url;
		},
		getRefToSave: function(month,year){
			var url = 'https://sistema-de-oficios.firebaseio.com/' + year + '/' + month + '/';
			return url;
		}
	};
});
