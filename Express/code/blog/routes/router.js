let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html',{
        author: "lemon"
    })
})

module.exports = router;