const axios = require('axios');
const showApi = require('../tvmazeapi');
const logger = require('../logger');

/**
 * @description this endpoint allows users to search for a given show 
 * @param {string} show to search for
 * @returns an array of matching shows
 */
async function searchTvShows(show) {
	try {
		const url = showApi.showSearch(show);
		console.log('url ', url);
		const results = await axios.get(url);

		if (results.status >= 400) {
			throw new Error('There was an error processing your request.');
			// const error = new Error();
			// error.status = results.status;
			// error.message = 'There was an error processing your request.';
			// throw error;
		}
		return results?.data;
	} catch (err) {
		// TODO: need to add some logging here
		logger.log('error', err.message)
		console.error('err ', err);
		return err;
	}
}

/**
 * @description allows the user to search for a given tv show by imdb id
 * @param {string} id - imdb id of a tv show
 * @returns the information for a given show
 */
async function searchSingleShow(id) { // tt0213370
	try {
		const url = showApi.searchShowById(id);
		return await axios.get(url);
	} catch (err) {
		console.log('err ', err);
		return err;
	}
}

/**
 * 
 * @param {string} id 
 */
async function retrieveShowActors(id) {
	try {
		const url = showApi.getActors(id);
		return await axios.get(url);
	} catch (err) {
		console.log('err ', err);
	}
}

// TODO: get episodes
async function retrieveShowEpisodes(id) {
	try {
		const url = showApi.retrieveShowEpisodes(id);
		return await axios.get(url);
	} catch (err) {
		console.log('err ', err);
	}
}

async function retrieveShowInformation(showId, mazeId) {
	const showObj = {};
	try {
		const showInfo = await Promise.allSettled([
			searchSingleShow(mazeId),
			retrieveShowActors(showId),
			retrieveShowEpisodes(showId)
		]);

		console.log('showInfo ', showInfo)

		const showObj = showInfo[0]?.value?.data;
		showObj.cast = showInfo[1]?.value?.data;
		showObj.episodes =  showInfo[2]?.value?.data;

		return showObj;
	} catch (err) {
		console.log('err ', err);
	}
}

async function getPopularShows() {
	try {
		const url = showApi.retrievePopularShows();
		return await axios.get(url);
	} catch (err) {
		console.log('err ', err);
	}
}

// TODO: need to store show info, including imdb id (within externals) in db
// TODO: need to store user's favorite data in db
// TODO: need to store episode's they've viewed
// TODO: how to cache

module.exports = {
	searchTvShows,
	retrieveShowInformation
}