let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Blog');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 这里不能写 Date.now()，因为会即刻调用
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    // 头像
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthDay: {
        type: Date,
    },
    status: {
        type: Number,
        // 0：无限制
        // 1：可登录，不可评论
        // 2：不可登录
        enum: [0, 1, 2],
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);