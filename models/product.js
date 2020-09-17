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
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
