const express = require('express')
const router = express.Router()

const ExpenseSchema = require('../../models/expense')

router.get('/', (req, res) => {
  ExpenseSchema.find()
    .lean()
    .then(expenses => res.render('index', { expenses }))
    .catch(error => console.log(error))
})

module.exports = router