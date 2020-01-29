const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const workboxWebpackPlugin = require('workbox-webpack-plugin');

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
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
          new workboxWebpackPlugin.GenerateSW({
              clientsClaim: true,
              skipWaiting: true
          })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
}

// module.exports = prodConfig;
module.exports = merge(commonConfig, prodConfig);