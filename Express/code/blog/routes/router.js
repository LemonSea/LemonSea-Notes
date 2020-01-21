let express = require('express');
let User = require('../models/user');

let router = express.Router();

// 获取主页
router.get('/', (req, res) => {
    res.render('index.html', {
        author: "lemon"
    })
})
// 渲染注册页面
router.get('/register', (req, res) => {
    res.render('register.html')
})

// 处理注册请求
router.post('/register', (req, res) => {
    let body = req.body;
    console.log(body)
    User.findOne({
        $or: [
            {
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, (err, data) => {
        if (err) {
            return res.status(500).send('Server Error');
        }

        if (data) {
            return res.status(200).send({
                "err_code": -1,
                "message": "A mailbox or nickname already exists!"
            })
        }

        return res.status(200).send({
            "err_code": 0,
            "message": "OK"
        })
    })

})

router.get('/login', (req, res) => {
    res.render('login.html')
})

router.post('/login', (req, res) => {

})


module.exports = router;