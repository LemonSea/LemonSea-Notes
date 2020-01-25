const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        proxy: {
            './api': 'http://localhost:3000'
        },
        hot: true,  // 开启 HMR 功能
        // hotOnly: true  // 即使 HMR 功能未成功开启，也不让浏览器自动刷新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true
    }
}

module.exports = merge(commonConfig, devConfig);