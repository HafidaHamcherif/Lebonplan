const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');


const port = 3000;
const app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost:27017/user', {
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

app.get('/', (req, res) => {
    res.render('home'); 
    // res.send('Welcome to teh bon plan!');
        
});
app.get('/users',(req, res) => {
    res.send('users')
});
app.get('/products',(req, res) => {
    res.send('products')
});



app.listen(port, () => {
    console.log(`Server satrted on port: ${port}`) // to confirme that server is started on that port
});