const express = require('express');
const router = express.Router();
const storeController = require('../controller/store');

router.get('/products', storeController.getProducts);

router.get('/products/cities/:city', (req, res) => {
	res.render('mystore/city');
});

router.get('/products/:productId', storeController.getProductDetails);

router.get('/', storeController.getHome);

// router.get('/homelogin', authController.getHomelogin);

module.exports = router;
