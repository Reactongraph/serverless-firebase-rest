var express = require('express')
const admin = require('firebase-admin');
var router = express.Router()


var db = admin.firestore();
//get All Users
router.get('/getUsers', (req, res) => {
    db.collection('users').get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
          });
  })
  .catch(err => {
    res.send("Hello Rohit");
    console.log('Error getting document', err);
  });
})

//getUserById
router.post('/getUserById',(req,res)=>{
db.collection('users').doc(req.body.id).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
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