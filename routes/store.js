const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/products', (req, res) => {
	res.render('store-products');
});

router.get('/products/cities/:city', (req, res) => {
	res.render('city');
});

router.get('/products/:productId', (req, res) => {
	res.render('product-details');
});

module.exports = router;
