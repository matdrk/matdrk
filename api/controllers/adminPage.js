// Page My Apps
const express = require('express')
    , app = express()
    , router = express.Router()
    , path = require('path')
    , fs = require('fs')
    , User = require('../database/models/User')
    , article = require('../database/models/Article')


router.get('/', async (req, res, next) => {
    const dbUsers = await User.find({})
        , dbArticles = await article.find({})
        , sess = req.session;

    if (req.session.status !== "admin") {
        res.redirect('/');
    } else {
        res.render('admin', { dbUsers, sess, dbArticles })
        console.log(sess.email)
    }
})

router.get('/edit/user/:id', async (req, res, next) => {
    const editUser = await User.findById(req.params.id)
    if (req.session.userId) {
        return res.render("editUser", { editUser })
    }
    res.render('editUser', { editUser })
})

router.post('/edit/userPost/:id', async (req, res, next) => {
    const dbUsers = await User.findById(req.params.id)
    let query = { _id: req.params.id }

    User.findOneAndUpdate(
        query, {
            ...req.body
        },
        { useFindAndModify: false },
        function (error, post) {
            if (error) {
                console.log(error);
                User.create({
                    ...req.body
                },
                    (error, post) => {
                        res.redirect('/admin')
                    })

            } else {
                res.redirect('/admin');
            }
        });
})

router.get('/article/del/:id', (req, res) => {
    article.findByIdAndRemove(
        req.params.id,
        { useFindAndModify: false },
        function (err) {
            if (!err) {
                console.log('del ok');
            } else {
                res.redirect('/admin');
            }
        });
    res.redirect('/admin');
});

router.get('/user/del/:id', (req, res) => {
    User.findByIdAndRemove(
        req.params.id,
        { useFindAndModify: false },
        function (err) {
            if (!err) {
                console.log('del ok');
            } else {
                res.redirect('/admin');
            }
        });
    res.redirect('/admin');
});

router.get('/edit/article/:id', async (req, res, next) => {
    const dbArticles = await article.findById(req.params.id)
    if (req.session.userId) {
        console.log(dbArticles);
        return res.render("editArticle", { dbArticles })
    }
    res.render('/user/login')
})

router.post('/articlePost', async (req, res, next) => {
    const { img } = req.files
        , uploadFile = path.resolve(__dirname, '../..', 'public/images/artBlog', img.name);

    img.mv(uploadFile, (error) => {
        article.create({
            ...req.body,
            img: `/assets/images/artBlog/${img.name}`
        },
            (error, post) => {
                res.redirect('/blog')
            })
    })
})

router.post('/edit/articlePost/:id', async (req, res, next) => {
    const dbArticles = await article.findById(req.params.id);
    let query = { _id: req.params.id }
    // const { img } = req.files
    // const uploadFile = path.resolve(__dirname, '../..', 'public/images/artblog', img.name);



    article.findOneAndUpdate(
        query, {
            ...req.body
        },
        { useFindAndModify: false },
        function (error, post) {
            if (error) {
                console.log(error);
                article.create({
                    ...req.body
                },
                    (error, post) => {
                        res.redirect('/admin')
                    })

            } else {
                res.redirect('/admin');
            }
        });
})



module.exports = router;