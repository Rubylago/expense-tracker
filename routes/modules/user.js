const express = require('express')
const { render } = require('express/lib/response')
const router = express.Router()
const passport = require('passport')
const UserSchema = require('../../models/user')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

// login function
router.post('/login', passport.authenticate('local', {
  successRedirect:'/', failureFlash: true, failureRedirect:'/users/login'
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register function
router.post('/register', (req, res) => {
  // 拿到註冊表單
  const { name, email, password, confirmPassword } = req.body

  // flash errors 
  const errors = []
  if(!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if(password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if(errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }

  // User資料庫比對是否已存在
  UserSchema.findOne({ email })
    .then(user => {
      if(user){
        errors.push({ message: 'User already exists' })
        return res.render('register', { name, email, password, confirmPassword, errors })
      } 
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => UserSchema.create({ name, email, password: hash }))
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// logout function
router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', '成功登出')
  res.redirect('/users/login')
})

module.exports = router