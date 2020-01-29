const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        vendors: ['lodash', 'axios'],
        react: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'),
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_library',
            context: __dirname,
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
        })
    ]
}
