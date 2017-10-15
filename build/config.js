var webpack = require('webpack');
var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var express = require('express');


var DEV = process.env.NODE_ENV == "dev";

module.exports = {
    entry: ['babel-polyfill', './src/app.js', 'webpack-hot-middleware/client', './build/devClient.js'],
    output: {
        publicPath: DEV ? '/dist/' : './',
        path: path.resolve(__dirname, '../dist'),
        filename: 'build.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(s)?css$|\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 10 versions', 'Firefox >= 18', 'ie 10')];
                                }
                            }
                        }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff2?)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: DEV ? '[path][name].[ext]' : 'assets/images/[name].[ext]',
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }

        ]
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),*/
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist/json')}
        ]),
        new ExtractTextPlugin({
            filename: 'assets/css/app.css',
            disable: DEV
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'index.html',

        })

    ],
    /*devServer: {
        //contentBase: path.resolve(__dirname,'../src'),
        setup : function(app){
            app.use('/json', express.static(path.join(__dirname, '../public')))
        },
        watchContentBase: true,
        publicPath : '/dist/',
        compress: true,
        port: 9000,
    }*/


};