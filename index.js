const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/ApiAuthenticated',{
    useNewUrlParser: true,
    useCreateIndex: true
});

const app = express();


//Middleware
app.use(morgan('dev'));
app.use(bodyparser.json());

//Routes
app.use('/users', require('./routes/users'));

//Get Start Server

const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log(`Server Listening at ${port}`);
});