const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flah = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { redirect } = require('express/lib/response')
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flah())
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true}))
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})
app.use(routes)

app.listen(port, ()=> {
  console.log(`this app is listen to http://localhost:${port}`)
})