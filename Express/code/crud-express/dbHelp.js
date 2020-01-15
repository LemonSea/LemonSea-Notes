/**
 * dbHelp.js
 * 数据操作文件模块
 * 职责：
 *  - 操作文件中的数据
 *  - 只处理数据，不关心业务
 */

let fs = require('fs')

let dbPath = './db.json';

/**
 * 获取所有学生
 * callback 中的参数
 *  第一个参数是 error
 *      成功是 null
 *      错误是 错误对象
 *  第二个参数是 结果
 *      成功是 数组
 *      错误是 undefined
 */
exports.findAll = (callback) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 添加保存学生
 */
exports.save = () => {

}

/**
 * 更新学生
 */
exports.update = () => {

}

/**
 * 删除学生
 */
exports.delete = () => {

}
