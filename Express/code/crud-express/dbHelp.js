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
 * @description: 根据 id 获取学生信息
 * @param {Number} id 学生id
 * @param {Function} callback 回调函数
 */
// 调用：
// findById(id, (err, student) {})
exports.findById = (studentId, callback) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students;

        let ret = students.find((item) => item.id === studentId);

        callback(null, ret)
    })
}

/**
 * 添加保存学生
 */
/* 调用形式：
save({
    name: 'xxx',
    age: 18
}, (err) => {
    if (err) {
        console.log('保存失败了')
    }
    console.log('保存成功了')
})
*/
exports.save = (student, callback) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students;

        student.id = students[students.length - 1].id + 1;

        students.push(student);

        // 将对象数据转换为字符串
        let fileData = JSON.stringify({
            students
        });

        fs.writeFile(dbPath, fileData, (err, data) => {
            if (err) {
                // 错误传递 err 对象
                return callback(err);
            }
            // 成功就没错，所有错误对象是 null
            callback(null);
        })
    })
}

/**
 * 更新学生
 */
/*
updateById({
    id: 1,
    name: 'xxx',
    age: 15
}, (err) => {
    if (err) {
        console.log('保存失败了')
    }
    console.log('保存成功了')
})
*/
exports.updateById = (student, callback) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students;

        // find() 函数，返回符合条件的遍历项
        let stu = students.find((item) => item.id === student.id);

        // 遍历拷贝替换数据
        // stu 是对象，所以这里改了 stu 对应 students 里的数据也会改变
        for (let key in stu) {
            stu[key] = student[key];
        }

        // 将对象数据转换为字符串
        let fileData = JSON.stringify({
            students
        });

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, (err, data) => {
            if (err) {
                // 错误传递 err 对象
                return callback(err);
            }
            // 成功就没错，所有错误对象是 null
            callback(null);
        })
    })
}

/**
 * 删除学生
 */
exports.delete = () => {

}
