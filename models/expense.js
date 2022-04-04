const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpenseSchema = new Schema({
  name: { 
    type: String, required: true 
  },
  amount: { 
    type: Number, required: true 
  },
  date:{ 
    type: String, 
    default: function(){
      const date = new Date()
      return date.toISOString().split('T')[0]
    }
  },
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'UserSchema',
    index: true,
    required: true
    },
  categoryId: { 
    type: Schema.Types.ObjectId,
    ref: 'CategorySchema',
    index: true,
    required: true
    },
  createdAt:{ 
  type: Date,
  default: Date.now
  }
})

module.exports = mongoose.model('ExpenseSchema', ExpenseSchema)