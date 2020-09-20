const Product = require('../models/product');

exports.getProductDetails = (req, res) => {
	console.log(req.params.productId);
	const productId = req.params.productId;
	Product.findById(productId)
		.then(prod => {
			const product = prod.toObject();
			res.render('mystore/product-details', {
				user : req.user.toObject(),
				product: product,
			});
		})
		.catch(err => console.log(err));
};

exports.getProducts = (req, res) => {
	Product.find().then(products => {
		const productsList = products.map(product => product.toObject());
		console.log(products);
		res.render('mystore/products', {
			user : req.user.toObject(),
			prods: productsList,
			hasProducts: products.length > 0,
		});
	});
};

// exports.getMyproducts = (req, res) => {
// 	Product.find().then(products => {
		
// 		console.log(myproducts);
// 		res.render('mystore/myproducts', {
// 			user : req.user.toObject(),
		
			
// 		});
// 	});
// };
// exports.getMyproducts = (req, res) => {
// 	Product.find().then(products => {
// 	console.log('GET /my products');
// 	console.log(myproducts);
	
// 		res.render('mystore/myproducts', {
// 			user : req.user.toObject()
// 		}	
// 		);
// 	});
// };

exports.getHome = (req, res) => {
	res.render('mystore/home');
};
