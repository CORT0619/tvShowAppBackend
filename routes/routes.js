
const express = require('express');
const router = express.Router();
const firebaseApi = require('./firebase-api');
const tvdbApi = require('./thetvdb-api');
const jwt = require('jsonwebtoken');

/* Account Registration */
router.post('/api/firebase/registration', (req, res, err) => {
  const { email, password, firstName, lastName } = req.body;
  const response = firebaseApi.accountRegistration(
      email,
      password,
      firstName,
      lastName
  );
  return res.status(response.status).json({
    msg: response.msg || '',
    error: response.error || ''
  });
});

/* Firebase Login */
router.post('/api/firebase/login', async (req, res, next) => {
  const returnedResponse = {};

  // errorHandler(firebaseApi.login(
  //     req.cookies,
  //     req.body.email,
  //     req.body.password
  // ));

  const loginResponse = await firebaseApi.login(
      req.cookies,
      req.body.email,
      req.body.password
  ).catch((err) => {
    // next(err);
    res.status(400).json({ error: err });
  });

  if (loginResponse && loginResponse.token) {
    returnedResponse.token = loginResponse.token;
    returnedResponse.status = loginResponse.status;
    returnedResponse.data = loginResponse.msg;
  }

  if (returnedResponse.token) {
    res.cookie('token', returnedResponse.token, {
      maxAge: 86400000,
      expires: new Date(Date.now() + 86400000),
      secure: false,
      httpOnly: true
    });
  }
  // res.status(loginResponse.status).json({
  //   msg: loginResponse.msg || '',
  //   error: loginResponse.error || ''
  // });
  res.status(returnedResponse.status).json({
    data: returnedResponse.data || '',
    error: returnedResponse.error || ''
  });
});

/* Firebase Logout */
router.post('/api/firebase/logout', async (req, res, next) => {
  const logoutResponse = await firebaseApi.logout().catch((err) => {
    res.status(400).json({ error: err });
  });

  if (logoutResponse) {
    return res.status(200).json({ data: 'logged out successful!' });
  }

  res.status(401).json({ data: 'no user authenticated.' });
});

/* Get Refresh Token for tvdb api*/
router.get('/api/refresh_token', (req, res, err) => {
  const response = tvdbApi.retrieveRefreshToken(req.cookies.token);
  if (response.token) {
    return res.cookie('token', response.token, {
      maxAge: 86400000,
      expires: new Date(Date.now() + 86400000),
      secure: false,
      path: 'menu',
      httpOnly: true
    }).status(200);
  }
  res.status(500).json({ err: response });
});

/* Retrieve TV Show Overview */
// const overviewArr = [tvShowOverview, retrieveEpisodes];
router.get('/api/show/overview/:show', async (req, res, next) => {
  console.log('req.cookies ', req);

  // errorHandler(tvShowOverview(
  //     req.params.show,
  //     req.cookies.token
  // ));

  const overview = await tvShowOverview(req.params.show, req.cookies.token);
  // res.locals.show = req.params.show;

  if (overview) {
    res.status(overview.status).json({
      data: overview.data || [],
      error: overview.error || ''
    });
  }
});

/* Retrieve Show Images */
router.get('/api/show/images/:seriesId', async (req, res, err) => {
  const images = await tvdbApi.retrieveImages(
      req.params.seriesId,
      req.cookies.token
  );

  if (images) {
    res.status(images.status || 500).json({
      data: images.data || '',
      error: images.err || ''
    });
  }
});

/* Retrieve Episode Information - episodes, actors, images */
router.get('/api/show/episodes/:seriesId', async (req, res, next) => {
  const response = { data: {}};
  const responses = await Promise.all([
    retrieveEpisodes(req.params.seriesId, req.cookies.token),
    retrieveActors(req.params.seriesId, req.cookies.token),
    tvdbApi.retrieveImages(req.params.seriesId, req.cookies.token)
  ]);
  console.log('responses ', responses);

  if (responses && responses[0].data && responses[1].data && responses[2].data) {
    response.data.episodes = responses[0].data.data;
    response.data.actors = responses[1].data;
    response.data.images = responses[2].data;
    response.status = 200;
    res.status(200).json({ data: response.data || {} });
  }
  res.status(response.status || 500).json({
    data: response.data || {},
    error: responses[0].error || responses[1].error || responses[2].error || {}
  });
  // const episodes = await retrieveEpisodes(
  //     req.params.seriesId,
  //     req.cookies.token
  // );

  // if (episodes && episodes.data && episodes.data.data) {
  //   response.data.episodes = episodes.data.data;
  //   const actors = await retrieveActors(req.params.seriesId, req.cookies.token);
  //   if (actors) {
  //     response.data.actors = actors.data;
  //     const images = await tvdbApi.retrieveImages(
  //         req.params.seriesId,
  //         req.cookies.token
  //     );
  //     if (images) {
  //       response.data.images = images.data;
  //       res.status(images.status || 500).json({
  //         data: response.data || '',
  //         error: images.err || ''
  //       });
  //     }
  //   }
  // }
});

/* Retrieve Show Actors */
// router.get('/api/show/episodes/actors/:seriesId', (req, res, next) => {
//   const response = tvdbApi.retrieveActors(
//       req.params.seriesId,
//       req.cookies.token
//   );
//   res.status(response.status || 500).json({
//     data: response.data.data || {},
//     error: response.err || '' // verify this is correct
//   });
// });

/**
 *
 * @param {function} someFunc
 * @return {Function}
 */
async function errorHandler(someFunc) {
  return await someFunc.catch();
}


/**
 * @param {*} show
 * @param {*} token
 * @return {Promise} if there is an error
 */
async function tvShowOverview(show, token) {
  return await tvdbApi.retrieveShowOverview(
      show,
      token
  );
}

/**
 * @param {string} seriesId
 * @param {*} token
 * @return {Promise}
 */
async function retrieveEpisodes(seriesId, token) {
  return await tvdbApi.retrieveEpisodes(
      seriesId,
      token
  );
}

/**
 * @param {string} seriesId
 * @param {string} token
 * @return {Promise}
 */
async function retrieveActors(seriesId, token) {
  return await tvdbApi.retrieveActors(
      seriesId,
      token
  );

  // res.status(response.status || 500).json({
  //   data: response.data.data || {},
  //   error: response.err || '' // verify this is correct
  // });
}

module.exports = router;
