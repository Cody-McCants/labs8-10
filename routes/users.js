var express = require('express');
var router = express.Router();
var accountDal = require('../dal/account');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', function(req, res, next) {
  //res.send('Hello, World!');
  res.render('userFormCreate', { subtitle: 'Lab 9' });
});

router.get('/save', function(req, res, next) {
  console.log("firstname equals: " + req.query.Fname);
  console.log("the lastname submitted was: " + req.query.Lname);
  console.log("the email submitted was: " + req.query.email); // prints to console (me) what user entered
  console.log("the password submitted was: " + req.query.password);
  //res.send("Successfully received the request.");
  accountDal.Insert(req.query, function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      res.send("Successfully saved the data.");
    }
  });
});





module.exports = router;