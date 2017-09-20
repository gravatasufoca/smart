define([
        'controllers/appController',
        'pages/login/login'
    ],
    function (appController) {
        'use strict';
        try {
            console.info("mController.js...........")
            appController.controller('mController', ['$rootScope', '$scope', /*'autenticacaoService',*/ '$timeout', 'routeService', '$state',
                function ($rootScope, $scope, /*autenticacaoService,*/ $timeout, routeService, $state) {

                    $scope.app = appConfig;

                    $scope.edit = function () {
                        $scope.$notify.info('Editando');
                    };

                    $scope.remove = function (url) {
                        $scope.$notify.error('Remoção');
                    };

                    $scope.view = function () {
                        $scope.$notify.error('Visualizando');
                    };



                    var loginRoutes = [{
                        module: "login",
                        view: 'login',
                        controller: 'loginController',
                        text: 'Login'
                    },
                        {
                            module: 'login',
                            text: 'logout',
                            controller: 'loginController',
                            view: 'login'
                        }];

                     routeService.create(loginRoutes);

                    /*
                     * Recuperando as informações do usuário em caso de atualização da pagina
                     * 
                     */
                  /*  autenticacaoService.recuperarDadosUsuario().then(function (result) {
                        $timeout(function () {
                            $rootScope.usuarioAutenticado = result;
                            $rootScope.$apply();
                        });
                    });
                    */


                }]);
        }
        catch (e) {
            $log.error(e);
        }

        return appController;

    });