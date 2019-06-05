<<<<<<< HEAD
// Page Article
=======
>>>>>>> 1355e3e6313f7cc841c185cb133238f1a9bc8b80
const express = require('express')
    , app = express()
    , router = express.Router()
    , path = require('path')
    , fs = require('fs')
    , User = require('../database/models/User')
    , post = require("../database/models/Article")
<<<<<<< HEAD
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
=======
    , comment = require("../database/models/Comment")

// module.exports = async (req, res) => {
//     const dbArticles = await post.findById(req.params.id)
//         console.log( {dbArticles} );
//         console.log( req.params );
//     res.render('articles', { dbArticles })
// }

router.get('/:id', async (req, res, next) => {
    const dbArticles = await post.findById(req.params.id)
        , dbComment  = await comment.find({})
        , dbUser = await User.find({})
        , sess = req.session;

    console.log({ dbComment });
    console.log(req.params);

    res.render('articles', { dbArticles, sess, dbComment })
})

router.post('/comment', async (req, res, next) => {
    comment.create(
        req.body, (err, user) => {
            if (req.session.status !== user) {
                console.log('blabla');
                res.redirect('/')
            } else if ( req.session.status !== admin) {
                res.redirect('/admin')
            }
        }
    )
})

module.exports = router;

router.post('/register', async (req, res, next) => {
    User.create(
        req.body, (error, user) => {
            if (error) {
                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);
                req.flash('registerError', registerError)
                req.flash('data', req.body)
                return res.redirect('/login')
                console.log("test");

            }
            console.log(req.body);
            res.redirect('/login')
        }
    )
})
>>>>>>> 1355e3e6313f7cc841c185cb133238f1a9bc8b80
