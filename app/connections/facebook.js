var passportFacebook = require('passport-facebook'),
	passport = require('passport'),
	FacebookStrategy = passportFacebook.Strategy;

var keys = require('../conf/keys');

var User = require('../models/user.js');

var facebookConnection = function (app, users){
	console.log('Facebook esta listo');

	passport.use(new FacebookStrategy({
		clientID : keys.facebook.clientID,
		clientSecret : keys.facebook.clientSecret,
		callbackURL : keys.facebook.callbackURL
	}, function (accessToken, refreshToken, profile, done){


		var user = new User({
			username : profile.displayName,
			object : profile
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
		successRedirect : '/participantes'}));
};

module.exports = facebookConnection;