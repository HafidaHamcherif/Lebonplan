<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 

const ProductsSechema = new mongoose.Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    name: String, 
    price: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
}); 

ProductsSechema.plugin(passportLocalMongoose);

const Products = mongosse.model('Products', ProductsSchema);

module.exports = Products;

>>>>>>> 29671a463656bf024d1409e0e4f0bd7e5ffe929e
