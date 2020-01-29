const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 9000,
        historyApiFallback: true,
        proxy: {
            '/react/api': {
                target: 'http://www.dell-lee.com',
                secure: false,
                pathRewrite: {
                    'demo.json': 'header.json'
                },
                changeOrigin: true
            }
          }       
        // contentBase: './dist',
        // open: true,
        // hot: true,  // 开启 HMR 功能
        // hotOnly: true  // 即使 HMR 功能未成功开启，也不让浏览器自动刷新
    },
    module: {
        rules: [
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
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true
    }
}

// module.exports = devConfig;
module.exports = merge(commonConfig, devConfig);