const path = require('path');
// Third party modules
const express = require('express');
const multer = require('multer');
const exphbs = require('express-handlebars');
<<<<<<< HEAD
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
=======
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models").User;

// gestion de date
const { formatDate, getTimeBetweenDates } = require('./utils/date')

const port = process.env.PORT || 3000;
const app = express();



mongoose.connect('mongodb://localhost:27017/bon_plan', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err !== null) {
        console.log('error in this')
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});


const multer  = require('multer');
const upload = multer({ 
    dest: 'public/uploads/'
>>>>>>> 34cec5494eafe8188f0d640156ed8f54fd477e0f
});
pp.use(multer({ storage: fileStorage }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// enable session management
app.use(
<<<<<<< HEAD
	expressSession({
		secret: 'samurai',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
=======
    expressSession({
      secret: "samurai",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );

// enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // Save the user.id to the session
passport.deserializeUser(User.deserializeUser()); // Receive the user.id from the session and fetch the User from the DB by its ID
 

app.get('/', (req, res) => {
    res.render('home'); 
    // res.send('Welcome to teh bon plan!');
        
});

app.get("/admin", (req, res) => {
console.log("GET /admin");
if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("admin");
} else {
    res.redirect("/");
}
});

app.get("/signup", (req, res) => {
console.log("GET /signup");
if (req.isAuthenticated()) {
    res.redirect("/admin");
} else {
    res.render("signup");
}
});

app.post("/signup",upload.single('image'), (req, res) => {
console.log("POST /signup");
console.log('POST / signup req.file', req.file);
console.log('POST / signup req.file', req.body);
console.log('form parameter', req.body.username); 
console.log("will signup");

const username = req.body.username;
const password = req.body.password;
const firstname = req.body.firstname;
const surname = req.body.surname;
const  profilPicture  = req.file.path;

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
        console.log("/users/signup user register err", err);
        return res.render("signup");
    } else {
        passport.authenticate("local")(req, res, () => {
        res.redirect("/admin");
        });
    }
    }
>>>>>>> 34cec5494eafe8188f0d640156ed8f54fd477e0f
);

// enable Passport
app.use(passport.initialize());
app.use(passport.session());

<<<<<<< HEAD
// Routes
app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use(storeRoutes);
=======
>>>>>>> 34cec5494eafe8188f0d640156ed8f54fd477e0f

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
