const firebaseAdmin = require('../config/firebaseAdmin')
const firebase = require('../config/firebaseConfig')
var express = require('express')
var router = express.Router()

var db = firebaseAdmin.firestore();
// Create User
// https://firebase.google.com/docs/auth/admin/manage-users

router.post('/createUser', (req, res) => {
    firebaseAdmin.auth().createUser({
      displayName: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(userRecord => {
      const userID = userRecord.uid
      db.collection('users').doc(userID).set({
        displayName: req.body.name,
        email: req.body.email,
        uid: userID,
        creationDate: new Date(),
      }).then(() => {
        res.send({'message': 'User registered successfully', 'success': true})
      })
    }).catch(error =>
      res.send(error)
    )
  })

  module.exports = router