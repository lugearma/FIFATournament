var _ = require('underscore');

var User = require('../models/user');
var appController = function (app, users){
	
	console.log('App esta cargada');

	var isntLog = function (req, res, next){
		if(!req.isAuthenticated()){
			res.redirect('/');
			return;
		}
		next();
	};

	var getUser = function (req, res, next){
		User.find({ username : req.session.passport.user.displayName }, function (err, user) {
			debugger;

			req.user = user;
			next();
		});
	};

	//Checa si el participantes es log-in
	app.get('/participantes', isntLog, getUser,function (req, res){
		res.render('participantes', {
			participante : req.session.passport.user,
			provider : req.session.passport.user.provider,
			user : users
		});
	});

	app.get('/log-out', function (req, res){
		user = _.without(users, req.session.passport.user);

		req.session.destroy();
		res.redirect('/');
	});
};

module.exports = appController;