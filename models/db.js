const mongoose = require('mongoose');

mongoose.connect(
	'mongodb://localhost:27017/user',
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	},
	err => {
		if (err !== null) {
			console.log('error in this');
			console.log(err);
		} else {
			console.log('Connected to the database');
		}
	}
);
