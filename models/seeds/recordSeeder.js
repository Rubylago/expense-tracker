const db = require('../../config/mongoose')
const ExpenseSchema = require('../expense')
const UserSchema = require('../user')
const CategorySchema = require('../category')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  return Promise.all(Array.from(
    { length: 5 },
    (_, i) => {
      const expense = Math.floor(Math.random()*100)+1
      return ExpenseSchema.create({ name: `name${i}`, amount: expense})
    }
  )).then(() => {
    console.log('recordSeeder done.')
    process.exit()
  })
})