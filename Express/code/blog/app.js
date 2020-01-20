/*
 * @Author: your name
 * @Date: 2020-01-20 17:33:11
 * @LastEditTime : 2020-01-20 20:02:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Learning-Notes\Express\code\blog\app.js
 */
let express = require('express');
let path = require('path');
var bodyParser = require('body-parser');

let app = express();

app.use('/public/', express.static(path.join(__dirname, '/public/')));
app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')));

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index.html',{
        author: "lemon"
    })
})

app.listen(3000, () => {
    console.dir('port on localhost:3000')
})