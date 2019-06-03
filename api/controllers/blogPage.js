// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs') 
    , article = require('../database/models/Article')

    module.exports = async (req, res, next) => {
        const dbArticles = await article.find({})

        console.log( {dbArticles} );
        
    res.render('blog', { dbArticles })

}

