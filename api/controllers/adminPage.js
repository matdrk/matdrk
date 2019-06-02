// Page My Apps
const express = require('express')
    , app     = express()
    , router  = express.Router()
    , path    = require('path')
    , fs      = require('fs') 
    , User    = require('../database/models/User')
    , artBlog = require('../database/models/ArticleBlog')


router.get('/', async (req, res, next) => {
    const dbUsers  = await User.find({})
    ,     dbBlogs  = await artBlog.find({})
    ,     sess     = req.session;

    if (req.session.status !== "admin") {
        res.redirect('/');
    } else {
        res.render('admin', {dbUsers, sess, dbBlogs})
        console.log(sess.email)
    }
})

router.get('/edit/user/:id', async (req, res, next) => {
    const editUser = await User.findById(req.params.id)
    if (req.session.userId) {
        return res.render("editUser", {editUser})
    }
    res.render('editUser', {editUser})
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
            console.log(dbUsers);
        });
})

router.get('/delete/:id', (req, res) => {
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

router.get('/edit/blog/:id', async (req, res, next) => {
    const postItemBlog = await artBlog.findById(req.params.id)
    if (req.session.userId) {
        return res.render("editBlog", { postItemBlog })
    }
    res.render('/user/login')
})

router.post('/blogPost/:id', async (req, res, next) => {
    const { imgBlog } = req.files
        , uploadFile = path.resolve(__dirname, '../..', 'public/images/artBlog', imgBlog.name);

    imgBlog.mv(uploadFile, (error) => {
        artBlog.create({
            ...req.body,
            imageBlog: `/assets/images/artBlog/${imgBlog.name}`
        },
            (error, post) => {
                res.redirect('/blog')
            })
    })
})

router.post('/edit/blogPost/:id', async (req, res, next) => {
    let query = { _id: req.params.id }
    const { imgBlog } = req.files
    const uploadFile = path.resolve(__dirname, '../..', 'public/images/artblog', imgBlog.name);
    imgBlog.mv(uploadFile, (error) => {
        artBlog.findOneAndUpdate(
            query, {
                ...req.body,
                imgBlog: `/images/artblog/${imgBlog.name}`
            },
            { useFindAndModify: false }
            , function (error, post) {
                if (error) {
                    console.log(error);
                    return;
                    res.redirect('/');
                } else {
                    res.redirect('/blog');
                }
            });
    })
    console.log(req.body);
})



module.exports = router;