const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.use('/users', userRouter);
app.use('/signup', signupRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});