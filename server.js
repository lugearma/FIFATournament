var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	morgan = require('morgan'),
	swig = require('swig'),
	path = require('path'),
	passport = require('passport');

var RedisStore = require('connect-redis')(session);

var app = express();

var users = [];

//Configuramos el Template System (swig)
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './app/views'));

//Configuracion del server
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ 
			secret : 'Hola sos botudo',
			store : new RedisStore({}),
			resave : true,
			saveUninitialized : true
		}));
app.use(express.static(path.join(__dirname, './app/public')));

//Conectamos con passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done){
	done(null, user);
});

passport.deserializeUser(function (obj, done){
	done(null, obj);
});

//Importamos los controladores y los cargamos
var homeControllers = require('./app/controladores/home.js');
var appControllers = require('./app/controladores/app.js')

homeControllers(app, users);
appControllers(app, users);

//Cargamos los conecciones
var facebookConnection = require('./app/connections/facebook.js');
facebookConnection(app);

var twitterConnection = require('./app/connections/twitter.js');
twitterConnection(app);

//Escuchamos al server
app.listen(3000);