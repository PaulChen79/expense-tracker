const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const router = express.Router()

router.get('/login', (req, res, next) => {
  try {
    res.render('login')
  } catch (error) {
    next(error)
  }
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

router.get('/register', (req, res, next) => {
  try {
    res.render('register')
  } catch (error) {
    next(error)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: 'You have to fill all the required fields.' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: 'Password and confirmPassword must be the same.' })
    }
    if (errors.length)
      return res.render('register', { errors, name, email, password, confirmPassword })
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })
    req.flash('success_messages', 'You have successfully registered!')
    res.redirect('/users/login')
  } catch (error) {
    next(error)
  }
})

router.get('/logout', (req, res, next) => {
  try {
    req.logOut()
    req.flash('success_messages', 'You have successfully logged out!')
    res.redirect('/users/login')
  } catch (error) {
    next(error)
  }
})

module.exports = router
