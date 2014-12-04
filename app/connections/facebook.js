var passportFacebook = require('passport-facebook'),
	passport = require('passport'),
	FacebookStrategy = passportFacebook.Strategy;

var User = require('../models/user.js');

var facebookConnection = function (app){
	console.log('Facebook esta listo');

	passport.use(new FacebookStrategy({
		clientID : '1003671356315608',
		clientSecret : '807780f14e4f2c2536b55ed4bd76803d',
		callbackURL : 'http://localhost:3000/auth/facebook/callback'
	}, function (accessToken, refreshToken, profile, done){

		var user = new User({
			name : profile.displayName,
			facebook : profile
		});
		
		user.save(function (err){
			if(err){
				done(err, null);
				return;
			}

			done(null, profile);
		});

	}));

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect : '/?error = algo-fallo',
		successRedirect : '/formulario'}));
};

module.exports = facebookConnection;