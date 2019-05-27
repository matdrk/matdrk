// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs')
    // DB
    , dbUser  = require('../database/models/User')
    

router.get('/', async (req, res, next) => {

    const dbUsers = await dbUser.find({})

    console.log({dbUsers});

    res.render('test', {dbUsers})

})

module.exports = router;
