const express = require('express')
const router = express.Router()

const CategorySchema = require('../../models/category')
const ExpenseSchema = require('../../models/expense')

// icon image : expenses[0].categoryId.icon 
router.get('/', (req, res) => {
  const userId = req.user._id
    return ExpenseSchema.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ _id: 'asc' })
    .then(expenses => {
      return  res.render('index', { expenses })
    })
    .catch(error => console.log(error))
})

module.exports = router