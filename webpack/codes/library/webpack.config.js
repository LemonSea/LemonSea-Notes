const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    mode: 'production',
    externals: ['loadsh'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'library.js',
        library: 'library',
        libraryTarget: 'this'
    },
    plugins: []
}