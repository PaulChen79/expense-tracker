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

router.get('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      const categoryId = record.categoryId
      return Category.find()
      .lean()
      .then(categories => {
        const categoryName = categories.filter(category => category._id.equals(categoryId))[0].name
        record.date = record.date.toJSON().toString().slice(0, 10)
        res.render('edit', { record, categories, categoryName })
      })
      .catch(error => next(error))
    })
    .catch(error => next(error))
})

router.put('/:id', (req, res, next) => {
  const { name, date, amount, categoryId } = req.body
  const userId = req.user._id
  const _id = req.params.id
  const errors = []
  if (!name || !date || !amount || !categoryId) {
    errors.push({ message: 'You have to fill all the required fields.' })
  }
  if (errors.length) {
    return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      const categoryId = record.categoryId
      return Category.find()
      .lean()
      .then(categories => {
        const categoryName = categories.filter(category => category._id.equals(categoryId))[0].name
        record.date = record.date.toJSON().toString().slice(0, 10)
        res.render('edit', { errors, record, categories, categoryName })
      })
      .catch(error => next(error))
    })
  }
  return Record.findByIdAndUpdate(_id, req.body)
    .then(() => {
      req.flash('success_messages', 'You have successfully update a record.')
      res.redirect('/')
    })
    .catch(error => next(error))
})

module.exports = router