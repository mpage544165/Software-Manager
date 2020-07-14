const router = require('express').Router();
let User = require('../models/user.model');
let Project = require('../models/project.model');

router.route('/').get(checkAuthenticated, (req, res) => {
    /*User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));*/
        console.log(req.user);
    res.send("Dashboard");
});

router.route('/createproject').post((req, res) => {
  console.log("creating project");

  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    audience: req.body.audience
  });

  project.save()
    .then(() => res.json('Project created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

function checkAuthenticated(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    else {
      res.redirect('/login')
    }
  }

module.exports = router;