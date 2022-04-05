const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const sort = require('./modules/sort') 
const users = require('./modules/user')
const { authenticator  } = require('../middleware/auth')

router.use('/users', users)
router.use('/sort', authenticator, sort)
router.use('/expenses', authenticator, expenses)
router.use('/', authenticator, home)

module.exports = router