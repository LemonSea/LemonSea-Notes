/*
 * @Author: Lemon
 * @Date: 2020-01-16 17:42:16
 * @LastEditTime : 2020-01-16 18:43:19
 * @LastEditors  : Please set LastEditors
 * @Description: mongodb 服务配置
 * @FilePath: \Learning-Notes\MongoDB\code\mongoose-demo\server.js
 */
const mongoose = require('mongoose');

// Schema：架构、结构
let Schema = mongoose.Schema;

// 1. 连接本地数据库（test）
// 指定连接的数据库不需要存在，当存入第一条数据的时候会自动创建
mongoose.connect('mongodb://localhost/test');

// 2. 设计 Schema 结构(collection 结构)
var blogSchema = new Schema({
    name: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    // 这里用 default 设置了 默认值
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
})

// 一般会用下面的方式设计 collection 结构
// 以添加约束
let userSchema = new Schema({
    username: {
        type: String,
        required: true  // 不能为空
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

// 3. 将文档结构发布为模型
// mongoose 方法用于将一个架构发布为一个 model
// 第一个参数：传入一个大写名称单数字符串用来表示数据库名称
//            mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//            User => users
// 第二个参数：架构 Schema
// 返回值：    模型构造函数
var User = mongoose.model('User', userSchema);

//  4. 通过模型构造函数操作 users 中的数据

// 增加数据
let user = new User({
    username: 'Lemon',
    email: '@qq.com'
})

// // 保存数据
// user.save((err, ret) => {
//     if (err) {
//         return console.log('保存失败');
//     }
//     console.log('保存成功');
//     console.log(ret);
// })

// // 查询所有
// User.find((err, ret) => {
//     if (err) {
//         return console.log('查询失败');
//     }
//     console.log(ret);
// })

// // 传入的第一个参数会作为条件
// // 返回所有满足条件的数据
// User.find({
//     username:'Lemon'
// }, (err, ret) => {
//     if (err) {
//         return console.log('查询失败');
//     }
//     console.log(ret);
// })

// 传入的第一个参数会作为条件
// 返回所有满足条件的数据
User.findOne({
    username:'Lemon'
}, (err, ret) => {
    if (err) {
        return console.log('查询失败');
    }
    console.log(ret);
})