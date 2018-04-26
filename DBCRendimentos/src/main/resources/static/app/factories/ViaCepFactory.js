angular.module('appRendimentos')
    .factory('viacepFactory', function($http) {

    var viacepFactory = {};

    viacepFactory.buscaCep = function (cep) {
    	var x = 0;
    	if(cep != null){
    		return $http({ method: 'GET',
            	url: 'http://viacep.com.br/ws/'+cep+'/json/' });
    	} 
    };
    return viacepFactory;
    });