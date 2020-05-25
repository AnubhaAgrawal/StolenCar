const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = process.env.PORT ||8080;

const routes = require('./routes/api');

MONGODB_URI = 'mongodb://localhost:27017/mern1'
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>{
    console.log('Mongoose is Connected');
})




app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', routes);
app.listen(PORT, console.log(`server is starting at ${PORT}`));