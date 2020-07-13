const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
    /*User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));*/
    res.send("Login");
});

router.route('/').post( (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    
    //req.session.user = newUser;
    //res.redirect('/protected_page');
    //res.json("Post recieived");
    res.json('Logged In');
});

module.exports = router;