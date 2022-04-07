const express = require('express')
const router = express.Router()

const ExpenseSchema = require('../../models/expense')

// icon image : expenses[0].categoryId.icon 
router.get('/', (req, res) => {
  const userId = req.user._id
    return ExpenseSchema.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ _id: 'asc' })
    .then(expenses => {
      // 先土法煉鋼加總
      // console.log(expenses) // [{},{}]
      let totalAmount = 0
      Array.from(expenses, expense => {
        totalAmount += Number(expense.amount)
      })
      return  res.render('index', { expenses, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router