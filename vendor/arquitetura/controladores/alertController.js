define([
        'controllers/appController'
    ],
    function (appController) {
        'use strict';
        try {

            appController.controller('alertController', ['$scope', '$attrs', function ($scope, $attrs) {
                $scope.closeable = 'close' in $attrs;
            }]);
        }
        catch (e) {
            $log.error(e);
        }

        return appController;

    });