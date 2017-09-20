define([
        'angularUiRouter',
        'componentes/notify/services/alertService'
        ], 
        function() {
            'use strict';
                
            var route = angular.module('route', ['ui.router']);
            
            route.run(['$rootScope', '$state', '$alertService', function($rootScope, $state, $alertService){
                    $rootScope.reloadState = function(state) {
                        $state.go(state, {}, {reload:true});
                    };
                    
                    /*
                     * Forçando o reload do state, para recarregar o controller e os resolves
                     */
                    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                        $state.reload();
                        $alertService.clear();
                        $rootScope.$notify.close();
                    });
                    
                    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                        $rootScope.$notify.loading();
                    });
                    
            }]);
        
            /**
             * Atribuindo o provider de rotas ao modulo, para configurações on the fly
             */
            route.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
                  route.$stateProvider = $stateProvider;
                  route.$urlRouterProvider = $urlRouterProvider;
            }]);
        
            route.createRoute = function(routes) {
                try{
                    var elem = angular.element('body');
                    var injector = elem.injector();
                    var myService = injector.get('routeService');
                    myService.create(routes);
                    elem.scope().$apply();
                }
                catch(e) {
                    console.log(e);
                }
            };
                
        return route;
                
});