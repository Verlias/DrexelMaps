var express = require('express');
var path = require('path');
const cors = require('cors'); // Import the cors middleware
const bodyparser = require('body-parser')
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

// Global variables for input
var startdestination = ""
var enddestination = ""
var classNumber = ""

app.get('/', function (req, res) {
    res.redirect('/input/');
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

app.post('/input/', (req, res) => {
    console.log("Using starting Body-parser: ", req.body.startdestination);
    console.log("Using ending Body-parser: ", req.body.enddestination);
    startdestination = req.body.startdestination;
    enddestination = req.body.enddestination;
    res.redirect('/map');
});

app.post('/save/', (req, res) => {
    console.log(req.body.save);
})

app.get('/destinations/', (req, res) => {
    res.json({
        ds: startdestination,
        de: enddestination
    })
});


app.post('/map/', (req, res) => {
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
});

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

app.post('/api/login', async (req, res) => {
  const userData = req.body;

  // Finds existing user in database after receiving 
  // email and password from the frontend login page.
  try{  
    console.log('Email received:', userData.email);
    console.log('Password received:', userData.password);
    const user = await Signup.findOne({'email': userData.email, 'password': userData.password}, 'email password');
    if ((userData.email === user.email) && (userData.password === user.password)){
      res.status(200).send({ message: "Login successful" });
      console.log("Login successful");
    }
  } catch (error) {
      res.status(500).send({ message: 'server error' });
  }
});