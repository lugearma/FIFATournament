var _ = require('underscore');

var homeControllers = function (users, app){
	
	console.log('Los controladores estan cargados');

	var isntLog = function (req, res, next) {
		if(!req.session.passport.user){
			res.redirect('/');
			return;
		}
		next();
	};

	var isLogedIn = function (req, res, next){
		if(req.session.passport.user){
			res.redirect('/formulario');
		}
		next();
	}

	app.get('/', isLogedIn, function (req, res) {
		res.render('home', {
			nameTornament : 'Torneo FIFA 15',
			encabezado : 'Torneo FIFA 2015',
			leyenda : 'El torneo del mejor juego de futbol esta aqui'
		});
	});

	app.post('/log-in', function (req, res){
		users.push(req.session.passport.user);
		res.redirect('/formulario');
	});

	app.get('/formulario', isntLog, function (req, res){
		res.render('formulario', {
			nombre : req.session.passport.user,
			provider : req.session.passport.user.provider
		});
	});

	app.get('/log-out', function (req, res){
		// user = _.without(users, req.session.passport.user);

		req.session.destroy();
		res.redirect('/');
	});
}

module.exports = homeControllers;