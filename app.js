const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const dotenv = require("dotenv")
dotenv.config()
const methodOverride = require('method-override')

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

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  ExpenseSchema.find()
    .lean()
    .then(expenses => res.render('index', { expenses }))
    .catch(error => console.log(error))
})

app.get('/expenses/new', (req, res) => {
  res.render('new')
})

app.post('/expenses', (req, res) => {
  const data = req.body
  // console.log(data)
  return ExpenseSchema.create( data )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/expenses/:id/edit', (req, res) => {
  const id = req.params.id
  return ExpenseSchema.findById(id)
    .lean()
    .then((expense) => res.render('edit', { expense }))
    .catch(error => console.log(error))
})

app.put('/expenses/:id', (req, res) => {
  const _id = req.params.id
  const data = req.body
  return ExpenseSchema.findOneAndUpdate(_id, data)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, ()=> {
  console.log(`this app is listen to http://localhost:${port}`)
})