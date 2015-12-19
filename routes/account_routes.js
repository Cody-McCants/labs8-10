var express = require('express');
var router = express.Router();
var accountDal   = require('../dal/account');

router.get('/all', function(req, res) {
  accountDal.GetAll(function (err, result) {
          if (err) throw err;
          //res.send(result);
          res.render('AllAccountsdisplay.ejs', {rs: result});
        }
    );
});

router.get('/', function (req, res) {
    accountDal.GetByID(req.query.account_id,
        function (err, result) {
            if (err) throw err;
            accountDal.GetAddress(req.query.account_id, function(err, addressResults){
                res.render('AccountinfoDisplay.ejs', {
                    rs: result,
                    account_id: req.query.account_id,
                    addressResults: addressResults}
                );
            })
        }
    );
});

router.get('/create', function(req, res, next) {
    res.render('account/addnewaccount', { subtitle: 'Lab 9' });
});

router.get('/add_new_address', function(req, res){
    console.log(req.query.account_id);
    accountDal.GetAll(function(err, addressResults){
        console.log(addressResults);
        res.render('account/addnewaddress', {
            addressResults: addressResults,
            account_info: req.query
        });
    })
});

router.get('/save_new_address', function(req, res){
    console.log(req.query);
    accountDal.AddAddress(req.query, function(err, result){
        if(err) {
            res.send('Error saving address to user: ' + err);
        }
        else {
            res.send('Successfully associated address with the user.');
        }
    });
});

router.get('/delete', function(req, res, next) {
    res.render('account/accountdelete', { subtitle: 'Lab 10' });
});

router.get('/delete_account', function(req, res){
    console.log(req.query.account_id);
    accountDal.DeleteAccount(req.query, function(err, result){
        if(err) {
            res.send('Error deleting account: ' + err);
        }
        else {
            res.send('Successfully deleted user account.');
        }
    });
});

module.exports = router;
