define([
        'componentes/notify/notify'
    ],
    function (notify) {

        'use strict';

        notify.factory('$notifyProvider', function () {
            try {
                return function () {
                    return noty(arguments[0]);
                };
            }
            catch (e) {
                $log.error(e);
            }
        });

        return notify;

    });