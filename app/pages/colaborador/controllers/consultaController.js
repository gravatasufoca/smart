define(['msAppJs'], function (app) {

    app.controller('consultaController', [
        '$scope',
        '$rootScope',
        '$timeout',
        'colaboradorService',
        '$notifyService',
        "$state", "NgTableParams", "$q",'Upload',
        function ($scope,
                  $rootScope,
                  $timeout,
                  colaboradorService,
                  $notifyService,
                  $state, NgTableParams, $q,Upload) {


            $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams, error) {

            });

            $scope.pesquisa={}

            $scope.consultar=function () {
                if(window.geral.isEmpty($scope.pesquisa.criterio)){
                    $scope.showMsg('E', "Crit\u00E9rio de pesquisa n\u00E3o informado");
                }else{
                    $scope.tabela.reload();
                }
            }

            $scope.tabela = new NgTableParams({
                page:1,
                count:10
            }, {
                getData: function (params) {
                    $notifyService.loading();
                    return colaboradorService.pesquisar(params.page(),$scope.pesquisa.criterio).then(function (resultado) {
                        params.total(resultado.resultado.length);
                        var data=fixImage(resultado.resultado);
                        $notifyService.close();
                        return data;
                    });
                },
                counts: [], // hide page counts control
                total: 1,  // value less than count hide pagination
            });

            var fixImage=function (colaboradores) {

               return _.map(colaboradores,function (colaborador) {
                    if(colaborador.avatar){
                        var blob= Upload.dataUrltoBlob("data:text/plain;base64,"+colaborador.avatar,"foto");

                        Upload.dataUrl(new File([blob], "foto"), false).then(function(url){
                            colaborador.file=url;
                            colaborador.avatar=null;
                        });
                    }else{
                        colaborador.file=colaboradorService.avatar;
                    }
                    return colaborador;
                })
            }


        }]);


    return app;
});