const express = require('express')
const passport = require('../../config/passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const router = express.Router()

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'You have to fill all the required fields.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and confirmPassword must be the same.' })
  }
  if (errors.length) return res.render('register', { errors, name, email, password, confirmPassword })

  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      User.create({ name, email, password: hash})
    })
    .then(() => {
      req.flash('success_messages', 'You have successfully registered!')
      res.redirect('/users/login')
    })
    .catch(error => next(error))
})

router.get('/logout', (req, res, next) => {
  req.logOut()
  req.flash('success_messages', 'You have successfully logged out!')
  res.redirect('/users/login')
})

module.exports = router