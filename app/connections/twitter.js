var passport = require('passport'),
	passportTwitter = require('passport-twitter'),
	TwitterStrategy = passportTwitter.Strategy;

var keys = require('../conf/keys');

var User = require('../models/user');

var TwitterConnection = function (app){
	console.log('Twitter esta listo');

	passport.use(new TwitterStrategy({
		consumerKey : keys.twitter.consumerKey,
		consumerSecret : keys.twitter.consumerSecret,
		callbackURL : keys.twitter.callbackURL
	},function (token, tokenSecret, profile, done){

		user = new User({
			username : profile.username,
			object : profile
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
		successRedirect : '/participantes' 
	}));
};

module.exports = TwitterConnection;