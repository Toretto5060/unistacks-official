angular.module('unistacks')
    .controller('carouselCtrl', function ($scope, $element, $attrs) {
    $scope.myInterval = 5000;//设置多久轮换一次
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;//当前轮显下标
        var unsliderObj=JSON.parse($attrs.unslider);
        /**
         * 增加一个轮显
         */
    $scope.addSlide = function() {
        var newWidth =unsliderObj.alia+'0'+(slides.length+1);
        slides.push({
            image: './images/unslider/' + newWidth + '.png',
            text: '',
            url:'#',
            active:true,
            id: currIndex++
        });
    };

    $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < unsliderObj.num; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }
});
