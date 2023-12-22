export type TvShowResults = {
	score: number;
	show: TvShow;
};

export interface TvShow {
	id: number;
	externals: {
		tvrage: number;
		thetvdb: number;
		imdb: string;
	};
	url: string;
	name: string;
	status: string; // TODO: clean this up: 'Ended'
	summary: string;
	image: {
		medium: string;
		original: string;
	};
	ended: string; // TODO: maybe make into date
	schedule: {
		time: string;
		days: String[];
	};
	network: {
		name: string;
	}
};

export type PopularTvShow = {
	id: number;
	original_name: string;
	overview: string;
	poster_path: string;
};

export interface FullTvShowInfo extends TvShow {
	cast: Cast;
	episodes: Episode[];
}

export type Cast = {
	id: number;
	name: string;
	image: {
		medium: string;
		original: string;
	}
};

export type Episode = {
	id: number;
	name: string;
	url: string;
	season: number;
	number: number;
	airdate: string; // TODO: should this be a date?
};