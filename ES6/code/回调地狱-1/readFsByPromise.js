/*
 * @Author: your name
 * @Date: 2020-01-20 16:14:16
 * @LastEditTime : 2020-01-20 16:24:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Learning-Notes\ES6\code\readFsByPromise.js
 */
let fs = require('fs');

function readFsByPromise(filePath) {
    return new Promise((res, rej) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                rej(err);
            }
            res(data);
        })
    })
}

let aFilePath = './a.txt';
let bFilePath = './b.txt';
let cFilePath = './c.txt';

readFsByPromise(aFilePath)
    .then((data) => {
        console.log(data)
        return readFsByPromise(bFilePath);
    })
    .then((data) => {
        console.log(data)
        return readFsByPromise(cFilePath);
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        throw err;
    })
