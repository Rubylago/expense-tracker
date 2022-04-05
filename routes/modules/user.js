const express = require('express')
const router = express.Router()
const passport = require('passport')
const UserSchema = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

// login function
router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/users/login'
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register function
router.post('/register', (req, res) => {
  // 拿到註冊表單
  const { name, email, password, confirmPassword } = req.body
  // User資料庫比對是否已存在
  UserSchema.findOne({ email })
    .then(user => {
      if(user){
        console.log('User already exists')
        return res.render('register', { name, email, password, confirmPassword })
      } else {
        return UserSchema.create({ name, email, password })
          .then(() => res.redirect('/'))
      }
    })
    .catch(error => console.log(error))
    
  // 已存在>跳提醒 return原始表單
  // 新註冊>新增資料庫 redirect:"/"
})

module.exports = router