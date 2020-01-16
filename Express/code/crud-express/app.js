/**
 * app.js 入口模块
 * 职责：
 *  创建服务
 *  配置服务
 *      - 模板引擎
 *      - body-parser 的 post 解析功能
 *      - 静态资源服务
 * 挂载路由
 * 监听端口启动服务
 */

var express = require('express')
var bodyParser = require('body-parser')
let router = require('./router');

let app = express()

// 配置静态资源访问
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// 配置模板引擎
app.engine('html', require('express-art-template'));

// 配置 bodyParse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router);

app.listen(3000, () => {
    console.dir('running on port 3000')
})
