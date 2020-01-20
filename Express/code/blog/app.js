/*
 * @Author: your name
 * @Date: 2020-01-20 17:33:11
 * @LastEditTime : 2020-01-20 17:38:11
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Learning-Notes\Express\code\blog\app.js
 */
let express = require('express');

let app = express();

app.use('/public/', express.static('./public/'));

app.get('/', (req, res) => {
    res.send('hello word');
})

app.listen(3000, () => {
    console.dir('port on localhost:3000')
})