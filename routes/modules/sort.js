const express = require('express')
const router = express.Router()

const CategorySchema = require('../../models/category')
const ExpenseSchema = require('../../models/expense')

router.get('/:sort', async (req, res) => {
  const sort = req.params.sort
  const categories = await CategorySchema.find({ name: sort }).lean()
  const category_id = categories[0]._id

  return ExpenseSchema.find({ categoryId: category_id })
    .populate('categoryId')  
    .lean()
    .then(expenses => {
      return res.render('index', { expenses })
    })
    .catch(error => console.log(error))
})

module.exports = router