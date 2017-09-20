define(['msAppJs'],
    function (app) {
        app.factory("loginService", ['resourceRest',
            '$rootScope',
            function (resourceRest,
                      $rootScope) {

                var selecionarPerfil = function (perfil) {
                    return resourceRest.login.customPOST(perfil, 'perfil');
                };

                return {
                    selecionarPerfil: selecionarPerfil
                };

            }]);

        return app;
    });