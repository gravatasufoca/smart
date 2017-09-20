define(['msAppJs'], function (app) {
    app.factory("resourceRest",
        ['Restangular', '$rootScope',
            function (Restangular, $rootScope) {
                Restangular.setRestangularFields({
                    selfLink: 'meta.href'
                });

                //Quando o retorno se trata de um array de dentro do metadado, explicar isso para o restanga
                Restangular.setResponseInterceptor(function (data, operation, what, url, response, deferred) {
                    var novoResponse = {};
                    console.info("data",data)
                    console.info("operation",operation)
                    if (data && operation === "getList") {
                        novoResponse = [];
                        novoResponse.resultado = (data.resultado) ? data.resultado : [];
                        novoResponse.mensagens = (data.mensagens) ? data.mensagens : null;
                    } else {
                        novoResponse = data;
                    }

                    return novoResponse;
                });

                return {
                    colaboradores: Restangular.all(appConfig.appContextRoot + "/api/colaborador"),
                    apoio: Restangular.all(appConfig.appContextRoot + "/api/apoio"),

                };
            }
        ]);
    return app;
});