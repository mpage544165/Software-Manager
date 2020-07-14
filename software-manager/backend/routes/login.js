const router = require('express').Router();
let User = require('../models/user.model');
const passport = require('passport');
const axios =require('axios');

router.route('/').get( (req, res) => {
    /*User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));*/
        //console.log(messages.error);
    res.send("Login");
});

router.route('/').post(passport.authenticate('local'), (req, res) => {
    req.session.save(err => {
        if (err) {
            console.log(err);
        }
        console.log(req.session);
        //res.redirect('/dashboard');
        res.send(true);
    })
})

router.route('/logged_in').post( (req, res) => {
    if (req.isAuthenticated()) {
        res.send(true);
    }
    else {
        res.send(false);
    }
})


/*router.route('/').post( (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    
    //req.session.user = newUser;
    //res.redirect('/protected_page');
    //res.json("Post recieived");
    res.json(req.user.name);
});*/

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

  function checkAthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
}

module.exports = router;