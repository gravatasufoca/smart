require(['msAppJs',
], function (app) {

    app.controller('manterController', [
        '$scope',
        '$rootScope',
        '$timeout',
        'colaboradorService',
        'apoioService',
        '$notifyService',
        "NgMap",
        "$stateParams", "$ngConfirm", "$state",'Upload',
        function ($scope,
                  $rootScope,
                  $timeout,
                  colaboradorService,
                  apoioService,
                  $notifyService,
                  NgMap,
                  $stateParams, $ngConfirm, $state,Upload) {


            $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams, error) {
                if ($stateParams.id) {
                    colaboradorService.recuperarColaborador($stateParams.id).then(function (resultado) {
                        $scope.colaborador = resultado.resultado;
                        if($scope.colaborador.cargo!=null){
                            $scope.colaborador.cargo.texto=$scope.colaborador.cargo.nome;
                        }
                        if($scope.colaborador.unidade!=null){
                            $scope.colaborador.unidade.texto=$scope.colaborador.unidade.nome;
                        }
                        montarCompetencias();
                        var blob = Upload.dataUrltoBlob($scope.colaborador.avatar?  "data:text/plain;base64," + $scope.colaborador.avatar:colaboradorService.avatar, "foto");
                        Upload.dataUrl(new File([blob], "foto"), false).then(function (url) {
                            $scope.file = url;
                        });
                    });
                }

                apoioService.recuperarTiposCompetencias().then(function (resultado) {
                    tipoCompetencias = resultado.resultado;
                });
                apoioService.recuperarTiposContato().then(function (resultado) {
                    $scope.tiposContatos = resultado.resultado;
                });

            });

            $scope.tiposContatos = [];
            $scope.file=[];
            $scope.icones=colaboradorService.iconesContato;
            /**
             * Dados do login e senha
             */
            $scope.colaborador = {
                id: null,
                nome: null,
                resumo: null,
                endereco: null,
                cargo: null,
                unidade: null,
                competencias: [],
                contatos: [],
            };

            var tipoCompetencias = [];

            $scope.competencias = [];
            $scope.googlekey = "AIzaSyANNPnS32ki7cbp5JbfEPlWG-f9slrQMTQ";


            $scope.loadCompetencias = function (query) {
                return tipoCompetencias;
            }

            var montarCompetencias = function () {
                angular.forEach($scope.colaborador.competencias, function (value, key) {
                    $scope.competencias.push(value.tipoCompetencia);
                });
            }

            $scope.enderecoMudou = function () {
                $scope.place = this.getPlace();
                $scope.map.setCenter($scope.place.geometry.location);
            }
            NgMap.getMap().then(function (map) {
                $scope.map = map;
            });


            $scope.novoContato = function () {
                var contato = {
                    tipoContato: null,
                    contato: null,
                    excluido:false
                };
                $scope.colaborador.contatos.push(contato);
            }


            $scope.salvarColaborador = function () {
                if (validaObrigatorios()) {

                    fixCompetencias();
                    colaboradorService.salvar($scope.colaborador,$scope.file).then(function (data) {
                        $notifyService.close();
                        if (data.mensagemSucesso != null) {
                            $scope.showMsg('S', data.mensagemSucesso);
                        } else {
                            mostrarErros(data.mensagens);
                        }

                        $state.go("colaborador", {});
                    }, function (e) {
                        $notifyService.close();
                        $scope.showMsg('E', e.data.mensagens[0].texto);
                    });
                }
            };

            var mostrarMensagens = function (mensagens) {
                angular.forEach(mensagens, function (value) {
                    $scope.showMsg('E', value);
                });
            };

            var fixCompetencias = function () {
                $scope.colaborador.competencias = [];
                if (!window.geral.isEmpty($scope.competencias)) {
                    angular.forEach($scope.competencias, function (value, key) {
                        $scope.colaborador.competencias.push({
                            id: null,
                            tipoCompetencia: value,
                            colaborador: null
                        });
                    });
                }
            }

            var validaObrigatorios = function () {
                if (window.geral.isEmpty($scope.colaborador.nome)
                    || window.geral.isEmpty($scope.colaborador.cargo)) {
                    $scope.showMsg('E', "Campos obrigat\u00F3rios não preechidos");
                    return false;
                }

                return true;
            }

            $scope.apagarContato = function (contato) {
                $scope.contato = contato;
                $ngConfirm({
                    title: 'Confirmar',
                    content: '<strong>Confirma a exclus\u00E3o</strong>',
                    scope: $scope,
                    buttons: {
                        sim: {
                            text: 'Sim',
                            btnClass: 'btn-warning',
                            action: function (scope, button) {
                                contato.excluido = true;
                                $scope.$apply();
                            }
                        },
                        nao: {
                            text: 'N\u00E3o',
                            btnClass: 'btn-default',
                            action: function (scope, button) {
                            }
                        }
                    }
                });
            }


            $scope.selecionaCargo=function (valor) {
                if(typeof valor!='string'){
                    $scope.colaborador.cargo=angular.copy(valor);
                }else{
                    $scope.colaborador.cargo={id:null,nome:valor,texto:valor};
                }
                delete $scope.colaborador.cargo.texto;
            };

            $scope.consultaCargo=function (nomeParcial) {
                if(nomeParcial && nomeParcial !== null){
                    nomeParcial = nomeParcial.toString();
                }

                if (nomeParcial !== ''){
                    return apoioService.recuperarCargos(nomeParcial)
                        .then(function (data){
                           return _.map(data.resultado,function (valor) {
                                valor.texto=valor.nome;
                                return valor;
                            });
                        });
                } else {
                    return [];
                }
            }



            $scope.selecionaUnidade=function (valor) {
                if(typeof valor!='string'){
                    $scope.colaborador.unidade=valor;
                }else{
                    $scope.colaborador.unidade={id:null,nome:valor,texto:valor};
                }
                delete $scope.colaborador.unidade.texto;
            };

            $scope.consultaUnidade=function (nomeParcial) {
                if(nomeParcial && nomeParcial !== null){
                    nomeParcial = nomeParcial.toString();
                }

                if (nomeParcial !== ''){
                    return apoioService.recuperarUnidades(nomeParcial)
                        .then(function (data){
                            return _.map(data.resultado,function (valor) {
                                valor.texto=valor.nome;
                                return valor;
                            });
                        });
                } else {
                    return [];
                }
            }

            $scope.uploadFile=function (file) {
                $scope.file=file;
            }

            $scope.fileBackground={};
            $scope.$watch("file",function () {
                if ($scope.file != null) {
                    if(typeof $scope.file =='string'){
                        $scope.fileBackground = {
                            'background-image': "url(" + $scope.file + ")",
                            'background-size': '315px 275px'
                        };
                    }else {
                        Upload.dataUrl($scope.file, false).then(function (url) {
                            console.info("url", url)
                            $scope.fileBackground = {
                                'background-image': "url(" + url + ")",
                                'background-size': '315px 275px'
                            };
                        });
                    }
                    if(!$scope.colaborador.avatar) {
                        $scope.labelBackground = {'color': 'black'};
                    }else{
                        $scope.labelBackground = {'color': 'white'};
                    }
                }else{
                    $scope.labelBackground={'color':'black'};
                    $scope.fileBackground={};
                }
            });

        }]);


    return app;
});