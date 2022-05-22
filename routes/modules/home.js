const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const categoryName = req.query.category
    const records = await Record.find({ userId }).lean()
    const categories = await Category.find().lean()
    let filterRecord = records
    let totalAmount = 0
    records.forEach(record => {
      const categoryId = record.categoryId
      record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
      record.date = record.date.toJSON().toString().slice(0, 10)
      totalAmount += record.amount
    })
    if (categoryName) {
      const categoryId = categories.filter(category => category.name === categoryName)[0]._id
      totalAmount = 0
      filterRecord = records.filter(record => record.categoryId.equals(categoryId))
      filterRecord.forEach(record => {
        record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
        totalAmount += record.amount
      })
    }
    return res.render('index', {
      records: filterRecord,
      categories: categories,
      totalAmount,
      categoryName
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
