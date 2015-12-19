var express = require('express');
var router = express.Router();
var userDal   = require('../dal/user');


router.get('/UserJobView', function (req, res) {
    userDal.GetUserJobView(function (err, result) {
            if (err) throw err;

            res.render('UserJobViewdisplay.ejs', {rs: result} );
        }
    );
});

module.exports = router;
