let express = require('express')
let fs = require('fs')

let app = express()

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'));

// routes
app.get('/', function (req, res) {
    fs.readFile('./db.json', 'utf-8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            fruits: [
                'apple',
                'banana',
                'pear',
                'bear'
            ],
            students: JSON.parse(data).students
        });
    })    
});


app.listen(3000, () => {
    console.dir('running on port 3000')
})