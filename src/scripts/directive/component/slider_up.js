angular.module('unistacks')
    .directive('slideUp', function() {
        return {
            restrict: 'A',
            link:function(scope,elem,attrs){
                var val=attrs.slideUp;
                var bottomVal='-25%';
                if(val&&val==2){
                    var bottomVal='-11%';
                }else if(val&&val==3){
                    var bottomVal='-19%';
                }
                $(elem).parent().hover(function(){
                    $(elem).animate({
                       'bottom':'5%'
                   },500);
                },function(){
                    $(elem).animate({
                        'bottom':bottomVal
                    },500);
                })
            }
        };
    });