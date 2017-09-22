require(['msAppJs'], function (app) {
    console.info("login.Controller...")

    app.controller('loginController', [
        '$scope',
        '$rootScope',
        '$timeout',
        'loginService',
        '$notifyService',
        "$state","autenticacaoService","$ngConfirm","NgTableParams",
        function ($scope,
                  $rootScope,
                  $timeout,
                  loginService,
                  $notifyService,
                  $state,autenticacaoService,$ngConfirm,NgTableParams) {

            /**
             * Dados do login e senha
             */
            $scope.formLogin = {
                email: "bruno@teste.com.br",
                password: "teste"
            };

            $scope.perfis=[];

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
                                    console.info(usuario);
                                    if(!window.geral.isEmpty(usuario.perfis) && usuario.perfis.length > 1) {
                                        // $cookieStore.put('isUsuarioAutenticado', false);
                                        autenticacaoService.setUsuarioAutenticado(false);
                                        $scope.exibirPerfis(usuario.perfis);
                                    } else {
                                        setUsuarioScope(usuario);
                                        autenticacaoService.setUsuarioAutenticado(true);
                                        $state.go("home");
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


            /**
             * Seleciona um perfil na tela e verifa se o mesmo tem esferas selecionaveis
             */
            $scope.selecionarPerfil = function(perfilAcesso) {
                loginService.selecionarPerfil(perfilAcesso)
                    .then(function(resposta) {
                        $notifyService.close();
                        setUsuarioScope(resposta);
                        autenticacaoService.setUsuarioAutenticado(true);
                        $state.go("home");
                    });

            };

            /**
             * Exibe uma modal com os perfis disponiveis para escolha do usuario
             */
            $scope.exibirPerfis = function (perfis) {
                $scope.perfis=perfis;

                $scope.tabelaPerfil = new NgTableParams({
                    page: 1,
                    count: 5
                },{
                    dataset:perfis
                });

                $scope.confirm=$ngConfirm({
                    title:"Escolha o aparelho",
                    contentUrl : 'modalEsfera', //esta dentro de login.tpl.html
                    scope:$scope
                });

            };



        }]);


    return app;
});