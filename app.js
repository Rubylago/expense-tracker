const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const dotenv = require("dotenv")
dotenv.config()

const ExpenseSchema = require('./models/expense')

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



app.get('/', (req, res) => {
  ExpenseSchema.find()
    .lean()
    .then(expenses => res.render('index', { expenses }))
    .catch(error => console.log(error))
})


app.listen(port, ()=> {
  console.log(`this app is listen to http://localhost:${port}`)
})