var express = require('express');
var path = require('path');
const cors = require('cors'); // Import the cors middleware
const bodyparser = require('body-parser')
// const { ObjectId } = require('mongodb')
// const { connectToDb, getDb } = require('./db')
const mongoose = require('mongoose');

var app = module.exports = express();
const signupRoute = require('./signup');
console.log('Express started on port 3000')
// un comment applisten if you are commenting out the database
//app.listen(3000)
const uri = "mongodb+srv://loganvoravong:606h6mKrlBLaHkFm@drexelmapusers.zzgb1wf.mongodb.net/?retryWrites=true&w=majority&appName=drexelmapusers";

// Set the Stable API version in the MongoClientOptions object
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri, clientOptions)
  .then(() => 
  console.log('mongo connect successful'),
  app.listen(3000))
  .catch(error => console.error('mongo connect error:', error));
  

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  confirmPassword: String
});

const Signup = mongoose.model('Signup', signupSchema);

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);

app.use(bodyparser.urlencoded({ extended: true }))
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

// Dummy users
var users = [
    { name: 'tobi', email: 'tobi@learnboost.com' },
    { name: 'loki', email: 'loki@learnboost.com' },
    { name: 'jane', email: 'jane@learnboost.com' }
];

var location = [
  //{ name: 'Academic Building', id: '#Academic_Building'},
  //{ name: 'Gateway Garden', id: '#Gateway_Garden'},
  //{ name: 'URBN Center', id: '#URBN_Center'},
  //{ name: '3401 Market Street School of Education', id: '#3401_Market_Street_School_of_Education'},
  //{ name: 'Urban Eatery', id: '#Urban_Eatery'},
  //{ name: 'URBN Center Annex', id: '#URBN_Center_Annex'},
  //{ name: 'Health Sciences Building', id: '#Health_Sciences_Building'},
  //{ name: '3675 Market Street College of Computing Informatics', id: '#3675_Market_Street_College_of_Computing_Informatics'},
  //{ name: 'Drexel Recreation Center', id: '#Drexel_Recreation_Center'},
  //{ name: 'Rush Building', id: '#Rush_Building'},
  //{ name: 'Nesbitt Hall', id: '#Nesbitt_Hall'},
  //{ name: 'Armory', id: '#Armory'},
  //{ name: 'University Crossings', id: '#University Crossings'},
  //{ name: 'Caneris Hall', id: '#Caneris_Hall'},
  //{ name: 'Lindy Center for Civic Engagement', id: '#Lindy_Center_for_Civic_Engagement'},
  //{ name: '3210 Cherry Street', id: '#3210_Cherry_Street'},
  { name: 'North Hall', id: '#North_Hall'},
  //{ name: 'Bentley Hall Pennoni Honors College', id: '#Bentley_Hall_Pennoni_Honors_College'},
  { name: 'Towers Hall', id: '#Towers_Hall'},
  { name: 'Northside Dining Terrace', id: '#Northside_Dining_Terrace'},
  { name: 'Race Street Residences', id: '#Race_Street_Residences'},
  { name: 'Raymond G. Perelman Center for Jewish Life', id: '#Raymond_G._Perelman_Center_for_Jewish_Life'},
  { name: 'Kelly Hall', id: '#Kelly_Hall'},
  { name: 'Van Rensselaer Hall', id: '#Van_Rensselaer_Hall'},
  { name: 'Millennium Hall', id: '#Millennium_Hall'},
  { name: 'Ross Commons', id: '#Ross_Commons'},
  { name: 'Language and Communication Center', id: '#Language_and_Communication_Center'},
  { name: 'PSA Building', id: '#PSA_Building'},
  ////{ name: 'General Services Building', id: '#General_Services_Building'},
  //{ name: 'Kline Law Building and Library', id: '#Kline_Law_Building_and_Library'},
  //{ name: 'W.W. Hagerty Library', id: '#W.W._Hagerty_Library'},
  //{ name: 'The Study at University City', id: '#The_Study_at_University_City'},
  //{ name: 'Integrated Sciences Building', id: '#Integrated_Sciences_Building'},
  { name: 'Korman Center', id: '#Korman_Center'},
  //{ name: 'Pearlstein Business Learning Center', id: '#Pearlstein_Business_Learning_Center'},
  //{ name: 'College of Business', id: '#College_of_Business'},
  //{ name: 'Disque Hall', id: '#Disque_Hall'},
  //{ name: 'Stratton Hall', id: '#Stratton_Hall'},
  //{ name: 'Paul Peck Alumni Center', id: '#Paul_Peck_Alumni_Center'},
  //{ name: 'Bossone Research Enterprise Center', id: '#Bossone_Research_Enterprise_Center'},
  //{ name: 'LeBow Engineering Center College of Engineering', id: '#LeBow_Engineering_Center_College_of_Engineering'},
  //{ name: 'Center for Automation Technology', id: '#Center_for_Automation_Technology'},
  //{ name: 'Main Building', id: '#Main_Building'},
  //{ name: 'Randell Hall', id: '#Randell_Hall'},
  //{ name: 'Curtis Hall', id: '#Curtis_Hall'},
  //{ name: 'Alumni Engineering Labs', id: '#Alumni_Engineering_Labs'},
  //{ name: 'Chestnut Square A', id: '#Chestnut_Square_A'},
  //{ name: 'MacAlister Hall College of Arts and Sciences', id: '#MacAlister_Hall_College_of_Arts_and_Sciences'},
  //{ name: 'James Creese Student Center', id: '#James_Creese_Student_Center'},
  //{ name: 'Mandell Theater', id: '#Mandell_Theater'},
  //{ name: 'Chestnut Square B', id: '#Chestnut_Square_B'}
]

// Global variables for input
var startdestination = ""
var enddestination = ""
var classNumber = ""


// db connection
// let db

// connectToDb((err) => {
    // if (!err) {
        /* istanbul ignore next */
        // if (!module.parent) {
            // app.listen(3000);
            //console.log('Express started on port 3000');
        // }
        //db = getDb()
    // }
// })

app.get('/', function (req, res) {
    res.render('users', {
        users: users,
        title: "EJS example",
        header: "Some users"
    });
});

app.get('/test', function (req, res) {
    res.render('test', {
        title: "EJS example",
        header: "Some users"
    });
});

app.get('/input', function (req, res) {
    res.render('input', {
        title: "Input Form",
        err: "",
        location: location
    });
});

app.get('/floor', function (req, res) {
  res.render('korman1', {
    title: "floor",
    err: "",
    id: "#N" + classNumber.toString(),
});
});

app.get('/map-test', function (req, res) {
    location.forEach(function (one) {
        if (one.name == startdestination) {
            startid = one.id
        }
    })
    res.render('map-test', {
        title: "test",
        err: "",
        id: startid
    });
});

app.post('/input/', (req, res) => {
    console.log("Using starting Body-parser: ", req.body.startdestination);
    console.log("Using ending Body-parser: ", req.body.enddestination);
    startdestination = req.body.startdestination;
    enddestination = req.body.enddestination;
    res.redirect('/map');
})


app.post('/map/', (req, res) => {
    classNumber = req.body.classNumber;
    console.log(classNumber);
    res.redirect('/floor');
})

app.post('/map-test/', (req, res) => {
    classNumber = req.body.classNumber;
    console.log(classNumber);
    res.redirect('/floor');
})

/* Example of getting nodes from DB
async function getNodesFromDB() {
    let nodes = [];
    const cursor = db.collection('nodes').find();

    await cursor.forEach(node => {
        nodes.push(node);
    });

    return nodes;
}
*/

app.get('/map', async function (req, res) {
    try {
        //let nodes = await getNodesFromDB();

        res.render('map', {
            title: "Map",
            ds: startdestination,
            de: enddestination,
        });
    } catch (error) {
        console.error('Error retrieving nodes:', error);
        // Handle the error appropriately, for example:
        res.status(500).send('Internal Server Error');
    }
});

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

app.post('/api/signup', async (req, res) => {

    const formData = req.body;
    // Process the form data (e.g., save to a database)
    try{
      const newSignup = new Signup(formData);
      await newSignup.save();
  
      console.log('Sign up data received:', formData);
      res.send({ message: 'Sign up successful' });
     } catch (error) {
       console.error('error on mongo save', error);
       res.status(500).send({ message: 'server error' });
    }
  });

  app.get('/api/login', async (req, res) => {
    const userData = req.body;

    // Process the form data (e.g., save to a database)
    try{  
      console.log('Email received:', userData.email);
      console.log('Password received:', userData.password)

      if (true){
        res.send({ message: 'Login successful' });
      }
     } catch (error) {
       console.error('Could not find user', error);
       res.status(500).send({ message: 'server error' });
    }
  });