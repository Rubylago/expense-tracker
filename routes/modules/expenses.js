const express = require('express')
const router = express.Router()

const ExpenseSchema = require('../../models/expense')
const CategorySchema = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

// create
router.post('/', (req, res) => {
  const data = req.body
  const categoryName = req.body.categoryId
  return CategorySchema.findOne({ name: categoryName })
    .then((category) => {
      data.categoryId = category._id
      return ExpenseSchema.create( data )
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return ExpenseSchema.findById(id)
    .lean()
    .then((expense) => res.render('edit', { expense }))
    .catch(error => console.log(error))
})

// edit
router.put('/:id', async(req, res) => {
  const _id = req.params.id
  const data = req.body
  const categoryName = req.body.categoryId
  const category = await CategorySchema.findOne({ name: categoryName }).lean()
  data.categoryId = category._id
  return ExpenseSchema.findById(_id)
    .then(expense => {
      expense.name = data.name
      expense.amount = data.amount
      expense.categoryId = data.categoryId
      return expense.save()
    }) 
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))

  // 遇到問題： 如果用下面 findOneAndUpdate 會出現奇怪的BUG 
  // 現有列表中若有一條以上資料包含"餐飲"類別，修改隨意一條類別非餐飲的expense名稱從"name01"改成"餐飲"
  // 會直接新增一筆資料，原始修改的資料仍然存在
  // 好像其他選項都不會有XD

  // return ExpenseSchema.findOneAndUpdate(_id, data, {new: true})
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return ExpenseSchema.findByIdAndDelete(_id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router