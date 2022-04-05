const express = require('express')
const category = require('../../models/category')
const router = express.Router()

const CategorySchema = require('../../models/category')
const ExpenseSchema = require('../../models/expense')

// icon image : expenses[0].categoryId.icon 
router.get('/', (req, res) => {
    return ExpenseSchema.find()
    .populate('categoryId')
    .lean()
    .sort({ _id: 'asc' })
    .then(expenses => {
      return  res.render('index', { expenses })
    })
    .catch(error => console.log(error))
})

module.exports = router