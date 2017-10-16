angular.module('unistacks')
    .directive('hoverInfo', function () {
        return {
            restrict : 'EA',
            link : function(scope, element, attrs) {
                element.hover(function(){
                },function(){

                });
            }
        }
    });
