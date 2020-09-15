const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('mystore/home');
});

router.get('/products', (req, res) => {
	res.render('mystore/products');
});

router.get('/products/cities/:city', (req, res) => {
	res.render('mystore/city');
});

router.get('/products/:productId', (req, res) => {
	res.render('mystore/product-details');
});

module.exports = router;
