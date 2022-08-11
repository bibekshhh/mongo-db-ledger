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
var retrievedData;

// Actual routing
app.route('/').get((req, res) => {
    res.render('index', {
        retrievedData: retrievedData
    });

    userSchema.find({}).exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            retrievedData = data;
            console.log(`${retrievedData.length} Data retrieved successfully!`)
        }
    });
});

app.route('/:name').get((req, res) => {

    var query = req.params;
    userSchema.findOneAndRemove(query, (err, data) => {
        if (err) throw err
        console.log('Data for ' + data.name + ' deleted successfully')
    });

    res.redirect('/');
});

app.route('/').post((req, res) => {
    var newUser = new userSchema();

    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save((err, data) => {
        if (err) {
            console.log('Data not inserted: ' + err)
        } else {
            console.log('Data inserted successfully')
        }
    });

    res.redirect('/')
});

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})