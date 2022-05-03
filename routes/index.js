const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const record = (require('./modules/record'))
const { errorHandler } = require('../middleware/error-handler')

router.use('/users', user)
router.use('/', record)
router.use('/', errorHandler)


module.exports = router