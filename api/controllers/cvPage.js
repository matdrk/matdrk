// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs')
<<<<<<< HEAD:api/controllers/cvPage.js
    , pdfobject = require('pdfobject')
=======
    // DB
    , dbUser  = require('../database/models/User')
    
>>>>>>> drk:controllers/testPage.js

    module.exports = async (req, res, next) => {

<<<<<<< HEAD:api/controllers/cvPage.js
    res.render('cv')
=======
    const dbUsers = await dbUser.find({})

    console.log({dbUsers});

    res.render('test', {dbUsers})
>>>>>>> drk:controllers/testPage.js

}
