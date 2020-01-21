let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let router = require('./routes/router');

let app = express();


app.use('/public/', express.static(path.join(__dirname, '/public/')));
app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules/')));

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router);

app.listen(3000, () => {
    console.dir('port on localhost:3000')
})