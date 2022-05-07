const express = require('express')
const router = express.Router()
const users = require('./modules/user')
const records = (require('./modules/record'))
const home = require('./modules/home')
const { errorHandler } = require('../middleware/error-handler')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/', authenticator, home)
router.use('/records', authenticator, records)
router.all('/', errorHandler)


module.exports = router