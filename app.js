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
,     user           = require('./api/controllers/user')
,     admin          = require('./api/controllers/adminPage')

// Router
,     routes         = require('./api/index')

var PORT = process.env.PORT || 1711;
const http = require('http');
const server = http.Server(app);

//___________________________ DB
mongoose 
        // .connect(db , { useNewUrlParser: true })
        .connect('mongodb://localhost:27017/portfolio', {
            useCreateIndex: true,
            useNewUrlParser: true
          })
        .then(()    => console.log('Connecter a MongoDB Cloud'))
        .catch(err  => console.log(err));

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
    next();
})

//user or not user
app.use('*', function(req, res, next) {
    res.locals.user = req.session.userId;
    next()
});

//routes
app.use('/', routes);

//___________________________ Page Error
app.use((req, res) => {
    res.render('404')
})

server.listen(PORT, function () {
    console.log("*******************************************\n***** Welcome to Apps, listen port 1711 ***\n*******************************************\n*******************************************\n*********** http://localhost:1711 *********\n*******************************************\n");
});
