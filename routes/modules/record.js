const express = require('express')
const Category = require('../../models/category')
const Record = require('../../models/record')
const router = express.Router()

router.get('/new', async (req, res, next) => {
  try {
    const categories = await Category.find().lean()
    return res.render('new', { categories })
  } catch (error) {
    next(error)
  }
})

router.post('/new', async (req, res, next) => {
  try {
    const { name, date, amount, categoryId } = req.body
    const userId = req.user._id
    const errors = []
    if (!name || !date || !amount || !categoryId) {
      errors.push({ message: 'You have to fill all the required fields.' })
    }
    if (errors.length) {
      const categories = await Category.find().lean()
      return res.render('new', { errors, name, date, amount, categories })
    }
    await Record.create({ name, date, amount, userId, categoryId })
    req.flash('success_messages', 'You have successfully create a record.')
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    const recordId = req.params.id
    const userId = req.user._id
    const record = await Record.findOne({ _id: recordId, userId }).lean()
    const categories = await Category.find().lean()
    const categoryId = record.categoryId
    const categoryName = categories.filter(category => category._id.equals(categoryId))[0].name
    record.date = record.date.toJSON().toString().slice(0, 10)
    return res.render('edit', { record, categories, categoryName })
  } catch (error) {
    next(error)
  }
})

router.put('/:id/edit', async (req, res, next) => {
  try {
    const { name, date, amount, categoryId } = req.body
    const userId = req.user._id
    const _id = req.params.id
    const errors = []
    if (!name || !date || !amount || !categoryId) {
      errors.push({ message: 'You have to fill all the required fields.' })
    }
    if (errors.length) {
      const record = await Record.findOne({ _id, userId })
      const categories = await Category.find().lean()
      const categoryId = record.categoryId
      const categoryName = categories.filter(category => category._id.equals(categoryId))[0].name
      record.date = record.date.toJSON().toString().slice(0, 10)
      return res.render('edit', { errors, record, categories, categoryName })
    }
    await Record.findByIdAndUpdate(_id, req.body)
    req.flash('success_messages', 'You have successfully update a record.')
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const recordId = req.params.id
    await Record.findByIdAndDelete({ _id: recordId })
    req.flash('success_messages', 'You have successfully delete a record.')
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

module.exports = router
