const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const flash = require('express-flash')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

app.use(cors());
app.use(express.json());

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(upload.array());
//app.use(cookieParser());
//app.use(session({secret: "Your secret key"}));

// Connect to Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Setup Routes/controllers
const userRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

app.use('/users', userRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

function checkAthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next();
  }

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});