const express = require('express'),
      router = express.Router()

//controllers
,     homePage    = require('./controllers/homePage')
,     contactPage = require('./controllers/contactPage')
,     blogPage    = require('./controllers/blogPage')
,     mentionPage = require('./controllers/mentionPage')
,     servicePage = require('./controllers/servicePage')
,     loginPage   = require('./controllers/loginPage')
,     cvPage      = require('./controllers/cvPage')
,     adminPage   = require('./controllers/adminPage')

,     testPage    = require('./controllers/testPage')


// Routes
router.get('/'        , homePage)
router.get('/contact' , contactPage)
router.get('/blog'    , blogPage)
router.get('/mention' , mentionPage)
router.get('/service' , servicePage)
router.get('/login'   , loginPage)
router.get('/admin'   , adminPage)
router.get('/cv'      , cvPage)

router.get('/test'    , testPage)

module.exports = router;