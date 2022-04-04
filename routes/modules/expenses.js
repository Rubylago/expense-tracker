const express = require('express')
const router = express.Router()

const ExpenseSchema = require('../../models/expense')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const data = req.body
  // console.log(data)
  return ExpenseSchema.create( data )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return ExpenseSchema.findById(id)
    .lean()
    .then((expense) => res.render('edit', { expense }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const data = req.body
  return ExpenseSchema.findOneAndUpdate(_id, data)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return ExpenseSchema.findByIdAndDelete(_id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router