const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const axios = require('axios');

// jwt
// const jwt = require('jsonwebtoken');

/* Routes */

// firebase
router.post('/api/firebase/login', (req, res, err) => {
  const { cookies } = req;
  const { email, password } = req.body;
  // firebase.auth().getRedirectResult().then((result) => {
  //    if (result.credential) {
  //      const token = result.credential.accessToken;
  //      console.log('firebase token ', token);
  //    }
  //    const user = result.user;
  //    console.log('firebase user ', user);
  // });

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async () => {
        // eslint-disable-next-line
        if (!cookies.token) { // TODO: Implement logic to check if token is also expired
          try {
            const results = await tvShowLogin();
            res.cookie('token', results, {
              maxAge: 86400000,
              expires: new Date(Date.now() + 86400000),
              secure: false,
              httpOnly: true
            });
            // res.status(200).send('set successfully');
            res.status(200);
          } catch (e) {
            // res.status(500).send('Unable to process your request');
            res.status(500).json({'msg': 'Unable to process your request'});
          }
        }
        res.status(200).json({ 'msg': 'Login successful!' });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
});

// tvshow api
router.get('/api/show/overview/:show', (req, res, err) => {
  const { show } = req.params;
  const { token } = req.cookies;

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const url = `https://api.thetvdb.com/search/series?name=${show}`;
  axios.get(url, headers)
      .then((response) => {
        console.log('response.data ', response);
        res.status(response.status).send(response.data.data);
      })
      .catch((err) => {
        console.log('error ', err);
      });
});

/**
 *
 * @param {*} res
 * @param {*} cookies
 * @return { promise} with the response or error
 */
function tvShowLogin() {
  return new Promise((resolve, reject) => {
    const auth = {
      apikey: process.env.showApiKey,
      username: process.env.user,
      userkey: process.env.uniqueId
    };

    axios.post('https://api.thetvdb.com/login', auth).then((response) => {

      // set cookie
      /* const date = new Date();
      date.setHours(date.getHours() + 24); */

      // res.cookie('token', response.data.token, {
      //   maxAge: 86400000,
      //   expires: new Date(Date.now() + 86400000),
      //   httpOnly: true
      // });
      // resolve(res);
      resolve(response.data.token);
    })
        .catch((err) => {
          console.log('error ', err);
          reject(err);
        });
  });
}

module.exports = router;
