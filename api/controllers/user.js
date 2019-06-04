const User = require('../database/models/User')
    , bcrypt = require('bcrypt')
    , express = require('express')
    , app = express()
    , router = express.Router()
    , path = require('path')
    , fs = require('fs')

    , expressSession = require('express-session')
    , MongoStore = require('connect-mongo')
    , mongoStore = MongoStore(expressSession);

// const auth = require('../../middleware/auth')
//     , redirectAuthSucess = require('../../middleware/redirectAuthSucess')

// router.get('/add', async (req, res, next) => {
//     res.render('login', {
//         errors: req.flash('registerError'),
//         data: req.flash('data')[0]
//     })
// })

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

router.get('/', async (req, res, next) => {
    res.render('login')
    
})

router.post('/loginAuth', async (req, res, next) => {
    const { email, password } = req.body;

        User.findOne({ email }, (error, User) => {
            
            req.session.email = User.email;
            req.session.name = User.name;
            req.session.status = User.status;
            req.session.userId = User._id
            sess = req.session;
            console.log(req.session.status);
            

            if (User) {
                if (req.session.status === 'user') {
                    bcrypt.compare(password, User.password, (error, same) => {
                        if (same) {
                            req.session.userId = User._id;
                            console.log("user ok");
                            
                            console.log(req.body);
                            res.redirect('/')
                        } else {
                            console.log(req.body);
                            console.log('user fail');
                            res.redirect('/login')
                        }
                    })
                }
                else if (req.session.status === 'admin') {
                    bcrypt.compare(password, User.password, (error, same) => {
                        if (same) {
                            req.session.userId = User._id;
                            console.log('admin OK');
                            res.redirect('/')
                        } else {
                            console.log('admin Fail');
                            res.redirect('/login')
                        }
                    })
                }
                else {
                    return res.redirect('/login')
                }
            }
        })
})

module.exports = router;