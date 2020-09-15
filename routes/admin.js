const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
	res.render('admin');
});

router.get('/add-product', (req, res) => {
	res.render('add-product');
});

router.post('/add-product', (req, res) => {
	res.redirect('/products');
});

router.get('/edit-product/:productId');

router.post('/edit-product');

module.exports = router;
