import axios from 'axios';
import * as showApi from '../tvmazeapi';
import logger from '../logger';
import { FullTvShowInfo, TvShow, TvShowResults } from '../models/tvshow';
import 'dotenv/config';

/**
 * @description this endpoint allows users to search for a given show 
 * @param {string} show to search for
 * @returns an array of matching shows
 */
export async function searchTvShows(show: string): Promise<TvShow[]> {
	try {
		const url = showApi.showSearch(show);
		const results = await axios.get(url);

		if (results.status >= 400) {
			throw new Error('There was an error processing your request.');
		}

		return results.data.map((res: TvShowResults) => {
			const { id, url, name, status, summary, image, ended, schedule, network, externals } = res.show;
			return {
				id,
				name,
				image,
				status,
				summary,
				url,
				ended,
				schedule,
				network,
				externals
			}
		});
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
 * @example id tt0213370
 */
export async function searchSingleShow(id: string) { // TODO: add a return type
	try {
		const url = showApi.searchShowById(id);
		return await axios.get(url);
	} catch (err) {
		console.log('err ', err);
		logger.log('error', err.message);
		return err; // TODO: return a graceful error
	}
}

/**
 *
 * @param {string} id 
 * @returns an array of the tv show cast
 */
export async function retrieveShowActors(id: string) {
	try {
		const url = showApi.getActors(id);
		return await axios.get(url);
	} catch (err) {
		console.log('err ', err);
		logger.log('error', err.message);
	}
}

/**
 * 
 * @param {string} id 
 * @returns an array of episodes for a given tv show
 */
export async function retrieveShowEpisodes(id: string) {
	try {
		const url = showApi.retrieveShowEpisodes(id);
		return await axios.get(url);
	} catch (err) {
		console.log('err ', err);
		logger.log('error', err.message);
	}
}

/**
 * 
 * @param showId 
 * @param mazeId 
 * @returns an object with full tvshow information including
 * cast and episodes
 */
export async function retrieveShowInformation(showId: string, mazeId: string): Promise<FullTvShowInfo> {
	let showObj = {} as any as FullTvShowInfo; // TODO: how can this be done better?
	try {
		const showInfo = await Promise.allSettled([
			searchSingleShow(mazeId),
			retrieveShowActors(showId),
			retrieveShowEpisodes(showId)
		]);

		const result = (showInfo.filter((show) => show.status === 'fulfilled') as PromiseFulfilledResult<any>[] | undefined);
		console.log('result ', result);


		if (result.length > 0) { // TODO: need to make sure of the order of these
			showObj = result[0]?.value?.data;
			showObj['cast'] = result[1]?.value?.data;
			showObj['episodes'] = result[2]?.value?.data;
		}

		return showObj;
	} catch (err) {
		console.log('err ', err);
		logger.log('error', err.message);
	}
}

export async function getPopularShows() { // TODO: add return type
	try {
		const url = showApi.retrievePopularShows(process.env.themoviedbApiKey);
		return await axios.get(url);
	} catch (err) {
		console.log('err ', err);
		logger.log('error', err.message);
	}
}

