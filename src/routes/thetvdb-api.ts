import axios from 'axios';

/**
 * @description logs user into the tvdb api
 * @param {*} res
 * @param {*} cookies
 * @return { promise} with the response or error
 */
export async function login() {
	const auth = {
		apikey: process.env.showApiKey,
		username: process.env.user,
		userkey: process.env.uniqueId
	};

	const response = await axios.post('https://api.thetvdb.com/login', auth);
	console.log('tv api response ', response);
	return response.data.token;
}

/**
 * @description retrieves new token
 * @param {string} token contains the unexpired refresh token
 */
export async function retrieveRefreshToken(token) {
	const url = `https://api.thetvdb.com/refresh_token`;
	const headers = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	try {
		return await axios.get(url, headers).data;
	} catch (err) {
		return err;
	}
}

/**
 * @description retrieves overview for a show
 * @param {string} show
 * @param {string} token
 * @return {object} response or error
 */
export async function retrieveShowOverview(show, token) {
	const returnedResponse = {};
	const headers = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	try {
		const response = await axios.get(
			`https://api.thetvdb.com/search/series?name=${show}`,
			headers
		);
		returnedResponse.status = response.status;

		response.data.data.forEach((elem, i, arr) => {
			if (elem && elem.banner) {
				arr[i].banner = `https://www.thetvdb.com/banners/${elem.banner}`;
			}
		});
		returnedResponse.data = response.data.data;
		return returnedResponse;
	} catch (err) {
		console.log('error ', err);
		returnedResponse.status = err.status;
		returnedResponse.error = err.data.Error;
	}
}

/**
 * @description retrieves images for a series
 * @param {string} seriesId id of the series to search
 * @param {string} token
 * @return {Promise}
 */
export async function retrieveImages(seriesId, token) {
	const returnedResponse = {};
	// contains options to search by certain resolutions and image types
	// const url = `https://api.thetvdb.com/series/${seriesId}/images/query?keyType=series&subkey=graphical`; // returns banners
	const url = `https://api.thetvdb.com/series/${seriesId}/images/query?keyType=poster`; // returns large posters
	// const url = `https://api.thetvdb.com/series/${seriesId}/images/query/params`; // get params needed for image call
	// https://www.thetvdb.com/banners/ - add filename from this call to get the image for the show

	const options = {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
		url
	};

	try {
		const response = await axios(options);
		returnedResponse.status = 200;
		returnedResponse.data = response.data.data;
		console.log('image response ', returnedResponse.data);

		return returnedResponse;
	} catch (err) {
		console.log('error ', err);
		returnedResponse.status = 500;
		returnedResponse.error = err;
		return returnedResponse;
	}
}

/**
 * @description retrieves all episodes in a series
 * @param {string} seriesId
 * @param {string} token
 * @return {Promise}
 */
export async function retrieveEpisodes(seriesId, token) {
	const returnedResponse = {};
	const headers = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	// const url = `https://api.thetvdb.com/episodes/${episodeId}`;
	const url = `https://api.thetvdb.com/series/${seriesId}/episodes`;

	try {
		const response = await axios.get(url, headers);
		console.log('response ', response);
		returnedResponse.status = response.status;
		returnedResponse.data = response.data;
		return returnedResponse;
	} catch (err) {
		console.log('error ', err);
		err.err = err;
		returnedResponse.status = err.status;
		returnedResponse.error = err.data.Error;
		return returnedResponse;
	}
}

/**
 * @description retrieves actors for a particular series
 * @param {string} seriesId
 * @param {string} token
 * @return {Promise}
 */
export async function retrieveActors(seriesId, token) {
	const returnedResponse = {};
	const headers = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	try {
		const response = await axios.get(
			`https://api.thetvdb.com/series/${seriesId}/actors`,
			headers
		);
		console.log('response ', response.data.data);
		returnedResponse.status = response.status;
		returnedResponse.data = response.data.data;
		return returnedResponse;
	} catch (err) {
		console.log('error ', err);
		returnedResponse.status = err.status;
		returnedResponse.error = err.data.Error;
		return returnedResponse;
	}
}