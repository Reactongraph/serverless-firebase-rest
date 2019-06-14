var express = require('express')
var user = require('./controllers/user')
var auth = require('./controllers/auth')
const router = express.Router()
const config = require('../config/constants.json')
const jwt = require('jsonwebtoken')
// const admin = require('../firebase-config/firebaseAdmin')
// const firebaseClient = require('../firebase-config/firebaseConfig')
const appRoutes = {
  publicRoutes: ['/user/getUsers','/auth/login', '/auth/createUser', '/users/password/reset'],
  userRoutes: ['/users/fetchByEmail', '/users/fetchById', '/users/logout', '/users/userProfile', '/users/updateProfile',
    '/users/addPlaces']
}

router.use((req, res, next) => {
  if (appRoutes.publicRoutes.indexOf(req.url) >= 0) {
    next()
  } else if (appRoutes.userRoutes.indexOf(req.url) >= 0) {
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.json({ success: false, error_code: 406, message: 'Failed to authenticate token.' })
        } else {
          req.uid = decoded.userId
          next()
        }
      })
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.',
        error_code: 406
      })
    }
  } else {
    return res.status(404).send('Route not found')
  }
})

router.use('/user',user)
router.use('/auth',auth)


module.exports = router


