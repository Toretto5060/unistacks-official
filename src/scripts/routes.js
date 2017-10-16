module.exports = function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");
    // Now set up the states
    $stateProvider.state('main', {
            url: "/main",
            templateUrl: 'html/main.html'
       }).state('product_detail', {
            url: "/product_detail?id",
            templateUrl: 'product_detail.html'
       }).state('solution', {
            url: "/solution",
            templateUrl: 'html/solution.html'
       }).state('contact', {
            url: "/contact",
            templateUrl: 'html/contact.html'
       }).state('job', {
            url: "/job",
            templateUrl: 'html/job.html'
       }).state('kulm', {
            url: "/kulm",
            templateUrl: 'html/kulm.html'
       }).state('omniboard', {
            url: "/omniboard",
            templateUrl: 'html/omniboard.html'
       }).state('sesame', {
            url: "/sesame",
            templateUrl: 'html/sesame.html'
       }).state('argus', {
            url: "/argus",
            templateUrl: 'html/argus.html'
       }).state('service',{
       		url:"/service",
       		templateUrl: 'html/service.html'
       })
};