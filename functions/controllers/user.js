const firebaseAdmin = require('../config/firebaseAdmin')
var express = require('express')
var router = express.Router()

var db = firebaseAdmin.firestore();

//get All Users
router.get('/getUsers', (req, res) => {
    db.collection('users').get().then(snapshot => {
        snapshot.forEach(doc => {
          res.status(200).send(doc.data())
        });
  })
  .catch(err => {
    res.status(500).send(error)
  });
})

//getUserById
router.post('/getUserById',(req,res)=>{
db.collection('users').doc(req.body.id).get()
      .then(doc => {
        if (!doc.exists) {
          res.json({"message":"No such document!"});
        } else {
            res.json({"data":doc.data()});
        }
      })
      .catch(err => {
        res.send(err)
      });
    
})

//Add new user
router.post('/addUser', (req, res) => {
    db.collection('users').add({
        name: req.body.name,
        country: req.body.country
      }).then(ref => {
          res.json({"code":200,"message":"user has been created"});
      }).catch(err=>{
          res.send(err)
      });
      
})

module.exports = router