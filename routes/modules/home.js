const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const router = express.Router()

router.get('/' ,(req, res, next) => {
  const userId = req.user._id
  const categoryName = req.query.category
  let totalAmount = 0
  let filterCategory = ''
  let filterRecord = []
  Record.find({ userId })
    .lean()
    .then(records => {
      return Category.find()
        .lean()
        .then(categories => {
          records.forEach(record => {
            const categoryId = record.categoryId
            record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
            record.date = record.date.toJSON().toString().slice(0, 10)
            totalAmount += record.amount
          })

          if (categoryName) {
            const categoryId = categories.filter(category => categoryName.equals(category.name))._id
            filterCategory = categories.filter(category => categoryName.equals(category.name)).name
            filterRecord = records.filter(record => record.categoryId.equals(categoryId))
            filterRecord.forEach(record => {
              record.icon = categories.filter(category => categoryId.equals(category._id))[0].icon
              record.date = record.date.toJSON().toString().slice(0, 10)
              totalAmount += record.amount
            })
          }
          return res.render('index', { records: records || filterRecord, categories: categories || filterCategory, totalAmount,  })
        })
    })
    .catch(error => next(error))
})

module.exports = router