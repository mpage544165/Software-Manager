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

router.route('/projects').post((req, res) => {
  console.log("projects:");
  console.log(req.user);

  Project.find({userId: req.user._id})
        .then(projects => {console.log('Found:', projects); res.json(projects);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/createproject').post((req, res) => {
  console.log("creating project");

  const project = new Project({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    audience: req.body.audience,
    backlog: []
  });

  console.log(project);

  project.save()
    .then(() => {console.log('saved'); res.json(project);})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/backlog').get((req, res) => {
  console.log("backlog items:");

  Project.findById(req.params.id)
        .then(project => {res.json(project.backlog)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/addBacklogItem').post((req, res) => {
  console.log("adding product backlog item");

  Project.findById(req.params.id)
        .then(project => {

            const item = {
              task: req.body.task,
              priority: req.body.priority
            }

            console.log(item);

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