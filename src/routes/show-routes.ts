import express from'express';
import * as showApi from './tvshowapi';
const showRouter = express.Router();


/* Search for tv shows */
showRouter.get('/search', async (req, res, next) => {
	// TODO: need to handle errors better - 404

	const { show } = req.query;
	console.log('show ', show);

	if (typeof show !== 'string') {
		throw new Error('an error has occurred'); // TODO: clean this up
	}

	try {
		const results = await showApi.searchTvShows(show);

		console.log('shows ', results);
		return res.json({ shows: results });
	} catch (err) {
		// TODO: take a look at below
		/*
		if (err instanceof Error) {
			return res.status(err?.status).json({ error: results.message }); // TODO: take a look at statuss
			// throw an error here?
		}*/
		// TODO: add in some error logging here
		res.json({error: err}).status(500);
	}
});

/* Retrieve Individual Show Information */
showRouter.get('/:showId/:mazeId', async(req, res, next) => {
	const { mazeId } = req.params;
	const { showId } = req.params;

	try {
		const response = await showApi.retrieveShowInformation(showId, mazeId);

		res.json(response);
	} catch (err) {
		console.log('err ', err);
		res.json(err).status(500); // TODO: make sure returning graceful error message
	}
});

export default showRouter;