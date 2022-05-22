const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new localStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email })
          if (!user)
            return done(null, false, req.flash('warning_messages', 'This Email is not registered.'))
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch)
            return done(null, false, req.flash('warning_messages', 'Password is incorrect.'))
          return done(null, user)
        } catch (error) {
          done(error, false)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })
}
