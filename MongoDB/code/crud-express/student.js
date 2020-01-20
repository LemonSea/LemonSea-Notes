/*
 * @Author: Lemon
 * @Date: 2020-01-19 17:13:43
 * @LastEditTime : 2020-01-20 12:00:48
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Learning-Notes\MongoDB\code\crud-express\dbHelp.js
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost:27017/itcast');
mongoose.connect('mongodb://localhost:27017/itcast', { useMongoClient: true });

let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number,
        required: true
    },
    hobits: {
        type: String
    }
})

// 直接导出模型构造函数
module.exports = mongoose.model('student', studentSchema)