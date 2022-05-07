const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new localStrategy({ usernameField: 'email', passReqToCallback: true}, (req, email, password, done) => {
    User.findOne({ email }).then(user => {
      if (!user) return done(null, false, req.flash('warning_messages', 'This Email is not registered.'))
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return done(null, false, req.flash('warning_messages', 'Password is incorrect.'))
        return done(null, user)
      })
    })
    .catch(error => done(error, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}