// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs') 

    , User    = require('../database/models/User')

module.exports = (req, res, next) => {

    res.render('login', {
        errors : req.flash('registerError'),
        data   : req.flash('data')[0]
        
    })
}