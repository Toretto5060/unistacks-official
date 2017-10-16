angular.module('unistacks')
    .directive('unslider', function() {
        return {
            restrict: 'A',
            replace: false,
            scope:{},
            templateUrl:'./component/unslider.html',
            controller:'carouselCtrl'
        };
    });