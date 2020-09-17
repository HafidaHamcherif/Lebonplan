const path = require('path');
// Third party modules
const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
// Local modules
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const storeRoutes = require('./routes/store');

// Express configuration
const app = express();
const port = process.env.PORT || 3000;
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Multer Configuration
const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + file.originalname);
	},
});
pp.use(multer({ storage: fileStorage }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// enable session management
app.use(
	expressSession({
		secret: 'samurai',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// enable Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use(storeRoutes);

// Start the server et Database
mongoose
	.connect('mongodb://localhost:27017/bon_plan', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(result => {
		app.listen(port, () => {
			console.log(`Server satrted on port: ${port}`);
		});
	})
	.catch(err => {
		console.log(err);
	});
