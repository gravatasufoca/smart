require(['msAppJs'], function (app) {
    console.info("login.Controller...")

    app.controller('loginController', [
        '$scope',
        '$rootScope',
        '$timeout',
        'loginService',
        '$notifyService',
        "$state","autenticacaoService",
        function ($scope,
                  $rootScope,
                  $timeout,
                  loginService,
                  $notifyService,
                  $state,autenticacaoService) {


            /**
             * Dados do login e senha
             */
            $scope.formLogin = {
                email: null,
                password: null
            };

            /**
             * Metodo que efetua o login do usuario com base nas informacoes inseridas no formulario
             */
            $scope.login = function () {
                if (isDadosAcessoValido()) {

                    $notifyService.loading();

                    autenticacaoService.autenticar($scope.formLogin.email, $scope.formLogin.password)
                        .then(function (msSegurancaService) {

                            autenticacaoService.recuperarDadosUsuario()
                                .then(function (usuario) {

                                    $notifyService.close();

                                    if (window.geral.isEmpty(usuario.access_token)) {
                                        $cookieStore.put('isUsuarioAutenticado', false);
                                    } else {
                                        setUsuarioScope(usuario);
                                        $state.go("home")
                                    }
                                });
                        }, function (error) {
                            $notifyService.close();
                            $scope.showMsg('E', error.data.mensagens[0].texto);
                        });
                }
            };


            /**
             * Valida se os dados de acesso obrigatorios foram preenchidos
             */
            var isDadosAcessoValido = function () {
                if (window.geral.isEmpty($scope.formLogin.email)
                    || window.geral.isEmpty($scope.formLogin.password)) {
                    $scope.showMsg('E', "Dados obrigat\u00F3rios n\u00E3o informados");
                    $scope.formLogin.mostrarMsgErro = true;
                    return false;
                }

                return true;
            };

            function setUsuarioScope(usuario) {
                $rootScope.usuarioAutenticado = usuario;
            }



        }]);


    return app;
});