if (!appConfig) {
    console.log('Não foi definido um configurador da aplicação.');
    //return;
}
var sufixo = '.min';
var bust = (new Date()).getTime();
var angularVersion = "1.2.8";

requirejs.config({
    urlArgs: "bust=" + bust,
    paths: {
        'jQuery': ['../vendor/jquery/jquery' + sufixo],
        'angular': ['../vendor/angularjs/angular' + sufixo],
        'angularSanitize': ['../vendor/angularjs/angular-sanitize' + sufixo],
        'angularNgCookies': ['../vendor/angularjs/angular-cookies' + sufixo],
        'angularUiBootstrap': ['../vendor/angular-ui-bootstrap/ui-bootstrap-tpls' + sufixo,'../vendor/angular-ui-bootstrap/ui-bootstrap' + sufixo],
        'angularUiBootstrap2': ['../vendor/angular-ui-bootstrap/ui-bootstrap' + sufixo],
        'restangular': ['../vendor/restangular/restangular'],
        'underscore': ['../vendor/underscore/underscore' + sufixo],
        'lodash': ['../vendor/lodash/lodash.core'],
        'angularUiRouter': ['../vendor/angular-ui-router/angular-ui-router' + sufixo],
        'componentes': ['../vendor/arquitetura/componentes'],
        'bootstrap': ['../vendor/arquitetura/bootstrap'],
        'domReady': ['../vendor/requirejs/domReady' + sufixo],
        'jQueryNoty': ['..//vendor/jquery-noty/jquery.noty.packaged' + sufixo],
        'jQueryNotyLayoutsTopCenter': ['..//vendor/jquery-noty/layouts/topCenter'],
        'jQueryNotyLayouts': ['..//vendor/jquery-noty/layouts'],
        'jQueryNotyThemesDefault': ['../vendor/jquery-noty/themes/default'],
        'controllers' : ['../vendor/arquitetura/controladores'],
        'utils' : ['../vendor/arquitetura/utils'],
        'pages':['../app/pages'],
        'ngtagsinput':['../vendor/tagsinput/ng-tags-input'+sufixo],
        'ngMap':['../vendor/angular-maps/ng-map'+sufixo],
        async: '../vendor/requirejs/async',
        'angularNgTable':['../vendor/angular-ng-tables/ng-table' + sufixo],
        'angularConfirm':['../vendor/angular-confirm/angular-confirm'],
        'ngFileUpload':['../vendor/ng-file-upload/ng-file-upload'+sufixo,'../vendor/ng-file-upload/ng-file-upload-shim'+sufixo],
        'ngFileUploadShim':['../vendor/ng-file-upload/ng-file-upload-shim'+sufixo],


    },
    shim: {
        'angular': {
            deps: ['jQuery'],
            exports: 'angular'
        },'angularSanitize': {
            deps: ['angular'],
            exports: 'angularSanitize'
        },'angularNgCookies': {
            deps: ['angular'],
            exports: 'angularNgCookies'
        },
        'angularUiBootstrap': {
            deps: ['angular'],
            exports: 'angularUiBootstrap'
        }, 'angularUiBootstrap2': {
            deps: ['angular'],
            exports: 'angularUiBootstrap2'
        }, 'restangular': {
            deps: ['angular','underscore'],
            exports: 'restangular'
        },
        'underscore': {
            exports: 'underscore'
        }, 'lodash': {
            exports: 'lodash'
        },
        'angularUiRouter': {
            deps: ['angular'],
            exports: 'angularUiRouter'
        },'ngtagsinput': {
            deps: ['angular'],
            exports: 'ngtagsinput'
        },'ngMap': {
            deps: ['angular'],
            exports: 'ngMap'
        },
        'jQueryNoty': {
            deps: ['jQuery'],
            exports: 'jQueryNoty'
        },
        'jQueryNotyLayoutsTopCenter': {
            deps: ['jQueryNoty'],
            exports: 'jQueryNotyLayoutsTopCenter'
        },
        'jQueryNotyThemesDefault': {
            deps: ['jQueryNoty'],
            exports: 'jQueryNotyThemesDefault'
        },
        'angularNgTable': {
            deps: ['angular'],
            exports: 'angularNgTable'
        },
        'angularConfirm': {
            deps: ['angular'],
            exports: 'angularConfirm'
        },
        'ngFileUpload': {
            deps: ['angular'],
            exports: 'ngFileUpload'
        },
        'ngFileUploadShim': {
            deps: ['angular'],
            exports: 'ngFileUploadShim'
        }

    }
    , priority: ["angular"]
    , deps: ['bootstrap']
});


requirejs.onError = function (err) {

    console.log(err);
    console.log(err.requireType);

};

