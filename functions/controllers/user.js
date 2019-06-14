const firebaseAdmin = require('../config/firebaseAdmin')
var express = require('express')
var router = express.Router()

var db = firebaseAdmin.firestore();

// user Profile

// router.get('/userProfile', (req, res) => {
//   const userCollection = db.collection('users')
//   const userID = req.uid
//   userCollection.where('uid', '==', userID)
//     .get()
//     .then((userData) => {
//       userData.forEach((doc) => {
//         res.status(200).send(doc.data())
//       })
//     })
//     .catch((error) => {
//       res.status(500).send(error)
//     })
// })

// update Profile

// router.post('/updateProfile', (req, res) => {
//   var placeIds = []
//   var c = 0
//   var uid = req.uid
//   var prevData = {}
//   var upData = {}
//   const userID = uid
//   var key = Object.keys(req.body)
//   const data = {}
//   key.map(val => {
//     data[val] = req.body[val]
//     upData[val] = req.body[val]
//   })
//   if (req.body.user && req.body.user !== '') {
//     delete upData['user']
//     upData['displayName'] = req.body.user
//     delete data['user']
//     data['displayName'] = req.body.user
//   }
//   data['updateDate'] = new Date()
//   db.collection('users').doc(uid).get().then(values => {
//     key.map(val => {
//       if (val === 'user') {
//         prevData['displayName'] = values.data()['displayName']
//       }
//       if (values.data()[val]) {
//         prevData[val] = values.data()[val]
//       }
//     })
//   }).then(() => {
//     if (req.body.user && req.body.user !== '') {
//       userCollection.doc(userID).update(data).then(() => {
//         userCollection.doc(userID).get().then((userDetails) => {
//           let name = userDetails.data().displayName
//           db.collection('userHistory').doc(uuidv4()).set({prevData: prevData, updatedData: upData, updaterId: req.uid, updateDate: new Date(), updatedBy: name, uid: req.uid})
//         })
//         db.collection('places').where('uid', '==', uid).get().then((details) => {
//           details.forEach((doc) => {
//             placeIds.push(doc.data().placeId)
//           })
//           placeIds.map((data, i) => {
//             c++
//             db.collection('places').doc(data).update({displayName: req.body.user})
//             if (c === placeIds.length) {
//               res.status(200).send({'success': true})
//             }
//           })
//         })
//       })
//     } else {
//       var name = ''
//       userCollection.doc(userID).update(data).then(() => {
//         userCollection.doc(userID).get().then((userDetails) => {
//           name = userDetails.data().displayName
//           db.collection('userHistory').doc(uuidv4()).set({prevData: prevData, updatedData: upData, updaterId: req.uid, updateDate: new Date(), updatedBy: name, uid: req.uid})
//           .then(() => {
//             res.status(200).send({'success': true})
//           })
//         })
//       }).catch((error) => {
//         res.status(500).send(error)
//       })
//     }
//   }).catch(error => {
//     res.status(500).send(error)
//   })
// })


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