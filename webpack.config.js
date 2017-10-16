var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var node_modules_src = path.join(__dirname, 'src');

var deps = [
    'jquery/dist/jquery.min.js',
    'angular/angular.min.js',
    'plugins/modernizr.js',
    'plugins/isotope/isotope.pkgd.js'
];

var config = {
    output: {
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            jquery:path.resolve(node_modules_dir, deps[0]),
            modernizr:path.resolve(node_modules_src, deps[2]),
            isotope:path.resolve(node_modules_src, deps[3])
        }
    },
    module: {
        noParse: [],
        loaders: [{
            test: path.resolve(node_modules_dir, deps[0]),
            loader: "expose?jQuery"
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            filename: 'vendor.bundle.js',
            minChunks: function (module, count) {
                return module.resource && module.resource.indexOf('src') === -1;
            }
        })]
};

deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules_dir, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});

module.exports = config;