// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs') 
    , artBlog = require('../database/models/ArticleBlog')

    module.exports = async (req, res, next) => {
        const dbBlogs = await artBlog.find({})

        console.log( {dbBlogs} );
        
    res.render('blog', { dbBlogs })

}

