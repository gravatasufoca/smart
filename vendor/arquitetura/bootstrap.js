require([
    'domReady!',
    'msAppJs',
], function (document) {
    'use strict';
    console.info("bootstrap....")
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['mApp']);
    });
});
