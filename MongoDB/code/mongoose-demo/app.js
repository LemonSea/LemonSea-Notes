/*
 * @Author: lemon
 * @Date: 2020-01-16 17:42:16
 * @LastEditTime : 2020-01-16 17:48:33
 * @LastEditors  : Please set LastEditors
 * @Description: 入口文件
 * @FilePath: \Learning-Notes\MongoDB\code\mongoose-demo\app.js
 */
const mongoose = require('mongoose');

// 连接本地数据库（test）
mongoose.connect('mongodb://localhost/test');

// 创建一个模型：就是在设计数据库（collection）
// MongoDB 是动态的，非常灵活，只需要在代码中设计数据库就可以了（Code First）
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个 test
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 Kitty 实例
kitty.save().then(() => console.log('meow'));