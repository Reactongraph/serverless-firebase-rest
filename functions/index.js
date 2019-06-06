const functions=require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes= require('./routes')

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',routes);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webApi = functions.https.onRequest(app);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
   });



