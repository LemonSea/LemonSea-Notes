/**
 * router.js 路由模块
 * 职责：
 *  专注于路由处理
 *  根据不同的请求方法+请求路径响应不同的内容
 */
let fs = require('fs')
let express = require('express')
let dbHelp = require('./dbHelp')

// 使用 express 的路由模块
// 创建一个路由容器
let router = express.Router()

// 路由都挂载到 router 容器中
// 主页，重定向到 students 页面
router.get('/', function (req, res) {
    res.writeHead(301, { 'Location': '/students' });
    res.end();
});

router.get('/students', function (req, res) {
    dbHelp.findAll((err, students) => {
        if (err) {
            return res.status(500), send('Server error.')
        }

        res.render('index.html', {
            fruits: [
                'apple',
                'banana',
                'pear',
                'bear'
            ],
            students: students
        });
    })
});

router.get('/students/add', (req, res) => {
    res.render('add.html')
})

router.post('/students/add', (req, res) => {
    /**
     * 1. 获取表单数据
     * 2. 处理
     * 3. 发送响应
     */
    res.send(req.body)
})

router.get('/students/edit', (req, res) => {

})

router.post('/students/edit', (req, res) => {

})

router.get('/students/delete', (req, res) => {

})

module.exports = router