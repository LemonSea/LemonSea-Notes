class CopyrightWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
      debugger;
      compilation.assets['copyright.txt'] = {
        source: function() {
          return 'copyright by lemon'
        },
        size: function() {
          return 18
        }
      }
      callback();
    })
  }
}

module.exports = CopyrightWebpackPlugin;