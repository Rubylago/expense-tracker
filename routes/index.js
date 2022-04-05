const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const sort = require('./modules/sort') 
const users = require('./modules/user')

router.use('/users', users)
router.use('/sort', sort)
router.use('/expenses', expenses)
router.use('/', home)

module.exports = router