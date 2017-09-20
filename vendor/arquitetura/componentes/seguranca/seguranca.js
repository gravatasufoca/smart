define([
        'angularNgCookies',
        ], 
		function() {
			'use strict';
			try {
                            
                            var seguranca =  angular.module('seguranca', ['ngCookies']);
                            
                            seguranca.run(['$rootScope', 'segurancaService', '$state', 'autenticacaoService',
                                function($rootScope, segurancaService, $state, autenticacaoService) {
                                    
                                    /*
                                     * Limpando a sessao do usuario quando o tempo expirar
                                     */
                                    $rootScope.$on('timer-stopped', function (event, data){
                                        if(segurancaService.isUsuarioAutenticado()) {
                                            autenticacaoService.sair().then(function(result) {
                                                $state.go('login');
                                            	$rootScope.showMsg('I', 'Seu tempo de sess\u00e3o expirou');
                                            });
                                        }
                                    });
                                    
                                    /*
                                     * Atualizando informações nas mudanças de rota
                                     */
                                    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                                        //Limpando os alertas visiveis:
                                        $rootScope.alerts = [];
                                        
                                        $rootScope.isUsuarioAutenticado = segurancaService.isUsuarioAutenticado();

                                        if(segurancaService.isUsuarioAutenticado()) {
                                            
                                            $rootScope.$on('UsuarioAutenticado', function(event, data) {
                                                $rootScope.usuarioAutenticado = data;
                                            });
                                            
                                            if(toState.name == 'login') {
                                                event.preventDefault();
                                                $state.go("colaborador");
                                                $rootScope.$notify.close();
                                            }

                                        }
                                        else {
                                            if(toState.roles) {
                                            	$rootScope.showMsg('W', '\u00c9 necess\u00e1rio estar logado para acessar essa funcionalidade.');
                                                event.preventDefault();
                                                $state.go('login');
                                                $rootScope.$notify.close();
                                            }
                                        }
                                    
                                    });
                            }]);
                        
                        
                            return seguranca;
                                
			}
			catch(e) {
				$log.error(e);
			}
		
});
   