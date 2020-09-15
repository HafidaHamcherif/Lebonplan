const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

router.get('/signup', (req, res) => {
	console.log('GET /signup');
	if (req.isAuthenticated()) {
		res.redirect('/profile');
		console.log('I am redirected');
	} else {
		res.render('users/signup');
	}
});

router.post('/signup', (req, res) => {
	console.log('POST /signup');
	console.log('POST / signup req.file', req.file);
	console.log('POST / signup req.file', req.body);
	console.log('form parameter', req.body.username);
	console.log('will signup');

	const username = req.body.username;
	const password = req.body.password;
	const firstname = req.body.firstname;
	// const surname = req.body.surname;
	// const profilPicture = req.file.path;

	// Register
	User.register(
		new User({
			username: username,
			firstName: firstname,
			surname: surname,
			// profilPicture,
			// other fields can be added here
		}),
		password, // password will be hashed
		(err, user) => {
			if (err) {
				console.log('/users/signup user register err', err);
				return res.render('users/signup');
			} else {
				passport.authenticate('local')(req, res, () => {
					res.redirect('/profile');
				});
			}
		}
	);
});

router.get('/login', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/profile');
	} else {
		res.render('users/login');
	}
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/admin',
		failureRedirect: '/login',
	}),
	(req, res) => {
		res.redirect('/profile');
	}
);

router.get('/logout', (req, res) => {
	console.log('GET /logout');
	req.logout();
	res.redirect('/');
});

router.get('/profile', (req, res) => {
	res.render('users/profile');
});

module.exports = router;
