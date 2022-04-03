const express = require('express')
const mongoose = require('mongoose')

const dotenv = require("dotenv");
dotenv.config()

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
app.get('/', (req, res) => {
  res.send('hi')
})

app.listen(port, ()=> {
  console.log(`this app is listen to http://localhost:${port}`)
})