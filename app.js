const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userSchema = require('./model/db')

const PORT = process.env.PORT || 5050;
const app = express();

const database = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    try {
        mongoose.connect('mongodb+srv://bibekshah:bibek123@cluster0.dsfsc1m.mongodb.net/?retryWrites=true&w=majority', connectionParams);
        console.log("Databse connected successfully!")
    } catch (err) {
        console.log(error)
        console.log('Database connection failed!')
    }
}

database();

//set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Actual routing
app.get('/', (req, res) => {
    res.render('index')
});

app.post('/', (req, res) => {
    var newUser = new userSchema();

    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save((err, data) => {
        if (err) {
            console.log('Data not inserted: ' + err)
        } else {
            res.send('Data inserted successfully')
        }
    });

    res.redirect('/')
});


// const PORT = process.env.PORT || '8080'

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})