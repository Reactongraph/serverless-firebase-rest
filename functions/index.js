const functions=require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const myRoute= require('./routes')

// admin.initializeApp(functions.config().firebase);
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pwa-rest-serverless.firebaseio.com"
});

var db = admin.firestore();
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',db,myRoute);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// webApi is your functions name, and you will pass main as 
// a parameter

exports.webApi = functions.https.onRequest(app);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
   });



