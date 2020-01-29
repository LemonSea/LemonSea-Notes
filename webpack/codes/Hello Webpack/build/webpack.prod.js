const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const workboxWebpackPlugin = require('workbox-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
    new workboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
    }),
]

// files 是 dll 目录下的所有文件
const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
        plugins.push(
            new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, '../dll/', file)
            }),
        )
    }
    if (/.*\.manifest.json/.test(file)) {
        plugins.push(
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: path.resolve(__dirname, '../dll/', file)
            })
        )
    }
})

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                        options: {
                            importLoaders: 2, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            modules: true  // 启用 CSS 模块
                        }
                    }, {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    },
                    {
                        loader: "postcss-loader"  // 自动添加厂商浅醉
                    }]
            }
        ]
    },
    plugins: plugins,
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
}

// module.exports = prodConfig;
module.exports = merge(commonConfig, prodConfig);