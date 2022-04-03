const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  icon:{ 
    type:String, 
    required: true 
  },
  createdAt:{ 
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('CategorySchema', CategorySchema)