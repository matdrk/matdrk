// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs')
    , pdfobject = require('pdfobject')

    // DB
    , dbUser  = require('../database/models/User')
    


    module.exports = async (req, res, next) => {

    res.render('cv')

    const dbUsers = await dbUser.find({})

    console.log({dbUsers});

    res.render('test', {dbUsers})


}
