// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs') 

router.get('/', async (req, res, next) => {

    res.render('blog')

})

module.exports = router;

