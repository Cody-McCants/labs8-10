var express = require('express');
var router = express.Router();
var account = require('../dal/account');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.account == undefined) {
        res.render('index');
    }
    else {
        var data = { firstname : req.session.account.FirstName };
        res.render('index', data);
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy( function(err) {
        res.render('authenticate/logout.ejs');
    });
});

/* GET Template Example */
router.get('/templatelink', function(req, res, next) {
  res.render('templateexample.ejs');
});

router.get('/authenticate', function(req, res) {
    account.GetByEmail(req.query.email, function (err, account){
        if (err) {
            res.render('authentication/login.ejs', { msg: err});
        }
        else if (account == null) {
            res.render('authentication/login.ejs', { msg: "User not found."});
        }
        else if (account.password != req.query.password)
            res.render('authentication/login.ejs', {msg: "Passwords do not match."});
        else {
            req.session.account = account;
            res.send('User successfully logged in.');
        }
    });
});
router.get('/login', function(req, res) {
    res.render('authenticate/loginform.ejs');
});
module.exports = router;
