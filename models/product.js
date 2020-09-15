const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 

const ProductsSechema = new mongoose.Schema({
    name: String, 
    price: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
}); 


const Products = mongosse.model('Products', ProductsSchema);

module.exports = Products;