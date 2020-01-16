/*
 * @Author: lemon
 * @Date: 2020-01-16 17:42:16
 * @LastEditTime : 2020-01-16 17:42:53
 * @LastEditors  : Please set LastEditors
 * @Description: 入口文件
 * @FilePath: \Learning-Notes\MongoDB\code\mongoose-demo\app.js
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));