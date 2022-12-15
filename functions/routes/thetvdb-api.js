const axios = require('axios');

/**
 * @description logs user into the tvdb api
 * @param {*} res
 * @param {*} cookies
 * @return { promise} with the response or error
 */
async function tvShowLogin() {
    // TODO: setup environment variables
    const auth = {
        apikey: process.env.showApiKey || functions.config().tvshowapp.showApiKey,
        username: process.env.user || functions.config().tvshowapp.user,
        userkey: process.env.uniqueId || functions.config().tvshowapp.uniqueId
    };

    try {
        const loginResponse = await axios.post('https://api.thetvdb.com/login', auth);
        console.log('tv api response ', response);
        return loginResponse.data.token;
    } catch (err) {
        console.log('error ', err);
        // return err;
        throw Error(err); // TODO: is this correct?
    }
}

/**
 * @description retrieves new token
 * @param {string} token contains the unexpired refresh token
 */
async function retrieveRefreshToken(token) {
    const url = `https://api.thetvdb.com/refresh_token`;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
        const response = await axios.get(url, headers);
        return response.data;
    } catch (err) {
        console.log(err);
        // return err;
        throw Error(err);
    }
}

/**
 * @description retrieves overview for a show
 * @param {string} show
 * @param {string} token
 * @return {object} response or error
 */
async function retrieveShowOverview(show, token) {
    const returnedResponse = {};
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const url = `https://api.thetvdb.com/search/series?name=${show}`;

    try {
        const response = await axios.get(url, headers);
        returnedResponse.status = await response.status;
        response.data.data.forEach((elem, i, arr) => {
            if (elem && elem.banner) {
                arr[i].banner = `https://www.thetvdb.com/banners/${elem.banner}`;
            }
        });
        returnedResponse.data = response.data.data; 
        return returnedResponse;
    } catch (err) {
        returnedResponse.status = response.status;
        returnedResponse.error = response.data.Error;
        throw Error(returnedResponse);
        // return returnedResponse;
    }

}

/**
 * @description retrieves images for a series
 * @param {string} seriesId id of the series to search
 * @param {string} token
 * @return {Promise}
 */
async function retrieveImages(seriesId, token) {
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

    try {
        const response = await axios(options);
        returnedResponse.status = 200;
        returnedResponse.data = await response.data.data;
        console.log('image response ', returnedResponse.data);
        return returnedResponse;
    } catch(err) {
        console.log('error ', err);
        returnedResponse.status = 500;
        returnedResponse.error = err;
        // return returnedResponse;
        throw Error(returnedResponse);
    }

}

/**
 * @description retrieves all episodes in a series
 * @param {string} seriesId
 * @param {string} token
 * @return {Promise}
 */
async function retrieveEpisodes(seriesId, token) {
    const returnedResponse = {};
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const url = `https://api.thetvdb.com/series/${seriesId}/episodes`;

    try {
        const response = await axios.get(url, headers);
        console.log('response ', response);
        returnedResponse.status = response.status;
        returnedResponse.data = response.data;
        return returnedResponse;

    } catch(err) {
        console.log('error ', err);
        err.err = err;
        returnedResponse.status = response.status;
        returnedResponse.error = err.data.Error;
        // return returnedResponse;
        throw Error(returnedResponse);
    }
}

/**
 * @description retrieves actors for a particular series
 * @param {string} seriesId
 * @param {string} token
 * @return {Promise}
 */
async function retrieveActors(seriesId, token) {}
