const mongoose = require('mongoose')
const ExpenseSchema = require('../expense')
const UserSchema = require('../user')
const CategorySchema = require('../category')

const dotenv = require("dotenv");
dotenv.config()

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')


  return Promise.all(Array.from(
    { length: 5 },
    (_, i) => {
      const expense = Math.floor(Math.random()*100)+1
      return ExpenseSchema.create({ name: `name${i}`, amount: expense})
    }
  )).then(() => {
    console.log('done.')
    process.exit()
  })
})