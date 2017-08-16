var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects
app.use(expressValidator());

app.get('/', function(req, res) {
  var html = '<form action="/signup/new" method="post">' +
  '<h1>Sign up</h1>' +
  '<p>Name</p>' +
  '<input type="text" name="name" placeholder="name" />' +
  '<p>Enter your email</p>' +
  '<input type="text" name="email" placeholder="email address" />' +
  '<p>Enter your password</p>' +
  '<input type="password" name="password" placeholder="password" />' +
  '<p> Select position </p>' +
  '<select name="position">' +
  '<option value="technical manager">Technical Manager</option>' +
  '<option value="dev">Dev</option>' +
  '<option value="UI designer">UI designer</option>' +
  '<option value="graphic designer">Graphic designer</option>' +
  '</select>' +
  '<button type="submit">Submit</button>' +
  '</form>';
  res.send(html);
});

app.post('/signup/new', function(req, res) {
  console.log(req.body);
  req.checkBody({
    'name': {
      notEmpty: true,
      isLength: {
        options: [
          {
            min: 2,
            max: 100
          }
        ],
        errorMessage: 'Must be between 2 and 100 chars long'
      }
    },
    'email': {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid Email'
      }
    },
    'password': {
      notEmpty: true,
      errorMessage: 'Invalid Password' // Error message for the parameter
    }
  });
  let email = req.body.email;
  var errors = req.validationErrors();
  if (errors) {
    // Render validation error messages
    var html = errors;
    res.send(html);
  } else {
    var html = '<p>Your email is: </p>' + email;
    res.send(html);
  }
});

app.listen(3000, function() {
  console.log('Hey its running');
});
