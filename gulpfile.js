var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var del = require('del');

var paths = {
    build: 'build',
    css:'src/css',
    js:"src/js",
    fonts:"src/fonts",
    sass: ['src/sass/**/*.scss','src/sass/css/*.css','src/sass/mycss/*.css'],
    html:['src/**.html','src/html/**.html'],
    scripts:'src/scripts/**/*.js'
};

/**
 * return proxies middlewares
 * @param {Object} opts
 * @return {Array} proxies
 */
var setProxies = function (opts) {
    var proxies = [],
        url = require('url'),
        proxy = require('proxy-middleware');
    opts.routes.forEach(function (route) {
        var options = url.parse('http://' + opts.host + ':' + opts.port + '/' + opts.path + route);
        options.route = '/' + route;
        proxies.push(proxy(options));
    });
    return proxies;
};

gulp.task('connect', function () {
    connect.server({
        root: ['src'],
        port: 9901,
        livereload: true
    });
});

gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(paths.css))
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(paths.js))
        .pipe(connect.reload());
});

gulp.task('html', function () {

    return gulp.src(paths.html)
        .pipe(connect.reload());
});

gulp.task('watch', ['compile'], function () {
    gulp.watch('src/sass/**', ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.html,['html']);
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'api_server/server.js',
        watch: ['api_server/**']
    });
});

gulp.task('build',['compile'],function () {
    del(paths.build).then(function(){
        gulp.src(paths.css+'/*.css')
            .pipe(cssnano())
            //.pipe(rev())
            .pipe(gulp.dest(paths.build+'/css'));

        gulp.src(paths.fonts+'/**')
            .pipe(gulp.dest(paths.build+'/fonts'));

        gulp.src(paths.js+'/*.js')
            .pipe(uglify({mangle:false}))
            //.pipe(rev())
            .pipe(gulp.dest(paths.build+'/js'));

        gulp.src('src/template/**')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(paths.build + '/template'));

        gulp.src('src/**.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(paths.build));

        gulp.src('src/images/**')
            .pipe(gulp.dest(paths.build + '/images'));
        gulp.src('src/download/')
            .pipe(gulp.dest(paths.build));
        gulp.src(paths.html)
            .pipe(gulp.dest(paths.build+'/html'));
        gulp.src('src/component/**.html')
            .pipe(gulp.dest(paths.build+'/component'));
    });

});

gulp.task('compile', ['sass', 'scripts']);
gulp.task('dev', ['compile','connect','watch']);
gulp.task('default', ['dev']);
