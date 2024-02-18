var express = require('express');
var path = require('path');
const bodyparser = require('body-parser')

var app = module.exports = express();

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

app.get('/', function(req, res){
  res.render('users', {
    users: users,
    title: "EJS example",
    header: "Some users"
  });
});

app.get('/test', function(req, res){
  res.render('test', {
    title: "EJS example",
    header: "Some users"
  });
});

app.get('/input', function (req, res) {
  res.render('input2', {
      title: "Input Form",
      err: ""
  });
});

app.post('/input/', (req, res) => {
  console.log("Using Body-parser: ", req.body.destination)
  if (["Disque Hall 108", "Randell Hall 120", "Lebow Engineering Center 134", "Korman Center 111"].includes(req.body.destination)) {
    res.redirect('/map')
  }
  else {
    res.render('input2', {
      title: "Input Form",
      err: "Please Input a Valid Location"
    });
  }
})

app.get('/map', function (req, res) {
  res.render('map', {
      title: "Map"
  });
});

app.get('/about', function (req, res) {
  res.render('about', {
      title: "About"
  });
});



/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}