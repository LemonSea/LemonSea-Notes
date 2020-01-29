const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  this.callback = this.async();
  setTimeout(() => {
    const result = source.replace('dell', options.name);;
    this.callback(null, result)
  }, 1000);
}