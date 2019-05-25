const express        = require('express')
,     mongo          = require('mongodb')
,     mongoose       = require('mongoose')
,     hbs            = require('express-handlebars')
,     bodyParser     = require('body-parser')
,     fileupload     = require('express-fileupload')
,     expressSession = require('express-session')
,     MongoStore     = require('connect-mongo')
,     connectFlash   = require('connect-flash')
,     app            = express()
,     mongoStore     = MongoStore(expressSession)

// Router
,     router      = express.Router()
,     homePage    = require('./controllers/homePage')
,     contactPage = require('./controllers/contactPage')
,     blogPage    = require('./controllers/blogPage')

//___________________________ DB
mongoose
      .connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true });

// connect-flash
app.use(connectFlash())

// Express-Session
app.use(expressSession({
    secret     : 'securite',
    name       : 'biscuit',
    saveUninitialized : true,
    resave     : false,
    store      : new mongoStore(
        { mongooseConnection: mongoose.connection }
    )
}))

// Middleware
app.use('/assets', express.static('public'));

//  Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Express FileUpload
app.use(fileupload())

// Post
app.use(express.static('public'));

// const auth = require('./middleware/auth')
//     , redirectAuthSucess = require('./middleware/redirectAuthSucess')

// Moteur de templating
const Handlebars    = require("handlebars")
    , MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Handlebars
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next();
})

// Routes
app.use(router)

app.use('/'        , homePage)
app.use('/contact' , contactPage)
app.use('/blog'    , blogPage)

//___________________________ Page Error
app.use((req, res) => {
    res.render('404')
})

app.listen(process.env.PORT || 1711, function () {
    console.log("*******************************************\n***** Welcome to Apps, listen port 1711 ***\n*******************************************\n*******************************************\n*********** http://localhost:1711 *********\n*******************************************\n");
});
