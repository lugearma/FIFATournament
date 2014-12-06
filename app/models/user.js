var models = require('./models'),
	Schema = models.Schema;

var userSchema = new Schema({

// facebook : {
		username : 'string',
		object : Schema.Types.Mixed
	// }


	// facebook : {
	// 	username : 'string',
	// 	object : Schema.Types.Mixed
	// }

	// twitter : {
	// 	username : 'string',
	// 	object : Schema.Types.Mixed
	// }
});

var Users = models.model('user', userSchema);

module.exports = Users;