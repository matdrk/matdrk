// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs')
    , User    = require('../database/models/User')
    , article = require('../database/models/Article')

    module.exports = async (req, res, next) => {
        const dbUsers  = await User.find({})
        ,     dbArticles = await article.find({}) 

    res.render('test', { dbUsers, dbArticles })
}
