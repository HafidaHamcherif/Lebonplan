const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: String,
	price: String,
	city: String,
	description: String,
	imageUrl: String,
	created: {
		type: Date,
		default: Date.now,
	},
	// userId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'User',
	// 	required: true,
	// },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
