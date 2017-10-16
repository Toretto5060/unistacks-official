window.$=require('jquery');
require('angular');
require('angular-ui-router');
require('lodash');
require('bootstrap');
require('angular-ui-bootstrap');
require('script-loader');
require('script!modernizr');
require('jquery.appear');
require('jquery.backstretch');
require('script!isotope');
require('script!../contact/contact_me.js');
require('script!../contact/jqBootstrapValidation.js');
require('script!../contact/custom.js');

var routers=require('./routes');

angular.module('unistacks', ['ui.router','ui.bootstrap'])
    .config(routers)
    .run(function($rootScope,$location,$anchorScroll){
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
            if(toState.url.indexOf('product_detail')>=0){
                $location.hash(toParams.id);
                $anchorScroll();
            }
        })
    });
