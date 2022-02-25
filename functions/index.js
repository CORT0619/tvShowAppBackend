const functions = require('firebase-functions');
const admin = require('firebase-admin');

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


const serviceAccount = require('./svcAcct-tvShowApp.json');

const config = JSON.parse(process.env.FIREBASE_CONFIG);
config.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(config);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     const original = req.query.text;
//     const snapshot = await admin.database().ref('/messages').push({ original: original });
//     res.redirect(303, snapshot.ref.toString());
// });

// exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
//     .onCreate((snapshot, context) => {
//         const original = snapshot.val();
//         console.log('Uppercasing ', context.params.pushId, original);
//         const uppercase = original.toUpperCase();
//         return snapshot.ref.parent.child('uppercase').set(uppercase);
//     });

// exports.