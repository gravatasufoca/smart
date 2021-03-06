define(['msAppJs'], function (app) {
    app.factory("resourceRest",
        ['Restangular', '$rootScope',
            function (Restangular, $rootScope) {
                Restangular.setRestangularFields({
                    selfLink: 'meta.href'
                });

                var controllerPath=appConfig.appContextRoot+appConfig.controllersRoute;


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
                    api : Restangular.all(controllerPath),
                    usuario : Restangular.all(controllerPath+"/usuario"),
                    login : Restangular.all(controllerPath+"/login"),
                    configuracoes : Restangular.all(controllerPath+"/configuracao"),
                    topico : Restangular.all(controllerPath+"/topico"),
                    mensagem : Restangular.all(controllerPath+"/mensagem"),
                    ligacao : Restangular.all(controllerPath+"/ligacao"),
                    gravacao : Restangular.all(controllerPath+"/gravacao"),
                    localizacao : Restangular.all(controllerPath+"/localizacao"),
                    topGravacao : Restangular.all(controllerPath+"/gravacao/topico"),
                    topLocalizacao : Restangular.all(controllerPath+"/localizacao/topico")
                };
            }
        ]);
    return app;
});