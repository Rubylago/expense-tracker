const db = require('../../config/mongoose')
const category = require('../category')

const CategorySchema = require('../category')
const categoryList = require('./category.json')

db.once('open', () => {
  return Promise.all(Array.from(
    categoryList, (_, i) => {
      // console.log(categoryList[i].name)
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

