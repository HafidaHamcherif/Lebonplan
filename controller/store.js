const Product = require('../models/product');

exports.getProductDetails = (req, res) => {
	// console.log(req.params.productId);
	const productId = req.params.productId;
	Product.findById(productId)
		.then(prod => {
			const product = prod.toObject();
			res.render('mystore/product-details', {
				product: product,
			});
		})
		.catch(err => console.log(err));
};

exports.getProducts = (req, res) => {
	Product.find().then(products => {
		const productsList = products.map(product => product.toObject());
		// console.log(products);
		res.render('mystore/products', {
			prods: productsList,
			hasProducts: products.length > 0,
		});
	});
};

exports.getHome = (req, res) => {
	res.render('mystore/home');
};
