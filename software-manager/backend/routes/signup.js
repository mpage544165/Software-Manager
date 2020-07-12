const router = require('express').Router();
let User = require('../models/user.model');

router.route('/signup').get( (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signup').post( (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const pwd = req.body.pwd;

    const newUser = new User({username, email, pwd}); // TODO add hash and salt to pwd

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;