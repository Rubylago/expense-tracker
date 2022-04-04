const db = require('../../config/mongoose')

const CategorySchema = require('../category')
const categoryList = require('./category.json')

db.once('open', () => {
  return Promise.all(Array.from(
    categoryList, (_, i) => {
      return CategorySchema.create({
        name: categoryList[i].name,
        icon: categoryList[i].icon
      })
    } 
  ))
  .then(() => {
    console.log('categorySeeder done.')
    process.exit()
  })
})

