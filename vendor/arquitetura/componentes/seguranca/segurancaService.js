define([
        'componentes/seguranca/seguranca',
        // 'utils/sha256'
    ],
    function (seguranca) {

        'use strict';

        seguranca.factory('segurancaService', ['$http', '$cookieStore', '$q', '$rootScope', "$state", function ($http, $cookieStore, $q, $rootScope, $state) {

            /**
             * Registrei um evento para ser possivel destruir a sessao em caso de erro 401 ou token invalido!
             */
            $rootScope.$on('destruirSessao', function (event, valor) {
                destruirSessao();
                $state.go("login");
            });

            var _usuarioAutenticado;

            var setUsuario = function (usuarioAutenticado) {
                _usuarioAutenticado = usuarioAutenticado;
            };

            var getUsuario = function () {
                return _usuarioAutenticado;
            };

            var setUsuarioAutenticado = function (value) {
                if (true === value) {
                    $cookieStore.put('isUsuarioAutenticado', value);
                } else {
                    destruirSessao();
                }
            };

            var setTempoLimite = function (value) {
                try {
                    var tempoLimite = new Date(getTempoInicial() + value * 60000);
                    $cookieStore.put('tempoLimite', tempoLimite.getTime());
                }
                catch (e) {
                    $rootScope.$msNotify.error(e);
                }
            };

            var getTempoLimite = function () {
                return $cookieStore.get('tempoLimite');
            };

            var isUsuarioAutenticado = function () {
                return $cookieStore.get('isUsuarioAutenticado');
            };

            var possuiAcesso = function (rolesPermitidas) {
                var deferred = $q.defer();
                var usuario = getUsuario();
                if (typeof usuario != 'undefined') {
                    var possui = false;
                    if (rolesPermitidas) {
                        angular.forEach(usuario.roles, function (val) {
                            if (rolesPermitidas.indexOf(val) != -1) {
                                possui = true;
                            }
                        });

                        if (rolesPermitidas.indexOf('*') != -1) {
                            possui = true;
                        }
                    }

                    if (possui) {
                        deferred.resolve(this);
                    }
                    else {
                        deferred.reject('Usuário sem permissão de acesso');
                    }

                    return deferred.promise;
                }

                return deferred.promise;
            };


            var setTempoInicial = function (value) {
                $cookieStore.put('tempoInicial', value);
            };

            var getTempoInicial = function () {
                return $cookieStore.get('tempoInicial');
            };

            var destruirSessao = function () {
                $cookieStore.remove('tempoInicial');
                $cookieStore.remove('tempoLimite');
                $cookieStore.remove('isUsuarioAutenticado');
                $cookieStore.remove('msToken');
                $http.defaults.headers.common['Authorization'] = "";
                _usuarioAutenticado = undefined;
            };


            var setToken = function (token) {
                $cookieStore.put('msToken', token);
            };

            var getToken = function () {
                return $cookieStore.get('msToken');
            };

            return {
                isUsuarioAutenticado: isUsuarioAutenticado,
                setUsuarioAutenticado: setUsuarioAutenticado,
                setUsuario: setUsuario,
                setToken: setToken,
                getToken: getToken,
                getUsuario: getUsuario
            }

        }]);

        return seguranca;

    });