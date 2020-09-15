const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
	res.render('admin');
});

router.get('/add-product', (req, res) => {
	res.render('admin/add-product');
});

router.post('/add-product', (req, res) => {
	res.redirect('admin/products');
});

module.exports = router;
