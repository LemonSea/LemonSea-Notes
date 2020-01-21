let express = require('express');
let User = require('../models/user');
let md5 = require('blueimp-md5');

let router = express.Router();

// 获取主页
router.get('/', (req, res) => {
    let user = req.session.user;
    console.log(user)
    res.render('index.html', {
        user: user
    })
})
// 渲染注册页面
router.get('/register', (req, res) => {
    res.render('register.html')
})

// 处理注册请求
router.post('/register', async (req, res) => {
    let body = req.body;
    try {
        // 验证邮箱唯一性
        if (await User.findOne({ email: body.email })) {
            return res.status(200).json({
                err_code: 1,
                message: 'Mailbox already exists!'
            })
        }

        // 验证昵称唯一性
        if (await User.findOne({ nickname: body.nickname })) {
            return res.status(200).json({
                err_code: 2,
                message: 'Nickname already exists!'
            })
        }

        // 对密码进行加密
        body.password = md5(md5(body.password));

        // 创建用户，执行注册
        await new User(body)
            .save()
            .then((user) => {
                console.log(user)
                // 注册成功，记录用户登录状态
                req.session.user = user;
            })

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    } catch (err) {
        res.status(500).json({
            err_code: 500,
            message: err.message
        })
    }
})

router.get('/login', (req, res) => {
    res.render('login.html')
})

router.post('/login', (req, res) => {

})

module.exports = router;