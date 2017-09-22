define([
        'componentes/seguranca/segurancaService',
        'utils/sha256'
    ],
        function(seguranca) {

	'use strict';

	seguranca.factory('autenticacaoService', ['$rootScope', '$cookieStore', '$q', 'segurancaService', '$http', '$timeout', 
	                                              function($rootScope, $cookieStore, $q, segurancaService, $http, $timeout) {

		/*
		 * Private method
		 */
		var recuperarDadosUsuario = function() {

			var deferred = $q.defer();
			var token = segurancaService.getToken();
			if(segurancaService.isUsuarioAutenticado()) { 

				if(segurancaService.getUsuario())
					deferred.resolve(segurancaService.getUsuario());
				else {
					$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
					$http.get(appConfig.login.url_usuario, {token: token})
					.then(function(response){
						$timeout(function() {
							segurancaService.setUsuario(response.data);
							deferred.resolve(segurancaService.getUsuario());
						}, true);
					}, function(reason) {
						$rootScope.$broadcast('destruirSessao');
						deferred.reject(reason);
					});
				}
			} else {
				deferred.reject('Usuário não autenticado.');
			}

			return deferred.promise;

		};

	  var autenticar = function(email, senha) {
		  var deferred = $q.defer();
		  var senhaCrypto = CryptoJS.SHA256(senha).toString();

		  var credentials = {
			  "grant_type" : 'password',
              "client_id" : 'clientAngularMS',
              "client_secret" : 'secret',
              "username" : email,
              "password" : senha
		  };
		  $http({
			  url : appConfig.login.url,
			  method : 'POST',
			  data : credentials
		  }).then(function(response) {
			  if(response.data.resultado.status=="success") {
				  var token = response.data.resultado.access_token;
				  if(token!=null) {
                      segurancaService.setToken(token);
                      if (response.data != null && response.data.resultado != null) {
                          segurancaService.setUsuario(response.data.resultado.usuario);
                      }
                      segurancaService.setUsuarioAutenticado(true);
                      deferred.resolve(segurancaService);
                  }else{
				  	deferred.reject();
				  }
			  }else{
				  deferred.reject(response.data.resultado.message);
			  }
		  }, function(reason){
			  deferred.reject(reason);
		  });

		  return deferred.promise;
	  };

		var sair = function() {
			try{
				var deferred = $q.defer();

				var param = {
						token : segurancaService.getToken()
				};

                $http.defaults.headers.common['Authorization'] = 'Bearer ' + segurancaService.getToken();
                $http({
					url : appConfig.logout.url,
					method : 'GET',
					params : param
				}).success(function(data, status, headers, config) {
					segurancaService.setUsuarioAutenticado(false);
					deferred.resolve(segurancaService);
				});

				return deferred.promise;
			}
			catch(e) {
				$rootScope.$alert.error(e);
			}
		};

		var setUsuarioAutenticado=function (autenticado) {
            segurancaService.setUsuarioAutenticado(autenticado);
        };

		return {
			autenticar: autenticar,
			sair: sair,
			recuperarDadosUsuario: recuperarDadosUsuario,
			setUsuarioAutenticado:setUsuarioAutenticado
		}

	}]);

	return seguranca;

});