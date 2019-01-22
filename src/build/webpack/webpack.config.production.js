const webpack = require('webpack');
const webpackConfig = require('./webpack.config.global.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig.mode = 'production';

webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: `${__dirname}/../../app/index.html`,
        inject: 'body',
        hash: true
    })
);

webpackConfig.plugins.push(
    new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
            mangle: {
                keep_fnames: true
            },
            compress: {
                keep_fnames: true
            }
        }
    })
);

module.exports = webpackConfig;
