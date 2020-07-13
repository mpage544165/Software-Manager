const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    /*User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));*/
        console.log(req.user);
    res.send("Dashboard");
});

router.route('/add').get(checkAuthenticated, (req, res) => {
  console.log("In add");
    //req.session.user = newUser;
    //res.redirect('/protected_page');
    //res.json("Post recieived");
    res.json('In Dashboard');
});

function checkAuthenticated(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    else {
      console.log("NOT WORKING");
    }
  }

module.exports = router;