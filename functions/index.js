const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var firebaseConfig = {
    apiKey: "AIzaSyDAC1npbkyBn3dpbDsuBHpBfRGWotWr6XA",
    authDomain: "pwa-rest-serverless.firebaseapp.com",
    databaseURL: "https://pwa-rest-serverless.firebaseio.com",
    projectId: "pwa-rest-serverless",
    storageBucket: "pwa-rest-serverless.appspot.com",
    messagingSenderId: "135931728044",
    appId: "1:135931728044:web:e07b8f1ad8d831f2"
  };
  // Initialize Firebase
admin.initializeApp(firebaseConfig);

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.get('/contacts', (req, res) => {
    console.log(">>>>>>>>>>>>>>>.hello Rohit>>>>>>>>>>>>>>>>>>>")
    // var getContacts = db.collection('contacts');
    db.collection('contacts').then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
    res.send("Hello Rohit");
})

app.post('/contacts', (req, res) => {
    console.log(Object.keys(req.body))
    db.collection('contacts').add({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }).then(ref => {
        console.log('Added document with ID: ', ref.id);
        res.send(ref)
      }).catch((err)=>res.send(err));
})

// webApi is your functions name, and you will pass main as 
// a parameter

exports.webApi = functions.https.onRequest(app);
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
   });



