const db = require('../../config/mongoose')
const ExpenseSchema = require('../expense')
const UserSchema = require('../user')
const CategorySchema = require('../category')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

const category = Object.entries(CATEGORY)  // ['家居物業', 'https://fontawesome.com/icons/home?style=solid'],...

db.once('open', () => {
  UserSchema.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: SEED_USER.password
  })
  .then(user => {
    const userId = user._id
    return CategorySchema.create({ name: category[0][0], icon: category[0][1]})
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