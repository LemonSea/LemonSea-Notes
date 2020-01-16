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

// 渲染 students 首页
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

// 渲染添加学生页面
router.get('/students/add', (req, res) => {
    res.render('add.html')
})

// 处理添加学生请求
router.post('/students/add', (req, res) => {
    /**
     * 1. 获取表单数据
     * 2. 处理
     * 3. 发送响应
     */
    dbHelp.save(req.body, (err) => {
        if (err) {
            console.log('保存失败了')
        }
        console.log('保存成功了')

        // express 重定向的方法
        res.redirect('/students');
    })
})

// 渲染编辑学生页面
router.get('/students/edit', (req, res) => {
    // 1. 客户端的列表页处理链接问题（需要有 id 参数）
    // 2. 获取要编辑的学生 id
    // 3. 渲染编辑页面
    //      根据 id 把学生信息查出来
    //      使用模板引擎渲染页面
    dbHelp.findById(parseInt(req.query.id), (err, student) => {
        if (err) {
            return res.status(500).send('Server error.');
        }
        res.render('edit.html', {
            student
        })
    })
})

// 处理编辑学生请求
router.post('/students/edit', (req, res) => {
    // 1. 获取表单数据
    //  req.body
    // 2. 更新
    //  dbHelp.update()
    // 3. 发送响应
    dbHelp.updateById(req.body, (err) => {
        if (err) {
            console.log('保存失败了')
        }
        console.log(req.body)

        // express 重定向的方法
        res.redirect('/students');
    })
})

// 处理删除请求
router.get('/students/delete', (req, res) => {
    // 1. 获取要删除的 id
    // 2. 根据 id 执行删除操作
    // 3. 根据操作结果发送响应数据
    console.log(req.query.id)
    dbHelp.deleteById(req.query.id, (err) => {
        if (err) {
            return res.status(500).send('Server error.');
        }
        // express 重定向的方法
        res.redirect('/students');
    })
})

module.exports = router
