// Page Article
const express = require('express')
    , app = express()
    , router = express.Router()
    , path = require('path')
    , fs = require('fs')
    , dateFormat = require('dateformat')
    , now = new Date()
    , User = require('../database/models/User')
    , post = require("../database/models/Article")
    , comment = require("../database/models/Comment")
    , date = Date.now()

router.get('/:id', async (req, res, next) => {
    const dbArticles   = await post.findById(req.params.id)
        , dbComment    = await comment.find({ref:dbArticles._id})
        , dbUser       = await User.find({})
        , sess         = req.session;
        // , authorCom    = await User.find({authorId:dbComment.authorId})

        // console.log(  );

    res.render('articles', { dbArticles, sess, dbComment, dbUser })
})

router.post('/comment', async (req, res, next) => {
    const sess = req.session;
    comment.create(
        {
            ...req.body,
            author: sess.name,
            authorId:  sess.userId,
            imgAuthor: sess.imgUser,
            formatDate: (dateFormat(date, "dd mm yyyy à HH:MM:ss"))
        }, (err, comment) => {
            if (req.session.status !== User) {
                console.log('blabla');
                res.redirect('/blog')
            } else if ( req.session.status !== admin) {
                res.redirect('/admin')
            }
        }
    )
})

module.exports = router;



// Article.create(
//     {
//         ...req.body,
//         author: user.userName,
//         authorId: user._id,
//         formatDate: (dateFormat(date, "dd mm yyyy à HH:MM:ss"))
//     },
//     (error, article) => {
//         if (error) {
//             console.log(error);
//             req.flash('error', 'Erreur lors de la création de l\'article');
//         } else {
//             req.flash('success', 'Article créé avec succes !');
//         }
//         res.redirect(`/`)
//     })
