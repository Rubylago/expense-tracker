const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const ExpenseSchema = require('../expense')
const UserSchema = require('../user')
const CategorySchema = require('../category')
const categoryList = require('./category.json').results

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
  categories: categoryList  // [{...},{...}]
}

db.once('open', () => {
  bcrypt
  .genSalt(10)
  .then(salt => bcrypt.hash(SEED_USER.password, salt))
  .then(hash => UserSchema.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })
  )
  .then((user) => {
    const userId = user._id
    return Promise.all(Array.from((categoryList), category => {
      const expense = Math.floor(Math.random()*100)+1 
      return CategorySchema.findOne({ name: category.name })
      .lean()
      .then( category => {
        return ExpenseSchema.create({ 
        name: category.name,
        amount: expense, 
        userId, 
        categoryId: category._id
        })
      })
    }))
  })
  .then(() => {
    console.log('recordSeeder done.')
    process.exit()
  })
})