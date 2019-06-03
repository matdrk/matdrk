const express = require('express')
const router  = express.Router()
    , User    = require('./database/models/User')

    //controllers
    , homePage = require('./controllers/homePage')
    , contactPage = require('./controllers/contactPage')
    , blogPage = require('./controllers/blogPage')
    , mentionPage = require('./controllers/mentionPage')
    , servicePage = require('./controllers/servicePage')
    , cvPage    = require('./controllers/cvPage')
    , adminPage = require('./controllers/adminPage')
    , aboutPage = require('./controllers/aboutPage')
    , user      = require('./controllers/user')
    , logout    = require('./controllers/logout')

    , testPage = require('./controllers/testPage')


// Routes
router.get('/'       , homePage)
router.get('/contact' , contactPage)
router.get('/blog'   , blogPage)
router.get('/mention' , mentionPage)
router.get('/service' , servicePage)
router.get('/about'  , aboutPage)

//login
router.use('/login' , user )
router.get('/logout' , logout)


router.use('/admin' , adminPage)
router.get('/cv'   , cvPage)

router.get('/test', testPage)

module.exports = router;