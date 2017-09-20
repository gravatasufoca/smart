define([
        'componentes/notify/notify',
        'controllers/alertController',
        'componentes/notify/services/alertService'
    ],
    function (notify) {

        'use strict';

        notify.directive('alert', ['$alertService', '$compile', function ($alertService, $compile) {
            return {
                restrict: 'EA',
                controller: 'alertController',
                replace: true,
                scope: true,
                link: function (scope, element, attrs, ctrl) {

                    //Atribuindo o ID do scope atual ao ELEMENTO
                    attrs.$set('id', scope.$id);

                    //Setando o container para o serviço de mensageria
                    $alertService.setContainer(scope.$id);

                    /**
                     * Quando o evento de mensageria for disparado, executo a exibição das
                     * mensagens no respectivo container/scope
                     */

                    scope.$on('_START_ALERT_', function (object, msgs, container) {

                        //Atribuindo as mensagens apenas ao respectivo scope.
                        if (scope.$id == container) {
                            if (scope.messages == null) {
                                scope.messages = [];
                            }

                            msgs.push.apply(msgs, scope.messages);

                            scope.messages = msgs;

                        }
                        var container = angular.element('#' + container);

                        var template = angular.element("<div ng-repeat='alert in messages' class='alert' ng-class='\"alert-\" + (alert.type || \"warning\")'>\n" +
                            "    <button type='button' class='close' ng-click='closeAlert(messages, $index)'>&times;</button>\n" +
                            "    <span ng-bind-html='alert.message'></span>\n" +
                            "</div>\n");

                        $compile(template)(scope);
                        container.html(template);
                    });

                    /*
                     * Limpando todos os alerts
                     */
                    scope.$on('_STOP_ALERT_', function () {
                        var _messagesTmp = [];
                        _messagesTmp = _messagesTmp.concat(scope.messages);
                        if (_messagesTmp.length > 0 && _messagesTmp[0] != undefined) {

                            angular.forEach(_messagesTmp, function (message, index) {
                                var indiceRemove = scope.messages.indexOf(message);

                                if (!message.persist)
                                    scope.messages.splice(indiceRemove, 1);
                            });
                        }
                    });

                }
            };
        }]);

        return notify;

    });

