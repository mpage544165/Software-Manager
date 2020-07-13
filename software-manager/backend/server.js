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
const flash = require('express-flash');
const User = require('./models/user.model');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5000"],
  credentials: true
 }));
app.use(express.json());
app.use(cookieParser());

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const initializePassport = require('./passport-config')
initializePassport(passport);


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
const dashboardRouter = require('./routes/dashboard');
//const User = require('./models/user.model');

app.use('/users', userRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);

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