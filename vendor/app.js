define([
        'controllers/mController',
        "restangular",
        'angularSanitize',
        'angularNgCookies',
        'componentes/route/route',
        'componentes/notify/services/notifyService',
        'componentes/notify/services/alertService',
        'componentes/route/services/routeService',
        'componentes/notify/directives/alert',
        'componentes/seguranca/autenticacaoService',
        'utils/functions',
        "ngtagsinput",
        'angularNgTable',
        'angularUiBootstrap',
        'angularUiBootstrap2',
        'ngMap', 'angularConfirm','ngFileUpload','ngFileUploadShim'
    ],
    function () {
        'use strict';

        /*
         * Create the module
         */
        console.info("mApp...")
        var app = angular.module('mApp', ["appController", "route",
            'restangular',
            'notify',
            "ngTagsInput",
            'ngTable',
            'ngMap',
            'ngSanitize', 'cp.ngConfirm','ui.bootstrap','ngFileUpload','seguranca'
        ]);

        app.run(function ($rootScope, routeService) {
            app.routeService = routeService;

        });

        return app;

    }
);
