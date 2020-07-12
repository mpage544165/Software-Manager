const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
    /*User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));*/
    res.send("SignUp");
});

router.route('/').post( (req, res) => {
    //console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({name, email, password}); // TODO add hash and salt to pwd

    console.log(newUser);

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
    //req.session.user = newUser;
    //res.redirect('/protected_page');
    //res.json("Post recieived");
});

module.exports = router;