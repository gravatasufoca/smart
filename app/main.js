var appConfig = {
    appContextRoot:"smart",
    controllersRoute: '/api/v1',
    login:{
        url: "api/v1/login",
        url_usuario: 'api/v1/login/usuario',
    },
    logout: {
        url: 'api/v1/logout'
    },
};


requirejs.config({
    paths: {
        'mainJs': ['../vendor/main'],
        'msAppJs': ['../vendor/app'],

    },
    shim: {
        'msAppJs': {
            deps: ['mainJs']
        }
    },
    deps: ['mainJs', 'msAppJs'],
});

require(['msAppJs','../app/mainController'
], function (app) {
    'use strict';


    return app;
});
