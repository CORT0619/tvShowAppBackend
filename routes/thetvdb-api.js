const axios = require('axios');

/**
 * @description logs user into the tvdb api
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
      resolve(response.data.token);
    }).catch((err) => {
      console.log('error ', err);
      reject(err);
    });
  });
}

/**
 * @description retrieves new token
 * @param {string} token contains the unexpired refresh token
 */
function retrieveRefreshToken(token) {
  const url = `https://api.thetvdb.com/refresh_token`;

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  axios.get(url, headers)
      .then((response) => {
        // console.log(response.data.token);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
}

/**
 * @description retrieves overview for a show
 * @param {string} show
 * @param {string} token
 * @return {object} response or error
 */
function retrieveShowOverview(show, token) {
  return new Promise((resolve, reject) => {
    const returnedResponse = {};
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const url = `https://api.thetvdb.com/search/series?name=${show}`;
    axios.get(url, headers)
        .then((response) => {
          console.log('response.data ', response);
          returnedResponse.status = response.status;
          returnedResponse.data = response.data.data;
          resolve(returnedResponse);
        })
        .catch((err) => {
          console.log('error ', err);
          returnedResponse.status = response.status;
          returnedResponse.error = response.data.Error;
          reject(returnedResponse);
        });
  });
}

/**
 * @description retrieves images for a series
 * @param {string} seriesId id of the series to search
 * @param {string} token
 * @return {Promise}
 */
function retrieveImages(seriesId, token) {
  return new Promise((resolve, reject) => {
    const returnedResponse = {};
    // contains options to search by certain resolutions and image types
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
          returnedResponse.status = 200;
          returnedResponse.data = response.data.data;
          resolve(returnedResponse);
        })
        .catch((err) => {
          console.log('error ', err);
          returnedResponse.status = 500;
          returnedResponse.error = err;
          reject(returnedResponse);
        });
  });
}

/**
 * @description retrieves all episodes in a series
 * @param {string} seriesId
 * @param {string} token
 * @return {Promise}
 */
function retrieveEpisodes(seriesId, token) {
  return new Promise((resolve, reject) => {
    const returnedResponse = {};
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // const url = `https://api.thetvdb.com/episodes/${episodeId}`;
    const url = `https://api.thetvdb.com/series/${seriesId}/episodes`;
    axios.get(url, headers)
        .then((response) => {
          console.log('response ', response);
          // return response;
          returnedResponse.status = response.status;
          returnedResponse.data = response.data;
          resolve(returnedResponse);
        })
        .catch((err) => {
          console.log('error ', err);
          err.err = err;
          // return response;
          returnedResponse.status = response.status;
          returnedResponse.error = err.data.Error;
          reject(returnedResponse);
        });
  });
}

/**
 * @description retrieves actors for a particular series
 * @param {string} seriesId
 * @param {string} token
 * @return {Promise}
 */
function retrieveActors(seriesId, token) {
  return new Promise((resolve, reject) => {
    const returnedResponse = {};
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const url = `https://api.thetvdb.com/series/${seriesId}/actors`;
    axios.get(url, headers)
        .then((response) => {
          console.log('response ', response.data.data);
          returnedResponse.status = response.status;
          returnedResponse.data = response.data.data;
          resolve(returnedResponse);
        })
        .catch((err) => {
          console.log('error ', err);
          returnedResponse.status = err.status;
          returnedResponse.error = err.data.Error;
          reject(returnedResponse);
        });
  });
}

module.exports = {
  tvShowLogin,
  retrieveRefreshToken,
  retrieveShowOverview,
  retrieveImages,
  retrieveEpisodes,
  retrieveActors
};
