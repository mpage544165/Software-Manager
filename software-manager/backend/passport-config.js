const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
let User = require('./models/user.model');

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    User.findOne({email: email}, async (err, user) => {
        console.log(user);
        if(err) {
            return done(err);
        }
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
          }
        else {
            try {
                if (await bcrypt.compare(password, user.password)) {
                    console.log("password matches"); return done(null, user);
                } 
                else {
                    console.log("password incorrect"); return done(null, false, { message: 'Password incorrect' })
                }
            } catch (e) {
                console.log("err"); return done(e)
              }
        }
    });
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
        done(err, user);
    })
  })
}

module.exports = initialize