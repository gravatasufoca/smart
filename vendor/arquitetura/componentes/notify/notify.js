define([
        'angular',
        'jQueryNoty',
        'jQueryNotyLayoutsTopCenter',
        'jQueryNotyThemesDefault'
    ],
    function () {
        'use strict';
        try {
            var Notify = angular.module('notify', []);

            /*
             * Injecting into $rootScope
             */
            Notify.run(['$rootScope', '$notifyService', '$alertService', function ($rootScope, $notifyService, $alertService) {
                $rootScope.$notify = $notifyService;
                $rootScope.$alert = $alertService;

                $rootScope.closeAlert = function (messages, index) {
                    messages.splice(index, 1);
                };

            }]);

            return Notify;
        }
        catch (e) {
            $log.error(e);
        }

    });
   