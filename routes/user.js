const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
	res.render('signup');
});

router.post('/signup', (req, res) => {
	res.redirect('login');
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.post('/login', (req, res) => {
	res.redirect('/profile');
});

router.get('/profile', (req, res) => {
	res.render('profile');
});

module.exports = router;
