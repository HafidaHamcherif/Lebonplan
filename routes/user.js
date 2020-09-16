const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/');
	},

	// By default, multer removes file extensions so let's add them back
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

router.post('/signup', (req, res) => {
	let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single("image");

	upload(req, res, function (err) {
		// req.file contains information of uploaded file
		// req.body contains information of text fields, if there were any

		if (req.fileValidationError) {
			return res.send(req.fileValidationError);
		} else if (!req.file) {
			return res.send('Please select an image to upload');
		} else if (err instanceof multer.MulterError) {
			return res.send(err);
		} else if (err) {
			return res.send(err);
		}
		const username = req.body.username;
		const password = req.body.password;
		const firstname = req.body.firstname;
		const surname = req.body.surname;
		const profilPicture = req.file;
		const imageUrl = profilPicture.path.replace('public', '');

		// Register
	User.register(
		new User({
			username: username,
			firstName: firstname,
			surname: surname,
			imageUrl: imageUrl,
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










		

		
	});

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
