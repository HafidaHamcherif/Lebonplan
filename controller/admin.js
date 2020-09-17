const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
	const name = req.body.name;
	const price = req.body.price;
	const city = req.body.city;
	const description = req.body.description;
	const imageUrl = req.file.path;

	const product = new Product({
		name: name,
		price: price,
		city: city,
		description: description,
		imageUrl: imageUrl,
	});
	product
		.save()
		.then(product => {
			console.log(`your ${product.name} has been saved`);
		})
		.catch(err => {
			console.log('save item failed');
		});
	res.redirect('/admin/products');
};

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product');
};

exports.getProducts = (req, res) => {
	Product.find().then(products => {
		const productsList = products.map(product => product.toObject());
		res.render('admin/products', {
			prods: productsList,
			hasProducts: products.length > 0,
		});
	});
};
