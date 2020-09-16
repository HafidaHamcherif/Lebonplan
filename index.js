const express = require('express');
const exphbs = require('express-handlebars');
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
});

app.use(express.static('public'))

// Express configuration

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable session management
app.use(
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
);
});   

app.get("/login", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/admin");
    } else {
        res.render("login");
    }
});

app.post(
"/login",
passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login"
})
);

app.get("/logout", (req, res) => {
    console.log("GET /logout");
    req.logout();
    res.redirect("/");
  });


// app.post('/users',(req, res) => {
//     res.send('users')
// });
// app.get('/products',(req, res) => {
//     res.send('products')
// });

// app.get('/login',(req, res) => {
//     res.send('login')
// });



// Start server
app.listen(port, () => {
	console.log(`Server satrted on port: ${port}`);
});
