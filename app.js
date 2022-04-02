const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)

app.get('/', (req, res) => {
  res.send('hi')
})

app.listen(port, ()=> {
  console.log(`this app is listen to http://localhost:${port}`)
})