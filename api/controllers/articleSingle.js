// Page Article
const express = require('express')
    , app = express()
    , router = express.Router()
    , path = require('path')
    , fs = require('fs')
    , User = require('../database/models/User')
    , post = require("../database/models/Article")
    , comment = require("../database/models/Comment");

router.get('/:id', async (req, res, next) => {
    const dbArticles = await post.findById(req.params.id)
        , dbComment  = await comment.find({ref:dbArticles._id})
        , dbUser = await User.find({})
        , sess = req.session;

        console.log({ dbArticles, sess, dbComment, dbUser }, dbUser.imgUser );

    res.render('articles', { dbArticles, sess, dbComment, dbUser })
})

router.post('/comment', async (req, res, next) => {
    comment.create(
        req.body, (err, user) => {
            if (req.session.status !== user) {
                console.log('blabla');
                res.redirect('/blog')
            } else if ( req.session.status !== admin) {
                res.redirect('/admin')
            }
        }
    )
})

module.exports = router;
