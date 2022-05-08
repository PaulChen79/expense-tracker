const express = require('express')
const Category = require('../../models/category')
const Record = require('../../models/record')
const router = express.Router()

router.get('/new', (req, res, next) => {
  return Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
    .catch(error => next(error))
})

router.post('/new', (req, res, next) => {
  const { name, date, amount, categoryId } = req.body
  const userId = req.user._id
  const errors = []
  if (!name || !date || !amount || !categoryId) {
    errors.push({ message: 'You have to fill all the required fields.' })
  }
  if (errors.length) {
    return Category.find()
    .lean()
    .then(categories => {
      res.render('new', { errors, name, date, amount, categories })
    })
    .catch(error => next(error))
  }
  return Record.create({ name, date, amount, userId, categoryId })
    .then(() => {
      req.flash('success_messages', 'You have successfully create a record.')
      res.redirect('/')
    })
    .catch(error => next(error))
})

module.exports = router