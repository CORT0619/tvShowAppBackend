import axios from 'axios';
import * as showApi from '../tvmazeapi';
import { Episode, PopularShows, TvShow } from '../models/tvshow';
import 'dotenv/config';
import { AxiosError } from 'axios';

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

		return results.data.map(({show:{id, url, name, status, summary, image, ended, schedule, network, externals}}) => {
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
		throw new AxiosError(err.message, err.response.status);
	}
}

/**
 * 
 * @param {string} id 
 * @returns an array of episodes for a given tv show
 */
export async function retrieveShowEpisodes(id: string): Promise<Episode[]> {
	try {
		const url = showApi.retrieveShowEpisodes(id);
		const response = (await axios.get(url)).data;
		return response.map(({id, name, url, season, number, airdate, summary}) => {
			return {
				id,
				name,
				url,
				season,
				number,
				airdate,
				summary,
			}
		});
	} catch (err) {
		throw new AxiosError(err.message, err.response.status);
	}
}

/**
 * 
 * @param showId - id from the tvmazeapi
 * @returns an object with full tvshow information including
 * cast and episodes
 */
export async function retrieveShowInformation(showId: string): Promise<TvShow> {
	let showObj = Object.create(null) as any as TvShow; // TODO: how can this be done better?
	try {
		const url = showApi.retrieveFullShowDetails(showId);
		showObj = (await axios.get(url)).data;

		return showObj;
	} catch (err) {
		// console.log('err ', err.toJSON());
		throw new AxiosError(err.message, err.response.status);
	}
}

export async function getPopularShows(): Promise<PopularShows[]> {
	try {
		const url = showApi.retrievePopularShows(process.env.themoviedbApiKey);
		const response = (await axios.get(url)).data;

		return response.results.map(({id, overview, name, backdrop_path:image_path, vote_average, first_air_date}) => { // TODO: create type later
			return {
				id,
				name,
				overview,
				image_path: `https://image.tmdb.org/t/p/w500/${image_path}`,
				vote_average,
				first_air_date
			};
		});
	} catch (err) {
		throw new AxiosError(err.message, err.response.status);
	}
}

