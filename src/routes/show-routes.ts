import express from'express';
import { escape } from 'node:querystring';
import * as showApi from './tvshowapi';
const showRouter = express.Router();

/* Search for tv shows */
showRouter.get('/search', async (req, res, next) => {
	// TODO: need to handle errors better - 404

	const show = req.query.show as string;
	const escapedShow = escape(show.trim());

	try {
		const results = await showApi.searchTvShows(escapedShow);

		return res.status(200).json({ shows: results });
	} catch (err) {
		next(err);
	}
});

/* Get Popular Shows */
showRouter.get('/popular', async (req, res, next) => {
	try {
		const response = await showApi.getPopularShows();
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
});

/* Retrieve Individual Show Information */
showRouter.get('/:showId', async(req, res, next) => {
	const { showId } = req.params;
	
	try {
		const response = await showApi.retrieveShowInformation(showId);

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

showRouter.get('/series/:seriesId/episodes', async (req, res, next) => {
	const { seriesId } = req.params;

	try {
		const episodes = await showApi.retrieveShowEpisodes(seriesId);
		res.status(200).json({episodes});
	} catch (err: any) {
		// console.log('err ', err.toJSON());
		next(err);
	}
});

showRouter.all('*', (req, res, next) => {
	res.status(404).send('route not found');
});
// TODO: add a catch all - not found route or add in error handler

export default showRouter;