define(['msAppJs'], function (app) {
    'use strict';

    app.directive('exAutoComplete',['$timeout',
        function($timeout){

            function link(scope,element, a){

                scope.completar = scope.consultaFn;


                scope.selecionar = function ($item, $model, $label, $event) {
                    scope.valor = $item;
                };


                var change = function () {
                    if (scope.onChangeFn) {
                        scope.onChangeFn(scope.valor);
                    }
                };

                scope.verificaSelecao=function () {
                    if (scope.valor != null && (typeof scope.valor == 'string' || scope.valor.id != null)) {
                        change();
                    }
                }


            }
            return {
                restrict: 'E',
                replace: true,
                link: link,
                template: function (e, a) {
                    var id = Math.random().toString(36).substring(10);

                    var template =
                        '<div class="form-group has-feedback "> ' +
                        '	<input id="' + id + '" type="text" ' +
                        '		ng-model="valor" maxlength="250"' +
                        '		placeholder="{{placeHolder}}"  ' +
                        '		typeahead-wait-ms="200"  ' +
                        '		typeahead-min-length="2"  ' +
                        '		typeahead-editable="true"  ' +
                        '		ng-blur="verificaSelecao()"  ' +
                        '		uib-typeahead="obj as (obj.texto) for obj in completar($viewValue)"  ' +
                        '		typeahead-on-select="selecionar($item)"  ' +
                        '		class="form-control"> ' +
                        '</div> ';

                    return template;
                },
                scope: {
                    valor: "=",
                    placeHolder:"=",
                    onChangeFn: "=",
                    consultaFn: "=",
                    obrigatorio: "="
                }
            };
        }])
    return app;
});