let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html', {
        author: "lemon"
    })
})

router.get('/register', (req, res) => {
    res.render('register.html')
})

router.post('/register', (req, res) => {

})

router.get('/login', (req, res) => {
    res.render('login.html')
})

router.post('/login', (req, res) => {

})


module.exports = router;