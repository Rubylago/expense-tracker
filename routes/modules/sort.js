const express = require('express')
const router = express.Router()

const CategorySchema = require('../../models/category')
const ExpenseSchema = require('../../models/expense')

router.get('/:sort', async (req, res) => {
  const userId = req.user._id
  const sort = req.params.sort
  const category = await CategorySchema.findOne({ name: sort }).lean()

  return ExpenseSchema.find({ categoryId:  category._id, userId })
    .populate('categoryId')  
    .lean()
    .then(expenses => {
      let totalAmount = 0
      Array.from(expenses, expense => {
        totalAmount += Number(expense.amount)
      })
      return res.render('index', { expenses, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router