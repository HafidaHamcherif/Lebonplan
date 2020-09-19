const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	surname: String,
	imageUrl: String,
	created: {
		type: Date,
		default: Date.now,
	},
	// products: [
	// 	{
	// 		productId: {
	// 			type: mongoose.Schema.Types.ObjectId,
	// 			ref: 'Product',
	// 			required: true,
	// 		},
	// 	},
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
