var express = require('express')
var bodyParser = require('body-parser')
let router = require('../../router');
const path = require('path');

module.exports = (app) => {
  app.use('/public/', express.static(path.join(__dirname) + '../public'))
}