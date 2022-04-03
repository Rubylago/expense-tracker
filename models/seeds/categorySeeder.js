const mongoose = require('mongoose')
const ExpenseSchema = require('../expense')
const UserSchema = require('../user')
const CategorySchema = require('../category')

const dotenv = require("dotenv");
dotenv.config()

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

const category = Object.entries(CATEGORY)  // ['家居物業', 'https://fontawesome.com/icons/home?style=solid'],...

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  return Promise.all(Array.from(
    { length: category.length },
    (_, i) => CategorySchema.create({ name: category[i][0], icon: category[i][1]})  
  ))
  .then(() => {
    console.log('done.')
    process.exit()
  })
})

