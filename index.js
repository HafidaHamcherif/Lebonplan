const express = require('express');
const exphbs = require('express-handlebars');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const storeRoutes = require('./routes/store');

// Port
const port = process.env.PORT || 3000;
const app = express();

// Config of handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// Routes
app.use(storeRoutes);
app.use('/admin', adminRoutes);
app.use(userRoutes);

app.get('/', (req, res) => {
	res.render('home');
});

// Start server
app.listen(port, () => {
	console.log(`Server satrted on port: ${port}`);
});
