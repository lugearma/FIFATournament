var passport = require('passport'),
	passportTwitter = require('passport-twitter'),
	TwitterStrategy = passportTwitter.Strategy;

var User = require('../models/user');
// var key = require('../key');
var TwitterConnection = function (app){
	console.log('Twitter esta listo');

	passport.use(new TwitterStrategy({
		consumerKey : 'dtQ2TFHwuRGM2xsvMpECcyOPh',
		consumerSecret : 'R8gNLwCnj6jL7CEoIzKls3uEU9rTAzgcH7SpkOBHyEb0ScWqgn',
		callbackURL : 'http://127.0.0.1:3000/auth/twitter/callback'
	},function (token, tokenSecret, profile, done){

		user = new User({
			name : profile.username,
			twitter : profile
		});

		user.save(function (err) {
			if (err){
				done(err, null);
				return;
			}
			done(null, profile);
		});
	}));

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', { 
		failureRedirect : '/', 
		successRedirect : '/formulario' 
	}));
};

module.exports = TwitterConnection;