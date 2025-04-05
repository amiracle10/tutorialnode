const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://ammiracle12:test123@cluster0.hnbpw6x.mongodb.net/';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');


// listen to requests

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// blog routes
app.use('/blogs/', blogRoutes);


app.get('/about', (req, res) => {
   res.render('about', { title: 'about'});
});



// 404 page
app.use((req, res) =>{
    res.status(404).render('404', { title: '404'});
});