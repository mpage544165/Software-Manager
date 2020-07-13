const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
    /*User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));*/
    res.send("SignUp");
});

router.route('/').post( async (req, res) => {
    //console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);

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