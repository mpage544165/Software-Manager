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
    audience: req.body.audience,
    backlog: []
  });

  project.save()
    .then(() => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/backlog').post((req, res) => {
  console.log("backlog items:");

  Project.find({id: id})
        .then(backlog => {res.json(backlog)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/addBacklogItem').post((req, res) => {
  console.log("adding product backlog item");

  Project.findById(req.params.id)
        .then(project => {
           const item = req.body.task;
           project.backlog.push(item);

            project.save()
                .then(() => res.json('Project item added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
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