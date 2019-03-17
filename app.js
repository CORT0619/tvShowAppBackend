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
        // if (!cookies.token) { // TODO: Implement logic to check if token is also expired
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
        // }
        res.status(200).json({ 'msg': 'Login successful!' });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
});

// tvshow api

/* Get Refresh Token */
router.get('/api/refresh_token', (req, res, err) => {
  const { token } = req.cookies;

  const url = `https://api.thetvdb.com/refresh_token`;

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  axios.get(url, headers)
      .then((response) => {
        console.log(response.data.token);
        res.cookie('token', response.data.token, {
          maxAge: 86400000,
          expires: new Date(Date.now() + 86400000),
          secure: false,
          httpOnly: true
        }).status(200);
      })
      .catch((err) => {
        console.log(err);
        // res.status().json({ 'error': '' });
      });
});

/* Retrieve TV Show Overview */
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
        // res.status().send();
      });
});

/* Retrieve Show Images */
router.get('/api/show/images/:seriesId', (req, res, err) => {
  // contains options to search by certain resolutions and image types
  const { seriesId } = req.params;
  const { token } = req.cookies;

  // const url = `https://api.thetvdb.com/series/${seriesId}/images/query?keyType=series&subkey=graphical`; // returns banners
  const url = `https://api.thetvdb.com/series/${seriesId}/images/query?keyType=poster`; // returns large posters
  // const url = `https://api.thetvdb.com/series/${seriesId}/images/query/params`; // get params needed for image call
  // https://www.thetvdb.com/banners/ - add filename from this call to get the image for the show

  const options = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
    url
  };

  axios(options)
      .then((response) => {
        console.log(response.data.data);
        // console.log('response ', JSON.parse(response.data));
        res.status(200).json(response.data.data);
      })
      .catch((err) => {
        console.log('error ', err);
        // res.status().json({ error: err });
      });
});

/* Retrieve Episode Information */
router.get('/api/show/episodes/:seriesId', (req, res, err) => {
  const { seriesId } = req.params;
  const { token } = req.cookies;

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // const url = `https://api.thetvdb.com/episodes/${episodeId}`;
  const url = `https://api.thetvdb.com/series/${seriesId}/episodes`;
  axios.get(url, headers)
      .then((response) => {
        // console.log('response ', response.data);
        console.log('response ', response);
        res.status(response.status).send(response.data);
      })
      .catch((err) => {
        console.log('error ', err);
      });
});

/* Retrieve Show Actors */
router.get('/api/show/episodes/actors/:seriesId', (req, res, err) => {
  const { seriesId } = req.params;
  const { token } = req.cookies;

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const url = `https://api.thetvdb.com/series/${seriesId}/actors`;
  axios.get(url, headers)
      .then((response) => {
        console.log('response ', response.data.data);
        res.status(response.status).send(response.data.data);
      })
      .catch((err) => {
        console.log('error ', err);
        // res.status(400).send();
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
