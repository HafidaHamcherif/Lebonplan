const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // Save the user.id to the session
passport.deserializeUser(User.deserializeUser()); // Receive the user.id from the session and fetch the User from the DB by its ID

exports.postSignUp = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const firstname = req.body.firstname;
	const surname = req.body.surname;
	const profilPicture = req.file.path;

	// Register
	User.register(
		new User({
			username: username,
			firstName: firstname,
			surname: surname,
			profilPicture,
			// other fields can be added here
		}),
		password, // password will be hashed
		(err, user) => {
			if (err) {
				console.log('/users/signup user register err', err);
				return res.render('users/signup');
			} else {
				passport.authenticate('local')(req, res, () => {
					res.render('users/profile');
				});
			}
		}
	);
};

exports.getSignUp = (req, res) => {
	console.log('GET /signup');
	if (req.isAuthenticated()) {
		res.redirect('/logout');
	} else {
		res.render('users/signup');
	}
};

exports.postLogIn = passport.authenticate('local', {
	successRedirect: 'homelogin',
	failureRedirect: 'users/login',
});

exports.getLogIn = (req, res) => {
	console.log('GET /profile');
	if (req.isAuthenticated()) {
		res.redirect('profile');
	} else {
		res.render('users/login');
	}
};

exports.getHomelogin = (req, res) => {
	console.log('GET /home');
	if (req.isAuthenticated()) {
		res.render('homelogin', {
			user : req.user.toObject()
		}	
		);

	} else {
		res.redirect('/logout');
	}
};

exports.getProfile = (req, res) => {
	console.log('GET /profile');
	if (req.isAuthenticated()) {
		console.log(req.user);
		res.render('users/profile', {
			user : req.user.toObject()
		}
		);
	} else {
		res.redirect('/logout');
	}
};

exports.getLogOut = (req, res) => {
	console.log('GET users/logout');
	req.logout();
	res.redirect('/');
};