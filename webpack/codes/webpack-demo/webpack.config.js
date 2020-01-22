const path = require('path')

module.exports = {
    // 打包入口文件
    entry: './index.js',
    // 打包出口
    output: {
        // 导出文件名称
        filename: 'bundle.js',
        // 导出文件地址（绝对路径，这里要使用 node.js 的 path 模块）
        path: path.resolve(__dirname, 'bundle')
    }
}