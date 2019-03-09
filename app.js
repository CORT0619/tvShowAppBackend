const express = require('express');
// const app = express();
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
      .then(() => {
      // console.log('do something ', result);
        return tvShowLogin(res, cookies)
            .then((results) => {
              console.log('results ', results);
              // res = results;
              // res.status(200).send('set cookie');
              res.cookie('token', results, {
                maxAge: 86400000,
                expires: new Date(Date.now() + 86400000),
                secure: false,
                httpOnly: true
              });

              // res.status(200).send('set successfully');
              res.status(200).json({ msg: 'set successfully' });
            })
            .catch(() => {
              // res.status(500).send('Unable to process your request');
              res.status(500).json({
                error: 'Unable to process your request.'
              });
            });
      })
      .catch((err) => {
        console.log('error ', err);
      });
});

// tvshow api
// router.post('/api/show/login', (req, res, err) => {
//   const { cookies } = req;
//   const auth = {
//     apikey: process.env.showApiKey,
//     username: process.env.user,
//     userkey: process.env.uniqueId
//   };

//   console.log('cookies ', req.cookies);

//    axios.post('https://api.thetvdb.com/login', auth).then((response) => {
//      console.log('response ', response);

//      // set cookie
//     /*const date = new Date();
//     date.setHours(date.getHours() + 24);*/

// eslint-disable-next-line
//     res.cookie('token', response.data.token, { maxAge: 86400000, expires: new Date(Date.now() + 86400000), httpOnly: true });
//     res.status(200).send('set cookie');
//    })
//    .catch(err => {
//     console.log('error ', err);
//    });
// });


router.get('/api/show/overview', (req, res, err) => {
  const token = '';
  const show = req.body.tvshow;
  const headers = {
    Authorization: `Bearer ${data.token}`
  };
  axios.get(`https://api.thetvdb.com/search/series?name=${show}`, headers)
      .then((res) => {
        console.log('res ', res);
      })
      .catch((err) => {
        console.log('error ', err);
      });
});

/*
router.post('/api/shows', (req, res, err) => {
  //const search = req.params.;
  res.send('Success');
});
*/

/**
 *
 * @param {*} res
 * @param {*} cookies
 * @return { promise} with the response or error
 */
function tvShowLogin(res, cookies) {
  return new Promise((resolve, reject) => {
    const auth = {
      apikey: process.env.showApiKey,
      username: process.env.user,
      userkey: process.env.uniqueId
    };

    axios.post('https://api.thetvdb.com/login', auth).then((response) => {
      // console.log('response ', response);

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
