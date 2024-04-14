var express = require('express');
var path = require('path');
const cors = require('cors'); // Import the cors middleware
const bodyparser = require('body-parser')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

var app = module.exports = express();

app.engine('.html', require('ejs').__express);

app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors());
app.use(bodyparser.json())

// Optional since express defaults to CWD/views
app.set('views', path.join(__dirname, 'views'));

// Path to our public directory
app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Global variables for input
var startdestination = ""
var enddestination = ""
var classNumber = ""

// db connection
let db
connectToDb((err) => {
    if (!err) {
        /* istanbul ignore next */
        if (!module.parent) {
            app.listen(3000);
            console.log('Express started on port 3000');
        }
        db = getDb()
    }
})

// Main Page
app.get('/', function (req, res) {
    res.redirect('/input');
});

// Input Form
app.get('/input', function (req, res) {
    res.render('input', {
        title: "Input Form",
        err: "",
        location: [{ name: 'Ross Commons', id: '#Ross_Commons' }],
    });
});

app.get('/destinations/', function (req, res) {
    res.json({
        ds: startdestination,
        de: enddestination
    })
})

app.post('/input/', (req, res) => {
    console.log("Using starting Body-parser: ", req.body.startdestination);
    console.log("Using ending Body-parser: ", req.body.enddestination);
    startdestination = req.body.startdestination;
    enddestination = req.body.enddestination;
    res.json({
        startdestination,
        enddestination
    })
    //res.redirect('/map');
});

// Floor Page
app.get('/floor', function (req, res) {
    res.render('korman1', {
        title: "floor",
        err: "",
        id: "#N" + classNumber.toString(),
    });
});

// Map Page
app.get('/map', async function (req, res) {
    res.render('map', {
        title: "Map",
        ds: startdestination,
        de: enddestination,
    });
});

app.post('/map/', (req, res) => {
    classNumber = req.body.classNumber;
    console.log(classNumber);
    res.redirect('/floor');
});

// Profile Page
app.get('/profile/:drexelid', (req, res) => {

    db.collection('users')
        .findOne({ drexelid: req.params.drexelid })
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not fetch document'})
        })
})


