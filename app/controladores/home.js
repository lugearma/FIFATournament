var _ = require('underscore');
var user = require('../models/user');

var homeControllers = function (app, users){
	
	console.log('El home esta cargado');

	
	//Middleware que checa si el participante esta logeado
	var isLogedIn = function (req, res, next){
		if(req.isAuthenticated()){
			res.redirect('/participantes');
			return;
		}
		next();
	};


	app.get('/', isLogedIn, function (req, res) {
		res.render('home', {
			nameTornament : 'Torneo FIFA 15',
			encabezado : 'Torneo FIFA 2015',
			leyenda : 'El torneo del mejor juego de futbol esta aqui'
		});
	});

	app.get('/log-in', function (req, res){
		users.push(req.session.passport.user);
		res.redirect('/auth/facebook');
	});
};

module.exports = homeControllers;