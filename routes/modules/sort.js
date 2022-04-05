const express = require('express')
const router = express.Router()

const CategorySchema = require('../../models/category')
const expense = require('../../models/expense')
const ExpenseSchema = require('../../models/expense')

router.get('/:sort', async (req, res) => {
  const sort = req.params.sort
  // console.log('sort', sort)
  // 用category資料庫 拿到類別索引
  const categories = await CategorySchema.find({ name: sort }).lean()
  const category_id = categories[0]._id

  // 用expense資料庫索引 拿到同類別的 資料物件 => 索引的categoryId = category_id
  const fitExpenses = await ExpenseSchema.find({ categoryId: category_id }).lean()
  // console.log('fitExpense',fitExpenses) [{obj1},{obj2}]
  return ExpenseSchema.find({ categoryId: category_id })
    .populate('categoryId') // 解壓縮才拿的到巢狀內容的icon
    .lean()
    .then(expenses => {
      return res.render('index', { expenses })
    })
    .catch(error => console.log(error))
})



module.exports = router