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

