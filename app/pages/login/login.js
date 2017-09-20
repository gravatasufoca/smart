console.info("login....")
require([
    'pages/login/controllers/loginController',
    'pages/login/services/loginService',
], function (app) {
    'use strict';

    return app;
});