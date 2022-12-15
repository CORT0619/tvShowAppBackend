const express = require('express');
const showRouter = express.Router();
const showApi = require('./tvshowapi');

/* Search for tv shows */
showRouter.get('/search/:show', async (req, res, next) => {
	// TODO: need to handle errors better
	const { show } = req.params;
	try {
		const results = await showApi.searchTvShows(show);
		if (results instanceof Error) {
			return res.status(results.status).json({ error: results.message });
		}

		console.log('shows ', results);
		return res.json({ shows: results });
	} catch (err) {
		// TODO: add in some error logging here
		res.json({error: err}).status(500);
	}
});


/* Retrieve Individual Show Information */
showRouter.get('/:mazeId', async(req, res, next) => {
	const { mazeId } = req.params;
	const { showId } = req.body;

	try {
		const response = await showApi.retrieveShowInformation(showId, mazeId);
		console.log('response ', response);
		res.json({ response });
	} catch (err) {
		console.log('err ', err);
	}
});


module.exports = showRouter;