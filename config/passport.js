const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const UserSchema = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    UserSchema.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'User not found'})
        }
        return bcrypt.compare(password, user.password).then(isMach => {
          if (!isMach) {
            return done(null, false, { message: 'Email or Password incorrect'})
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  // 設定facebook登入策略
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email} = profile._json
    UserSchema.findOne({ email })
      .then(user => {
        if(user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => UserSchema.create({
            name, email, password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    UserSchema.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}