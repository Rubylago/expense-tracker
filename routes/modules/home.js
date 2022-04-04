const express = require('express')
const router = express.Router()

const CategorySchema = require('../../models/category')
const ExpenseSchema = require('../../models/expense')

router.get('/', (req, res) => {
    return ExpenseSchema.find()
    .lean()
    .then(expenses => res.render('index', { expenses }))
    .catch(error => console.log(error))
})

module.exports = router