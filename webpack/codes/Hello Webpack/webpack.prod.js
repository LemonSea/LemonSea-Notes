const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 2048
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
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
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}