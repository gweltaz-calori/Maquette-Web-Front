var express = require('express');
var app = express();
var webpack = require('webpack');
var path = require('path');
var opn = require('opn');
var WebpackHotMiddleware = require('webpack-hot-middleware');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var compiler = webpack(require('./config.js'));

var URL = "http://localhost:" + process.env.DEV_PORT;


var devMiddleware = WebpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: {
        colors: true
    },
});

var hotMiddleware = WebpackHotMiddleware(compiler, {});

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'});
        cb();
    });
});


app.use(devMiddleware);

app.use(hotMiddleware);

devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + URL + '\n');
    opn(URL);
});

app.use('*', function (req, res, next) {
    var filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function (err, result) {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

app.listen(process.env.DEV_PORT);

