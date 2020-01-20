/*
 * @Author: your name
 * @Date: 2020-01-20 17:33:11
 * @LastEditTime : 2020-01-20 19:32:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Learning-Notes\Express\code\blog\app.js
 */
let express = require('express');
let path = require('path')

let app = express();

app.use('/public/', express.static(path.join(__dirname, '/public/')));
app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')));

app.get('/', (req, res) => {
    res.send('hello word');
})

app.listen(3000, () => {
    console.dir('port on localhost:3000')
})