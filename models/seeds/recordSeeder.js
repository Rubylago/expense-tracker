const db = require('../../config/mongoose')
const ExpenseSchema = require('../expense')
const UserSchema = require('../user')
const CategorySchema = require('../category')
const categoryList = require('./category.json')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  UserSchema.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: SEED_USER.password
  })
  .then(user => {
    const userId = user._id
    return CategorySchema.create({ name: categoryList[0].name, icon: categoryList[0].icon })
      .then(category => {
        const categoryId = category._id
        console.log('categoryId')
        return Promise.all(Array.from(
        { length: 5 },
        (_, i) => {
          const expense = Math.floor(Math.random()*100)+1 
          return ExpenseSchema.create({ name: `name${i}`, amount: expense, categoryId, userId })
          })
        )
      })  
  })
  .then(() => {
    console.log('recordSeeder done.')
    process.exit()
  })
})