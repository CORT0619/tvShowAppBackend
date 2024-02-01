import axios, { AxiosRequestConfig } from 'axios';
import * as showApi from '../tvmazeapi';
import { Episode, FullTvShowInfo, PopularShows, TvShow, TvShowResults } from '../models/tvshow';
import 'dotenv/config';
import { AxiosError, AxiosResponse } from 'axios';

/**
 * @description this endpoint allows users to search for a given show 
 * @param {string} show to search for
 * @returns an array of matching shows
 */
export async function searchTvShows(show: string): Promise<TvShow[]> {
	try {
		const url = showApi.showSearch(show);
		const results = (await axios.get<AxiosResponse<TvShowResults, AxiosRequestConfig>>(url)).data;

		if (results.status >= 400) {
			throw new Error('There was an error processing your request.');
		}
		
		return results.data.show.map(({
			id,
			url,
			name,
			status,
			summary,
			image,
			ended,
			schedule,
			network,
			externals,
			_embedded
		}) => ({
				id,
				name,
				image,
				status,
				summary,
				url,
				ended,
				schedule,
				network,
				externals,
				_embedded
		}));
	} catch (err) {
		let message = 'An error has occurred.';
		let status = 500;
		if (err instanceof AxiosError) {
			message = err?.message;
			status = err?.response?.status;
		}
		throw new AxiosError(message, status.toString());

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
		const response = (await axios.get<FullTvShowInfo>(url)).data;

		return response.episodes.map(({ id, name, url, season, number, airdate, summary }) => ({
			id,
			name,
			url,
			season,
			number,
			airdate,
			summary,
		}));
	} catch (err) {
		let message = 'An error has occurred.';
		let status = 500;
		if (err instanceof AxiosError) {
			message = err.message;
			status = err.response.status;
		}
		throw new AxiosError(message, status.toString());
	}
}

/**
 * 
 * @param showId - id from the tvmazeapi
 * @returns an object with full tvshow information including
 * cast and episodes
 */
export async function retrieveShowInformation(showId: string): Promise<TvShow> {
	let showObj = Object.create(null) as TvShow;
	try {
		const url = showApi.retrieveFullShowDetails(showId);
		const response = (await axios.get(url)).data as AxiosResponse<TvShow>;

		showObj = {...response.data};

		return showObj;
	} catch (err) {
		// console.log('err ', err.toJSON());
		let message = 'An error has occurred.';
		let status = 500;
		if (err instanceof AxiosError) {
			message = err.message;
			status = err.response.status;
		}
		throw new AxiosError(message, status.toString());
	}
}

export async function getPopularShows(): Promise<{id, overview, name, image_path, vote_average, first_air_date}[]> {
	try {
		const url = showApi.retrievePopularShows(process.env.themoviedbApiKey);
		const response = (await axios.get<PopularShows>(url)).data;

		return response.results.map(({ 
			id,
			overview,
			name,
			image_path: backdrop_path,
			vote_average,
			first_air_date
		}) => ({
				id,
				name,
				overview,
				image_path: `https://image.tmdb.org/t/p/w500/${backdrop_path}`,
				vote_average,
				first_air_date
		}));
	} catch (err) {
		let message = 'An error has occurred.';
		let status = 500;
		if (err instanceof AxiosError) {
			message = err.message;
			status = err.response.status;
		}
		throw new AxiosError(message, status.toString());
	}
}

