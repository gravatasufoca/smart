define(['msAppJs'],
    function (app) {
        app.factory("apoioService", ['resourceRest',
            '$rootScope',
            function (resourceRest,
                      $rootScope) {


                var recuperarTiposCompetencias=function () {
                    return resourceRest.apoio.one("tipoCompetencias").getList();
                };

                var recuperarTiposContato=function () {
                    return resourceRest.apoio.one("tipoContatos").getList();
                };

                var recuperarCargos=function (nome) {
                    return resourceRest.apoio.one("cargos",nome).getList();
                };

                var recuperarUnidades=function (nome) {
                    return resourceRest.apoio.one("unidades",nome).getList();
                };

                return {
                    recuperarTiposCompetencias:recuperarTiposCompetencias,
                    recuperarTiposContato:recuperarTiposContato,
                    recuperarUnidades:recuperarUnidades,
                    recuperarCargos:recuperarCargos
                };

            }]);

        return app;
    });