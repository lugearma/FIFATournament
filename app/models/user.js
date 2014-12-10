var models = require('./models'),
	Schema = models.Schema;

var userSchema = new Schema({

		username : 'string',
		object : Schema.Types.Mixed
});

var Users = models.model('user', userSchema);

module.exports = Users;